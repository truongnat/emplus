import { PageHeader } from "@/components/layout/page-header";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Đăng nhập"
        title="Chào mừng bạn quay lại."
        description="Nhập email và mật khẩu để trở về không gian riêng của hai người."
      />

      <LoginForm />
    </>
  );
}
