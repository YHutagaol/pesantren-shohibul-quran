import Link from "next/link";
import { GraduationCap, BookOpen, Hotel, Monitor, CheckCircle } from "lucide-react";

export default function ProgramPendidikan() {
  return (
    <div className="pt-20">
      {/* Header Banner */}
      <div className="bg-primary text-white py-16 md:py-24 relative overflow-hidden reveal">
        <div className="absolute inset-0 opacity-10">
          <i className="fa-solid fa-graduation-cap text-[20rem] absolute -bottom-10 -right-10 transform -rotate-12"></i>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            Akademik
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Pendidikan</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Membentuk pribadi putra yang bertakwa, menguasai ilmu syar'i, dan adaptif terhadap teknologi informasi global.
          </p>
        </div>
      </div>

      {/* SMP Section */}
      <section id="smp" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 reveal-left">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-3xl transform -rotate-3 scale-105 opacity-20"></div>
                <img
                  src="https://placehold.co/600x450/e2e8f0/64748b?text=Salafiyah+Wustho"
                  alt="Program SMP"
                  className="relative rounded-3xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-2 border border-gray-100">
                  <Hotel className="text-4xl text-primary" />
                  <div>
                    <p className="font-bold text-dark text-sm">Sistem Asrama</p>
                    <p className="text-xs text-gray-500">Boarding & Full Day</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 reveal-right">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">
                Setingkat SMP • Khusus Putra
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-6">Salafiyah Wustho</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Program pendidikan tingkat menengah pertama yang difokuskan pada penguatan dasar aqidah Ahlus Sunnah wal
                Jama'ah, perbaikan bacaan dan hafalan Al-Qur'an (Tahsin & Tahfizh), serta pembiasaan karakter akhlak
                mulia sejak usia remaja.
              </p>

              <h4 className="font-bold text-dark mb-4 border-b pb-2">Target Pendidikan Utama:</h4>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark block">Aqidah Berdasarkan Pemahaman Salafus Shalih</strong>
                    <span className="text-sm">Menanamkan pondasi keyakinan keagamaan yang bersih dari penyimpangan.</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark block">Karakter & Etika Islami</strong>
                    <span className="text-sm">
                      Menekankan pembiasaan adab menuntut ilmu dan kesantunan bertingkah laku sehari-hari.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark block">Kurikulum Diknas Resmi</strong>
                    <span className="text-sm">
                      Tetap mendapatkan materi pengajaran umum nasional dan lulus dengan ijazah negara resmi.
                    </span>
                  </div>
                </li>
              </ul>

              <Link
                href="/pendaftaran"
                className="inline-flex items-center gap-2 bg-primary hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg transform hover:-translate-y-1"
              >
                Info Pendaftaran Wustho <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SMA Section */}
      <section id="sma" className="py-20 bg-gray-50 scroll-mt-24 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2 reveal-right">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <img
                  src="https://placehold.co/600x450/e2e8f0/64748b?text=Salafiyah+Ulya"
                  alt="Program SMA"
                  className="relative rounded-3xl shadow-xl z-10 w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-2 border border-gray-100">
                  <Monitor className="text-4xl text-secondary" />
                  <div>
                    <p className="font-bold text-dark text-sm">Melek Teknologi</p>
                    <p className="text-xs text-gray-500">Integrasi IT & Dakwah</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 reveal-left">
              <span className="text-secondary font-bold tracking-widest text-sm uppercase">
                Setingkat SMA • Khusus Putra
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-6">Salafiyah Ulya</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Program lanjutan atas yang mematangkan kesiapan santri untuk menjadi imam dan da'i di tengah masyarakat.
                Selain pendalaman ilmu syar'i dan hafalan Matan Tholabul Ilmi, santri dibekali kompetensi teknologi
                informasi agar mampu berdakwah secara modern dan bijak.
              </p>

              <h4 className="font-bold text-dark mb-4 border-b pb-2">Target & Keunggulan Lulusan:</h4>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark block">Kesiapan Menjadi Imam & Da'i</strong>
                    <span className="text-sm">
                      Melatih santri agar memiliki kematangan bacaan dan rasa percaya diri berdakwah di lingkungan sosial.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark block">Penghafal Matan Ilmu Din</strong>
                    <span className="text-sm">
                      Menghafalkan matan-matan ilmiah ringkas sebagai kunci pembuka pemahaman ilmu syariat secara
                      terstruktur.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark block">Integrasi Ilmu IPTEK</strong>
                    <span className="text-sm">
                      Program praktek komputer dan pemanfaatan media informasi digital secara sehat dan kreatif.
                    </span>
                  </div>
                </li>
              </ul>

              <Link
                href="/pendaftaran"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg transform hover:-translate-y-1"
              >
                Info Pendaftaran Ulya <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
