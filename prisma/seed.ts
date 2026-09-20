import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "PasswordAdmin123!", // In production, hash this password
    },
  });
  console.log("Default admin created:", admin.username);

  // 2. Create Initial Tahfizh Programs
  const programs = [
    {
      title: "Ziyadah (Setoran Baru)",
      description: "Kegiatan rutin santri menyetorkan hafalan ayat-ayat baru yang telah dihafalkan sebelumnya secara intensif kepada ustadz pembimbing.",
      icon: "fa-book-open",
    },
    {
      title: "Muroja'ah (Mengulang Hafalan)",
      description: "Mengulang kembali setoran hafalan yang sudah pernah disetorkan agar melekat kuat di ingatan (Mutqin) dan terhindar dari lupa.",
      icon: "fa-rotate",
    },
    {
      title: "Tasmi' (Mendengarkan)",
      description: "Ujian periodik di mana santri melantunkan hafalannya secara beruntun (misalnya 1 juz atau 5 juz sekali duduk) didepan ustadz dan rekan-rekannya.",
      icon: "fa-volume-high",
    },
  ];

  for (const prog of programs) {
    await prisma.tahfizhProgram.create({ data: prog });
  }
  console.log("Initial tahfizh programs seeded.");

  // 3. Create Initial Articles
  const articles = [
    {
      title: "Kepoin Yuk! Keseruan Acara Qismul Lughah Bulan April 2026",
      slug: "keseruan-acara-qismul-lughah-april-2026",
      category: "Berita",
      excerpt: "Acara berlangsung meriah diikuti seluruh santri dengan berbagai perlombaan edukatif yang menyenangkan...",
      content: "Acara berlangsung meriah diikuti seluruh santri dengan berbagai perlombaan edukatif yang menyenangkan...",
      thumbnail: "https://placehold.co/400x300/e2e8f0/64748b?text=Keseruan+Acara",
    },
    {
      title: "Pemerintah Kecamatan Dramaga Lakukan Silaturahim Ke PTQ",
      slug: "pemerintah-kecamatan-dramaga-silaturahim-ke-ptq",
      category: "Berita",
      excerpt: "Kunjungan ini dalam rangka mempererat tali silaturahmi antar instansi dan peninjauan fasilitas pendidikan...",
      content: "Kunjungan ini dalam rangka mempererat tali silaturahmi antar instansi dan peninjauan fasilitas pendidikan...",
      thumbnail: "https://placehold.co/400x300/e2e8f0/64748b?text=Kunjungan+Pemerintah",
    },
    {
      title: "'Ardhul Maharah: Panggung Ekspresi Bahasa dan Apresiasi",
      slug: "ardhul-maharah-panggung-ekspresi-bahasa",
      category: "Berita",
      excerpt: "Malam puncak penganugerahan santri berprestasi dalam bidang akademik maupun hafalan Al-Qur'an...",
      content: "Malam puncak penganugerahan santri berprestasi dalam bidang akademik maupun hafalan Al-Qur'an...",
      thumbnail: "https://placehold.co/400x300/e2e8f0/64748b?text=Panggung+Ekspresi",
    },
  ];

  for (const art of articles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {},
      create: art,
    });
  }
  console.log("Initial articles seeded.");

  // 4. Create Initial Gallery Images
  const gallery = [
    {
      imageUrl: "https://placehold.co/600x400/15803d/ffffff?text=Halaqoh+Quran",
      caption: "Halaqoh Qur'an Santri Markaz Shohibul Quran",
    },
    {
      imageUrl: "https://placehold.co/600x400/d97706/ffffff?text=KBM+Santri",
      caption: "Suasana Belajar Mengajar di Kelas Terbuka",
    },
    {
      imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Fasilitas+Kamar",
      caption: "Kondisi Kamar Asrama yang Bersih dan Nyaman",
    },
  ];

  for (const item of gallery) {
    await prisma.gallery.create({ data: item });
  }
  console.log("Initial gallery seeded.");

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  });
