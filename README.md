# Glowstudio

Nền tảng AI tạo ảnh cho designer & marketer Việt Nam. Dark editorial gallery aesthetic — Next.js 15 + Tailwind v4 + Aurora violet `#7c5cff`.

## Stack

- **Next.js 15** (App Router) + React 19
- **Tailwind CSS v4** (PostCSS plugin `@tailwindcss/postcss`)
- **shadcn/ui** (new-york style, baseColor neutral) — manual scaffold, no CLI
- **TypeScript** strict
- **Inter** via `next/font/google` (substitute for proprietary leoSans/canvaSans)
- **lucide-react** icons + inline Google "G" SVG
- **Radix UI** primitives (Dialog, DropdownMenu, Tabs, Slot, Toast)
- **picsum.photos** for mock images

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Design system source of truth

`GLOWSTUDIO_DESIGN_SYSTEM.md` is the immutable spec. 11 sections, 10 hard rules (§0), 4 allowed shadows (§5), 21 components (§6), 7 pages (§7), Vietnamese copy bank (§8), pre-merge checklist (§9), do's/don'ts (§10).

Original Leonardo.ai reference: `DESIGN (3).md`.

## Deployment (Vercel)

1. Create empty GitHub repo named `glowstudio` (private or public).
2. Push this folder:
   ```bash
   git remote add origin git@github.com:<your-username>/glowstudio.git
   git push -u origin main
   ```
3. Vercel Dashboard → **Add New Project** → Import `glowstudio` repo.
4. Vercel auto-detects Next.js. Click **Deploy** with no extra config.
5. After first deploy, default URL: `glowstudio-{hash}.vercel.app`.

No environment variables required for v1 (mock data, no backend).
