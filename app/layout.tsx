import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Reveal from "@/components/Reveal";
import { site, absoluteUrl } from "@/lib/site";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: site.titleTemplate,
  },
  description: site.description,
  keywords: [...site.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: `+${site.contact.waNumber}`,
  email: site.contact.email,
  image: absoluteUrl("/logo-sabalong.png"),
  logo: absoluteUrl("/logo-sabalong.png"),
  /* No city, no province: the copy revision removed every location claim,
     so naming one here would contradict the page it is describing. */
  address: {
    "@type": "PostalAddress",
    addressCountry: site.business.address.country,
  },
  priceRange: site.business.priceRange,
  areaServed: {
    "@type": "Country",
    name: site.business.areaServed,
  },
  openingHours: site.business.openingHours,
  sameAs: [
    site.url,
    `https://wa.me/${site.contact.waNumber}`,
    `mailto:${site.contact.email}`,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={site.lang}
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="oR1vFDbIf-85CemIwzQupghHx1F07kWTM9UCqgzdTG8"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:focus:bg-accent focus:px-6 focus:py-3 focus:text-body focus:text-white"
        >
          Lewati ke konten
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Reveal />
        {children}
      </body>
    </html>
  );
}