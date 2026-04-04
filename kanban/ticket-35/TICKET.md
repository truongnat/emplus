# ticket-35 — Timeline: một cột full ngang (bỏ masonry 2 cột)

## Summary

Tái thiết kế **Dòng thời gian** thành **feed dọc**: mỗi kỷ niệm **một hàng**, thẻ dùng **toàn bộ chiều ngang** còn lại sau cột trục (không chia 2 cột). `SectionList` mỗi `MemoryItem` là một phần tử; bỏ `chunkPairs` / `grid` / `staggerShort`.

## Acceptance

- [x] Không còn layout masonry 2 cột; mỗi item một card trải ngang trong nhóm ngày.
- [x] Trục timeline + thẻ (`TimelineItem` luôn list mode); ảnh đại diện cao hơn một chút cho feed.
- [x] Padding ngang 22 khớp header / lưới tab.
- [x] `bun run typecheck:mobile` pass.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/app/(tabs)/timeline.tsx` — sections `data: MemoryItem[]`, `listRow`, `keyExtractor`.
- `mobile/src/features/timeline/components/TimelineItem.tsx` — bỏ `grid` / masonry styles; ảnh list 220px; padding 22.
- `TimelineDateGroupHeader.tsx` — `marginHorizontal` 22.

## Residual

- `TimelineDateGroup` (legacy) vẫn dùng `TimelineItem` không đổi API bắt buộc.
