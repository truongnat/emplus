import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { VerifyOtpForm } from "@/features/auth/verify-otp-form";

export default function VerifyOtpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Xác minh"
        title="Nhập mã trong email."
        description="Nếu email chưa có tài khoản, backend sẽ dùng OTP để hoàn tất phiên đăng nhập hiện tại."
      />

      <Suspense
        fallback={
          <Card className="text-center text-sm font-bold text-[color:var(--muted)]">
            Đang mở màn hình xác minh...
          </Card>
        }
      >
        <VerifyOtpForm />
      </Suspense>
    </>
  );
}
