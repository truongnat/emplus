# Ticket 41 — Timeline: thẻ full ngang như trước (bỏ zigzag 86%)

## Metadata

- **ticket_id**: 41
- **status**: done
- **domain_stack**: `mobile` (Expo)
- **opened**: 2026-04-04

## Intake

- **Vấn đề:** Thẻ kỷ niệm trên Dòng thời gian **không còn trải full chiều ngang** như thiết kế một cột (ticket-35); hiện dùng lưới zigzag `alternateCardShell` **86%** + `omitAxis`.
- **Mong đợi:** Mỗi mục **một hàng**, thẻ dùng **toàn bộ chiều ngang** còn lại sau cột trục (22px padding + trục 32px), khớp header nhóm ngày.

## Acceptance

- [x] Mỗi `TimelineItem` full width trong vùng list (không còn 86% / zigzag trái-phải).
- [x] Trục timeline + chấm hiển thị lại (`omitAxis={false}`); `showAxis` cho phần tử đầu mỗi nhóm ngày.
- [x] Vuốt xoá / chạm tiêu đề vẫn hoạt động (không đổi API item).
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/app/(tabs)/timeline.tsx` — bỏ `alternateRow` / `alternateCardShell`; `renderItem` render `TimelineItem` với `showAxis={index === 0}`, không `omitAxis`.

## Verify

- `cd mobile && bunx tsc --noEmit`

## Status / close

- **status:** done
- **closed:** 2026-04-04

## Residual

- Không đổi API. Zigzag có thể tái dùng sau nếu PM muốn, tách style flag.
- **Follow-up:** [ticket-42](./ticket-42/TICKET.md) — thẻ vẫn hẹp nếu thiếu `flex` trên `Swipeable` (đã sửa).

## Closing report

- Đã bỏ `alternateRow` / `alternateCardShell` (86%); list trở lại một cột có trục như ticket-35.
