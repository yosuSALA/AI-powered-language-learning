import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VOCAB_PATH = path.join(process.cwd(), "data", "flashcards_vocabulario.json");

interface Flashcard {
  word: string;
  translation: string;
  definition: string;
  example: string;
  course: string;
  added: string;
  last_reviewed: string | null;
  review_count: number;
}

async function readVocab(): Promise<Flashcard[]> {
  try {
    const raw = await fs.readFile(VOCAB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Flashcard[]) : [];
  } catch {
    return [];
  }
}

async function writeVocab(list: Flashcard[]): Promise<void> {
  await fs.writeFile(VOCAB_PATH, JSON.stringify(list, null, 2), "utf-8");
}

type Params = { params: Promise<{ slug: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    word?: string;
    translation?: string;
    example?: string;
  };

  const word = (body.word ?? "").trim();
  const translation = (body.translation ?? "").trim();
  const example = (body.example ?? "").trim();

  if (!word || !translation) {
    return NextResponse.json({ error: "word and translation are required" }, { status: 400 });
  }

  const list = await readVocab();
  const existing = list.find((c) => c.word.toLowerCase() === word.toLowerCase());
  const today = new Date().toISOString().slice(0, 10);

  if (existing) {
    existing.translation = translation || existing.translation;
    if (example) existing.example = example;
    existing.last_reviewed = today;
    existing.review_count = (existing.review_count ?? 0) + 1;
    await writeVocab(list);
    return NextResponse.json({ ok: true, action: "updated", card: existing });
  }

  const card: Flashcard = {
    word,
    translation,
    definition: `Capturado durante la lectura de ${slug}.`,
    example: example || `(sin ejemplo guardado en esta captura)`,
    course: "novels",
    added: today,
    last_reviewed: today,
    review_count: 1,
  };
  list.push(card);
  await writeVocab(list);
  return NextResponse.json({ ok: true, action: "created", card }, { status: 201 });
}
