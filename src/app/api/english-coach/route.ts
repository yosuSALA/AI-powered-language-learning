import { ENGLISH_FLASHCARDS } from "@/lib/english-flashcards";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CoachPayload = {
  cardId?: string;
  answer?: string;
};

type CoachResult = {
  corrected: string;
  explanation: string;
  score: number;
  nextAnswer: string;
  source: "ai" | "fallback";
};

async function loadConfig() {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "data", "config.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as CoachPayload;
  const card = ENGLISH_FLASHCARDS.find((item) => item.id === body.cardId);
  const answer = String(body.answer ?? "").trim().slice(0, 800);

  if (!card || !answer) {
    return Response.json({ error: "cardId and answer required" }, { status: 400 });
  }

  const fallback = buildFallback(answer, card.idealAnswer);

  const config = await loadConfig();
  const apiKey = config?.ai?.apiKey;
  const apiEndpoint = config?.ai?.apiEndpoint;
  const model = config?.ai?.model || "gpt-4o-mini";
  const maxTokens = config?.ai?.maxTokens || 500;
  const temperature = config?.ai?.temperature ?? 0.3;

  if (!apiKey || !apiEndpoint) {
    return Response.json(fallback);
  }

  const srcLang = config?.languages?.sourceName || "English";
  const tgtLang = config?.languages?.targetName || "Espanol";

  const prompt = `You are a ${srcLang} language tutor for a ${tgtLang}-speaking student. Correct a short answer.

Topic: ${card.deck}
Word/Phrase: ${card.front} = ${card.meaningEs}
Question: ${card.prompt}
Ideal answer: ${card.idealAnswer}
Student answer: ${answer}

Rules:
- Correct grammar, spelling, and naturalness
- Be encouraging but honest about mistakes
- Keep explanations in ${tgtLang}
- Score from 0-100 based on: grammar, vocabulary, naturalness

Respond ONLY with valid JSON (no markdown, no code blocks):
{"corrected":"corrected natural ${srcLang} sentence","explanation":"brief explanation in ${tgtLang} (1-2 lines)","score":75,"nextAnswer":"a better ${srcLang} answer, short"}`;

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("AI coach API error:", response.status, errText.slice(0, 200));
      return Response.json(fallback);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "";
    const parsed = parseCoachJson(text);

    if (parsed) {
      return Response.json({ ...parsed, source: "ai" as const });
    }
  } catch (error) {
    console.error("AI coach fetch failed:", error);
  }

  return Response.json(fallback);
}

function parseCoachJson(text: string): Omit<CoachResult, "source"> | null {
  const clean = text.replace(/```json|```/g, "").trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[0]) as Partial<Omit<CoachResult, "source">>;
    if (!data.corrected || !data.explanation || typeof data.score !== "number" || !data.nextAnswer) {
      return null;
    }
    return {
      corrected: String(data.corrected).slice(0, 500),
      explanation: String(data.explanation).slice(0, 600),
      score: Math.max(0, Math.min(100, Math.round(data.score))),
      nextAnswer: String(data.nextAnswer).slice(0, 500),
    };
  } catch {
    return null;
  }
}

function buildFallback(answer: string, idealAnswer: string): CoachResult {
  const trimmed = answer.trim();
  const startsUpper = /^[A-Z]/.test(trimmed);
  const endsPunctuation = /[.!?]$/.test(trimmed);
  const hasVerb = /\b(am|is|are|was|were|have|has|need|want|can|should|buy|study|train|debug|deploy|store|fix|like)\b/i.test(trimmed);
  const score = 45 + (startsUpper ? 15 : 0) + (endsPunctuation ? 15 : 0) + (hasVerb ? 20 : 0);
  const corrected = `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}${endsPunctuation ? "" : "."}`;
  return {
    corrected,
    explanation: "Fallback local: revisa mayuscula inicial, puntuacion final y que la frase tenga verbo claro. Configura una API de IA en /settings para correcciones inteligentes.",
    score: Math.min(score, 85),
    nextAnswer: idealAnswer,
    source: "fallback",
  };
}
