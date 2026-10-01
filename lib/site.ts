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

  title: "Jasa Pembuatan Website Murah Mulai Rp350 Ribu | SabalongWeb",
  titleTemplate: "%s | SabalongWeb",

  description:
    "Butuh website untuk bisnis Anda? SabalongWeb melayani pembuatan website murah dan profesional mulai Rp350 ribu. Konsultasi pertama gratis, tanpa komitmen.",

  keywords: [
    "jasa pembuatan website murah",
    "jasa website Indonesia",
    "pembuatan website profesional",
    "landing page murah",
    "company profile",
    "toko online",
    "UI/UX design",
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
    /**
     * Region claims were pulled from the copy on request: the page now sells the
     * price and the turnaround, not a location. `country` stays because a
     * PostalAddress without it is not a valid schema.org node; the city and
     * province are gone rather than moved somewhere quieter.
     */
    address: {
      country: "ID",
    },
    /** No city or province named anywhere, including JSON-LD. */
    areaServed: "Indonesia",
    priceRange: "Rp350.000 - Rp2.500.000",
    /** schema.org form — must stay machine-readable. */
    openingHours: "Mo-Su 08:00-22:00",
    /** Human form for the contact section. */
    openingHoursLabel: "Setiap hari, 08.00-22.00",
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