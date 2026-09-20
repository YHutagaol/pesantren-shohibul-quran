"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LogIn, Eye, CheckCircle2, BookOpen, GraduationCap, Building2 } from "lucide-react";

type TabId = "visi" | "keunggulan" | "ekskul";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("visi");

  const facilities = [
    { icon: "fa-mosque", name: "Masjid" },
    { icon: "fa-snowflake", name: "Asrama & Kelas AC" },
    { icon: "fa-users-rectangle", name: "Aula" },
    { icon: "fa-futbol", name: "Lapangan Olahraga" },
    { icon: "fa-desktop", name: "Ruang Komputer" },
    { icon: "fa-shirt", name: "Laundry" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pt-20">
          <div
            className="w-full h-[60vh] md:h-[80vh] bg-cover bg-center animate-ken-burns scale-105"
            style={{
              backgroundImage: "url('https://placehold.co/1920x1080/1e293b/1e293b?text=Markaz+Shohibul+Quran')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10"></div>
        </div>

        <div className="w-full h-[60vh] md:h-[80vh] relative z-10 flex flex-col justify-center pb-20 px-4 text-center text-white">
          <span className="bg-secondary text-white px-5 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mx-auto mb-4 shadow-lg reveal">
            Yayasan Ubay Bin Ka'ab Ash Shohaby
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 reveal">
            Markaz Shohibul Qur'an <span className="text-secondary">(MSQ)</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 reveal max-w-3xl mx-auto mb-8">
            Terbentuknya generasi Shohibul Qur'an yang berakhlak mulia serta unggul dalam ilmu pengetahuan & teknologi.
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md shadow-2xl mx-4 md:mx-auto md:w-4/5 lg:w-3/4 -mt-16 relative z-20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-white reveal group hover:bg-white transition duration-500">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark group-hover:text-primary transition duration-300">
              Penerimaan Murid Baru (SPMB)
            </h2>
            <p className="text-xl md:text-2xl text-secondary font-semibold mt-1">
              Tahun Ajaran 2026 - 2027
            </p>
          </div>
          <Link
            href="/pendaftaran"
            className="bg-primary hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-1"
          >
            <LogIn className="w-5 h-5" /> Daftar Sekarang
          </Link>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 bg-gray-50 reveal">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium mb-8 uppercase tracking-widest text-sm">
            Fasilitas Penunjang Santri
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-gray-400 font-medium text-sm md:text-base">
            {facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <i className={`fa-solid ${fac.icon} text-primary text-xl`}></i> {fac.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mudir Speech Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 lg:col-span-4 relative reveal-left group">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://placehold.co/600x800/cbd5e1/1e293b?text=Ust+Dani+Abu+Abdillah"
                  alt="Mudir MSQ"
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="absolute top-5 -right-5 w-full h-full border-4 border-secondary/30 rounded-2xl z-0 group-hover:top-3 group-hover:-right-3 transition-all duration-500"></div>
            </div>

            <div className="md:col-span-7 lg:col-span-8 reveal-right">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6 relative inline-block">
                Sambutan Mudir MSQ
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
              </h2>

              <div className="prose prose-lg text-gray-600 text-justify mt-4">
                <div
                  className="text-center font-arabic text-xl mb-6 text-gray-800 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-inner"
                  dir="rtl"
                >
                  بسم الله الرحمن الرحيم
                  <br />
                  <span className="text-base text-gray-600 font-sans">
                    الحمد لله رب العالمين ، والصلاة والسلام على أشرف الأنبياء والمرسلين نبينا محمد و على آله و أصحابه أجمعين.
                  </span>
                </div>
                <p className="mb-4 leading-relaxed">
                  Markaz Shohibul Qur'an (MSQ) hadir sebagai wadah pendidikan yang memadukan nilai-nilai Islam sesuai pemahaman Salafus Shalih dengan perkembangan teknologi. Kami berkomitmen untuk mendidik generasi putra yang tidak hanya melek informasi, tetapi juga memiliki hafalan yang kuat, akhlak yang mulia, dan siap terjun berdakwah di tengah umat.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-1 bg-primary rounded-full"></div>
                <div>
                  <p className="font-bold text-dark text-lg">Ust. Dani Abu Abdillah, S.Pd</p>
                  <p className="text-sm text-primary font-medium">Mudir Markaz Shohibul Qur'an</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target & Visi Misi Tabbed Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-16 text-center reveal">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Profil & Target Unggulan</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
            <button
              onClick={() => setActiveTab("visi")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                activeTab === "visi"
                  ? "bg-primary text-white shadow-lg shadow-green-200"
                  : "bg-white text-gray-600 hover:text-primary hover:shadow-md border border-gray-200"
              }`}
            >
              Visi & Misi
            </button>
            <button
              onClick={() => setActiveTab("keunggulan")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                activeTab === "keunggulan"
                  ? "bg-primary text-white shadow-lg shadow-green-200"
                  : "bg-white text-gray-600 hover:text-primary hover:shadow-md border border-gray-200"
              }`}
            >
              Keunggulan Santri
            </button>
            <button
              onClick={() => setActiveTab("ekskul")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                activeTab === "ekskul"
                  ? "bg-primary text-white shadow-lg shadow-green-200"
                  : "bg-white text-gray-600 hover:text-primary hover:shadow-md border border-gray-200"
              }`}
            >
              Ekstrakurikuler
            </button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {activeTab === "visi" && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 animate-fade-in">
                <div className="w-16 h-16 bg-green-50 text-primary text-3xl rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <p className="text-xl md:text-2xl text-dark font-medium leading-relaxed italic">
                  "Terbentuknya generasi Shohibul Qur'an yang berakhlak mulia serta unggul dalam ilmu pengetahuan & teknologi."
                </p>
              </div>
            )}

            {activeTab === "keunggulan" && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-left animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-4 text-gray-600 list-none">
                    <li className="flex gap-3 items-start">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span>Aqidah Ahlus Sunnah wal Jamaah sesuai pemahaman Salafus Shalih.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span>Memiliki karakter akhlak yang mulia.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span>Mendapatkan ijazah diknas resmi.</span>
                    </li>
                  </ul>
                  <ul className="space-y-4 text-gray-600 list-none">
                    <li className="flex gap-3 items-start">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span>Bacaan Al-Qur'an yang baik, siap menjadi imam & berdakwah.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span>Menghapal Matan Tholabul Ilmi.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                      <span>Santri yang melek teknologi & informasi.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "ekskul" && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 animate-fade-in">
                <div className="flex flex-wrap justify-center gap-4 text-primary font-medium">
                  {[
                    { icon: "fa-book-quran", name: "Tahsin Al-Qur'an" },
                    { icon: "fa-computer", name: "Komputer" },
                    { icon: "fa-futbol", name: "Futsal" },
                    { icon: "fa-table-tennis-paddle-ball", name: "Bulu Tangkis" },
                    { icon: "fa-bullseye", name: "Memanah" },
                    { icon: "fa-basketball", name: "Basket" },
                    { icon: "fa-hand-fist", name: "Bela Diri" },
                  ].map((eks, idx) => (
                    <span key={idx} className="bg-green-50 px-4 py-2 rounded-lg flex items-center gap-2">
                      <i className={`fa-solid ${eks.icon}`}></i> {eks.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <span className="text-secondary font-semibold tracking-wider text-sm uppercase">Khusus Putra</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">Program Pendidikan</h2>
            <p className="text-gray-500">
              Tersedia pilihan <strong>Boarding School</strong> (Berasrama) dan <strong>Full Day</strong> (Pulang Pergi).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="reveal group relative bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary text-3xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">Salafiyah Wustho</h3>
                <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wide">Setingkat SMP</p>
                <p className="text-gray-500 mb-8 text-sm">
                  Program pendidikan menengah pertama khusus putra dengan penanaman aqidah dan hafalan yang kuat.
                </p>
                <Link
                  href="/program#smp"
                  className="inline-block bg-gray-50 hover:bg-primary text-gray-700 hover:text-white font-medium px-8 py-3 rounded-xl transition duration-300 w-full group-hover:shadow-md"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>

            <div className="reveal group relative bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-secondary text-3xl group-hover:bg-secondary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                  <Building2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">Salafiyah Ulya</h3>
                <p className="text-secondary font-medium mb-4 text-sm uppercase tracking-wide">Setingkat SMA</p>
                <p className="text-gray-500 mb-8 text-sm">
                  Program lanjutan atas khusus putra untuk mencetak santri melek teknologi & ilmu syar'i.
                </p>
                <Link
                  href="/program#sma"
                  className="inline-block bg-gray-50 hover:bg-secondary text-gray-700 hover:text-white font-medium px-8 py-3 rounded-xl transition duration-300 w-full group-hover:shadow-md"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-24 bg-primary relative overflow-hidden text-center reveal">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <BookOpen className="w-[30rem] h-[30rem] absolute -top-20 -left-20 transform -rotate-12" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-white/80 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">SEGERA DAFTAR</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Penerimaan Murid Baru (SPMB)</h2>
          <p className="text-green-100 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Tahun Ajaran 2026-2027 telah dibuka secara resmi.
          </p>
          <Link
            href="/pendaftaran"
            className="inline-flex items-center gap-3 bg-white text-primary hover:bg-gray-50 font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
          >
            Daftar Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
