# Ticket 61 — Timeline + memory detail/add — dark mode Aura (lưới)

## Metadata

- **id**: 61
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Đồng bộ dark mode với home: thẻ/chip/nút trên nền lưới dùng token `homeDarkGridCard` / `homeDarkGridInset` / `homeDarkChromeButton`; chip active dùng primary + chữ `onBrand` thay vì `background.inverse` (cream) trên nền tối.

## Acceptance

- [x] `TimelineHeader` — nút +, filter chips.
- [x] `TimelineItem` — thẻ + mô tả thanh toán.
- [x] `TimelineDateGroupHeader` — chấm timeline.
- [x] `memory/[id]` — nút back.
- [x] `add-memory` — header, loại, preview, ngày, modal date.
- [x] `MemoryDetailBentoGrid` — viền ô ảnh (sunken).

## Implementation

- Import `useThemeMode` + token từ `emplus-design-tokens.ts` tại các file trên.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: none
