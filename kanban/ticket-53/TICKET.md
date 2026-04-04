# ticket-53 — Profile: đồng bộ chrome tab (lưới + safe area)

## Metadata

- **status**: done
- **opened**: 2026-04-04
- **closed**: 2026-04-04
- **domain_stack**: mobile/expo

## Spec

- Tab **Hồ sơ** dùng cùng lớp nền **`LoginGridAnimatedBackground`** + `useAuthGridChrome` như Home/Care.
- `StatusBar`, safe area (padding header / guest), lề dưới scroll phù hợp tab bar.

## Acceptance

- [x] Đã đăng nhập & chưa đăng nhập: `AppScreen` trong suốt + lưới phía sau.
- [x] Safe area header (`paddingTop: insets.top + 12`), `paddingBottom` scroll theo tab bar.
- [x] `bunx tsc --noEmit` trong `mobile/`.

## Implementation

- `mobile/app/(tabs)/profile.tsx`: `appShell` giống Care (`loginScreenStyles`, `LoginGridAnimatedBackground`, `StatusBar`, `useAuthGridChrome`), `ScrollView` trong suốt, `scrollPadBottom` với `TOAST_TAB_BAR_OFFSET`.

## Verify

- `bunx tsc --noEmit` — `mobile/` pass (2026-04-04).

## Residual risk

- Header gradient profile vẫn che lưới trong vùng header (chấp nhận); có thể làm gradient mờ hơn sau.
