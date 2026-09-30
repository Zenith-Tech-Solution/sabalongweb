import Link from "next/link"
import CommentMarquee from "@/components/CommentMarquee"
import { site } from "@/lib/site"

/**
 * Hero: full-bleed brand purple, then a framed panel that hangs 80px below the
 * colour break — the same structural move the reference site uses for its code
 * panels. The panel is the page's one elevation, so it is the only thing with a
 * shadow.
 *
 * The purple is the point: this is the one section that stays saturated on
 * purpose, so the page opens on brand rather than on white. The two edge blooms
 * are brand purple too, not the blue-400 this used to be hardcoded to — blue on
 * purple read as a mistake.
 */
export default function Hero() {
  return (
    <header className="relative w-full overflow-x-clip bg-brand-solid pt-24 text-white">
      {/* Soft light blooms bleeding in from both edges. Purely decorative. */}
      <div
        aria-hidden
        className="absolute top-0 -left-[400px] h-full w-1/2 opacity-40 blur-[120px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(96,96,240,0.55) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 -right-[400px] h-full w-1/2 opacity-40 blur-[120px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(96,96,240,0.55) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex flex-col items-center justify-center pt-12 text-center md:pt-28">
        <h1 className="blur-up mx-auto max-w-screen-lg" style={{ "--delay": "0s" } as React.CSSProperties}>
          Website yang benar-benar jalan, bukan sekadar tampil bagus
        </h1>

        {/* No jargon and no fourth clause. "Source code", "template yang
            dipakai ulang", and "biaya yang muncul diam-diam" were all things a
            business owner has to stop and decode; ownership is said as
            "milik Anda", which is the same promise in plain words. */}
        <p
          className="blur-up mt-5 max-w-screen-md text-lg text-white md:mt-6 md:text-xl"
          style={{ "--delay": "0.2s" } as React.CSSProperties}
        >
          Dibuat khusus untuk Anda, diuji langsung di HP, lalu semuanya jadi
          milik Anda. Tidak ada biaya tersembunyi.
        </p>

        <div
          className="blur-up relative mt-12 flex w-full flex-col justify-center gap-2 md:flex-row"
          style={{ "--delay": "0.6s" } as React.CSSProperties}
        >
          {/* The pixel field sits behind the CTA row and fades out radially, so
              the band around the buttons is not flat purple. It is masked, not
              bordered, which is why it never draws a visible edge. `-z-1` keeps
              it under the buttons without needing a z-index on every link. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-1 h-72 -translate-y-1/2 md:h-96"
            aria-hidden
            style={{ ["--tint" as string]: "rgb(255 255 255 / 0.55)" }}
          >
            <div className="pixel-vignette size-full" />
          </div>

          <a
            href={`https://wa.me/${site.contact.waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            /* Inverted like the nav CTA: white on purple is 1.00, white-on-white
               is 7.34 for the label and 4.74 against the header. */
            className="inline-flex h-12 w-full items-center justify-center border border-white bg-white px-6 text-lg tracking-tight text-brand-deep transition-colors duration-300 hover:bg-lavender hover:border-lavender md:w-auto"
          >
            Konsultasi WhatsApp
          </a>
          <Link
            href="/#harga"
            /* Ghost, not tinted: brand-deep/40 landed 5.65 for the text but only
               1.19 against the header, so the edge vanished. A white border
               gives a 4.74 boundary and keeps the fill clear. */
            className="inline-flex h-12 w-full items-center justify-center border border-white bg-transparent px-6 text-lg tracking-tight text-white transition-colors duration-300 hover:bg-white hover:text-brand-deep md:w-auto"
          >
            Lihat harga
          </Link>
        </div>

        {/* Client quotes sit under the ask, inside the hero, full-bleed. White
            cards on brand purple keep the quote text at 7.34 — on a white band
            the same cards measured 1.04 against it and disappeared, which is
            also why `gradientColor` in CommentMarquee is this purple and not
            white. `mt-12`/`md:mt-16` is the small gap up to the buttons. */}
        <div className="mt-12 w-full md:mt-16">
          <CommentMarquee />
        </div>
      </div>
    </header>
  )
}
