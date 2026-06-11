export type CourseStatus = "not-started" | "in-progress" | "completed" | "skipped";

export interface VocabularyTerm {
  en: string;
  es: string;
  definition: string;
  definitionEn?: string;
}

export interface Course {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  url: string;
  vocabulary: VocabularyTerm[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  filePath: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  category: string;
  uploadedAt: string;
}

export const BOOK_CATEGORIES = [
  { id: "language", label: "Libros de idiomas" },
  { id: "novels", label: "Novelas" },
  { id: "reference", label: "Referencia" },
  { id: "textbook", label: "Libro de texto" },
  { id: "fiction", label: "Ficcion" },
  { id: "non-fiction", label: "No ficcion" },
  { id: "comics", label: "Comics / Manga" },
  { id: "technical", label: "Tecnico" },
  { id: "self-help", label: "Desarrollo personal" },
  { id: "other", label: "Otro" },
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number]["id"];

// Novel types
export interface NovelSeries {
  slug: string;
  title_en: string;
  title_es: string;
  author: string;
  description_es: string;
  genre: string[];
  study_level: string;
  chapters: number;
  volumes: number;
  language_primary: string;
  language_secondary: string;
}

export interface NovelVocabItem {
  word: string;
  translation: string;
  pos: string;
}

export interface NovelParagraph {
  id: string;
  en: string;
  es: string;
}

export interface NovelChapter {
  id: string;
  number: number;
  title_en: string;
  title_es: string;
  volume: number;
  reading_time_min: number;
  paragraphs: NovelParagraph[];
  vocabulario_destacado: NovelVocabItem[];
  source: string;
}

export interface NovelIndex {
  disclaimer_es: string;
  disclaimer_en: string;
  series: NovelSeries[];
}

export interface NovelBook {
  slug: string;
  disclaimer: string;
  chapters: NovelChapter[];
}
