# Ticket 65 — Thông báo đẩy (push): thiết kế & triển khai

## Metadata

- **status**: done
- **closed**: 2026-04-05

## Spec

- Màn **Cài đặt → Thông báo** (`/profile-details/notifications`): công tắc **Thông báo đẩy** phải có hành vi thật, không chỉ UI.
- Tắt: xóa token trên server (`POST /v1/users/push-token` với `expoPushToken: null`), lưu preference thiết bị.
- Bật: xin quyền OS (nếu cần), lấy Expo token, gửi lên server.
- Màn tab **Thông báo** không được tự đăng ký lại token khi người dùng đã tắt trong cài đặt.

## Thiết kế (tóm tắt)

| Thành phần | Quyết định |
|------------|------------|
| Nguồn sự thật “có gửi push” | `users.expo_push_token` IS NOT NULL (đã có migration) |
| Ý định người dùng trên thiết bị | AsyncStorage `emplus.settings.pushNotifications.enabled.v1` (`1`/`0`; chưa có key = mặc định bật, tương thích cũ) |
| OS từ chối vĩnh viễn | Khi `getPermissionsAsync().status === "denied"` và trước đó preference bật → đồng bộ preference về tắt, công tắt OFF |
| Simulator / thiếu `projectId` | Bật thất bại → toast giải thích; không crash |

## Implementation

- `mobile/src/features/notifications/push-notifications-preference.ts` — đọc/ghi preference.
- `mobile/src/lib/sync-expo-push-token.ts` — `enableExpoPushOnServer`, `clearExpoPushTokenOnServer`, `syncExpoPushTokenToServer` kiểm tra preference trước khi đăng ký.
- `mobile/app/profile-details/notifications.tsx` — toggle đẩy: API + preference + `useFocusEffect` làm mới trạng thái.
- `mobile/src/core/config/app-config.ts` — key storage mới.
- `mobile/app/(tabs)/notifications.tsx` — không đổi gọi; `syncExpoPushTokenToServer` đã tôn trọng preference.

## Verify

- `npm run typecheck` trong `mobile/` (pass).

## Residual risk / follow-up

- Preference là **theo thiết bị**, không gắn `userId`; đổi tài khoản trên cùng máy có thể kế thừa ON/OFF — chấp nhận v1.
- Backend gửi push: cần worker gọi Expo Push API dựa trên `expo_push_token` (ngoài phạm vi ticket UI này).
