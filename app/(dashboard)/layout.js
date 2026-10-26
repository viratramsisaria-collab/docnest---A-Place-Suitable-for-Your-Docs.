import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import Sidebar from "@/components/layout/Sidebar";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();

  const token = cookieStore.get("patra_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  await connectDB();

  const user = await User.findById(decoded.userId)
    .select("name email avatar")
    .lean();

  if (!user) {
    redirect("/login");
  }

  const serializedUser = {
    id: user._id.toString(),
    name: user.name || "User",
    email: user.email || "",
    avatar: user.avatar || "",
  };

  return (
    <div className="min-h-screen bg-[#F5F9FF]">
      <Sidebar user={serializedUser} />

      <main className="min-h-screen pl-64">
        {children}
      </main>
    </div>
  );
}