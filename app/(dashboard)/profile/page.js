import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function ProfilePage() {
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

  const user = await User.findById(decoded.userId).lean();

  if (!user) {
    redirect("/login");
  }

  const name = user.name || "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F5F9FF] p-5 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-sm font-bold text-[#155EEF] hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <p className="mt-5 text-sm font-medium text-[#155EEF]">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-black tracking-tight text-[#0B1F3A]">
            Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your PATRA account details.
          </p>
        </div>

        {/* Profile card */}
        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          {/* Profile header */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex items-center gap-5">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={name}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-blue-50"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#155EEF] text-2xl font-black text-white ring-4 ring-blue-50">
                  {initial}
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  {name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account information */}
          <div className="p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Account information
            </h3>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-medium text-slate-400">
                  Full name
                </p>

                <p className="mt-2 font-semibold text-[#0B1F3A]">
                  {name}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-medium text-slate-400">
                  Email address
                </p>

                <p className="mt-2 break-all font-semibold text-[#0B1F3A]">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-medium text-slate-400">
                  Account created
                </p>

                <p className="mt-2 font-semibold text-[#0B1F3A]">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-medium text-slate-400">
                  Account status
                </p>

                <p className="mt-2 font-semibold text-green-600">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}