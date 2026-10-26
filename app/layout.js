import "./globals.css";

export const metadata = {
  title: {
    default: "DocNest",
    template: "%s | DocNest",
  },
  description:
    "Your documents. One secure place. Upload, organize, view and share your important documents with DocNest.",
  keywords: [
    "DocNest",
    "document manager",
    "document storage",
    "digital documents",
    "document organizer",
  ],
  authors: [
    {
      name: "DocNest",
    },
  ],
  applicationName: "DocNest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}