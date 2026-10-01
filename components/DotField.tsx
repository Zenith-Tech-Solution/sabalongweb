"use client"

import { useEffect, useRef } from "react"

/**
 * Static dot field for a section background.
 *
 * No animation, no RAF, no pointer listeners: the grid is painted once on
 * mount and again only when the box actually resizes. An earlier version of
 * this ran a spring loop so the dots could be pushed around by the cursor,
 * which cost a RAF that had to be parked, cancelled and re-armed. A fixed
 * pattern is what a background wants anyway, so the canvas earns its place only
 * because the cell size and colour are variables — see `SectionFade` below for
 * the gradient that softens the section boundary.
 *
 * `fillRect` per dot rather than `arc`: a 3x3 square is cheaper than a path, and
 * square dots are the point.
 */
export default function DotField({
  cell = 26,
  size = 3,
  tint = "rgb(96 96 240 / 0.22)",
}: {
  cell?: number
  size?: number
  tint?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = tint
      // Offset by half a cell so the dots are not flush to the section edges,
      // where a half row of clipped dots reads as a bug.
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          ctx.fillRect(x - size / 2, y - size / 2, size, size)
        }
      }
    }

    paint()
    const ro = new ResizeObserver(paint)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [cell, size, tint])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  )
}
