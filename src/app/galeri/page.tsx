"use client";

import { useEffect, useState } from "react";
import { Camera, X, Image as ImageIcon } from "lucide-react";

interface GalleryPhoto {
  id: number;
  imageUrl: string;
  caption: string | null;
}

export default function GaleriPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Camera className="w-[20rem] h-[20rem] absolute -bottom-10 -right-10 transform -rotate-12" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            Galeri Foto
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dokumentasi Kegiatan</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Potret aktivitas, fasilitas, dan kebersamaan santri di lingkungan Markaz Shohibul Quran.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Memuat foto galeri...</div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20 text-gray-500">Belum ada dokumentasi foto.</div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="break-inside-avoid bg-white p-2 rounded-2xl shadow-sm border border-gray-100 cursor-pointer overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="rounded-xl overflow-hidden relative">
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption || "Dokumentasi MSQ"}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ImageIcon className="text-white w-8 h-8" />
                    </div>
                  </div>
                  {photo.caption && (
                    <p className="text-xs text-gray-500 font-medium mt-3 px-1 text-center line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Modal */}
      {activePhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col justify-center items-center p-4 transition-all duration-300">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 text-white hover:text-primary transition p-2 bg-white/10 hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl relative">
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.caption || "Dokumentasi MSQ"}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
          {activePhoto.caption && (
            <p className="text-white text-center mt-6 text-sm max-w-2xl font-medium tracking-wide bg-black/60 px-6 py-3 rounded-full backdrop-blur-sm">
              {activePhoto.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
