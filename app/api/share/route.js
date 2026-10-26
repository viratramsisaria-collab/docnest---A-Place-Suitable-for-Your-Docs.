import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import Document from "@/models/Document";
import Share from "@/models/Share";

export async function POST(request) {
  try {
    const user = requireAuth(request);
    const { documentId, expiresIn = 24 } = await request.json();

    await connectDB();

    const document = await Document.findOne({
      _id: documentId,
      owner: user.userId,
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const expiresAt = new Date(
      Date.now() + Number(expiresIn) * 60 * 60 * 1000
    );

    const share = await Share.create({
      document: document._id,
      owner: user.userId,
      token: nanoid(32),
      expiresAt,
    });

    return NextResponse.json({
      message: "Share link created",
      token: share.token,
      expiresAt: share.expiresAt,
    });
  } catch (error) {
    console.error("CREATE_SHARE_ERROR:", error);

    return NextResponse.json(
      { error: "Unable to create share link" },
      { status: 500 }
    );
  }
}