import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const progId = parseInt(id);

    try {
      await prisma.tahfizhProgram.delete({
        where: { id: progId },
      });
    } catch (dbError) {
      console.warn("DB offline, deleting program from fallback database file.");
      const db = readFallbackDb();
      db.tahfizh = db.tahfizh.filter((p) => p.id !== progId);
      writeFallbackDb(db);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete program" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const progId = parseInt(id);
    const body = await req.json();
    const { title, description, icon } = body;

    let updated;
    try {
      updated = await prisma.tahfizhProgram.update({
        where: { id: progId },
        data: {
          title,
          description,
          icon,
        },
      });
    } catch (dbError) {
      console.warn("DB offline, updating program in fallback database file.");
      const db = readFallbackDb();
      db.tahfizh = db.tahfizh.map((p) => {
        if (p.id === progId) {
          return {
            ...p,
            title,
            description,
            icon,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      writeFallbackDb(db);
      updated = db.tahfizh.find((p) => p.id === progId);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update program" }, { status: 500 });
  }
}
