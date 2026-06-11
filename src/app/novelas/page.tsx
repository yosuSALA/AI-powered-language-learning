import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import type { NovelIndex } from "@/lib/types";
import indexData from "@/../data/novels/index.json";

const index = indexData as NovelIndex;

export const metadata = createPageMetadata({
  title: "Novelas ligeras para aprender ingles",
  description:
    "Visualizador bilingue (EN/ES) de novelas ligeras. Material de estudio para practicar vocabulario tecnico y narrativo.",
  path: "/novelas",
  keywords: [
    "novelas ligeras",
    "bilingual reader",
    "light novel study",
    "aprender ingles leyendo",
  ],
});

export const dynamic = "force-static";

export default function NovelasPage() {
  return (
    <div className="max-w-6xl space-y-10">
      <header className="animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-purple/80 font-bold">
          Bilingual reading
        </p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-purple to-accent bg-clip-text text-transparent mt-2">
          Novelas ligeras
        </h1>
        <p className="text-muted mt-2 text-lg max-w-3xl">
          Lee historias en ingles con acompanamiento en espanol, parrafo a parrafo. Cada capitulo
          incluye vocabulario destacado y la opcion de guardar palabras con un clic para repasarlas
          despues.
        </p>
      </header>

      <section className="glass rounded-2xl p-6 border-l-4 border-accent-yellow/60">
        <h2 className="text-base font-bold text-accent-yellow/90 mb-2">Aviso legal</h2>
        <p className="text-sm text-muted leading-relaxed">
          {index.disclaimer_es}
        </p>
        <p className="text-xs text-muted/60 mt-2 italic">{index.disclaimer_en}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {index.series.map((series) => (
          <Link
            key={series.slug}
            href={`/novelas/${series.slug}`}
            className="glass glass-hover card-shine rounded-2xl p-6 group block"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-accent-purple/70 font-bold">
                  {series.author}
                </p>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-accent-purple transition-colors">
                  {series.title_en}
                </h3>
                <p className="text-sm text-muted/80 mt-1">{series.title_es}</p>
              </div>
              <span className="rounded-lg bg-accent-purple/10 text-accent-purple text-xs font-bold px-2 py-1">
                {series.study_level}
              </span>
            </div>

            <p className="text-sm text-muted/80 mt-4 leading-relaxed">
              {series.description_es}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {series.genre.map((g) => (
                <span key={g} className="rounded-md bg-white/[0.04] px-2 py-1 text-muted/80">
                  {g}
                </span>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-muted/80">
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="font-bold text-foreground text-base">{series.chapters}</p>
                <p>capitulos</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="font-bold text-foreground text-base">{series.volumes}</p>
                <p>volumenes</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="font-bold text-foreground text-base">{series.language_primary.toUpperCase()}/{series.language_secondary.toUpperCase()}</p>
                <p>idiomas</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-2">Como usar el visualizador</h2>
        <ol className="text-sm text-muted space-y-2 list-decimal pl-5">
          <li>Elige una serie y abre un capitulo.</li>
          <li>Lee el parrafo en ingles, luego la traduccion al espanol abajo.</li>
          <li>Haz clic en cualquier palabra en ingles: se guarda automaticamente en tu vocabulario.</li>
          <li>Aparece en el repaso matutino de vocabulario con prioridad alta.</li>
        </ol>
      </section>
    </div>
  );
}
