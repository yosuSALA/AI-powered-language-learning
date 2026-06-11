import Link from "next/link";
import { EnglishFlashcardTrainer } from "@/components/EnglishFlashcardTrainer";
import { ENGLISH_FLASHCARDS } from "@/lib/english-flashcards";

export const dynamic = "force-dynamic";

export default function EnglishFlashcardsPage() {
  return (
    <div className="max-w-6xl space-y-8">
      <div className="animate-fade-in">
        <Link href="/ingles" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Volver a Ingles
        </Link>
        <p className="text-xs uppercase tracking-[0.28em] text-accent-green/70 font-bold mt-6">
          English flashcard trainer
        </p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-green to-accent bg-clip-text text-transparent mt-2">
          Flashcards de ingles para hoy
        </h1>
        <p className="text-muted mt-2 text-lg max-w-3xl">
          Practica vocabulario real con temas que te importan: anime, CS, AWS, gym y mas.
          Escribe respuestas cortas en ingles y el coach las corrige con AI cuando este disponible.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <Metric label="Cartas" value={String(ENGLISH_FLASHCARDS.length)} />
        <Metric label="Tiempo" value="10-15 min" />
        <Metric label="Meta" value="5 respuestas" />
        <Metric label="Nivel" value="A2-B1" />
      </div>

      <EnglishFlashcardTrainer />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/5">
      <p className="text-xs uppercase tracking-wider text-muted/60 font-bold">{label}</p>
      <p className="text-xl font-bold mt-2 text-foreground">{value}</p>
    </div>
  );
}
