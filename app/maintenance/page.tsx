import Image from "next/image"
import { site } from "@/lib/site"

export default function Maintenance() {
  return (
    <main
      id="main"
      className="relative flex min-h-dvh flex-col items-center justify-center gap-6 overflow-hidden px-6 py-24 text-center"
    >
      {/* The same pixel field as the hero, so the maintenance page still looks
          like this site rather than a bare error screen. Dark tint here: the
          hero sits on purple where light dots read, this sits on white where
          they would be invisible. */}
      <div
        className="pixel-vignette pointer-events-none absolute inset-0"
        style={{ ["--tint" as string]: "rgb(27 27 24 / 0.28)" }}
        aria-hidden
      />

      <div className="relative z-2 flex flex-col items-center gap-6">
        <Image
          src="/maintenace.png"
          alt=""
          width={802}
          height={786}
          priority
          className="h-auto w-32"
        />
        <p className="font-mono text-label uppercase text-ink-faint">
          Sedang diperbaiki
        </p>
        <h1 className="max-w-xl text-section text-balance">
          Situs ini sedang downtime singkat
        </h1>
        <p className="max-w-md text-lead text-ink-muted">
          Sedikit maintenance. Halaman biasanya kembali dalam beberapa menit —
          kalau tidak, kabari kami dan kami cek dari sisi kami.
        </p>
        <a
          href={`https://wa.me/${site.contact.waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex h-12 items-center justify-center bg-brand-solid px-6 text-body font-medium text-white transition-colors duration-150 hover:bg-brand-deep"
        >
          Hubungi kami
        </a>
      </div>
    </main>
  )
}
