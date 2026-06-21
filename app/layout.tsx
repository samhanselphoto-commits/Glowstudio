import type { Metadata } from "next";
import "./globals.css";

import { SeedOnMount } from "@/components/ui/seed-on-mount";
import { ToastViewport } from "@/components/ui/toast";
import { PageTransitionProvider } from "@/components/ui/page-transition";
import { RouteTransitionShell } from "@/components/ui/route-transition-shell";

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
      <body className="min-h-screen antialiased">
        <PageTransitionProvider>
          <RouteTransitionShell>{children}</RouteTransitionShell>
        </PageTransitionProvider>
        <SeedOnMount />
        <ToastViewport />
      </body>
    </html>
  );
}