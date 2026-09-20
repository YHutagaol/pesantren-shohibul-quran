"use client";

import { useEffect, useState } from "react";
import { Search, Download, Eye, FileText, CheckCircle, XCircle, Clock, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";

interface Candidate {
  id: number;
  nomor_daftar: string;
  nama_lengkap: string;
  nisn: string | null;
  tempat_lahir: string;
  tanggal_lahir: string;
  asal_sekolah: string;
  nama_ortu: string;
  no_wa: string;
  program_pilihan: string;
  tipe_asrama: string;
  berkas_foto: string | null;
  berkas_akte: string | null;
  berkas_kk: string | null;
  berkas_sehat: string | null;
  berkas_nisn: string | null;
  berkas_raport: string | null;
  bukti_transfer: string | null;
  status_daftar: string;
  createdAt: string;
}

export default function AdminPPDBPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterProgram, setFilterProgram] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    setLoading(true);
    fetch("/api/pendaftaran")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleUpdateStatus = (id: number, newStatus: string) => {
    fetch(`/api/pendaftaran/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_daftar: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setCandidates(
          candidates.map((c) => (c.id === id ? { ...c, status_daftar: newStatus } : c))
        );
        if (selectedCandidate?.id === id) {
          setSelectedCandidate({ ...selectedCandidate, status_daftar: newStatus });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data pendaftaran ini?")) return;

    fetch(`/api/pendaftaran/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setCandidates(candidates.filter((c) => c.id !== id));
        setSelectedCandidate(null);
      })
      .catch((err) => console.error(err));
  };

  const handleExport = () => {
    const formatted = candidates.map((c) => ({
      "Nomor Daftar": c.nomor_daftar,
      Nama: c.nama_lengkap,
      NISN: c.nisn || "-",
      "Tempat Lahir": c.tempat_lahir,
      "Tanggal Lahir": new Date(c.tanggal_lahir).toLocaleDateString("id-ID"),
      "Asal Sekolah": c.asal_sekolah,
      "Nama Orang Tua": c.nama_ortu,
      "No WA/HP": c.no_wa,
      Program: c.program_pilihan,
      Tipe: c.tipe_asrama,
      Status: c.status_daftar,
      "Tanggal Daftar": new Date(c.createdAt).toLocaleDateString("id-ID"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar");
    XLSX.writeFile(workbook, "Data_Calon_Santri_PPDB.xlsx");
  };

  const filtered = candidates.filter((c) => {
    const matchSearch = c.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      c.nomor_daftar.toLowerCase().includes(search.toLowerCase());
    const matchProgram = filterProgram === "Semua" || c.program_pilihan === filterProgram;
    const matchStatus = filterStatus === "Semua" || c.status_daftar === filterStatus;
    return matchSearch && matchProgram && matchStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark">Data Calon Santri Baru (PPDB)</h1>
          <p className="text-sm text-gray-500">Kelola berkas, status kelulusan, dan unduh rekap data pendaftar</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-primary hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition flex items-center gap-2 text-sm shadow-md shadow-green-100 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Cari nama atau nomor daftar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition"
          />
          <Search className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
        </div>
        <div>
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm bg-white"
          >
            <option value="Semua">Semua Program</option>
            <option value="Salafiyah Wustho (SMP)">Salafiyah Wustho (SMP)</option>
            <option value="Salafiyah Ulya (SMA)">Salafiyah Ulya (SMA)</option>
          </select>
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm bg-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="PENDING">PENDING</option>
            <option value="LULUS TES">LULUS TES</option>
            <option value="DITOLAK">DITOLAK</option>
          </select>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100">
                  <th className="p-4">No. Daftar</th>
                  <th className="p-4">Nama Lengkap</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">Memuat data...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">Tidak ada data pendaftar.</td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-primary">{c.nomor_daftar}</td>
                      <td className="p-4">
                        <p className="font-semibold text-dark">{c.nama_lengkap}</p>
                        <p className="text-xs text-gray-400">NISN: {c.nisn || "-"}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-dark text-xs">{c.program_pilihan}</p>
                        <p className="text-xs text-gray-400">{c.tipe_asrama}</p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            c.status_daftar === "LULUS TES"
                              ? "bg-green-50 text-green-700"
                              : c.status_daftar === "DITOLAK"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {c.status_daftar === "LULUS TES" && <CheckCircle className="w-3 h-3" />}
                          {c.status_daftar === "DITOLAK" && <XCircle className="w-3 h-3" />}
                          {c.status_daftar === "PENDING" && <Clock className="w-3 h-3" />}
                          {c.status_daftar}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedCandidate(c)}
                          className="text-primary hover:text-green-700 p-2 hover:bg-green-50 rounded-xl transition cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
          {selectedCandidate ? (
            <div className="space-y-6">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase">Detail Pendaftar</span>
                <h3 className="text-xl font-bold text-dark mt-1">{selectedCandidate.nama_lengkap}</h3>
                <p className="text-sm font-semibold text-primary mt-1">{selectedCandidate.nomor_daftar}</p>
              </div>

              {/* Grid Info */}
              <div className="space-y-3.5 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Asal Sekolah:</span>
                  <span className="font-semibold text-dark">{selectedCandidate.asal_sekolah}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tempat, Tgl Lahir:</span>
                  <span className="font-semibold text-dark">
                    {selectedCandidate.tempat_lahir},{" "}
                    {new Date(selectedCandidate.tanggal_lahir).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Orang Tua/Wali:</span>
                  <span className="font-semibold text-dark">{selectedCandidate.nama_ortu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">WhatsApp:</span>
                  <a
                    href={`https://wa.me/${selectedCandidate.no_wa}`}
                    target="_blank"
                    className="font-semibold text-primary hover:underline"
                  >
                    {selectedCandidate.no_wa}
                  </a>
                </div>
              </div>

              {/* Berkas Uploaded */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Dokumen Terupload</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: "berkas_foto", label: "Pas Foto" },
                    { key: "berkas_akte", label: "Akte Lahir" },
                    { key: "berkas_kk", label: "KK" },
                    { key: "berkas_sehat", label: "Surat Sehat" },
                    { key: "berkas_nisn", label: "Bukti NISN" },
                    { key: "berkas_raport", label: "Raport" },
                    { key: "bukti_transfer", label: "Bukti Bayar" },
                  ].map((doc) => {
                    const val = selectedCandidate[doc.key as keyof Candidate];
                    return val ? (
                      <a
                        key={doc.key}
                        href={val}
                        target="_blank"
                        className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-primary hover:text-primary transition font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5" /> {doc.label}
                      </a>
                    ) : (
                      <div key={doc.key} className="p-2 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl line-through">
                        {doc.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase block">Update Status Seleksi</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedCandidate.id, "LULUS TES")}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Lulus Tes
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedCandidate.id, "DITOLAK")}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Tolak
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedCandidate.id, "PENDING")}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" /> Pending
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(selectedCandidate.id)}
                  className="w-full border border-red-200 hover:bg-red-50 text-red-600 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Pendaftaran
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 text-sm">
              Pilih pendaftar dari tabel untuk melihat rincian & berkas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
