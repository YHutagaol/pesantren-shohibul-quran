"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Newspaper,
  BookOpen,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  Home,
  Loader2,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // Only render for authenticated users or when login page
  if (!session && pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { name: "Pendaftar PPDB", href: "/admin/ppdb", icon: Users },
    { name: "Berita & Artikel", href: "/admin/berita", icon: Newspaper },
    { name: "Kegiatan Tahfizh", href: "/admin/tahfizh", icon: BookOpen },
    { name: "Galeri Foto", href: "/admin/galeri", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center z-30">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 object-contain rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/30x30/15803d/ffffff?text=M";
            }}
          />
          <span className="font-bold text-dark text-base">MSQ Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 focus:outline-none hover:text-primary transition"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 shrink-0 z-20 transition-all duration-300 md:block fixed md:sticky top-0 h-screen flex flex-col justify-between ${
          sidebarOpen ? "left-0" : "-left-64 md:left-0"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="hidden md:flex items-center gap-3 p-6 border-b border-gray-100">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/40x40/15803d/ffffff?text=MSQ";
              }}
            />
            <div>
              <span className="font-bold text-dark text-lg block leading-none">MSQ Portal</span>
              <span className="text-xs text-gray-400 font-medium">Administrator</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-green-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-primary transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Lihat Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-300 text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
