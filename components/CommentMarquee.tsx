"use client"

import { useState } from "react"
import Marquee from "react-fast-marquee"
import { LuQuote } from "react-icons/lu"
import { comments, type Comment } from "@/lib/content"

/**
 * Testimonial cards scrolling sideways in two rows.
 *
 * Two rows run in opposite directions. One row alone reads as a conveyor belt;
 * opposing rows is the standard editorial trick because the eye can follow
 * content in two directions, so the block feels balanced rather than
 * one-directional.
 *
 * `pauseOnHover` is the affordance that matters most: a moving wall of text is
 * unreadable for anyone who needs to read at their own pace, and WCAG 2.2.2
 * (Pause, Stop, Hide) requires the ability to pause auto-updating motion.
 *
 * `react-fast-marquee` measures its own width before it renders anything and
 * returns null until that measurement lands, so it cannot render on the server.
 * Left alone that meant zero cards in the SSR HTML: nothing for crawlers or
 * social previews, and a blank band until hydration finished.
 *
 * So the cards also render as plain static rows. Those are real HTML, correct on
 * first paint, and they are never torn down until both marquee tracks report
 * `onMount` — so the static rows are also the no-JS and slow-JS fallback.
 */
function Card({ comment }: { comment: Comment }) {
  return (
    <figure className="mx-2.5 flex h-full w-[24rem] max-w-[80vw] shrink-0 grow-0 flex-col rounded-lg border border-neutral-200 bg-surface p-6 sm:w-[28rem] sm:max-w-none">
      <LuQuote aria-hidden className="mb-3 shrink-0 text-brand" size={20} />

      <blockquote className="flex-1 text-[15px] leading-relaxed text-neutral-700">
        {comment.quote}
      </blockquote>

      <figcaption className="mt-5 flex shrink-0 items-center gap-3 border-t border-neutral-200 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={comment.avatar}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="size-10 shrink-0 rounded-full border border-neutral-200 bg-neutral-100"
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-neutral-900">
            {comment.name}
          </span>
          <span className="block truncate text-xs text-neutral-500">
            {comment.role}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function CommentMarquee() {
  // Counts how many of the two tracks have actually finished mounting. The
  // static rows stay on screen until BOTH report in.
  //
  // This used to be a boolean hydration flag, which was wrong: it removed the
  // static rows the instant the client hydrated, but `react-fast-marquee`
  // returns null until it has measured its own width. So hydration tore down
  // the only visible cards and put nothing in their place until measurement
  // landed — a blank band. On a slow connection or a phone that gap is long
  // enough to look like the section is empty, permanently.
  //
  // Counting real `onMount` callbacks closes that gap: the cards are visible
  // from the first byte of HTML, and they are only ever replaced by the
  // marquee once the marquee is provably rendering.
  const [ready, setReady] = useState(0)
  const trackReady = () => setReady((n) => Math.min(n + 1, 2))

  const row = (reverse: boolean) => (
    <Marquee
      pauseOnHover
      speed={45}
      direction={reverse ? "right" : "left"}
      gradient
      gradientColor="rgb(250 250 249)"
      className="overflow-hidden"
      onMount={trackReady}
    >
      {comments.map((c) => (
        <Card key={`${reverse ? "b" : "a"}-${c.name}`} comment={c} />
      ))}
    </Marquee>
  )

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {/* Real cards in the server HTML, and the permanent no-JS fallback. Hidden
          only once both tracks confirm they are rendering, so a screen reader
          never hears the same testimonial twice. */}
      <div aria-hidden={ready === 2} hidden={ready === 2}>
        <div className="flex flex-col gap-4 md:gap-5">
          {[false, true].map((reverse) => (
            <div key={String(reverse)} className="flex gap-2.5 overflow-hidden">
              {comments.map((c) => (
                <Card key={`${reverse}-${c.name}`} comment={c} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* The tracks render nothing server-side, so this adds no weight to the
          SSR output and cannot cause a hydration mismatch. */}
      {row(false)}
      {row(true)}

      {/* Stops the scroll outright rather than slowing it. A moving wall of text
          is unreadable for anyone who reads at their own pace or has a vestibular
          disorder. `react-fast-marquee` drives the track off a `--play` custom
          property, so overriding that one var is the supported way in — the
          library exposes no `data-` hook, only the `.rfm-marquee` track class. */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .rfm-marquee { --play: paused !important; }
        }
      `}</style>
    </div>
  )
}
