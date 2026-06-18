"use client"

import Navbar from "@/components/Navbar"
import { useState, useRef } from "react"
import Image from "next/image"
import hero from "../public/handphone.png"
import logo from "../public/logo.png"
import Link from "next/link"
import { ArrowUpRight, Code, Palette, Settings, Layers, ChevronLeft, ChevronRight, Mail, Globe, Phone } from "lucide-react"
import image1 from '../public/image1.png'
import image2 from '../public/image2.png'
import image3 from '../public/image3.png'

const tabs = [
  { id: "website", label: "Pricelist Website" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "lainnya", label: "Layanan Lainnya" },
]

const priceData: Record<string, { title: string; plans: { name: string; price: string; highlight?: string; features: string[] }[] }> = {
  website: {
    title: "Website",
    plans: [
      { name: "Basic", price: "350K", features: ["1 Halaman landing page", "Desain responsif mobile & desktop", "Form kontak", "Domain .com/.id (1 tahun)", "Hosting gratis"] },
      { name: "Standard", price: "750K", features: ["5 Halaman", "Desain responsif mobile & desktop", "Form kontak & integrasi sosial media", "Domain .com/.id (1 tahun)", "Hosting gratis", "Optimasi SEO dasar"] },
      { name: "Premium", price: "1,2JT", highlight: "Terlaris", features: ["Halaman tidak terbatas", "Toko online + sistem pembayaran", "Dashboard admin", "Domain premium (1 tahun)", "Hosting gratis", "SEO lanjutan & analitik"] },
    ],
  },
  uiux: {
    title: "UI/UX Design",
    plans: [
      { name: "Basic", price: "150K", features: ["Wireframe 1 halaman utama", "User flow sederhana", "1x revisi"] },
      { name: "Standard", price: "350K", features: ["Wireframe + prototipe interaktif", "3 Halaman", "User flow & sitemap", "3x revisi"] },
      { name: "Premium", price: "550K", highlight: "Terlaris", features: ["Wireframe + prototipe interaktif", "Halaman tidak terbatas", "Riset pengguna", "Design system & komponen", "Unlimited revisi"] },
    ],
  },
  lainnya: {
    title: "Layanan Lainnya",
    plans: [
      { name: "Basic", price: "900K", features: ["Toko online dasar", "10 Produk", "1 Payment gateway", "Desain responsif"] },
      { name: "Standard", price: "1,5JT", features: ["Toko online", "50 Produk", "Multi payment gateway", "Dashboard transaksi", "Manajemen stok"] },
      { name: "Premium", price: "2,5JT", highlight: "Terlaris", features: ["Unlimited produk", "Multi payment gateway", "Dashboard & laporan lengkap", "Sistem informasi terintegrasi", "Fitur kustom sesuai kebutuhan", "Prioritas support"] },
    ],
  },
}

const produkList = [
  {
    icon: Code,
    title: "Jasa Pembuatan Website",
    desc: "Kami membangun website profesional yang sesuai dengan kebutuhan bisnis Anda, dari yang sederhana hingga kompleks.",
    features: ["Landing page profesional & company profile", "Toko online dengan sistem pembayaran", "Optimasi SEO & performa"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Desain antarmuka yang modern, interaktif, dan berfokus pada pengalaman pengguna yang optimal.",
    features: ["Wireframe & prototipe interaktif", "Riset pengguna & user flow", "Desain sistem & component library"],
  },
  {
    icon: Settings,
    title: "Maintenance & Support",
    desc: "Layanan perawatan rutin untuk menjaga website Anda tetap optimal, aman, dan selalu terbarui.",
    features: ["Pembaruan konten & fitur rutin", "Monitoring keamanan & performa", "Backup data & restore"],
  },
  {
    icon: Layers,
    title: "Produk Lainnya",
    desc: "Solusi kustom untuk kebutuhan spesifik bisnis Anda, dikerjakan oleh tim ahli kami.",
    features: ["Sistem informasi manajemen", "E-Commerce khusus sesuai kebutuhan", "Aplikasi web kustom"],
  },
]

const portfolioList = [
  {
    title: "Around World",
    category: "Travel",
    desc: "Platform eksplorasi destinasi wisata dengan informasi lengkap, galeri foto, dan panduan perjalanan untuk membantu merencanakan liburan.",
    tags: ["HTML", "jQuery", "Tailwind CSS"],
    url: "https://aroundworld.netlify.app",
  },
  {
    title: "Voyager Luxe",
    category: "Travel Template",
    desc: "Template website travel mewah dengan desain elegan, smooth scroll, dan booking form interaktif. Cocok untuk agen perjalanan premium.",
    tags: ["HTML", "Tailwind CSS"],
    url: "https://template-web-travel-v1.vercel.app",
  },
  {
    title: "Sijian",
    category: "AI Platform",
    desc: "Simulasi ujian berbasis AI yang mengubah file kisi-kisi (TXT, DOCX, PDF) menjadi soal pilihan ganda acak dalam hitungan detik. Gratis tanpa daftar.",
    tags: ["Next.js", "Tailwind CSS", "AI"],
    url: "https://sijian.vercel.app",
  },
  {
    title: "Arif Car Rental",
    category: "Rental Mobil",
    desc: "Website rental mobil profesional di Ende, Flores, NTT. Menampilkan armada, destinasi wisata, galeri, dan sistem booking terintegrasi WhatsApp.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
    url: "https://template-website-rental-v1.vercel.app",
  },
]

export default function App() {
  const [activeTab, setActiveTab] = useState("website")
  const current = priceData[activeTab]
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 360
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  const [form, setForm] = useState({ nama: "", nomor: "", kategori: "Website", pesan: "" })
  const kategoriList = ["Website", "UI/UX Design", "Lainnya"]

  const faqList = [
    { q: "Berapa lama proses pembuatan website?", a: "Tergantung kompleksitas proyek. Landing page selesai dalam 3-5 hari, company profile 5-10 hari, dan toko online sekitar 10-20 hari." },
    { q: "Apakah domain dan hosting sudah termasuk?", a: "Ya, semua paket kami sudah termasuk domain .com/.id dan hosting gratis selama 1 tahun." },
    { q: "Apika saya bisa request desain sendiri?", a: "Tentu! Kami menerima referensi desain dari klien dan akan mengkombinasikannya dengan keahlian kami untuk hasil terbaik." },
    { q: "Bagaimana jika ada revisi?", a: "Setiap paket menyertakan revisi sesuai ketentuan. Untuk perubahan besar, kami akan diskusikan terlebih dahulu." },
    { q: "Apakah website saya akan responsive?", a: "Semua website yang kami buat sudah responsive dan tampil optimal di desktop, tablet, maupun smartphone." },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Halo SabalongWeb, saya ${form.nama} ingin memesan ${form.kategori}.%0ANomor saya: ${form.nomor}%0APesan: ${form.pesan}`
    window.open(`https://wa.me/6283824425487?text=${text}`, "_blank")
  }

  return (
    <main className="bg-primary min-h-screen overflow-x-hidden">
      <Navbar />

      {/*home section*/}
      <section  id="Home" className="relative bg-primary min-h-screen flex p-8 max-md:flex-col justify-center items-center pb-24 md:pb-40">
        <div data-aos="fade-up" className="flex justify-around w-full max-w-8xl max-md:flex-col-reverse items-center z-10">
          <div className="flex z-50 flex-col max-md:items-center gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="font-poppins text-white text-8xl font-semibold gap-3 max-w-2xl max-md:text-4xl">
                Solusi Pembuatan <span className="font- text-[#FFDBFD]">Website </span>Professional.
              </h1>
              <p className="text-lg text-[#FFDBFD] max-w-2xl max-md:text-sm">
                Kembangkan bisnis Anda di era digital bersama <span className="underline text-white">SabalongWeb</span> Mulai dari pembuatan landing page, website perusahaan, toko online, hingga sistem informasi khusus.
              </p>
            </div>
            
            <div className="flex gap-3 items-center">
              <a href="https://wa.me/6283824425487" target="_blank" rel="noopener noreferrer" className="px-2 py-2 bg-[#FFDBFD] font-poppins hover:scale-105 transition-all duration-500 ease-out inline-flex items-center gap-2 text-primary">
                Konsultasi via WhatsApp <ArrowUpRight/>
              </a>
              <a href="#portfolio" className="px-2 py-2 border border-[#FFDBFD] font-poppins hover:bg-[#FFDBFD] transition-all duration-500 ease-out inline-flex items-center gap-2 text-[#FFDBFD] hover:text-primary">
                Cek Portofolio <ArrowUpRight/>
              </a>
            </div>
          </div>

          <div className="relative">
            <Image className="z-50 relative" src={hero} width={670} height={120} alt="handphone" />
            <span className="absolute bg-[#FFDBFD] max-md:hidden h-120 w-120 top-64 left-12 bottom-0 rounded-full"></span>
          </div>
        </div>

        <div className="w-full absolute bottom-0 left-0 leading-[0] border-none z-0 -mb-[1px]"> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block border-none">
            <path fill="#FFDBFD" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/*tentang section*/}
      <section id="tentang" className="relative min-h-[80vh] bg-[#FFDBFD] p-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, #6367FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="flex flex-col justify-center items-center gap-8 mt-8 relative z-10">
          <div className="flex justify-center items-center w-full gap-3">
            <p data-aos="fade-up" className="text-5xl max-md:text-2xl mb-5 font-medium text-primary font-poppins max-w-5xl text-center">
              SabalongWeb adalah <span>
                studio kreatif modern
              </span> yang membantu bisnis untuk mengembangkan solusi teknologi kustom yang tepat sasaran.
            </p>
          </div>
          <Image className="rounded-md" data-aos="fade-in" src={image3} height={120} width={950} alt="image1" />
        </div>
      </section>

      {/*produk section*/}
      <section id="produk" className="relative bg-primary py-24 px-6 font-poppins overflow-hidden">
        <div className="w-full absolute top-0 left-0 leading-[0] border-none z-0 -mt-[1px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block border-none">
            <path fill="#FFDBFD" fillOpacity="1" d="M0,32L80,48C160,64,320,96,480,101.3C640,107,800,85,960,90.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
        <div className="max-w-5xl mt-24 mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl max-md:text-2xl font-semibold text-[#FFDBFD]">
              Produk Kami
            </h2>
            <p className="text-[#FFDBFD]/80 mt-3 max-w-2xl mx-auto text-sm">
              Berbagai layanan digital yang siap membantu mengembangkan bisnis Anda ke level selanjutnya.
            </p>
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            {produkList.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="bg-[#FFDBFD] p-7 flex flex-col group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl will-change-transform"
                >
                  <div className="text-primary bg-primary/10 p-3 border border-primary/20 w-fit mb-5 transition-all duration-500 ease-out group-hover:bg-primary group-hover:text-[#FFDBFD] group-hover:border-primary">
                    <Icon size={28} />
                  </div>
                  <div className="text-primary">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{item.desc}</p>
                    <ul className="mt-4 space-y-1.5">
                      {item.features.map((f, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/*layanan section*/}
      <section id="layanan" className="relative bg-[#FFDBFD] py-24 px-6 font-poppins overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, #6367FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, #6367FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-5xl mx-auto relative z-10 mt-24">
          <div data-aos="fade-up" className="text-center mb-12 mt-16">
            <h2 className="text-4xl max-md:text-2xl font-semibold text-primary">Layanan Kami</h2>
            <p className="text-primary/80 mt-3 max-w-2xl mx-auto text-sm">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda.
            </p>
          </div>

          <div data-aos="fade-up" className="flex flex-wrap justify-center gap-3 mb-14">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-500 ease-out border ${
                  activeTab === tab.id
                    ? "bg-primary text-[#FFDBFD] border-primary"
                    : "bg-transparent text-primary border-primary hover:bg-primary hover:text-[#FFDBFD]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
            {current.plans.map((plan, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`bg-white p-7 flex flex-col border border-primary transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl will-change-transform relative ${
                  plan.highlight ? "border-t-4 border-t-primary" : ""
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[#FFDBFD] text-xs font-semibold px-4 py-1">
                    {plan.highlight}
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-primary">{plan.name}</h3>
                  <p className="text-3xl font-bold text-primary mt-2">
                    Rp {plan.price}
                  </p>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-primary/80 flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/6283824425487?text=Halo%20SabalongWeb%2C%20saya%20tertarik%20dengan%20paket%20${plan.name}%20-%20${current.title}.%20Bisa%20diskusi%20lebih%20lanjut%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-2.5 bg-primary text-[#FFDBFD] text-sm font-semibold border border-primary text-center transition-all duration-500 ease-out hover:bg-transparent hover:text-primary"
                >
                  Pilih Paket
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*portfolio section*/}
      <section id="portfolio" className="relative bg-primary py-24 px-6 font-poppins overflow-hidden">
        <div className="w-full absolute top-0 left-0 leading-[0] border-none z-0 -mt-[1px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block border-none">
            <path fill="#FFDBFD" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,90.7C1120,85,1280,75,1360,69.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10 mt-12">
          <div data-aos="fade-up" className="text-center mb-14">
            <h2 className="text-4xl max-md:text-2xl font-semibold text-[#FFDBFD]">Proyek yang Kami Kerjakan</h2>
            <p className="text-[#FFDBFD]/80 mt-3 max-w-2xl mx-auto text-sm">
              Setiap proyek adalah cerita sukses. Ini sebagian kecil dari apa yang telah kami bangun bersama klien kami.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-primary to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-primary to-transparent" />
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {portfolioList.map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="bg-[#FFDBFD] p-7 min-w-[340px] max-w-[340px] snap-start flex flex-col transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl will-change-transform group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 border border-primary/20">
                      {item.category}
                    </span>
                    <ArrowUpRight size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  </div>
                  <div className="text-primary flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-80 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="text-xs text-primary bg-primary/10 px-2.5 py-1 border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full block text-center py-2.5 bg-primary text-[#FFDBFD] text-sm font-semibold border border-primary transition-all duration-500 ease-out hover:bg-transparent hover:text-primary"
                  >
                    Lihat Detail
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-[#FFDBFD] text-primary p-3 transition-all duration-500 ease-out hover:scale-110 z-20 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-[#FFDBFD] text-primary p-3 transition-all duration-500 ease-out hover:scale-110 z-20 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/*faq section*/}
      <section id="faq" className="bg-primary py-24 px-6 font-poppins">
        <div className="max-w-3xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-14">
            <h2 className="text-4xl max-md:text-2xl font-semibold text-[#FFDBFD]">FAQ</h2>
            <p className="text-[#FFDBFD]/80 mt-3 max-w-xl mx-auto text-sm">
              Pertanyaan yang sering diajukan seputar layanan kami.
            </p>
          </div>

          <div className="space-y-3">
            {faqList.map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="bg-[#FFDBFD]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left transition-all duration-300"
                >
                  <span className="text-sm font-semibold text-primary pr-4">{item.q}</span>
                  <span className={`text-primary text-xl transition-transform duration-300 shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-primary/80 px-5 pb-5 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*kontak section*/}
      <section id="kontak" className="relative bg-[#FFDBFD] py-24 px-6 font-poppins overflow-hidden">
        <div className="w-full absolute top-0 left-0 leading-[0] border-none z-0 -mt-[1px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block border-none">
            <path fill="#6367FF" fillOpacity="1" d="M0,256L120,224C240,192,480,128,720,122.7C960,117,1200,171,1320,197.3L1440,224L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
          </svg>
        </div>
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, #6367FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-5xl mx-auto relative z-10 mt-24">
          <div data-aos="fade-up" className="text-center mb-14">
            <h2 className="text-4xl max-md:text-2xl font-semibold text-primary">Kontak Kami</h2>
            <p className="text-primary/80 mt-3 max-w-xl mx-auto text-sm">
              Ada pertanyaan atau ingin memesan? Isi form di bawah dan kami akan segera merespon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="md:col-span-3 bg-white p-8 border border-primary">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-primary mb-1.5 block">Nama</label>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-primary bg-primary/5 border border-primary outline-none focus:bg-primary/10 transition-all duration-300 placeholder:text-primary/40"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary mb-1.5 block">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={form.nomor}
                    onChange={(e) => setForm({ ...form, nomor: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-primary bg-primary/5 border border-primary outline-none focus:bg-primary/10 transition-all duration-300 placeholder:text-primary/40"
                    placeholder="08xxx"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-primary mb-1.5 block">Kategori</label>
                <div className="flex flex-wrap gap-3">
                  {kategoriList.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setForm({ ...form, kategori: k })}
                      className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 border ${
                        form.kategori === k
                          ? "bg-primary text-[#FFDBFD] border-primary"
                          : "bg-transparent text-primary border-primary hover:bg-primary hover:text-[#FFDBFD]"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-primary mb-1.5 block">Pesan</label>
                <textarea
                  required
                  rows={4}
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  className="w-full px-4 py-3 text-sm text-primary bg-primary/5 border border-primary outline-none focus:bg-primary/10 transition-all duration-300 resize-none placeholder:text-primary/40"
                  placeholder="Tulis pesan Anda..."
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-3 bg-primary text-[#FFDBFD] text-sm font-semibold border border-primary transition-all duration-500 ease-out hover:bg-transparent hover:text-primary"
              >
                Kirim Pesan via WhatsApp
              </button>
            </form>

            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="bg-white p-6 border border-primary flex items-center gap-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl group">
                <div className="text-primary bg-primary/10 p-3 border border-primary/20 shrink-0 transition-all duration-500 ease-out group-hover:bg-primary group-hover:text-[#FFDBFD]">
                  <Mail size={22} />
                </div>
                <div className="text-primary text-sm">
                  <p className="font-semibold">Email</p>
                  <p className="opacity-80 break-all text-xs mt-0.5">sabalongweb@gmail.com</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-primary flex items-center gap-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl group">
                <div className="text-primary bg-primary/10 p-3 border border-primary/20 shrink-0 transition-all duration-500 ease-out group-hover:bg-primary group-hover:text-[#FFDBFD]">
                  <Globe size={22} />
                </div>
                <div className="text-primary text-sm">
                  <p className="font-semibold">Website</p>
                  <p className="opacity-80 break-all text-xs mt-0.5">sabalongweb.vercel.app</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-primary flex items-center gap-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl group">
                <div className="text-primary bg-primary/10 p-3 border border-primary/20 shrink-0 transition-all duration-500 ease-out group-hover:bg-primary group-hover:text-[#FFDBFD]">
                  <Phone size={22} />
                </div>
                <div className="text-primary text-sm">
                  <p className="font-semibold">Customer Service</p>
                  <p className="opacity-80 text-xs mt-0.5">0838 2442 5487</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 leading-[0] border-none z-0 -mb-[1px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block border-none">
            <path fill="#FFDBFD" fillOpacity="1" d="M0,160L80,144C160,128,320,96,480,96C640,96,800,128,960,138.7C1120,149,1280,139,1360,133.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
      </section>

      {/*footer*/}
      <footer className="bg-primary px-6 pt-24 pb-12 font-poppins">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image src={logo} width={10} height={50} alt="logo" />
                <p className="font-pixelify text-[#FFDBFD] text-2xl">SabalongWeb</p>
              </div>
              <p className="text-sm text-[#FFDBFD]/70 max-w-sm leading-relaxed">
                Studio kreatif modern yang membantu bisnis untuk mengembangkan solusi teknologi kustom yang tepat sasaran.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#FFDBFD] mb-4">Navigasi</h4>
              <ul className="space-y-2.5">
                {["Beranda", "Produk", "Layanan", "Portfolio", "Kontak"].map((link) => (
                  <li key={link}>
                    <a href={`#${link === "Beranda" ? "Home" : link.toLowerCase()}`} className="text-sm text-[#FFDBFD]/70 hover:text-[#FFDBFD] transition-all duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#FFDBFD] mb-4">Kontak</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:sabalongweb@gmail.com" className="text-sm text-[#FFDBFD]/70 hover:text-[#FFDBFD] transition-all duration-300">sabalongweb@gmail.com</a>
                </li>
                <li>
                  <a href="tel:083824425487" className="text-sm text-[#FFDBFD]/70 hover:text-[#FFDBFD] transition-all duration-300">0838 2442 5487</a>
                </li>
                <li>
                  <a href="https://sabalongweb.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-[#FFDBFD]/70 hover:text-[#FFDBFD] transition-all duration-300">sabalongweb.vercel.app</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#FFDBFD]/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#FFDBFD]/50">&copy; {new Date().getFullYear()} SabalongWeb. All rights reserved.</p>
            <p className="text-xs text-[#FFDBFD]/50">Built with ❤️ for your digital journey</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
