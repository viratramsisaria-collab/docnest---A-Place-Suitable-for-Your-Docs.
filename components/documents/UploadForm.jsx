"use client";

import { useRef, useState } from "react";
import { FileUp, Loader2, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  "Identity",
  "Education",
  "Finance",
  "Government",
  "Medical",
  "Personal",
  "Other",
];

export default function UploadForm() {
  const router = useRouter();
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "Other",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(event) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    if (!form.name) {
      setForm((current) => ({
        ...current,
        name: selected.name.replace(/\.[^/.]+$/, ""),
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setError("Please choose a document.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", form.name);
    formData.append("category", form.category);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      router.push("/documents");
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-10 text-center transition hover:border-[#155EEF] hover:bg-blue-50"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFile}
          className="hidden"
        />

        {file ? (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#155EEF] shadow-sm">
              <FileUp size={25} />
            </div>

            <p className="mt-4 font-semibold text-[#0B1F3A]">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#155EEF] shadow-sm">
              <UploadCloud size={25} />
            </div>

            <p className="mt-4 font-semibold text-[#0B1F3A]">
              Drop your document here
            </p>

            <p className="mt-1 text-sm text-slate-400">
              PDF, JPG or PNG · Maximum 10MB
            </p>
          </>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
          Document name
        </label>

        <input
          value={form.name}
          onChange={(event) =>
            setForm({
              ...form,
              name: event.target.value,
            })
          }
          placeholder="e.g. Aadhaar Card"
          required
          className="h-12 w-full rounded-xl border border-blue-100 bg-white px-4 outline-none transition focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#0B1F3A]">
          Category
        </label>

        <select
          value={form.category}
          onChange={(event) =>
            setForm({
              ...form,
              category: event.target.value,
            })
          }
          className="h-12 w-full rounded-xl border border-blue-100 bg-white px-4 outline-none focus:border-[#155EEF] focus:ring-4 focus:ring-blue-50"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#155EEF] font-semibold text-white transition hover:bg-[#0B3B91] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <UploadCloud size={18} />
            Upload document
          </>
        )}
      </button>

      {file && (
        <button
          type="button"
          onClick={() => {
            setFile(null);

            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
          className="mx-auto flex items-center gap-2 text-sm text-slate-400 hover:text-red-500"
        >
          <X size={14} />
          Remove selected file
        </button>
      )}
    </form>
  );
}