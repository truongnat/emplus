# Ticket 12 — Verify OTP: hero Lottie Password Authentication

## Meta

- **id**: 12
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / assets / verify-otp

## Spec

- Thay icon hero màn **verify-otp** từ Lottie `success` (placeholder) sang animation **`Password Authentication.lottie`** (LottieFiles / dotLottie).
- Bundle **một JSON** với PNG nhúng base64 (Metro + `lottie-react-native`).

## Acceptance

- [x] `mobile/assets/lottie/verify-otp-password-auth.json` (~970KB).
- [x] `lottieInventory.verifyOtpPasswordAuth`.
- [x] `VerifyOtpHeroSection` dùng asset mới; `verifyOtpLottieHero` **80×80**, `speed` ~0.9.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/assets/lottie/verify-otp-password-auth.json` | Animation + base64 images |
| `mobile/src/lottie/inventory.ts` | `verifyOtpPasswordAuth` |
| `mobile/src/features/auth/components/VerifyOtpHeroSection.tsx` | Source Lottie |
| `mobile/src/features/auth/verifyOtpScreen.styles.ts` | Kích thước hero |

## Verify

- `bun run typecheck:mobile`

## Residual

- File lớn (~1MB) trong bundle; nếu cần giảm dung lượng có thể tối ưu ảnh trong nguồn Lottie hoặc xuất vector-only.
