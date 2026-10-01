import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import Pricing from "@/components/Pricing"
import Faq from "@/components/Faq"
import ContactForm from "@/components/ContactForm"
import SectionHeading from "@/components/SectionHeading"
import { services, processSteps, portfolio } from "@/lib/content"
import { site } from "@/lib/site"

/**
 * Section rhythm: every band is a `section-container` (max-w-screen-xl with 1px
 * side rules) and every cell inside it is separated by a hairline, never by a
 * gap. Corner squares mark the joints of that grid — they are the only
 * ornament on the page.
 */

const stats = [
  { label: "Harga mulai", value: "Rp350 rb" },
  { label: "Pengerjaan landing page", value: "3-5 hari" },
  { label: "Domain dan hosting", value: "1 tahun" },
  { label: "Dibuat dari nol", value: "100%" },
]

function Squares() {
  return (
    <>
      <span className="small-square square-tl" aria-hidden />
      <span className="small-square square-bl" aria-hidden />
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <Hero />

        {/* Stats: a four-cell hairline grid, no heading. `pt-0` is the join —
            the grid's top rule has to meet the quote strip's bottom rule at the
            colour break with nothing in between, which is the whole point of
            putting the cards here. `pb-16` still gives the band its own rhythm
            before the services section. */}
        <section className="bg-canvas pt-0 pb-16">
          <div className="section-container">
            <div
              data-reveal-group
              className="relative grid grid-cols-2 divide-x divide-neutral-200 border-neutral-200 border-t lg:grid-cols-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative flex flex-col items-center justify-center px-4 py-6"
                >
                  {i === 0 && <Squares />}
                  <div className="font-mono text-xs tracking-tight text-neutral-500 uppercase">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services: 2x2 hairline grid, dot field behind the heading. */}
        <section id="layanan" className="section-container relative section-pad">
          <div aria-hidden className="bg-points fade-points absolute inset-0" />

          <SectionHeading
            eyebrow="Layanan"
            title="Empat layanan untuk kebutuhan digital Anda"
            lead="Setiap paket punya hasil yang jelas, jadi Anda sudah tahu apa yang akan diterima sebelum proyek dimulai."
          />

          <div data-reveal-group className="relative z-2 mx-auto section-gap grid max-w-screen-xl grid-cols-1 divide-x divide-neutral-200 border-neutral-200 border-y md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="hover-cell relative flex flex-col border-b border-neutral-200 p-6 transition-colors duration-200 md:p-8 md:p-10"
              >
                <Squares />
                <h3 className="mb-1 font-semibold text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-neutral-600">{service.what}</p>

                <ul className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-brand">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Process: five numbered cells, hairline-separated. */}
        <section id="proses" className="section-container relative section-pad">
          <div aria-hidden className="bg-points fade-points absolute inset-0" />

          <SectionHeading
            eyebrow="Proses"
            title="Lima langkah sederhana, dengan hasil nyata di setiap tahap"
            lead="Prosesnya terbuka dari awal sampai akhir. Di setiap langkah, ada hasil konkret yang bisa Anda lihat dan setujui."
          />

          <ol data-reveal-group className="relative z-2 mx-auto section-gap grid max-w-screen-xl grid-cols-1 divide-x divide-neutral-200 border-neutral-200 border-y md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="hover-cell relative flex flex-col justify-between border-b border-neutral-200 p-6 transition-colors duration-200 md:p-8"
              >
                {i === 0 && <Squares />}
                <div className="font-mono text-sm tracking-tight text-brand">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-6 mb-1 font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{step.deliverable}</p>
              </li>
            ))}
          </ol>
        </section>

        <Pricing />

        {/* Portfolio: hairline grid, screenshots above the fold of the card. */}
        <section id="portfolio" className="section-container relative section-pad">
          <div aria-hidden className="bg-points fade-points absolute inset-0" />

          <SectionHeading
            eyebrow="Portofolio"
            title="Beberapa proyek yang pernah kami kerjakan"
            lead="Klik nama proyek untuk membuka situsnya langsung. Keempatnya masih aktif sampai sekarang."
          />

          <div data-reveal-group className="relative z-2 mx-auto section-gap grid max-w-screen-xl grid-cols-1 divide-x divide-neutral-200 border-neutral-200 border-y md:grid-cols-2">
            {portfolio.map((item) => (
              <article
                key={item.title}
                className="hover-cell relative flex flex-col border-b border-neutral-200 transition-colors duration-200"
              >
                <Squares />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col"
                >
                  {item.image && (
                    <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-neutral-200 bg-neutral-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={`Tampilan halaman ${item.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 md:p-10">
                    <span className="font-mono text-sm tracking-tight text-neutral-500 uppercase">
                      {item.category}
                    </span>
                    <h3 className="mt-2 mb-1 font-semibold text-neutral-900 transition-colors duration-150 group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">{item.desc}</p>
                    <p className="mt-6 font-mono text-sm tracking-tight text-neutral-500">
                      {item.tags.join(" · ")}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <Faq />
        <ContactForm />

        {/* Closing CTA on the lightest brand tint, so the dark text stays
            readable and the purple button still has a 4.74:1 boundary. */}
        <section className="on-brand section-container relative flex flex-col items-center justify-center bg-brand-tint section-pad text-center">
          <div className="w-full">
            <h2 className="text-neutral-900">
              Ceritakan dulu kebutuhannya, belum perlu langsung deal
            </h2>
            <p className="mb-5 mt-4 text-neutral-600 md:mb-11 md:text-lg lg:text-xl">
              Konsultasi pertama gratis dan tanpa kewajiban. Kami cuma perlu
              tahu jenis bisnis Anda sebelum menyebutkan angka.
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
              <a
                href={`https://wa.me/${site.contact.waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-fit max-w-full items-center justify-center border border-brand bg-brand-solid px-6 text-base tracking-tight text-white transition-colors duration-300 hover:border-brand-deep hover:bg-brand-deep sm:px-8 sm:text-lg md:w-auto"
              >
                Konsultasi WhatsApp
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex h-12 w-fit max-w-full items-center justify-center border border-neutral-200 bg-surface px-6 text-base tracking-tight text-neutral-800 transition-colors duration-300 hover:bg-neutral-100 sm:px-8 sm:text-lg md:w-auto"
              >
                Kirim email
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
