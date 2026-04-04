# Ticket 13 — Verify OTP: padding & vertical rhythm

## Meta

- **id**: 13
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / auth UI / verify-otp

## Spec

- Rà soát **khoảng cách** màn **verify-otp**: hero → glass, trong glass (OTP / CTA / gửi lại), giữa các ô OTP.
- Mục tiêu: **đơn giản, cân đối**, không dồn hoặc quá rời so với login/forgot.

## Acceptance

- [x] Hero: `paddingHorizontal`, `marginBottom`, vòng icon **96×96**, Lottie **88×88**, title/subtitle/email có bước nhịp rõ.
- [x] Glass nội dung: `otpFormInner` — `gap` 22, padding ngang nhẹ so với login `formInner`.
- [x] Ô OTP: `gap` 10, chiều cao **58**, `borderRadius` 15; `resend` có `paddingHorizontal`.
- [x] `formOuterSpacing` tách hero và card một chút.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/src/features/auth/verifyOtpScreen.styles.ts` | Hero, OTP cells, resend, `otpFormInner`, `formOuterSpacing` |
| `mobile/src/features/auth/components/VerifyOtpForm.tsx` | Gộp `shellStyles` + style OTP-specific |

## Verify

- `bun run typecheck:mobile`

## Residual

- Nếu màn hình rất hẹp (<360 logical width), có thể giảm `gap` ô OTP hoặc font ô OTP.

## Hotfix (2026-04-04)

- Hero OTP: bỏ vòng `iconCircle` (nền/bo) — Lottie **100×100** trực tiếp trên lưới; chỉnh spacing title/subtitle/email.
- Form: `formInner` **chỉ** dùng `loginScreenStyles.formInner` (`gap: 16`, không padding riêng) — khớp login.
- Ô OTP: nền/viền **`loginSoft`** + `borderRadius` giống Input login (24/16).
