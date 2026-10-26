"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  Share2,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate, formatFileSize } from "@/lib/utils";

export default function DocumentViewer({ document }) {
  const router = useRouter();

  const isImage = document.fileType?.startsWith("image/");
  const isPdf = document.fileType === "application/pdf";

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this document permanently?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/documents/${document._id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.push("/documents");
      router.refresh();
    }
  }

  async function handleShare() {
    const response = await fetch("/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentId: document._id,
        expiresIn: 24,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Unable to create share link");
      return;
    }

    const url = `${window.location.origin}/share/${data.token}`;

    await navigator.clipboard.writeText(url);

    alert("Share link copied!");
  }

  return (
    <div>
      <Link
        href="/documents"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#155EEF]"
      >
        <ArrowLeft size={16} />
        Back to documents
      </Link>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white">
          {isImage && (
            <div className="flex min-h-[600px] items-center justify-center bg-slate-50 p-6">
              <img
                src={document.fileUrl}
                alt={document.name}
                className="max-h-[750px] max-w-full rounded-xl object-contain shadow-lg"
              />
            </div>
          )}

          {isPdf && (
            <iframe
              src={document.fileUrl}
              title={document.name}
              className="h-[750px] w-full"
            />
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-blue-100 bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
            <FileText size={21} />
          </div>

          <h1 className="mt-5 break-words text-xl font-black text-[#0B1F3A]">
            {document.name}
          </h1>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Category
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                {document.category}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                File size
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                {formatFileSize(document.fileSize)}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Uploaded
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                {formatDate(document.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <a
              href={`/api/documents/${document._id}/download`}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#155EEF] font-semibold text-white transition hover:bg-[#0B3B91]"
            >
              <Download size={17} />
              Download
            </a>

            <button
              onClick={handleShare}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-100 font-semibold text-[#0B1F3A] transition hover:bg-blue-50"
            >
              <Share2 size={17} />
              Share
            </button>

            <button
              onClick={handleDelete}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={17} />
              Delete document
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}