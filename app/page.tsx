import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Image as ImageIcon,
  Layers,
  Zap,
  Crown,
  Coins,
  Users,
  Wand2,
  Search,
  Bell,
  ChevronDown,
  ArrowRight,
  Check,
  Plus,
  Heart,
  Download,
  Play,
} from "lucide-react";

/* ---------- Data ---------- */

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Community", href: "/community" },
  { label: "Library", href: "/library" },
  { label: "Pricing", href: "/pricing" },
];

const models = [
  {
    name: "GPT Image",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: "12",
    desc: "Hiểu prompt phức tạp, xử lý text trong ảnh cực tốt",
  },
  {
    name: "NANO BANANA",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: "10",
    desc: "Phong cách editorial, chân dung sắc nét, màu cinematic",
  },
  {
    name: "Zturbo",
    tag: "Free",
    tagColor: "bg-[#03e65b]/15 text-[#03e65b]",
    credit: "3",
    desc: "Tốc độ cao, giá rẻ, phù hợp draft và thử nghiệm nhanh",
  },
  {
    name: "Flux Pro",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: "15",
    desc: "Chất lượng flagship, ảnh sản phẩm và quảng cáo",
  },
  {
    name: "Ideogram",
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: "8",
    desc: "Typography, logo, poster có chữ Việt có dấu",
  },
  {
    name: "Recraft v3",
    tag: "Beta",
    tagColor: "bg-[#ff3386]/15 text-[#ff3386]",
    credit: "9",
    desc: "Vector & brand system, xuất SVG sạch",
  },
];

const features = [
  {
    icon: Layers,
    title: "Đa model AI một nơi",
    desc: "GPT Image, NANO BANANA, Zturbo, Flux Pro… chuyển đổi không cần đăng ký nhiều nền tảng.",
  },
  {
    icon: Wand2,
    title: "Inpaint & Upscale",
    desc: "Chỉnh sửa cục bộ bằng cọ, upscale 4× giữ chi tiết. Tất cả trong cùng một canvas.",
  },
  {
    icon: Coins,
    title: "Trả theo credit",
    desc: "Mua gói tháng hoặc top-up. Mỗi model hiển thị rõ credit trước khi generate.",
  },
  {
    icon: Users,
    title: "Community Gallery",
    desc: "Đăng ảnh công khai, xem prompt người khác dùng, re-use ngay trong Studio.",
  },
  {
    icon: Crown,
    title: "API cho Pro+",
    desc: "Tích hợp Glowstudio vào workflow marketer hoặc design system nội bộ.",
  },
  {
    icon: ImageIcon,
    title: "Thư viện cá nhân",
    desc: "Mọi ảnh generate được lưu trên cloud, riêng tư theo mặc định, tải về bất cứ lúc nào.",
  },
];

const communityFeed = [
  { src: "hero/studio-1.png", author: "Linh Nguyễn", model: "GPT Image", likes: 248, prompt: "Bento UI dashboard, soft gradient, 3D clay" },
  { src: "hero/studio-2.png", author: "Khoa Trần", model: "NANO BANANA", likes: 412, prompt: "Editorial fashion, cinematic teal & amber" },
  { src: "hero/studio-3.png", author: "Mai Phạm", model: "Flux Pro", likes: 187, prompt: "Sản phẩm skincare trên marble, soft shadow" },
  { src: "hero/studio-1.png", author: "Hùng Lê", model: "Ideogram", likes: 156, prompt: "Poster Tết 2026, typography tiếng Việt" },
  { src: "hero/studio-2.png", author: "Trang Đỗ", model: "Zturbo", likes: 94, prompt: "Moodboard concept quán cà phê Hà Nội" },
  { src: "hero/studio-3.png", author: "Sơn Bùi", model: "Recraft v3", likes: 320, prompt: "Logo + brand guideline cho studio nhỏ" },
];

const plans = [
  {
    name: "Free",
    price: "0đ",
    period: "/tháng",
    desc: "Bắt đầu thử Glowstudio, dùng model giá rẻ.",
    cta: "Đăng ký miễn phí",
    href: "/signup",
    features: [
      "100 credit khi đăng ký",
      "Model Zturbo + Ideogram",
      "Ảnh public trên Community",
      "Library cá nhân 100 ảnh",
    ],
  },
  {
    name: "Pro",
    price: "299.000đ",
    period: "/tháng",
    desc: "Cho designer & marketer cá nhân.",
    cta: "Nâng cấp Pro",
    href: "/pricing",
    featured: true,
    features: [
      "1.500 credit / tháng",
      "Tất cả model Pro (GPT Image, NANO BANANA, Flux Pro)",
      "Inpaint & upscale 4×",
      "API key + webhook",
      "Library không giới hạn",
    ],
  },
  {
    name: "Max",
    price: "799.000đ",
    period: "/tháng",
    desc: "Studio chuyên nghiệp, generate số lượng lớn.",
    cta: "Nâng cấp Max",
    href: "/pricing",
    features: [
      "5.000 credit / tháng",
      "Early access model Beta",
      "Priority queue, render nhanh hơn 3×",
      "Brand kit & style lock",
      "Hỗ trợ 1-1 qua Zalo",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Aurora ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[#7c5cff]/20 blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] h-[400px] w-[600px] rounded-full bg-[#d25fff]/10 blur-[120px]" />
      </div>

      <div className="relative">
        {/* ---------- Top nav ---------- */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button className="hidden h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white sm:flex">
                <Bell className="h-4 w-4" />
              </button>
              <Link
                href="/login"
                className="hidden h-9 items-center rounded-full px-4 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:flex"
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Bắt đầu miễn phí
              </Link>
            </div>
          </div>
        </header>

        {/* ---------- Hero ---------- */}
        <section className="relative px-6 pt-20 pb-24 sm:pt-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/30 bg-[#7c5cff]/10 px-3 py-1 text-xs text-[#c8b8ff]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7c5cff] shadow-[0_0_8px_#7c5cff]" />
                Mới · 6 model AI trong một Studio
              </div>

              <h1 className="mt-6 text-[56px] font-extrabold leading-[0.9] tracking-[-0.02em] sm:text-[78px]">
                Đa model AI,
                <br />
                <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                  một Studio.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/60">
                GPT Image, NANO BANANA, Zturbo, Flux Pro — chuyển đổi model trong một cú
                click. Tạo ảnh chuyên nghiệp cho thiết kế, marketing và thương hiệu Việt.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/studio"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-opacity hover:opacity-90"
                >
                  Mở Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/community"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/[0.08]"
                >
                  <Play className="h-4 w-4" />
                  Xem Community
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-xs text-white/40">
                <div>
                  <div className="text-[19px] font-extrabold text-white">120k+</div>
                  ảnh đã tạo
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-[19px] font-extrabold text-white">8.4k</div>
                  designer Việt
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <div className="text-[19px] font-extrabold text-white">6</div>
                  model AI
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[8.4px] border border-white/10">
                <Image
                  src="hero/hero-1.png"
                  alt="Glowstudio Studio preview"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating model picker */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#03e65b] shadow-[0_0_8px_#03e65b]" />
                  <span className="text-xs font-medium">Generating · GPT Image</span>
                </div>

                {/* Floating credit chip */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
                  <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
                  <span className="text-xs font-medium text-white">−12 credit</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Model row ---------- */}
        <section className="border-y border-white/10 bg-[#0a0a0a] px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  Models
                </p>
                <h2 className="mt-2 text-[34px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                  6 model. Một quy trình.
                </h2>
              </div>
              <Link
                href="/pricing"
                className="hidden text-sm text-white/60 transition-colors hover:text-white sm:block"
              >
                So sánh credit & giá →
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((m) => (
                <div
                  key={m.name}
                  className="group rounded-[8.4px] border border-white/10 bg-black p-5 transition-colors hover:border-[#7c5cff]/40 hover:bg-[#7c5cff]/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[19px] font-semibold leading-[1.15]">
                        {m.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/50">{m.desc}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${m.tagColor}`}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-sm">
                    <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
                    <span className="text-white/80">{m.credit} credit</span>
                    <span className="text-white/40">/ ảnh</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Why Glowstudio
              </p>
              <h2 className="mt-2 text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                Studio cho designer
                <br />
                <span className="text-white/50">và marketer Việt.</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[8.4px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="bg-black p-7 transition-colors hover:bg-[#0a0a0a]"
                  >
                    <Icon className="h-6 w-6 text-[#7c5cff]" strokeWidth={1.6} />
                    <h3 className="mt-4 text-[19px] font-semibold leading-[1.15]">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Community preview ---------- */}
        <section className="border-t border-white/10 bg-[#0a0a0a] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
                  Community
                </p>
                <h2 className="mt-2 text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                  Ảnh người khác đã tạo.
                </h2>
                <p className="mt-3 text-white/55">
                  Xem prompt, model và credit tiêu hao. Re-use ngay trong Studio của bạn.
                </p>
              </div>
              <Link
                href="/community"
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/[0.08]"
              >
                Mở Community
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Masonry-like feed */}
            <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {communityFeed.map((item, i) => (
                <Link
                  key={i}
                  href="/community"
                  className="group mb-4 block break-inside-avoid overflow-hidden rounded-[8.4px] border border-white/10 bg-black transition-colors hover:border-[#7c5cff]/40"
                >
                  <div className="relative w-full">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={item.src}
                        alt={item.prompt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span className="font-medium text-white/80">@{item.author}</span>
                      <span>·</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px]">
                        {item.model}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-white/70">
                      {item.prompt}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-white/40">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {item.likes}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Zap className="h-3 w-3" /> re-use prompt
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Pricing preview ---------- */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Pricing
              </p>
              <h2 className="mt-2 text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                Bắt đầu miễn phí. Nâng cấp khi cần.
              </h2>
              <p className="mt-3 text-white/55">
                Thanh toán MoMo, ZaloPay, VNPay. Giá hiển thị bằng VND.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={
                    "rounded-[8.4px] border bg-black p-7 transition-colors " +
                    (p.featured
                      ? "border-[#7c5cff]/60 bg-gradient-to-b from-[#7c5cff]/[0.08] to-black shadow-[0_0_60px_rgba(124,92,255,0.18)]"
                      : "border-white/10 hover:border-white/20")
                  }
                >
                  {p.featured && (
                    <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-[#7c5cff] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      <Crown className="h-3 w-3" /> Phổ biến nhất
                    </span>
                  )}
                  <h3 className="text-[19px] font-semibold leading-[1.15]">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{p.desc}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                      {p.price}
                    </span>
                    <span className="text-sm text-white/40">{p.period}</span>
                  </div>
                  <Link
                    href={p.href}
                    className={
                      "mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 " +
                      (p.featured
                        ? "bg-[#7c5cff] text-white shadow-[0_0_24px_rgba(124,92,255,0.45)]"
                        : "border border-white/15 bg-white text-black")
                    }
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-white/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-white/40">
              Cần hợp đồng doanh nghiệp?{" "}
              <Link href="/contact" className="underline-offset-4 hover:underline">
                Liên hệ Enterprise
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="border-t border-white/10 px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[8.4px] border border-white/10 bg-gradient-to-b from-[#7c5cff]/[0.10] to-black p-12 text-center">
            <h2 className="text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em] sm:text-[56px]">
              Tạo ảnh đầu tiên
              <br />
              trong hôm nay.
            </h2>
            <p className="mt-4 text-white/55">
              100 credit miễn phí khi đăng ký. Không cần thẻ tín dụng.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Đăng ký miễn phí
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/[0.08]"
              >
                Xem bảng giá
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Footer ---------- */}
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
              <Link href="/studio" className="hover:text-white">
                Studio
              </Link>
              <Link href="/community" className="hover:text-white">
                Community
              </Link>
              <Link href="/library" className="hover:text-white">
                Library
              </Link>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
              <Link href="/docs" className="hover:text-white">
                Docs
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
