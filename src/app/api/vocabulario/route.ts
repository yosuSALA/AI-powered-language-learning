import { NextRequest } from "next/server";
import { updateTermProgress, getVocabularyProgress } from "@/lib/db";

export async function GET() {
  const progress = getVocabularyProgress();
  return Response.json(progress);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { termEn, courseId, known } = body;

  if (!termEn || !courseId) {
    return Response.json({ error: "termEn and courseId are required" }, { status: 400 });
  }

  updateTermProgress(termEn, courseId, known);
  return Response.json({ success: true });
}
