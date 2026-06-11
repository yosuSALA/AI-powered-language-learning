import { NextResponse } from "next/server";
import type { NovelBook, NovelIndex, NovelChapter } from "@/lib/types";
import indexData from "@/../data/novels/index.json";
import sampleData from "@/../data/novels/sample-story.json";

const index = indexData as NovelIndex;
const books: Record<string, NovelBook> = {
  "sample-story": sampleData as NovelBook,
};

type Params = { params: Promise<{ slug: string; chapter: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug, chapter } = await params;
  const book = books[slug];
  if (!book) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }
  const ch: NovelChapter | undefined = book.chapters.find((c) => c.id === chapter);
  if (!ch) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  const series = index.series.find((s) => s.slug === slug);
  const idx = book.chapters.findIndex((c) => c.id === chapter);
  const previous = idx > 0 ? book.chapters[idx - 1] : null;
  const next = idx < book.chapters.length - 1 ? book.chapters[idx + 1] : null;

  return NextResponse.json({
    series: series
      ? { slug: series.slug, title_en: series.title_en, title_es: series.title_es }
      : null,
    disclaimer: book.disclaimer,
    chapter: ch,
    navigation: {
      previous: previous
        ? { id: previous.id, number: previous.number, title_en: previous.title_en, title_es: previous.title_es }
        : null,
      next: next
        ? { id: next.id, number: next.number, title_en: next.title_en, title_es: next.title_es }
        : null,
    },
  });
}
