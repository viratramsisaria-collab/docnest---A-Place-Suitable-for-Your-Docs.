import { notFound } from "next/navigation";

import DocumentViewer from "@/components/documents/DocumentViewer";
import { connectDB } from "@/lib/db";
import Document from "@/models/Document";

export default async function DocumentPage({ params }) {
  const { id } = await params;

  await connectDB();

  const document = await Document.findById(id).lean();

  if (!document) {
    notFound();
  }

  const serializedDocument = {
    _id: document._id.toString(),
    userId: document.userId?.toString() || null,
    owner: document.owner?.toString() || null,
    name: document.name || "",
    originalName: document.originalName || "",
    category: document.category || "Other",
    fileUrl: document.fileUrl || "",
    fileType: document.fileType || "",
    fileSize: Number(document.fileSize || 0),
    createdAt: document.createdAt?.toISOString() || null,
    updatedAt: document.updatedAt?.toISOString() || null,
  };

  return (
    <div className="p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <DocumentViewer document={serializedDocument} />
      </div>
    </div>
  );
}