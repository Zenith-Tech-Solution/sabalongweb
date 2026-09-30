/**
 * Single source of truth for site-wide constants.
 *
 * The canonical origin lives in `NEXT_PUBLIC_SITE_URL`. Until a real domain is
 * purchased it falls back to the Vercel deployment, so no file needs to be
 * edited by hand when the domain changes.
 */
const FALLBACK_URL = "https://sabalongweb.vercel.app"

export const site = {
  name: "SabalongWeb",

  /** Canonical origin, no trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/$/, ""),

  title: "SabalongWeb — Jasa Pembuatan Website Nusa Tenggara Barat",
  titleTemplate: "%s | SabalongWeb",

  description:
    "Studio kreatif Nusa Tenggara Barat yang membuat website profesional untuk bisnis: landing page, company profile, toko online, UI/UX design, dan SEO. Mulai dari Rp350K.",

  keywords: [
    "jasa pembuatan website",
    "jasa website Nusa Tenggara Barat",
    "jasa website Indonesia",
    "pembuatan website profesional",
    "landing page murah",
    "company profile",
    "toko online",
    "UI/UX design",
    "jasa SEO",
    "web developer",
  ],

  locale: "id_ID",
  lang: "id",

  contact: {
    waNumber: "6283162564970",
    waDisplay: "0831 6256 4970",
    email: "sabalongweb@gmail.com",
  },

  business: {
    /** Real postal address, surfaced on the contact section and in JSON-LD. */
    address: {
      locality: "Sumbawa Besar",
      region: "Nusa Tenggara Barat",
      country: "ID",
    },
    /** Region the service is marketed to. Deliberately broader than the city. */
    areaServed: "Nusa Tenggara Barat",
    priceRange: "Rp350K - Rp2,5JT",
    openingHours: "Mo-Su 08:00-22:00",
  },
} as const

/** Builds a wa.me deep link with a pre-filled, URL-encoded message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.contact.waNumber}?text=${encodeURIComponent(message)}`
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`
}