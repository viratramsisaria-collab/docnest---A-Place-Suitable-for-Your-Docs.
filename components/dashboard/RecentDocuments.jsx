"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/utils";

export default function RecentDocuments({
  documents = [],
}) {
  const recent = documents.slice(0, 5);

  return (
    <div className="rounded-2xl border border-blue-100 bg-white">
      <div className="flex items-center justify-between border-b border-blue-50 p-5">
        <div>
          <h2 className="font-bold text-[#0B1F3A]">
            Recent documents
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest uploads
          </p>
        </div>

        <Link
          href="/documents"
          className="flex items-center gap-1 text-sm font-semibold text-[#155EEF]"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="p-10 text-center">
          <FileText
            className="mx-auto text-blue-200"
            size={36}
          />

          <p className="mt-3 font-semibold text-[#0B1F3A]">
            No documents yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Upload your first document to get started.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-blue-50">
          {recent.map((document) => (
            <Link
              key={document._id}
              href={`/documents/${document._id}`}
              className="flex items-center gap-4 p-5 transition hover:bg-blue-50/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#155EEF]">
                <FileText size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#0B1F3A]">
                  {document.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {document.category} ·{" "}
                  {formatFileSize(document.fileSize)}
                </p>
              </div>

              <span className="hidden text-xs text-slate-400 sm:block">
                {formatDate(document.createdAt)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}