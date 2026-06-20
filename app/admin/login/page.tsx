"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ShieldCheck, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { cn } from "@/lib/cn";

const DEMO_ACCOUNTS = [
  { label: "Super Admin", email: "admin@glowstudio.vn", password: "Glowstudio@2026" },
  { label: "Moderator", email: "mod@glowstudio.vn", password: "Mod@2026" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const { admin, hydrated, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && admin) router.replace("/admin");
  }, [hydrated, admin, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Mock latency
    await new Promise((r) => setTimeout(r, 600));
    const res = login(email, password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Đăng nhập thất bại");
      return;
    }
    router.replace("/admin");
  }

  function fillDemo(acct: { email: string; password: string }) {
    setEmail(acct.email);
    setPassword(acct.password);
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#7c5cff]/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[600px] rounded-full bg-[#d25fff]/10 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
              <span className="ml-2 rounded-full border border-[#7c5cff]/40 bg-[#7c5cff]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#a98bff]">
                Admin
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              ← Về trang chính
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#7c5cff]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
                Admin Console
              </p>
            </div>
            <h1 className="text-[36px] font-extrabold leading-[0.95] tracking-[-0.02em]">
              Đăng nhập
              <br />
              <span className="bg-gradient-to-r from-[#7c5cff] via-[#a98bff] to-[#d25fff] bg-clip-text text-transparent">
                Admin Panel.
              </span>
            </h1>
            <p className="mt-3 text-sm text-white/55">
              Quản lý users, credits, content và hệ thống Glowstudio.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Email admin
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@glowstudio.vn"
                  className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#7c5cff]/60"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5 pr-10 text-sm text-white placeholder-white/30 outline-none focus:border-[#7c5cff]/60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className={cn("flex items-start gap-2 rounded-md border border-[#ff5d4b]/30 bg-[#ff5d4b]/10 px-3 py-2 text-[12px] text-[#ff9a8a]")}>
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#7c5cff] text-sm font-semibold text-white transition-all hover:bg-[#8a6dff] disabled:opacity-50"
              >
                {loading ? "Đang đăng nhập…" : "Đăng nhập"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-8 rounded-md border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Demo accounts (click để autofill)
              </p>
              <div className="space-y-2">
                {DEMO_ACCOUNTS.map((a) => (
                  <button
                    key={a.email}
                    type="button"
                    onClick={() => fillDemo(a)}
                    className="flex w-full items-center justify-between gap-3 rounded border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[12px] transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="font-medium text-white/85">{a.label}</span>
                    <span className="font-mono text-white/50">{a.email}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-white/30">
                Mock auth — base64 hash, không phải real security.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
