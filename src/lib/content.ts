import exercisesData from "../../data/exercises.json";
import flashcardsData from "../../data/flashcards.json";
import vocabFlashcards from "../../data/flashcards_vocabulario.json";
import summariesData from "../../data/summaries.json";

export function getExercisesForCourse(courseId: string) {
  const exercises = exercisesData as Record<string, any[]>;
  return exercises[courseId] ?? [];
}

export function getFlashcardsForCourse(courseId: string) {
  const flashcards = flashcardsData as Record<string, any[]>;
  return flashcards[courseId] ?? [];
}

export function getAllFlashcards() {
  return vocabFlashcards as any[];
}

export function getSummaryForCourse(courseId: string) {
  const summaries = summariesData as Record<string, string>;
  return summaries[courseId] ?? null;
}

export function getDifficultyLabel(difficulty: number): string {
  const labels: Record<number, string> = { 1: "Facil", 2: "Medio", 3: "Dificil", 4: "Avanzado" };
  return labels[difficulty] ?? "Desconocido";
}

export function getDifficultyLabelEn(difficulty: number): string {
  const labels: Record<number, string> = { 1: "Easy", 2: "Medium", 3: "Hard", 4: "Advanced" };
  return labels[difficulty] ?? "Unknown";
}

export function getDifficultyColor(difficulty: number): string {
  const colors: Record<number, string> = { 1: "text-green-400", 2: "text-yellow-400", 3: "text-orange-400", 4: "text-red-400" };
  return colors[difficulty] ?? "text-gray-400";
}

export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = { practice: "✏️", quiz: "📝", challenge: "🏆", review: "📖" };
  return icons[type] ?? "📄";
}
