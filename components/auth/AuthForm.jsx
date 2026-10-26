"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const isRegister = mode === "register";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const endpoint = isRegister
        ? "/api/auth/register"
        : "/api/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-[#0B1F3A]"
        >
          patra<span className="text-[#155EEF]">.</span>
        </Link>

        <h1 className="mt-10 text-3xl font-black tracking-tight text-[#0B1F3A]">
          {isRegister
            ? "Create your document wallet."
            : "Welcome back."}
        </h1>

        <p className="mt-2 text-slate-500">
          {isRegister
            ? "Keep your important documents organized in one place."
            : "Access your documents from one secure place."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {isRegister && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
              Full name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Your name"
              required
              className="h-12 w-full rounded-xl border border-blue-100 bg-white px-4 outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder="you@example.com"
            required
            className="h-12 w-full rounded-xl border border-blue-100 bg-white px-4 outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={updateField}
            placeholder="••••••••"
            required
            minLength={6}
            className="h-12 w-full rounded-xl border border-blue-100 bg-white px-4 outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#155EEF] font-semibold text-white transition hover:bg-[#0B3B91] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Please wait...
            </>
          ) : (
            <>
              {isRegister ? "Create account" : "Log in"}
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#155EEF]"
            >
              Log in
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#155EEF]"
            >
              Create one
            </Link>
          </>
        )}
      </p>
    </div>
  );
}