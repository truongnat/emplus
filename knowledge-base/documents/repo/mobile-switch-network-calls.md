# Mobile: Switch gắn API — tránh gọi lặp

## Bối cảnh

`Switch` của React Native gọi `onValueChange` mỗi lần người dùng đổi trạng thái. **Không có debounce built-in**. Nếu handler gọi API, cần chủ động giới hạn:

- **Single-flight / busy:** chặn lần thứ hai khi request trước **chưa** xong (`isBusy` + early return).
- **Cooldown (throttle sau khi xong):** sau khi một lần gọi mạng kết thúc, không nhận thao tác mới trong vài trăm ms để tránh spam ON/OFF liên tục. Đây **không** phải debounce giá trị (với switch boolean, debounce trễ API dễ gây trạng thái sai); cooldown giữa các **lần hoàn tất** hợp lý hơn.

## Trong repo

- Màn **Cài đặt → Thông báo** (`mobile/app/profile-details/notifications.tsx`): switch **Thông báo đẩy** dùng `pushBusy` + cooldown (`SETTINGS_TOGGLE_MIN_INTERVAL_MS`). Switch **Thông báo email** dùng `useMutation` + cùng cooldown + `ActivityIndicator` khi pending (`PUT /v1/users/me` với `emailNotificationsEnabled`).
- Switch **nhắc nhở** vẫn chỉ `setState` cục bộ — chưa API.

## Khi thêm switch mới có side-effect

1. Dùng `Switch` **controlled** (`value` + `onValueChange`) để có thể bỏ qua thao tác mà không lệch UI.
2. Busy + optional cooldown cho network.
3. Tránh `onValueChange={setX}` trực tiếp nếu `X` trigger API — bọc handler async có guard.
