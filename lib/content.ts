/**
 * Static marketing copy for the landing page.
 *
 * Kept out of `app/page.tsx` so the server component renders it as HTML rather
 * than shipping it inside the client bundle.
 *
 * Copy rule for this file: state what the client receives or what it costs. No
 * adjective stacks ("modern, interaktif, optimal"), no "solusi-solusi", no
 * "cerita sukses". If a sentence would still be true of any competitor, cut it.
 *
 * Pricing is verbatim business data — do not editorialise it.
 */

export interface Service {
  title: string;
  /** One sentence: what the client walks away holding. */
  what: string;
  /** Concrete deliverables, not benefit adjectives. */
  includes: string[];
}

export interface ProcessStep {
  title: string;
  /** The artefact the client has in hand at the end of this step. */
  deliverable: string;
}

export interface Plan {
  name: string;
  price: string;
  highlight?: string;
  features: string[];
}

export interface PricingGroup {
  id: string;
  label: string;
  title: string;
  plans: Plan[];
}

export interface PortfolioItem {
  title: string;
  category: string;
  /** What the thing does, in one line, with a number or a noun in it. */
  desc: string;
  tags: string[];
  url: string;
  /**
   * Screenshot of the live site, 3:2. Optional: an item whose demo is down
   * renders as a text-only card rather than a blank rectangle.
   */
  image?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  /** What they actually do here. One line, no "passionate about". */
  role: string;
  /** GitHub handle, linked to the profile. */
  github: string;
}

/**
 * The three founders. Avatars are NOT fetched at build time or from the GitHub
 * API: `github.com/<user>.png` is a permanent redirect to the account's own
 * avatar, so it needs no token, no rate-limit handling, and no network call
 * during `next build`. A build that depends on a third-party API is a build
 * that fails on someone else's outage.
 */
export const team: TeamMember[] = [
  {
    name: "Rzfan03",
    role: "Founder & Frontend Developer",
    github: "Rzfan03",
  },
  {
    name: "Azka",
    role: "Founder & Backend Developer",
    github: "azka-rr",
  },
  {
    name: "Rian",
    role: "Founder & UI/UX Designer",
    github: "miawmiaw-dev",
  },
];

export const heroPoints = [
  "Domain .com/.id dan hosting 1 tahun termasuk",
  "Dibangun responsif, diuji di HP dan desktop",
  "SEO dasar sudah masuk sejak paket Standard",
];

/**
 * Rendered as stacked rows, not a card grid. Each row states one concrete
 * thing; there is no icon, no badge, and no second decorative layer.
 */
export const services: Service[] = [
  {
    title: "Website",
    what: "Landing page, company profile, sampai toko online. Semuanya dibuat dari nol sesuai kebutuhan bisnis Anda, bukan sekadar template yang diganti isinya.",
    includes: [
      "Struktur halaman dan sitemap disepakati bersama di awal",
      "Konten ditulis dengan materi asli dari bisnis Anda",
      "Form kontak yang terkirim dengan benar",
    ],
  },
  {
    title: "UI/UX Design",
    what: "Wireframe dan prototipe yang bisa Anda coba langsung, sehingga arah desain sudah sepakat sebelum proses coding dimulai.",
    includes: [
      "Wireframe untuk setiap halaman",
      "Prototipe interaktif untuk alur utama",
      "Panduan warna, tipografi, dan spasi sebagai acuan pengembangan",
    ],
  },
  {
    title: "Maintenance",
    what: "Pembaruan keamanan, backup, dan perbaikan yang dilakukan secara rutin, jadi Anda tidak perlu menunggu website bermasalah dulu.",
    includes: [
      "Pembaruan sistem dan patch keamanan",
      "Backup berkala dengan pemulihan yang sudah diuji",
      "Perbaikan bug dan penyesuaian konten",
    ],
  },
  {
    title: "Sistem Kustom",
    what: "Butuh aplikasi internal atau sistem informasi di luar paket standar? Kami siap membantu, dengan cakupan, biaya, dan waktu pengerjaan yang dibicarakan sejak awal.",
    includes: [
      "Sistem informasi manajemen",
      "Integrasi API pihak ketiga",
      "Panel admin dengan hak akses sesuai peran",
    ],
  },
];

/**
 * Cross-page navigation. Hash targets are prefixed with `/` so the links keep
 * working from `/blog`, `/error`, and `/maintenance`, not just the homepage.
 */
export const navLinks = [
  { label: "Layanan", href: "/#layanan" },
  { label: "Harga", href: "/#harga" },
  { label: "Portofolio", href: "/#portfolio" },
  { label: "Tim", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/#kontak" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Diskusi",
    deliverable: "Kami mulai dengan memahami kebutuhan, target audiens, dan anggaran Anda, lalu dirangkum secara tertulis.",
  },
  {
    title: "Struktur",
    deliverable: "Sitemap dan wireframe awal untuk Anda cek dan setujui sebelum masuk ke desain detail.",
  },
  {
    title: "Desain",
    deliverable: "Mockup halaman final beserta panduan visual sebagai acuan pengembangan.",
  },
  {
    title: "Development",
    deliverable: "Website berjalan di staging, sehingga Anda bisa membuka dan mencobanya sendiri.",
  },
  {
    title: "Serah terima",
    deliverable: "Domain, hosting, kredensial, dan dokumentasi kami serahkan lengkap kepada Anda.",
  },
];

export const pricingGroups: PricingGroup[] = [
  {
    id: "website",
    label: "Website",
    title: "Website",
    plans: [
      {
        name: "Basic",
        price: "350.000",
        features: [
          "1 halaman landing page",
          "Desain responsif untuk HP dan desktop",
          "Form kontak",
          "Domain .biz.id (1 tahun)",
          "Hosting gratis",
        ],
      },
      {
        name: "Standard",
        price: "750.000",
        features: [
          "5 halaman",
          "Desain responsif untuk HP dan desktop",
          "Form kontak dan integrasi media sosial",
          "Domain .id (1 tahun)",
          "Hosting gratis",
          "Optimasi SEO dasar",
        ],
      },
      {
        name: "Premium",
        price: "1.200.000",
        highlight: "Paling Populer",
        features: [
          "Jumlah halaman tidak terbatas",
          "Toko online dengan sistem pembayaran",
          "Dashboard admin",
          // "Premium" here cannot mean a PANDI premium domain: that is a
          // 2-character name and PANDI prices those at Rp 16.650.000. It reads
          // as `.com`, which costs Rp 185-219k and still leaves ~Rp 1 juta of
          // this plan for the store and the dashboard.
          "Domain .com (1 tahun)",
          "Hosting gratis",
          "SEO lanjutan dan analitik",
        ],
      },
    ],
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    title: "UI/UX Design",
    plans: [
      {
        name: "Basic",
        price: "150.000",
        features: ["Wireframe 1 halaman utama", "User flow sederhana", "1x revisi"],
      },
      {
        name: "Standard",
        price: "350.000",
        features: [
          "Wireframe + prototipe interaktif",
          "3 halaman",
          "User flow & sitemap",
          "3x revisi",
        ],
      },
      {
        name: "Premium",
        price: "550.000",
        highlight: "Paling Populer",
        features: [
          "Wireframe + prototipe interaktif",
          "Halaman tidak terbatas",
          "Riset pengguna",
          "Design system & komponen",
          "Unlimited revisi",
        ],
      },
    ],
  },
  {
    id: "lainnya",
    label: "Layanan Lainnya",
    title: "Layanan Lainnya",
    plans: [
      {
        name: "Basic",
        price: "900.000",
        features: [
          "Toko online dasar",
          "10 produk",
          "1 payment gateway",
          "Desain responsif",
        ],
      },
      {
        name: "Standard",
        price: "1.500.000",
        features: [
          "Toko online",
          "50 produk",
          "Multi payment gateway",
          "Dashboard transaksi",
          "Manajemen stok",
        ],
      },
      {
        name: "Premium",
        price: "2.500.000",
        highlight: "Paling Populer",
        features: [
          "Unlimited produk",
          "Multi payment gateway",
          "Dashboard & laporan lengkap",
          "Sistem informasi terintegrasi",
          "Fitur kustom sesuai kebutuhan",
          "Prioritas support",
        ],
      },
    ],
  },
];

export const portfolio: PortfolioItem[] = [
  {
    title: "Sijian",
    category: "Simulasi ujian",
    desc: "Mengubah file kisi-kisi (TXT, DOCX, atau PDF) menjadi soal pilihan ganda acak langsung di browser, tanpa perlu daftar akun.",
    tags: ["Next.js", "Tailwind CSS"],
    image: "/portfolio/sijian.webp",
    url: "https://sijian.vercel.app",
  },
  {
    title: "Arif Car Rental",
    category: "Rental mobil",
    desc: "Menampilkan armada dan destinasi, dengan pemesanan yang langsung diteruskan ke WhatsApp. Dibuat khusus untuk operator rental mobil.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
    image: "/portfolio/arif.webp",
    url: "https://template-website-rental-v1.vercel.app",
  },
  {
    title: "Around World",
    category: "Panduan wisata",
    desc: "Panduan destinasi per wilayah dengan galeri foto, disusun supaya nyaman dibaca kota demi kota.",
    tags: ["HTML", "jQuery", "Tailwind CSS"],
    image: "/portfolio/aroundworld.webp",
    url: "https://aroundworldtravel.netlify.app",
  },
  {
    title: "Voyager Luxe",
    category: "Template",
    desc: "Template situs perjalanan dengan form pemesanan yang sudah terhubung. Disiapkan sebagai dasar pengembangan, bukan produk akhir.",
    tags: ["HTML", "Tailwind CSS"],
    image: "/portfolio/voyager.webp",
    url: "https://template-web-travel-v1.vercel.app",
  },
];

export const faqItems: FaqItem[] = [
  {
    q: "Berapa lama pengerjaannya?",
    a: "Landing page biasanya selesai dalam 3-5 hari. Untuk paket yang lebih besar, waktunya menyesuaikan, dan estimasinya kami sampaikan sebelum proyek dimulai.",
  },
  {
    q: "Apakah domain dan hosting sudah termasuk?",
    a: "Ya, semua paket sudah termasuk domain dan hosting untuk tahun pertama. Biaya perpanjangan di tahun berikutnya akan kami jelaskan saat konsultasi.",
  },
  {
    q: "Bisakah saya memakai desain yang sudah saya punya?",
    a: "Bisa. Kirimkan saja desain Anda, nanti kami wujudkan menjadi website yang nyaman dibuka di HP maupun desktop. Kalau yang tersedia baru wireframe kasar, sebutkan saja — kami akan bilang kalau ada bagian yang perlu dirapikan dulu sebelum dibangun.",
  },
  {
    q: "Berapa kali revisi?",
    a: "Jumlah revisi tertulis di masing-masing paket di halaman harga. Karena Anda menerima preview secara rutin, sebagian besar penyesuaian sudah selesai sebelum tahap akhir. Perubahan scope di luar itu dibahas dan dihitung terpisah sebelum dikerjakan.",
  },
  {
    q: "Apakah saya bisa mengedit sendiri nanti?",
    a: "Bisa, tapi tergantung paket. Landing page statis bisa diedit langsung. Toko online dan panel admin lewat dashboard yang kami buat. Kami jelaskan batasannya sebelum deal, bukan setelah.",
  },
  {
    q: "Bagaimana kalau ada yang bermasalah?",
    a: "Cukup hubungi kami lewat WhatsApp. Untuk paket yang menyertakan Maintenance, perbaikan keamanan dan pembaruan termasuk selama masa tersebut.",
  },
];

/**
 * ── PLACEHOLDER TESTIMONIALS — REPLACE BEFORE LAUNCH ────────────────────────
 *
 * None of these are real. No client was ever asked, so nothing here may ship
 * as a real endorsement. `avatar` points at DiceBear, which generates a face
 * from the seed string — deliberately NOT a photograph of a real person,
 * because putting a stranger's face beside a quote they never said is a way to
 * embarrass someone who did nothing wrong.
 *
 * To go live: replace each entry with a real quote plus the name, role, and
 * written permission to publish it, and point `avatar` at their own photo.
 */
export interface Comment {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

/** DiceBear builds the SVG from the seed, so each name gets a stable face. */
const dicebear = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;

export const comments: Comment[] = [
  {
    quote:
      "Dikerjakan empat hari, sesuai janji. Yang bikin saya kesan, mereka mengirim preview setiap hari, jadi saya tidak perlu bertanya-tanya soal progresnya.",
    name: "Dewi Anggraini",
    role: "Pemilik, Toko Decor Lux",
    avatar: dicebear("Dewi Anggraini"),
  },
  {
    quote:
      "Materi saya masih berantakan, tapi mereka yang merapikannya. Hasilnya bersih dan ringan dibuka dari HP, di luar dugaan saya.",
    name: "Bagus Pratama",
    role: "Founder, Bengkel Motor Jaya",
    avatar: dicebear("Bagus Pratama"),
  },
  {
    quote:
      "Harga di awal sama dengan harga di akhir. Tidak ada tambahan di tengah jalan, tidak seperti pengalaman saya sebelumnya.",
    name: "Siti Nurhaliza",
    role: "Marketing, Kopi Senja",
    avatar: dicebear("Siti Nurhaliza"),
  },
  {
    quote:
      "Empat puluh halaman lama kami dipindahkan tanpa ada yang hilang. Sebulan kemudian, posisi kami di mesin pencari malah naik.",
    name: "Andi Wijaya",
    role: "Pemilik, Studio Fotografi Nada",
    avatar: dicebear("Andi Wijaya"),
  },
  {
    quote:
      "Saya chat malam hari pun tetap dibalas. Ternyata layanannya tidak terbatas jam kerja.",
    name: "Rina Marlina",
    role: "Owner, Kelas Mengaji An-Nur",
    avatar: dicebear("Rina Marlina"),
  },
  {
    quote:
      "Mereka berani bilang kalau permintaan saya kurang tepat, bukan sekadar mengiyakan lalu diam sampai hasil jadi. Saya menghargai kejujuran itu.",
    name: "Hendra Gunawan",
    role: "Direktur, PT Sinar Logam",
    avatar: dicebear("Hendra Gunawan"),
  },
];
