"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

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

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetch(`/api/berita/${params.slug}`)
        .then((res) => {
          if (!res.ok) throw new Error("Article not found");
          return res.json();
        })
        .then((data) => {
          setArticle(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center text-gray-500">
        Memuat konten...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold text-dark mb-4">Artikel Tidak Ditemukan</h2>
        <Link href="/berita" className="text-primary hover:underline">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Berita & Artikel
        </Link>

        <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-400 mb-6">
            <span className="bg-green-50 text-primary font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-dark mb-8 leading-tight">
            {article.title}
          </h1>

          {article.thumbnail && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-md max-h-[500px]">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-justify whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
        </article>
      </div>
    </div>
  );
}
