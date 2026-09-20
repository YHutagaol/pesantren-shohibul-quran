import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function GET(req: NextRequest) {
  try {
    const programs = await prisma.tahfizhProgram.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (programs.length === 0) {
      const db = readFallbackDb();
      return NextResponse.json(db.tahfizh);
    }
    return NextResponse.json(programs);
  } catch (error) {
    console.warn("DB not reached in GET /api/tahfizh, using fallback data.");
    const db = readFallbackDb();
    return NextResponse.json(db.tahfizh);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, icon } = body;

    let newProgram;
    try {
      newProgram = await prisma.tahfizhProgram.create({
        data: {
          title,
          description,
          icon: icon || "fa-book-open",
        },
      });
    } catch (dbError) {
      console.warn("DB offline, saving mock program to fallback file.");
      newProgram = {
        id: Date.now(),
        title,
        description,
        icon: icon || "fa-book-open",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const db = readFallbackDb();
      db.tahfizh.push(newProgram);
      writeFallbackDb(db);
    }

    return NextResponse.json(newProgram);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create program" }, { status: 500 });
  }
}
