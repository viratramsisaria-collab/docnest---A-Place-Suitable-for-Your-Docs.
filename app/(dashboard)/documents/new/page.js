import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import UploadForm from "@/components/documents/UploadForm";

export default function NewDocumentPage() {
  return (
    <div className="min-h-screen bg-[#F5F9FF]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/documents"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#155EEF]"
            >
              <ArrowLeft size={16} />
              Back to documents
            </Link>

            <div className="mb-8">
              <p className="text-sm font-medium text-[#155EEF]">
                Add to your wallet
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-[#0B1F3A]">
                Upload document
              </h1>

              <p className="mt-2 text-slate-500">
                Add a PDF or image to your PATRA document wallet.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
              <UploadForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}