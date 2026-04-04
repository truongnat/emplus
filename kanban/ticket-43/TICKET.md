# Ticket 43 — Chi tiết kỷ niệm: toàn bộ ảnh dạng bento grid

## Metadata

- **ticket_id**: 43
- **status**: done
- **domain_stack**: `mobile` (Expo)
- **opened**: 2026-04-04

## Intake

- **Yêu cầu:** Màn **chi tiết timeline** (`/memory/[id]`) hiển thị **tất cả** ảnh theo **bento grid** (ô không đều / lưới có nhịp), không chỉ hero + badge `+N`.
- **Giữ:** Chạm ô → mở `TimelineImageViewer` đúng index.

## Acceptance

- [x] 1–4 ảnh: layout bento rõ (1 hero, 2 cột, 3 kiểu “lớn + 2 xếp”, 2×2).
- [x] ≥5 ảnh: các hàng 3 ô (và 2×2 khi còn 4), hàng cuối chứa phần dư; mọi ảnh đều hiển thị.
- [x] Gap, bo góc, `cover` đồng bộ tone app; `tsc` mobile pass.

## Implementation

- `mobile/src/features/timeline/components/MemoryDetailBentoGrid.tsx` — component thuần layout + `expo-image`.
- `mobile/app/memory/[id].tsx` — thay hero đơn bằng `MemoryDetailBentoGrid`.
- `mobile/src/features/timeline/index.ts` — export component.

## Verify

- `cd mobile && bunx tsc --noEmit`

## Closed

- **closed:** 2026-04-04

## Residual

- Ảnh rất nhiều (>12) vẫn cuộn theo `ScrollView`; có thể thêm “lazy” sau nếu cần perf.
