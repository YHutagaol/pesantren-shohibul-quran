"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Username atau password salah!");
      } else {
        router.push("/admin/ppdb");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block bg-white p-3 rounded-full shadow-md mb-4 hover:scale-105 transition-transform duration-300">
          <img
            src="/logo.png"
            alt="Logo MSQ"
            className="w-16 h-16 object-contain rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/60x60/15803d/ffffff?text=MSQ";
            }}
          />
        </Link>
        <h2 className="text-3xl font-extrabold text-dark">CMS Admin MSQ</h2>
        <p className="mt-2 text-sm text-gray-500">Silakan masuk untuk mengelola portal pesantren</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-2 text-sm border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition text-sm"
                  placeholder="admin"
                />
                <User className="absolute left-3.5 top-3.5 text-gray-400 w-4.5 h-4.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="mt-2 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary transition text-sm"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3.5 top-3.5 text-gray-400 w-4.5 h-4.5" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg shadow-green-100 flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6 text-center">
            <Link href="/" className="text-sm font-medium text-primary hover:underline">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
