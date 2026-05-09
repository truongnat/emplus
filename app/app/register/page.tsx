import { PageHeader } from "@/components/layout/page-header";
import { RegisterForm } from "@/features/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tài khoản"
        title="Tạo không gian cho hai người."
        description="Tạo tài khoản Em+ bằng email, rồi mình sẽ thiết lập ngày yêu ở bước kế tiếp."
      />

      <RegisterForm />
    </>
  );
}
