# ticket-32 — Dòng thời gian: shell lưới + safe area, typography

## Summary

Đồng bộ tab **Dòng thời gian** (paired + đăng nhập) với pattern **Thông báo / Home**: nền lưới Aura, `StatusBar`, safe area top, padding đáy theo tab bar + home indicator; chữ loading/empty dùng `AppText`; header tiêu đề theo `typographyRoles`.

## Acceptance

- [x] User đã ghép đôi: `LoginGridAnimatedBackground` + `useAuthGridChrome` + `AppScreen` transparent như tab Thông báo.
- [x] Tiêu đề màn hình dưới status bar (`insets.top + 10`); list không bị che bởi tab bar (`paddingBottom` theo safe area).
- [x] Trạng thái chưa đăng nhập / chưa ghép: giữ luồng CTA hiện tại (không bắt buộc lưới).
- [x] `bun run typecheck:mobile` pass.

## Status

- **status:** done
- **closed:** 2026-04-04

## Verify

- `bun run typecheck:mobile`

## Implementation

- `mobile/app/(tabs)/timeline.tsx` — shell paired path, `AppText`, inset bottom.
- `mobile/src/features/timeline/components/TimelineHeader.tsx` — padding + title typography.

## Residual

- Chưa thêm subtitle / badge như Thông báo (có thể ticket sau).
