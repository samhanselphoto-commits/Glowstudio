import Link from "next/link";
import { InputField, ButtonPrimary, ButtonGhost } from "@/components/ui";
import { GoogleIcon, FacebookIcon } from "@/components/icons";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden flex items-center justify-center px-6 py-20">
      <BackgroundDecor />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="font-display text-[56px] md:text-[78px] leading-[0.85] tracking-[-0.04em] font-black text-aurora-hero">
            GLOWSTUDIO
          </h1>
          <p className="text-sm text-ash-text mt-3">Tạo tài khoản miễn phí</p>
        </div>

        <div className="relative animate-fade-up delay-200">
          <div
            aria-hidden
            className="absolute -inset-6 bg-aurora-violet/20 blur-3xl rounded-3xl pointer-events-none"
          />
          <div className="relative rounded-[24px] surface-aurora p-8 shadow-[0_30px_80px_-20px_rgba(124,92,255,0.4)]">
            <div className="flex flex-col gap-3">
              <ButtonGhost size="lg" className="w-full">
                <GoogleIcon className="w-5 h-5" />
                Đăng ký với Google
              </ButtonGhost>
              <ButtonGhost size="lg" className="w-full">
                <FacebookIcon className="w-5 h-5" />
                Đăng ký với Facebook
              </ButtonGhost>
            </div>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-mist/20" />
              <span className="text-xs text-charcoal-mute">hoặc</span>
              <div className="flex-1 h-px bg-mist/20" />
            </div>

            <form className="flex flex-col gap-4">
              <InputField label="Họ và tên" placeholder="Nguyễn Văn A" />
              <InputField label="Email" type="email" placeholder="ten@example.com" />
              <InputField label="Mật khẩu" type="password" placeholder="••••••••" />
              <p className="text-xs text-charcoal-mute">
                Bằng việc đăng ký, bạn đồng ý với{" "}
                <Link href="/terms" className="text-aurora-violet hover:underline">
                  Điều khoản
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-aurora-violet hover:underline">
                  Chính sách bảo mật
                </Link>
                .
              </p>
              <ButtonPrimary size="lg" className="w-full mt-2 shimmer-on-hover">
                Tạo tài khoản
              </ButtonPrimary>
            </form>

            <p className="text-sm text-ash-text text-center mt-6">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-aurora-violet hover:underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 bg-aurora-auth"
        style={{ backgroundSize: "120% 120%" }}
      />
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-neon-magenta/35 blur-[140px] animate-float" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-aurora-violet/30 blur-[140px] animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyber-cyan/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute inset-0 bg-noise opacity-50" />
    </div>
  );
}
