import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogMeta {
  slug: string;
  title: string;
  /** ISO `YYYY-MM-DD`. Sortable and timezone-safe. */
  date: string;
  /** Human-readable Indonesian date, e.g. `19 Juni 2026`. */
  displayDate: string;
  excerpt: string;
  image: string;
  coverAlt: string;
  tags: string[];
  author: string;
  category: string;
  featured: boolean;
  readingTime: number;
}

export interface BlogPost extends BlogMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), "content/blog");

const WORDS_PER_MINUTE = 200;

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Indonesian month names indexed 0-based.
 *
 * The previous implementation reversed the space-separated parts of
 * `"19 Juni 2026"` into `"2026-Juni-19"` and handed that to `new Date()`,
 * relying on V8's lenient parser. V8 only recognises 8 of the 12 Indonesian
 * month names — `Mei`, `Agustus`, `Oktober`, and `Desember` all yield
 * `Invalid Date`, which silently turned the sort below into a no-op.
 */
const BULAN = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
] as const;

/** Normalises frontmatter `date` to ISO `YYYY-MM-DD`, tolerating the legacy format. */
export function toIsoDate(raw: unknown): string {
  const value = String(raw ?? "").trim();

  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value);
  if (iso) {
    const [, year, month, day] = iso;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const legacy = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value);
  if (legacy) {
    const [, day, monthName, year] = legacy;
    const month = BULAN.indexOf(monthName.toLowerCase() as (typeof BULAN)[number]);
    if (month !== -1) {
      return `${year}-${String(month + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }

  return value;
}

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? iso : dateFormatter.format(parsed);
}

function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const blogs = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      const date = toIsoDate(data.date);

      return {
        slug,
        title: data.title,
        date,
        displayDate: formatDate(date),
        excerpt: data.excerpt,
        image: data.image,
        coverAlt: data.coverAlt || data.title,
        tags: data.tags ?? [],
        author: data.author ?? "SabalongWeb",
        category: data.category ?? data.tags?.[0] ?? "Artikel",
        featured: data.featured === true,
        readingTime: estimateReadingTime(content),
      };
    });

  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const date = toIsoDate(data.date);

  return {
    slug,
    title: data.title,
    date,
    displayDate: formatDate(date),
    excerpt: data.excerpt,
    image: data.image,
    coverAlt: data.coverAlt || data.title,
    tags: data.tags ?? [],
    author: data.author ?? "SabalongWeb",
    category: data.category ?? data.tags?.[0] ?? "Artikel",
    featured: data.featured === true,
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getLatestBlogs(count: number = 3): BlogMeta[] {
  return getAllBlogs().slice(0, count);
}