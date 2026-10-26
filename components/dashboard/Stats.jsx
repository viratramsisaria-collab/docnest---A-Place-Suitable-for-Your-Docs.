import {
  FileText,
  FolderOpen,
  HardDrive,
} from "lucide-react";

export default function Stats({ documents = [] }) {
  const totalDocuments = documents.length;

  const categories = new Set(
    documents.map((document) => document.category)
  ).size;

  const totalBytes = documents.reduce(
    (total, document) => total + (document.fileSize || 0),
    0
  );

  const totalMB = (totalBytes / (1024 * 1024)).toFixed(1);

  const stats = [
    {
      label: "Documents",
      value: totalDocuments,
      icon: FileText,
    },
    {
      label: "Categories",
      value: categories,
      icon: FolderOpen,
    },
    {
      label: "Storage used",
      value: `${totalMB} MB`,
      icon: HardDrive,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-blue-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5 text-[#155EEF]">
                <Icon size={19} />
              </div>
            </div>

            <p className="mt-5 text-2xl font-black text-[#0B1F3A]">
              {stat.value}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}