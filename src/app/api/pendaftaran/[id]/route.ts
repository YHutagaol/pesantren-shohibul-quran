import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const candId = parseInt(id);
    const body = await req.json();
    const { status_daftar } = body;

    let updated;
    try {
      updated = await prisma.calonSantri.update({
        where: { id: candId },
        data: {
          status_daftar,
        },
      });
    } catch (dbError) {
      console.warn("DB offline, updating candidate in fallback database file.");
      const db = readFallbackDb();
      db.candidates = db.candidates.map((c) => {
        if (c.id === candId) {
          return {
            ...c,
            status_daftar,
          };
        }
        return c;
      });
      writeFallbackDb(db);
      updated = db.candidates.find((c) => c.id === candId);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update registration status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const candId = parseInt(id);

    try {
      await prisma.calonSantri.delete({
        where: { id: candId },
      });
    } catch (dbError) {
      console.warn("DB offline, deleting candidate from fallback database file.");
      const db = readFallbackDb();
      db.candidates = db.candidates.filter((c) => c.id !== candId);
      writeFallbackDb(db);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete candidate record" }, { status: 500 });
  }
}
