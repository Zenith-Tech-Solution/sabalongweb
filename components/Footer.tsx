import Link from "next/link"
import Image from "next/image"
import { site, waLink } from "@/lib/site"
import { navLinks, pricingGroups, services } from "@/lib/content"

/**
 * Reference-site footer: brand block on the left, link columns on the right, a
 * hairline bar underneath. Blue used once — the wordmark's tagline.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-canvas">
      <div className="mx-auto w-full max-w-screen-xl px-4 pt-10 pb-8 md:pt-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-12">
          <div className="w-full max-w-[340px]">
            <Image
              src="/logo-sabalong.png"
              alt={`Logo ${site.name}`}
              width={40}
              height={40}
              className="mb-6 size-10"
            />
            {/* The one line of the site that is allowed to be fully brand
                coloured, because it is the sentence that explains the logo. */}
            <p className="text-xl font-medium tracking-tight text-pretty text-brand">
              Jasa pembuatan website murah mulai Rp350 ribu. Kami membuat,
              menguji, dan menyerahkan website yang siap Anda pakai.
            </p>

            <div className="my-8 flex items-center gap-6 lg:my-10">
              <a
                href={waLink("Halo, saya mau tanya soal website yang Anda buat.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm text-neutral-500 transition-colors duration-100 hover:text-neutral-900"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-11 items-center text-sm text-neutral-500 transition-colors duration-100 hover:text-neutral-900"
              >
                Email
              </a>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-10 lg:w-fit lg:flex lg:flex-wrap lg:justify-end lg:gap-6">
            <div className="flex min-w-[164px] flex-col">
              <h4 className="mb-6 text-base font-medium text-neutral-900">Halaman</h4>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-neutral-500 transition-colors duration-100 hover:text-neutral-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-[164px] flex-col">
              <h4 className="mb-6 text-base font-medium text-neutral-900">Layanan</h4>
              <ul className="flex flex-col gap-1">
                {services.map((service) => (
                  <li key={service.title}>
                    <Link
                      href="/#layanan"
                      className="inline-flex min-h-11 items-center text-neutral-500 transition-colors duration-100 hover:text-neutral-900"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-[164px] flex-col">
              <h4 className="mb-6 text-base font-medium text-neutral-900">Harga</h4>
              <ul className="flex flex-col gap-1">
                {pricingGroups.map((group) => (
                  <li key={group.id}>
                    <Link
                      href="/#harga"
                      className="inline-flex min-h-11 items-center text-neutral-500 transition-colors duration-100 hover:text-neutral-900"
                    >
                      {group.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex min-w-[164px] flex-col">
              <h4 className="mb-6 text-base font-medium text-neutral-900">Kontak</h4>
              <ul className="flex flex-col gap-4 text-neutral-500">
                <li>{site.contact.waDisplay}</li>
                <li>{site.contact.email}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
            © {year} {site.name}. Seluruh hak dilindungi.
          </p>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center text-sm text-neutral-500 transition-colors duration-100 hover:text-neutral-900"
          >
            Blog
          </Link>
        </div>
      </div>
    </footer>
  )
}
