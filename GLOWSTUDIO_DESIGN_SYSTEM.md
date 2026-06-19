# Glowstudio — Design System
> Adapted from Leonardo.ai reference (see `DESIGN (3).md` in same folder). Dark editorial gallery aesthetic for a Vietnamese SaaS AI image generation platform targeting designers and marketers.

**Stack:** Next.js 15 (App Router) + Tailwind v4 + shadcn/ui + TypeScript
**Theme:** dark only (v1 chưa cần light mode)
**Brand violet:** Aurora `#7c5cff`
**Language:** Tiếng Việt primary, EN toggle ở header

---

## 0. Quy tắc bất di bất dịch (DO NOT BREAK)

Đọc kỹ phần này trước khi code bất kỳ component nào. Mọi sai lệch sẽ phá vỡ design language.

1. **Không tự ý đổi violet** — Aurora `#7c5cff` xuất hiện ở mọi chỗ brand: logo, active tab, focus ring, brand surface, glow shadow. Token: `--color-aurora-violet`.
2. **3-step neutral ramp tuyệt đối** — chỉ `#000000` / `#0a0a0a` / `#353535`. KHÔNG thêm `#1a1a1a`, `#222`, `#2a2a2a` ở giữa. Nếu cần hierarchy, dùng opacity.
3. **leoSans chỉ dùng ≥34px** — dưới 34px phải chuyển sang canvaSans. Không có ngoại lệ.
4. **Line-height display ≤0.90** — display type không bao giờ vượt 0.90 leading. Đây là điểm tạo poster density.
5. **60px pill radius** — mọi button + active tab đều dùng `rounded-full` (9999px). KHÔNG dùng radius khác cho button.
6. **8.4px card radius** — `rounded-[8.4px]` cho image card, content card nhỏ. KHÔNG trộn với button radius.
7. **6 màu tag palette chỉ dùng cho tag/chip/badge** — KHÔNG dùng làm fill lớn cho section, hero, hay background. Lime, Yellow, Pink, Coral, Plasma, Blue chỉ xuất hiện ở kích thước chip.
8. **Hairline thay shadow** — dùng `border border-mist/20` hoặc `border-white/10` để tách surface. Shadow biến mất trên nền đen.
9. **Image edge-to-edge** — card image không padding, ảnh fill sát mép card. Card là frame, không phải container.
10. **White-on-black contrast** — primary CTA là filled white pill trên nền đen. Đừng đặt white button lên card surface khác.

---

## 1. Tokens — Colors

### 1.1 Brand

| Token | Value | Role |
|---|---|---|
| `--color-aurora-violet` | `#7c5cff` | Logo, active tab, focus ring, brand surface highlights, signature wordmark |
| `--color-aurora-glow` | `rgba(124, 92, 255, 0.45)` | Box-shadow cho active tab, hover state đặc biệt |
| `--color-aurora-violet-soft` | `rgba(124, 92, 255, 0.12)` | Background tint nhẹ cho hover surface |

### 1.2 Tag palette (6 màu taxonomy)

| Token | Value | Role |
|---|---|---|
| `--color-toxic-lime` | `#03e65b` | Tag chip cho "Pro plan", "New" badge, highlight nhẹ |
| `--color-voltage-yellow` | `#ffc533` | Tag chip cho "Hot", "Trending" |
| `--color-shock-pink` | `#ff3386` | Tag chip cho "Beta", "Limited" |
| `--color-ember-coral` | `#ff5d4b` | Tag chip cho "Urgent", "Low credit" warning |
| `--color-plasma-pink` | `#d25fff` | Tag chip cho "Premium", "VIP" |
| `--color-arc-blue` | `#33d0ff` | Tag chip cho "Info", "Standard" |

### 1.3 Neutral ramp (3 bước)

| Token | Value | Role |
|---|---|---|
| `--color-midnight-canvas` | `#000000` | Page background, hero, footer base |
| `--color-obsidian-surface` | `#0a0a0a` | Nav bar, sticky overlay, modal backdrop |
| `--color-charcoal-card` | `#353535` | Card surface, image card fallback, raised panel |

### 1.4 Text & hairline

| Token | Value | Role |
|---|---|---|
| `--color-bone-white` | `#ffffff` | Primary text, filled primary action |
| `--color-fog` | `#f5f5f5` | Light surface inversion (không dùng ở v1) |
| `--color-mist` | `#e5e5e5` | Hairline border, divider |
| `--color-ash-text` | `#999999` | Muted body text, list item, secondary link |
| `--color-charcoal-mute` | `#666666` | Disabled state, tertiary metadata |
| `--color-ink-black` | `#030303` | SVG decorative fill, near-black accent |

---

## 2. Tokens — Typography

### 2.1 Font families

```css
--font-display: 'leoSans', 'Druk', 'Tungsten', 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-body: 'canvaSans', 'Inter', 'Plus Jakarta Sans', 'General Sans', ui-sans-serif, system-ui, sans-serif;
--font-accent: 'ufficioDisplay', 'Times Now', 'Playfair Display', 'GT Sectra', serif;
```

**Thực tế dùng:** dùng Google Fonts với substitute là **Inter** (cho cả display lẫn body) là đủ. Cân nhắc mua license Druk nếu budget cho phép.

### 2.2 Type scale

| Role | Size | Line-height | Tracking | Tailwind class |
|---|---|---|---|---|
| caption | 10px | 1.2 | normal | `text-[10px] leading-[1.2]` |
| body | 14px | 1.33 | normal | `text-sm leading-relaxed` |
| subheading | 19px | 1.15 | normal | `text-[19px] leading-[1.15]` |
| heading-sm | 34px | 0.92 | -0.02em | `text-[34px] leading-[0.92] tracking-[-0.02em]` |
| heading | 48px | 0.90 | -0.02em | `text-5xl leading-[0.9] tracking-[-0.02em]` |
| heading-lg | 78px | 0.85 | -0.02em | `text-[78px] leading-[0.85] tracking-[-0.02em]` |
| display | 98px | 0.80 | -0.02em | `text-[98px] leading-[0.8] tracking-[-0.02em]` |
| display-xl | 165px | 0.80 | -0.02em | `text-[165px] leading-[0.8] tracking-[-0.02em]` |

### 2.3 Font weights

| Weight | Value | Tailwind |
|---|---|---|
| regular | 400 | `font-normal` |
| medium | 500 | `font-medium` |
| bold | 700 | `font-bold` |
| extrabold | 800 | `font-extrabold` |
| black | 900 | `font-black` |

**Rule:** body UI dùng `font-medium` (500) là chuẩn. Heading dùng `font-extrabold` (800) hoặc `font-black` (900).

---

## 3. Tokens — Spacing, Radius, Layout

```css
/* Spacing scale */
--spacing-5: 5px;
--spacing-7: 7px;
--spacing-10: 10px;
--spacing-14: 14px;
--spacing-17: 17px;
--spacing-20: 20px;
--spacing-27: 27px;
--spacing-34: 34px;
--spacing-41: 41px;
--spacing-44: 44px;
--spacing-47: 47px;
--spacing-54: 54px;
--spacing-61: 61px;
--spacing-68: 68px;
--spacing-135: 135px;
--spacing-203: 203px;

/* Border radius */
--radius-inputs: 6px;        /* rounded-md */
--radius-cards: 8.4px;       /* rounded-[8.4px] */
--radius-cards-large: 20px;  /* rounded-[20px] */
--radius-buttons: 9999px;    /* rounded-full */
--radius-tags: 9999px;       /* rounded-full */

/* Layout */
--page-max-width: 1440px;
--section-gap: 80px;
--card-padding: 20px;
--element-gap: 10px;
```

**Tailwind class mẫu:**
- Section gap: `py-20` (80px) hoặc `gap-y-20` cho flex
- Card padding: `p-5` (20px)
- Element gap trong section: `gap-2.5` (10px)

---

## 4. Tailwind v4 config

Đặt trong `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-aurora-violet: #7c5cff;
  --color-aurora-glow: rgba(124, 92, 255, 0.45);
  --color-aurora-soft: rgba(124, 92, 255, 0.12);

  /* Tag palette */
  --color-toxic-lime: #03e65b;
  --color-voltage-yellow: #ffc533;
  --color-shock-pink: #ff3386;
  --color-ember-coral: #ff5d4b;
  --color-plasma-pink: #d25fff;
  --color-arc-blue: #33d0ff;

  /* Neutral ramp */
  --color-midnight: #000000;
  --color-obsidian: #0a0a0a;
  --color-charcoal: #353535;

  /* Text */
  --color-bone-white: #ffffff;
  --color-mist: #e5e5e5;
  --color-ash-text: #999999;
  --color-charcoal-mute: #666666;
  --color-ink-black: #030303;

  /* Font */
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Spacing (chỉ thêm custom) */
  --spacing-5: 5px;
  --spacing-7: 7px;
  --spacing-17: 17px;
  --spacing-27: 27px;
  --spacing-34: 34px;
  --spacing-41: 41px;
  --spacing-44: 44px;
  --spacing-47: 47px;
  --spacing-54: 54px;
  --spacing-61: 61px;
  --spacing-68: 68px;
  --spacing-135: 135px;
  --spacing-203: 203px;
}

:root {
  color-scheme: dark;
  --background: #000000;
  --foreground: #ffffff;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}
```

### shadcn config (components.json)

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  }
}
```

Override shadcn defaults vì shadcn mặc định có gray scale riêng. Trong `lib/utils.ts` giữ nguyên `cn()` helper.

---

## 5. Elevation (shadows)

| Element | Shadow | Tailwind class |
|---|---|---|
| Image Card | `0 0 0 1px rgba(229,229,229,0.06), 0 20px 40px rgba(0,0,0,0.5)` | `shadow-[0_0_0_1px_rgba(229,229,229,0.06),0_20px_40px_rgba(0,0,0,0.5)]` |
| Active Tab Pill | `0 0 24px rgba(124,92,255,0.45)` | `shadow-[0_0_24px_rgba(124,92,255,0.45)]` |
| Primary CTA | `0 0 0 1px rgba(255,255,255,0.08)` | `shadow-[0_0_0_1px_rgba(255,255,255,0.08)]` |
| Modal | `0 0 0 1px rgba(229,229,229,0.1), 0 40px 80px rgba(0,0,0,0.7)` | `shadow-[0_0_0_1px_rgba(229,229,229,0.1),0_40px_80px_rgba(0,0,0,0.7)]` |

**Rule:** không dùng shadow khác ngoài 4 cái này. Shadow là scarce resource trên dark UI.

---

## 6. Component library

Mỗi component dưới đây có spec + Tailwind class mẫu. Implement bằng shadcn primitive + override className.

### 6.1 Primary Button (Filled Pill)

**Spec:** Filled white pill, 60px radius, canvaSans 500, padding 27px × 10px, không border, shadow nhẹ white outline.

```tsx
// components/ui/button-primary.tsx
<button className="
  rounded-full
  bg-bone-white
  text-midnight
  px-7 py-2.5
  text-sm font-medium
  shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
  hover:bg-fog
  active:scale-[0.98]
  transition
  disabled:opacity-40 disabled:cursor-not-allowed
">
  Bắt đầu miễn phí
</button>
```

**Variants:**
- Default: `bg-bone-white text-midnight`
- Loading: thêm spinner bên trái, opacity 80%
- Disabled: `opacity-40 cursor-not-allowed`

### 6.2 Ghost Button (Outlined Pill)

**Spec:** Transparent fill, 1px mist border, 60px radius, canvaSans 500 white 14-16px.

```tsx
<button className="
  rounded-full
  border border-mist
  bg-transparent
  text-bone-white
  px-7 py-2.5
  text-sm font-medium
  hover:bg-aurora-soft hover:border-aurora-violet
  transition
">
  Xem demo
</button>
```

### 6.3 Nav Utility Button (small)

**Spec:** Filled white pill nhỏ, padding 14px × 7px, 14px text. Dùng cho "Đăng nhập" ở header.

```tsx
<button className="
  rounded-full
  bg-bone-white
  text-midnight
  px-3.5 py-1.5
  text-sm font-medium
  hover:bg-fog
">
  Đăng nhập
</button>
```

### 6.4 Active Tab Pill

**Spec:** Filled aurora violet, 60px radius, white text 16px, glow shadow.

```tsx
<button className="
  rounded-full
  bg-aurora-violet
  text-bone-white
  px-5 py-2.5
  text-base font-medium
  shadow-[0_0_24px_rgba(124,92,255,0.45)]
">
  Đang hoạt động
</button>
```

**Inactive tab:**

```tsx
<button className="
  rounded-full
  bg-transparent
  text-bone-white
  px-5 py-2.5
  text-base font-medium
  hover:text-aurora-violet
  transition
">
  Không active
</button>
```

### 6.5 Tab Filter Row

**Spec:** Horizontal row pills, gap 27px, scroll ngang trên mobile.

```tsx
<div className="flex items-center gap-7 overflow-x-auto pb-2">
  <button className="rounded-full bg-aurora-violet text-bone-white px-5 py-2.5 text-base font-medium shadow-[0_0_24px_rgba(124,92,255,0.45)] whitespace-nowrap">
    Tất cả
  </button>
  <button className="rounded-full text-bone-white px-5 py-2.5 text-base font-medium hover:text-aurora-violet whitespace-nowrap">
    Lookbook
  </button>
  <button className="rounded-full text-bone-white px-5 py-2.5 text-base font-medium hover:text-aurora-violet whitespace-nowrap">
    Sản phẩm
  </button>
  <button className="rounded-full text-bone-white px-5 py-2.5 text-base font-medium hover:text-aurora-violet whitespace-nowrap">
    Social
  </button>
</div>
```

### 6.6 Category Tag Chip

**Spec:** 270px radius, color-coded background, white text 12-14px bold, padding 7px × 14px.

```tsx
// 6 variants cho 6 màu tag palette
function TagChip({ children, color = 'lime' }: { children: React.ReactNode, color?: 'lime'|'yellow'|'pink'|'coral'|'plasma'|'blue' }) {
  const colorMap = {
    lime: 'bg-toxic-lime',
    yellow: 'bg-voltage-yellow',
    pink: 'bg-shock-pink',
    coral: 'bg-ember-coral',
    plasma: 'bg-plasma-pink',
    blue: 'bg-arc-blue',
  };
  return (
    <span className={`
      inline-flex items-center
      rounded-full
      ${colorMap[color]}
      px-3.5 py-1.5
      text-xs font-bold
      text-bone-white
      whitespace-nowrap
    `}>
      {children}
    </span>
  );
}
```

### 6.7 Image Card

**Spec:** 8.4px radius, charcoal background, image edge-to-edge, no padding. Image fill `aspect-square` hoặc theo ratio user chọn.

```tsx
<div className="
  group relative
  overflow-hidden
  rounded-[8.4px]
  bg-charcoal
  cursor-pointer
">
  <img
    src="..."
    alt=""
    className="
      block w-full h-auto
      object-cover
      transition duration-300
      group-hover:scale-[1.02]
    "
  />
  {/* Hover overlay */}
  <div className="
    absolute inset-0
    bg-midnight/40
    opacity-0 group-hover:opacity-100
    transition
    flex items-end justify-between
    p-4
  ">
    <button className="rounded-full bg-obsidian/80 backdrop-blur-sm p-2 hover:bg-aurora-violet transition">
      <DownloadIcon className="w-4 h-4 text-bone-white" />
    </button>
    <button className="rounded-full bg-obsidian/80 backdrop-blur-sm p-2 hover:bg-aurora-violet transition">
      <HeartIcon className="w-4 h-4 text-bone-white" />
    </button>
  </div>
</div>
```

### 6.8 Image Gallery Grid

**Spec:** 3-4 cột, gap 10-14px, container 1440px max-width.

```tsx
<div className="
  grid
  grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-3.5
  max-w-[1440px] mx-auto
">
  {/* repeat ImageCard */}
</div>
```

### 6.9 Section Headline

**Spec:** leoSans 44-78px white, line-height 0.85-0.90, tracking -0.02em.

```tsx
<h2 className="
  font-display
  text-[44px] md:text-[78px]
  leading-[0.85]
  tracking-[-0.02em]
  font-extrabold
  text-bone-white
">
  Tạo ảnh chuyên nghiệp
</h2>
<p className="
  text-base
  text-ash-text
  mt-4
  max-w-2xl
">
  Subheadline mô tả ngắn, canvaSans 14-18px ash-text.
</p>
```

### 6.10 Hero Wordmark

**Spec:** leoSans 165px aurora violet, line-height 0.80. Dùng cho hero landing và credit balance ở /account.

```tsx
<h1 className="
  font-display
  text-[120px] md:text-[165px]
  leading-[0.8]
  tracking-[-0.02em]
  font-black
  text-aurora-violet
">
  GLOWSTUDIO
</h1>
```

### 6.11 Nav Bar

**Spec:** Transparent hoặc obsidian (#0a0a0a) khi scroll, height 64-80px, full-bleed.

```tsx
<nav className="
  sticky top-0 z-50
  h-16 md:h-20
  flex items-center justify-between
  px-6 md:px-10
  bg-transparent
  backdrop-blur-sm
  border-b border-mist/0
  data-[scrolled=true]:bg-obsidian/80
  data-[scrolled=true]:border-mist/10
  data-[scrolled=true]:backdrop-blur-md
">
  {/* Left: wordmark */}
  <span className="font-bold text-base text-bone-white">GLOWSTUDIO</span>

  {/* Center: nav links */}
  <div className="hidden md:flex items-center gap-7 text-sm font-medium text-bone-white">
    <a href="/create" className="hover:text-aurora-violet transition">Tạo ảnh</a>
    <a href="/library" className="hover:text-aurora-violet transition">Thư viện</a>
    <a href="/pricing" className="hover:text-aurora-violet transition">Giá</a>
    <a href="/docs" className="hover:text-aurora-violet transition">Tài liệu</a>
  </div>

  {/* Right: lang toggle + auth */}
  <div className="flex items-center gap-3">
    <button className="text-sm font-medium text-ash-text hover:text-bone-white transition">EN</button>
    <button className="rounded-full bg-bone-white text-midnight px-3.5 py-1.5 text-sm font-medium">
      Đăng nhập
    </button>
  </div>
</nav>
```

### 6.12 Credit Badge

**Spec:** Pill ở nav, hiển thị số credit. Cảnh báo khi <100.

```tsx
<button className="
  group
  flex items-center gap-2
  rounded-full
  border border-mist
  bg-transparent
  px-3.5 py-1.5
  text-sm font-medium
  hover:border-aurora-violet
  transition
">
  <SparkleIcon className="w-4 h-4 text-aurora-violet" />
  <span className="text-bone-white">1,247</span>
  <span className="text-ash-text">credits</span>
</button>

{/* Warning variant khi <100 */}
<button className="
  flex items-center gap-2
  rounded-full
  border border-ember-coral
  bg-ember-coral/10
  px-3.5 py-1.5
  text-sm font-medium
">
  <AlertIcon className="w-4 h-4 text-ember-coral" />
  <span className="text-ember-coral">87</span>
  <span className="text-ember-coral/70">credits</span>
</button>
```

### 6.13 Prompt Input Box (Studio)

**Spec:** Multi-line textarea, 6px radius, 1px mist border, focus ring aurora violet. Có 3 nút phụ bên trong.

```tsx
<div className="
  rounded-md
  border border-mist
  bg-obsidian
  focus-within:border-aurora-violet
  focus-within:shadow-[0_0_0_3px_rgba(124,92,255,0.2)]
  transition
">
  <textarea
    placeholder="Mô tả ảnh bạn muốn tạo..."
    rows={4}
    className="
      w-full
      bg-transparent
      text-bone-white
      text-base
      p-5
      resize-none
      outline-none
      placeholder:text-charcoal-mute
    "
  />
  <div className="
    flex items-center justify-between
    border-t border-mist/20
    px-4 py-3
  ">
    <div className="flex items-center gap-2">
      <button className="rounded-full border border-mist p-2 hover:border-aurora-violet hover:text-aurora-violet transition" title="Ảnh tham chiếu">
        <ImageIcon className="w-4 h-4" />
      </button>
      <button className="rounded-full border border-mist p-2 hover:border-aurora-violet hover:text-aurora-violet transition" title="Style ref">
        <PaletteIcon className="w-4 h-4" />
      </button>
      <button className="rounded-full border border-mist p-2 hover:border-aurora-violet hover:text-aurora-violet transition" title="Negative prompt">
        <BanIcon className="w-4 h-4" />
      </button>
    </div>
    <span className="text-xs text-charcoal-mute">0 / 2000 ký tự</span>
  </div>
</div>
```

### 6.14 Generate Button

**Spec:** Filled white pill lớn, bên phải hiển thị credit cost.

```tsx
<button className="
  rounded-full
  bg-bone-white
  text-midnight
  px-7 py-3
  text-base font-medium
  flex items-center gap-3
  hover:bg-fog
  active:scale-[0.98]
  transition
  disabled:opacity-40
">
  <SparkleIcon className="w-5 h-5" />
  <span>Tạo ảnh</span>
  <span className="
    rounded-full
    bg-obsidian
    text-ash-text
    px-2.5 py-0.5
    text-xs font-medium
  ">
    8 credits
  </span>
</button>
```

### 6.15 Model Selector Pill

**Spec:** 60px radius, 1px mist border, dropdown hiển thị danh sách model.

```tsx
<button className="
  flex items-center justify-between gap-2
  rounded-full
  border border-mist
  bg-obsidian
  px-4 py-2
  text-sm font-medium
  text-bone-white
  hover:border-aurora-violet
  transition
  min-w-[200px]
">
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-aurora-violet" />
    <span>GPT Image</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="text-ash-text">8c</span>
    <ChevronDownIcon className="w-4 h-4" />
  </div>
</button>
```

### 6.16 Aspect Ratio Selector

**Spec:** 1 row 5 chip (1:1, 4:5, 3:4, 16:9, 9:16). Active = aurora violet border.

```tsx
<div className="flex items-center gap-2">
  {ratios.map((r) => (
    <button
      key={r}
      className={`
        px-3 py-1.5
        rounded-md
        text-xs font-medium
        border
        transition
        ${r === active
          ? 'border-aurora-violet bg-aurora-soft text-bone-white'
          : 'border-mist/30 text-ash-text hover:border-mist hover:text-bone-white'
        }
      `}
    >
      {r}
    </button>
  ))}
</div>
```

### 6.17 Input Field (Form)

**Spec:** 6px radius, 1px mist border, canvaSans 16px, focus aurora violet.

```tsx
<div>
  <label className="block text-sm font-medium text-ash-text mb-2">
    Email
  </label>
  <input
    type="email"
    className="
      w-full
      rounded-md
      border border-mist
      bg-obsidian
      px-4 py-3
      text-base text-bone-white
      outline-none
      placeholder:text-charcoal-mute
      focus:border-aurora-violet
      focus:shadow-[0_0_0_3px_rgba(124,92,255,0.2)]
      transition
    "
    placeholder="ten@example.com"
  />
</div>
```

### 6.18 Toast Notification

**Spec:** Obsidian surface, 8.4px radius, 1px mist border, tự ẩn 4s, có progress bar ở dưới.

```tsx
<div className="
  fixed bottom-6 right-6
  w-[360px]
  rounded-[8.4px]
  bg-obsidian
  border border-mist/20
  shadow-[0_0_0_1px_rgba(229,229,229,0.1),0_40px_80px_rgba(0,0,0,0.7)]
  p-4
  overflow-hidden
">
  <div className="flex items-start gap-3">
    <CheckCircleIcon className="w-5 h-5 text-toxic-lime flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-sm font-medium text-bone-white">Đã tạo ảnh thành công</p>
      <p className="text-xs text-ash-text mt-0.5">4 ảnh đã được lưu vào thư viện</p>
    </div>
  </div>
  <div className="mt-3 h-0.5 bg-mist/20 rounded-full overflow-hidden">
    <div className="h-full bg-aurora-violet animate-[shrink_4s_linear]" />
  </div>
</div>
```

### 6.19 Buy Credits Modal

**Spec:** Centered modal 480px, charcoal surface, 20px radius, 3 gói top-up card bên trong.

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 backdrop-blur-sm">
  <div className="
    w-full max-w-[480px]
    rounded-[20px]
    bg-charcoal
    border border-mist/10
    shadow-[0_0_0_1px_rgba(229,229,229,0.1),0_40px_80px_rgba(0,0,0,0.7)]
    p-8
  ">
    <h2 className="font-display text-[34px] leading-[0.92] tracking-[-0.02em] font-extrabold text-bone-white">
      Cần thêm credits?
    </h2>
    <p className="text-sm text-ash-text mt-3">
      Mua thêm credits để tiếp tục tạo ảnh. Hạn sử dụng 12 tháng.
    </p>

    <div className="grid grid-cols-3 gap-3 mt-6">
      {packs.map((pack) => (
        <div
          key={pack.id}
          className="
            rounded-[8.4px]
            border border-mist/20
            bg-obsidian
            p-4
            text-center
            cursor-pointer
            hover:border-aurora-violet
            transition
          "
        >
          <p className="font-display text-2xl font-extrabold text-aurora-violet">
            {pack.credits}
          </p>
          <p className="text-xs text-ash-text mt-1">credits</p>
          <p className="text-sm font-medium text-bone-white mt-3">
            {formatVND(pack.price)}
          </p>
        </div>
      ))}
    </div>

    <div className="flex gap-3 mt-8">
      <button className="flex-1 rounded-full border border-mist text-bone-white px-7 py-3 text-sm font-medium hover:bg-aurora-soft">
        Hủy
      </button>
      <button className="flex-1 rounded-full bg-bone-white text-midnight px-7 py-3 text-sm font-medium hover:bg-fog">
        Thanh toán
      </button>
    </div>
  </div>
</div>
```

### 6.20 Empty State

**Spec:** Centered, icon lớn 64px, headline 19px, helper text 14px ash, CTA pill.

```tsx
<div className="flex flex-col items-center justify-center py-20 text-center">
  <ImageIcon className="w-16 h-16 text-charcoal-mute mb-6" />
  <h3 className="text-[19px] font-medium text-bone-white">
    Chưa có ảnh nào
  </h3>
  <p className="text-sm text-ash-text mt-2 max-w-sm">
    Hãy tạo ảnh đầu tiên của bạn. Mỗi ảnh tiêu tốn từ 2 đến 8 credits tùy model.
  </p>
  <button className="rounded-full bg-bone-white text-midnight px-7 py-2.5 text-sm font-medium mt-6 hover:bg-fog">
    Tạo ảnh ngay
  </button>
</div>
```

### 6.21 Footer

**Spec:** Multi-column link list, ash text, hover white, no bullets, gap 7-10px giữa rows.

```tsx
<footer className="border-t border-mist/10 mt-20">
  <div className="max-w-[1440px] mx-auto px-10 py-20">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
      {/* Brand col */}
      <div className="col-span-2">
        <span className="font-bold text-base text-bone-white">GLOWSTUDIO</span>
        <p className="text-sm text-ash-text mt-4 max-w-xs">
          Nền tảng AI tạo ảnh cho designer và marketer Việt Nam.
        </p>
      </div>
      {/* Link cols */}
      {footerSections.map((section) => (
        <div key={section.title}>
          <h4 className="text-xs font-bold text-charcoal-mute uppercase tracking-wider mb-4">
            {section.title}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {section.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-ash-text hover:text-bone-white transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-16 pt-8 border-t border-mist/10 flex items-center justify-between">
      <p className="text-xs text-charcoal-mute">© 2026 Glowstudio. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="text-ash-text hover:text-bone-white transition">
          <FacebookIcon className="w-5 h-5" />
        </a>
        <a href="#" className="text-ash-text hover:text-bone-white transition">
          <InstagramIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</footer>
```

---

## 7. Page layouts

Mỗi page dưới đây có cấu trúc section + code skeleton. Implement theo thứ tự: Landing → Auth → Pricing → Studio → Library → Account → Community.

### 7.1 Landing (`/`)

```tsx
// app/page.tsx
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <NavBar />

      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32 text-center">
        <h1 className="font-display text-[120px] md:text-[165px] leading-[0.8] tracking-[-0.02em] font-black text-aurora-violet">
          GLOWSTUDIO
        </h1>
        <h2 className="font-display text-[34px] md:text-[48px] leading-[0.9] tracking-[-0.02em] font-extrabold text-bone-white mt-10">
          Nền tảng AI tạo ảnh cho designer & marketer
        </h2>
        <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl mx-auto">
          Tạo ảnh chuyên nghiệp với GPT Image, NANO BANANA và Zturbo. Style reference, inpaint, batch — tất cả trong một studio.
        </p>
        <div className="flex items-center justify-center gap-3 mt-10">
          <button className="rounded-full bg-bone-white text-midnight px-7 py-3 text-base font-medium hover:bg-fog transition">
            Bắt đầu miễn phí
          </button>
          <button className="rounded-full border border-mist text-bone-white px-7 py-3 text-base font-medium hover:bg-aurora-soft transition">
            Xem demo
          </button>
        </div>
      </section>

      {/* GALLERY HERO SHOWCASE */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {showcase.map((item) => <ImageCard key={item.id} {...item} />)}
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <TabFilterRow tabs={['Tất cả', 'Lookbook', 'Sản phẩm', 'Social', 'Concept art']} active="Tất cả" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mt-10">
          {gallery.map((item) => <ImageCard key={item.id} {...item} />)}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <h2 className="font-display text-[44px] md:text-[78px] leading-[0.85] tracking-[-0.02em] font-extrabold text-bone-white text-center">
          Mọi thứ bạn cần
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-16">
          {features.map((f) => (
            <div key={f.title} className="rounded-[20px] bg-charcoal p-7 border border-mist/10">
              <f.icon className="w-8 h-8 text-aurora-violet" />
              <h3 className="font-display text-[19px] font-medium text-bone-white mt-5">
                {f.title}
              </h3>
              <p className="text-sm text-ash-text mt-3">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <h2 className="font-display text-[44px] md:text-[78px] leading-[0.85] tracking-[-0.02em] font-extrabold text-bone-white text-center">
          Bảng giá đơn giản
        </h2>
        <PricingCards />
        <div className="text-center mt-10">
          <a href="/pricing" className="text-sm font-medium text-aurora-violet hover:underline">
            So sánh chi tiết →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 mt-20">
        <h2 className="font-display text-[44px] md:text-[78px] leading-[0.85] tracking-[-0.02em] font-extrabold text-bone-white">
          Câu hỏi thường gặp
        </h2>
        <FAQList />
      </section>

      <Footer />
    </main>
  );
}
```

### 7.2 Pricing (`/pricing`)

```tsx
// app/pricing/page.tsx
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <NavBar />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
        <h1 className="font-display text-[78px] md:text-[98px] leading-[0.8] tracking-[-0.02em] font-black text-bone-white text-center">
          Chọn gói phù hợp
        </h1>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button className="rounded-full bg-aurora-violet text-bone-white px-5 py-2.5 text-sm font-medium shadow-[0_0_24px_rgba(124,92,255,0.45)]">
            Hàng tháng
          </button>
          <button className="rounded-full text-ash-text px-5 py-2.5 text-sm font-medium hover:text-bone-white">
            Hàng năm <span className="text-toxic-lime text-xs ml-1">-20%</span>
          </button>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                rounded-[20px]
                bg-charcoal
                border ${plan.popular ? 'border-aurora-violet shadow-[0_0_24px_rgba(124,92,255,0.45)]' : 'border-mist/10'}
                p-7
                flex flex-col
              `}
            >
              {plan.popular && (
                <span className="self-start rounded-full bg-aurora-violet text-bone-white text-xs font-bold px-3 py-1 mb-4">
                  Phổ biến nhất
                </span>
              )}
              <h3 className="text-[19px] font-medium text-bone-white">{plan.name}</h3>
              <p className="text-sm text-ash-text mt-2">{plan.description}</p>
              <p className="font-display text-[44px] leading-[0.9] font-extrabold text-bone-white mt-6">
                {formatVND(plan.price)}
                <span className="text-sm text-ash-text font-normal"> / tháng</span>
              </p>
              <p className="text-xs text-charcoal-mute mt-1">{plan.credits} credits / tháng</p>

              <ul className="flex flex-col gap-2.5 mt-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ash-text">
                    <CheckIcon className="w-4 h-4 text-toxic-lime flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full mt-7
                  rounded-full
                  px-5 py-3
                  text-sm font-medium
                  transition
                  ${plan.popular
                    ? 'bg-bone-white text-midnight hover:bg-fog'
                    : 'border border-mist text-bone-white hover:bg-aurora-soft'
                  }
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Top-up section */}
        <div className="mt-20 rounded-[20px] bg-charcoal border border-mist/10 p-10">
          <h2 className="font-display text-[34px] leading-[0.92] tracking-[-0.02em] font-extrabold text-bone-white">
            Mua thêm credits
          </h2>
          <p className="text-sm text-ash-text mt-3">
            Credits mua thêm có hạn 12 tháng, dùng được cho mọi model.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-7">
            {topupPacks.map((pack) => (
              <div key={pack.id} className="rounded-[8.4px] border border-mist/20 bg-obsidian p-5 text-center hover:border-aurora-violet transition cursor-pointer">
                <p className="font-display text-3xl font-extrabold text-aurora-violet">{pack.credits}</p>
                <p className="text-xs text-ash-text mt-1">credits</p>
                <p className="text-base font-medium text-bone-white mt-3">{formatVND(pack.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

### 7.3 Auth (`/login`, `/register`)

```tsx
// app/login/page.tsx
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-[44px] leading-[0.9] tracking-[-0.02em] font-extrabold text-aurora-violet">
            GLOWSTUDIO
          </h1>
          <p className="text-sm text-ash-text mt-3">Đăng nhập để tiếp tục</p>
        </div>

        <div className="rounded-[20px] bg-charcoal border border-mist/10 p-8">
          {/* OAuth buttons */}
          <div className="flex flex-col gap-3">
            <button className="rounded-full border border-mist text-bone-white px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-aurora-soft">
              <GoogleIcon className="w-5 h-5" />
              Tiếp tục với Google
            </button>
            <button className="rounded-full border border-mist text-bone-white px-5 py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-aurora-soft">
              <FacebookIcon className="w-5 h-5" />
              Tiếp tục với Facebook
            </button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-mist/20" />
            <span className="text-xs text-charcoal-mute">hoặc</span>
            <div className="flex-1 h-px bg-mist/20" />
          </div>

          <form className="flex flex-col gap-4">
            <InputField label="Email" type="email" placeholder="ten@example.com" />
            <InputField label="Mật khẩu" type="password" placeholder="••••••••" />
            <button className="rounded-full bg-bone-white text-midnight px-7 py-3 text-sm font-medium hover:bg-fog mt-2">
              Đăng nhập
            </button>
          </form>

          <p className="text-sm text-ash-text text-center mt-6">
            Chưa có tài khoản? <a href="/register" className="text-aurora-violet hover:underline">Đăng ký</a>
          </p>
        </div>
      </div>
    </main>
  );
}
```

### 7.4 Studio (`/app/studio`)

Đây là trang quan trọng nhất, layout 3-zone.

```tsx
// app/app/studio/page.tsx
export default function StudioPage() {
  return (
    <div className="h-screen flex flex-col bg-midnight">
      <StudioTopBar />

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT RAIL — Tools */}
        <aside className="w-[280px] border-r border-mist/10 p-5 flex flex-col gap-2 overflow-y-auto">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`
                rounded-full
                px-5 py-3
                text-sm font-medium
                flex items-center gap-3
                transition
                ${tool.active
                  ? 'bg-aurora-soft text-aurora-violet border border-aurora-violet'
                  : 'text-ash-text hover:text-bone-white hover:bg-obsidian border border-transparent'
                }
              `}
            >
              <tool.icon className="w-4 h-4" />
              {tool.label}
            </button>
          ))}

          <div className="border-t border-mist/10 my-4" />

          <h4 className="text-xs font-bold text-charcoal-mute uppercase tracking-wider px-5 mb-2">
            Tham chiếu
          </h4>
          {references.map((ref) => (
            <div key={ref.id} className="rounded-[8.4px] overflow-hidden border border-mist/10">
              <img src={ref.url} alt="" className="w-full aspect-square object-cover" />
            </div>
          ))}
        </aside>

        {/* CENTER — Canvas */}
        <main className="flex-1 flex flex-col p-7 overflow-y-auto">
          {/* Prompt area */}
          <div className="rounded-[20px] bg-charcoal border border-mist/10 p-7">
            <PromptInput />

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-3">
                <ModelSelector />
                <AspectRatioSelector />
              </div>
              <GenerateButton />
            </div>
          </div>

          {/* Result canvas */}
          <div className="mt-5 flex-1 rounded-[20px] bg-charcoal border border-mist/10 p-7 min-h-[400px]">
            {generating ? (
              <GeneratingState />
            ) : results.length > 0 ? (
              <ResultGrid />
            ) : (
              <EmptyCanvas />
            )}
          </div>
        </main>

        {/* RIGHT RAIL — Inspector */}
        <aside className="w-[320px] border-l border-mist/10 flex flex-col">
          <div className="flex border-b border-mist/10">
            {['Parameters', 'History', 'Prompt'].map((tab) => (
              <button
                key={tab}
                className={`
                  flex-1
                  px-5 py-4
                  text-sm font-medium
                  border-b-2
                  transition
                  ${tab === activeTab
                    ? 'text-bone-white border-aurora-violet'
                    : 'text-ash-text border-transparent hover:text-bone-white'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 p-5 overflow-y-auto">
            {activeTab === 'Parameters' && <ParametersPanel />}
            {activeTab === 'History' && <HistoryPanel />}
            {activeTab === 'Prompt' && <PromptDetailPanel />}
          </div>
        </aside>
      </div>
    </div>
  );
}
```

**Components con của Studio:**

```tsx
// StudioTopBar
<header className="h-16 border-b border-mist/10 flex items-center justify-between px-6 bg-obsidian">
  <div className="flex items-center gap-4">
    <span className="font-bold text-base text-bone-white">GLOWSTUDIO</span>
    <span className="text-charcoal-mute">/</span>
    <span className="text-sm text-ash-text">Studio</span>
  </div>
  <div className="flex items-center gap-3">
    <CreditBadge credits={1247} />
    <AvatarMenu />
  </div>
</header>

// GeneratingState — streaming progressive
<div className="h-full flex flex-col items-center justify-center">
  <div className="relative w-full max-w-md aspect-square">
    <img src={currentFrame} className="w-full h-full object-cover rounded-[8.4px] blur-md" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-aurora-violet border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-ash-text mt-4">Đang tạo ảnh... {progress}%</p>
      </div>
    </div>
  </div>
  <button className="rounded-full border border-mist text-ash-text px-5 py-2 text-sm font-medium mt-6 hover:text-bone-white">
    Hủy
  </button>
</div>

// ResultGrid — 4 ảnh variation
<div className="grid grid-cols-2 gap-3.5 h-full">
  {results.map((r) => (
    <div key={r.id} className="relative group rounded-[8.4px] overflow-hidden">
      <img src={r.url} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
        <div className="flex gap-2">
          <button className="rounded-full bg-obsidian/80 p-2 hover:bg-aurora-violet"><DownloadIcon className="w-4 h-4 text-bone-white" /></button>
          <button className="rounded-full bg-obsidian/80 p-2 hover:bg-aurora-violet"><RefreshIcon className="w-4 h-4 text-bone-white" /></button>
        </div>
      </div>
    </div>
  ))}
</div>
```

### 7.5 Library (`/app/library`)

```tsx
// app/app/library/page.tsx
export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-mist/10 p-5 flex flex-col gap-1 sticky top-0 h-screen overflow-y-auto">
        <button className="rounded-full bg-bone-white text-midnight px-5 py-2.5 text-sm font-medium mb-5">
          + Tạo ảnh mới
        </button>

        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`
              relative
              rounded-md
              px-4 py-2.5
              text-sm font-medium
              flex items-center gap-2
              transition
              ${folder.active
                ? 'bg-aurora-soft text-bone-white'
                : 'text-ash-text hover:text-bone-white hover:bg-obsidian'
              }
            `}
          >
            {folder.active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-aurora-violet" />}
            <FolderIcon className="w-4 h-4" />
            {folder.name}
            <span className="ml-auto text-xs text-charcoal-mute">{folder.count}</span>
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 p-7">
        {/* Top filter bar */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <input
              placeholder="Tìm ảnh..."
              className="flex-1 rounded-full border border-mist bg-obsidian px-5 py-2.5 text-sm text-bone-white outline-none placeholder:text-charcoal-mute focus:border-aurora-violet transition"
            />
          </div>
          <TabFilterRow
            tabs={['Tất cả', 'Đã thích', 'Gần đây', 'Thùng rác']}
            active={activeTab}
          />
          <select className="rounded-full border border-mist bg-obsidian px-4 py-2 text-sm text-bone-white">
            <option>Mới nhất</option>
            <option>Cũ nhất</option>
            <option>Nhiều like nhất</option>
          </select>
        </div>

        {/* Grid */}
        {images.length === 0 ? (
          <EmptyState
            title="Chưa có ảnh nào"
            description="Hãy tạo ảnh đầu tiên của bạn. Mỗi ảnh tiêu tốn từ 2 đến 8 credits tùy model."
            cta="Tạo ảnh ngay"
            ctaHref="/app/studio"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {images.map((img) => <ImageCard key={img.id} {...img} />)}
          </div>
        )}
      </main>
    </div>
  );
}
```

### 7.6 Account (`/app/account`)

```tsx
// app/app/account/page.tsx
export default function AccountPage() {
  return (
    <div className="min-h-screen bg-midnight flex">
      <AccountSidebar />

      <main className="flex-1 p-10 max-w-4xl">
        <h1 className="font-display text-[34px] leading-[0.92] tracking-[-0.02em] font-extrabold text-bone-white">
          Hồ sơ
        </h1>

        {/* Credit balance card — nơi duy nhất dùng display-xl ngoài hero */}
        <div className="mt-10 rounded-[20px] bg-charcoal border border-mist/10 p-10">
          <p className="text-xs font-bold text-charcoal-mute uppercase tracking-wider">
            Số dư credits
          </p>
          <p className="font-display text-[120px] md:text-[165px] leading-[0.8] tracking-[-0.02em] font-black text-aurora-violet mt-3">
            1,247
          </p>
          <div className="flex items-center gap-3 mt-5">
            <button className="rounded-full bg-bone-white text-midnight px-7 py-3 text-sm font-medium">
              Mua thêm credits
            </button>
            <button className="rounded-full border border-mist text-bone-white px-7 py-3 text-sm font-medium">
              Lịch sử giao dịch
            </button>
          </div>
        </div>

        {/* Form sections */}
        <section className="mt-12">
          <h2 className="font-display text-[19px] font-medium text-bone-white mb-5">
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Họ và tên" defaultValue="Nguyễn Văn A" />
            <InputField label="Email" defaultValue="a@example.com" />
            <InputField label="Số điện thoại" placeholder="0901234567" />
            <InputField label="Công ty" placeholder="Tên công ty" />
          </div>
          <button className="rounded-full bg-bone-white text-midnight px-7 py-3 text-sm font-medium mt-6">
            Lưu thay đổi
          </button>
        </section>
      </main>
    </div>
  );
}

// AccountSidebar
function AccountSidebar() {
  return (
    <aside className="w-[240px] border-r border-mist/10 p-5 sticky top-0 h-screen">
      <h3 className="text-xs font-bold text-charcoal-mute uppercase tracking-wider px-4 mb-3">
        Tài khoản
      </h3>
      {accountLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`
            relative block
            rounded-md
            px-4 py-2.5
            text-sm font-medium
            ${link.active
              ? 'bg-aurora-soft text-bone-white'
              : 'text-ash-text hover:text-bone-white'
            }
          `}
        >
          {link.active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-aurora-violet" />}
          {link.label}
        </a>
      ))}
    </aside>
  );
}
```

### 7.7 Community Gallery (`/community`)

```tsx
// app/community/page.tsx
export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <NavBar />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
        <h1 className="font-display text-[78px] md:text-[98px] leading-[0.8] tracking-[-0.02em] font-black text-aurora-violet">
          Cộng đồng
        </h1>
        <p className="text-base text-ash-text mt-6 max-w-2xl">
          Khám phá ảnh được tạo bởi cộng đồng Glowstudio. Click vào ảnh để xem prompt và re-use ngay trong Studio.
        </p>

        <div className="mt-10">
          <TabFilterRow tabs={['Trending', 'Mới nhất', 'Theo dõi', 'Lookbook', 'Sản phẩm', 'Concept']} active="Trending" />
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3.5 mt-10">
          {communityImages.map((img) => (
            <div key={img.id} className="break-inside-avoid mb-3.5">
              <CommunityImageCard {...img} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// CommunityImageCard — masonry, hiện creator + likes
<div className="group relative rounded-[8.4px] overflow-hidden bg-charcoal cursor-pointer">
  <img src={url} className="w-full h-auto group-hover:scale-[1.02] transition duration-300" />
  <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar src={creator.avatar} className="w-6 h-6" />
          <span className="text-xs font-medium text-bone-white">{creator.name}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-bone-white">
          <HeartIcon className="w-3 h-3" />
          {likes}
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 8. Vietnamese copy bank

Sử dụng nhất quán trong toàn bộ app. Tone: trực tiếp, thân thiện, không hoa mỹ.

### 8.1 Navigation

| Element | Tiếng Việt |
|---|---|
| Nav links | Tạo ảnh · Thư viện · Cộng đồng · Giá · Tài liệu · Liên hệ |
| Auth | Đăng nhập · Bắt đầu miễn phí |
| Lang toggle | EN / VI |

### 8.2 Landing hero

| Element | Copy |
|---|---|
| Headline phụ | Nền tảng AI tạo ảnh cho designer & marketer |
| Subhead | Tạo ảnh chuyên nghiệp với GPT Image, NANO BANANA và Zturbo. Style reference, inpaint, batch — tất cả trong một studio. |
| Primary CTA | Bắt đầu miễn phí |
| Secondary CTA | Xem demo |

### 8.3 Pricing

| Plan | Tag | Price (VND) | Credits/tháng | Tagline |
|---|---|---|---|---|
| Free | Miễn phí | 0đ | 50 | Dùng thử Zturbo, không cần thẻ |
| Pro | Phổ biến nhất | 399.000đ | 2.000 | Cho freelancer và creator |
| Max | — | 999.000đ | 6.000 | Cho team nhỏ và agency |
| Enterprise | Liên hệ | Custom | Custom | API, SSO, brand kit riêng |

| Feature label | Copy |
|---|---|
| Top-up section title | Mua thêm credits |
| Top-up helper | Credits mua thêm có hạn 12 tháng, dùng được cho mọi model. |
| Billing toggle | Hàng tháng · Hàng năm (tiết kiệm 20%) |

### 8.4 Studio

| Element | Copy |
|---|---|
| Prompt placeholder | Mô tả ảnh bạn muốn tạo... |
| Generate button | Tạo ảnh |
| Generating | Đang tạo ảnh... {progress}% |
| Cancel | Hủy |
| Tools | Tạo ảnh · Style ref · Inpaint · Upscale · Batch |
| References section | Tham chiếu |
| Right rail tabs | Parameters · History · Prompt |
| Model selector | GPT Image · NANO BANANA · Zturbo |
| Aspect ratios | 1:1 · 4:5 · 3:4 · 16:9 · 9:16 |
| Negative prompt toggle | Negative prompt |
| Image ref button | Ảnh tham chiếu |
| Style ref button | Style ref |
| Character count | 0 / 2000 ký tự |

### 8.5 Library

| Element | Copy |
|---|---|
| New button | + Tạo ảnh mới |
| Search | Tìm ảnh... |
| Filter tabs | Tất cả · Đã thích · Gần đây · Thùng rác |
| Sort | Mới nhất · Cũ nhất · Nhiều like nhất |
| Empty state title | Chưa có ảnh nào |
| Empty state description | Hãy tạo ảnh đầu tiên của bạn. Mỗi ảnh tiêu tốn từ 2 đến 8 credits tùy model. |
| Empty state CTA | Tạo ảnh ngay |

### 8.6 Account

| Element | Copy |
|---|---|
| Sidebar | Hồ sơ · Thanh toán · Credits · API · Đăng xuất |
| Profile heading | Hồ sơ |
| Credit balance label | Số dư credits |
| Credit buttons | Mua thêm credits · Lịch sử giao dịch |
| Section heading | Thông tin cá nhân |
| Field labels | Họ và tên · Email · Số điện thoại · Công ty |
| Save button | Lưu thay đổi |

### 8.7 Error & empty states

| Tình huống | Copy |
|---|---|
| Hết credit khi generate | Bạn đã hết credits. Mua thêm để tiếp tục tạo. |
| Generate failed | Tạo ảnh thất bại. Số credit đã được hoàn lại. |
| Out of credits (modal title) | Cần thêm credits? |
| Network error | Không thể kết nối. Vui lòng thử lại. |
| Image rejected (policy) | Ảnh không đạt tiêu chuẩn cộng đồng. Vui lòng chỉnh sửa prompt. |
| Toast success | Đã tạo ảnh thành công. 4 ảnh đã được lưu vào thư viện. |
| Toast low credit | Còn 87 credits. Mua thêm để không gián đoạn. |

---

## 9. File checklist trước khi merge

Mỗi PR phải pass hết checklist này:

### 9.1 Color
- [ ] Chỉ dùng 17 token màu trong `app/globals.css`. Không hardcode hex ngoài.
- [ ] Violet chỉ dùng cho brand (logo, active state, focus ring, brand surface). Không dùng cho body text hay heading lớn.
- [ ] 6 màu tag palette chỉ xuất hiện ở component `<TagChip>` hoặc badge nhỏ.

### 9.2 Typography
- [ ] `font-display` chỉ dùng cho heading ≥34px.
- [ ] `font-body` cho mọi text <34px.
- [ ] Display type không vượt line-height 0.90.
- [ ] Heading luôn có `tracking-[-0.02em]`.

### 9.3 Spacing & radius
- [ ] Button dùng `rounded-full`.
- [ ] Card dùng `rounded-[8.4px]` (small) hoặc `rounded-[20px]` (large).
- [ ] Section gap giữa 2 section là `py-20`.
- [ ] Element gap trong section là `gap-2.5` hoặc `gap-3.5`.

### 9.4 Layout
- [ ] Container `max-w-[1440px] mx-auto px-6 md:px-10`.
- [ ] Page background luôn `bg-midnight`.
- [ ] Modal/overlay backdrop `bg-midnight/80 backdrop-blur-sm`.

### 9.5 Dark mode
- [ ] Không có class `dark:` — v1 chỉ có 1 theme.
- [ ] Không dùng `text-white` — dùng `text-bone-white`.

### 9.6 Image
- [ ] Image card dùng `aspect-*` ratio rõ ràng, không để ảnh kéo layout.
- [ ] Image edge-to-edge trong card, không có padding bao quanh.
- [ ] Luôn có `alt` text (kể cả rỗng cho ảnh trang trí).

### 9.7 Vietnamese
- [ ] Tất cả UI copy dùng bảng ở section 8.
- [ ] Giá tiền format `199.000đ` (không phải `199,000 VND` hay `199K`).
- [ ] EN toggle chỉ hiển thị label "EN" — không phải "English".

---

## 10. Do's và Don'ts tổng hợp

### Do
- Dùng `rounded-full` cho mọi button + active tab — đây là signature curve
- Push display type lên 78px+ cho section heading, 165px cho hero
- Aurora violet chỉ dùng cho logo, active state, brand surface — identity, không phải decoration
- 6 màu tag palette dùng cho tag chip, category badge, marker nhỏ
- Page background `#000000`, card surface `#353535` — 3-step neutral ramp
- Hairline `border-mist/20` thay shadow để tách surface
- Body type 10-19px canvaSans, leoSans chỉ từ 34px trở lên
- Image card edge-to-edge, không padding
- Khi user hover card, overlay 40% đen + action icon
- Vietnamese primary, EN toggle ở header

### Don't
- Đặt white-filled button lên non-black surface — phá contrast
- Dùng 6 màu tag cho fill lớn, background, hero
- Để leoSans line-height > 0.90
- Trộn 8.4px card radius với button radius
- Thêm accent color ngoài 6 màu tag
- Drop shadow > 1px trên dark surface — biến mất vào đen
- Aurora violet cho body text hay heading lớn
- Hardcode hex màu trong component — luôn qua token
- Thêm gray xám ở giữa neutral ramp
- Tự ý đổi violet sang màu khác

---

## 11. Tham chiếu

- File gốc để hiểu design language: `DESIGN (3).md` (cùng folder)
- Tài liệu shadcn: https://ui.shadcn.com
- Tailwind v4 docs: https://tailwindcss.com/docs
- Next.js 15 App Router: https://nextjs.org/docs

Khi cần update file này, edit trực tiếp và commit cùng PR với code thay đổi. File này là source of truth.



