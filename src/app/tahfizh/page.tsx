"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface TahfizhProgram {
  id: number;
  title: string;
  description: string;
  icon: string | null;
}

export default function TahfizhPage() {
  const [programs, setPrograms] = useState<TahfizhProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <BookOpen className="w-[20rem] h-[20rem] absolute -bottom-10 -right-10 transform -rotate-12" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-widest uppercase mb-4 inline-block">
            Program Qur'ani
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Metode & Kegiatan Tahfizh</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Metode terstruktur yang dirancang untuk membantu para santri menghafalkan Al-Qur'an secara mutqin, cepat, dan beradab.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Memuat program tahfizh...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-50 text-primary text-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <i className={`fa-solid ${prog.icon || "fa-book-open"}`}></i>
                  </div>
                  <h3 className="font-bold text-dark text-xl mb-4">{prog.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{prog.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
