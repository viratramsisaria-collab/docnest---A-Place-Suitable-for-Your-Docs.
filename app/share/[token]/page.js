import { notFound } from "next/navigation";

export default async function SharePage({ params }) {
  const { token } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/share/${token}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  const document = data.document;

  return (
    <main className="min-h-screen bg-[#F5F9FF]">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <p className="text-2xl font-black text-[#0B1F3A]">
            patra<span className="text-[#155EEF]">.</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <p className="text-sm font-medium text-[#155EEF]">
            Shared document
          </p>

          <h1 className="mt-1 text-3xl font-black text-[#0B1F3A]">
            {document.name}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {document.originalName}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
          {document.fileType === "application/pdf" ? (
            <iframe
              src={document.fileUrl}
              title={document.name}
              className="h-[800px] w-full"
            />
          ) : document.fileType?.startsWith("image/") ? (
            <div className="flex min-h-[600px] items-center justify-center bg-slate-50 p-8">
              <img
                src={document.fileUrl}
                alt={document.name}
                className="max-h-[800px] max-w-full object-contain"
              />
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="font-semibold text-[#0B1F3A]">
                Preview unavailable
              </p>

              <a
                href={document.fileUrl}
                download
                className="mt-5 inline-block rounded-xl bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white"
              >
                Download document
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}