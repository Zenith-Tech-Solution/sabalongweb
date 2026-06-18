import type { Metadata } from "next";
import { Poppins, Pixelify_Sans, } from "next/font/google";
import "./globals.css";
import AosProvider from "@/components/Aos";
import Script from "next/script";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "600", "700"],
  variable: '--font-poppins'
})

const pixelify = Pixelify_Sans({
  variable: '--font-pixelify'
})


export const metadata: Metadata = {
  metadataBase: new URL("https://sabalongweb.vercel.app"),
  title: {
    default: "SabalongWeb - Jasa Pembuatan Website Profesional di Sumbawa Besar, NTB",
    template: "%s | SabalongWeb",
  },
  description: "Jasa pembuatan website profesional di Sumbawa Besar, Nusa Tenggara Barat. Landing page, company profile, toko online, UI/UX design, SEO, dan maintenance website. Mulai dari Rp350K!",
  keywords: ["jasa pembuatan website", "pembuatan website", "Sumbawa Besar", "NTB", "Nusa Tenggara Barat", "jasa website murah", "landing page", "company profile", "toko online", "UI/UX design", "jasa SEO"],
  openGraph: {
    title: "SabalongWeb - Jasa Pembuatan Website Profesional di Sumbawa Besar",
    description: "Jasa pembuatan website profesional di Sumbawa Besar, NTB. Landing page, company profile, toko online, UI/UX design, dan maintenance. Mulai dari Rp350K!",
    url: "https://sabalongweb.vercel.app",
    siteName: "SabalongWeb",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo-sabalong.png",
        width: 800,
        height: 600,
        alt: "SabalongWeb - Jasa Pembuatan Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SabalongWeb - Jasa Pembuatan Website Profesional di Sumbawa Besar",
    description: "Jasa pembuatan website profesional di Sumbawa Besar, NTB. Mulai dari Rp350K!",
    images: ["/logo-sabalong.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sabalongweb.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SabalongWeb",
  description: "Jasa pembuatan website profesional di Sumbawa Besar, NTB. Landing page, company profile, toko online, UI/UX design, SEO, dan maintenance.",
  url: "https://sabalongweb.vercel.app",
  telephone: "+6283824425487",
  email: "sabalongweb@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sumbawa Besar",
    addressRegion: "Nusa Tenggara Barat",
    addressCountry: "ID",
  },
  priceRange: "Rp350K - Rp2,5JT",
  image: "https://sabalongweb.vercel.app/logo-sabalong.png",
  sameAs: [
    "https://wa.me/6283824425487",
    "https://sabalongweb.vercel.app",
  ],
  openingHours: "Mo-Su 08:00-22:00",
  areaServed: {
    "@type": "City",
    name: "Sumbawa Besar",
    sameAs: "https://en.wikipedia.org/wiki/Sumbawa_Besar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${pixelify.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="oR1vFDbIf-85CemIwzQupghHx1F07kWTM9UCqgzdTG8" />
      </head>
      <AosProvider>
      <body className="min-h-full flex flex-col">
        <Script
          id="json-ld-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
      </AosProvider>
    </html>
  );
}
