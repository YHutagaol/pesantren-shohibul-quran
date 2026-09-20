import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Markaz Shohibul Quran (MSQ)",
  description: "Terbentuknya generasi Shohibul Qur'an yang berakhlak mulia serta unggul dalam ilmu pengetahuan & teknologi.",
  icons: {
    icon: "/logo.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-sans text-gray-700 bg-gray-50 overflow-x-hidden flex flex-col min-h-screen">
        <SessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ScrollReveal />
        </SessionProvider>
      </body>
    </html>
  );
}
