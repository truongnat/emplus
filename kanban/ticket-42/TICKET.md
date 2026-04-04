# Ticket 42 — Timeline: thẻ hẹp (Swipeable không flex trong hàng có trục)

## Metadata

- **ticket_id**: 42
- **status**: done
- **domain_stack**: `mobile` (Expo)
- **opened**: 2026-04-04

## Intake

- **Triệu chứng:** Thẻ timeline chỉ ~40% ngang; tiêu đề vỡ từ; nhãn trục có thể xuống dòng lạ.
- **Root cause:** `TimelineItem` dùng `flexDirection: 'row'` (trục 32px + `Swipeable`). **`Swipeable` không tham gia flex grow** → RN đo intrinsic width nhỏ; `flex: 1` trên `card` bên trong **không** kéo giãn được cha.
- **Fix:** `containerStyle` + `childrenContainerStyle` trên `Swipeable`: `flex: 1`, `minWidth: 0`, `alignSelf: 'stretch'` (và nhánh `omitAxis`: `width: '100%'`).

## Acceptance

- [x] Thẻ chiếm toàn bộ phần ngang còn lại sau trục (full như ticket-35).
- [x] Vuốt xoá / tap tiêu đề vẫn hoạt động.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/src/features/timeline/components/TimelineItem.tsx` — `swipeableRootWithAxis`, `swipeableChildrenWithAxis`, `swipeableRootOmitAxis`, `swipeableChildrenOmitAxis`.

## Verify

- `cd mobile && bunx tsc --noEmit`

## Closed

- **closed:** 2026-04-04

## Residual

- Nếu nhãn trục vẫn chồng chữ, cân nhắc `position: 'absolute'` + `maxWidth` cho `axisLabelContainer` (ticket riêng).
