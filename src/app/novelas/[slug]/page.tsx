import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";
import type { NovelIndex, NovelBook } from "@/lib/types";
import indexData from "@/../data/novels/index.json";
import sampleData from "@/../data/novels/sample-story.json";

const index = indexData as NovelIndex;
const books: Record<string, NovelBook> = {
  "sample-story": sampleData as NovelBook,
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const series = index.series.find((s) => s.slug === slug);
  if (!series) {
    return createPageMetadata({ title: "Serie no encontrada", description: "Serie de novelas no encontrada", path: `/novelas/${slug}` });
  }
  return createPageMetadata({
    title: `${series.title_en} — lectura bilingue`,
    description: series.description_es,
    path: `/novelas/${series.slug}`,
    keywords: [series.title_en, series.title_es, "bilingual reader", "light novel"],
  });
}

export const dynamic = "force-static";

export default async function NovelaDetail({ params }: Params) {
  const { slug } = await params;
  const series = index.series.find((s) => s.slug === slug);
  if (!series) notFound();
  const book = books[slug];
  if (!book) notFound();

  const grouped = book.chapters.reduce<Record<number, typeof book.chapters>>((acc, ch) => {
    acc[ch.volume] = acc[ch.volume] ?? [];
    acc[ch.volume].push(ch);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl space-y-8">
      <header className="animate-fade-in">
        <Link href="/novelas" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Todas las novelas
        </Link>
        <p className="text-xs uppercase tracking-[0.28em] text-accent-purple/80 font-bold mt-6">
          {series.author}
        </p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-purple to-accent bg-clip-text text-transparent mt-2">
          {series.title_en}
        </h1>
        <p className="text-lg text-muted mt-1">{series.title_es}</p>
        <p className="text-sm text-muted/80 mt-4 max-w-3xl leading-relaxed">
          {series.description_es}
        </p>
      </header>

      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Capitulos" value={String(book.chapters.length)} />
        <Stat label="Volumenes" value={String(series.volumes)} />
        <Stat label="Nivel" value={series.study_level} />
        <Stat label="Idioma" value={`${series.language_primary} / ${series.language_secondary}`} />
      </section>

      <section className="glass rounded-2xl p-6 border-l-4 border-accent-yellow/60">
        <p className="text-xs text-muted/70 italic">{book.disclaimer}</p>
      </section>

      <section className="space-y-6">
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([volume, chapters]) => (
            <div key={volume} className="space-y-3">
              <h2 className="text-lg font-bold text-accent-purple/80">Volumen {volume}</h2>
              <div className="space-y-2">
                {chapters.map((ch) => (
                  <Link
                    key={ch.id}
                    href={`/novelas/${slug}/${ch.id}`}
                    className="glass glass-hover rounded-xl p-4 flex items-center justify-between gap-4 group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted/70 font-mono">
                        <span>Cap {ch.number}</span>
                        <span>·</span>
                        <span>{ch.reading_time_min} min</span>
                        <span>·</span>
                        <span>{ch.paragraphs.length} parrafos</span>
                      </div>
                      <h3 className="font-semibold mt-1 group-hover:text-accent transition-colors">
                        {ch.title_en}
                      </h3>
                      <p className="text-sm text-muted/80">{ch.title_es}</p>
                    </div>
                    <span className="rounded-lg bg-accent-purple/10 text-accent-purple text-[11px] font-bold px-2 py-1 shrink-0">
                      {ch.source}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/5">
      <p className="text-xs uppercase tracking-wider text-muted/60 font-bold">{label}</p>
      <p className="text-lg font-bold mt-2 text-foreground">{value}</p>
    </div>
  );
}
