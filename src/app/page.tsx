import Link from "next/link";
import { getAllFlashcards } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const flashcards = getAllFlashcards();
  const flashcardCount = flashcards.length;

  return (
    <div className="max-w-5xl space-y-10">
      <header className="text-center space-y-4 animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-green/70 font-bold">AI-Powered</p>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-green via-accent to-accent-purple bg-clip-text text-transparent">
          Language Learning
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Aprende idiomas con flashcards inteligentes, lectura bilingue de novelas,
          vocabulario interactivo y un coach de IA que corrige tus respuestas.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <Link href="/ingles" className="glass rounded-2xl p-6 border-l-4 border-accent-green hover:bg-white/[0.03] transition-all">
          <p className="text-accent-green font-bold text-lg">English Coach</p>
          <p className="text-sm text-muted mt-2">Flashcards con IA que corrige tu ingles. Temas: anime, tech, gym, viajes.</p>
          <p className="text-xs text-accent-green/50 mt-3">20+ flashcards · 5 decks · AI feedback</p>
        </Link>

        <Link href="/novelas" className="glass rounded-2xl p-6 border-l-4 border-accent-purple hover:bg-white/[0.03] transition-all">
          <p className="text-accent-purple font-bold text-lg">Bilingual Reader</p>
          <p className="text-sm text-muted mt-2">Lee novelas ligeras parrafo a parrafo en ingles con traduccion al español.</p>
          <p className="text-xs text-accent-purple/50 mt-3">Mushoku Tensei · Re:Zero · Click-to-save words</p>
        </Link>

        <Link href="/vocabulario" className="glass rounded-2xl p-6 border-l-4 border-accent hover:bg-white/[0.03] transition-all">
          <p className="text-accent font-bold text-lg">Vocabulary</p>
          <p className="text-sm text-muted mt-2">Explora terminos organizados por tema. Marca los que ya dominas.</p>
          <p className="text-xs text-accent/50 mt-3">{flashcardCount} palabras · Filtros · Progress tracking</p>
        </Link>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Como funciona</h2>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🃏</span>
            </div>
            <p className="font-bold">Flashcards</p>
            <p className="text-muted text-xs mt-1">Practica vocabulario con tarjetas interactivas</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <p className="font-bold">Lectura</p>
            <p className="text-muted text-xs mt-1">Lee historias bilingues parrafo a parrafo</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤖</span>
            </div>
            <p className="font-bold">AI Coach</p>
            <p className="text-muted text-xs mt-1">Escribe en ingles y recibe correcciones al instante</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📤</span>
            </div>
            <p className="font-bold">Subir libros</p>
            <p className="text-muted text-xs mt-1">Sube PDFs y EPUBs para tu biblioteca personal</p>
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">Empezar</h2>
        <ol className="text-sm text-muted space-y-2 list-decimal pl-5">
          <li>Instala dependencias: <code className="bg-white/5 px-2 py-0.5 rounded">npm install</code></li>
          <li>Ejecuta el servidor: <code className="bg-white/5 px-2 py-0.5 rounded">npm run dev</code></li>
          <li>Abre <code className="bg-white/5 px-2 py-0.5 rounded">localhost:3000</code> en tu navegador</li>
          <li>Personaliza las flashcards en <code className="bg-white/5 px-2 py-0.5 rounded">data/courses.json</code> y <code className="bg-white/5 px-2 py-0.5 rounded">src/lib/english-flashcards.ts</code></li>
          <li>Opcional: Agrega novelas en <code className="bg-white/5 px-2 py-0.5 rounded">data/novels/</code></li>
        </ol>
      </section>
    </div>
  );
}
