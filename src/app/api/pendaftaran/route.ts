import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nama_lengkap,
      nisn,
      tempat_lahir,
      tanggal_lahir,
      asal_sekolah,
      nama_ortu,
      no_wa,
      program_pilihan,
      tipe_asrama,
      berkas_foto,
      berkas_akte,
      berkas_kk,
      berkas_sehat,
      berkas_nisn,
      berkas_raport,
      bukti_transfer,
    } = body;

    // Generate unique registration number
    let count = 0;
    try {
      count = await prisma.calonSantri.count();
    } catch (e) {
      console.warn("DB count failed, checking fallback file.");
      const db = readFallbackDb();
      count = db.candidates.length;
    }

    const year = new Date().getFullYear();
    const nomor_daftar = `MSQ-${year}-${(count + 1).toString().padStart(4, "0")}`;

    let savedData;
    try {
      savedData = await prisma.calonSantri.create({
        data: {
          nomor_daftar,
          nama_lengkap,
          nisn,
          tempat_lahir,
          tanggal_lahir: new Date(tanggal_lahir),
          asal_sekolah,
          nama_ortu,
          no_wa,
          program_pilihan,
          tipe_asrama,
          berkas_foto,
          berkas_akte,
          berkas_kk,
          berkas_sehat,
          berkas_nisn,
          berkas_raport,
          bukti_transfer,
          status_daftar: "PENDING",
        },
      });
    } catch (dbError) {
      console.warn("DB write failed, saving mock candidate to fallback file.");
      savedData = {
        id: Date.now(),
        nomor_daftar,
        nama_lengkap,
        nisn,
        tempat_lahir,
        tanggal_lahir,
        asal_sekolah,
        nama_ortu,
        no_wa,
        program_pilihan,
        tipe_asrama,
        berkas_foto,
        berkas_akte,
        berkas_kk,
        berkas_sehat,
        berkas_nisn,
        berkas_raport,
        bukti_transfer,
        status_daftar: "PENDING",
        createdAt: new Date().toISOString(),
      };
      const db = readFallbackDb();
      db.candidates.push(savedData);
      writeFallbackDb(db);
    }

    return NextResponse.json({ success: true, data: savedData });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: error.message || "Failed to process registration" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const list = await prisma.calonSantri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.warn("DB not reached in GET /api/pendaftaran, using fallback file.");
    const db = readFallbackDb();
    const sorted = [...db.candidates].reverse();
    return NextResponse.json(sorted);
  }
}
