"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Github,
  Chrome,
  Coins,
  Check,
  Sparkle,
  Wand2,
  Layers,
  Users,
} from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";

const benefits = [
  { icon: Coins, text: "100 credit miễn phí khi đăng ký" },
  { icon: Wand2, text: "Tạo ảnh với 6 model AI hàng đầu" },
  { icon: Layers, text: "Inpaint & upscale 4× không giới hạn trial" },
  { icon: Users, text: "Đăng ảnh lên Community, xem prompt người khác" },
];

const passwordRules = [
  { id: "len", label: "Ít nhất 8 ký tự", test: (p: string) => p.length >= 8 },
  { id: "num", label: "Có ít nhất 1 chữ số", test: (p: string) => /\d/.test(p) },
  { id: "mix", label: "Có chữ hoa và chữ thường", test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validName = name.trim().length >= 2;
  const validPassword = passwordRules.every((r) => r.test(password));
  const canSubmit = validEmail && validName && validPassword && agree && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    // Mock submit — would POST /api/auth/signup in real app
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast({
      type: "credit",
      message: "Đăng ký thành công (mock) — +100 credit",
    });
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-10%] left-[20%] h-[500px] w-[800px] rounded-full bg-[#7c5cff]/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-[400px] w-[600px] rounded-full bg-[#d25fff]/10 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        {/* Top nav */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
            </Link>
            <Link
              href="/login"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Đã có tài khoản?{" "}
              <span className="text-white underline-offset-4 hover:underline">Đăng nhập</span>
            </Link>
          </div>
        </header>

        {/* Body */}
        <main className="grid flex-1 lg:grid-cols-2">
          {/* Form side */}
          <section className="flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
                Bắt đầu miễn phí
              </p>
              <h1 className="mt-3 text-[40px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                Tạo tài khoản
                <br />
                <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                  trong 30 giây.
                </span>
              </h1>
              <p className="mt-4 text-sm text-white/55">
                100 credit miễn phí · không cần thẻ tín dụng · huỷ bất cứ lúc nào.
              </p>

              {/* OAuth */}
              <div className="mt-8 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    toast({ type: "info", message: "Google OAuth sẽ có trong bản kế tiếp" })
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.08]"
                >
                  <Chrome className="h-4 w-4" /> Google
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast({ type: "info", message: "GitHub OAuth sẽ có trong bản kế tiếp" })
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.08]"
                >
                  <Github className="h-4 w-4" /> GitHub
                </button>
              </div>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11px] uppercase tracking-wider text-white/40">
                  hoặc email
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40"
                  >
                    Họ và tên
                  </label>
                  <div
                    className={cn(
                      "relative flex items-center rounded-md border bg-white/[0.03] transition-colors",
                      name && !validName
                        ? "border-[#ff5d4b]/50"
                        : "border-white/10 focus-within:border-[#7c5cff]/60"
                    )}
                  >
                    <User className="absolute left-3 h-4 w-4 text-white/40" />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md bg-transparent py-2.5 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40"
                  >
                    Email
                  </label>
                  <div
                    className={cn(
                      "relative flex items-center rounded-md border bg-white/[0.03] transition-colors",
                      email && !validEmail
                        ? "border-[#ff5d4b]/50"
                        : "border-white/10 focus-within:border-[#7c5cff]/60"
                    )}
                  >
                    <Mail className="absolute left-3 h-4 w-4 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@glowstudio.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md bg-transparent py-2.5 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40"
                  >
                    Mật khẩu
                  </label>
                  <div
                    className={cn(
                      "relative flex items-center rounded-md border bg-white/[0.03] transition-colors",
                      password && !validPassword
                        ? "border-[#ff5d4b]/50"
                        : "border-white/10 focus-within:border-[#7c5cff]/60"
                    )}
                  >
                    <Lock className="absolute left-3 h-4 w-4 text-white/40" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Tối thiểu 8 ký tự"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md bg-transparent py-2.5 pl-10 pr-10 text-sm text-white placeholder-white/30 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Password rules */}
                  {password.length > 0 && (
                    <ul className="mt-2 space-y-1 text-[11px]">
                      {passwordRules.map((r) => {
                        const ok = r.test(password);
                        return (
                          <li
                            key={r.id}
                            className={cn(
                              "flex items-center gap-1.5 transition-colors",
                              ok ? "text-[#03e65b]" : "text-white/40"
                            )}
                          >
                            <Check className="h-3 w-3" strokeWidth={ok ? 3 : 2} />
                            {r.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <label className="flex cursor-pointer items-start gap-2 text-xs text-white/60">
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                      agree
                        ? "border-[#7c5cff] bg-[#7c5cff]"
                        : "border-white/20 bg-white/[0.04]"
                    )}
                  >
                    {agree && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="sr-only"
                  />
                  <span>
                    Tôi đồng ý với{" "}
                    <Link href="/terms" className="text-white underline-offset-4 hover:underline">
                      Điều khoản dịch vụ
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/privacy"
                      className="text-white underline-offset-4 hover:underline"
                    >
                      Chính sách bảo mật
                    </Link>{" "}
                    của Glowstudio.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={cn(
                    "mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-opacity",
                    canSubmit
                      ? "bg-white text-black hover:opacity-90"
                      : "cursor-not-allowed bg-white/10 text-white/30"
                  )}
                >
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Đang tạo tài khoản…
                    </>
                  ) : (
                    <>
                      Tạo tài khoản
                      <Sparkle className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* Visual side */}
          <aside className="relative hidden border-l border-white/10 lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c5cff]/[0.10] via-black to-[#d25fff]/[0.10]" />
            <div className="relative flex h-full flex-col justify-between p-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#03e65b]/30 bg-[#03e65b]/10 px-3 py-1 text-xs text-[#7cffaa]">
                  <Coins className="h-3 w-3" />
                  +100 credit khi đăng ký
                </div>
                <h2 className="mt-6 text-[42px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                  Bạn sẽ nhận được
                  <br />
                  <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                    ngay bây giờ.
                  </span>
                </h2>

                <ul className="mt-8 space-y-3">
                  {benefits.map((b) => {
                    const Icon = b.icon;
                    return (
                      <li
                        key={b.text}
                        className="flex items-start gap-3 rounded-[8.4px] border border-white/10 bg-black/40 p-3.5 backdrop-blur-md"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#7c5cff]/15 text-[#a98bff]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="pt-0.5 text-sm text-white/80">{b.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Credit bonus highlight */}
              <div className="rounded-[8.4px] border border-[#7c5cff]/40 bg-gradient-to-br from-[#7c5cff]/[0.12] to-black p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c8b8ff]">
                      Welcome bonus
                    </div>
                    <div className="mt-1 text-[34px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                      100 credit
                    </div>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffc533]/15 shadow-[0_0_24px_rgba(255,197,51,0.3)]">
                    <Coins className="h-6 w-6 text-[#ffc533]" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/55">
                  Dùng được cho mọi model — Zturbo 3, Ideogram 8, GPT Image 12 credit / ảnh.
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
