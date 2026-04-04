# Ticket 15 — Home: nút thông báo cùng hàng wordmark Em Plus

## Meta

- **id**: 15
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / home / layout

## Spec

- Nút **thông báo** cùng **baseline** với logo **Em Plus** (góc phải, `top` = `insets.top + AUTH_LOGIN_BRAND_TOP_OFFSET`, `height` 40 khớp `LoginBrandGradientTitle`).

## Acceptance

- [x] Tách nút khỏi `HomeHeader` (scroll); đặt absolute trong `authShell` (chỉ nhánh đã ghép).
- [x] `HomeChromeNotificationButton` + `brandTopRight` trong `homeScreen.styles.ts`.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/app/(tabs)/home.tsx` | `authShell` nhận `chromeTrailing`; truyền wrapper + nút |
| `mobile/src/features/home/components/HomeChromeNotificationButton.tsx` | Mới |
| `mobile/src/features/home/components/HomeHeader.tsx` | Bỏ cột phải (bell) |
| `mobile/src/features/home/homeScreen.styles.ts` | `brandTopRight` |
| `mobile/src/features/home/index.ts` | Export component |

## Verify

- `bun run typecheck:mobile`

## Residual

- Không.
