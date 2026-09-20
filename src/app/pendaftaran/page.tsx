"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  User,
  Users,
  GraduationCap,
  UploadCloud,
  CheckCircle,
  FileCheck,
  Loader2,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// Form validation schema
const registrationSchema = zod.object({
  nama_lengkap: zod.string().min(3, "Nama lengkap minimal 3 karakter"),
  nisn: zod.string().min(10, "NISN harus 10 digit").max(10, "NISN harus 10 digit").optional().or(zod.literal("")),
  tempat_lahir: zod.string().min(3, "Tempat lahir wajib diisi"),
  tanggal_lahir: zod.string().min(10, "Tanggal lahir wajib diisi"),
  asal_sekolah: zod.string().min(5, "Asal sekolah minimal 5 karakter"),
  nama_ortu: zod.string().min(3, "Nama orang tua minimal 3 karakter"),
  no_wa: zod.string().min(10, "Nomor WhatsApp minimal 10 digit"),
  program_pilihan: zod.enum(["Salafiyah Wustho (SMP)", "Salafiyah Ulya (SMA)"]),
  tipe_asrama: zod.enum(["Boarding", "Full Day"]),
  berkas_foto: zod.string().min(1, "Pas Foto wajib diupload"),
  berkas_akte: zod.string().min(1, "Akte Kelahiran wajib diupload"),
  berkas_kk: zod.string().min(1, "Kartu Keluarga wajib diupload"),
  berkas_sehat: zod.string().min(1, "Surat Sehat wajib diupload"),
  berkas_nisn: zod.string().min(1, "Surat Keterangan/Bukti NISN wajib diupload"),
  berkas_raport: zod.string().min(1, "Raport Kelas 6 SD wajib diupload"),
  bukti_transfer: zod.string().min(1, "Bukti Transfer wajib diupload"),
});

type RegistrationFormValues = zod.infer<typeof registrationSchema>;

export default function PendaftaranPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nama_lengkap: "",
      nisn: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      asal_sekolah: "",
      nama_ortu: "",
      no_wa: "",
      program_pilihan: "Salafiyah Wustho (SMP)",
      tipe_asrama: "Boarding",
      berkas_foto: "",
      berkas_akte: "",
      berkas_kk: "",
      berkas_sehat: "",
      berkas_nisn: "",
      berkas_raport: "",
      bukti_transfer: "",
    },
  });

  const formValues = watch();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof RegistrationFormValues) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.filePath) {
        setValue(fieldName, data.filePath);
      } else {
        alert("Upload gagal: " + (data.error || "Terjadi kesalahan"));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengupload berkas.");
    } finally {
      setUploadingField(null);
    }
  };

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();
      if (result.success) {
        setSuccessData(result.data);
      } else {
        alert("Pendaftaran gagal: " + (result.error || "Gagal menyimpan data"));
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pendaftaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Basic step validation before moving forward
    if (step === 1) {
      if (!formValues.nama_lengkap || !formValues.tempat_lahir || !formValues.tanggal_lahir || !formValues.asal_sekolah) {
        alert("Mohon lengkapi semua data wajib calon santri!");
        return;
      }
    }
    if (step === 2) {
      if (!formValues.nama_ortu || !formValues.no_wa) {
        alert("Mohon lengkapi data orang tua!");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (successData) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-green-100 flex flex-col items-center">
            <CheckCircle2 className="text-primary w-20 h-20 mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-dark mb-4">Pendaftaran Sukses!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Alhamdulillah, data pendaftaran calon santri atas nama <strong>{successData.nama_lengkap}</strong> telah masuk ke sistem kami.
            </p>

            <div className="bg-green-50 p-6 rounded-2xl w-full text-left font-mono border border-green-100 mb-8">
              <p className="text-sm text-gray-500 font-sans">Nomor Registrasi Pendaftaran:</p>
              <p className="text-2xl font-bold text-primary tracking-wider mt-1">{successData.nomor_daftar}</p>
              <p className="text-xs text-gray-500 font-sans mt-3">
                *Simpan nomor ini untuk melakukan pengecekan status kelulusan di kemudian hari.
              </p>
            </div>

            <p className="text-xs text-gray-500 italic mb-8 max-w-md leading-relaxed">
              Silakan konfirmasi pembayaran biaya pendaftaran Anda ke nomor panitia resmi melalui link WhatsApp konfirmasi yang tertera pada panduan pendaftaran.
            </p>

            <button
              onClick={() => {
                setSuccessData(null);
                setStep(1);
                window.location.reload();
              }}
              className="bg-primary hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition duration-300 shadow-lg shadow-green-100"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepsInfo = [
    { title: "Calon Santri", icon: User },
    { title: "Orang Tua", icon: Users },
    { title: "Program", icon: GraduationCap },
    { title: "Upload Berkas", icon: UploadCloud },
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-dark">Formulir Pendaftaran Online</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Markaz Shohibul Quran SPMB Tahun Pelajaran 2026 - 2027
          </p>
        </div>

        {/* Steps Progress Indicator */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
          {stepsInfo.map((s, idx) => {
            const Icon = s.icon;
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary text-white"
                      : isActive
                      ? "bg-secondary text-white ring-4 ring-amber-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? <FileCheck className="w-5 h-5" /> : stepNum}
                </div>
                <span
                  className={`text-sm font-semibold hidden md:inline ${
                    isActive ? "text-dark" : isCompleted ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {s.title}
                </span>
                {idx < stepsInfo.length - 1 && (
                  <div className="w-4 md:w-8 h-[2px] bg-gray-200 hidden md:block"></div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
          {/* STEP 1: DATA CALON SANTRI */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-dark border-b pb-2 flex items-center gap-2">
                <User className="text-primary w-5 h-5" /> Data Calon Santri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap Santri *</label>
                  <input
                    type="text"
                    {...register("nama_lengkap")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    placeholder="Contoh: Muhammad Rafli"
                  />
                  {errors.nama_lengkap && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.nama_lengkap.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">NISN Calon Santri (10 digit) *</label>
                  <input
                    type="text"
                    {...register("nisn")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    placeholder="Contoh: 0081234567"
                  />
                  {errors.nisn && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.nisn.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tempat Lahir *</label>
                  <input
                    type="text"
                    {...register("tempat_lahir")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    placeholder="Contoh: Bogor"
                  />
                  {errors.tempat_lahir && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.tempat_lahir.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir *</label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("tanggal_lahir")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  {errors.tanggal_lahir && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.tanggal_lahir.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Asal Sekolah (SD/MI/SMP) *</label>
                  <input
                    type="text"
                    {...register("asal_sekolah")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    placeholder="Contoh: SD Negeri Dramaga 01"
                  />
                  {errors.asal_sekolah && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.asal_sekolah.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATA ORANG TUA */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-dark border-b pb-2 flex items-center gap-2">
                <Users className="text-primary w-5 h-5" /> Data Wali / Orang Tua
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap Orang Tua / Wali *</label>
                  <input
                    type="text"
                    {...register("nama_ortu")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    placeholder="Contoh: Ahmad Sulaiman"
                  />
                  {errors.nama_ortu && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.nama_ortu.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp Aktif *</label>
                  <input
                    type="text"
                    {...register("no_wa")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition"
                    placeholder="Contoh: 081234567890"
                  />
                  {errors.no_wa && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.no_wa.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PILIHAN PROGRAM */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-dark border-b pb-2 flex items-center gap-2">
                <GraduationCap className="text-primary w-5 h-5" /> Program Pilihan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jenjang Pendidikan *</label>
                  <select
                    {...register("program_pilihan")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white transition"
                  >
                    <option value="Salafiyah Wustho (SMP)">Salafiyah Wustho (SMP)</option>
                    <option value="Salafiyah Ulya (SMA)">Salafiyah Ulya (SMA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipe Pendidikan *</label>
                  <select
                    {...register("tipe_asrama")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white transition"
                  >
                    <option value="Boarding">Boarding (Berasrama)</option>
                    <option value="Full Day">Full Day (Pulang Pergi)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: UPLOAD BERKAS */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-dark border-b pb-2 flex items-center gap-2">
                <UploadCloud className="text-primary w-5 h-5" /> Unggah Berkas Persyaratan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "berkas_foto", label: "Pas Foto Berwarna (3x4)" },
                  { id: "berkas_akte", label: "Akte Kelahiran" },
                  { id: "berkas_kk", label: "Kartu Keluarga (KK)" },
                  { id: "berkas_sehat", label: "Surat Keterangan Sehat" },
                  { id: "berkas_nisn", label: "Surat Keterangan / Bukti NISN" },
                  { id: "berkas_raport", label: "Scan Raport Kelas 6 SD (Halaman Depan & Nilai)" },
                  { id: "bukti_transfer", label: "Bukti Transfer Biaya Pendaftaran" },
                ].map((fileField) => {
                  const savedPath = formValues[fileField.id as keyof RegistrationFormValues];
                  const isUploading = uploadingField === fileField.id;
                  return (
                    <div key={fileField.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col gap-2 relative">
                      <span className="text-sm font-bold text-dark">{fileField.label} *</span>
                      <div className="flex items-center gap-4 mt-2">
                        {isUploading ? (
                          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" /> Mengunggah...
                          </div>
                        ) : savedPath ? (
                          <div className="flex items-center gap-2 text-sm text-primary font-bold">
                            <CheckCircle className="w-5 h-5" /> Selesai Diunggah
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleFileUpload(e, fileField.id as keyof RegistrationFormValues)}
                            className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-primary hover:file:bg-green-100 cursor-pointer"
                          />
                        )}
                      </div>
                      {errors[fileField.id as keyof RegistrationFormValues] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[fileField.id as keyof RegistrationFormValues]?.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                Sebelumnya
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-primary hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-md shadow-green-100"
              >
                Berikutnya
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-green-700 text-white px-10 py-3.5 rounded-xl font-bold transition shadow-md shadow-green-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                  </>
                ) : (
                  "Kirim Pendaftaran"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
