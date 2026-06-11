import { NextResponse } from "next/server";
import type { NovelIndex, NovelBook, NovelChapter } from "@/lib/types";
import indexData from "@/../data/novels/index.json";
import sampleData from "@/../data/novels/sample-story.json";

const index = indexData as NovelIndex;
const books: Record<string, NovelBook> = {
  "sample-story": sampleData as NovelBook,
};

export async function GET() {
  return NextResponse.json(index);
}

export function _getNovelBook(slug: string): NovelBook | null {
  return books[slug] ?? null;
}

export function _getNovelChapter(slug: string, chapterId: string): NovelChapter | null {
  const book = books[slug];
  if (!book) return null;
  return book.chapters.find((c) => c.id === chapterId) ?? null;
}
