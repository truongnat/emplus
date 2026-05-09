import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tài khoản"
        title="Tạo không gian cho hai người."
        description="Biểu mẫu chỉ là nền UI. Chưa tạo tài khoản, chưa gọi backend."
      />

      <Card className="space-y-4">
        <Input label="Tên của bạn" placeholder="Ví dụ: Linh" />
        <Input label="Email" placeholder="ban@example.com" type="email" />
        <Input label="Mật khẩu" placeholder="Tối thiểu 8 ký tự" type="password" />
        <Button type="button" className="w-full">
          Tiếp tục
        </Button>
        <Button href="/login" variant="ghost" className="w-full">
          Mình đã có tài khoản
        </Button>
      </Card>
    </>
  );
}
