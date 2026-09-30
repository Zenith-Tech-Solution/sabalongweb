import { faqItems } from "@/lib/content"
import SectionHeading from "@/components/SectionHeading"

/**
 * Native disclosure, no client component and no state.
 *
 * `<details>`/`<summary>` is keyboard-operable, announced correctly, and
 * themable for free. The plus glyph swaps to a minus through CSS content, so
 * the open/close has zero transform and zero transition.
 */
export default function Faq() {
  return (
    <section id="faq" className="section-container relative section-pad">
      <div aria-hidden className="bg-points fade-points absolute inset-0" />

      <SectionHeading
        eyebrow="FAQ"
        title="Pertanyaan sebelum Anda tanya"
        lead="Enam hal yang paling sering masuk ke chat kami, dijawab apa adanya."
      />

      <div data-reveal-group className="relative z-2 mx-auto section-gap max-w-screen-xl px-4">
        <div className="border-t border-neutral-200">
          {faqItems.map((item) => (
            <details key={item.q} className="group border-b border-neutral-200">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg tracking-tight marker:content-none">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-neutral-400 before:content-['+'] group-open:before:content-['−']"
                />
              </summary>
              <p className="max-w-3xl pb-6 text-neutral-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
