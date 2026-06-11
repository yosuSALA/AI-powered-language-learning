"use client";

import { useState, useEffect } from "react";
import type { Course } from "@/lib/types";
import Link from "next/link";
import coursesData from "../../../data/courses.json";

type TermEntry = {
  en: string;
  es: string;
  definition: string;
  definitionEn: string;
  courseId: string;
  courseName: string;
  source: "vocab" | "flashcard";
};

export default function VocabularioPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unknown" | "known">("all");

  useEffect(() => {
    async function fetchData() {
      const progressRes = await fetch("/api/vocabulario");
      const progressData = await progressRes.json();
      
      const progMap: Record<string, boolean> = {};
      progressData.forEach((p: any) => {
        progMap[p.term_en] = !!p.known;
      });
      setProgress(progMap);
      setLoading(false);
    }
    fetchData();
  }, []);

  const allCourses = coursesData as Course[];
  const courseMap = new Map(allCourses.map((c) => [c.id, c.nameEs]));
  const allTerms: TermEntry[] = [];

  for (const course of allCourses) {
    for (const term of course.vocabulary) {
      allTerms.push({
        en: term.en,
        es: term.es,
        definition: term.definition,
        definitionEn: term.definitionEn ?? "",
        courseId: course.id,
        courseName: course.nameEs,
        source: "vocab" as const,
      });
    }
  }

  const seen = new Set<string>();
  const uniqueTerms = allTerms.filter((t) => {
    const key = `${t.en}|${t.courseId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const filteredTerms = uniqueTerms.filter(t => {
    if (filter === "known") return progress[t.en];
    if (filter === "unknown") return !progress[t.en];
    return true;
  });

  const grouped = new Map<string, TermEntry[]>();
  for (const term of filteredTerms) {
    const existing = grouped.get(term.courseName) ?? [];
    existing.push(term);
    grouped.set(term.courseName, existing);
  }

  async function toggleKnown(termEn: string, courseId: string) {
    const newKnown = !progress[termEn];
    setProgress(prev => ({ ...prev, [termEn]: newKnown }));
    
    await fetch("/api/vocabulario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ termEn, courseId, known: newKnown }),
    });
  }

  const stats = {
    total: uniqueTerms.length,
    known: Object.values(progress).filter(Boolean).length,
    unknown: uniqueTerms.length - Object.values(progress).filter(Boolean).length
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8 animate-fade-in flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-green to-accent bg-clip-text text-transparent">
            Vocabulario
          </h1>
          <p className="text-muted mt-2 text-lg">
            Terminos clave en ingles y espanol
            <span className="text-accent/40 ml-2">/ Key terms</span>
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link 
            href="/vocabulario/flashcards"
            className="px-4 py-2 bg-accent text-background font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-accent/20"
          >
            Estudiar Flashcards
          </Link>
        </div>
      </div>

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in animate-delay-1">
        <div className="glass p-4 rounded-2xl">
          <p className="text-xs text-muted mb-1 uppercase tracking-wider">Progreso Total</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">{Math.round((stats.known / (stats.total || 1)) * 100)}%</span>
            <span className="text-sm text-muted mb-1">{stats.known}/{stats.total} palabras</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500" 
              style={{ width: `${(stats.known / (stats.total || 1)) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="md:col-span-3 flex items-center gap-2 self-end">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "all" ? "bg-white/10 text-foreground" : "text-muted hover:bg-white/5"}`}
          >
            Todos ({stats.total})
          </button>
          <button 
            onClick={() => setFilter("unknown")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "unknown" ? "bg-accent/20 text-accent" : "text-muted hover:bg-white/5"}`}
          >
            Por aprender ({stats.unknown})
          </button>
          <button 
            onClick={() => setFilter("known")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "known" ? "bg-accent-green/20 text-accent-green" : "text-muted hover:bg-white/5"}`}
          >
            Dominados ({stats.known})
          </button>
        </div>
      </div>

      {filteredTerms.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center animate-fade-in animate-delay-2">
          <p className="text-muted text-lg">No hay terminos que coincidan con el filtro.</p>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in animate-delay-2">
          {Array.from(grouped.entries()).map(([courseName, terms]) => (
            <div key={courseName}>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                {courseName}
                <span className="text-xs text-muted/40 font-normal">
                  {terms.length} terminos
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {terms.map((term, i) => (
                  <div
                    key={`${term.en}-${i}`}
                    onClick={() => toggleKnown(term.en, term.courseId)}
                    className={`glass rounded-xl p-4 cursor-pointer transition-all border-l-4 ${
                      progress[term.en] ? "border-accent-green opacity-60" : "border-transparent hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-accent font-bold text-lg">
                          {term.en}
                        </span>
                        <span className="text-muted/30">→</span>
                        <span className="text-foreground text-lg">{term.es}</span>
                      </div>
                      {progress[term.en] && (
                        <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-muted/70 leading-relaxed">{term.definition}</p>
                    {term.definitionEn && (
                      <p className="text-sm text-accent/30 mt-1 leading-relaxed italic">
                        {term.definitionEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
