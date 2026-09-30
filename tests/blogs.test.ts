import test from "node:test"
import assert from "node:assert/strict"
import { toIsoDate, getAllBlogs } from "../lib/blogs.ts"

/**
 * Regression cover for the date parser.
 *
 * The old implementation reversed `"19 Juni 2026"` into `"2026-Juni-2026"` and
 * relied on V8's lenient date parser, which only understands 8 of the 12
 * Indonesian month names. Mei, Agustus, Oktober, and Desember produced
 * `Invalid Date`, so the blog sort silently became a no-op.
 */

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

test("parses every Indonesian month name", () => {
  BULAN.forEach((month, index) => {
    const expectedMonth = String(index + 1).padStart(2, "0")
    assert.equal(
      toIsoDate(`19 ${month} 2026`),
      `2026-${expectedMonth}-19`,
      `"19 ${month} 2026" should normalise to 2026-${expectedMonth}-19`
    )
  })
})

test("accepts months that V8's lenient parser rejects", () => {
  // These four are the ones that silently became Invalid Date.
  for (const month of ["Mei", "Agustus", "Oktober", "Desember"]) {
    const iso = toIsoDate(`5 ${month} 2026`)
    assert.ok(!Number.isNaN(new Date(iso).getTime()), `${month} must be a real date`)
  }
})

test("passes ISO dates through and pads single digits", () => {
  assert.equal(toIsoDate("2026-06-19"), "2026-06-19")
  assert.equal(toIsoDate("2026-6-9"), "2026-06-09")
})

test("leaves unparseable input untouched instead of emitting NaN", () => {
  assert.equal(toIsoDate("nanti"), "nanti")
  assert.equal(toIsoDate(undefined), "")
})

test("published posts are sorted newest first with derived fields", () => {
  const posts = getAllBlogs()
  assert.ok(posts.length > 0, "expected at least one blog post")

  for (const post of posts) {
    assert.ok(
      !Number.isNaN(new Date(post.date).getTime()),
      `${post.slug} has an unparseable date: ${post.date}`
    )
    assert.match(post.displayDate, /\d{4}$/, `${post.slug} displayDate should end in a year`)
    assert.ok(post.readingTime >= 1, `${post.slug} readingTime should be at least 1`)
    assert.ok(post.category.length > 0, `${post.slug} needs a category`)
    assert.ok(post.coverAlt.length > 0, `${post.slug} needs coverAlt`)
  }

  const timestamps = posts.map((post) => new Date(post.date).getTime())
  const sorted = [...timestamps].sort((a, b) => b - a)
  assert.deepEqual(timestamps, sorted, "posts must be newest first")
})
