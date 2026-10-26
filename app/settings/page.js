import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

export default async function SettingsPage() {
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
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your PATRA account and preferences.
          </p>
        </div>

        <div className="space-y-6">

          {/* Account */}
          <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Account
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>

            <div className="p-6">

              {/* Avatar */}
              <div className="mb-7 flex items-center gap-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={name}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-50"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#155EEF] text-xl font-black text-white ring-4 ring-blue-50">
                    {initial}
                  </div>
                )}

                <div>
                  <p className="font-semibold text-[#0B1F3A]">
                    Profile picture
                  </p>

                  <p className="text-sm text-slate-400">
                    Add an image URL below.
                  </p>
                </div>
              </div>

              <form
                action="/api/profile"
                method="POST"
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                    Full name
                  </label>

                  <input
                    name="name"
                    defaultValue={user.name || ""}
                    placeholder="Your name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                    Email address
                  </label>

                  <input
                    value={user.email || ""}
                    disabled
                    className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                    Avatar URL
                  </label>

                  <input
                    name="avatar"
                    defaultValue={user.avatar || ""}
                    placeholder="https://example.com/avatar.jpg"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-[#155EEF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0F4FCC]"
                >
                  Save changes
                </button>
              </form>
            </div>
          </section>

          {/* Security */}
          <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep your account secure.
              </p>
            </div>

            <div className="p-6">
              <form
                action="/api/profile/password"
                method="POST"
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                    Current password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                    New password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    required
                    minLength={6}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
                    Confirm new password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={6}
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl border border-[#155EEF] px-5 py-3 text-sm font-bold text-[#155EEF] transition hover:bg-blue-50"
                >
                  Change password
                </button>
              </form>
            </div>
          </section>

          {/* Preferences */}
          <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Preferences
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customize your PATRA experience.
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 p-6">
              <div>
                <p className="font-semibold text-[#0B1F3A]">
                  Appearance
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Choose how PATRA looks.
                </p>
              </div>

              <select
                defaultValue="light"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#0B1F3A] outline-none focus:border-[#155EEF]"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}