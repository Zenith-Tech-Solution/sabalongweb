"use client"

import Link from "next/link"

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
      className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center"
    >
      <p className="font-mono text-label uppercase text-ink-faint">Error 500</p>
      <h1 className="max-w-xl text-section">Terjadi kesalahan di sisi kami</h1>
      <p className="max-w-md text-lead text-ink-muted">
        Bukan salah Anda. Coba muat ulang sekali — kalau masih muncul, kabari
        kami lewat WhatsApp supaya kami bisa menelusurinya.
      </p>
      {error.digest && (
        <p className="font-mono text-label text-ink-faint">ref: {error.digest}</p>
      )}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
        <button
          type="button"
          onClick={reset}
          className="bg-accent px-6 py-3 text-body font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
        >
          Coba lagi
        </button>
        <Link
          href="/"
          className="text-body text-ink-muted transition-colors duration-150 hover:text-ink"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  )
}
