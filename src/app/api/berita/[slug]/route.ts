import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      const db = readFallbackDb();
      const fallback = db.articles.find((a) => a.slug === slug);
      if (fallback) return NextResponse.json(fallback);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    const { slug } = await params;
    const db = readFallbackDb();
    const fallback = db.articles.find((a) => a.slug === slug);
    if (fallback) return NextResponse.json(fallback);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    try {
      await prisma.article.delete({
        where: { slug },
      });
    } catch (dbError) {
      console.warn("DB offline, deleting article from fallback database file.");
      const db = readFallbackDb();
      db.articles = db.articles.filter((a) => a.slug !== slug);
      writeFallbackDb(db);
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete article" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { title, category, excerpt, content, thumbnail } = body;

    let updated;
    try {
      updated = await prisma.article.update({
        where: { slug },
        data: {
          title,
          category,
          excerpt,
          content,
          thumbnail,
        },
      });
    } catch (dbError) {
      console.warn("DB offline, updating article in fallback database file.");
      const db = readFallbackDb();
      db.articles = db.articles.map((a) => {
        if (a.slug === slug) {
          return {
            ...a,
            title,
            category,
            excerpt,
            content,
            thumbnail,
            updatedAt: new Date().toISOString(),
          };
        }
        return a;
      });
      writeFallbackDb(db);
      updated = db.articles.find((a) => a.slug === slug);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update article" }, { status: 500 });
  }
}
