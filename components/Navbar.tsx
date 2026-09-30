"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { navLinks, services } from "@/lib/content"
import { site } from "@/lib/site"

/**
 * Floating brand bar. It never changes colour and never hides on scroll, so there
 * is no scroll listener to own.
 *
 * The bar is solid brand purple rather than translucent. A `backdrop-blur` pill
 * looks good in isolation, but white links over a blurred backdrop have no fixed
 * contrast ratio — the same link measures differently over the hero and over the
 * white sections behind it. Solid keeps every label at 4.74:1.
 *
 * The rounded pill and the inset are what make it float; on a dark page a drop
 * shadow alone would be invisible, so the edge is carried by a light ring that
 * works in both directions.
 *
 * On mobile the burger opens a full-height panel that slides in from the right
 * and carries every route, not just the five nav links.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const lastY = useRef(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  /* Scrolling down compacts the bar to a capsule holding just the logo and the
     CTA; scrolling up gives it the full width back.

     Two thresholds, not one: collapse past 120px, expand again below 80px. With a
     single threshold the bar flickers whenever a trackpad settles right on the
     boundary, because each scroll event re-decides.

     `setCompact` to the value it already holds bails out of the re-render, so
     the frequent events cost nothing; only the two crossings do. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      if (y > 120 && delta > 0) setCompact(true)
      else if (y < 80 || delta < 0) setCompact(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock the page behind the panel, and put focus back on the burger on close.
  useEffect(() => {
    if (!open) return
    const { body } = document
    const burger = burgerRef.current
    const prevOverflow = body.style.overflow
    body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      if (e.key !== "Tab") return
      // Keep tabbing inside the panel: a fullscreen overlay that leaks focus to
      // the page behind it is a keyboard trap in the wrong direction.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      body.style.overflow = prevOverflow
      burger?.focus()
    }
  }, [open])

  return (
    <>
      {/* The fixed wrapper is invisible: it exists only to inset the bar and
          centre it. `pointer-events-none` is load-bearing — a full-width fixed
          box would otherwise swallow clicks in the 1rem gutter beside the pill
          and in the strip above it, and there is content there. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
        {/* The bar closes in from both edges because it is centred and its
            max-width shrinks, rather than sliding off one side. */}
        <nav
          className={`on-brand pointer-events-auto mx-auto flex h-16 w-full items-center justify-between overflow-hidden bg-brand-solid px-4 shadow-lg shadow-neutral-950/25 ring-1 ring-white/20 transition-[max-width] duration-500 ease-out motion-reduce:transition-none md:justify-center md:px-6 ${
            compact && !open ? "max-w-[240px] md:max-w-[380px]" : "max-w-screen-xl"
          }`}
        >
          <Link
            href="/"
            className="mr-4 inline-flex shrink-0 items-center gap-2 text-base font-medium tracking-tight text-white transition-colors duration-150 hover:text-lavender"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo-sabalong.png"
              alt=""
              width={24}
              height={24}
              priority
              className="size-6"
            />
            {site.name}
          </Link>

          {/* The five routes are the first thing to go. `inert` is load-bearing
              alongside the width collapse: a max-w-0 <ul> still holds focusable
              links, so keyboard users would tab into an invisible menu.
              Deliberately not `visibility: hidden` — that snaps, which would
              make the links blink out instead of fading with the bar. */}
          <ul
            inert={compact && !open}
            className={`mr-auto hidden shrink flex-row items-center gap-6 overflow-hidden transition-[max-width,opacity] duration-500 ease-out motion-reduce:transition-none md:flex ${
              compact ? "max-w-0 opacity-0" : "max-w-[420px] opacity-100"
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-base tracking-tight text-white transition-colors duration-150 hover:text-lavender"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* shrink-0 on the group and the burger: as flex children they were
              allowed to compress, and at 360px the burger lost 4px while the
              CTA lost the rest, so the row overflowed its own 8px. */}
          <div className="flex shrink-0 items-center gap-1 md:gap-3">
            <a
              href={`https://wa.me/${site.contact.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              /* White fill, brand-deep text. The bar is a brand gradient, so a
                 brand-filled button had a contrast ratio of 1.00 against it. */
              className="hidden h-10 items-center border border-white bg-white px-4 text-base tracking-tight text-brand-deep transition-colors duration-300 hover:border-lavender hover:bg-lavender md:inline-flex"
            >
              Mulai Konsultasi
            </a>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-drawer"
              className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-white md:hidden"
            >
              <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {open && (
        // z-50, not z-40: same as the nav, and later in the DOM so it paints
        // over it. Below the nav it would be hidden behind the bar.
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Scrim. Kept out of the a11y tree: the panel is the content, and
              Escape plus the close button are the real affordances. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-neutral-900/40"
          />

          <div
            ref={panelRef}
            id="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            className="drawer-panel absolute inset-0 flex w-full flex-col overflow-y-auto bg-brand-solid text-white"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/15 px-4">
              <span className="text-base font-medium tracking-tight">
                {site.name}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex size-11 items-center justify-center"
              >
                <span className="sr-only">Tutup menu</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-6">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li
                    key={link.href}
                    className="drawer-item border-b border-white/10"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="-mx-4 flex items-center justify-between px-4 py-4 text-lg tracking-tight"
                    >
                      {link.label}
                      <span aria-hidden className="text-white/50">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="drawer-item" style={{ "--i": navLinks.length } as React.CSSProperties}>
                <h2 className="mb-3 font-mono text-xs tracking-tight text-white/60 uppercase">
                  Layanan
                </h2>
                <ul className="flex flex-col gap-1">
                  {services.map((service, i) => (
                    <li
                      key={service.title}
                      className="drawer-item"
                      style={
                        { "--i": navLinks.length + 1 + i } as React.CSSProperties
                      }
                    >
                      <Link
                        href="/#layanan"
                        onClick={() => setOpen(false)}
                        className="block py-2 text-base text-white/85"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div
              className="drawer-item shrink-0 border-t border-white/15 p-4"
              style={
                { "--i": navLinks.length + 1 + services.length } as React.CSSProperties
              }
            >
              <a
                href={`https://wa.me/${site.contact.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center border border-white bg-white px-5 text-base text-brand-deep"
              >
                Mulai Konsultasi
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                onClick={() => setOpen(false)}
                className="mt-2 flex h-11 items-center justify-center border border-white/40 px-5 text-base"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
