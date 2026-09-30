"use client"

import { useEffect } from "react"
import { animate, stagger, utils } from "animejs"

/**
 * Scroll reveal, driven by anime.js.
 *
 * Two rules keep this cheap:
 * - anime.js animates; a native IntersectionObserver decides WHEN. anime v4
 *   ships its own scroll observers, but a plain IO is a few lines of setup and
 *   needs no scroll listener, so there is nothing to tear down on unmount.
 * - Only elements below the fold are observed. Anything already on screen at
 *   load is shown immediately, so the hero never animates in late.
 *
 * Elements opt in with `data-reveal` (one element) or `data-reveal-group`
 * (its direct children stagger in as a single wave).
 */
export default function Reveal() {
  useEffect(() => {
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]"),
    )

    const show = (el: HTMLElement) => {
      if (el.dataset.revealGroup !== undefined) {
        const children = Array.from(el.children) as HTMLElement[]
        if (!children.length) return
        utils.set(children, { opacity: 0, translateY: 18 })
        animate(children, {
          opacity: 1,
          translateY: 0,
          duration: 650,
          delay: stagger(70),
          ease: "out(3)",
        })
      } else {
        utils.set(el, { opacity: 0, translateY: 18 })
        animate(el, { opacity: 1, translateY: 0, duration: 650, ease: "out(3)" })
      }
    }

    const revealNow = (el: HTMLElement) =>
      utils.set(el, { opacity: 1, translateY: 0, filter: "blur(0px)" })

    // Above the fold: show it now, do not observe it.
    const belowFold: HTMLElement[] = []
    for (const el of pending) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) revealNow(el)
      else belowFold.push(el)
    }

    // Respect the OS setting. Nothing moves, and everything stays visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      belowFold.forEach(revealNow)
      return
    }
    if (!belowFold.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.unobserve(entry.target)
          show(entry.target as HTMLElement)
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )

    for (const el of belowFold) {
      // Hidden until the observer fires, so it cannot flash in first.
      utils.set(el.dataset.revealGroup !== undefined ? el.children : el, {
        opacity: 0,
        translateY: 18,
      })
      io.observe(el)
    }

    return () => io.disconnect()
  }, [])

  return null
}
