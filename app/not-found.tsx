import Link from "next/link"
import { navLinks } from "@/lib/content"

/**
 * 404. Centred on a single axis: one eyebrow, one heading, one action, then the
 * route list as a quiet bordered strip. Everything shares `mx-auto` and a
 * measured max-width, so the block stays optically centred instead of drifting
 * because one row happens to be wider than the others.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <p className="font-mono text-label text-ink-faint uppercase">Error 404</p>

        <h1 className="mt-4 text-section text-balance text-ink">
          Halaman ini tidak ada
        </h1>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center border border-brand bg-brand-solid px-6 text-body font-medium text-white transition-colors duration-150 hover:border-brand-deep hover:bg-brand-deep"
        >
          Kembali ke beranda
        </Link>
      </div>

      {/* Full-bleed rule so the list spans the same measure as the block above
          it. A narrower list under a wider heading reads as misaligned. */}
      <div className="mx-auto mt-14 w-full max-w-xl border-t border-line">
        <h2 className="mt-6 font-mono text-label text-ink-faint uppercase">
          Atau ke halaman ini
        </h2>
        <ul className="mt-3 divide-y divide-line">
          {navLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="-mx-2 flex items-center justify-between px-2 py-3 text-body text-ink-muted transition-colors duration-150 hover:text-ink"
                >
                  {link.label}
                  <span aria-hidden className="text-ink-faint">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  )
}
