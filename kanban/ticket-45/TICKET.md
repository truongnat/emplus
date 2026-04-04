# Ticket 45 — Timeline: tối ưu hiệu năng & tách file (chunking)

## Metadata

- **ticket_id**: 45
- **status**: done
- **domain_stack**: `mobile` (Expo / Metro)
- **opened**: 2026-04-04

## Intake

- Giảm bundle/parse cho tab **Timeline**: tách logic khỏi route, lazy module nặng, giảm re-render hàng list.
- `SectionList` + `Swipeable` giữ `removeClippedSubviews={false}`.

## Acceptance

- [x] `app/(tabs)/timeline.tsx` gọn (gate auth + body).
- [x] Hook `useTimelineDeleteMemory`; `TimelineMemoryRow` memo + callback ổn định; `TimelineMemorySectionList` có tuning list.
- [x] `TimelineImageViewer` load `React.lazy` + `Suspense` khi mở xem ảnh.
- [x] `TimelineDateGroupHeader` bọc `React.memo`.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/src/features/timeline/hooks/useTimelineDeleteMemory.ts`
- `mobile/src/features/timeline/components/TimelineMemoryRow.tsx`
- `mobile/src/features/timeline/components/TimelineMemorySectionList.tsx`
- `mobile/src/features/timeline/components/TimelineImageViewerLazy.tsx`
- `mobile/src/features/timeline/components/TimelineAuthGate.tsx`
- `mobile/src/features/timeline/screens/TimelineAuthenticatedBody.tsx`
- `mobile/app/(tabs)/timeline.tsx` — refactored
- `TimelineDateGroupHeader.tsx` — memo

## Residual

- Metro vẫn gộp nhiều chunk vào một bundle native; lợi ích chính: **lazy** viewer + **ít re-render hàng** + **list tuning**.

## Closed

- **closed:** 2026-04-04
