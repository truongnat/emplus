import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { StatCard } from "@/components/ui/stat-card";

export default function IndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Em+"
        title="Một góc nhỏ cho hai người."
        description="Nơi lưu ngày yêu, kỷ niệm, cột mốc và những lần nhắc yêu thật nhẹ."
        badge="PWA MVP"
      />

      <Card accent="rose" className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[color:var(--muted)]">Hôm nay tụi mình</p>
            <p className="mt-1 text-5xl font-black leading-none text-[color:var(--rose-deep)]">
              365
            </p>
            <p className="mt-1 text-sm font-black text-[color:var(--rose-deep)]">ngày bên nhau</p>
          </div>
          <div className="rounded-full bg-[color:var(--soft)] px-4 py-3 text-center">
            <p className="text-2xl font-black text-[color:var(--rose)]">+</p>
            <p className="text-xs font-black text-[color:var(--muted)]">ấm áp</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Cột mốc" value="04" helper="đang chờ" tone="violet" />
          <StatCard label="Kỷ niệm" value="12" helper="đã lưu" tone="gold" />
        </div>

        <Button href="/login">Bắt đầu nhẹ nhàng</Button>
      </Card>

      <section className="space-y-3">
        <SectionTitle title="MVP chỉ tập trung vào điều cần thiết" />
        <div className="flex flex-wrap gap-2">
          <Badge>Đếm ngày yêu</Badge>
          <Badge tone="violet">Cột mốc</Badge>
          <Badge tone="gold">Timeline</Badge>
          <Badge tone="neutral">Poke</Badge>
        </div>
      </section>
    </>
  );
}
