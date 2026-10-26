import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Document from "@/models/Document";

export const runtime = "nodejs";

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export async function GET(request) {
  try {
    const user = requireAuth(request);
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const query = {
      owner: user.userId,
    };

    if (search) {
      query.$text = { $search: search };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("GET_DOCUMENTS_ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Unable to fetch documents" },
      { status: error.message === "Authentication required" ? 401 : 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = requireAuth(request);
    const formData = await request.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const category = formData.get("category") || "Other";
45
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "A document file is required" },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, JPG and PNG files are supported" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Maximum file size is 10MB" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Document name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const extension = path.extname(file.name);
    const filename = `${randomUUID()}${extension}`;

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "documents"
    );

    await mkdir(uploadDirectory, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(
      path.join(uploadDirectory, filename),
      buffer
    );

    const document = await Document.create({
      owner: user.userId,
      name,
      originalName: file.name,
      category,
      fileUrl: `/uploads/documents/${filename}`,
      fileType: file.type,
      fileSize: file.size,
    });

    return NextResponse.json(
      {
        message: "Document uploaded successfully",
        document,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("UPLOAD_ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Unable to upload document" },
      { status: 500 }
    );
  }
}