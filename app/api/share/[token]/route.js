import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Share from "@/models/Share";

export async function GET(request, { params }) {
  try {
    const { token } = await params;

    await connectDB();

    const share = await Share.findOne({
      token,
      expiresAt: { $gt: new Date() },
    }).populate(
      "document",
      "name originalName category fileUrl fileType fileSize"
    );

    if (!share || !share.document) {
      return NextResponse.json(
        { error: "Share link is invalid or expired" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      document: share.document,
      expiresAt: share.expiresAt,
    });
  } catch (error) {
    console.error("SHARE_ACCESS_ERROR:", error);

    return NextResponse.json(
      { error: "Unable to access shared document" },
      { status: 500 }
    );
  }
}