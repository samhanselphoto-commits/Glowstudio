import Link from "next/link";
import {
  Sparkles,
  Check,
  X,
  Crown,
  Coins,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Building2,
} from "lucide-react";

/* ---------- Data ---------- */

const plans = [
  {
    name: "Free",
    price: "0đ",
    period: "vĩnh viễn",
    desc: "Bắt đầu thử Glowstudio, dùng model giá rẻ.",
    cta: "Đăng ký miễn phí",
    href: "/signup",
    ctaStyle: "border",
    features: [
      { text: "100 credit khi đăng ký", ok: true },
      { text: "Model Zturbo + Ideogram", ok: true },
      { text: "Ảnh public trên Community", ok: true },
      { text: "Library cá nhân 100 ảnh", ok: true },
      { text: "GPT Image & NANO BANANA", ok: false },
      { text: "API key", ok: false },
      { text: "Priority queue", ok: false },
    ],
  },
  {
    name: "Pro",
    price: "299.000đ",
    period: "/tháng",
    desc: "Cho designer & marketer cá nhân.",
    cta: "Nâng cấp Pro",
    href: "/checkout?plan=pro",
    ctaStyle: "filled",
    featured: true,
    features: [
      { text: "1.500 credit / tháng", ok: true },
      { text: "Tất cả model Pro (GPT Image, NANO BANANA, Flux Pro)", ok: true },
      { text: "Inpaint & upscale 4×", ok: true },
      { text: "API key + webhook", ok: true },
      { text: "Library không giới hạn", ok: true },
      { text: "Early access model Beta", ok: false },
      { text: "Priority queue 3×", ok: false },
    ],
  },
  {
    name: "Max",
    price: "799.000đ",
    period: "/tháng",
    desc: "Studio chuyên nghiệp, generate số lượng lớn.",
    cta: "Nâng cấp Max",
    href: "/checkout?plan=max",
    ctaStyle: "violet",
    features: [
      { text: "5.000 credit / tháng", ok: true },
      { text: "Tất cả model bao gồm Beta", ok: true },
      { text: "Inpaint & upscale 4×", ok: true },
      { text: "API key + webhook + batch", ok: true },
      { text: "Library không giới hạn", ok: true },
      { text: "Early access model Beta", ok: true },
      { text: "Priority queue, render nhanh hơn 3×", ok: true },
    ],
  },
];

const enterpriseFeatures = [
  "Credit không giới hạn, hợp đồng theo tháng",
  "Private model (fine-tune riêng cho brand)",
  "SSO, audit log, role-based access",
  "Hỗ trợ 24/7 qua Slack/Teams dedicated",
  "SLA 99.9%, xử lý theo yêu cầu",
  "Tích hợp custom vào hệ thống nội bộ",
];

const compareRows = [
  { label: "Credit / tháng", free: "100", pro: "1.500", max: "5.000" },
  { label: "Model miễn phí (Zturbo, Ideogram)", free: "✓", pro: "✓", max: "✓" },
  { label: "Model Pro (GPT Image, NANO BANANA, Flux Pro)", free: "—", pro: "✓", max: "✓" },
  { label: "Model Beta", free: "—", pro: "—", max: "✓" },
  { label: "Inpaint", free: "—", pro: "✓", max: "✓" },
  { label: "Upscale 4×", free: "—", pro: "✓", max: "✓" },
  { label: "API key", free: "—", pro: "✓", max: "✓" },
  { label: "Brand kit & style lock", free: "—", pro: "—", max: "✓" },
  { label: "Priority queue", free: "—", pro: "—", max: "3×" },
  { label: "Hỗ trợ", free: "Cộng đồng", pro: "Email 24h", max: "Zalo 1-1" },
];

const faqs = [
  {
    q: "Credit là gì và dùng như thế nào?",
    a: "Mỗi model AI tiêu hao một lượng credit khác nhau cho mỗi ảnh. Zturbo 3 credit, Ideogram 8, GPT Image 12, NANO BANANA 10, Flux Pro 15. Credit được cộng đầu tháng, không cộng dồn nhiều tháng nếu dùng gói tháng.",
  },
  {
    q: "Tôi có thể mua thêm credit ngoài gói tháng không?",
    a: "Có. Bạn có thể top-up credit bất cứ lúc nào với mệnh giá từ 100.000đ. Credit top-up không hết hạn và dùng được cho mọi model.",
  },
  {
    q: "Các model Pro có cần nâng cấp tài khoản không?",
    a: "Có. GPT Image, NANO BANANA, Flux Pro yêu cầu gói Pro trở lên. Tài khoản Free chỉ dùng được Zturbo và Ideogram. Bạn có thể dùng thử 1 ảnh Pro miễn phí khi đăng ký.",
  },
  {
    q: "Thanh toán qua đâu? Có hỗ trợ xuất hóa đơn VAT không?",
    a: "Chúng tôi hỗ trợ MoMo, ZaloPay, VNPay, và chuyển khoản ngân hàng. Xuất hóa đơn VAT cho doanh nghiệp có sẵn, vui lòng liên hệ sales@glowstudio.vn.",
  },
  {
    q: "Tôi có thể hủy gói bất cứ lúc không?",
    a: "Có. Hủy trong phần Cài đặt > Billing, hiệu lực đến hết chu kỳ thanh toán hiện tại. Credit chưa dùng trong tháng sẽ được giữ đến hết tháng.",
  },
  {
    q: "API có giới hạn gì không?",
    a: "Gói Pro giới hạn 1.000 request/ngày, Max là 10.000. Enterprise không giới hạn. Tài liệu API có tại docs.glowstudio.vn.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[#7c5cff]/20 blur-[140px]" />
      </div>

      <div className="relative">
        {/* Top nav (shared) */}
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
              <Link href="/pricing" className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Pricing</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden h-9 items-center rounded-full px-4 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:flex">Đăng nhập</Link>
              <Link href="/signup" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90">Bắt đầu miễn phí</Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 pt-20 pb-12 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/30 bg-[#7c5cff]/10 px-3 py-1 text-xs text-[#c8b8ff]">
              <Coins className="h-3 w-3" /> Giá hiển thị bằng VND · chưa bao gồm VAT
            </div>
            <h1 className="mt-6 text-[56px] font-extrabold leading-[0.9] tracking-[-0.02em] sm:text-[78px]">
              Bắt đầu miễn phí.
              <br />
              <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                Nâng cấp khi cần.
              </span>
            </h1>
            <p className="mt-5 text-white/55">
              Trả theo credit, không giới hạn model trong cùng một gói. Thanh toán MoMo, ZaloPay, VNPay.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={
                  "relative rounded-[8.4px] border bg-black p-7 transition-colors " +
                  (p.featured
                    ? "border-[#7c5cff]/60 bg-gradient-to-b from-[#7c5cff]/[0.08] to-black shadow-[0_0_60px_rgba(124,92,255,0.18)]"
                    : "border-white/10 hover:border-white/20")
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-[#7c5cff] px-3 py-1 text-[10px] font-semibold text-white shadow-[0_0_24px_rgba(124,92,255,0.45)]">
                    <Crown className="h-3 w-3" /> Phổ biến nhất
                  </span>
                )}
                <h3 className="text-[19px] font-semibold leading-[1.15]">{p.name}</h3>
                <p className="mt-1 text-sm text-white/50">{p.desc}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[56px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                    {p.price}
                  </span>
                  <span className="text-sm text-white/40">{p.period}</span>
                </div>
                <Link
                  href={p.href}
                  className={
                    "mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 " +
                    (p.ctaStyle === "filled"
                      ? "border border-white/15 bg-white text-black"
                      : p.ctaStyle === "violet"
                      ? "bg-[#7c5cff] text-white shadow-[0_0_24px_rgba(124,92,255,0.45)]"
                      : "border border-white/15 bg-transparent text-white")
                  }
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      {f.ok ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-white/20" />
                      )}
                      <span className={f.ok ? "text-white/75" : "text-white/35 line-through"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-xs text-white/50">
            <span>Thanh toán qua:</span>
            {["MoMo", "ZaloPay", "VNPay", "Chuyển khoản"].map((m) => (
              <span key={m} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/70">
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* Compare table */}
        <section className="border-y border-white/10 bg-[#0a0a0a] px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                So sánh
              </p>
              <h2 className="mt-2 text-[34px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                Tính năng theo gói
              </h2>
            </div>

            <div className="overflow-hidden rounded-[8.4px] border border-white/10 bg-black">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                    <th className="px-5 py-4 font-medium">Tính năng</th>
                    <th className="px-5 py-4 font-medium">Free</th>
                    <th className="px-5 py-4 font-medium text-[#7c5cff]">Pro</th>
                    <th className="px-5 py-4 font-medium">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3.5 text-white/70">{row.label}</td>
                      <td className="px-5 py-3.5 text-white/50">{row.free}</td>
                      <td className="px-5 py-3.5 text-white">{row.pro}</td>
                      <td className="px-5 py-3.5 text-white">{row.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-[8.4px] border border-white/10 bg-gradient-to-b from-[#0a0a0a] to-black p-10 lg:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/30 bg-[#7c5cff]/10 px-3 py-1 text-xs text-[#c8b8ff]">
                  <Building2 className="h-3 w-3" /> Enterprise · B2B
                </div>
                <h2 className="mt-5 text-[34px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                  Cho team và doanh nghiệp.
                </h2>
                <p className="mt-3 text-white/55">
                  Hợp đồng theo năm, hóa đơn VAT, SSO và private model theo brand. Báo giá tùy usage.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/[0.08]"
                >
                  Liên hệ sales
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="space-y-2.5 text-sm">
                {enterpriseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#03e65b]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 bg-[#0a0a0a] px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#7c5cff]" />
              <h2 className="text-[34px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                Câu hỏi thường gặp
              </h2>
            </div>
            <div className="space-y-2">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-[8.4px] border border-white/10 bg-black p-5 transition-colors hover:border-white/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">{f.q}</span>
                    <ChevronDown className="h-4 w-4 text-white/40 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20">
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
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/[0.08]"
              >
                Liên hệ Enterprise
              </Link>
            </div>
          </div>
        </section>

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
