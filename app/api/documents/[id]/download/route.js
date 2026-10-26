import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Document";
import { requireAuth } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const user = await requireAuth(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const document = await Document.findOne({
      _id: id,
      owner: user.userId,
    }).lean();

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const fileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${document.fileUrl}`
    );

    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: "Unable to access file" },
        { status: 404 }
      );
    }

    const blob = await fileResponse.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": document.fileType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${document.originalName}"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);

    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}