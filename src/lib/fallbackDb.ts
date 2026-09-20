import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE_PATH = join(process.cwd(), "public", "fallback_db.json");

interface FallbackData {
  gallery: any[];
  articles: any[];
  tahfizh: any[];
  candidates: any[];
}

const initialData: FallbackData = {
  gallery: [
    {
      id: 1,
      imageUrl: "https://placehold.co/600x400/15803d/ffffff?text=Halaqoh+Quran",
      caption: "Halaqoh Qur'an Santri Markaz Shohibul Quran",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      imageUrl: "https://placehold.co/600x400/d97706/ffffff?text=KBM+Santri",
      caption: "Suasana Belajar Mengajar di Kelas Terbuka",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Fasilitas+Kamar",
      caption: "Kondisi Kamar Asrama yang Bersih dan Nyaman",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=Kegiatan+Futsal",
      caption: "Aktivitas Olahraga Futsal Pekanan Santri",
      createdAt: new Date().toISOString(),
    },
  ],
  articles: [
    {
      id: 1,
      title: "Kepoin Yuk! Keseruan Acara Qismul Lughah Bulan April 2026",
      slug: "keseruan-acara-qismul-lughah-april-2026",
      category: "Berita",
      excerpt: "Acara berlangsung meriah diikuti seluruh santri dengan berbagai perlombaan edukatif yang menyenangkan...",
      content: "Acara berlangsung meriah diikuti seluruh santri dengan berbagai perlombaan edukatif yang menyenangkan...",
      thumbnail: "https://placehold.co/400x300/e2e8f0/64748b?text=Keseruan+Acara",
      publishedAt: new Date("2026-05-03T00:00:00Z").toISOString(),
    },
    {
      id: 2,
      title: "Pemerintah Kecamatan Dramaga Lakukan Silaturahim Ke PTQ",
      slug: "pemerintah-kecamatan-dramaga-silaturahim-ke-ptq",
      category: "Berita",
      excerpt: "Kunjungan ini dalam rangka mempererat tali silaturahmi antar instansi dan peninjauan fasilitas pendidikan...",
      content: "Kunjungan ini dalam rangka mempererat tali silaturahmi antar instansi dan peninjauan fasilitas pendidikan...",
      thumbnail: "https://placehold.co/400x300/e2e8f0/64748b?text=Kunjungan+Pemerintah",
      publishedAt: new Date("2026-01-08T00:00:00Z").toISOString(),
    },
    {
      id: 3,
      title: "'Ardhul Maharah: Panggung Ekspresi Bahasa dan Apresiasi",
      slug: "ardhul-maharah-panggung-ekspresi-bahasa",
      category: "Berita",
      excerpt: "Malam puncak penganugerahan santri berprestasi dalam bidang akademik maupun hafalan Al-Qur'an...",
      content: "Malam puncak penganugerahan santri berprestasi dalam bidang akademik maupun hafalan Al-Qur'an...",
      thumbnail: "https://placehold.co/400x300/e2e8f0/64748b?text=Panggung+Ekspresi",
      publishedAt: new Date("2026-05-01T00:00:00Z").toISOString(),
    },
  ],
  tahfizh: [
    {
      id: 1,
      title: "Ziyadah (Setoran Baru)",
      description: "Kegiatan rutin santri menyetorkan hafalan ayat-ayat baru yang telah dihafalkan sebelumnya secara intensif kepada ustadz pembimbing.",
      icon: "fa-book-open",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Muroja'ah (Mengulang Hafalan)",
      description: "Mengulang kembali setoran hafalan yang sudah pernah disetorkan agar melekat kuat di ingatan (Mutqin) dan terhindar dari lupa.",
      icon: "fa-rotate",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Tasmi' (Mendengarkan)",
      description: "Ujian periodik di mana santri melantunkan hafalannya secara beruntun (misalnya 1 juz atau 5 juz sekali duduk) didepan ustadz dan rekan-rekannya.",
      icon: "fa-volume-high",
      createdAt: new Date().toISOString(),
    },
  ],
  candidates: [],
};

// Ensure fallback db file exists
function ensureFile() {
  if (!existsSync(FILE_PATH)) {
    writeFileSync(FILE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

export function readFallbackDb(): FallbackData {
  ensureFile();
  try {
    const data = readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to read fallback DB:", e);
    return initialData;
  }
}

export function writeFallbackDb(data: FallbackData) {
  ensureFile();
  try {
    writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write fallback DB:", e);
  }
}
