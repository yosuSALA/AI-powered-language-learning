import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(process.cwd(), "db");
const DB_PATH = path.join(DB_DIR, "progress.db");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initDb(_db);
  }
  return _db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      course_id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'not-started',
      percentage INTEGER DEFAULT 0,
      last_studied TEXT,
      notes TEXT DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS vocabulary_progress (
      term_en TEXT NOT NULL,
      course_id TEXT NOT NULL,
      known INTEGER DEFAULT 0,
      last_reviewed TEXT,
      PRIMARY KEY (term_en, course_id)
    );
    CREATE TABLE IF NOT EXISTS learning_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      entry TEXT NOT NULL,
      course_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT DEFAULT '',
      description TEXT DEFAULT '',
      file_path TEXT NOT NULL,
      file_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      file_size INTEGER DEFAULT 0,
      category TEXT DEFAULT 'other',
      uploaded_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      due_date TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export function getProgress(courseId: string) {
  return getDb().prepare("SELECT * FROM progress WHERE course_id = ?").get(courseId);
}

export function getAllProgress() {
  return getDb().prepare("SELECT * FROM progress").all();
}

export function updateProgress(courseId: string, status: string, percentage: number, notes?: string) {
  getDb().prepare(`
    INSERT INTO progress (course_id, status, percentage, last_studied, notes)
    VALUES (?, ?, ?, datetime('now'), ?)
    ON CONFLICT(course_id) DO UPDATE SET
      status = excluded.status,
      percentage = excluded.percentage,
      last_studied = datetime('now'),
      notes = excluded.notes
  `).run(courseId, status, percentage, notes ?? "");
}

export function addLogEntry(date: string, entry: string, courseId?: string) {
  getDb().prepare(
    "INSERT INTO learning_log (date, entry, course_id) VALUES (?, ?, ?)"
  ).run(date, entry, courseId ?? null);
}

export function getLogEntries(limit = 30) {
  return getDb().prepare(
    "SELECT * FROM learning_log ORDER BY created_at DESC LIMIT ?"
  ).all(limit);
}

export function addBook(title: string, author: string, description: string, filePath: string, fileName: string, mimeType: string, fileSize: number, category: string) {
  const result = getDb().prepare(
    "INSERT INTO books (title, author, description, file_path, file_name, mime_type, file_size, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(title, author, description, filePath, fileName, mimeType, fileSize, category);
  return { id: result.lastInsertRowid, title, author, description, filePath, fileName, mimeType, fileSize, category };
}

export function getAllBooks() {
  return getDb().prepare("SELECT * FROM books ORDER BY uploaded_at DESC").all();
}

export function getBookById(id: number) {
  return getDb().prepare("SELECT * FROM books WHERE id = ?").get(id);
}

export function deleteBook(id: number) {
  const book = getDb().prepare("SELECT * FROM books WHERE id = ?").get(id) as any;
  if (book?.file_path) {
    try { fs.unlinkSync(book.file_path); } catch {}
  }
  return getDb().prepare("DELETE FROM books WHERE id = ?").run(id);
}

export function updateTermProgress(termEn: string, courseId: string, known: boolean) {
  getDb().prepare(`
    INSERT INTO vocabulary_progress (term_en, course_id, known, last_reviewed)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(term_en, course_id) DO UPDATE SET
      known = excluded.known,
      last_reviewed = datetime('now')
  `).run(termEn, courseId, known ? 1 : 0);
}

export function getVocabularyProgress() {
  return getDb().prepare("SELECT * FROM vocabulary_progress").all();
}

export function addTask(title: string, description: string, dueDate?: string) {
  return getDb().prepare(
    "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)"
  ).run(title, description, dueDate ?? null);
}

export function getTasks() {
  return getDb().prepare("SELECT * FROM tasks ORDER BY due_date ASC").all();
}

export function updateTaskStatus(id: number, status: string) {
  getDb().prepare("UPDATE tasks SET status = ? WHERE id = ?").run(status, id);
}
