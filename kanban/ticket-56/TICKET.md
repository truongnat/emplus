# Ticket 56 — Màu dark OTP & Pairing (đồng bộ login Aura)

## Metadata

- **id**: 56
- **status**: done
- **domain_stack**: mobile / Expo
- **opened**: 2026-04-05

## Spec

Áp dụng cùng hướng chỉnh màu dark như ticket-55 (login): surface field + `GlassCard` trên **verify-otp** và **pairing**. Tránh lặp magic number — token dùng chung.

## Acceptance

- [x] `VerifyOtpForm`: `loginSoft` dark + intensity glass khớp login.
- [x] `PairingScreenBody`: tương tự (QR card + input).
- [x] Token tập trung; login dùng chung để không lệch sau này.

## Implementation

- `emplus-design-tokens.ts`: `authSoftFieldSurface`, `authGlassBlurIntensity`.
- `LoginAuthForm.tsx`, `VerifyOtpForm.tsx`, `PairingScreenBody.tsx`: import token.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: none
