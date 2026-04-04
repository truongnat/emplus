# Ticket 36 — Timeline: nhiều ảnh trên thẻ + preview nhiều ảnh

## Metadata

- **ticket_id**: 36
- **status**: done
- **domain_stack**: mobile (Expo) + api (demo seed)
- **closed**: 2026-04-04

## Spec

- Thẻ timeline hiển thị **đủ các ảnh** của một memory (carousel ngang full width trong vùng ảnh), không chỉ ảnh đầu + badge số lượng.
- Tap từng ảnh mở **fullscreen preview** đúng **index**; vuốt ngang trong preview vẫn xem được toàn bộ ảnh (`TimelineImageViewer`).

## Acceptance criteria

1. Memory có `mediaUrls.length > 1`: thấy ít nhất 2 ảnh (vuốt ngang trên thẻ), badge số ảnh vẫn hiển thị.
2. Tap ảnh thứ 2 → preview mở đúng ảnh thứ 2; vuốt trong preview chuyển ảnh.
3. Memory một ảnh: hành vi như cũ (không carousel).
4. Demo API: ít nhất một memory seed có nhiều URL để QA không cần DB tay.

## Task breakdown

- [x] `TimelineItem`: carousel ảnh (FlatList horizontal + paging), press theo index.
- [x] (Đã có) `TimelineImageViewer` + `parseMediaUrls`: nhiều URL / object `{ url }`.
- [x] `demo-timeline-memories.ts`: thêm bản ghi multi-image.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/src/features/timeline/components/TimelineItem.tsx`: đo width vùng ảnh (`onLayout`), `FlatList` ngang `pagingEnabled`, mỗi ô một `Image` + `PressableScale` gọi `handleImagePress(index)`; chấm chỉ báo trang khi > 1 ảnh.
- `api/src/modules/demo-timeline-memories.ts`: vài memory dùng mảng `mediaUrls` 2–3 URL picsum.

## Verify

- `cd mobile && bunx tsc --noEmit` — pass (2026-04-04).

## Residual risk

- FlatList ngang trong `ScrollView` dọc timeline: có thể cần tinh chỉnh `nestedScrollEnabled` trên Android nếu xuất hiện conflict cuộn; chưa báo lỗi trong pass này.
