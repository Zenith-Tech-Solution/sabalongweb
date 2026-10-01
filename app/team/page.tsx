import Image from "next/image"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DotField from "@/components/DotField"
import { team } from "@/lib/content"

export const metadata: Metadata = {
  title: "Tim",
  description:
    "Tiga founder SabalongWeb: Rzfan03, Azka, dan Rian. Menangani frontend, backend, dan UI/UX langsung.",
  alternates: { canonical: "/team" },
}

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        {/* `relative` anchors the dot field; the white fade below dissolves it
            into the section underneath, so the two read as one panel instead of
            a pattern that stops at a hard rule. */}
        <section className="relative overflow-hidden px-4 pt-28 pb-16 md:pt-36 md:pb-24">
          <DotField />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-canvas via-canvas/70 to-transparent"
          />
          <div className="relative z-1 mx-auto max-w-screen-xl">
            <h1 className="mt-6 max-w-3xl text-balance">
              Tiga orang, satu studio kecil
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-ink-muted">
              Tidak ada akun manajer di antara Anda dan orang yang menulis
              kodenya. Tiga founder ini yang menangani proyeknya sendiri, mulai
              dari brief sampai website Anda hidup di server.
            </p>
          </div>
        </section>

        <section className="relative px-4 pb-24 md:pb-32 lg:pb-40">
          <span className="small-square square-tl" aria-hidden />
          <span className="small-square square-bl" aria-hidden />

          <div className="relative z-2 mx-auto grid max-w-screen-xl gap-px sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.github}
                className="group relative flex flex-col items-start gap-4 p-6 md:p-8"
              >
                {/* No <Image> optimisation fight: these are third-party avatars
                    on a CDN, already small and already square. */}
                <div className="relative size-20 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
                  <Image
                    src={`https://github.com/${member.github}.png?v=200`}
                    alt={`Foto profil ${member.name} di GitHub`}
                    width={80}
                    height={80}
                    className="size-full object-cover"
                    unoptimized
                  />
                </div>

                <div>
                  <h2 className="text-xl tracking-tight text-neutral-900">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-base tracking-tight text-neutral-600">
                    {member.role}
                  </p>
                </div>

                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center text-sm text-brand-solid transition-colors hover:text-brand-deep"
                >
                  @{member.github}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
