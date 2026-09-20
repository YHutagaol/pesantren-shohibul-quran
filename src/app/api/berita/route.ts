import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFallbackDb, writeFallbackDb } from "@/lib/fallbackDb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category) {
      where.category = category;
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    if (articles.length === 0) {
      const db = readFallbackDb();
      const filtered = category
        ? db.articles.filter((a) => a.category.toLowerCase() === category.toLowerCase())
        : db.articles;
      return NextResponse.json(filtered);
    }

    return NextResponse.json(articles);
  } catch (error) {
    console.warn("DB not reached in GET /api/berita, using fallback data.");
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const db = readFallbackDb();
    const filtered = category
      ? db.articles.filter((a) => a.category.toLowerCase() === category.toLowerCase())
      : db.articles;
    // Sort descending by publishedAt/id
    const sorted = [...filtered].reverse();
    return NextResponse.json(sorted);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, excerpt, content, thumbnail } = body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let newArticle;
    try {
      newArticle = await prisma.article.create({
        data: {
          title,
          slug,
          category: category || "Berita",
          excerpt,
          content,
          thumbnail,
        },
      });
    } catch (dbError) {
      console.warn("DB offline, saving mock article to fallback file.");
      newArticle = {
        id: Date.now(),
        title,
        slug,
        category: category || "Berita",
        excerpt,
        content,
        thumbnail,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const db = readFallbackDb();
      db.articles.push(newArticle);
      writeFallbackDb(db);
    }

    return NextResponse.json(newArticle);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create article" }, { status: 500 });
  }
}
