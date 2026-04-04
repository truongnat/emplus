# Ticket 14 — Home: shell style đồng bộ auth (lưới + brand)

## Meta

- **id**: 14
- **status**: done
- **updated**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile / Expo / tabs / home

## Spec

- Áp **cùng** visual language với auth: **LoginGridAnimatedBackground**, **LoginBrandGradientTitle** góc trên trái, **StatusBar**, **`useAuthGridChrome`** (đồng bộ màu vùng status bar với đỉnh lưới).
- **AppScreen** nền **transparent**, **`applyTopSafeAreaPadding: false`**, padding scroll **`authGridScrollPaddingTop` + AUTH_LOGIN_SCROLL_EXTRA_TOP** như login.
- Trạng thái **chưa đăng nhập** / **chưa ghép đôi** cũng dùng **cùng** shell (không còn nền flat đơn).

## Acceptance

- [x] `home.tsx` dùng shell auth + `homeScreen.styles.ts`.
- [x] `HomeHeader` giảm `paddingTop` (tránh chồng với padding scroll).
- [x] `bun run typecheck:mobile` pass.

## Implementation

| File | Thay đổi |
|------|----------|
| `mobile/app/(tabs)/home.tsx` | Grid, brand, chrome, `authShell` cho mọi nhánh |
| `mobile/src/features/home/homeScreen.styles.ts` | Style layer + scroll + center |
| `mobile/src/features/home/index.ts` | Export `homeScreenStyles` |
| `mobile/src/features/home/components/HomeHeader.tsx` | `paddingTop: 0` |

## Verify

- `bun run typecheck:mobile`

## Residual / Follow-up (ưu tiên sau khi ổn định UI)

- **Hiệu năng**: giảm re-render (memo, list), Lottie có điều kiện / `reduce motion`.
- **Code splitting**: tách chunk route/tab (dynamic import heavy home sections) — **ticket riêng** hoặc mở rộng ticket perf login hiện có.
