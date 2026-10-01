"use client"

import Link from "next/link"

/**
 * 500. Follows the same shape as `not-found.tsx`: one centred `max-w-xl`
 * column, so the block stays optically centred instead of drifting because the
 * ref line is narrower than the heading. It used to lay itself out with `gap-5`
 * and a bare `bg-accent` button, which is not the button this site uses
 * anywhere else — every other call to action is a bordered brand fill at a
 * fixed `h-12`, so a shorter, borderless pill here read as a different system.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      id="main"
      className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <p className="font-mono text-label text-ink-faint uppercase">Error 500</p>

        <h1 className="mt-4 text-section text-balance text-ink">
          Terjadi kesalahan di sisi kami
        </h1>

        <p className="mt-4 text-lead text-ink-muted">
          Bukan salah Anda. Coba muat ulang sekali — kalau masih muncul, kabari
          kami lewat WhatsApp supaya kami bisa menelusurinya.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-label text-ink-faint">
            ref: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-12 items-center justify-center border border-brand bg-brand-solid px-6 text-body font-medium text-white transition-colors duration-150 hover:border-brand-deep hover:bg-brand-deep"
          >
            Coba lagi
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border border-neutral-200 bg-surface px-6 text-body font-medium text-ink transition-colors duration-150 hover:bg-neutral-100"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </main>
  )
}
