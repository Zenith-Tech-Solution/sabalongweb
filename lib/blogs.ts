import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  image: string
  tags: string[]
  author: string
}

export interface BlogPost extends BlogMeta {
  content: string
}

const contentDir = path.join(process.cwd(), "content/blog")

function parseDate(dateStr: string): string {
  const parts = dateStr.split(" ")
  return parts.reverse().join("-")
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))

  const blogs = files.map((file) => {
    const slug = file.replace(/\.md$/, "")
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8")
    const { data } = matter(raw)
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      tags: data.tags ?? [],
      author: data.author ?? "SabalongWeb",
    }
  })

  return blogs.sort((a, b) => new Date(parseDate(b.date)).getTime() - new Date(parseDate(a.date)).getTime())
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    image: data.image,
    tags: data.tags ?? [],
    author: data.author ?? "SabalongWeb",
    content,
  }
}

export function getLatestBlogs(count: number = 3): BlogMeta[] {
  return getAllBlogs().slice(0, count)
}
