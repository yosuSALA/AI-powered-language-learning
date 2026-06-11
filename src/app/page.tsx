"use client";

import Link from "next/link";
import { useLocale } from "@/lib/useLocale";
import { getAllFlashcards } from "@/lib/content";

export default function HomePage() {
  const { t } = useLocale();
  const flashcards = getAllFlashcards();
  const flashcardCount = flashcards.length;

  return (
    <div className="max-w-5xl space-y-10">
      <header className="text-center space-y-4 animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-green/70 font-bold">AI-Powered</p>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-green via-accent to-accent-purple bg-clip-text text-transparent">
          {t["home.title"]}
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          {t["home.subtitle"]}
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <Link href="/ingles" className="glass rounded-2xl p-6 border-l-4 border-accent-green hover:bg-white/[0.03] transition-all">
          <p className="text-accent-green font-bold text-lg">English Coach</p>
          <p className="text-sm text-muted mt-2">{t["home.flashcards.desc"]}</p>
          <p className="text-xs text-accent-green/50 mt-3">20+ flashcards · 5 decks · AI feedback</p>
        </Link>

        <Link href="/novelas" className="glass rounded-2xl p-6 border-l-4 border-accent-purple hover:bg-white/[0.03] transition-all">
          <p className="text-accent-purple font-bold text-lg">Bilingual Reader</p>
          <p className="text-sm text-muted mt-2">{t["home.reader.desc"]}</p>
          <p className="text-xs text-accent-purple/50 mt-3">Mushoku Tensei · Re:Zero · Click-to-save words</p>
        </Link>

        <Link href="/vocabulario" className="glass rounded-2xl p-6 border-l-4 border-accent hover:bg-white/[0.03] transition-all">
          <p className="text-accent font-bold text-lg">Vocabulary</p>
          <p className="text-sm text-muted mt-2">{t["home.coach.desc"]}</p>
          <p className="text-xs text-accent/50 mt-3">{flashcardCount} words · Filters · Progress tracking</p>
        </Link>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{t["home.howItWorks"]}</h2>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🃏</span>
            </div>
            <p className="font-bold">{t["home.flashcards.title"]}</p>
            <p className="text-muted text-xs mt-1">{t["home.flashcards.desc"]}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <p className="font-bold">{t["home.reader.title"]}</p>
            <p className="text-muted text-xs mt-1">{t["home.reader.desc"]}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤖</span>
            </div>
            <p className="font-bold">{t["home.coach.title"]}</p>
            <p className="text-muted text-xs mt-1">{t["home.coach.desc"]}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📤</span>
            </div>
            <p className="font-bold">{t["home.library.title"]}</p>
            <p className="text-muted text-xs mt-1">{t["home.library.desc"]}</p>
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">{t["home.getStarted"]}</h2>
        <ol className="text-sm text-muted space-y-2 list-decimal pl-5">
          <li>{t["home.step1"]}</li>
          <li>{t["home.step2"]}</li>
          <li>{t["home.step3"]}</li>
          <li>{t["home.step4"]}</li>
          <li>{t["home.step5"]}</li>
        </ol>
      </section>
    </div>
  );
}
