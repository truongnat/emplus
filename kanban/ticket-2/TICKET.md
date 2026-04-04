# Ticket 2 — Login: clean code, split modules, UX/performance

## Meta

- **id**: 2
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo Router / React Native

## Spec

- **Clean code**: `login.tsx` chỉ điều phối (session, layout, chrome); form và section tách file.
- **Split / chunking**: tách hook chrome hệ thống, styles, form đăng nhập, hero Lottie, footer đăng ký.
- **UX / performance**: giảm re-render không cần thiết — **state form + RHF nằm trong component con** để màn nền / hero không render lại mỗi lần gõ phím.

## Acceptance

- [x] `mobile/app/login.tsx` gọn, import rõ ràng, không chứa toàn bộ form inline.
- [x] Form + mutation login trong module feature (`LoginAuthForm`).
- [x] Styles login tập trung `loginScreen.styles.ts`.
- [x] `bun run typecheck:mobile` pass.

## Tasks

1. [x] Intake + kanban `ticket-2/`
2. [x] Grid chrome hook — `useAuthGridChrome` (trước đây `useLoginScreenChrome`)
3. [x] `loginScreen.styles.ts` — StyleSheet dùng chung
4. [x] `LoginAuthForm` — `useForm`, CTA, remember/forgot
5. [x] `LoginHeroSection`, `LoginSignUpFooter`, `LoginScreenLoading`
6. [x] Rút gọn `login.tsx` + verify typecheck

## Implementation

| Khu vực | File |
|---------|------|
| Route | `mobile/app/login.tsx` |
| Chrome hook | `mobile/src/features/auth/hooks/useAuthGridChrome.ts` |
| Styles | `mobile/src/features/auth/loginScreen.styles.ts` |
| Form | `mobile/src/features/auth/components/LoginAuthForm.tsx` |
| Hero | `mobile/src/features/auth/components/LoginHeroSection.tsx` |
| Footer | `mobile/src/features/auth/components/LoginSignUpFooter.tsx` |
| Loading | `mobile/src/features/auth/components/LoginScreenLoading.tsx` |

## Verify

- `bun run typecheck:mobile` — pass (2026-04-04).

## Residual / follow-up

- Bundle-level `lazy()` cho Lottie: đánh giá sau nếu cần giảm TTI trên Android thấp.
