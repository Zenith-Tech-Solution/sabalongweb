"use client"

import { useState } from "react"
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

  return (
    <section id="harga" className="section-container relative section-pad">
      <div aria-hidden className="bg-points fade-points absolute inset-0" />

      <SectionHeading
        eyebrow="Harga"
        title="Harga yang terbuka di depan"
        lead="Semua paket sudah termasuk domain dan hosting tahun pertama. Biaya perpanjangan di tahun berikutnya kami sebutkan saat konsultasi, bukan setelah website Anda jadi."
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

        {/* Mobile: a snap-scrolling flex row, so a second price is one swipe
            away instead of a full screen of scrolling. Desktop goes back to
            the 3-column grid. `border-t` is gone because the tablist above
            already draws that rule, and two stacked 1px lines read as a seam. */}
        <div className="flex snap-x snap-mandatory overflow-x-auto border-b border-neutral-200 md:grid md:grid-cols-3 md:divide-x md:overflow-visible">
          {group.plans.map((plan, i) => (
            <div
              key={plan.name}
              className="hover-cell relative flex min-w-[260px] shrink-0 snap-start flex-col justify-between border-r border-neutral-200 p-8 transition-colors duration-200 last:border-r-0 md:min-w-0 md:shrink md:border-r-0 md:p-10"
            >
              {i === 0 && (
                <>
                  <span className="small-square square-tl" aria-hidden />
                  <span className="small-square square-bl" aria-hidden />
                </>
              )}

              <div>
                {plan.highlight && (
                  <span className="mb-4 inline-flex rounded-full border border-cream bg-cream px-2.5 py-1 text-sm font-medium tracking-tight text-brand-deep">
                    {plan.highlight}
                  </span>
                )}
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
                Pilih paket
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
