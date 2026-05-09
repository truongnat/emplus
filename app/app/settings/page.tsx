import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cài đặt"
        title="Không gian của hai người."
        description="Cài đặt mẫu cho profile, trạng thái cài app và thông báo sau này."
      />

      <Card className="space-y-4">
        <Input label="Tên cặp đôi" placeholder="Linh & Minh" />
        <Input label="Ngày bắt đầu" type="date" />
        <Button type="button" className="w-full">
          Lưu nháp giao diện
        </Button>
      </Card>

      <section className="space-y-3">
        <SectionTitle title="Trạng thái" />
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <Badge tone="neutral">PWA</Badge>
            <p className="mt-3 text-sm font-black">Cài đặt sau</p>
          </Card>
          <Card className="p-4">
            <Badge tone="violet">Push</Badge>
            <p className="mt-3 text-sm font-black">Phase 2</p>
          </Card>
        </div>
      </section>
    </>
  );
}
