import type { NextConfig } from "next";

const repo = "Glowstudio";
const isStaticExport = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export only when explicitly building for GitHub Pages.
  // Vercel uses the default Node/Edge runtime (SSR + ISR + Image Optimization).
  output: isStaticExport ? "export" : undefined,
  reactStrictMode: true,
  // GitHub Pages serves from /<repo>; Vercel serves from /.
  basePath: isStaticExport ? `/${repo}` : undefined,
  assetPrefix: isStaticExport ? `/${repo}` : undefined,
  images: {
    // Static export cannot use Next/Image optimization; Vercel can.
    unoptimized: isStaticExport,
  },
  trailingSlash: true,
};

export default nextConfig;
