import Image from "next/image"
import Navbar from "@/components/Navbar"
import { ArrowUpRight } from "lucide-react"
import { marked } from "marked"
import Link from "next/link"
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

marked.setOptions({
  breaks: true,
  gfm: true,
})

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://sabalongweb.vercel.app/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image, width: 900, height: 500, alt: post.title }],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://sabalongweb.vercel.app/blog/${post.slug}`,
    },
  }
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  const allBlogs = getAllBlogs()
  const related = allBlogs.filter((b) => b.slug !== slug).slice(0, 2)
  const htmlContent = marked.parse(post.content) as string

  return (
    <main className="bg-primary min-h-screen font-poppins">
      <Navbar />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[#FFDBFD]/70 hover:text-[#FFDBFD] text-sm mb-8 transition-all"
          >
            <ArrowUpRight size={14} className="rotate-180" /> Kembali ke Blog
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold text-primary bg-[#FFDBFD] px-3 py-1">
                  {tag}
                </span>
              ))}
              <span className="text-xs text-[#FFDBFD]/60">{post.date}</span>
            </div>
            <h1 className="text-4xl max-md:text-2xl font-semibold text-[#FFDBFD] leading-tight">
              {post.title}
            </h1>
            <p className="text-[#FFDBFD]/60 text-sm mt-2">Oleh {post.author}</p>
          </div>

          <div className="mb-10 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={900}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          <div
            className="blog-content text-[#FFDBFD] max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#FFDBFD]/20">
              <h3 className="text-2xl font-semibold text-[#FFDBFD] mb-6">Artikel Terkait</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group bg-[#FFDBFD] p-5 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 border border-primary/20">
                        {item.tags[0]}
                      </span>
                    </div>
                    <h4 className="text-primary font-semibold group-hover:underline">{item.title}</h4>
                    <p className="text-primary/70 text-xs mt-1">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
