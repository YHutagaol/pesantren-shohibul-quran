"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Tag, ChevronRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  thumbnail: string | null;
  publishedAt: string;
}

export default function BeritaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    fetch("/api/berita")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ["Semua", "Berita", "Artikel", "Prestasi", "Pengumuman"];

  const filteredArticles = activeCategory === "Semua"
    ? articles
    : articles.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <i className="fa-solid fa-newspaper text-[20rem] absolute -bottom-10 -right-10 transform -rotate-12"></i>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            Kabar Markaz
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Artikel</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Ikuti terus perkembangan, prestasi santri, dan informasi penting lainnya dari lingkungan Markaz Shohibul Quran.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm text-sm ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-green-100"
                    : "bg-white text-gray-600 border border-gray-200 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">Memuat data...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20 text-gray-500">Tidak ada berita atau artikel di kategori ini.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col"
                >
                  <div className="h-56 bg-gray-200 relative overflow-hidden">
                    <img
                      src={article.thumbnail || "https://placehold.co/400x300/e2e8f0/64748b?text=Markaz+Shohibul+Quran"}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {article.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-dark text-lg mb-3 line-clamp-2 group-hover:text-primary transition duration-300">
                        {article.title}
                      </h4>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                      <div className="flex items-center text-xs text-gray-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <Link
                        href={`/berita/${article.slug}`}
                        className="text-primary group-hover:text-green-700 text-sm font-semibold flex items-center gap-1"
                      >
                        Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
