"use client";

import { useMemo, useState } from "react";
import { ENGLISH_FLASHCARDS, type EnglishFlashcard } from "@/lib/english-flashcards";

type CoachResult = {
  corrected: string;
  explanationEs: string;
  score: number;
  nextAnswer: string;
  source: "opencode-go" | "fallback";
};

const deckLabels: Record<EnglishFlashcard["deck"], string> = {
  anime: "Anime",
  cs: "CS",
  gym: "Gym",
  aws: "AWS",
  reselling: "Laptops/eBay",
};

export function EnglishFlashcardTrainer() {
  const [deck, setDeck] = useState<"all" | EnglishFlashcard["deck"]>("all");
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<CoachResult | null>(null);
  const [loading, setLoading] = useState(false);

  const cards = useMemo(() => {
    const selected = deck === "all" ? ENGLISH_FLASHCARDS : ENGLISH_FLASHCARDS.filter((card) => card.deck === deck);
    return selected;
  }, [deck]);

  const current = cards[index % cards.length];

  function nextCard() {
    setIndex((prev) => (prev + 1) % cards.length);
    setShowBack(false);
    setAnswer("");
    setResult(null);
  }

  async function submitAnswer() {
    if (!answer.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/english-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: current.id, answer }),
      });
      const data = (await response.json()) as CoachResult;
      setResult(data);
    } catch {
      setResult({
        corrected: answer,
        explanationEs: "No pude conectar con el coach. Revisa tu respuesta comparandola con la respuesta ideal.",
        score: 50,
        nextAnswer: current.idealAnswer,
        source: "fallback",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <FilterButton active={deck === "all"} onClick={() => { setDeck("all"); setIndex(0); }}>
          Todo
        </FilterButton>
        {(Object.keys(deckLabels) as EnglishFlashcard["deck"][]).map((key) => (
          <FilterButton key={key} active={deck === key} onClick={() => { setDeck(key); setIndex(0); }}>
            {deckLabels[key]}
          </FilterButton>
        ))}
      </div>

      <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
        <div className="glass rounded-3xl p-6 min-h-[360px] flex flex-col justify-between border border-white/5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.24em] text-accent-green font-bold">
              {deckLabels[current.deck]} · {current.level}
            </span>
            <span className="text-xs font-mono text-muted">
              {index + 1} / {cards.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowBack((value) => !value)}
            className="my-8 text-left rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/5 p-6 transition-all"
          >
            {!showBack ? (
              <>
                <p className="text-sm text-muted mb-3">Palabra / frase</p>
                <h2 className="text-4xl font-bold text-foreground">{current.front}</h2>
                <p className="text-accent mt-5 font-mono">{current.phrase}</p>
                <p className="text-xs text-muted/70 mt-5">Click para ver significado + ejemplo ideal</p>
              </>
            ) : (
              <>
                <p className="text-sm text-muted mb-3">Significado</p>
                <h2 className="text-3xl font-bold text-accent-green">{current.meaningEs}</h2>
                <p className="text-sm text-muted mt-5">Respuesta ideal:</p>
                <p className="text-lg text-foreground mt-2 leading-relaxed">{current.idealAnswer}</p>
              </>
            )}
          </button>

          <div className="flex gap-3">
            <button onClick={nextCard} className="rounded-xl px-5 py-3 bg-white/5 hover:bg-white/10 font-semibold transition-colors">
              Siguiente
            </button>
            <button onClick={() => setShowBack((value) => !value)} className="rounded-xl px-5 py-3 bg-accent/10 text-accent hover:bg-accent/15 font-semibold transition-colors">
              Ver respuesta
            </button>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 border-l-4 border-accent">
          <p className="text-xs uppercase tracking-[0.24em] text-accent/80 font-bold">Pregunta activa</p>
          <h2 className="text-2xl font-bold mt-3">{current.prompt}</h2>
          <p className="text-sm text-muted mt-3">Hint: {current.hint}</p>

          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Escribe tu respuesta en ingles aqui..."
            className="mt-5 w-full min-h-32 rounded-2xl bg-background/70 border border-white/10 p-4 text-foreground outline-none focus:border-accent/60"
          />

          <button
            onClick={submitAnswer}
            disabled={loading || !answer.trim()}
            className="mt-4 rounded-xl px-5 py-3 bg-accent text-background font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
          >
            {loading ? "Corrigiendo con AI Coach..." : "Corregir mi ingles"}
          </button>

          {result && (
            <div className="mt-5 rounded-2xl bg-white/[0.035] border border-white/5 p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-accent-green">Correccion</h3>
                <span className="text-xs text-muted font-mono">{result.source} · {result.score}/100</span>
              </div>
              <p className="text-sm text-muted">Tu frase corregida:</p>
              <p className="text-lg text-foreground">{result.corrected}</p>
              <p className="text-sm text-muted leading-relaxed">{result.explanationEs}</p>
              <div className="pt-3 border-t border-white/5">
                <p className="text-xs text-muted">Mejor respuesta:</p>
                <p className="text-sm text-accent mt-1">{result.nextAnswer}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-accent text-background" : "bg-white/[0.04] text-muted hover:text-foreground hover:bg-white/[0.08]"
      }`}
    >
      {children}
    </button>
  );
}
