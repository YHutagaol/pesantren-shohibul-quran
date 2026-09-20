import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const photoId = parseInt(id);

    try {
      await prisma.gallery.delete({
        where: { id: photoId },
      });
    } catch (dbError) {
      console.warn("DB offline, deleting photo from fallback database file.");
      const db = readFallbackDb();
      db.gallery = db.gallery.filter((p) => p.id !== photoId);
      writeFallbackDb(db);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete photo" }, { status: 500 });
  }
}
