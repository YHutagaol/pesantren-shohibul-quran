"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Hide Navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-gray-100 py-3"
          : "bg-white border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Logo MSQ"
              className="w-10 h-10 object-contain rounded-full group-hover:scale-110 transition duration-300"
              onError={(e) => {
                // Fallback image if logo.png is not loaded
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/40x40/15803d/ffffff?text=MSQ";
              }}
            />
            <span className="font-bold text-xl text-dark hidden sm:block group-hover:text-primary transition duration-300">
              Markaz Shohibul Quran
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition relative hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdown Program */}
            <div className="relative dropdown group py-3">
              <span className="font-medium text-gray-600 hover:text-primary transition flex items-center gap-1 cursor-pointer">
                Program <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <div className="dropdown-menu absolute hidden pt-4 top-full left-0 w-56 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100">
                <Link
                  href="/program#smp"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-all duration-300"
                >
                  Salafiyah Wustho (SMP)
                </Link>
                <Link
                  href="/program#sma"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-all duration-300"
                >
                  Salafiyah Ulya (SMA)
                </Link>
              </div>
            </div>

            {/* Dropdown Kegiatan */}
            <div className="relative dropdown group py-3">
              <span className="font-medium text-gray-600 hover:text-primary transition flex items-center gap-1 cursor-pointer">
                Kegiatan <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <div className="dropdown-menu absolute hidden pt-4 top-full left-0 w-56 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100">
                <Link
                  href="/berita"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-all duration-300"
                >
                  Berita Pesantren
                </Link>
                <Link
                  href="/tahfizh"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-all duration-300"
                >
                  Tahfizh & Ekstra
                </Link>
                <Link
                  href="/galeri"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-all duration-300"
                >
                  Galeri Foto
                </Link>
              </div>
            </div>

            <Link
              href="/berita?category=Artikel"
              className={`font-medium transition relative hover:text-primary ${
                pathname.startsWith("/artikel") ? "text-primary" : "text-gray-600"
              }`}
            >
              Artikel
            </Link>
          </div>

          <div className="hidden lg:block">
            <Link
              href="/pendaftaran"
              className="bg-primary hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md shadow-green-200 hover:shadow-lg hover:-translate-y-0.5 inline-block"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-600 text-2xl focus:outline-none hover:text-primary transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg transition-all duration-300">
          <div className="px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-600 hover:text-primary font-medium">
              Beranda
            </Link>
            <Link href="/tentang-kami" className="text-gray-600 hover:text-primary font-medium">
              Tentang Kami
            </Link>
            <div className="border-t border-gray-50 pt-2">
              <span className="text-gray-400 text-sm font-semibold mb-2 block">Program</span>
              <Link
                href="/program#smp"
                className="block text-gray-600 py-1 pl-4 hover:text-primary hover:bg-gray-50 rounded"
              >
                Salafiyah Wustho (SMP)
              </Link>
              <Link
                href="/program#sma"
                className="block text-gray-600 py-1 pl-4 hover:text-primary hover:bg-gray-50 rounded"
              >
                Salafiyah Ulya (SMA)
              </Link>
            </div>
            <div className="border-t border-gray-50 pt-2">
              <span className="text-gray-400 text-sm font-semibold mb-2 block">Kegiatan</span>
              <Link
                href="/berita"
                className="block text-gray-600 py-1 pl-4 hover:text-primary hover:bg-gray-50 rounded"
              >
                Berita Pesantren
              </Link>
              <Link
                href="/tahfizh"
                className="block text-gray-600 py-1 pl-4 hover:text-primary hover:bg-gray-50 rounded"
              >
                Tahfizh & Ekstra
              </Link>
              <Link
                href="/galeri"
                className="block text-gray-600 py-1 pl-4 hover:text-primary hover:bg-gray-50 rounded"
              >
                Galeri Foto
              </Link>
            </div>
            <Link href="/berita?category=Artikel" className="text-gray-600 hover:text-primary font-medium">
              Artikel
            </Link>
            <Link
              href="/pendaftaran"
              className="bg-primary text-white text-center px-4 py-2.5 rounded-xl font-medium mt-4 block"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
