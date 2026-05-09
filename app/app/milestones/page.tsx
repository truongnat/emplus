import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function MilestonesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cột mốc"
        title="Những ngày đáng nhớ."
        description="Sau này cột mốc tự động sẽ được tạo từ ngày yêu, cột mốc riêng sẽ được lưu vào backend."
      />

      <section className="space-y-3">
        <SectionTitle title="Tự động" description="Mẫu hiển thị, chưa có logic tính toán." />
        <Card accent="violet" className="space-y-3">
          {["100 ngày", "365 ngày", "2 năm"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl bg-white/58 px-4 py-3">
              <span className="font-black">{item}</span>
              <Badge tone="violet">Auto</Badge>
            </div>
          ))}
        </Card>
      </section>

      <section className="space-y-3">
        <SectionTitle title="Tự tạo" description="Nút chỉ giữ chỗ cho luồng thêm sau này." />
        <Card className="space-y-4">
          <p className="text-sm leading-6 text-[color:var(--muted)]">
            Chưa có cột mốc riêng. Khi có API, phần này sẽ hỗ trợ tạo, sửa và xóa.
          </p>
          <Button type="button" variant="secondary" className="w-full">
            Thêm cột mốc nháp
          </Button>
        </Card>
      </section>
    </>
  );
}
