import Link from "next/link";
import { Plus } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Stats from "@/components/dashboard/Stats";
import RecentDocuments from "@/components/dashboard/RecentDocuments";

import {connectDB} from "@/lib/db";
import Document from "@/models/Document";
import User from "@/models/User";

export default async function DashboardPage() {
  await connectDB();

  // TODO: Replace this with the authenticated user from JWT.
  // For the moment this keeps the dashboard renderable.
  const documents = await Document.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const serializedDocuments = documents.map((document) => ({
  _id: document._id.toString(),
  owner: document.owner?.toString() || null,
  userId: document.userId?.toString() || null,

  name: document.name || "",
  originalName: document.originalName || "",
  category: document.category || "Other",

  fileUrl: document.fileUrl || "",
  fileType: document.fileType || "",
  fileSize: Number(document.fileSize || 0),

  createdAt: document.createdAt
    ? document.createdAt.toISOString()
    : null,

  updatedAt: document.updatedAt
    ? document.updatedAt.toISOString()
    : null,
}));

  return (
    <div className="min-h-screen bg-[#F5F9FF]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium text-[#155EEF]">
                  Your workspace
                </p>

                <h1 className="mt-1 text-3xl font-black tracking-tight text-[#0B1F3A]">
                  Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                  Everything important, organized in one place.
                </p>
              </div>

              <Link
                href="/documents/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B3B91]"
              >
                <Plus size={17} />
                Upload document
              </Link>
            </div>

            <Stats documents={serializedDocuments} />

            <div className="mt-6">
              <RecentDocuments documents={serializedDocuments} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}