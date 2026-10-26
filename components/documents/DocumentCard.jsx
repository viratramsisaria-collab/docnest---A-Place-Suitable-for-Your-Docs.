"use client";

import Link from "next/link";
import {
  Download,
  FileImage,
  FileText,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { formatDate, formatFileSize } from "@/lib/utils";

export default function DocumentCard({
  document,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  const isImage = document.fileType?.startsWith("image/");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this document permanently?"
    );

    if (!confirmed) return;

    await onDelete(document._id);
  }

  return (
    <div className="group relative rounded-2xl border border-blue-100 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
          {isImage ? (
            <FileImage size={21} />
          ) : (
            <FileText size={21} />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-[#0B1F3A]"
          >
            <MoreVertical size={18} />
          </button>

          {open && (
            <div className="absolute right-0 top-10 z-10 w-40 rounded-xl border border-blue-100 bg-white p-1.5 shadow-xl">
              <Link
                href={`/documents/${document._id}`}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50"
              >
                Open
              </Link>

              <a
                href={`/api/documents/${document._id}/download`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50"
              >
                <Download size={14} />
                Download
              </a>

              <button
                onClick={handleDelete}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Link href={`/documents/${document._id}`}>
        <h3 className="mt-5 truncate font-bold text-[#0B1F3A]">
          {document.name}
        </h3>

        <p className="mt-1 truncate text-xs text-slate-400">
          {document.originalName}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-[#155EEF]">
            {document.category}
          </span>

          <span className="text-xs text-slate-400">
            {formatFileSize(document.fileSize)}
          </span>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          {formatDate(document.createdAt)}
        </p>
      </Link>
    </div>
  );
}