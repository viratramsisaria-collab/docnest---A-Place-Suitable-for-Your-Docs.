"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DocumentGrid from "@/components/documents/DocumentGrid";
import PageTransition from "@/components/layout/PageTransition";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const response = await fetch("/api/documents");
        const data = await response.json();

        setDocuments(data.documents || []);
        setUser(data.user || null);
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        documents
          .map((document) => document.category)
          .filter(Boolean)
      ),
    ];
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch =
        document.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        document.originalName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        document.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [documents, search, category]);

  async function handleDelete(id) {
    const response = await fetch(`/api/documents/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setDocuments((current) =>
        current.filter((document) => document._id !== id)
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F9FF]">
      <Navbar user={user} />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 lg:p-8">
          <PageTransition>
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-medium text-[#155EEF]">
                    Your wallet
                  </p>

                  <h1 className="mt-1 text-3xl font-black text-[#0B1F3A]">
                    Documents
                  </h1>

                  <p className="mt-2 text-slate-500">
                    Browse everything you've uploaded.
                  </p>
                </div>

                <Link
                  href="/documents/new"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0B3B91]"
                >
                  <Plus size={17} />
                  Upload
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search documents..."
                    className="h-12 w-full rounded-xl border border-blue-100 bg-white pl-11 pr-4 outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="h-12 rounded-xl border border-blue-100 bg-white px-4 outline-none focus:border-[#155EEF]"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mt-8">
                {loading ? (
                  <div className="py-20 text-center text-slate-400">
                    Loading documents...
                  </div>
                ) : (
                  <DocumentGrid
                    documents={filteredDocuments}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
}