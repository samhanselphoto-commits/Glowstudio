import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Rocket,
  Layers,
  Wand2,
  Code2,
  Webhook,
  KeyRound,
  ArrowRight,
  Terminal,
  Check,
  Coins,
  AlertTriangle,
  Library as LibraryIcon,
  ChevronRight,
  Zap,
  ImageIcon,
  Gauge,
} from "lucide-react";

const navSections = [
  {
    title: "Bắt đầu",
    items: [
      { id: "intro", label: "Giới thiệu", icon: BookOpen },
      { id: "quickstart", label: "Quickstart", icon: Rocket },
      { id: "credits", label: "Credit & thanh toán", icon: Coins },
    ],
  },
  {
    title: "Studio",
    items: [
      { id: "models", label: "Model reference", icon: Layers },
      { id: "inpaint", label: "Inpaint & Upscale", icon: Wand2 },
      { id: "library", label: "Library cá nhân", icon: LibraryIcon },
    ],
  },
  {
    title: "API",
    items: [
      { id: "auth", label: "Authentication", icon: KeyRound },
      { id: "generate", label: "POST /generate", icon: Code2 },
      { id: "webhooks", label: "Webhooks", icon: Webhook },
      { id: "errors", label: "Errors & rate limit", icon: AlertTriangle },
    ],
  },
];

const modelSpecs = [
  {
    name: "GPT Image",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 12,
    strengths: [
      "Hiểu prompt phức tạp, nhiều ràng buộc",
      "Text trong ảnh chính xác (kể cả tiếng Việt có dấu)",
      "Editorial & quảng cáo đa concept",
    ],
    bestFor: "Ảnh quảng cáo, banner, mockup sản phẩm cần text chính xác.",
    speed: "8–12s / ảnh",
  },
  {
    name: "NANO BANANA",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 10,
    strengths: [
      "Editorial fashion, cinematic grading",
      "Chân dung sắc nét, da tự nhiên",
      "Màu phim teal & amber đặc trưng",
    ],
    bestFor: "Lookbook, ảnh chân dung, editorial magazine.",
    speed: "6–10s / ảnh",
  },
  {
    name: "Flux Pro",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 15,
    strengths: [
      "Chất lượng flagship, ảnh sản phẩm",
      "Ánh sáng vật lý chính xác",
      "Composition chặt chẽ, ít artifact",
    ],
    bestFor: "Ảnh sản phẩm cao cấp, quảng cáo thương hiệu lớn.",
    speed: "12–18s / ảnh",
  },
  {
    name: "Zturbo",
    tag: "Free",
    tagColor: "bg-[#03e65b]/15 text-[#03e65b]",
    credit: 3,
    strengths: [
      "Tốc độ rất cao (< 4s)",
      "Giá rẻ, phù hợp draft nhanh",
      "Prompt ngắn vẫn ra kết quả ổn",
    ],
    bestFor: "Draft, moodboard, A/B test nhanh nhiều concept.",
    speed: "2–4s / ảnh",
  },
  {
    name: "Ideogram",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 8,
    strengths: [
      "Typography xuất sắc, hỗ trợ tiếng Việt có dấu",
      "Poster, logo có chữ, infographic",
      "Nhiều style typography có sẵn",
    ],
    bestFor: "Poster, banner Tết, logo có tagline tiếng Việt.",
    speed: "5–8s / ảnh",
  },
  {
    name: "Recraft v3",
    tag: "Beta",
    tagColor: "bg-[#ff3386]/15 text-[#ff3386]",
    credit: 9,
    strengths: [
      "Vector & brand system, xuất SVG sạch",
      "Style lock nhất quán giữa các ảnh",
      "Phù hợp illustration phẳng",
    ],
    bestFor: "Brand kit, illustration phẳng, vector minh họa.",
    speed: "6–9s / ảnh",
  },
];

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-10%] left-[15%] h-[500px] w-[800px] rounded-full bg-[#7c5cff]/12 blur-[140px]" />
      </div>

      <div className="relative">
        {/* Top nav */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link href="/studio" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Studio</Link>
              <Link href="/community" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Community</Link>
              <Link href="/library" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Library</Link>
              <Link href="/pricing" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Pricing</Link>
            </nav>
            <Link href="/studio" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90">
              Mở Studio <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-white/10 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
              Documentation
            </p>
            <h1 className="mt-3 text-[56px] font-extrabold leading-[0.9] tracking-[-0.02em] sm:text-[78px]">
              Tài liệu
              <br />
              <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                Glowstudio.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-white/55">
              Hướng dẫn sử dụng Studio, tham chiếu model và tài liệu API cho developer tích hợp
              Glowstudio vào workflow marketer hoặc design system nội bộ.
            </p>
          </div>
        </section>

        {/* Body */}
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {navSections.map((s) => (
                <div key={s.title}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    {s.title}
                  </p>
                  <ul className="space-y-0.5">
                    {s.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="group flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <Icon className="h-3.5 w-3.5 text-white/40 group-hover:text-[#7c5cff]" />
                            {item.label}
                            <ChevronRight className="ml-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="rounded-[8.4px] border border-white/10 bg-white/[0.02] p-4 text-xs text-white/55">
                <div className="mb-1 font-semibold text-white">Cần hỗ trợ?</div>
                Liên hệ{" "}
                <Link href="/contact" className="text-[#a98bff] underline-offset-4 hover:underline">
                  support@glowstudio.vn
                </Link>{" "}
                hoặc Zalo OA của chúng tôi.
              </div>
            </div>
          </aside>

          {/* Content placeholder — sections added below */}
          <article className="space-y-16 lg:col-span-9">
            <div id="intro" className="scroll-mt-24">
              <SectionHead
                eyebrow="Bắt đầu"
                title="Giới thiệu Glowstudio"
                desc="SaaS AI image-gen cho designer và marketer Việt. Một Studio, 6 model, trả theo credit."
              />
              <p className="mt-5 text-sm leading-relaxed text-white/65">
                Glowstudio gom các model AI hàng đầu — GPT Image, NANO BANANA, Flux Pro,
                Zturbo, Ideogram và Recraft v3 — vào cùng một giao diện. Bạn không cần đăng
                ký nhiều nền tảng, không cần chuyển credit giữa các hệ thống. Mọi ảnh tạo ra
                được lưu trong Library cá nhân, có thể inpaint, upscale 4×, hoặc đăng lên
                Community để người khác re-use prompt.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <FeatureChip icon={Zap} title="6 model" desc="Tất cả trong một Studio" />
                <FeatureChip icon={Wand2} title="Inpaint & 4× Upscale" desc="Chỉnh sửa cục bộ" />
                <FeatureChip icon={Coins} title="Trả theo credit" desc="Không bắt buộc subscription" />
              </div>
            </div>

            <div id="quickstart" className="scroll-mt-24">
              <SectionHead
                eyebrow="Bắt đầu"
                title="Quickstart"
                desc="Tạo ảnh đầu tiên trong vòng 2 phút."
              />
              <ol className="mt-6 space-y-3 text-sm text-white/75">
                {[
                  "Đăng ký tài khoản miễn phí — nhận 100 credit.",
                  "Vào Studio, nhập prompt vào ô bên trái (vd: \"Bento UI dashboard cho SaaS productivity, soft gradient tím\").",
                  "Chọn model (mặc định GPT Image) và aspect ratio (1:1, 4:3, 3:4, 16:9, 9:16).",
                  "Bấm Generate. Mỗi lần generate trả về 4 variations, mỗi ảnh trừ credit theo model.",
                  "Chọn variation ưng nhất, tải về hoặc đưa vào Inpaint / Upscale.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#7c5cff]/40 bg-[#7c5cff]/10 text-[11px] font-semibold text-[#c8b8ff]">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/studio"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-black hover:opacity-90"
                >
                  Mở Studio <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/community"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs hover:bg-white/[0.08]"
                >
                  Khám phá Community
                </Link>
              </div>
            </div>

            <div id="credits" className="scroll-mt-24">
              <SectionHead
                eyebrow="Bắt đầu"
                title="Credit & thanh toán"
                desc="Mỗi model tiêu hao lượng credit khác nhau. Mua gói hoặc top-up linh hoạt."
              />
              <div className="mt-6 overflow-hidden rounded-[8.4px] border border-white/10 bg-black">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                      <th className="px-5 py-3 font-medium">Model</th>
                      <th className="px-5 py-3 font-medium">Gói yêu cầu</th>
                      <th className="px-5 py-3 font-medium text-right">Credit / ảnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelSpecs.map((m, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{m.name}</span>
                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${m.tagColor}`}>
                              {m.tag}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-white/60">
                          {m.tag === "Free" ? "Free trở lên" : "Pro trở lên"}
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-white">{m.credit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-white/50">
                Inpaint: +6 credit · Upscale 4×: +8 credit. Top-up từ 100.000đ, không hết hạn.
              </p>
            </div>

            <div id="models" className="scroll-mt-24">
              <SectionHead
                eyebrow="Studio"
                title="Model reference"
                desc="Chọn model theo mục đích — text chính xác, chân dung, sản phẩm, vector."
              />
              <div className="mt-6 space-y-4">
                {modelSpecs.map((m) => (
                  <div
                    key={m.name}
                    className="rounded-[8.4px] border border-white/10 bg-black p-5 transition-colors hover:border-white/20"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[19px] font-semibold leading-[1.15]">{m.name}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.tagColor}`}>
                          {m.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/55">
                        <span className="inline-flex items-center gap-1">
                          <Gauge className="h-3 w-3" /> {m.speed}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-white">
                          <Coins className="h-3 w-3 text-[#ffc533]" /> {m.credit}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-white/65">
                      <span className="font-medium text-white/80">Tốt nhất cho:</span> {m.bestFor}
                    </p>
                    <ul className="mt-3 grid gap-1.5 text-xs text-white/60 sm:grid-cols-3">
                      {m.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#03e65b]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div id="inpaint" className="scroll-mt-24">
              <SectionHead
                eyebrow="Studio"
                title="Inpaint & Upscale"
                desc="Chỉnh sửa cục bộ bằng cọ và upscale 4× giữ chi tiết."
              />
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-[#7c5cff]" />
                    <h3 className="text-[17px] font-semibold">Inpaint</h3>
                    <span className="ml-auto rounded-full bg-[#7c5cff]/15 px-2 py-0.5 text-[10px] font-semibold text-[#c8b8ff]">
                      +6 credit
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/65">
                    Tô vùng cần chỉnh trên canvas, nhập prompt mô tả phần thay thế. AI chỉ thay
                    đổi vùng được tô, giữ nguyên phần còn lại. Phù hợp xoá chi tiết thừa, đổi
                    màu sản phẩm, hoặc thêm object vào ảnh có sẵn.
                  </p>
                </div>
                <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-[#7c5cff]" />
                    <h3 className="text-[17px] font-semibold">Upscale 4×</h3>
                    <span className="ml-auto rounded-full bg-[#7c5cff]/15 px-2 py-0.5 text-[10px] font-semibold text-[#c8b8ff]">
                      +8 credit
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/65">
                    Phóng to ảnh lên 4 lần, giữ chi tiết sắc nét nhờ model nội bộ. Phù hợp
                    in ấn, banner lớn, hoặc crop ảnh mà vẫn giữ chất lượng xuất bản.
                  </p>
                </div>
              </div>
            </div>

            <div id="library" className="scroll-mt-24">
              <SectionHead
                eyebrow="Studio"
                title="Library cá nhân"
                desc="Mọi ảnh tạo ra được lưu trên cloud, riêng tư theo mặc định."
              />
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                  Folder theo dự án: Chung, Sản phẩm, Lookbook, Marketing, Moodboard, Branding.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                  Tìm kiếm theo prompt, model hoặc folder. Lọc theo trạng thái public/private.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                  Chọn nhiều ảnh để tải về hàng loạt hoặc xoá cùng lúc.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                  Re-use prompt từ bất kỳ ảnh nào — mở thẳng Studio với prompt + model + aspect đã điền sẵn.
                </li>
              </ul>
            </div>

            <div id="auth" className="scroll-mt-24">
              <SectionHead
                eyebrow="API"
                title="Authentication"
                desc="Tất cả request API yêu cầu Bearer token trong header Authorization."
              />
              <CodeBlock
                lang="bash"
                code={`curl https://api.glowstudio.vn/v1/generate \\
  -H "Authorization: Bearer sk-live-..." \\
  -H "Content-Type: application/json" \\
  -d '{ "prompt": "...", "model": "gpt-image" }'`}
              />
              <p className="mt-4 text-sm text-white/65">
                Tạo API key trong <Link href="/studio" className="text-[#a98bff] underline-offset-4 hover:underline">Studio → Settings → API keys</Link>.
                Key chỉ hiển thị 1 lần khi tạo — lưu trữ an toàn phía server, không nhúng vào client.
              </p>
            </div>

            <div id="generate" className="scroll-mt-24">
              <SectionHead
                eyebrow="API"
                title="POST /generate"
                desc="Tạo ảnh mới. Trả về job ID, kết quả gửi qua webhook hoặc polling."
              />
              <CodeBlock
                lang="json"
                code={`{
  "prompt": "Bento UI dashboard, soft gradient tím",
  "model": "gpt-image",
  "aspect": "1:1",
  "style": "cinematic",
  "count": 4,
  "refs": ["https://..."]
}

→ 200 OK
{
  "id": "gen_abc123",
  "status": "processing",
  "estimated_credit": 48,
  "poll_url": "/v1/generations/gen_abc123"
}`}
              />
              <p className="mt-4 text-sm text-white/65">
                <span className="font-medium text-white">Parameters:</span>{" "}
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">prompt</code> (string, required),{" "}
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">model</code> (gpt-image | nano-banana | flux-pro | zturbo | ideogram | recraft-v3),{" "}
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">aspect</code> (1:1 | 4:3 | 3:4 | 16:9 | 9:16),{" "}
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">style</code>,{" "}
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">count</code> (1–4),{" "}
                <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">refs</code> (URL base64, max 4).
              </p>
            </div>

            <div id="webhooks" className="scroll-mt-24">
              <SectionHead
                eyebrow="API"
                title="Webhooks"
                desc="Nhận kết quả generation tự động khi hoàn tất."
              />
              <CodeBlock
                lang="json"
                code={`POST https://your-app.com/webhooks/glowstudio
Content-Type: application/json
X-Glowstudio-Signature: t=...,v1=...

{
  "event": "generation.completed",
  "data": {
    "id": "gen_abc123",
    "status": "completed",
    "variations": [
      { "id": "var_1", "url": "https://cdn.glowstudio.vn/..." },
      { "id": "var_2", "url": "https://cdn.glowstudio.vn/..." }
    ],
    "credit_used": 48
  }
}`}
              />
              <p className="mt-4 text-sm text-white/65">
                Verify chữ ký bằng secret trong dashboard trước khi xử lý payload. Replay được
                bảo vệ qua header <code className="rounded bg-white/[0.06] px-1 py-0.5 text-[11px]">X-Glowstudio-Timestamp</code>.
              </p>
            </div>

            <div id="errors" className="scroll-mt-24">
              <SectionHead
                eyebrow="API"
                title="Errors & rate limit"
                desc="Mã lỗi chuẩn và giới hạn theo từng gói."
              />
              <div className="mt-6 overflow-hidden rounded-[8.4px] border border-white/10 bg-black">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                      <th className="px-5 py-3 font-medium">Code</th>
                      <th className="px-5 py-3 font-medium">Ý nghĩa</th>
                      <th className="px-5 py-3 font-medium">Cách xử lý</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { c: "401", m: "Invalid API key", f: "Kiểm tra Bearer token, rotate key nếu cần." },
                      { c: "402", m: "Insufficient credit", f: "Top-up hoặc nâng cấp gói Pro/Max." },
                      { c: "429", m: "Rate limit exceeded", f: "Pro 1.000/ngày · Max 10.000/ngày · Enterprise custom." },
                      { c: "503", m: "Model unavailable", f: "Retry với exponential backoff (1s → 2s → 4s)." },
                    ].map((r) => (
                      <tr key={r.c} className="border-b border-white/5 last:border-0">
                        <td className="px-5 py-3 font-mono text-xs text-white">{r.c}</td>
                        <td className="px-5 py-3 text-white/80">{r.m}</td>
                        <td className="px-5 py-3 text-white/55">{r.f}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-12">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7c5cff]">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold">Glowstudio</span>
              <span className="text-xs text-white/40">© 2026 · Hà Nội, Việt Nam</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-white/50">
              <Link href="/studio" className="hover:text-white">Studio</Link>
              <Link href="/community" className="hover:text-white">Community</Link>
              <Link href="/library" className="hover:text-white">Library</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/docs" className="hover:text-white">Docs</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <header>
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[34px] font-extrabold leading-[0.92] tracking-[-0.02em]">
        {title}
      </h2>
      {desc && <p className="mt-2 text-sm text-white/55">{desc}</p>}
    </header>
  );
}

function FeatureChip({ icon: Icon, title, desc }: { icon: typeof Sparkles; title: string; desc: string }) {
  return (
    <div className="rounded-[8.4px] border border-white/10 bg-black p-4">
      <Icon className="h-5 w-5 text-[#7c5cff]" strokeWidth={1.6} />
      <div className="mt-3 text-sm font-semibold text-white">{title}</div>
      <div className="mt-1 text-xs text-white/50">{desc}</div>
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[8.4px] border border-white/10 bg-black">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2 text-[11px]">
        <div className="flex items-center gap-2 text-white/55">
          <Terminal className="h-3 w-3" />
          <span className="uppercase tracking-wider">{lang}</span>
        </div>
        <span className="text-[10px] text-white/30">glowstudio.dev</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed text-white/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}
