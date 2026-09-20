"use client";

import { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Loader2, BookOpen } from "lucide-react";

interface TahfizhProgram {
  id: number;
  title: string;
  description: string;
  icon: string | null;
}

export default function AdminTahfizhPage() {
  const [programs, setPrograms] = useState<TahfizhProgram[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("fa-book-open");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = () => {
    setLoading(true);
    fetch("/api/tahfizh")
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIcon("fa-book-open");
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (prog: TahfizhProgram) => {
    setTitle(prog.title);
    setDescription(prog.description);
    setIcon(prog.icon || "fa-book-open");
    setIsEditing(true);
    setEditId(prog.id);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kegiatan tahfizh ini?")) return;

    fetch(`/api/tahfizh/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setPrograms(programs.filter((p) => p.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = { title, description, icon };

    try {
      if (isEditing && editId !== null) {
        const res = await fetch(`/api/tahfizh/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const updated = await res.json();
        setPrograms(programs.map((p) => (p.id === editId ? updated : p)));
      } else {
        const res = await fetch("/api/tahfizh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const created = await res.json();
        setPrograms([...programs, created]);
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Manajemen Kegiatan & Metode Tahfizh</h1>
        <p className="text-sm text-gray-500">Kelola deskripsi metode tahfizh (Ziyadah, Muroja'ah, dll) yang tampil di publik</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-dark mb-4 border-b pb-2">
            {isEditing ? "Edit Program Tahfizh" : "Tambah Program Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nama Kegiatan / Metode</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="Contoh: Tasmi' 30 Juz"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Icon FontAwesome</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white"
              >
                <option value="fa-book-open">Buku Terbuka (fa-book-open)</option>
                <option value="fa-rotate">Putar Ulang (fa-rotate)</option>
                <option value="fa-volume-high">Volume Suara (fa-volume-high)</option>
                <option value="fa-mosque">Masjid (fa-mosque)</option>
                <option value="fa-graduation-cap">Topi Toga (fa-graduation-cap)</option>
                <option value="fa-award">Medali (fa-award)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Deskripsi Lengkap</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-primary leading-relaxed"
                placeholder="Deskripsikan secara lengkap penjelasan metode ini..."
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isEditing ? "Simpan Perubahan" : "Tambah Program"}
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

        {/* List View */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-20 text-gray-500 font-medium">Memuat data program...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-dashed rounded-2xl">
              Belum ada program tahfizh yang dibuat.
            </div>
          ) : (
            programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md transition-all duration-300 gap-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 shrink-0 bg-green-50 text-primary text-xl rounded-xl flex items-center justify-center border border-green-100">
                    <i className={`fa-solid ${prog.icon || "fa-book-open"}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark leading-snug">{prog.title}</h4>
                    <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{prog.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(prog)}
                    className="text-primary hover:text-green-700 p-2 hover:bg-green-50 rounded-xl transition cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prog.id)}
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
