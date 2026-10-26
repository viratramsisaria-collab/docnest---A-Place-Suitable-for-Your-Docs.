import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    const user = requireAuth(request);

    const formData = await request.formData();

    const currentPassword =
      formData.get("currentPassword")?.toString();

    const newPassword =
      formData.get("newPassword")?.toString();

    const confirmPassword =
      formData.get("confirmPassword")?.toString();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          error: "New password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          error: "New passwords do not match",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findById(user.userId);

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          error: "Current password is incorrect",
        },
        { status: 400 }
      );
    }

    existingUser.password = await bcrypt.hash(
      newPassword,
      12
    );

    await existingUser.save();

    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  } catch (error) {
    console.error("PASSWORD_UPDATE_ERROR:", error);

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
      { error: "Unable to change password" },
      { status: 500 }
    );
  }
}