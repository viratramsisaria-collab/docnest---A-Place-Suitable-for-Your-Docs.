"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  FolderOpen,
  Share2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F9FF] text-[#0B1F3A]">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight"
        >
          doc<span className="text-[#155EEF]">nest</span>.
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
          <a href="#features" className="hover:text-[#155EEF]">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-[#155EEF]">
            How it works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden px-4 py-2 text-sm font-bold sm:block"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#155EEF] px-5 py-2.5 text-sm font-bold text-white"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-6 pb-24 pt-20 text-center"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-[#155EEF] shadow-sm"
        >
          <ShieldCheck className="h-4 w-4" />
          Simple. Organized. Secure.
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-7 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
        >
          Your documents.
          <br />
          <span className="text-[#155EEF]">
            One secure place.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-500"
        >
          Upload, organize, view and share your important
          documents from one simple workspace.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex justify-center gap-3"
        >
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-xl bg-[#155EEF] px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5"
          >
            Create your DocNest
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-blue-100 bg-white px-6 py-3.5 font-bold"
          >
            Sign in
          </Link>
        </motion.div>

        {/* App Preview */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-16 max-w-4xl rounded-3xl border border-blue-100 bg-white p-3 shadow-2xl shadow-blue-100/60"
        >
          <div className="rounded-2xl bg-[#F5F9FF] p-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#155EEF]">
                  Your workspace
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Documents
                </h2>
              </div>

              <div className="rounded-xl bg-[#155EEF] px-4 py-2.5 text-sm font-bold text-white">
                + Upload
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <PreviewCard
                icon={FolderOpen}
                title="Government"
                count="4 documents"
              />

              <PreviewCard
                icon={FileText}
                title="Education"
                count="3 documents"
              />

              <PreviewCard
                icon={Share2}
                title="Finance"
                count="5 documents"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-blue-100 bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-wider text-[#155EEF]"
            >
              Everything you need
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-black sm:text-4xl"
            >
              A better home for your documents.
            </motion.h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Feature
                icon={FolderOpen}
                title="Stay organized"
                text="Keep important documents grouped into simple categories."
              />

              <Feature
                icon={ShieldCheck}
                title="Keep them secure"
                text="Your documents stay inside your personal DocNest workspace."
              />

              <Feature
                icon={Share2}
                title="Share when needed"
                text="Create temporary share links whenever you need them."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-black">
            doc<span className="text-[#155EEF]">nest</span>.
          </span>

          <span className="text-sm text-slate-400">
            Your documents. One secure place.
          </span>
        </div>
      </footer>
    </main>
  );
}

function PreviewCard({ icon: Icon, title, count }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-blue-100 bg-white p-5"
    >
      <Icon className="h-6 w-6 text-[#155EEF]" />

      <p className="mt-4 font-bold">{title}</p>

      <p className="mt-1 text-sm text-slate-400">
        {count}
      </p>
    </motion.div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-blue-100 bg-[#F5F9FF] p-7"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#155EEF]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-6 text-xl font-black">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-slate-500">
        {text}
      </p>
    </motion.div>
  );
}