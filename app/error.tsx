"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-[#6367FF] flex justify-center items-center w-full flex-col gap-3 px-6 text-center">
      <p className="text-white text-8xl max-md:text-6xl font-bold font-pixelify">500</p>
      <p className="text-white text-3xl max-md:text-2xl font-semibold">Terjadi Kesalahan</p>
      <p className="text-white/80 text-md max-w-md">Maaf, terjadi kesalahan pada server. Silakan coba lagi.</p>
      <button
        onClick={reset}
        className="mt-4 px-6 py-3 bg-[#FFDBFD] text-[#6367FF] font-semibold text-sm transition-all duration-500 ease-out hover:scale-105"
      >
        Coba Lagi
      </button>
    </main>
  )
}
