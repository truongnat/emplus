# Ticket 63 — Audit quick wins (BACKEND-AUDIT + FULL-PROJECT-REVIEW + MOBILE-AUDIT)

## Metadata

- **id**: 63
- **status**: done
- **domain_stack**: api (Bun/Hono) + mobile (Expo)
- **opened**: 2026-04-05
- **refs**: `.planning/BACKEND-AUDIT.md`, `.planning/FULL-PROJECT-REVIEW.md`, `.planning/MOBILE-AUDIT.md`

## Spec

Áp dụng **quick wins** đã liệt kê trong audit: envelope API admin, OTP subject an toàn hơn, gỡ duplicate token util, mobile: guard couple redirect, type tab bar, bỏ `Reveal` no-op, xác nhận đăng xuất, token màu ActivityIndicator, hằng scroll đáy tab.

## Acceptance

- [x] `GET /v1/admin/stats` trả `{ success, data, meta }` như các route khác.
- [x] Email OTP: subject không chứa mã; log OTP console chỉ khi không production.
- [x] Xóa `api/src/utils/token.ts`; bỏ export `generateTokens` thừa ở `in-memory-store`.
- [x] Tabs: `!session?.user.coupleId`; `CustomTabBar` dùng `BottomTabBarProps`.
- [x] Bỏ component `Reveal`; gỡ wrapper ở mọi nơi dùng.
- [x] Profile: `Alert.alert` trước khi đăng xuất.
- [x] Button loading: màu spinner dùng semantic token thay `#FFFFFF`.
- [x] `scrollPadBottomWithTabBar` dùng chung ở home/care/notifications/add-memory/memory/timeline body.

## Implementation

- **API**: `admin.ts` — `success(c, { stats, users, couples })`, bỏ `(store as any)`, dùng `listAllUsers?.()` / optional; `mail.ts` — subject cố định, log OTP chỉ khi `env.nodeEnv !== "production"`; xóa `utils/token.ts`; bỏ export `generateTokens` thừa cuối `in-memory-store.ts`.
- **Mobile**: `scrollPadBottomWithTabBar` + hằng trong `core/common/core.ts`; import ở home/care/notifications/add-memory/memory detail/timeline body; `_layout` — `!session?.user.coupleId`, `BottomTabBarProps`; gỡ `Reveal` toàn app; `profile` — `Alert.alert` đăng xuất; `Button` — `theme.colors.text.onBrand` cho spinner; thêm dependency `@react-navigation/bottom-tabs` (types + align với expo-router).

## Verify

- `api`: `bun run typecheck` ✓ (`bun test` cần `NODE_ENV=test DATA_STORE=memory` — không chạy lại full suite do DB dev có thể gây 409)
- `mobile`: `bun run typecheck` ✓

## Close

- **closed_at**: 2026-04-05
- **residual risk**: Consumer gọi `GET /v1/admin/stats` (nếu có) phải đọc `response.data` trong envelope `{ success, data, meta }` thay vì root `stats`.
