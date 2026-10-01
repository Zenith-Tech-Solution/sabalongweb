"use client"

import { useRef, useState } from "react"
import { pricingGroups } from "@/lib/content"
import { site, waLink } from "@/lib/site"
import SectionHeading from "@/components/SectionHeading"

/**
 * Categories are a hairline tab row; plans are three hairline-separated cells.
 * The accent appears exactly twice here — the active tab, and the price of the
 * plan we recommend. No elevated "featured" card: the grid itself is the
 * container, so a floating card would break the section's rules.
 */
export default function Pricing() {
  const [activeId, setActiveId] = useState(pricingGroups[0].id)
  const group = pricingGroups.find((g) => g.id === activeId) ?? pricingGroups[0]
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="harga" className="section-container relative section-pad">
      <div aria-hidden className="bg-points fade-points absolute inset-0" />

      <SectionHeading
        eyebrow="Harga"
        title="Harga jelas dari awal"
        lead="Semua paket sudah termasuk domain dan hosting untuk tahun pertama. Biaya perpanjangan di tahun berikutnya akan kami sampaikan saat konsultasi, bukan setelah website selesai."
      />

      <div data-reveal-group className="relative z-2 mx-auto section-gap max-w-screen-xl px-4">
        <div
          role="tablist"
          aria-label="Kategori layanan"
          className="flex flex-wrap gap-x-8 gap-y-2 border-b border-neutral-200"
        >
          {pricingGroups.map((item) => {
            const selected = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(item.id)}
                className={`-mb-px inline-flex min-h-11 items-center border-b-2 text-base tracking-tight transition-colors duration-150 ${
                  selected
                    ? "border-brand text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Mobile: horizontal carousel with manual buttons instead of native scrollbar.
            Desktop returns to 3-column grid. */}
        <div className="relative border-b border-neutral-200 md:border-b-0">
          <button
            type="button"
            aria-label="Scroll ke kiri"
            onClick={() => scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" })}
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 px-2 py-2 text-sm shadow-md backdrop-blur md:hidden"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Scroll ke kanan"
            onClick={() => scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" })}
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-neutral-200 bg-white/90 px-2 py-2 text-sm shadow-md backdrop-blur md:hidden"
          >
            →
          </button>
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 md:grid md:grid-cols-3 md:divide-x md:overflow-visible md:px-0"
          >
          {group.plans.map((plan, i) => (
            <div
              key={plan.name}
              className="hover-cell relative flex min-w-[260px] shrink-0 snap-start flex-col justify-between border-r border-neutral-200 p-6 transition-colors duration-200 last:border-r-0 md:min-w-0 md:shrink md:border-r-0 md:p-10"
            >
              {i === 0 && (
                <>
                  <span className="small-square square-tl" aria-hidden />
                  <span className="small-square square-bl" aria-hidden />
                </>
              )}

              <div>
                {/* The badge slot is reserved on every card, not just the one
                    with a highlight. Rendering it conditionally pushed the
                    "Paling Populer" name and price ~30px below its neighbours,
                    which is the inconsistency: the three titles no longer sat
                    on one line. The empty state is an invisible nbsp so the
                    slot keeps its exact height. */}
                <span
                  className={`mb-4 inline-flex rounded-full border px-2.5 py-1 text-sm font-medium tracking-tight ${
                    plan.highlight
                      ? "border-cream bg-cream text-brand-deep"
                      : "invisible border-transparent"
                  }`}
                >
                  {plan.highlight || "\u00A0"}
                </span>
                <h3 className="mb-1 text-xl font-semibold tracking-tight text-neutral-900">
                  {plan.name}
                </h3>
                <p className="text-4xl font-semibold tracking-tight text-neutral-900">
                  <span className="text-base font-normal text-neutral-500">Rp</span>{" "}
                  <span className={plan.highlight ? "text-brand" : ""}>
                    {plan.price}
                  </span>
                </p>

                <ul className="mt-8 flex flex-col gap-2.5 text-sm text-neutral-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <span aria-hidden className="text-brand">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={waLink(
                  `Halo ${site.name}, saya tertarik dengan paket ${plan.name} — ${group.title}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 inline-flex h-12 w-full items-center justify-center border px-6 text-lg tracking-tight transition-colors duration-300 ${
                  plan.highlight
                    ? "border-brand bg-brand-solid text-white hover:bg-brand-deep"
                    : "border-neutral-200 bg-surface text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                Pilih Paket
              </a>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
