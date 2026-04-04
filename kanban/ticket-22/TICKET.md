# Ticket 22 — Hero counter theo mockup (ảnh tham chiếu)

## Meta

- **id**: 22
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / HeroCard

## Spec (từ ảnh)

- Tiêu đề: **“Ngày đầu tiên của chúng mình”** + **icon tim** hồng (vector).
- Số lớn + chữ **“ngày”** xếp **dọc** (số trên, đơn vị dưới, căn giữa cột).
- **Tim trang trí** bên phải (glow) — dùng Lottie `careHeart` + shadow coral.
- Pill **đồng hồ** phía dưới (icon + `ClockTicker`), không caption “Bây giờ” riêng.
- Một lớp card glass (bỏ focal panel lồng như ticket-21).

## Acceptance

- [x] Copy + layout khớp hướng mockup.
- [x] `accessibilityLabel` cập nhật theo tiêu đề mới.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/home/components/HeroCard.tsx` | Title + heart; `heroRow` counterStack + `EmplusLottie` careHeart; `unitBelow`; pill time only |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04)

## Residual

- Cân chỉnh `heartGlow` / kích thước Lottie theo UAT từng máy.

## Skill

- Không thêm skill.
