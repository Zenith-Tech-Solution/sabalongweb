"use client"

import { useState } from "react"
import Image from "next/image"
import { LuChevronDown } from "react-icons/lu"
import { site, waLink } from "@/lib/site"
import SectionHeading from "@/components/SectionHeading"

/**
 * The form composes a pre-filled WhatsApp message instead of POSTing anywhere.
 *
 * That is a deliberate product decision, not a shortcut: a studio of this size
 * has no backend to receive leads, and a real inbox beats a silent 200. The
 * category picker is a native `<select>` so it is keyboard- and mobile-native
 * without a custom listbox.
 */

const categories = [
  { value: "website", label: "Jasa Pembuatan Website" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "custom", label: "Produk Lainnya" },
] as const

const contactRows = [
  { label: "WhatsApp", value: site.contact.waDisplay, href: `https://wa.me/${site.contact.waNumber}` },
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Jam kerja", value: site.business.openingHoursLabel },
] as const

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", category: "website" })

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, phone, category } = form
    if (!name.trim() || !phone.trim()) return
    const label =
      categories.find((c) => c.value === category)?.label ?? category
    window.open(
      waLink(
        `Halo ${site.name}, saya ${name.trim()}.\n\n` +
          `No. WhatsApp: ${phone.trim()}\n` +
          `Saya butuh: ${label}\n\n` +
          `Boleh minta estimasi harga dan waktunya?`,
      ),
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section id="kontak" className="section-container relative section-pad">
      <div aria-hidden className="bg-points fade-points absolute inset-0" />

      <SectionHeading
        eyebrow="Kontak"
        title="Ceritakan kebutuhan Anda"
        lead="Cukup satu percakapan untuk tahu apakah kami cocok dengan kebutuhan Anda. Biasanya kami membalas di hari yang sama."
      />

      <div data-reveal-group className="relative z-2 mx-auto section-gap grid max-w-screen-xl grid-cols-1 divide-x divide-neutral-200 border-neutral-200 border-y lg:grid-cols-2">
        {/* Contact details */}
        <div className="relative p-6 md:p-10">
          <span className="small-square square-tl" aria-hidden />
          <span className="small-square square-bl" aria-hidden />

          <div className="flex items-center gap-4">
            <Image
              src="/logo-sabalong.png"
              alt={`Logo ${site.name}`}
              width={40}
              height={40}
              className="size-10"
            />
            <div>
              <p className="font-medium tracking-tight text-neutral-900">{site.name}</p>
              <p className="text-sm text-neutral-500">WhatsApp &amp; email aktif setiap hari</p>
            </div>
          </div>

          <dl className="mt-8">
            {contactRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b border-neutral-200 py-4 last:border-b-0"
              >
                <dt className="text-sm text-neutral-500">{row.label}</dt>
                <dd className="text-right tracking-tight text-neutral-900">
                  {"href" in row ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center transition-colors duration-150 hover:text-brand"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="relative p-6 md:p-10">
          <span className="small-square square-tr" aria-hidden />
          <span className="small-square square-br" aria-hidden />

          <div className="grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-neutral-500">
                Nama
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Nama lengkap Anda"
                className="mt-2 w-full border border-neutral-200 bg-surface px-4 py-3 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-neutral-500">
                Nomor WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="08xx xxxx xxxx"
                className="mt-2 w-full border border-neutral-200 bg-surface px-4 py-3 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm text-neutral-500">
                Kebutuhan Anda
              </label>
              {/* `appearance-none` removes the native arrow, so the chevron has to
                  be put back by hand or the field just reads as a text input.
                  `peer` lets it flip to point-up while the field is engaged. */}
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={(e) => set("category")(e.target.value)}
                  className="peer mt-2 w-full appearance-none border border-neutral-200 bg-surface py-3 pl-4 pr-11 text-body text-neutral-900 focus:border-brand focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <LuChevronDown
                  size={18}
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-transform duration-200 peer-focus:rotate-180"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center border border-brand bg-brand-solid px-6 text-lg tracking-tight text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              Kirim via WhatsApp
            </button>

            <p className="text-xs text-neutral-500">
              Tombol ini akan membuka WhatsApp dengan pesan yang sudah terisi.
              Data Anda tidak disimpan di situs ini.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
