import Link from "next/link"
import CommentMarquee from "@/components/CommentMarquee"
import DotField from "@/components/DotField"
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
          Jasa Pembuatan Website Murah, Mulai dari Rp350 Ribu.
        </h1>

        {/* No jargon and no fourth clause. "Source code", "template yang
            dipakai ulang", and "biaya yang muncul diam-diam" were all things a
            business owner has to stop and decode; ownership is said as
            "milik Anda", which is the same promise in plain words. */}
        <p
          className="blur-up mt-4 max-w-screen-md text-base text-white/90 md:mt-6 md:text-lg"
          style={{ "--delay": "0.2s" } as React.CSSProperties}
        >
          Kami bantu bisnis Anda tampil profesional di dunia digital, dengan
          proses yang jelas dan harga yang bersahabat.
        </p>

        <div
          className="blur-up relative mt-12 grid w-fit max-w-full grid-cols-1 items-center justify-center gap-2 md:flex md:w-full md:flex-row"
          style={{ "--delay": "0.6s" } as React.CSSProperties}
        >
          {/* The dot field sits behind the CTA row and fades out radially, so the band
              around the buttons is not flat purple. Masked, not bordered, which
              is why it never draws a visible edge. `-z-1` keeps it under the
              buttons without needing a z-index on every link. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-1 h-72 -translate-y-1/2 md:h-96"
            aria-hidden
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 45%, #000 0%, rgb(0 0 0 / 0.55) 45%, transparent 78%)",
            }}
          >
            <DotField cell={22} size={3} tint="rgb(255 255 255 / 0.5)" />
          </div>

          <a
            href={`https://wa.me/${site.contact.waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            /* Inverted like the nav CTA: white on purple is 1.00, white-on-white
               is 7.34 for the label and 4.74 against the header.

               `w-full` at every width is what made these read as slabs: a
               320px-wide button holding "Konsultasi WhatsApp" stretched the
               label across the whole screen with the padding as the only
               inset. `grid w-fit grid-cols-1` stacks the two
               labels as equal-width pills on mobile, centred as a pair, and `md:w-auto` returns the full row
               once there is width to spend. Height stays `h-12` everywhere —
               that is the touch target, not a styling choice. */
            className="inline-flex h-12 w-full max-w-full items-center justify-center border border-white bg-white px-6 text-base tracking-tight text-brand-deep transition-colors duration-300 hover:border-lavender hover:bg-lavender sm:px-8 sm:text-lg md:w-auto"
          >
            Konsultasi via WhatsApp
          </a>
          <Link
            href="/#harga"
            /* Ghost, not tinted: brand-deep/40 landed 5.65 for the text but only
               1.19 against the header, so the edge vanished. A white border
               gives a 4.74 boundary and keeps the fill clear. Sized to match
               the WhatsApp pill above. */
            className="inline-flex h-12 w-full max-w-full items-center justify-center border border-white bg-transparent px-6 text-base tracking-tight text-white transition-colors duration-300 hover:bg-white hover:text-brand-deep sm:px-8 sm:text-lg md:w-auto"
          >
            Lihat Harga
          </Link>
        </div>

        {/* Client quotes sit under the ask, inside the hero, full-bleed. White
            cards on brand purple keep the quote text at 7.34 — on a white band
            the same cards measured 1.04 against it and disappeared. No bottom
            padding: the strip's bottom rule has to land on the stats grid's top
            rule so the two read as one panel, and that only holds flush. */}
        <div className="mt-12 w-full md:mt-16">
          <CommentMarquee />
        </div>
      </div>
    </header>
  )
}
