import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { StatCard } from "@/components/ui/stat-card";

export default function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hôm nay"
        title="Mình đã bên nhau 365 ngày."
        description="Dữ liệu minh họa cho nền UI. Chưa tính ngày thật và chưa gọi API."
        badge="Bản nháp"
      />

      <Card accent="rose" className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Năm" value="01" helper="ấm áp" />
          <StatCard label="Tháng" value="12" helper="đã qua" tone="violet" />
          <StatCard label="Ngày" value="365" helper="bên nhau" tone="gold" />
        </div>
        <Button href="/poke" className="w-full">
          Gửi một poke nhẹ
        </Button>
      </Card>

      <section className="space-y-3">
        <SectionTitle title="Sắp tới" description="Các cột mốc mẫu cho giao diện." />
        <Card className="space-y-3">
          {["400 ngày bên nhau", "Kỷ niệm 15 tháng", "Một buổi hẹn cuối tuần"].map((item) => (
            <div key={item} className="flex items-center justify-between gap-3">
              <p className="text-sm font-black">{item}</p>
              <Badge tone="neutral">Nháp</Badge>
            </div>
          ))}
        </Card>
      </section>
    </>
  );
}
