import Link from "next/link";
import { InputField, ButtonPrimary, ButtonGhost } from "@/components/ui";
import { GoogleIcon, FacebookIcon } from "@/components/icons";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-6 py-20">
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
            <ButtonGhost size="lg" className="w-full">
              <GoogleIcon className="w-5 h-5" />
              Tiếp tục với Google
            </ButtonGhost>
            <ButtonGhost size="lg" className="w-full">
              <FacebookIcon className="w-5 h-5" />
              Tiếp tục với Facebook
            </ButtonGhost>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-mist/20" />
            <span className="text-xs text-charcoal-mute">hoặc</span>
            <div className="flex-1 h-px bg-mist/20" />
          </div>

          <form className="flex flex-col gap-4">
            <InputField label="Email" type="email" placeholder="ten@example.com" />
            <InputField label="Mật khẩu" type="password" placeholder="••••••••" />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ash-text">
                <input
                  type="checkbox"
                  className="rounded border-mist bg-obsidian accent-aurora-violet"
                />
                Ghi nhớ đăng nhập
              </label>
              <Link
                href="/forgot-password"
                className="text-aurora-violet hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <ButtonPrimary size="lg" className="w-full mt-2">
              Đăng nhập
            </ButtonPrimary>
          </form>

          <p className="text-sm text-ash-text text-center mt-6">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-aurora-violet hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
