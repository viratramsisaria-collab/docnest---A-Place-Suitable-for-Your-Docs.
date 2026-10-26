import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    const user = requireAuth(request);

    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const avatar = formData.get("avatar")?.toString().trim();

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      {
        name,
        avatar: avatar || "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR:", error);

    if (
      error.message === "Authentication required" ||
      error.message === "Invalid or expired token"
    ) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Unable to update profile" },
      { status: 500 }
    );
  }
}