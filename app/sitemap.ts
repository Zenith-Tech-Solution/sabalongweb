import type { MetadataRoute } from "next"
import { getAllBlogs } from "@/lib/blogs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getAllBlogs()

  const blogUrls = blogs.map((blog) => ({
    url: `https://sabalongweb.vercel.app/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: "https://sabalongweb.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogUrls,
  ]
}
