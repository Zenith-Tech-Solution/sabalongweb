import Image from "next/image"
import Link from "next/link"
import { LuArrowUpRight } from "react-icons/lu"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { getAllBlogs } from "@/lib/blogs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Catatan praktis soal pembuatan website, desain, dan biaya dari studio kami.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  const posts = getAllBlogs()
  const featured = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post.slug !== featured?.slug)

  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <section className="px-4 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-screen-xl">
            <h1 className="mt-6 max-w-3xl text-balance">Catatan dari studio</h1>
            <p className="mt-6 max-w-2xl text-lead text-ink-muted">
              Tulisan soal hal yang sering ditanya klien: biaya, proses, dan
              keputusan teknis yang jarang dijelaskan di mana-mana.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 md:pb-32 lg:pb-40">
          <div className="mx-auto max-w-screen-xl">
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-6 border-b border-neutral-200 pb-12 md:grid-cols-12 md:items-center"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-neutral-50 md:col-span-6">
                  <Image
                    src={featured.image}
                    alt={featured.coverAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="md:col-span-6">
                  <p className="font-mono text-label uppercase text-ink-faint">
                    Artikel pilihan
                  </p>
                  <h2 className="mt-4 text-lead text-balance transition-colors duration-150 group-hover:text-accent">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-body text-ink-muted">{featured.excerpt}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-body text-ink-muted transition-colors duration-150 group-hover:text-ink">
                    Baca selengkapnya
                    <LuArrowUpRight size={16} aria-hidden />
                  </p>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <>
                <h2 className="mt-16 font-mono text-label uppercase text-ink-faint">
                  Artikel terbaru
                </h2>
                <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2">
                  {rest.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-50">
                        <Image
                          src={post.image}
                          alt={post.coverAlt}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-4 font-mono text-label uppercase text-ink-faint">
                        {post.category} · {post.readingTime} menit
                      </p>
                      <h3 className="mt-2 text-body font-medium text-balance transition-colors duration-150 group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-body text-ink-muted">{post.excerpt}</p>
                      <p className="mt-3 text-label text-ink-faint">
                        {post.displayDate}
                      </p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
