import { ENGLISH_FLASHCARDS } from "@/lib/english-flashcards";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

type CoachPayload = {
  cardId?: string;
  answer?: string;
};

type CoachResult = {
  corrected: string;
  explanationEs: string;
  score: number;
  nextAnswer: string;
  source: "opencode-go" | "fallback";
};

export async function POST(request: Request) {
  const body = (await request.json()) as CoachPayload;
  const card = ENGLISH_FLASHCARDS.find((item) => item.id === body.cardId);
  const answer = String(body.answer ?? "").trim().slice(0, 800);

  if (!card || !answer) {
    return Response.json({ error: "cardId and answer required" }, { status: 400 });
  }

  const fallback = buildFallback(answer, card.idealAnswer);

  try {
    const prompt = `Eres tutor de ingles para un estudiante hispanohablante. Corrige una respuesta corta.\n\nTema: ${card.deck}\nPalabra/frase: ${card.front} = ${card.meaningEs}\nPregunta: ${card.prompt}\nRespuesta ideal: ${card.idealAnswer}\nRespuesta del estudiante: ${answer}\n\nResponde SOLO JSON valido, sin markdown:\n{"corrected":"frase corregida natural en ingles","explanationEs":"explicacion breve en espanol de 1-2 lineas","score":75,"nextAnswer":"una mejor respuesta en ingles, corta"}`;

    const promptB64 = Buffer.from(prompt, "utf8").toString("base64");
    const apiKey = process.env.OPENCODE_API_KEY || "";
    
    if (!apiKey) {
      return Response.json(fallback);
    }

    const { stdout } = await execFileAsync(
      "/usr/bin/bash",
      [
        "-lc",
        "PROMPT=$(printf '%s' \"$OPENCODE_PROMPT_B64\" | base64 -d); exec opencode run --format json \"$PROMPT\" </dev/null",
      ],
      {
        timeout: 55_000,
        maxBuffer: 512_000,
        env: {
          ...process.env,
          OPENCODE_PROMPT_B64: promptB64,
          OPENCODE_API_KEY: apiKey,
        },
      }
    );

    const text = extractText(stdout);
    const parsed = parseCoachJson(text);
    if (parsed) {
      return Response.json({ ...parsed, source: "opencode-go" satisfies CoachResult["source"] });
    }
  } catch (error) {
    console.error("english-coach opencode failed", error);
  }

  return Response.json(fallback);
}

function extractText(stdout: string): string {
  const chunks: string[] = [];
  for (const line of stdout.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line) as { type?: string; part?: { text?: string } };
      if (event.type === "text" && event.part?.text) chunks.push(event.part.text);
    } catch {
      chunks.push(line);
    }
  }
  return chunks.join("\n");
}

function parseCoachJson(text: string): Omit<CoachResult, "source"> | null {
  const clean = text.replace(/```json|```/g, "").trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[0]) as Partial<Omit<CoachResult, "source">>;
    if (!data.corrected || !data.explanationEs || typeof data.score !== "number" || !data.nextAnswer) {
      return null;
    }
    return {
      corrected: String(data.corrected).slice(0, 500),
      explanationEs: String(data.explanationEs).slice(0, 600),
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
    explanationEs: "Fallback local: revisa mayuscula inicial, puntuacion final y que la frase tenga verbo claro. Compara con la respuesta ideal.",
    score: Math.min(score, 85),
    nextAnswer: idealAnswer,
    source: "fallback",
  };
}
