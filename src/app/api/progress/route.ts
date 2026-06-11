import { NextRequest } from "next/server";
import { getAllProgress, updateProgress } from "@/lib/db";

export async function GET() {
  return Response.json(getAllProgress());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { courseId, status, percentage, notes } = body;
  if (!courseId || !status) {
    return Response.json({ error: "courseId and status required" }, { status: 400 });
  }
  updateProgress(courseId, status, percentage ?? 0, notes);
  return Response.json({ success: true });
}
