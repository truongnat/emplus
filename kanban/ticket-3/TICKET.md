# Ticket 3 — Đăng ký: cùng phong cách login + API backend

## Meta

- **id**: 3
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / API `POST /v1/auth/register`

## Spec

- Màn **đăng ký** (`register`) **cùng shell** với login: nền lưới, glass/liquid, soft input, CTA gradient, hero Lottie, brand gradient.
- Giữ luồng **backend** hiện có: `useRegister` → `dependencies.auth.register` → verify OTP (`flow: register`).

## Acceptance

- [x] Grid + `AppScreen` edge-to-edge + `StatusBar` đồng bộ (dùng `useAuthGridChrome`).
- [x] Form trong `GlassCard`, input `variant="soft"` `size="lg"` giống login; CTA gradient + press animation.
- [x] `useRegister` + `RegisterSchema` không đổi contract; success → `/verify-otp` với `email` + `flow: register`.
- [x] Stack `register` có `contentStyle` transparent.
- [x] `bun run typecheck:mobile` pass.

## Tasks

1. [x] Kanban `ticket-3/`
2. [x] Hook `useAuthGridChrome` dùng chung login + register
3. [x] `RegisterAuthForm`, `RegisterLoginFooter`, `registerScreen.styles`
4. [x] `register.tsx` shell giống `login.tsx` + nút back + top bar brand

## Implementation

| Khu vực | File |
|---------|------|
| Route | `mobile/app/register.tsx` |
| Form | `mobile/src/features/auth/components/RegisterAuthForm.tsx` |
| Footer | `mobile/src/features/auth/components/RegisterLoginFooter.tsx` |
| Styles | `mobile/src/features/auth/registerScreen.styles.ts` |
| Chrome | `mobile/src/features/auth/hooks/useAuthGridChrome.ts` |
| Stack | `mobile/app/_layout.tsx` (`register` screen) |
| Login import | `mobile/app/login.tsx` |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04).

## Residual / follow-up

- Có thể trích `AuthShellLayout` dùng chung login/register để bớt duplicate `register.tsx` / `login.tsx` (ticket sau).
