import certIqtFair from "../assets/certificate/Abdul Hafizh Kustiawan_IQT Fair 2026_5 November 2026.jpg";
import certKalibrasiKisr from "../assets/certificate/Abdul Hafizh Kustiawan_Kalibrasi X KISR Al Badr 2026_November 2026.png";
import certKalibrasiPdf from "../assets/certificate/Abdul Hafizh Kustiawan_Kalibrasi_October 2025.pdf";
import certSagawa from "../assets/certificate/Abdul Hafizh Kustiawan_SAGAWA 2026_13 November 2026 .png";
import certPialastim from "../assets/certificate/Abdul Hafizh Kustiawan_Piala STIM 2026_28 November 2026.jpg";

import { buildProject1Gallery } from "../utils/projectGalleryLoader";
import { buildProject2Gallery } from "../utils/projectGalleryLoader";

const project1Gallery = buildProject1Gallery({
  // Opsional: isi hanya jika ada nama file yang caption-nya ingin kamu kustomisasi
  // "Dashboard1.jpg": "Tampilan utama dashboard & ringkasan harian",
});
  
const project2Gallery = buildProject2Gallery({
  // Opsional: isi hanya jika ada nama file yang caption-nya ingin kamu kustomisasi
  // "Dashboard2.jpg": "Tampilan utama dashboard & ringkasan harian",
});

export const PROJECT_CATEGORIES = [
  "Semua",
  "Aplikasi Web",
  "Desain UI/UX",
  "Mobile App",
  "Ai",
];

export const PROFILE_DATA = {
  name: "Abdul Hafizh Kustiawan",
  role: "Frontend Developer & UI/UX Enthusiast",
  email: "hazzwayan.std@gmail.com",
  phone: "+62 822-4713-4797", // ganti dengan nomor aslimu
  whatsappUrl: "wa.me/+6282247134797", // ganti dengan nomor WhatsApp-mu (format: wa.me/<nomor>)
  availability: "Available for Collaboration",
  heroHeadline:
    "Crafting Seamless Experiences: Frontend Developer & UI/UX Enthusiast",
  heroSubheadline:
    "I am a passionate frontend developer and UI/UX enthusiast dedicated to creating seamless digital experiences. With a keen eye for design and a strong foundation in frontend technologies, I strive to bring innovative ideas to life through intuitive interfaces and engaging user interactions.",
  aboutSummary:
    "I am a passionate frontend developer and UI/UX enthusiast dedicated to creating seamless digital experiences. With a keen eye for design and a strong foundation in frontend technologies, I strive to bring innovative ideas to life through intuitive interfaces and engaging user interactions.",
  stats: [
    { label: "Tahun Fokus", value: "2+" },
    { label: "Proyek & Studi", value: "3+" },
    { label: "Stack Utama", value: "React" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/abdulhafizk" },
    { name: "Behance", url: "https://www.behance.net/abdulhafizhkustiawan/" },
    { name: "Instagram", url: "https://www.instagram.com/abdulhafizh_k/" },
  ],
};

export const EXPERIENCE_DATA = [
      {
    id: "exp-1",
    period: "2023 - Sekarang",
    role: "Another Skills",
    organization: "-",
    location: "Sukoharjo, Indonesia",
    description:
      "",
    highlights: [
      "Mengurus Sound System Masjid Jami Hubbul Khoir Sukoharjo",
      "Live Kajian Menggunkan Beberapa Platform Streaming. Youtube, Facebook, Instagram.",
      "Khatib Shalat Jum'at, Imam Shalat Wajib, Kultum Ramadhan di Masjid Kampung",
    ],
  },
    {
    id: "exp-2",
    period: "SMA Kelas 10 - Kelas 11 (Sekarang)",
    role: "Team HK Tangguh Ust Abu Zakariya",
    organization: "Team Asist. Mudir",
    location: "Sukoharjo, Indonesia",
    description:
      "",
    highlights: [
      "Mengurus Website Pribadi Ust Abu Zakariya",
      "Mengurus Kajian Ust Abu Zakariya",
    ],
  },
      {
    id: "exp-3",
    period: "SMP Kelas 9 - Kelas 11 (Sekarang)",
    role: "Team Tahfidz",
    organization: "Team Asist. Masul Tahfidz",
    location: "Sukoharjo, Indonesia",
    description:
      "",
    highlights: [
      "Mengurus Website Pribadi Ust Abu Zakariya",
      "Mengurus Kajian Ust Abu Zakariya",
    ],
  },
  {
    id: "exp-4",
    period: "SMP Kelas 9 - SMA Kelas 11 (Sekarang)",
    role: "Ketua Qism RPM",
    organization: "Remaja Pengurus Masjid Jami Hubbul Khoir Sukoharjo",
    location: "Sukoharjo, Indonesia",
    description:
      "Memimpin tim pengurus dalam mengelola kegiatan keagamaan, pengembangan diri, dan program sosial di lingkungan masjid.",
    highlights: [
      "Mengkoordinasikan kegiatan remaja masjid dan program sosial",
    ],
  },
  {
    id: "exp-5",
    period: "SMP Kelas 8 - Kelas 9",
    role: "Anggota Qism Ibadah",
    organization: "Majmuah Santri Hubbul Khoir Sukoharjo",
    location: "Sukoharjo, Indonesia",
    description:
      "Memimpin tim dalam mengatur jadwal ibadah, kegiatan keagamaan, dan pengawasan disiplin santri di lingkungan pesantren.",
    highlights: [
      "Mengkoordinasikan kegiatan ibadah harian dipesantren",
    ],
  },
];

export const EDUCATION_DATA = [
  {
    id: "edu-1",
    period: "2024 - Sekarang",
    degree: "Sekolah Menengah Atas (SMA)",
    institution: "Pondok Pesantren Tahfidz dan IT Hubbul Khoir",
    location: "Sukoharjo, Jawa Tengah, Indonesia",
    gpa: "",
    description: "",
    highlights: [
      "Mengikuti berbagai kegiatan lomba akademik",
    ],
  },
  {
    id: "edu-2",
    period: "2022 - 2024",
    degree: "Sekolah Menengah Pertama (SMP)",
    institution: "Pondok Pesantren Tahfidz dan IT Hubbul Khoir",
    location: "Sukoharjo, Indonesia",
    gpa: "",
    description: "",
    highlights: [
      "Mengikuti berbagai kegiatan ekstrakurikuler dan lomba akademik",
      "Mengikuti program pengembangan karakter dan kepemimpinan di lingkungan pesantren",
      "Mengikuti program hafalan Al-Qur'an 30 Juz",
      "Mengkuiti beberapa perlombaan tingkat daerah",
    ],
  },
  {
    id: "edu-3",
    period: "2017 - 2022",
    degree: "Sekolah Dasar (SD) / Pendidikan Dasar",
    institution: "Madrasah Ibtidaiyah Tahfidzul Qur'an Jamilurrahman",
    location: "Bantul Regency, Special Region of Yogyakarta, Indonesia",
    gpa: "",
    description:
      "Sekolah Dasar yang menekankan pada pendidikan agama dan hafalan Al-Qur'an, serta pengembangan karakter dan keterampilan dasar.",
    highlights: [
      "Mengikuti berbagai kegiatan ekstrakurikuler dan lomba akademik",
      "Membangun fondasi pendidikan yang kuat untuk jenjang pendidikan selanjutnya",
      "Mengikuti program hafalan Al-Qur'an 10 Juz",
    ],
  },
];

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const SKILLS_DATA = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5 & CSS3", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Intermediate" },
      { name: "React", level: "Intermediate" },
      { name: "Vite", level: "Intermediate" },
      { name: "TypeScript", level: "Beginner" },
    ],
  },
  {
    category: "Backend & Tools",
    items: [
      { name: "Git & GitHub", level: "Intermediate" },
      { name: "REST API", level: "Beginner" },
      { name: "Node.js", level: "Beginner" },
    ],
  },
  {
    category: "Desain UI/UX",
    items: [
      { name: "Responsive Design", level: "Advanced" },
      { name: "Wireframing", level: "Intermediate" },
      { name: "Figma", level: "Intermediate" },
      { name: "Design System", level: "Beginner" },
    ],
  },
  {
    category: "Another Skills",
    items: [
      { name: "OBS", level: "Advanced" },
    ],
  },
];

export const PROJECTS_DATA = [
  { // Command Center Pribadi
    id: "command-center-pribadi",
    categories: ["Aplikasi Web","Mobile App", "Colab with Ai"],
    title: "Command Center Pribadi",
    summary:
      "Aplikasi web dashboard manajemen tugas harian dengan fitur filter status, prioritas, dan penyimpanan data di Database.",
    image: project1Gallery[0]?.src || "",
    gallery: project1Gallery,
    techStack: [
      "React 19",
      "TypeScript",
      "Vite 8 PWA",
      "Tailwind CSS v4",
      "Node.js + Express",
      "Supabase",
      "Google Gemini SDK",
      "Telegram & WhatsApp Bot",
    ],
    techStackGroups: [ // tech stack groups for better organization and display
      {
        group: "Frontend & Tampilan (UI)",
        items: [
          {
            name: "React 19 + TypeScript",
            detail: "Fondasi komponen modular dan keamanan tipe data.",
          },
          {
            name: "Vite 8 (vite-plugin-pwa & Workbox)",
            detail: "Bundling cepat, dukungan PWA (bisa diinstal di mobile/desktop), serta cache lokal.",
          },
          {
            name: "Tailwind CSS v4",
            detail: "Styling modern dengan @tailwindcss/vite, clsx, dan tailwind-merge.",
          },
          {
            name: "UI & Utilitas Interaktif",
            detail: "Lucide React (ikon), Motion (animasi), Sonner (toast notifikasi), React Masonry CSS (grid catatan), dan Canvas Confetti.",
          },
        ],
      },
      {
        group: "Backend & Daemon Otomatisasi",
        items: [
          {
            name: "Node.js + Express",
            detail: "server.ts dijalankan dengan tsx saat pengembangan dan di-bundle dengan esbuild menjadi server.js untuk produksi.",
          },
          {
            name: "Background Autonomous Scheduler",
            detail: "Penjadwal otomatis bawaan server untuk pengingat (03:30 WIB, 04:00 WIB, H-1 jam kajian, dan 21:00 WIB).",
          },
          {
            name: "File Cache Persisten Lokal",
            detail: "Penyimpanan data/server_wa_state.json agar bot tetap berjalan stabil saat koneksi database cloud offline.",
          },
        ],
      },
      {
        group: "Database & Sinkronisasi",
        items: [
          {
            name: "Supabase (@supabase/supabase-js)",
            detail: "Database PostgreSQL cloud serta Supabase Realtime (postgres_changes) untuk sinkronisasi antar perangkat.",
          },
          {
            name: "Offline-First & BroadcastChannel API",
            detail: "Penyimpanan lokal di browser, riwayat backup JSON lokal, dan sinkronisasi otomatis antar-tab.",
          },
        ],
      },
      {
        group: "Kecerdasan Buatan (AI) & Integrasi Bot",
        items: [
          {
            name: "Google Gemini SDK",
            detail: "Menggunakan gemini-2.5-flash & gemini-3.1-flash-lite untuk asisten berbasis data, AI insight harian, draf khutbah, dan AI Vision pembaca struk/nota dari foto.",
          },
          {
            name: "Telegram Bot API",
            detail: "Long Polling (getUpdates) dengan watchdog auto-restart serta opsi Webhook.",
          },
          {
            name: "WhatsApp Gateway API",
            detail: "Utama menggunakan Fonnte, dengan dukungan opsi Wablas, Starsender, WAHA, dan Custom Webhook.",
          },
        ],
      },
],
    liveUrl: "https://command-center-pribadi.ai.studio/",
    repoUrl: "https://alhukaikah.my.id",
    description:"Aplikasi web dashboard manajemen tugas harian yang dirancang untuk membantu pengguna mengatur dan memprioritaskan pekerjaan mereka dengan lebih efisien. Dengan fitur filter status dan prioritas, pengguna dapat dengan mudah melihat tugas yang perlu diselesaikan terlebih dahulu. Data tugas disimpan secara aman di Database, memungkinkan akses dari berbagai perangkat.",
    caseStudy: {
      challenge:
        "Pengguna sering kesulitan memprioritaskan tugas harian saat daftar pekerjaan menumpuk di berbagai catatan terpisah.",
      solution:
        "Menyediakan papan status yang ringkas, filter cepat berdasarkan prioritas, serta antarmuka yang tetap nyaman di layar kecil.",
      highlights: [
        "Filter tugas real-time dan status penyelesaian",
        "Tata letak responsif untuk desktop dan ponsel",
        "Data tersimpan otomatis di browser",
      ],
    },
  },
  { // Library Tap System
    id: "library-tap-system",
    categories: ["Aplikasi Web", "Mobile App", "Colab with Ai"],
    title: "Library Tap System - Presensi & Perpustakaan Digital Santri",
    summary:
      "Sistem digital untuk manajemen presensi dan perpustakaan yang dirancang khusus untuk santri.",
    image: project2Gallery[0]?.src ||  "",
    gallery: project2Gallery,
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Vite 6 PWA",
      "Supabase",
      "RFID & QR Code",
      "Recharts",
      "jsPDF & XLSX",
    ],
    techStackGroups: [ // tech stack groups for better organization and display
      {
        group: "Frontend & UI",
        items: [
          {
            name: "React 19 (react, react-dom)",
            detail: "Library utama antarmuka dengan arsitektur komponen fungsional & React Context (LibraryContext) untuk manajemen state terpusat.",
          },
          {
            name: "TypeScript (~5.8.2)",
            detail: "Pengetikan statis untuk keamanan tipe data.",
          },
          {
            name: "Tailwind CSS v4 (tailwindcss, @tailwindcss/vite)",
            detail: "Styling utility-first modern.",
          },
          {
            name: "Motion (motion/react)",
            detail: "Animasi dan transisi UI interaktif.",
          },
          {
            name: "Lucide React (lucide-react)",
            detail: "Set ikon antarmuka.",
          },
          {
            name: "Recharts (recharts)",
            detail: "Visualisasi grafik dan statistik perpustakaan.",
          },
          {
            name: "Canvas Confetti (canvas-confetti)",
            detail: "Efek visual selebrasi saat pencapaian tap/streak.",
          },
        ],
      },
      {
        group: "Build Tool & PWA",
        items: [
          {
            name: "Vite 6 (vite, @vitejs/plugin-react)",
            detail: "Build tool dan dev server.",
          },
          {
            name: "Vite Plugin PWA (vite-plugin-pwa / Workbox)",
            detail: "Dukungan instalasi aplikasi (Android/Desktop), Service Worker, dan caching offline/network-first.",
          },
        ],
      },
      {
        group: "Database, Sinkronisasi & Penyimpanan",
        items: [
          {
            name: "Supabase (@supabase/supabase-js)",
            detail: "Backend-as-a-Service berbasis PostgreSQL untuk penyimpanan cloud, sinkronisasi data multi-perangkat, serta Supabase Realtime (Postgres Changes & Broadcast).",
          },
          {
            name: "LocalStorage",
            detail: "Cache lokal untuk akses cepat dan ketahanan mode offline (offline-first fallback).",
          },
        ],
      },
      {
        group: "Fitur Khusus (RFID, QR Code, & Ekspor Dokumen)",
        items: [
          {
            name: "QR Code",
            detail: "qrcode (pembuatan QR kartu santri & link instalasi PWA) dan jsqr (pemindaian QR melalui kamera).",
          },
          {
            name: "RFID Hardware Input",
            detail: "Pembacaan input keyboard wedge dari reader RFID USB pada halaman Tap & Kiosk.",
          },
          {
            name: "Ekspor PDF & Gambar",
            detail: "jspdf, jspdf-autotable (laporan PDF), dan html-to-image (cetak/unduh kartu anggota santri ke PNG/PDF).",
          },
          {
            name: "Ekspor Excel",
            detail: "xlsx (ekspor data santri, kunjungan, kartu RFID, statistik, dan akun ke format .xlsx).",
          },
        ],
      },
    ],
    liveUrl: "https://alwazn-tapsystem.ai.studio",
    repoUrl: "",
    description : "Aplikasi Web Manajemen Perpustakaan Digital yang dirancang untuk meningkatkan efisiensi dan pengalaman pengguna.",
    caseStudy: {
      challenge:
        "Halaman sebelumnya memiliki terlalu banyak informasi bertumpuk sehingga pengunjung baru cepat kehilangan fokus.",
      solution:
        "Menyederhanakan struktur bagian, menetapkan skala tipografi yang jelas, dan menonjolkan ajakan bertindak utama.",
      highlights: [
        "Komponen UI modular dan konsisten",
        "Kontras warna yang mudah dibaca",
        "Prototipe interaktif alur pengguna",
      ],
    },
  },
  { // Website Artikel Ust Abu Zakariya Sutrisno
    id: "website-artikel-ust-abu-zakariya-sutrisno",
    categories: ["Aplikasi Web", "Mobile App", "Wordpress"],
    title: "Website Artikel Ust Abu Zakariya Sutrisno",
    summary:
      "Website resmi untuk menampilkan artikel, kajian, dan informasi terkait Ust Abu Zakariya Sutrisno.",
    image: "",
    gallery: [],
    techStack: [
      "WordPress",
      "News Magazine X",
      "Elementor & Pro",
      "LiteSpeed Cache",
      "All in One SEO",
      "Contact Form 7",
      "Site Kit & MonsterInsights",
      "Hostinger",
    ],
    techStackGroups: [
      {
        group: "CMS, Tema & Hosting",
        items: [
          {
            name: "WordPress",
            detail: "CMS utama pengelolaan artikel, kategori, komentar, dan halaman unduhan e-book.",
          },
          {
            name: "News Magazine X & News Magazine X Core",
            detail: "Tema utama portal artikel/majalah digital beserta plugin inti tema dan impor konten demo (One Click Demo Content Import by WP Royal).",
          },
          {
            name: "Hostinger & Plugin Hostinger",
            detail: "Lingkungan hosting dengan integrasi Hostinger AI, Hostinger Hub, Hostinger Reach, dan Hostinger Tools.",
          },
        ],
      },
      {
        group: "Page Builder & Desain Visual",
        items: [
          {
            name: "Elementor (v4.4.1) & Elementor Pro (v4.4.0)",
            detail: "Visual page builder drag-and-drop dan Theme Builder untuk menyusun tata letak halaman kustom yang responsif.",
          },
          {
            name: "Web Accessibility (WCAG Scanning & Widget)",
            detail: "Dukungan aksesibilitas web seperti pengaturan ukuran teks, mode kontras, penyorotan tautan, dan pernyataan aksesibilitas.",
          },
          {
            name: "YouTube Live",
            detail: "Menampilkan siaran langsung kanal YouTube terkait langsung di halaman situs.",
          },
        ],
      },
      {
        group: "Performa, SEO & Analitik",
        items: [
          {
            name: "LiteSpeed Cache (v7.9.3)",
            detail: "Page caching dan optimasi performa situs berbasis LiteSpeed.",
          },
          {
            name: "All in One SEO (v5.0.5.1) & Broken Link Checker by AIOSEO (v1.3.1)",
            detail: "Optimasi SEO on-page, XML sitemap, serta pemantauan tautan internal/eksternal yang rusak.",
          },
          {
            name: "Site Kit by Google (v1.191.0) & MonsterInsights (v11.3.0)",
            detail: "Integrasi metrik trafik, pencarian, dan perilaku pengunjung melalui layanan Google.",
          },
        ],
      },
      {
        group: "Formulir, Engagement & Log Aktivitas",
        items: [
          {
            name: "Contact Form 7 (v6.2.5)",
            detail: "Pengelolaan formulir kontak pengunjung.",
          },
          {
            name: "MC4WP: Mailchimp for WordPress (v4.15.0) & OptinMonster (v2.17.1)",
            detail: "Pengelolaan pendaftaran buletin/email serta pop-up dan form engagement pembaca.",
          },
          {
            name: "Simple History (v5.36.0)",
            detail: "Pencatatan riwayat aktivitas dan perubahan yang terjadi di panel admin WordPress.",
          },
        ],
      },
    ],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/username-kamu/finance-ui",
    caseStudy: {
      challenge:
        "Pengelola konten dan pembaca membutuhkan portal artikel, faedah Qur'aniyah, naskah khutbah, serta unduhan e-book yang tertata rapi per kategori, mudah ditemukan di mesin pencari, tetap cepat diakses, serta ramah bagi berbagai pengguna.",
      solution:
        "Membangun dan mengonfigurasi situs berbasis WordPress di Hostinger dengan tema News Magazine X dan Elementor Pro, dipadukan dengan LiteSpeed Cache, All in One SEO, Google Site Kit/MonsterInsights, formulir & newsletter, serta widget aksesibilitas WCAG.",
      highlights: [
        "Pengelolaan artikel, kategori kajian/khutbah, komentar, dan halaman unduhan e-book secara terstruktur di WordPress",
        "Penyusunan halaman kustom responsif menggunakan Elementor & Elementor Pro serta tema News Magazine X",
        "Optimasi kecepatan muat halaman dengan LiteSpeed Cache dan pemantauan SEO serta trafik lewat All in One SEO, Site Kit, dan MonsterInsights",
        "Integrasi formulir kontak (Contact Form 7), pendaftaran buletin/pop-up (MC4WP & OptinMonster), aksesibilitas WCAG, serta pencatatan log admin (Simple History)",
      ],
    },
  },
];

export const ACHIEVEMENTS_DATA = [
  {
    id: "ach-1",
    kind: "Sertifikat",
    year: "2026",
    title: "IQT Fair 2026",
    issuer: "Penyelenggara IQT Fair",
    summary:
      "Sertifikat partisipasi/pencapaian pada kegiatan IQT Fair 2026.",
    image: certIqtFair,
    credentialUrl: "",
  },
  {
    id: "ach-2",
    kind: "Sertifikat",
    year: "2026",
    title: "Kalibrasi X KISR Al Badr 2026",
    issuer: "KISR Al Badr",
    summary:
      "Sertifikat kegiatan Kalibrasi X KISR Al Badr tahun 2026.",
    image: certKalibrasiKisr,
    credentialUrl: "",
  },
  {
    id: "ach-3",
    kind: "Sertifikat",
    year: "2026",
    title: "SAGAWA 2026 - 3rd Place",
    issuer: "Penyelenggara SAGAWA",
    summary:
      "Sertifikat kegiatan SAGAWA 2026.",
    image: certSagawa,
    credentialUrl: "",
  },
    {
    id: "ach-4",
    kind: "Sertifikat",
    year: "2026",
    title: "PIALA STIM 2026",
    issuer: "Penyelenggara Sekolah Tinggi Islam Al-Mukmin Ngruki",
    summary:
      "Sertifikat kegiatan PIALA STIM 2026.",
    image: certPialastim,
    credentialUrl: "",
  },
  {
    id: "ach-5",
    kind: "Sertifikat",
    year: "2025",
    title: "Kalibrasi October 2025",
    issuer: "Penyelenggara Kalibrasi",
    summary:
      "Dokumen sertifikat dalam format PDF (klik 'Lihat Kredensial' untuk membuka berkas).",
    image: "",
    credentialUrl: certKalibrasiPdf,
  },
  {
    id: "dicoding-frontend-pemula",
    kind: "Sertifikat Belajar",
    year: "2024",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia · 45 Jam",
    summary:
      "Kelulusan pada kelas pengembangan antarmuka web interaktif dengan manipulasi DOM, event JavaScript, dan Web Storage (berlaku hingga 23 Des 2027).",
    image: "",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQWEVE7PO1",
  },
  {
    id: "dicoding-dasar-ai",
    kind: "Sertifikat Belajar",
    year: "2024",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia · 10 Jam",
    summary:
      "Kelulusan pada kelas pengenalan konsep AI, pemanfaatan data, pengantar Machine Learning, dan Deep Learning (berlaku hingga 20 Des 2027).",
    image: "",
    credentialUrl: "https://www.dicoding.com/certificates/6RPNOR2R5X2M",
  },
  {
    id: "dicoding-dasar-web",
    kind: "Sertifikat Belajar",
    year: "2024",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia · 41 Jam",
    summary:
      "Kelulusan pada kelas fondasi HTML semantik, CSS, dan layout responsif Flexbox dengan proyek akhir halaman web (berlaku hingga 16 Des 2027).",
    image: "",
    credentialUrl: "https://www.dicoding.com/certificates/KEXLM767RZG2",
  },
];