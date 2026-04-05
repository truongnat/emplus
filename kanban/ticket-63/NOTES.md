# Ticket 63

- `Reveal` từng là placeholder animation; gỡ hẳn để giảm noise — sau này có thể thay bằng `FadeIn` có `useReducedMotion` nếu cần.
- `@react-navigation/bottom-tabs` thêm vào `mobile/package.json` để TS resolve `BottomTabBarProps` (đã là transitive của expo-router).
