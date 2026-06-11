import { NextRequest, NextResponse } from "next/server";
import { addBook, getAllBooks, deleteBook } from "@/lib/db";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function GET() {
  const books = getAllBooks();
  return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || "Untitled";
  const author = (formData.get("author") as string) || "";
  const description = (formData.get("description") as string) || "";
  const category = (formData.get("category") as string) || "other";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = path.join(uploadsDir, `${timestamp}-${safeName}`);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const book = addBook(
    title, author, description, filePath, file.name,
    file.type || "application/octet-stream", file.size, category
  );

  return NextResponse.json(book, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  deleteBook(id);
  return NextResponse.json({ success: true });
}
