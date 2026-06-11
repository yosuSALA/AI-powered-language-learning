"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Chapter = {
  id: string;
  number: number;
  title_en: string;
  title_es: string;
  volume: number;
  paragraphs: { id: string; en: string; es: string }[];
  vocabulario_destacado: { word: string; translation: string; pos: string }[];
};

type ChapterResponse = {
  series: { slug: string; title_en: string; title_es: string } | null;
  disclaimer: string;
  chapter: Chapter;
  navigation: {
    previous: { id: string; number: number; title_en: string; title_es: string } | null;
    next: { id: string; number: number; title_en: string; title_es: string } | null;
  };
};

export default function ChapterPage() {
  const params = useParams<{ slug: string; chapter: string }>();
  const slug = params?.slug ?? "";
  const chapterId = params?.chapter ?? "";

  const [data, setData] = useState<ChapterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, { ok: boolean; status: "saving" | "saved" | "exists" }>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/novels/${slug}/${chapterId}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as ChapterResponse;
      })
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, chapterId]);

  const totalParagraphs = data?.chapter.paragraphs.length ?? 0;

  async function saveWord(word: string, translation: string, example: string) {
    const key = `${word}::${chapterId}`;
    setSavedWords((m) => ({ ...m, [key]: { ok: true, status: "saving" } }));
    try {
      const r = await fetch(`/api/novels/${slug}/vocab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, translation, example }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const body = (await r.json()) as { action: "created" | "updated" };
      setSavedWords((m) => ({ ...m, [key]: { ok: true, status: body.action === "created" ? "saved" : "exists" } }));
      setToast(body.action === "created" ? `Guardado en vocabulario: ${word}` : `Actualizado: ${word}`);
      window.setTimeout(() => setToast(null), 2200);
    } catch (err) {
      setSavedWords((m) => ({ ...m, [key]: { ok: false, status: "exists" } }));
      setToast(`Error guardando ${word}`);
      window.setTimeout(() => setToast(null), 2500);
    }
  }

  function WordToken({ word, lang }: { word: string; lang: "en" | "es" }) {
    if (lang !== "en") return <span>{word}</span>;
    const clean = word.replace(/[^A-Za-z'-]/g, "");
    if (!clean) return <span>{word}</span>;
    const isLong = clean.length >= 7;
    return (
      <button
        type="button"
        onClick={() => {
          const example = `From ${data?.chapter.title_en ?? "this chapter"}: ${word}`;
          saveWord(clean.toLowerCase(), "(traduccion pendiente)", example);
        }}
        className={`hover:underline decoration-dotted underline-offset-4 cursor-pointer transition-colors ${
          isLong ? "text-accent-purple" : "text-foreground"
        }`}
        title="Click para guardar esta palabra en vocabulario"
      >
        {word}
      </button>
    );
  }

  function Paragraph({ en, es }: { en: string; es: string }) {
    const enTokens = useMemo(() => en.split(/(\s+)/), [en]);
    const esTokens = useMemo(() => es.split(/(\s+)/), [es]);
    return (
      <article className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-3">
        <p className="leading-relaxed text-foreground/90">
          {enTokens.map((tok, i) =>
            /\s+/.test(tok) ? (
              <span key={i}>{tok}</span>
            ) : (
              <WordToken key={i} word={tok} lang="en" />
            ),
          )}
        </p>
        <p className="text-sm leading-relaxed text-muted/85 border-t border-white/5 pt-3">
          {esTokens.map((tok, i) =>
            /\s+/.test(tok) ? (
              <span key={i}>{tok}</span>
            ) : (
              <span key={i}>{tok}</span>
            ),
          )}
        </p>
      </article>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl">
        <p className="text-muted">Cargando capitulo...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl space-y-3">
        <Link href="/novelas" className="text-sm text-muted hover:text-foreground">
          ← Novelas
        </Link>
        <p className="text-accent-red">No se pudo cargar el capitulo: {error}</p>
      </div>
    );
  }

  const { chapter, navigation, disclaimer, series } = data;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link href={`/novelas/${slug}`} className="text-sm text-muted hover:text-foreground">
          ← {series?.title_en ?? slug}
        </Link>
        <p className="text-xs uppercase tracking-[0.28em] text-accent-purple/80 font-bold mt-4">
          Volumen {chapter.volume} · Capitulo {chapter.number} · {totalParagraphs} parrafos
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">{chapter.title_en}</h1>
        <p className="text-lg text-muted mt-1">{chapter.title_es}</p>
        <p className="text-xs text-muted/60 italic mt-3">{disclaimer}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <Info label="Tip" value="Click en cualquier palabra en ingles para guardarla en tu vocabulario." />
        <Info label="Parrafo a parrafo" value="Primero ingles, luego espanol. Repite mentalmente la frase." />
      </div>

      <section className="space-y-4">
        {chapter.paragraphs.map((p) => (
          <Paragraph key={p.id} en={p.en} es={p.es} />
        ))}
      </section>

      {chapter.vocabulario_destacado.length > 0 && (
        <section className="glass rounded-2xl p-5 border-l-4 border-accent-purple/60">
          <h2 className="text-lg font-bold mb-3">Vocabulario destacado del capitulo</h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {chapter.vocabulario_destacado.map((v) => (
              <button
                key={v.word}
                type="button"
                onClick={() => saveWord(v.word, v.translation, v.pos)}
                className="rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors p-3 text-left"
              >
                <p className="font-bold text-foreground">
                  {v.word}
                  <span className="ml-2 text-[10px] font-mono text-muted/60">{v.pos}</span>
                </p>
                <p className="text-muted/85 text-sm">{v.translation}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <nav className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
        {navigation.previous ? (
          <Link
            href={`/novelas/${slug}/${navigation.previous.id}`}
            className="rounded-xl bg-white/[0.04] hover:bg-white/[0.07] p-3 flex-1"
          >
            <p className="text-xs text-muted/60">Anterior</p>
            <p className="font-semibold">{navigation.previous.title_en}</p>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {navigation.next ? (
          <Link
            href={`/novelas/${slug}/${navigation.next.id}`}
            className="rounded-xl bg-accent-purple/10 hover:bg-accent-purple/20 text-right p-3 flex-1"
          >
            <p className="text-xs text-muted/60">Siguiente</p>
            <p className="font-semibold">{navigation.next.title_en}</p>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-accent-green/15 text-accent-green border border-accent-green/30 px-4 py-3 text-sm shadow-lg">
          {toast}
        </div>
      )}

      {Object.keys(savedWords).length > 0 && (
        <div className="text-xs text-muted/50">
          {Object.entries(savedWords).filter(([, v]) => v.ok).length} palabra(s) guardadas en esta sesion.
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
      <p className="text-xs uppercase tracking-wider text-muted/60 font-bold">{label}</p>
      <p className="text-sm text-foreground/85 mt-1">{value}</p>
    </div>
  );
}
