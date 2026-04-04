# Ticket 5 — Quên mật khẩu: cùng style login/register + tách module + perf

## Meta

- **id**: 5
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / `POST /v1/auth/forgot-password`

## Spec

- Màn **forgot-password** cùng **grid + glass + soft input + CTA gradient** như login/register.
- **Tách file**: shell dùng chung, hero, form (RHF + mutation), footer.
- **Perf**: state form + mutation trong `ForgotPasswordAuthForm` — shell/hero không re-render mỗi lần gõ email.

## Acceptance

- [x] `AuthGridScreenShell` — chrome chung (thay `RegisterScreenShell`).
- [x] `ForgotPasswordHeroSection`, `ForgotPasswordAuthForm`, `ForgotPasswordLoginFooter`.
- [x] `useForgotPasswordRequest` — mutation tách khỏi UI.
- [x] Luồng cũ: toast + `router.push` `/reset-password` với `email`.
- [x] Stack `forgot-password` + `reset-password` — `contentStyle` transparent.
- [x] `bun run typecheck:mobile` pass.

## Implementation

| Khu vực | File |
|---------|------|
| Route | `mobile/app/forgot-password.tsx` |
| Shell | `mobile/src/features/auth/components/AuthGridScreenShell.tsx` |
| Register dùng shell | `mobile/app/register.tsx` |
| Hero / form / footer | `mobile/src/features/auth/components/ForgotPassword*.tsx` |
| Styles | `mobile/src/features/auth/forgotPassword.styles.ts` |
| Hook | `mobile/src/presentation/hooks/auth/useForgotPasswordRequest.ts` |
| Stack | `mobile/app/_layout.tsx` |

## Verify

- `bun run typecheck:mobile`

## Residual

- `reset-password.tsx` có thể align style sau (đã set transparent stack).
