import { NextRequest, NextResponse } from "next/server"
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs"

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")
  if (slug) {
    const post = getBlogBySlug(slug)
    if (!post) return NextResponse.json(null, { status: 404 })
    return NextResponse.json(post)
  }
  const blogs = getAllBlogs()
  return NextResponse.json(blogs)
}
