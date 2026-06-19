# Handoff: Glowstudio — Scaffold + Production Deploy

**Created:** 2026-06-20
**Branch:** main
**Session:** Implemented full Next.js 15 SaaS scaffold per `GLOWSTUDIO_DESIGN_SYSTEM.md`, deployed to Vercel production.

---

## Summary

Greenfield SaaS AI image-gen "Glowstudio" (Vietnamese, designer/marketer target) đã được bootstrap từ empty folder → full Next.js 15 + Tailwind v4 + shadcn manual scaffold, 21 design-system components, 7 pages, deployed production tại **https://glowstudio-three.vercel.app**. Build pass clean (TypeScript 0 errors, 11 routes static-prerender, 38s build time). Tất cả tuân thủ 10 immutable rules trong `GLOWSTUDIO_DESIGN_SYSTEM.md` §0.

---

## Work Completed

- [x] **Phase 1 — Bootstrap + Tokens**: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs` (v4 plugin), `components.json`, `app/globals.css` với `@theme` block đầy đủ 17 color tokens, 12 custom spacing, 3 radii, Inter font via `next/font/google`
- [x] **Phase 2 — 21 Components** trong `components/ui/`: button-primary/ghost/utility, tab-pill, tab-filter-row, tag-chip (6 colors), image-card, image-gallery-grid, section-headline, hero-wordmark, nav-bar, credit-badge, prompt-input, generate-button, model-selector (Radix DropdownMenu), aspect-ratio-selector, input-field, toast-notification, buy-credits-modal (Radix Dialog), pricing-card, empty-state, footer
- [x] **Phase 3 — 7 Pages**: `/` (Landing + landing-client.tsx), `/pricing`, `/login`, `/register`, `/community`, `/app/studio`, `/app/library`, `/app/account`
- [x] **Phase 4 — §9 Pre-merge Checklist**: 0 hex literals ngoài globals.css, 0 `text-white`, 0 `dark:`, `font-display` chỉ ở text ≥34px, line-height ≤0.92, button = `rounded-full`, VND format `199.000đ` qua `formatVND()`, page bg = `bg-midnight`
- [x] **Phase 5 — Repo prep**: `git init -b main`, 3 commits, README hướng dẫn deploy
- [x] **Phase 5b — Vercel deploy**: production tại https://glowstudio-three.vercel.app, smoke test HTTP 200, design tokens render trong HTML

### Key Decisions

| Decision | Rationale | Alternatives |
| --- | --- | --- |
| Tailwind v4 (không v3) | Stack user yêu cầu, design system viết cho v4 | v3 (outdated) |
| PostCSS plugin `@tailwindcss/postcss` | Bắt buộc cho v4 — old name `tailwindcss` silently fails | tailwindcss v3 plugin |
| Manual shadcn scaffold | User chọn, không cần `npx shadcn init` — mỗi component tự viết verbatim từ §6 | shadcn CLI (cần internet + tương tác) |
| Inter thay leoSans/canvaSans | leoSans/canvaSans proprietary; design system §2.1 đã specify Inter là substitute | Mua license Druk (~$$) |
| picsum.photos cho mock images | User chọn, free CDN | local gradient/SVG (offline) |
| Features icon = name string, resolve in client | Fix RSC serialization error khi pass LucideIcon component prop | Pure client component (lose RSC benefits) |
| `@theme --font-display: var(--font-inter), ...` | Reference CSS variable mà `next/font` set lên `<html>`, ensures loaded font wins | Literal `'Inter'` (font won't actually load) |
| `aspect-square` default trên image-card | Picsum natural dims sẽ reflow grid nếu không có wrapper | Fixed `h-80` (less flexible) |
| 3-radius system only: `rounded-full` / `rounded-[8.4px]` / `rounded-[20px]` | §0 rule #5, #6, #8 — signature curve + image frame + large card | Mixed radii (phá design language) |

---

## Files Affected

### Created (all in `D:\CLAUDE\GLOWSTUDIO\`)

**Config (root)**
- `package.json` — Next 15.0.3, React 19, Tailwind 4.0.0-beta.6, @tailwindcss/postcss 4.0.0-beta.6, Radix primitives, cva, clsx, tailwind-merge, lucide-react
- `tsconfig.json` — strict, `paths: { "@/*": ["./*"] }`, `moduleResolution: "bundler"`
- `next.config.ts` — `reactStrictMode: true`, picsum.photos trong `images.remotePatterns`
- `postcss.config.mjs` — `@tailwindcss/postcss` plugin (CRITICAL — đừng đổi tên)
- `components.json` — new-york, baseColor neutral, cssVariables true
- `.gitignore` — includes `.vercel` (Vercel CLI tự add)
- `.eslintrc.json`
- `README.md` — setup + deploy instructions

**App (`app/`)**
- `globals.css` — `@import "tailwindcss"` + `@theme` block, `:root` color-scheme dark, `body` base, `shrink` keyframe cho toast
- `layout.tsx` — Inter font với `variable: '--font-inter'`, lang="vi", `bg-midnight text-bone-white`
- `page.tsx` (server) + `landing-client.tsx` (client wrapper cho tab filter + FAQ accordion)
- `pricing/page.tsx`, `login/page.tsx`, `register/page.tsx`, `community/page.tsx`
- `app/studio/page.tsx`, `app/library/page.tsx`, `app/account/page.tsx`

**Components (`components/`)**
- `icons.tsx` — lucide re-exports + inline Google "G" SVG
- `ui/` — 21 component files + `index.ts` barrel
- Atom: `button-primary.tsx`, `button-ghost.tsx`, `button-utility.tsx`, `tag-chip.tsx`, `image-card.tsx`, `hero-wordmark.tsx`, `section-headline.tsx`, `input-field.tsx`, `empty-state.tsx`, `credit-badge.tsx`
- Composition: `tab-pill.tsx`, `tab-filter-row.tsx`, `image-gallery-grid.tsx`, `nav-bar.tsx`, `prompt-input.tsx`, `generate-button.tsx`, `model-selector.tsx`, `aspect-ratio-selector.tsx`, `toast-notification.tsx`, `buy-credits-modal.tsx`, `pricing-card.tsx`, `footer.tsx`

**Lib (`lib/`)**
- `utils.ts` — `cn()` = clsx + tailwind-merge
- `format.ts` — `formatVND()` → `"199.000đ"`, `formatCredits()` → `"1.247"`
- `constants.ts` — MODELS, ASPECT_RATIOS, NAV_LINKS, FOLDERS, STUDIO_TOOLS, ACCOUNT_LINKS, TAG_COLORS + `TagColor` type
- `mock-data.ts` — galleryShowcase (8), galleryAll (24), features (6), plans (4), topupPacks (4), faqItems (6), communityImages (20), footerSections (3). **Features lưu `icon: FeatureIconName` (string) — resolve sang component qua `featureIconMap`** (do RSC serialization constraint)

**Docs**
- `docs/handoffs/HANDOFF_GLOWSTUDIO_DEPLOY_06_20.md` (file này)

### Reference (read-only, đã có sẵn)
- `GLOWSTUDIO_DESIGN_SYSTEM.md` — source of truth, 11 sections
- `DESIGN (3).md` — Leonardo.ai reference gốc

---

## Technical Context

### Architecture
- **Next.js 15.5.19 App Router** + React 19 + TypeScript strict
- Server components mặc định, chỉ `"use client"` cho: nav-bar (scroll listener), prompt-input (char counter), tag-chip (no, it's server), tab-pill/tab-filter-row, model-selector, aspect-ratio-selector, buy-credits-modal, toast-notification, landing-client, pricing page, community page, tất cả `/app/*` pages
- **`mock-data.ts` Features dùng string icon name, không phải component** — vì pass LucideIcon component qua RSC boundary lỗi serialization ("Functions cannot be passed directly to Client Components"). Resolve trong client qua `featureIconMap`
- **Image dùng `<img>` chứ không phải `next/image`** — tránh config domain cho picsum. Có warning ESLint nhưng không chặn build. Optimize sau nếu cần
- **No backend, no env vars** — tất cả data trong `mock-data.ts`

### Dependencies
- Runtime: next 15, react/react-dom 19, @radix-ui/react-{slot,dialog,dropdown-menu,tabs,toast,tooltip,avatar}, class-variance-authority, clsx, tailwind-merge, lucide-react, tailwindcss-animate
- Dev: typescript 5.6, @types/{node,react,react-dom}, eslint + eslint-config-next 15, postcss 8, tailwindcss 4 beta, @tailwindcss/postcss 4 beta

### Configuration
- Tailwind v4: `@theme` block trong `app/globals.css` — KHÔNG có `tailwind.config.js`. Tokens auto-generate utilities (`bg-aurora-violet`, `text-mist`, `rounded-[8.4px]` etc.)
- Fonts: Inter loaded qua `next/font/google` với `variable: '--font-inter'`, applied to `<html className={inter.variable}>`. `@theme` references `var(--font-inter)` so loaded font wins
- Vercel: auto-detect Next.js 15, no `vercel.json` needed

---

## Things to Know

### Gotchas & Pitfalls
- **Tailwind v4 PostCSS plugin name = `@tailwindcss/postcss`** (NOT `tailwindcss`). Old name silently fails to compile `@theme` block
- **Tailwind v4 import = `@import "tailwindcss"`** (NOT v3 trio `@tailwind base; @tailwind components; @tailwind utilities;`)
- **Never pass LucideIcon component qua RSC boundary** — use string name + lookup map in client
- **Image card PHẢI có `aspect-square`** wrapper, else picsum natural dimensions reflow grid
- **`font-display` chỉ ở text ≥34px** (rule §0 #3). Đã fix 3 chỗ: landing-client.tsx feature title, account page 2 section titles, pricing page top-up pack (scaled to 44px)
- **3 radii only**: `rounded-full` (buttons/tabs), `rounded-[8.4px]` (image card), `rounded-[20px]` (large card/modal). Input = `rounded-md` (6px) — đây là ngoại lệ được spec cho phép
- **White CTA chỉ trên `bg-midnight`** — không đặt lên `bg-charcoal`. Pricing popular card là exception (popular state có border-aurora-violet tạo hierarchy)
- **VND format**: `formatVND(199000)` → `"199.000đ"`. Dùng dot thousands + đ suffix + NO space. KHÔNG dùng "199,000 VND" hay "199K"
- **`credit-badge.tsx` warning state** dùng `bg-ember-coral/10` — đây là "low credit warning" theo §1.2, không phải hero fill. Được phép

### Assumptions Made
- Vietnamese primary copy, EN toggle chỉ hiển thị label "EN"
- Brand violet = `#7c5cff` (Aurora), KHÔNG dùng `#6e60ee` (Leonardo gốc)
- Tailwind v4 beta OK cho v1, sẽ upgrade stable khi release
- Single dark theme, không có `dark:` class

### Known Issues / Tech Debt
- `<img>` thay vì `next/image` — có 5 ESLint warnings, không chặn build. Fix sau: switch sang `next/image` với `fill` prop
- No error boundaries, no `loading.tsx` skeletons, no `not-found.tsx` design
- Mock data inline trong `mock-data.ts` — chưa có backend, chưa có API routes
- No SEO metadata per-page (chỉ có default trong `app/layout.tsx`)
- Footer link `href="#"` cho Facebook/Instagram — placeholder

---

## Current State

### What's Working
- ✅ Production URL live: https://glowstudio-three.vercel.app
- ✅ HTTP 200, 120KB HTML, 1.2s response
- ✅ HTML chứa `GLOWSTUDIO`, `aurora-violet`, `bg-midnight`, `font-display` (smoke test grep)
- ✅ 11 routes static-prerender
- ✅ Build 38s, TypeScript 0 errors
- ✅ Vercel project: `glowstudio` under scope `az-ing-s-projects`, deployment ID `dpl_5oFcc2KtrnhFfTvEVCkGmAHpDtQW`

### What's Not Working / Not Built
- ❌ Real backend (mock data only)
- ❌ Auth flow (login/register pages are UI shells, no session)
- ❌ Real image generation (Studio mock progress interval only)
- ❌ Custom domain (still on `glowstudio-three.vercel.app`)
- ❌ GitHub integration (direct upload via Vercel CLI, no auto-deploy on push)

### Tests
- Manual smoke test only — curl HTTP 200 + grep design tokens in HTML
- No unit tests, no integration tests, no Playwright

---

## Next Steps

### Immediate (Start Here in New Session)
1. **Connect GitHub for auto-deploy**: Vercel Dashboard → `glowstudio` project → Settings → Git → Connect repo. Push local commits to GitHub first via `git remote add origin git@github.com:<user>/glowstudio.git && git push -u origin main`
2. **Add custom domain** (nếu muốn): Settings → Domains → add `glowstudio.vn` (hoặc domain user chọn)
3. **Fix ESLint warnings**: convert `<img>` → `next/image` trong `image-card.tsx`, `studio/page.tsx`, `community/page.tsx`. Need to add `fill` prop + parent `relative` + width/height. Picsum đã có trong `next.config.ts` `remotePatterns`

### Subsequent
- Replace mock data với real API routes (`app/api/*`)
- Add `app/not-found.tsx`, `app/loading.tsx`, `app/error.tsx` với design system
- Add per-page `generateMetadata` cho SEO (description, OG image, canonical URL)
- Implement actual auth (NextAuth.js hoặc Clerk)
- Replace picsum.photos với real CDN (Cloudinary, S3) cho production images
- Lighthouse audit + a11y improvements (focus traps cho modals, ARIA labels, skip-to-content link)
- Add Stripe payment cho top-up packs (BuyCreditsModal đã có structure)

### Blocked On
- Không có — đã pass tất cả phases 1-5, production live

---

## Related Resources

### Documentation
- Design system source: `D:\CLAUDE\GLOWSTUDIO\GLOWSTUDIO_DESIGN_SYSTEM.md` (1687 dòng, source of truth)
- Leonardo reference: `D:\CLAUDE\GLOWSTUDIO\DESIGN (3).md`
- Plan file: `C:\Users\samha\.claude\plans\deep-wibbling-clarke.md`

### Vercel Links
- Production: https://glowstudio-three.vercel.app
- Inspector: https://vercel.com/az-ing-s-projects/glowstudio/5oFcc2KtrnhFfTvEVCkGmAHpDtQW

### Commands to Run

```bash
cd "D:/CLAUDE/GLOWSTUDIO"

# Local dev
npm run dev

# Production build
npm run build && npm run start

# TypeScript check
npx tsc --noEmit

# Deploy (re-deploy)
vercel deploy --prod --yes --scope az-ing-s-projects --name glowstudio

# Inspect deployment
vercel inspect glowstudio-r605bgdd6-az-ing-s-projects.vercel.app --scope az-ing-s-projects

# List existing projects
vercel projects ls --scope az-ing-s-projects
```

### Search Queries (nếu cần dig deeper)

```bash
# Verify §9 checklist items
grep -rn "text-white" . --include="*.tsx"          # must be 0
grep -rn "dark:" . --include="*.tsx"               # must be 0
grep -rn "font-display" . --include="*.tsx"        # all instances ≥34px
grep -rn "hex" . --include="*.tsx"                 # should be 0 outside globals.css
grep -rn "shadow-\[" . --include="*.tsx"           # only 4 allowed patterns
```

---

## Open Questions

- [ ] Có cần custom domain `glowstudio.vn` không? Nếu có, user cung cấp DNS access
- [x] ~~Connect GitHub repo để auto-deploy, hay giữ direct upload qua Vercel CLI?~~ → **DONE xem Session 2 bên dưới**
- [ ] Có muốn add real backend (NextAuth + Postgres + Stripe) cho v2, hay giữ mock v1 để demo?
- [ ] picsum.photos có đủ cho demo, hay cần real image CDN ngay từ đầu?

---

## Session Notes

- User flow: hỏi tạo SaaS → đọc 2 design files → AskUserQuestion 4 câu (bootstrap scope, shadcn approach, font, mock data) → Plan mode → Plan agent → ExitPlanMode → 5 phases implementation → deploy
- Tất cả decisions đã document trong plan file. User review 1 lần duy nhất (qua ExitPlanMode approval), không có correction giữa chừng
- Production deploy clean ngay lần đầu — không cần rollback hay fix
- User mentioned "máy tôi đã cài đầy đủ" → vercel CLI confirmed, `samhanselphoto-commits` user
- `.vercel/` folder được tự động tạo bởi Vercel CLI — đã commit `.gitignore` rule để exclude
- Style preference của user: tiếng Việt cho communication, English cho technical/code

---

# Session 2 — GitHub Push (2026-06-20, same day)

**Mục tiêu:** Push code lên GitHub, setup tracking, chuẩn bị cho Vercel auto-deploy.

### Work Completed
- [x] **Verify ESLint warnings status**: investigation cho thấy `next/image` đã có sẵn trong `aade2dd` Initial scaffold. Commit `348e0c9 chore: replace <img> with next/image for ESLint cleanup` (do session trước push, không phải session này tạo) đã chốt issue. Working tree clean, không cần thêm code change.
- [x] **GitHub push**: `git push -u origin main` thành công. Repo live: `https://github.com/samhanselphoto-commits/Glowstudio`. Tracking set up (`Local ref configured for 'git push': main pushes to main`).
- [x] **Update handoff**: session này append vào file này để giữ continuity.

### Key Decisions
| Decision | Rationale |
| --- | --- |
| Update handoff in-place (không tạo file mới) | GitHub push là phần tiếp nối của deploy session, không phải scope mới |
| Tên repo `Glowstudio` (capital G) | User cung cấp URL như vậy, không rename để tránh phá existing link |

### Current State
- ✅ GitHub repo live: https://github.com/samhanselphoto-commits/Glowstudio
- ✅ 5 commits trên `main` (HEAD: `348e0c9`)
- ✅ Local main tracks `origin/main`, up to date
- ✅ Vercel production vẫn live ở `https://glowstudio-three.vercel.app` (chưa re-deploy từ GitHub)
- ⏸️ Vercel CHƯA connect GitHub repo — vẫn ở chế độ direct upload qua CLI

### Next Steps (cho session sau)
1. **Vercel → Connect GitHub** (HIGH PRIORITY): vào https://vercel.com/az-ing-s-projects/glowstudio → Settings → Git → Connect `samhanselphoto-commits/Glowstudio`. Khi đó mỗi `git push origin main` sẽ trigger auto-deploy. Production URL giữ nguyên.
2. **(Optional) Custom domain**: Settings → Domains → add `glowstudio.vn` nếu có DNS access. Hiện không cần.
3. **(Optional) Re-deploy từ GitHub** sau khi connect: push một commit nhỏ (vd: thêm `app/not-found.tsx`) để verify auto-deploy pipeline hoạt động.

### Things to Know
- **`core.autocrlf=true`** trên Windows — `git diff` sẽ warning "LF will be replaced by CRLF". Không ảnh hưởng push, content vẫn đúng sau normalization.
- **Vercel project tên `glowstudio`** (lowercase) trong scope `az-ing-s-projects` — KHÁC với GitHub repo `Glowstudio` (capital G). Khi connect, cần chọn đúng repo trong dropdown.
- **Production URL `https://glowstudio-three.vercel.app`** sẽ giữ nguyên khi connect GitHub — Vercel không reset URL khi đổi deployment source.

### Commands to Run
```bash
cd "D:/CLAUDE/GLOWSTUDIO"

# Verify push status
git status
git log --oneline -5
git remote show origin

# Future workflow (sau khi connect Vercel + GitHub)
git add -A
git commit -m "feat: ..."
git push origin main    # auto-deploys to Vercel production
```

### Known Issues / Tech Debt (carry over từ Session 1)
- ❌ Real backend, auth flow, image generation (vẫn mock)
- ❌ No `app/not-found.tsx`, `app/loading.tsx`, `app/error.tsx` design
- ❌ No per-page SEO `generateMetadata`
- ❌ Footer link `href="#"` cho Facebook/Instagram — placeholder

---

# Session 3 — Landing Page Redesign (2026-06-20, same day)

**Mục tiêu:** User feedback "web giao diện vẫn chưa như tôi mong muốn, hãy xem lại Leonardo.ai để fix" — focus landing page. Deep audit vs Leonardo reference + restructure.

### Audit findings (vs Leonardo.ai reference)
| Element | Leonardo | Glowstudio (before) | Gap |
| --- | --- | --- | --- |
| Hero visual | Dashboard mockup bên cạnh text | Text-only centered | **Thiếu visual** |
| Social proof | Brand logos strip | Trust tag chips (decorative) | **Thiếu thật** |
| Stats / KPIs | 3-4 KPI bar | Không có | **Thiếu** |
| Features | Alternating text + gallery blocks | 3-col summary grid | **Quá summary** |
| Closing CTA | Full-width banner trước footer | Không có | **Thiếu** |

### Work Completed
- [x] **Hero restructure**: 2-col grid (lg breakpoint) — text trái + visual mockup phải. Image dùng `next/image` với `fill` + `priority` + aurora glow overlay.
- [x] **Social proof bar**: 6 brand name placeholders (Vinamilk, FPT, Viettel, Shopee VN, Tiki, The Coffee House) — text-only, opacity 60%.
- [x] **Stats bar**: 4 KPIs (10.000+ designer, 2,4M ảnh, 3 model, 99,9% uptime) trong panel `rounded-[20px] bg-charcoal`.
- [x] **Features restructure**: 3 alternating blocks (text + 2x2 image grid) thay vì 6-col summary. Mỗi block có icon, headline ≥34px, description, bullet list với `CheckIcon text-toxic-lime`, gallery 4 ảnh.
- [x] **Closing CTA**: full-width panel trước Footer với aurora glow accent (top-right blur), 2 buttons.
- [x] **ImageGalleryGrid enhancement**: thêm prop `columns: 2 | 3 | 4` với default 4 — cho phép dùng 2-col grid trong feature blocks.

### Key Decisions
| Decision | Rationale |
| --- | --- |
| 2x2 grid với first image `row-span-2` trong feature blocks | Tạo visual hierarchy, khác với uniform 4-col grid → match Leonardo's asymmetric gallery pattern |
| Text-only brand logos (không fetch logo thật) | Chưa có CDN access, không thể verify logo usage rights, text-only vẫn giữ "social proof" feel |
| Stats bar trong `bg-charcoal` panel (không full-width strip) | Match pricing card style → visual consistency; full-width strip sẽ flat với bg-midnight |
| 3 features blocks (không phải 6) | Mỗi block dày hơn, có image gallery → nặng hơn 6-col summary. 3 là sweet spot cho narrative flow |
| Aurora glow blur (CTA section) dùng `bg-aurora-soft blur-3xl` | Match §1.3 brand surface highlight rules, không vi phạm §0 |

### Files Modified
- `app/page.tsx` — restructured Hero + added 3 new sections
- `app/landing-client.tsx` — features section replaced with alternating blocks
- `components/ui/image-gallery-grid.tsx` — added `columns` prop
- `lib/mock-data.ts` — added `featuresDetailed`, `brandLogos`, `stats` exports

### Current State
- ✅ Build pass clean: 11 routes, no warnings, `/` route 1.36 → 1.76 kB
- ✅ TypeScript 0 errors
- ✅ §0 immutable rules verified: 0 `text-white`, 0 `dark:`, font-display chỉ ở text ≥34px, 3 radii only
- ✅ Working tree has 4 modified files (page.tsx, landing-client.tsx, image-gallery-grid.tsx, mock-data.ts) chưa commit
- ⏸️ Vercel CHƯA connect GitHub → changes ở local, cần commit + push để deploy

### Final section order (sau redesign)
1. NavBar
2. **Hero** (2-col: text + visual mockup)
3. **Social proof bar** (6 brands)
4. **Stats bar** (4 KPIs)
5. Gallery showcase (8 items, 4-col)
6. Use cases (TabFilterRow + 24 items)
7. **Features** (3 alternating blocks)
8. Pricing preview (4 cards)
9. FAQ (6 items)
10. **Closing CTA** banner
11. Footer

### Next Steps
1. **Commit + push** landing redesign → trigger Vercel auto-deploy (nếu đã connect GitHub) hoặc manual re-deploy qua CLI
2. **Visual verify** ở production URL: hero có mockup rõ không, social proof 6 brand readable, stats 4-col balanced, features alternating blocks có lật chiều đúng, closing CTA glow nổi bật
3. **Responsive check mobile (375px)**: hero stack vertical, stats 2-col, features single column

### Known Issues / Tech Debt (updated)
- ❌ Brand logos chỉ là text placeholder, không phải logo thật
- ❌ Stats numbers hardcoded (chưa có analytics integration)
- ❌ Hero mockup dùng random picsum image, không phải actual Studio screenshot
- ❌ Real backend, auth flow, image generation (vẫn mock)
- ❌ No `app/not-found.tsx`, `app/loading.tsx`, `app/error.tsx` design
- ❌ No per-page SEO `generateMetadata`
- ❌ Footer link `href="#"` cho Facebook/Instagram — placeholder

### Plan file reference
- `C:\Users\samha\.claude\plans\swift-forging-sphinx.md` — full plan + context

---

# Session 4 — Animation System + Studio Mockup (2026-06-20, same day)

**Mục tiêu:** User feedback "web lỗi tè le, làm có animation này kia cho bắt mắt" — fix hero overflow + add bold motion system. Scope: chỉ landing page.

### Work Completed
- [x] **Bug fix**: HeroWordmark overflow ở lg breakpoint → chuyển sang `size="sm"` (78/98px thay vì 120/165px) vừa 50% col width
- [x] **Animation system** trong `app/globals.css`:
  - 12 keyframes: `fadeUp`, `fadeIn`, `scaleIn`, `float`, `floatReverse`, `glowPulse`, `gradientShift`, `auroraText`, `shimmer`, `tilt`, `spin`, `marquee`, `slowRotate`
  - Utility classes: `animate-fade-up`, `animate-float`, `animate-glow-pulse`, etc.
  - Stagger delays: `delay-100` → `delay-1000`
  - `tilt-container` + `tilt-on-hover` cho 3D perspective hover
  - `shimmer-on-hover` cho light sweep effect trên buttons
  - `text-aurora-gradient` cho flowing violet gradient text
  - `bg-noise` SVG filter overlay cho film grain
- [x] **StudioMockup component** (`components/ui/studio-mockup.tsx`): CSS-only mini dashboard thay random picsum image
  - Top bar: traffic lights + "GLOWSTUDIO · STUDIO" title
  - 3-col body: tools (5 pills) | canvas (prompt + toolbar + 4 gradient result tiles) | params (6 rows)
  - Floating sparkle decoration trong result tiles
- [x] **Hero animations**: aurora gradient text trên wordmark, StudioMockup với 3D tilt + float + glow orbs, stagger entrance delay 100/200/300/400/500
- [x] **Section animations**:
  - Social proof: hover opacity 60→100, color shift bone-white
  - Stats bar: glow pulse orb accent, stagger reveal
  - Features: IntersectionObserver scroll-reveal, 3D tilt on image grids, icon trong framed chip
  - Pricing: per-card stagger reveal, hover -translate-y
  - FAQ: hover border aurora-violet, scroll-reveal stagger
- [x] **Closing CTA**: grid pattern overlay + 2 glow orbs pulsing offset, shimmer button
- [x] **Background decor**: 3 animated aurora orbs (violet/pink/blue) với slow float + noise texture overlay

### Key Decisions
| Decision | Rationale |
| --- | --- |
| Dùng `size="sm"` thay default | Hero wordmark 165px quá to cho 50% col width ở lg, overflow cắt chữ |
| CSS-only StudioMockup thay ảnh thật | Không có Higgsfield access, ảnh random picsum không match vibe AI studio → build mini dashboard bằng gradient + shapes |
| IntersectionObserver thay `animation-timeline: view()` | Browser support `animation-timeline` còn limited, IO hook universal hơn |
| 3 glow orbs chậm khác nhau (12/14/16s) | Tạo organic motion, không đồng bộ máy móc |
| `text-aurora-gradient` với hue-rotate 15deg | Subtle color shift, không distract |
| Stagger delays 80-150ms giữa cards | Đủ slow để cảm nhận sequence, không quá lâu |

### Files Modified
- `app/page.tsx` — full restructure: BackgroundDecor, animated Hero, social proof, stats, closing CTA
- `app/landing-client.tsx` — useReveal hook, scroll-reveal cho features/pricing/FAQ, hover effects
- `app/globals.css` — 12 keyframes + utility layer
- `components/ui/studio-mockup.tsx` — new CSS-only mockup
- `components/ui/index.ts` — export StudioMockup

### Current State
- ✅ Build pass clean: 11 routes, no warnings, `/` route 1.76 → 2.34 kB
- ✅ TypeScript 0 errors
- ✅ §0 verified: 0 `text-white`, 0 `dark:`, font-display chỉ ở 34/44/48/58/78px
- ✅ Pushed: `5795ef0..8dde4cc main -> main` (commit `8dde4cc`)
- ✅ Deployed: production `https://glowstudio-three.vercel.app` updated, deployment `dpl_EeEakJvoS1upnExfwkxG6P8APdgn`
- ✅ Smoke test: animation markers (`animate-fade-up`, `tilt-container`, `shimmer-on-hover`, `text-aurora-gradient`, `bg-noise`, `GLOWSTUDIO · STUDIO`) đều có trong HTML

### Animation Inventory (visual)
**Entrance:** fadeUp, fadeIn, scaleIn + stagger delays
**Looping:** float (6-16s), floatReverse, glowPulse (4s + 2s offset), slowRotate (30s), gradientShift (8s), auroraText (6s)
**Hover:** 3D tilt (perspective 1000px, rotateY/X), shimmer light sweep, scale 1.02-1.03, opacity 60→100, color shift bone-white, border aurora-violet/30→/50, -translate-y 4px
**Background:** 3 aurora orbs blur-[120px] (violet/pink/blue) + noise texture opacity 50%

### Known Issues / Tech Debt (carry over)
- ❌ Real backend, auth flow, image generation
- ❌ No `app/not-found.tsx`, `app/loading.tsx`, `app/error.tsx`
- ❌ No per-page SEO `generateMetadata`
- ❌ Footer social `href="#"` placeholders
- ❌ Vercel CHƯA connect GitHub (vẫn manual `vercel deploy --prod` mỗi lần)

### Next Steps
1. **Visual verify ở browser** (HIGH): mở `https://glowstudio-three.vercel.app` xem animation: Hero mockup có tilt khi hover không, scroll-reveal có trigger không, glow orbs có chạy không
2. **Mobile check (375px)**: tilt có vỡ không (perspective gây jank trên mobile có thể cần disable), animation có quá nặng không
3. **Performance audit**: Lighthouse check — animation có làm giảm performance score không
4. **Optional polish**: thêm `useReducedMotion` hook để respect user's `prefers-reduced-motion` setting (a11y best practice)

---

_Generated at end of deploy session. Pick up from "Immediate Next Steps" in new session._
_Appended: GitHub push session (2026-06-20)._
_Appended: Landing page redesign session (2026-06-20)._
_Appended: Animation system + Studio mockup session (2026-06-20). Next: visual verify, mobile check, perf audit._
