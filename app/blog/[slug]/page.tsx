import Image from "next/image"
import Link from "next/link"
import { marked } from "marked"
import { LuArrowLeft } from "react-icons/lu"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs"
import { site, absoluteUrl } from "@/lib/site"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

marked.setOptions({ breaks: true, gfm: true })

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: site.name,
      locale: site.locale,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  const related = getAllBlogs()
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
  const htmlContent = marked.parse(post.content) as string

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo-sabalong.png") },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
  }

  return (
    <>
      <Navbar />

      <main id="main" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="px-6 pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="-mb-1 inline-flex min-h-11 items-center gap-1.5 text-body text-ink-muted transition-colors duration-150 hover:text-ink"
            >
              <LuArrowLeft size={16} aria-hidden />
              Kembali ke Blog
            </Link>

            <header className="mt-8">
              <p className="flex flex-wrap items-center gap-2 font-mono text-label uppercase text-ink-faint">
                <span className="text-accent">{post.category}</span>
                <span aria-hidden>·</span>
                <span>{post.displayDate}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime} menit baca</span>
              </p>
              <h1 className="mt-5 text-balance">{post.title}</h1>
              <p className="mt-4 text-lead text-ink-muted">{post.excerpt}</p>
            </header>

            <div className="mt-10 overflow-hidden border border-line">
              <Image
                src={post.image}
                alt={post.coverAlt}
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            <div
              className="blog-content mt-16"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-line px-6 py-24 md:py-32">
            <div className="mx-auto max-w-5xl">
              <h2 className="font-mono text-label uppercase text-ink-faint">
                Artikel terkait
              </h2>
              <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group block"
                  >
                    <p className="font-mono text-label uppercase text-ink-faint">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-body font-medium text-balance transition-colors duration-150 group-hover:text-accent">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-body text-ink-muted">
                      {item.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
