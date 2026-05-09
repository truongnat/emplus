import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";

export default function InvitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Mời người ấy"
        title="Cùng nhau mở Em+."
        description="Nền giao diện cho luồng mời. Chưa tạo mã mời hoặc gửi thông báo."
      />

      <Card className="space-y-4">
        <Input label="Email hoặc tên gợi nhớ" placeholder="nguoithuong@example.com" />
        <Button type="button" className="w-full">
          Tạo lời mời nháp
        </Button>
      </Card>

      <EmptyState
        title="Chưa có lời mời"
        description="Khi có logic backend, lời mời đang chờ sẽ xuất hiện ở đây."
        actionLabel="Xem trang Home"
        actionHref="/home"
      />
    </>
  );
}
