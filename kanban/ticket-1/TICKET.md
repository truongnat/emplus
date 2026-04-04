# Ticket 1 — Màn đăng nhập (Em Plus mobile)

## Meta

- **id**: 1
- **status**: done
- **updated**: 2026-04-04 (hero Lottie mèo yêu)

## Spec (từ product)

- Login **đơn giản**, **đẹp**, phong cách **glass / liquid** (native khi hỗ trợ).
- Ô **Email** và **Mật khẩu** **cùng chiều cao**.
- Khi **bàn phím mở**, field đang focus phải **cuộn nằm ngay phía trên bàn phím** (không bị che).

## Acceptance

- [x] Glass: `GlassCard` + `isLiquid` khi `isLiquidGlassSupported`; fallback blur.
- [x] Chiều cao input: `Input` dùng `height` cố định theo `emplusInputHeight[size]`.
- [x] UI gọn: hero Lottie nhỏ, bớt chrome so với bản “dream” trước.
- [x] Hero login: animation mèo (file `.lottie` → `login-cat-love.json`), halo glass + `speed` nhẹ.
- [x] Keyboard: `KeyboardAwareScrollView` trên `login.tsx` (giống register/forgot-password).

## Implementation

| Khu vực | File |
|---------|------|
| Màn login | `mobile/app/login.tsx` |
| Asset Lottie | `mobile/assets/lottie/login-cat-love.json` (trích từ dotLottie user; manifest ghi generator LottieFiles) |
| Inventory | `mobile/src/lottie/inventory.ts` (`loginCatLove`) |
| Input | `mobile/src/components/atoms/Input.tsx` |
| Glass | `mobile/src/components/glass/GlassCard.tsx` |

## Verify

- `bun run typecheck:mobile` (từ root: script gọi `mobile`).

## Residual / follow-up

- `LoginDreamHero` chưa dùng (có thể xóa hoặc tái dùng sau).
- Nếu iOS/Android có edge case keyboard, thử chỉnh `extraScrollHeight` / `extraHeight` trong `login.tsx`.
