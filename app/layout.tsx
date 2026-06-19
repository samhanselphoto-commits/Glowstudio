import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Glowstudio — AI tạo ảnh cho designer & marketer",
  description:
    "Nền tảng AI tạo ảnh chuyên nghiệp cho designer và marketer Việt Nam. GPT Image, NANO BANANA, Zturbo — style reference, inpaint, batch trong một studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className={`${inter.className} bg-midnight text-bone-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
