PRODUCT REQUIREMENTS DOCUMENT (PRD)
Project Name    : Migrasi Website Markaz Shohibul Quran (MSQ), Custom PPDB, & CMS
Platform        : Web Application (Next.js)
Date            : 25 Juni 2026

======================================================================
1. EXECUTIVE SUMMARY
======================================================================
Tujuan proyek ini adalah memigrasikan website statis MSQ ke Next.js dengan 
mengonversi file HTML statis yang sudah ada menjadi komponen React. 
Proyek ini mencakup pembuatan fitur Form Pendaftaran PPDB Mandiri, 
penambahan halaman Galeri, serta pembuatan Admin Dashboard (CMS) lengkap 
untuk mengelola data pendaftar (PPDB), Galeri Foto, Berita Pesantren, 
serta Konten Program Tahfizh secara dinamis.

======================================================================
2. TECH STACK & ARCHITECTURE
======================================================================
- Framework Frontend : Next.js (App Router)
- Bahasa Pemrograman : TypeScript
- Styling          : Tailwind CSS (sesuaikan dengan warna file statis MSQ)
- UI Components    : Shadcn UI / Headless UI
- Backend/API      : Next.js API Routes / Server Actions
- Database         : MySQL (via Prisma ORM)
- Authentication   : NextAuth.js (untuk halaman Admin)
- Cloud Storage    : Vercel Blob / AWS S3 / Cloudinary (untuk upload berkas & galeri)

======================================================================
3. FRONTEND INSTRUCTIONS (USER FACING)
======================================================================
1. Konversi UI & Menu Navigasi
   - Konversi UI dari HTML statis ke komponen Next.js.
   - Update Dropdown Menu "Kegiatan" agar berisi 3 sub-menu:
     a. Berita Pesantren (mengarah ke /berita)
     b. Tahfizh (mengarah ke /tahfizh)
     c. Galeri (mengarah ke /galeri)

2. Halaman Dinamis (Fetched from MySQL)
   - /berita : Menampilkan grid berita/artikel terbaru pesantren.
   - /tahfizh : Menampilkan informasi program tahfizh (Ziyadah, Muroja'ah, Tasmi', dll) 
     yang datanya dikelola dari CMS Admin.
   - /galeri : Menampilkan foto-foto kegiatan santri dalam bentuk Grid/Masonry layout.

3. Halaman Form Pendaftaran Mandiri (/pendaftaran)
   - Semua tombol "Daftar" di website diarahkan ke route internal `/pendaftaran`.
   - Buat form multi-step dengan validasi Zod + React Hook Form.
   - Data Input Santri: Nama Lengkap, NISN, Tempat/Tanggal Lahir, Asal Sekolah.
   - Data Orang Tua: Nama, No. WA.
   - Pilihan: Salafiyah Wustho (SMP) / Ulya (SMA) & Boarding / Full Day.
   - Upload Berkas: Pas Foto, Akte Kelahiran, KK, Surat Sehat, Surat NISN, 
     Raport Kelas 6 SD, Bukti Transfer Pendaftaran.

======================================================================
4. BACKEND & ADMIN CMS INSTRUCTIONS (/admin)
======================================================================
Gunakan NextAuth untuk memproteksi rute `/admin`.

1. Manajemen PPDB (Calon Santri)
   - Tabel data pendaftar dengan fitur Filter & Search.
   - Fitur "View Detail" untuk melihat kelengkapan berkas & bukti transfer.
   - Fitur Update Status: "Pending", "Lulus Tes", "Ditolak".
   - Export Data ke CSV/Excel.

2. Manajemen Berita Pesantren
   - CRUD (Create, Read, Update, Delete) berita/artikel.
   - Rich Text Editor untuk isi konten berita.

3. Manajemen Kegiatan Tahfizh
   - CRUD untuk program Tahfizh (Admin bisa menambah deskripsi kegiatan baru, 
     seperti jadwal setoran, target juz, dokumentasi tahfizh, dll).

4. Manajemen Galeri
   - Admin dapat mengunggah (upload) banyak foto sekaligus ke cloud storage.
   - Menambahkan caption/judul pada foto.
   - Fitur hapus foto.

======================================================================
5. DATABASE SCHEMA (PRISMA MODEL)
======================================================================
model Admin {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String   // Hashed password
  createdAt DateTime @default(now())
}

model CalonSantri {
  id               Int      @id @default(autoincrement())
  nomor_daftar     String   @unique
  nama_lengkap     String
  nisn             String?
  tempat_lahir     String
  tanggal_lahir    DateTime
  asal_sekolah     String
  nama_ortu        String
  no_wa            String
  program_pilihan  String   
  tipe_asrama      String   
  berkas_foto      String?
  berkas_akte      String?
  berkas_kk        String?
  berkas_sehat     String?
  berkas_nisn      String?
  berkas_raport    String?
  bukti_transfer   String?
  status_daftar    String   @default("PENDING") 
  createdAt        DateTime @default(now())
}

model Article {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  category    String   @default("Berita")
  excerpt     String   @db.Text
  content     String   @db.LongText
  thumbnail   String?
  publishedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model TahfizhProgram {
  id          Int      @id @default(autoincrement())
  title       String   // Contoh: "Ziyadah (Setoran Baru)"
  description String   @db.Text
  icon        String?  // Class icon fontawesome atau URL gambar
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Gallery {
  id          Int      @id @default(autoincrement())
  imageUrl    String   // URL dari cloud storage
  caption     String?
  createdAt   DateTime @default(now())
}

======================================================================
6. DEVELOPMENT PHASES
======================================================================
- Phase 1: Setup Next.js, Tailwind, Prisma, MySQL, & Cloud Storage.
- Phase 2: Konversi UI HTML statis ke komponen React. Update menu Navigasi.
- Phase 3: Pengerjaan halaman Pendaftaran (/pendaftaran) & file upload.
- Phase 4: Pengerjaan Admin CMS (Auth, Dashboard PPDB).
- Phase 5: Pembuatan API CRUD & CMS untuk Berita, Tahfizh, dan Galeri.
- Phase 6: Menghubungkan Frontend (/berita, /tahfizh, /galeri) dengan API Database.
- Phase 7: Testing & Deployment.