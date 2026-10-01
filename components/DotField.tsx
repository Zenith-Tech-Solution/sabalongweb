"use client"

import { useEffect, useRef } from "react"

/**
 * Dot field on a canvas, for the team page header.
 *
 * This is the one place in the site that draws at runtime. The hero and the
 * pricing section got away with a CSS `pixel-vignette` because a static pattern
 * is what they wanted. Here the dots react to the pointer, which CSS cannot do
 * without one box-shadow per dot, so it earns a canvas.
 *
 * Cost control, in order of how much it matters:
 * - One grid, drawn as `fillRect` per dot. A 3x3 dot is cheaper than `arc`.
 * - Redraw only when something moved: an idle loop at 0 still repaints the same
 *   pixels 60 times a second, so it parks the RAF instead.
 * - Displacement decays to a full stop, so the loop parks itself once the field
 *   settles and the CPU drops to zero.
 * - Paused entirely when scrolled out of view (IntersectionObserver), and never
 *   started when the OS asks for reduced motion.
 * - Backing store capped at 2x DPR. Retina is worth it; a 3x phone with a
 *   full-bleed field is 4x the fill rate for a pattern nobody can resolve.
 */
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const CELL = 26
    const DOT = 3
    const RADIUS = 130
    const PUSH = 18
    const EASE = 0.12
    const DAMP = 0.82

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let dots: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = []
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    // Canvas is transparent over the section, so it only needs to clear.
    const paint = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "rgb(96 96 240 / 0.22)"
      for (const d of dots) {
        ctx.fillRect(d.x - DOT / 2, d.y - DOT / 2, DOT, DOT)
      }
    }

    // "Settled" means the dots stopped MOVING, not that they are back on the
    // grid. A pointer resting inside the radius holds every nearby dot at a
    // permanent offset, so measuring against `ox/oy` never converges and the
    // loop runs forever. Comparing each dot to where it was last frame is the
    // only test that matches the question we actually care about: is there
    // anything left to repaint?
    // Velocity is the only thing that matters for parking, so test it directly
    // against the damping floor. The dots settle at a fixed offset from their
    // grid slot while the pointer rests, and that offset is not a sign of
    // motion.
    const settled = () => {
      for (const d of dots) {
        if (Math.abs(d.vx) > 0.02 || Math.abs(d.vy) > 0.02) return false
      }
      return true
    }

    // Pure spring + damper. No force term: repulsion is an impulse applied once
    // per pointermove below, not a force held every frame. A force here turns
    // the field into a driven oscillator — a stationary pointer keeps pumping
    // energy in faster than the damper bleeds it off, so velocity never reaches
    // zero and the loop never parks.
    const tick = () => {
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        d.vx = (d.vx + (d.ox - d.x) * EASE) * DAMP
        d.vy = (d.vy + (d.oy - d.y) * EASE) * DAMP
      }
      paint()
      raf = settled() ? 0 : requestAnimationFrame(tick)
    }

    // Runs once on pointer move, then keeps the loop alive until the spring
    // settles. `schedule` is the single place a RAF gets created.
    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Offset the grid half a cell so the dots are not flush to the section
      // edges, where a half-row of clipped dots reads as a bug.
      dots = []
      for (let y = CELL / 2; y < h; y += CELL) {
        for (let x = CELL / 2; x < w; x += CELL) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
        }
      }
      paint()
    }

    // Listeners sit on `window`, not the canvas. The canvas is
    // `pointer-events-none` so it can never swallow a click on the member
    // cards underneath it, which means it never receives pointer events either.
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top

      // Impulse, applied once per event. Capped per dot so a fast swipe cannot
      // launch a dot off-screen and leave it stranded outside the field.
      for (const d of dots) {
        const dx = d.x - px
        const dy = d.y - py
        const dist = Math.hypot(dx, dy)
        if (dist >= RADIUS) continue
        const kick = (1 - dist / RADIUS) * PUSH
        d.vx += Math.max(-PUSH, Math.min(PUSH, (dx / (dist || 1)) * kick))
        d.vy += Math.max(-PUSH, Math.min(PUSH, (dy / (dist || 1)) * kick))
      }
      schedule()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Static field when motion is off: paint once, no listener, no loop.
    if (reduced) return () => ro.disconnect()

    window.addEventListener("pointermove", onPointerMove, { passive: true })

    // Off-screen fields cost nothing. Not cleaned up on purpose: it is one
    // observer with a boolean.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(canvas)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  )
}
