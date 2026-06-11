import { NextResponse } from "next/server";
import type { NovelBook, NovelIndex, NovelSeries } from "@/lib/types";
import indexData from "@/../data/novels/index.json";
import sampleData from "@/../data/novels/sample-story.json";

const index = indexData as NovelIndex;
const books: Record<string, NovelBook> = {
  "sample-story": sampleData as NovelBook,
};

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const series: NovelSeries | undefined = index.series.find((s) => s.slug === slug);
  if (!series) {
    return NextResponse.json({ error: "Series not found" }, { status: 404 });
  }
  const book = books[slug];
  if (!book) {
    return NextResponse.json({ error: "Book data not found" }, { status: 404 });
  }

  const chapterSummaries = book.chapters.map((c) => ({
    id: c.id,
    number: c.number,
    title_en: c.title_en,
    title_es: c.title_es,
    volume: c.volume,
    reading_time_min: c.reading_time_min,
    paragraphs: c.paragraphs.length,
    source: c.source,
  }));

  return NextResponse.json({
    series,
    disclaimer: book.disclaimer,
    chapters: chapterSummaries,
    total_chapters: book.chapters.length,
  });
}
