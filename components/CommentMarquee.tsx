"use client"

import { useState } from "react"
import Marquee from "react-fast-marquee"
import { LuQuote } from "react-icons/lu"
import { comments, type Comment } from "@/lib/content"

/**
 * Testimonial cards scrolling sideways in a single full-bleed row.
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
 * So the cards also render as a plain static row. That is real HTML, correct on
 * first paint, and it is never torn down until the marquee track reports
 * `onMount` — so the static row is also the no-JS and slow-JS fallback.
 */
function Card({ comment }: { comment: Comment }) {
  return (
    <figure className="mx-2.5 flex h-full w-[24rem] max-w-[80vw] shrink-0 grow-0 flex-col rounded-lg border border-neutral-300 bg-canvas p-6 shadow-sm sm:w-[28rem] sm:max-w-none">
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
  // The static row stays on screen until the marquee track reports it mounted.
  //
  // Hiding on hydration was the bug this replaced: it removed the static row the
  // instant the client hydrated, but `react-fast-marquee` returns null until it
  // has measured its own width. So hydration tore down the only visible cards
  // and put nothing in their place until measurement landed — a blank band. On
  // a slow connection or a phone that gap is long enough to look like the
  // section is empty, permanently.
  //
  // `onMount` is the only signal that the marquee is actually rendering, so that
  // is what gates the swap: cards are visible from the first byte of HTML and are
  // only ever replaced by the marquee once the marquee is provably rendering.
  const [mounted, setMounted] = useState(false)

  return (
    <div>
      {/* Real cards in the server HTML, and the permanent no-JS fallback. Hidden
          only once the marquee confirms it is rendering, so a screen reader
          never hears the same testimonial twice. */}
      <div aria-hidden={mounted} hidden={mounted}>
        <div className="flex gap-2.5 overflow-hidden">
          {comments.map((c) => (
            <Card key={c.name} comment={c} />
          ))}
        </div>
      </div>

      {/* The track renders nothing server-side, so this adds no weight to the
          SSR output and cannot cause a hydration mismatch. */}
      <Marquee
        pauseOnHover
        speed={45}
        direction="left"
        gradient
        gradientColor="rgb(96 96 240)"
        className="overflow-hidden"
        onMount={() => setMounted(true)}
      >
        {comments.map((c) => (
          <Card key={c.name} comment={c} />
        ))}
      </Marquee>

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
