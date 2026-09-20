"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";

interface GalleryPhoto {
  id: number;
  imageUrl: string;
  caption: string | null;
}

export default function AdminGaleriPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    setLoading(true);
    fetch("/api/galeri")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
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

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.filePath) {
        setImageUrl(data.filePath);
      } else {
        alert("Upload gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Mohon upload foto terlebih dahulu!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, caption }),
      });
      const newPhoto = await res.json();
      setPhotos([newPhoto, ...photos]);
      setImageUrl("");
      setCaption("");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan foto");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;

    fetch(`/api/galeri/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setPhotos(photos.filter((p) => p.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Manajemen Galeri Foto</h1>
        <p className="text-sm text-gray-500">Unggah foto kegiatan dan ketik caption untuk ditampilkan di galeri publik</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">Unggah Foto Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Pilih File Foto</label>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-primary hover:file:bg-green-100 cursor-pointer"
                />
                {uploading ? (
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" /> Mengunggah foto...
                  </div>
                ) : imageUrl ? (
                  <div className="relative rounded-xl overflow-hidden border w-full h-40">
                    <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="border border-dashed rounded-2xl p-6 text-center text-gray-400 text-xs flex flex-col items-center gap-2">
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                    Belum ada foto terpilih
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Caption / Keterangan</label>
              <input
                type="text"
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="Contoh: Pembagian hadiah perlombaan lughah"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="w-full bg-primary hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Tambahkan ke Galeri
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">Memuat data galeri...</div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-dashed rounded-2xl">
              Belum ada foto di galeri.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm relative group overflow-hidden"
                >
                  <div className="rounded-xl overflow-hidden h-36 relative">
                    <img src={p.imageUrl} alt={p.caption || "Foto"} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow shadow-red-200 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {p.caption && (
                    <p className="text-xs text-gray-500 font-medium mt-2 px-1 text-center line-clamp-1">
                      {p.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
