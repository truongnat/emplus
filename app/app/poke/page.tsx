import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default function PokePage() {
  return (
    <>
      <PageHeader
        eyebrow="Poke"
        title="Nhắc yêu thật nhẹ."
        description="Poke/Nudge sẽ được lưu backend sau này. Giai đoạn này không dùng WebSocket."
        badge="No API"
      />

      <Card accent="rose" className="space-y-4 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[color:var(--soft)] text-5xl">
          ♡
        </div>
        <div>
          <h2 className="text-2xl font-black">Gửi một cái chạm nhẹ</h2>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            Nút này chỉ là trạng thái UI, chưa gửi dữ liệu.
          </p>
        </div>
        <Button type="button" className="w-full">
          Poke người ấy
        </Button>
      </Card>

      <EmptyState
        title="Chưa có lịch sử poke"
        description="Khi module nudges được thêm, lịch sử sẽ xuất hiện ở đây."
      />
      <div className="flex justify-center">
        <Badge tone="neutral">Phase 1: refetch, không WebSocket</Badge>
      </div>
    </>
  );
}
