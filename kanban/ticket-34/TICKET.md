# ticket-34 — Timeline masonry: thẻ không full chiều ngang (1 cột co hẹp)

## Summary

Thẻ timeline trong lưới 2 cột bị **co ~40% bên trái** vì `TimelineItem` với `grid` vẫn kế thừa `flexDirection: 'row'` (layout trục) trong khi chỉ còn một nhánh thẻ — con `flex: 1` trong hàng không luôn giãn full chiều ngang ô.

## Acceptance

- [x] Mỗi ô masonry: thẻ kín **chiều ngang ô** (1 hoặc 2 cột).
- [x] `masonryRow` / `masonryCell` ràng buộc rõ để SectionList không thu hẹp hàng.
- [x] `bun run typecheck:mobile` pass.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/src/features/timeline/components/TimelineItem.tsx` — `outerContainerGrid` column + `width: '100%'`, `cardGrid` `width: '100%'`.
- `mobile/app/(tabs)/timeline.tsx` — `masonryRow` / `masonryCell` stretch + `width: '100%'`.

## Residual

- None.
