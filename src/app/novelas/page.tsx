"use client";

import Link from "next/link";
import type { NovelIndex } from "@/lib/types";
import indexData from "@/../data/novels/index.json";
import { useLocale } from "@/lib/useLocale";

const index = indexData as NovelIndex;

export default function NovelasPage() {
  const { t } = useLocale();

  return (
    <div className="max-w-6xl space-y-10">
      <header className="animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-purple/80 font-bold">
          Bilingual reading
        </p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-purple to-accent bg-clip-text text-transparent mt-2">
          {t["novels.title"]}
        </h1>
        <p className="text-muted mt-2 text-lg max-w-3xl">
          {t["novels.subtitle"]}
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
        <h2 className="text-lg font-bold mb-2">{t["novels.howToUse"]}</h2>
        <ol className="text-sm text-muted space-y-2 list-decimal pl-5">
          <li>{t["novels.step1"]}</li>
          <li>{t["novels.step2"]}</li>
          <li>{t["novels.step3"]}</li>
          <li>{t["novels.step4"]}</li>
        </ol>
      </section>
    </div>
  );
}
