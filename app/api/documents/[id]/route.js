import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Document from "@/models/Document";

export async function GET(request, { params }) {
  try {
    const user = requireAuth(request);
    await connectDB();

    const document = await Document.findOne({
      _id: params.id,
      owner: user.userId,
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ document });
  } catch (error) {
    console.error("GET_DOCUMENT_ERROR:", error);

    return NextResponse.json(
      { error: "Unable to fetch document" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = requireAuth(request);
    const body = await request.json();

    await connectDB();

    const document = await Document.findOneAndUpdate(
      {
        _id: params.id,
        owner: user.userId,
      },
      {
        ...(body.name && { name: body.name }),
        ...(body.category && { category: body.category }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("UPDATE_DOCUMENT_ERROR:", error);

    return NextResponse.json(
      { error: "Unable to update document" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = requireAuth(request);

    await connectDB();

    const document = await Document.findOne({
      _id: params.id,
      owner: user.userId,
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      document.fileUrl
    );

    try {
      await unlink(filePath);
    } catch {
      // File may already be missing.
    }

    await Document.deleteOne({
      _id: document._id,
    });

    return NextResponse.json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_DOCUMENT_ERROR:", error);

    return NextResponse.json(
      { error: "Unable to delete document" },
      { status: 500 }
    );
  }
}