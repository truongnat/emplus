# Ticket 55 — Dark mode đẹp hơn, bắt đầu từ màn login

## Metadata

- **id**: 55
- **status**: done
- **domain_stack**: mobile / Expo, theme Aura
- **opened**: 2026-04-05

## Spec

Light mode ổn; dark mode màu lệch (nền lưới auth xanh-lạnh vs theme Aura ấm). Căn chỉnh **màn login** trước: nền `LoginGridAnimatedBackground`, `GlassCard` dark, field soft trong `LoginAuthForm`.

## Acceptance

- [x] Nền grid dark dùng tone **Aura** (`darkBg` / `darkSurf`), không `#0a0c10` cold blue-black.
- [x] Lưới + wash gradient hài hòa, ít chói/muddy.
- [x] Thẻ glass + input soft dark ấm hơn, đọc được trên nền mới.

## Implementation

- `LoginGridAnimatedBackground.tsx`: import `auraPalette`, `LOGIN_GRID_TOP_DARK`, gradient + stroke + wash.
- `GlassCard.tsx`: overlay gradient dark warm (cocoa) thay pure black.
- `LoginAuthForm.tsx`: `loginSoft` + optional blur intensity dark.

## Verify

- `mobile`: `bun run typecheck`

## Close

- **closed_at**: 2026-04-05
- **residual risk**: Các màn auth khác (register, forgot-password) dùng chung grid/glass — đã hưởng lợi; tinh chỉnh riêng nếu cần.
