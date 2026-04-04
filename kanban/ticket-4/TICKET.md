# Ticket 4 — Register: Lottie hearts + header gọn hơn

## Meta

- **id**: 4
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Lottie

## Spec

- Đổi **Lottie đăng ký** sang asset `love hearts.lottie` (xuất JSON vào bundle).
- **Giảm padding / header** so với bản trước (top bar + scroll + hero).

## Acceptance

- [x] Asset `register-love-hearts.json` + `lottieInventory.registerLoveHearts`.
- [x] `RegisterHeroSection` dùng animation mới (không dùng hero mèo login).
- [x] Header: nút back 40px, `top` + `paddingTop` scroll tối ưu, hero nhỏ hơn login (148px), `marginBottom` hero 8.

## Implementation

| Khu vực | File |
|---------|------|
| Asset | `mobile/assets/lottie/register-love-hearts.json` (từ `love hearts.lottie`, manifest: LottieFiles / dotLottie-js) |
| Inventory | `mobile/src/lottie/inventory.ts` |
| Hero | `mobile/src/features/auth/components/RegisterHeroSection.tsx` |
| Styles | `mobile/src/features/auth/registerScreen.styles.ts` (`registerHeader`, …) |
| Màn | `mobile/app/register.tsx` |

## Verify

- `bun run typecheck:mobile`

## Residual

- none
