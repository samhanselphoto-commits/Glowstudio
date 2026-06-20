import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glowstudio — Design at the speed of thought",
  description:
    "Dark luxury creative studio. Generate images, video, and motion with frontier AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
