"use client";

import { FileText } from "lucide-react";
import DocumentCard from "./DocumentCard";

export default function DocumentGrid({
  documents = [],
  onDelete,
}) {
  if (documents.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-blue-200 bg-white p-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#155EEF]">
          <FileText size={24} />
        </div>

        <h3 className="mt-5 font-bold text-[#0B1F3A]">
          No documents found
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Try a different search or upload a new document.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document._id}
          document={document}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}