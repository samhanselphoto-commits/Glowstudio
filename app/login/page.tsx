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
  Github,
  Chrome,
  Coins,
  Check,
} from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPassword = password.length >= 6;
  const canSubmit = validEmail && validPassword && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    // Mock submit — would POST /api/auth/login in real app
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast({ type: "success", message: "Đăng nhập thành công (mock)" });
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-10%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#7c5cff]/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[600px] rounded-full bg-[#d25fff]/10 blur-[120px]" />
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
              href="/signup"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Chưa có tài khoản?{" "}
              <span className="text-white underline-offset-4 hover:underline">Đăng ký</span>
            </Link>
          </div>
        </header>

        {/* Body */}
        <main className="grid flex-1 lg:grid-cols-2">
          {/* Form side */}
          <section className="flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
                Welcome back
              </p>
              <h1 className="mt-3 text-[40px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                Đăng nhập
                <br />
                <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                  Glowstudio.
                </span>
              </h1>
              <p className="mt-4 text-sm text-white/55">
                Tiếp tục sáng tạo với 6 model AI trong một Studio.
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
                  {email && !validEmail && (
                    <p className="mt-1 text-[11px] text-[#ff9a8a]">Email chưa hợp lệ</p>
                  )}
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-[11px] font-semibold uppercase tracking-wider text-white/40"
                    >
                      Mật khẩu
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] text-white/40 transition-colors hover:text-white"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
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
                      autoComplete="current-password"
                      placeholder="••••••••"
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
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  {password && !validPassword && (
                    <p className="mt-1 text-[11px] text-[#ff9a8a]">
                      Mật khẩu tối thiểu 6 ký tự
                    </p>
                  )}
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-xs text-white/60">
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                      remember
                        ? "border-[#7c5cff] bg-[#7c5cff]"
                        : "border-white/20 bg-white/[0.04]"
                    )}
                  >
                    {remember && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only"
                  />
                  Ghi nhớ đăng nhập trên thiết bị này
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
                      Đang đăng nhập…
                    </>
                  ) : (
                    <>
                      Đăng nhập
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-[11px] text-white/40">
                Bằng việc đăng nhập, bạn đồng ý với{" "}
                <Link href="/terms" className="underline-offset-4 hover:underline">
                  Điều khoản
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="underline-offset-4 hover:underline">
                  Chính sách bảo mật
                </Link>{" "}
                của Glowstudio.
              </p>
            </div>
          </section>

          {/* Visual side */}
          <aside className="relative hidden border-l border-white/10 lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c5cff]/[0.12] via-black to-[#d25fff]/[0.08]" />
            <div className="relative flex h-full flex-col justify-between p-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#7c5cff]/30 bg-[#7c5cff]/10 px-3 py-1 text-xs text-[#c8b8ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7c5cff] shadow-[0_0_8px_#7c5cff]" />
                  Mới · 6 model AI trong một Studio
                </div>
                <h2 className="mt-6 text-[42px] font-extrabold leading-[0.92] tracking-[-0.02em]">
                  Tạo ảnh nhanh.
                  <br />
                  <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                    Chuẩn brand.
                  </span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
                  GPT Image, NANO BANANA, Zturbo, Flux Pro — chuyển model trong một cú click.
                  Trả theo credit, không cần đăng ký nhiều nền tảng.
                </p>
              </div>

              {/* Mini showcase */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { src: "hero/studio-1.png", label: "GPT Image" },
                  { src: "hero/studio-2.png", label: "NANO BANANA" },
                  { src: "hero/studio-3.png", label: "Flux Pro" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-[8.4px] border border-white/10 bg-black"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.src}
                        alt={m.label}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-2 text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#03e65b]" />
                      <span className="text-white/70">{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-[8.4px] border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ffc533]/15">
                  <Coins className="h-4 w-4 text-[#ffc533]" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">100 credit miễn phí</div>
                  <div className="text-white/50">
                    Còn lại trong tài khoản của bạn sau khi đăng nhập.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
