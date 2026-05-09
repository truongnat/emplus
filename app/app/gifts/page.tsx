import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function GiftsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gợi ý quà"
        title="Nhỏ thôi, nhưng đúng lúc."
        description="Gợi ý quà sẽ đến từ static config backend. Không scraping TikTok/Shopee."
      />

      <SectionTitle title="Gần cột mốc" description="Thẻ mẫu cho UI foundation." />
      <Card accent="gold" className="space-y-3">
        {["Album ảnh mini", "Vòng tay đôi", "Một hộp thư tay"].map((gift) => (
          <div key={gift} className="flex items-center justify-between rounded-2xl bg-white/62 px-4 py-3">
            <div>
              <p className="font-black">{gift}</p>
              <p className="text-xs font-bold text-[color:var(--muted)]">Link ngoài sau này</p>
            </div>
            <Badge tone="gold">Static</Badge>
          </div>
        ))}
        <Button type="button" variant="secondary" className="w-full">
          Xem gợi ý nháp
        </Button>
      </Card>
    </>
  );
}
