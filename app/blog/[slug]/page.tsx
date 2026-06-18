"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import { ArrowUpRight } from "lucide-react"
import { marked } from "marked"
import Link from "next/link"

marked.setOptions({
  breaks: true,
  gfm: true,
})

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  author: string
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch(`/api/blogs?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data)
        fetch("/api/blogs")
          .then((r) => r.json())
          .then((all) => setRelated(all.filter((b: BlogPost) => b.slug !== slug).slice(0, 2)))
      })
      .catch(() => {})
  }, [slug])

  useEffect(() => {
    if (!post) return

    const baseUrl = "https://sabalongweb.vercel.app"
    const pageUrl = `${baseUrl}/blog/${post.slug}`
    const imageUrl = `${baseUrl}${post.image}`

    document.title = `${post.title} | SabalongWeb`

    const setOrUpdateMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, value)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    setOrUpdateMeta("property", "og:title", post.title)
    setOrUpdateMeta("property", "og:description", post.excerpt)
    setOrUpdateMeta("property", "og:image", imageUrl)
    setOrUpdateMeta("property", "og:url", pageUrl)
    setOrUpdateMeta("property", "og:type", "article")
    setOrUpdateMeta("name", "twitter:title", post.title)
    setOrUpdateMeta("name", "twitter:description", post.excerpt)
    setOrUpdateMeta("name", "twitter:image", imageUrl)
    setOrUpdateMeta("name", "description", post.excerpt)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", pageUrl)
  }, [post])

  const htmlContent = useMemo(() => {
    if (!post) return ""
    return marked.parse(post.content) as string
  }, [post])

  if (!post) {
    return (
      <main className="bg-primary min-h-screen font-poppins">
        <Navbar />
        <div className="pt-32 text-center text-[#FFDBFD]">Loading...</div>
      </main>
    )
  }

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
