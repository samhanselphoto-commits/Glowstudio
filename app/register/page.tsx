import Link from "next/link";
import { InputField, ButtonPrimary, ButtonGhost } from "@/components/ui";
import { GoogleIcon, FacebookIcon } from "@/components/icons";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-[44px] leading-[0.9] tracking-[-0.02em] font-extrabold text-aurora-violet">
            GLOWSTUDIO
          </h1>
          <p className="text-sm text-ash-text mt-3">Tạo tài khoản miễn phí</p>
        </div>

        <div className="rounded-[20px] bg-charcoal border border-mist/10 p-8">
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
            <ButtonPrimary size="lg" className="w-full mt-2">
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
    </main>
  );
}
