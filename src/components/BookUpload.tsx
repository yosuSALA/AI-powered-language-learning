"use client";

import { useState, useRef } from "react";
import { BOOK_CATEGORIES } from "@/lib/types";
import type { Book } from "@/lib/types";

export function BookUpload({ onUploaded }: { onUploaded: (book: Book) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) selectFile(file);
  }

  function selectFile(file: File) {
    setSelectedFile(file);
    setError("");
    if (!title) setTitle(file.name.replace(/\.[^.]+$/, "").replace(/_/g, " "));
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const res = await fetch("/api/books", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al subir");
      }
      const book = await res.json();
      onUploaded(book);
      setSelectedFile(null);
      setTitle("");
      setAuthor("");
      setDescription("");
      setCategory("general");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        Subir libro
        <span className="text-muted/40 text-sm font-normal">/ Upload book</span>
      </h2>

      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`dropzone rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragActive ? "active" : ""
        } ${selectedFile ? "border-accent-green" : ""}`}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.epub,.txt,.md"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) selectFile(file);
          }}
        />
        {selectedFile ? (
          <div>
            <svg className="w-10 h-10 text-accent-green mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-foreground font-medium">{selectedFile.name}</p>
            <p className="text-sm text-muted mt-1">{formatSize(selectedFile.size)}</p>
            <p className="text-xs text-accent/50 mt-2">Click para cambiar</p>
          </div>
        ) : (
          <div>
            <svg className="w-12 h-12 text-muted/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-muted">
              Arrastra un archivo aqui o haz click
            </p>
            <p className="text-xs text-muted/50 mt-1">
              PDF, EPUB, TXT, MD — max 100MB
            </p>
          </div>
        )}
      </div>

      {/* Metadata form */}
      {selectedFile && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs text-muted mb-1 block">
              Titulo <span className="text-muted/40">/ Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="Titulo del libro..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted mb-1 block">
                Autor <span className="text-muted/40">/ Author</span>
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors"
                placeholder="Nombre del autor..."
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">
                Categoria <span className="text-muted/40">/ Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors"
              >
                {BOOK_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-card">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted mb-1 block">
              Descripcion <span className="text-muted/40">/ Description</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors resize-none"
              placeholder="De que trata el libro..."
            />
          </div>

          {error && (
            <p className="text-sm text-accent-red bg-accent-red/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-3 bg-gradient-to-r from-accent to-accent-purple text-background font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Subiendo..." : "Subir libro / Upload book"}
          </button>
        </div>
      )}
    </div>
  );
}
