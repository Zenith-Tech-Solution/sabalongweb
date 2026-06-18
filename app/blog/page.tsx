import { getAllBlogs } from "@/lib/blogs"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const blogs = getAllBlogs()
  const image = blogs[0]?.image ?? "/logo-sabalong.png"

  return {
    title: "Blog",
    description: "Tips, panduan, dan insight seputar pembuatan website, desain, dan bisnis digital dari SabalongWeb. Baca artikel terbaru kami!",
    openGraph: {
      title: "Blog - SabalongWeb",
      description: "Tips, panduan, dan insight seputar pembuatan website, desain, dan bisnis digital dari SabalongWeb.",
      url: "https://sabalongweb.vercel.app/blog",
      images: [{ url: image, width: 800, height: 600, alt: "Blog SabalongWeb" }],
    },
    twitter: {
      title: "Blog - SabalongWeb",
      description: "Tips, panduan, dan insight seputar pembuatan website, desain, dan bisnis digital.",
      images: [image],
    },
  }
}

export default function BlogPage() {
  const sorted = getAllBlogs()

  return (
    <main className="bg-primary min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 px-6 font-poppins">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl max-md:text-3xl font-semibold text-[#FFDBFD]">Blog</h1>
            <p className="text-[#FFDBFD]/80 mt-3 max-w-xl mx-auto text-sm">
              Tips, panduan, dan insight seputar pembuatan website, desain, dan bisnis digital.
            </p>
          </div>

          <div className="space-y-6">
            {sorted.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 md:grid-cols-5 gap-6 bg-[#FFDBFD] p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="md:col-span-2 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-3 flex flex-col justify-between text-primary">
                  <div>
                    <h2 className="text-xl font-semibold group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs font-semibold bg-primary/10 px-3 py-1 border border-primary/20">
                        {post.tags[0]}
                      </span>
                      <span className="text-xs opacity-60">{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Image src="/logo-sabalong.png" alt="SabalongWeb" width={18} height={18} className="rounded-full" />
                      <span className="text-xs font-medium text-primary/70">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Baca selengkapnya <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
