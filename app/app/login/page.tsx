import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Đăng nhập"
        title="Chào mừng bạn quay lại."
        description="Màn hình tĩnh để khóa hướng UI. Chưa có xử lý đăng nhập hoặc gọi API."
      />

      <Card className="space-y-4">
        <Input label="Email" placeholder="ban@example.com" type="email" />
        <Input label="Mật khẩu" placeholder="Chưa xử lý xác thực" type="password" />
        <Button type="button" className="w-full">
          Xem giao diện
        </Button>
        <Button href="/register" variant="ghost" className="w-full">
          Tạo tài khoản mới
        </Button>
      </Card>
    </>
  );
}
