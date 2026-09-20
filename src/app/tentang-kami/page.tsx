import { BookOpen, GraduationCap, School, Trophy, Award } from "lucide-react";
import Link from "next/link";

export default function TentangKami() {
  const images = [
    {
      src: "https://placehold.co/600x400/22c55e/ffffff?text=Gedung+Depan",
      alt: "Fasilitas Depan",
      rotation: "-rotate-3",
    },
    {
      src: "https://placehold.co/600x400/1e293b/ffffff?text=Halaman+Utama",
      alt: "Halaman Utama",
      rotation: "rotate-2",
      zIndex: "z-10",
    },
    {
      src: "https://placehold.co/600x400/3b82f6/ffffff?text=Area+Santri",
      alt: "Area Santri",
      rotation: "-rotate-2",
    },
  ];

  const curriculums = ["Tahfizh Intensif", "Pelajaran Diniyah", "Pelajaran Umum", "Life Skill"];

  return (
    <div className="pt-32 pb-20">
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-dark mb-12 reveal">
          Ath Thobari <span className="text-primary">(Markaz Shohibul Quran)</span>
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-16 reveal">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`w-72 md:w-80 bg-white p-2 shadow-xl border border-gray-100 transform ${img.rotation} hover:rotate-0 transition duration-500 ${
                img.zIndex || ""
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mb-20 reveal">
          <p className="mb-6">
            Pesantren ini didirikan dengan tekad untuk melahirkan generasi penghafal Al-Qur'an yang berpemahaman salafus
            ummah, beradab, dan siap berdakwah di tengah masyarakat.
          </p>
          <p>
            Berada di lingkungan yang asri di wilayah <span className="font-bold text-dark">Dramaga, Bogor</span>,
            pesantren ini menghadirkan suasana belajar yang tenang, fokus, dan kondusif bagi para penuntut ilmu.
          </p>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="bg-white py-20 border-y border-gray-100 reveal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-dark mb-2">Kurikulum</h2>
          <p className="text-gray-500 text-lg mb-10">Kurikulum pesantren menggabungkan:</p>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {curriculums.map((curr, idx) => (
              <div
                key={idx}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-100 transform hover:-translate-y-1 transition cursor-default"
              >
                {curr}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-24 bg-primary relative overflow-hidden text-center reveal mt-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <BookOpen className="w-[30rem] h-[30rem] absolute -top-20 -left-20 transform -rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Penerimaan Santri Baru</h2>
          <p className="text-green-100 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Tahun Pelajaran 2026-2027 telah dibuka. Kuota terbatas.
          </p>
          <Link
            href="/pendaftaran"
            className="inline-flex items-center gap-3 bg-white text-primary hover:bg-gray-50 font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
          >
            Daftar Sekarang <span className="font-bold">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
