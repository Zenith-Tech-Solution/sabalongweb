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
    what: "Landing page, company profile, atau toko online — dibangun dari nol, siap dipakai klien Anda, bukan template yang dibongkar ulang.",
    includes: [
      "Struktur halaman dan sitemap yang disepakati dulu",
      "Copywriting dan konten, diisi dengan materi asli Anda",
      "Form kontak yang benar-benar terkirim",
    ],
  },
  {
    title: "UI/UX Design",
    what: "Wireframe dan prototipe yang bisa Anda klik, supaya arah desain sudah disepakati sebelum satu baris kode ditulis.",
    includes: [
      "Wireframe low-fidelity per halaman",
      "Prototipe interaktif untuk alur utama",
      "Token warna, tipografi, dan spacing sebagai acuan coding",
    ],
  },
  {
    title: "Maintenance",
    what: "Pembaruan keamanan, backup, dan perbaikan yang dikerjakan berjadwal, bukan menunggu website rusak dulu.",
    includes: [
      "Update dependency dan patch keamanan",
      "Backup berkala dengan pemulihan yang sudah diuji",
      "Perbaikan bug dan penyesuaian konten",
    ],
  },
  {
    title: "Sistem Kustom",
    what: "Aplikasi internal atau sistem informasi di luar paket di atas — scope, harga, dan waktunya ditentukan di awal.",
    includes: [
      "Sistem informasi manajemen",
      "Integrasi API pihak ketiga",
      "Panel admin dengan hak akses per peran",
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
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/#kontak" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Diskusi",
    deliverable: "Ringkasan kebutuhan, target audiens, dan anggaran yang disepakati tertulis.",
  },
  {
    title: "Struktur",
    deliverable: "Sitemap dan wireframe kasar untuk Anda setujui sebelum desain detail.",
  },
  {
    title: "Desain",
    deliverable: "Mockup halaman final beserta token visual yang jadi acuan development.",
  },
  {
    title: "Development",
    deliverable: "Website berjalan di staging yang bisa Anda buka dan uji sendiri.",
  },
  {
    title: "Serah terima",
    deliverable: "Domain, hosting, kredensial, dan dokumentasi serah terima di tangan Anda.",
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
        price: "350K",
        features: [
          "1 Halaman landing page",
          "Desain responsif mobile & desktop",
          "Form kontak",
          "Domain .com/.id (1 tahun)",
          "Hosting gratis",
        ],
      },
      {
        name: "Standard",
        price: "750K",
        features: [
          "5 Halaman",
          "Desain responsif mobile & desktop",
          "Form kontak & integrasi sosial media",
          "Domain .com/.id (1 tahun)",
          "Hosting gratis",
          "Optimasi SEO dasar",
        ],
      },
      {
        name: "Premium",
        price: "1,2JT",
        highlight: "Terlaris",
        features: [
          "Halaman tidak terbatas",
          "Toko online + sistem pembayaran",
          "Dashboard admin",
          "Domain premium (1 tahun)",
          "Hosting gratis",
          "SEO lanjutan & analitik",
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
        price: "150K",
        features: ["Wireframe 1 halaman utama", "User flow sederhana", "1x revisi"],
      },
      {
        name: "Standard",
        price: "350K",
        features: [
          "Wireframe + prototipe interaktif",
          "3 Halaman",
          "User flow & sitemap",
          "3x revisi",
        ],
      },
      {
        name: "Premium",
        price: "550K",
        highlight: "Terlaris",
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
        price: "900K",
        features: [
          "Toko online dasar",
          "10 Produk",
          "1 Payment gateway",
          "Desain responsif",
        ],
      },
      {
        name: "Standard",
        price: "1,5JT",
        features: [
          "Toko online",
          "50 Produk",
          "Multi payment gateway",
          "Dashboard transaksi",
          "Manajemen stok",
        ],
      },
      {
        name: "Premium",
        price: "2,5JT",
        highlight: "Terlaris",
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
    desc: "Mengubah file kisi-kisi TXT, DOCX, atau PDF menjadi soal pilihan ganda acak di browser. Tanpa daftar akun.",
    tags: ["Next.js", "Tailwind CSS"],
    image: "/portfolio/sijian.webp",
    url: "https://sijian.vercel.app",
  },
  {
    title: "Arif Car Rental",
    category: "Rental mobil",
    desc: "Armada, destinasi, dan pemesanan yang diteruskan ke WhatsApp. Dibangun untuk operator di Ende, Flores.",
    tags: ["HTML", "JavaScript", "Tailwind CSS"],
    image: "/portfolio/arif.webp",
    url: "https://template-website-rental-v1.vercel.app",
  },
  {
    title: "Around World",
    category: "Panduan wisata",
    desc: "Panduan destinasi per wilayah dengan galeri foto, disusun untuk dibaca satu-satu kota, bukan sekali scroll.",
    tags: ["HTML", "jQuery", "Tailwind CSS"],
    image: "/portfolio/aroundworld.webp",
    url: "https://aroundworldtravel.netlify.app",
  },
  {
    title: "Voyager Luxe",
    category: "Template",
    desc: "Template perjalanan dengan form pemesanan yang sudah terhubung. Dibangun sebagai bahan awal, bukan produk akhir.",
    tags: ["HTML", "Tailwind CSS"],
    image: "/portfolio/voyager.webp",
    url: "https://template-web-travel-v1.vercel.app",
  },
];

export const faqItems: FaqItem[] = [
  {
    q: "Berapa lama pengerjaannya?",
    a: "Landing page 3–5 hari kerja, company profile 5–10 hari, toko online 10–20 hari. Angka ini berlaku kalau konten sudah lengkap saat proyek dimulai; menunggu materi dari klien adalah penundaan yang paling sering terjadi.",
  },
  {
    q: "Domain dan hosting termasuk?",
    a: "Termasuk di semua paket: domain .com/.id dan hosting gratis selama tahun pertama. Biaya perpanjangan domain dan hosting di tahun berikutnya kami bicarakan di awal, tidak tiba-tiba di akhir.",
  },
  {
    q: "Bisa pakai desain yang saya punya?",
    a: "Bisa. Kami lebih senang membangun dari referensi nyata Anda daripada menebak. Kalau yang ada baru wireframe atau contoh dari kompetitor, sebutkan — kami akan bilang kalau ada bagian yang tidak layak dibangun apa adanya.",
  },
  {
    q: "Berapa kali revisi?",
    a: "Jumlah revisi tertulis di masing-masing paket di halaman harga. Perubahan scope di luar itu dibahas dan dihitung terpisah sebelum dikerjakan.",
  },
  {
    q: "Apakah saya bisa mengedit sendiri nanti?",
    a: "Bisa, tapi tergantung paket. Landing page statis bisa diedit langsung. Toko online dan panel admin lewat dashboard yang kami buat. Kami jelaskan batasannya sebelum deal, bukan setelah.",
  },
  {
    q: "Bagaimana kalau ada yang rusak?",
    a: "Kirim lewat WhatsApp, kami tangani. Untuk paket yang menyertakan maintenance, perbaikan keamanan dan pembaruan termasuk selama masa tersebut.",
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
      "Pengerjaan empat hari, sesuai janji. Yang bikin kaget, mereka kirim preview tiap hari, jadi tidak ada lagi drama 'sudah lama kok belum ada kabar'.",
    name: "Dewi Anggraini",
    role: "Pemilik, Toko Decor Lux",
    avatar: dicebear("Dewi Anggraini"),
  },
  {
    quote:
      "Saya kirim materi berantakan, mereka rapikan sendiri. Hasil akhirnya rapi dan ringan dibuka dari HP, dan itu tidak pernah saya pikirkan sebelumnya.",
    name: "Bagus Pratama",
    role: "Founder, Bengkel Motor Jaya",
    avatar: dicebear("Bagus Pratama"),
  },
  {
    quote:
      "Harga di awal sama dengan harga di akhir. Tidak ada tambahan diam-diam di tengah jalan seperti pengalaman saya di tempat lain.",
    name: "Siti Nurhaliza",
    role: "Marketing, Kopi Senja",
    avatar: dicebear("Siti Nurhaliza"),
  },
  {
    quote:
      "Migrasi empat puluh halaman lama tidak ada yang hilang. Posisi di mesin pencari naik sebulan setelah dipindah, itu di luar perkiraan saya.",
    name: "Andi Wijaya",
    role: "Pemilik, Studio Fotografi Nada",
    avatar: dicebear("Andi Wijaya"),
  },
  {
    quote:
      "Sering chat malam, tetap dijawab. Saya kira tidak akan dilayani di luar jam kerja, ternyata tidak begitu.",
    name: "Rina Marlina",
    role: "Owner, Kelas Mengaji An-Nur",
    avatar: dicebear("Rina Marlina"),
  },
  {
    quote:
      "Suka karena mereka bilang kalau request saya belum masuk akal. Bukan sekadar iya semua lalu diam saja sampai barang dikirim.",
    name: "Hendra Gunawan",
    role: "Direktur, PT Sinar Logam",
    avatar: dicebear("Hendra Gunawan"),
  },
];
