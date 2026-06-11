"use client";

import Link from "next/link";
import { useLocale } from "@/lib/useLocale";

const english = {
  level: "A2-B1",
  cadence: "15-30 min diarios",
  modules: [
    { title: "Listening + Speaking", focus: "Videos cortos, shadowing, frases de trabajo", output: "5 flashcards", duration: "15 min" },
    { title: "Reading", focus: "READMEs, docs, errores reales, novelas ligeras", output: "Resumen + 8 palabras", duration: "20 min" },
    { title: "Writing + AI Coach", focus: "Escribe respuestas cortas, el coach las corrige", output: "5 oraciones corregidas", duration: "10 min" },
  ],
};

const weeklyPlan = [
  { day: "Mon", task: "Listening tecnico + 5 frases de trabajo", output: "5 flashcards" },
  { day: "Tue", task: "Pronunciacion + shadowing de video corto", output: "Repetir 10 frases" },
  { day: "Wed", task: "Reading: articulo/docs/error real", output: "Resumen + 8 palabras" },
  { day: "Thu", task: "Grammar minima: tiempos utiles", output: "10 oraciones propias" },
  { day: "Fri", task: "Vocabulary review + flashcards", output: "Quiz rapido" },
  { day: "Sat", task: "Ligero: serie/video con subtitulos EN", output: "Sin presion" },
  { day: "Sun", task: "Revision semanal", output: "Lista de palabras pendientes" },
];

const phrasePatterns = [
  ["I need to...", "Necesito...", "I need to debug this function."],
  ["This error means...", "Este error significa...", "This error means the file path is wrong."],
  ["The goal is to...", "El objetivo es...", "The goal is to build a small API."],
  ["I don't understand why...", "No entiendo por que...", "I don't understand why the test fails."],
  ["Can you explain...", "Puedes explicar...", "Can you explain this concept with examples?"],
];

export default function EnglishPage() {
  const { t } = useLocale();

  return (
    <div className="max-w-5xl space-y-8">
      <div className="animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-green/70 font-bold">
          {t["settings.learning"]}
        </p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-green to-accent bg-clip-text text-transparent mt-2">
          {t["english.title"]}
        </h1>
        <p className="text-muted mt-2 text-lg max-w-3xl">
          {t["english.subtitle"]}
        </p>
      </div>

      <section className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="glass rounded-3xl p-6 border-l-4 border-accent-green">
          <h2 className="text-xl font-bold">{t["english.goal"]}</h2>
          <p className="text-muted mt-3 leading-relaxed">{t["english.goal"]}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <Info label={t["english.level"]} value={english.level} />
            <Info label={t["english.cadence"]} value={english.cadence} />
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/ingles/flashcards" className="rounded-xl px-4 py-2 bg-accent-green/10 text-accent-green text-sm font-semibold hover:bg-accent-green/15">
              {t["english.title"]}
            </Link>
            <Link href="/vocabulario" className="rounded-xl px-4 py-2 bg-white/[0.04] text-muted text-sm font-semibold hover:bg-white/[0.07]">
              {t["vocab.title"]}
            </Link>
            <Link href="/vocabulario/flashcards" className="rounded-xl px-4 py-2 bg-white/[0.04] text-muted text-sm font-semibold hover:bg-white/[0.07]">
              Flashcards
            </Link>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h2 className="text-xl font-bold">{t["english.modules"]}</h2>
          <div className="space-y-3 mt-4">
            <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
              <p className="text-sm font-semibold text-foreground">{t["english.modules"]}</p>
              <p className="text-xs text-muted mt-1">{t["english.subtitle"]}</p>
            </div>
            <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
              <p className="text-sm font-semibold text-foreground">{t["english.level"]}</p>
              <p className="text-xs text-muted mt-1">{t["english.cadence"]}</p>
            </div>
            <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
              <p className="text-sm font-semibold text-foreground">{t["english.goal"]}</p>
              <p className="text-xs text-muted mt-1">{t["english.subtitle"]}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">{t["english.modules"]}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {english.modules.map((module, i) => (
            <div key={module.title} className="glass rounded-2xl p-5 border border-white/5">
              <span className="text-xs text-accent-green font-mono">Modulo {i + 1}</span>
              <h3 className="font-bold mt-2">{module.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{module.focus}</p>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-muted/70 space-y-1">
                <p>Output: {module.output}</p>
                <p>Duracion: {module.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{t["english.weeklyPlan"]}</h2>
        <div className="grid md:grid-cols-7 gap-2">
          {weeklyPlan.map((item) => (
            <div key={item.day} className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
              <p className="font-bold text-accent-green">{item.day}</p>
              <p className="text-xs text-foreground/80 mt-2 leading-relaxed">{item.task}</p>
              <p className="text-[11px] text-muted mt-2">{item.output}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-6 border-l-4 border-accent">
        <h2 className="text-xl font-bold mb-4">{t["english.phrases"]}</h2>
        <div className="overflow-hidden rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-muted">
              <tr>
                <th className="text-left p-3">Pattern</th>
                <th className="text-left p-3">Significado</th>
                <th className="text-left p-3">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              {phrasePatterns.map(([pattern, meaning, example]) => (
                <tr key={pattern} className="border-t border-white/5">
                  <td className="p-3 font-mono text-accent-green">{pattern}</td>
                  <td className="p-3 text-muted">{meaning}</td>
                  <td className="p-3 text-foreground/80">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.025] p-4 border border-white/5">
      <p className="text-xs uppercase tracking-wider text-muted/60 font-bold">{label}</p>
      <p className="text-sm text-foreground mt-2 leading-relaxed">{value}</p>
    </div>
  );
}
