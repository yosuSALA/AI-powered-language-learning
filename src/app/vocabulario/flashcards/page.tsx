"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import coursesData from "../../../../data/courses.json";
import type { Course } from "@/lib/types";

type Flashcard = {
  en: string;
  es: string;
  definition: string;
  courseId: string;
};

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allCourses = coursesData as Course[];
    const allTerms: Flashcard[] = [];
    for (const course of allCourses) {
      for (const term of course.vocabulary) {
        allTerms.push({
          en: term.en,
          es: term.es,
          definition: term.definition,
          courseId: course.id,
        });
      }
    }
    setCards(allTerms.sort(() => Math.random() - 0.5));
    setLoading(false);
  }, []);

  if (loading) return <div className="p-12 text-center">Cargando...</div>;
  if (cards.length === 0) return <div className="p-12 text-center">No hay flashcards disponibles.</div>;

  const currentCard = cards[currentIndex];

  function handleNext() {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/vocabulario" className="text-muted hover:text-foreground flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>
        <div className="text-sm font-mono text-muted">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      <div 
        onClick={() => setShowAnswer(!showAnswer)}
        className={`relative h-80 w-full perspective cursor-pointer transition-all duration-500 transform-gpu ${showAnswer ? "rotate-y-180" : ""}`}
      >
        {/* Front */}
        <div className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden">
          <span className="text-xs text-accent uppercase tracking-widest mb-4">Ingles / English</span>
          <h2 className="text-4xl font-bold text-foreground mb-4">{currentCard.en}</h2>
          <p className="text-sm text-muted/50 mt-4">Click para ver traduccion</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 bg-accent/[0.03]">
          <span className="text-xs text-accent-green uppercase tracking-widest mb-4">Espanol / Spanish</span>
          <h2 className="text-4xl font-bold text-foreground mb-2">{currentCard.es}</h2>
          <p className="text-lg text-muted leading-relaxed">{currentCard.definition}</p>
          <p className="text-xs text-muted/40 mt-6 italic">ID: {currentCard.courseId}</p>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button 
          onClick={handleNext}
          className="px-8 py-4 bg-white/5 hover:bg-white/10 text-foreground font-bold rounded-2xl transition-all active:scale-95 flex items-center gap-3"
        >
          Siguiente
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .perspective { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
