# Ticket 18 — Counter: ĐÃ BÊN NHAU, màu số, bỏ tagline + ngày

## Meta

- **id**: 18
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / HeroCard

## Spec

- Đổi overline **NGÀY TRỌNG ĐẠI** → **ĐÃ BÊN NHAU**, **tăng cỡ chữ** (so với 11).
- Số ngày lớn **không** dùng màu đen / `text.primary` — dùng **brand token** (ví dụ `brand.strong`).
- **Xóa** dòng “Ngày cho đến Mãi mãi” và **pill ngày** (calendar + `startDateLabel`).

## Acceptance

- [x] Copy + kích thước overline cập nhật.
- [x] `NumberTicker` nhận `digitColor` tùy chọn; hero truyền `colors.brand.strong`.
- [x] `HeroCard` chỉ còn `loveDays`; `home.tsx` không truyền `startDateLabel`.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/HeroCard.tsx` | Overline “✨ ĐÃ BÊN NHAU”, `topLabel` 15px; bỏ tagline + date; `NumberTicker` + `digitColor`; `minHeight` 280 |
| `mobile/src/features/home/components/HomeClock.tsx` | `Digit` / `NumberTicker` prop `digitColor?` |
| `mobile/app/(tabs)/home.tsx` | `<HeroCard loveDays={loveDays} />`; bỏ `startDateLabel` destructure |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Không.
