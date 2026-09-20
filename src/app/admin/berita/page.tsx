"use client";

import { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Calendar, Tag, Image as ImageIcon, Loader2 } from "lucide-react";

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

export default function AdminBeritaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Berita");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    setLoading(true);
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
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.filePath) {
        setThumbnail(data.filePath);
      } else {
        alert("Upload gagal");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Berita");
    setExcerpt("");
    setContent("");
    setThumbnail("");
    setIsEditing(false);
    setEditSlug(null);
  };

  const handleEdit = (article: Article) => {
    setTitle(article.title);
    setCategory(article.category);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setThumbnail(article.thumbnail || "");
    setIsEditing(true);
    setEditSlug(article.slug);
  };

  const handleDelete = (slug: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

    fetch(`/api/berita/${slug}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setArticles(articles.filter((a) => a.slug !== slug));
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = { title, category, excerpt, content, thumbnail };

    try {
      if (isEditing && editSlug) {
        const res = await fetch(`/api/berita/${editSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const updated = await res.json();
        setArticles(articles.map((a) => (a.slug === editSlug ? updated : a)));
      } else {
        const res = await fetch("/api/berita", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const created = await res.json();
        setArticles([created, ...articles]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal memproses data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark">Manajemen Berita & Artikel</h1>
          <p className="text-sm text-gray-500">Tulis berita kegiatan, info prestasi, atau materi artikel pendidikan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Editor */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">
            {isEditing ? "Edit Berita/Artikel" : "Tulis Berita Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Judul Utama</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="Contoh: Kegiatan Rihlah Santri 2026"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white"
              >
                <option value="Berita">Berita</option>
                <option value="Artikel">Artikel</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Pengumuman">Pengumuman</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Thumbnail Cover</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-primary hover:file:bg-green-100 cursor-pointer"
                />
                {thumbnail && (
                  <img src={thumbnail} alt="Preview" className="w-10 h-10 object-cover rounded-lg border" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Ringkasan (Excerpt)</label>
              <textarea
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="Ringkasan singkat isi berita..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Konten Lengkap</label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary font-sans leading-relaxed"
                placeholder="Tulis artikel lengkap di sini..."
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isEditing ? "Simpan Perubahan" : "Terbitkan Berita"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Article List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">Memuat data berita...</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-dashed rounded-2xl">
              Belum ada berita yang diterbitkan.
            </div>
          ) : (
            articles.map((art) => (
              <div
                key={art.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-xl overflow-hidden border">
                    {art.thumbnail ? (
                      <img src={art.thumbnail} alt={art.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark leading-snug line-clamp-2">{art.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2 font-medium">
                      <span className="bg-green-50 text-primary font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {art.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(art.publishedAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleEdit(art)}
                    className="text-primary hover:text-green-700 p-2 hover:bg-green-50 rounded-xl transition cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.slug)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
