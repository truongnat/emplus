# Ticket 8 — Màn verify OTP: grid + glass + shell chung

## Meta

- **id**: 8
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / `POST /v1/auth/verify-otp`

## Spec

- Đồng bộ **verify-otp** với chuỗi auth **login / register / forgot**: **lưới nền**, **RegisterTopBar**, **`authGridScrollPaddingTop`**, **KeyboardAwareScrollView**, **stack transparent**.
- **GlassCard** cho khối OTP + CTA gradient giống login/forgot.
- Tách **hero** và **form** (state + mutation trong form).

## Acceptance

- [x] `AuthGridScreenShell` + `centerContent` (căn giữa theo chiều dọc).
- [x] `Stack.Screen verify-otp` — `contentStyle: { backgroundColor: "transparent" }`.
- [x] `VerifyOtpHeroSection`, `VerifyOtpForm`, `verifyOtpScreen.styles.ts`.
- [x] Luồng: auto-submit 6 số, resend toast, `verifyOTP` + session — giữ hành vi cũ.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| Khu vực | File |
|---------|------|
| Route | `mobile/app/verify-otp.tsx` |
| Hero / form | `mobile/src/features/auth/components/VerifyOtpHeroSection.tsx`, `VerifyOtpForm.tsx` |
| Styles | `mobile/src/features/auth/verifyOtpScreen.styles.ts` |
| Stack | `mobile/app/_layout.tsx` |

## Verify

- `bun run typecheck:mobile`

## Residual

- Không còn dùng RHF + `OtpSchema` trên từng phím (chỉ state local); có thể thêm validate trước `mutate` nếu cần message field-level.
