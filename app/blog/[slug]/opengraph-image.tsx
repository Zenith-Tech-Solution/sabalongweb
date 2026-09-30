import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return getAllBlogs().map((post) => ({
    id: post.slug,
    alt: `${post.title} — ${post.excerpt}`,
    size,
    contentType,
  }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  const sans = await readFile(
    join(process.cwd(), "assets", "Inter-Medium.ttf")
  );

  const title = post?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage:
            "linear-gradient(oklch(0.546 0.245 262.881) 0%, oklab(0.546 -0.030363 -0.243111 / 0.8) 100%)",
          color: "#FFFFFF",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 600,
              color: "#0075DE",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 28, letterSpacing: -0.4 }}>{site.name}</div>
          <div style={{ fontSize: 24, opacity: 0.6 }}>/ Blog</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            {post?.category ?? "Artikel"}
          </div>
          <div
            style={{
              fontSize: 58,
              lineHeight: 1.1,
              letterSpacing: -2.4,
              fontWeight: 500,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 22, opacity: 0.8 }}>
            {post?.displayDate ?? site.business.areaServed}
          </div>
          <div style={{ fontSize: 22, opacity: 0.8 }}>
            {post
              ? `${post.readingTime} menit baca`
              : site.business.areaServed}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: sans, style: "normal", weight: 500 }],
    }
  );
}