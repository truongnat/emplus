import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SetupPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thiết lập"
        title="Ngày bắt đầu yêu."
        description="Sau này ngày này sẽ là nguồn cho bộ đếm và cột mốc tự động."
        badge="Chưa lưu"
      />

      <Card className="space-y-4" accent="violet">
        <Input label="Tên cặp đôi" placeholder="Ví dụ: Linh & Minh" />
        <Input label="Ngày yêu" type="date" hint="Chỉ hiển thị giao diện, chưa lưu dữ liệu." />
        <div className="flex flex-wrap gap-2">
          <Badge>Đếm ngày</Badge>
          <Badge tone="violet">Cột mốc tự động</Badge>
        </div>
        <Button href="/invite" className="w-full">
          Xem bước mời người ấy
        </Button>
      </Card>
    </>
  );
}
