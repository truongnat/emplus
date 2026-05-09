import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function TimelinePage() {
  return (
    <>
      <PageHeader
        eyebrow="Timeline"
        title="Kỷ niệm của tụi mình."
        description="Nền UI cho danh sách memories. Chưa upload media và chưa lưu dữ liệu."
      />

      <SectionTitle title="Gần đây" description="Dòng thời gian mẫu để khóa bố cục." />
      <Card accent="gold" className="space-y-4">
        {[
          ["Buổi hẹn đầu tiên", "Một chiều rất nhẹ, rất nhiều điều muốn nhớ."],
          ["Món quà nhỏ", "Một khoảnh khắc được lưu lại cho sau này."],
          ["Tin nhắn dễ thương", "Chỉ là một dòng nhắn nhưng làm ngày vui hơn."],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl bg-white/62 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="font-black">{title}</h2>
              <Badge tone="gold">Nháp</Badge>
            </div>
            <p className="text-sm leading-6 text-[color:var(--muted)]">{body}</p>
          </article>
        ))}
        <Button type="button" variant="secondary" className="w-full">
          Thêm kỷ niệm nháp
        </Button>
      </Card>
    </>
  );
}
