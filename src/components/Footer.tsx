"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-dark text-white pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 bg-white/10 p-3 rounded-xl inline-flex backdrop-blur-sm">
              <img
                src="/logo.png"
                alt="Logo MSQ"
                className="h-10 w-10 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/40x40/15803d/ffffff?text=MSQ";
                }}
              />
              <span className="font-bold text-xl text-white">MSQ</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Menjadi Lembaga Pendidikan yang Unggul Di Nusantara Dalam Melahirkan Penghafal Al-Qur'an yang Berakhlak Mulia & Melek Teknologi.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6 border-b border-white/10 pb-3 inline-block">Menu Utama</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary transition-all">Beranda</Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-primary transition-all">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-primary transition-all">Program Pendidikan</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-primary transition-all">Berita & Artikel</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6 border-b border-white/10 pb-3 inline-block">Alamat Markaz</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex gap-3 items-start">
                <MapPin className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                <span>Jl. Kampung Lebak Nangka RT 06/06 Desa Petir Kec. Dramaga Kab. Bogor</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6 border-b border-white/10 pb-3 inline-block">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3 items-center">
                <Phone className="text-primary w-4 h-4" />
                <span>0852 1995 5195</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-primary w-4 h-4" />
                <span>info@markazshohibulquran.or.id</span>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="text-primary w-4 h-4" />
                <span>Senin - Sabtu (08:00 - 16:00)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Markaz Shohibul Quran. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </div>
    </footer>
  );
}
