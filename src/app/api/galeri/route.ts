import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function GET(req: NextRequest) {
  try {
    const photos = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (photos.length === 0) {
      const db = readFallbackDb();
      return NextResponse.json(db.gallery);
    }
    return NextResponse.json(photos);
  } catch (error) {
    console.warn("DB not reached in GET /api/galeri, using fallback data file.");
    const db = readFallbackDb();
    // Sort descending by id or date if present
    const sorted = [...db.gallery].reverse();
    return NextResponse.json(sorted);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl, caption } = body;

    let newPhoto;
    try {
      newPhoto = await prisma.gallery.create({
        data: {
          imageUrl,
          caption,
        },
      });
    } catch (dbError) {
      console.warn("DB offline, saving mock photo to fallback file.");
      newPhoto = {
        id: Date.now(),
        imageUrl,
        caption,
        createdAt: new Date().toISOString(),
      };
      const db = readFallbackDb();
      db.gallery.push(newPhoto);
      writeFallbackDb(db);
    }

    return NextResponse.json(newPhoto);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add photo" }, { status: 500 });
  }
}
