"use client";

import { useState, useEffect } from "react";
import type { Book } from "@/lib/types";
import { BOOK_CATEGORIES } from "@/lib/types";
import { BookUpload } from "@/components/BookUpload";
import { useLocale } from "@/lib/useLocale";

export default function BibliotecaPage() {
  const { t } = useLocale();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t["library.empty"] + "?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/books?id=${id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
  }

  function getFileIcon(mimeType: string) {
    if (mimeType.includes("pdf")) return "PDF";
    if (mimeType.includes("epub")) return "EPUB";
    if (mimeType.includes("markdown") || mimeType.includes("text")) return "TXT";
    return "DOC";
  }

  function getFileColor(mimeType: string) {
    if (mimeType.includes("pdf")) return "text-accent-red bg-accent-red/10";
    if (mimeType.includes("epub")) return "text-accent-green bg-accent-green/10";
    return "text-accent bg-accent/10";
  }

  const filteredBooks =
    filter === "all" ? books : books.filter((b) => b.category === filter);

  const categoryCounts = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-5xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent">
          {t["library.title"]}
        </h1>
        <p className="text-muted mt-2 text-lg">
          {t["library.subtitle"]}
          <span className="text-accent/40 ml-2">/ Upload books & materials</span>
        </p>
        <p className="text-sm text-muted/50 mt-1">
          {books.length} libro{books.length !== 1 ? "s" : ""} en tu biblioteca
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Book list */}
        <div>
          {/* Category filters */}
          {books.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in animate-delay-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === "all"
                    ? "bg-accent/20 text-accent ring-1 ring-accent/30"
                    : "bg-white/5 text-muted hover:bg-white/10"
                }`}
              >
                {t["vocab.all"]} ({books.length})
              </button>
              {BOOK_CATEGORIES.filter((c) => categoryCounts[c.id]).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === cat.id
                      ? "bg-accent/20 text-accent ring-1 ring-accent/30"
                      : "bg-white/5 text-muted hover:bg-white/10"
                  }`}
                >
                  {cat.label} ({categoryCounts[cat.id]})
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
              <p className="text-muted mt-3">{t["common.loading"]}</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center animate-fade-in animate-delay-1">
              <svg className="w-16 h-16 text-muted/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <p className="text-muted text-lg mb-2">
                {t["library.empty"]}
              </p>
              <p className="text-sm text-accent/40">
                {t["library.upload"]}
              </p>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in animate-delay-1">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="glass glass-hover card-shine rounded-2xl p-5 group"
                >
                  <div className="flex items-start gap-4">
                    {/* File type badge */}
                    <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${getFileColor(book.mimeType)}`}>
                      {getFileIcon(book.mimeType)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {book.title}
                      </h3>
                      {book.author && (
                        <p className="text-sm text-muted/70 mt-0.5">{book.author}</p>
                      )}
                      {book.description && (
                        <p className="text-sm text-muted/50 mt-1 line-clamp-2">
                          {book.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted/40">
                        <span>{formatSize(book.fileSize)}</span>
                        <span>{formatDate(book.uploadedAt)}</span>
                        <span className="tag-pill px-2 py-0.5 rounded text-accent/50">
                          {BOOK_CATEGORIES.find((c) => c.id === book.category)?.label || book.category}
                        </span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(book.id)}
                      disabled={deleting === book.id}
                      className="shrink-0 p-2 rounded-lg text-muted/30 hover:text-accent-red hover:bg-accent-red/10 transition-all opacity-0 group-hover:opacity-100"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload sidebar */}
        <div className="animate-fade-in animate-delay-2">
          <BookUpload onUploaded={(book) => setBooks((prev) => [book, ...prev])} />

          {/* Info box */}
          <div className="glass rounded-2xl p-5 mt-4 border-l-4 border-accent-purple">
            <h3 className="text-sm font-semibold text-accent-purple mb-2">
              {t["settings.helpTitle"]}
            </h3>
            <p className="text-xs text-muted/70 leading-relaxed">
              {t["home.library.desc"]}
            </p>
            <p className="text-xs text-accent-purple/40 mt-2 leading-relaxed">
              Upload language books and ask me to generate content: summaries,
              exercises, flashcards, or explanations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
