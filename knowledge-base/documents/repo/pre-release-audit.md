# Pre-Release Audit — Em+ v0.1.0

> Ngày audit: 2026-04-05
> Scope: Toàn bộ ticket list từ w-ticket + w-hotfix

---

## Tổng quan

| # | Tính năng | Trạng thái | Ghi chú |
|---|-----------|-----------|---------|
| 1 | Date picker (calendar + month/year) | DONE | `DatePickerSheet` có step `monthYear` với 2 wheel columns |
| 2 | Time picker | DONE | `TimePickerSheet` 24h format, AM/PM trong title |
| 3 | Push notifications — mobile token + UI | DONE | Token sync, NotificationBootstrap, tab notifications |
| 4 | Push notifications — server-side sending | DONE | `push.ts` gửi qua Expo HTTP API; `notification.service.ts` orchestrate |
| 5 | Email notifications | DONE | `sendNotificationEmail` + flag `emailNotificationsEnabled` wired |
| 6 | Hồ sơ riêng tư switch | DONE | `privacy.tsx` — switch profilePrivate + API |
| 7 | Hiển thị trạng thái online | DONE | Switch UI + WS heartbeat presence + broadcast online status |
| 8 | Ẩn tính năng nhắn tin | DONE | Không có chat UI; comment ghi rõ "phase sau" |
| 9 | Chi tiết Trợ giúp | DONE | `help.tsx` — mẹo nhanh, FAQ, điều khoản, email hỗ trợ |
| 10 | Ẩn đồng bộ sao lưu đám mây | DONE | Không có UI; comment ghi "premium phase sau" |
| 11 | Bỏ label nguy hiểm + custom dialog | DONE | Logout trong card "Tùy chọn", dùng `useAlertDialog`, không dùng `Alert.alert` |
| 12 | Update app icon | DONE | `icon.png` 1024×1024, `app.json` icon + adaptiveIcon |
| 13 | Animated splash screen | DONE | `AnimatedSplashScreen` — gradient, orbs, sparkles, glow ring |
| 14 | Native splash image | DONE | `splash.image` set trong `app.json` |
| 15 | Budget filter bug (category→status) | DONE | `budgetQueries.ts` gửi `status`, OpenAPI đã sửa |

---

## Gaps — ĐÃ XỬ LÝ (2026-04-05)

| Gap | Vấn đề | Fix |
|-----|--------|-----|
| GAP-1 | Push sender chưa có | `api/src/services/push.ts` — Expo HTTP API |
| GAP-2 | `emailNotificationsEnabled` chưa dùng | `notification.service.ts` check flag → `sendNotificationEmail` |
| GAP-3 | Online presence chưa có | WS heartbeat + `userPresence` map + broadcast `presence` event |
| GAP-4 | Notification chỉ demo | Wired: budget `createExpense`, couple `joinCouple`, care mood update |
| GAP-5 | Thiếu `eas.json` | `mobile/eas.json` — development, preview, production profiles |
| GAP-6 | `.env.example` thiếu biến | Thêm `MAIL_USER/PASS`, `READ_DATABASE_URL`, `DATA_ENCRYPTION_KEY` |

---

## Các tính năng đã ẩn / defer (đúng kế hoạch)

- **Nhắn tin (chat/DM):** Phase tiếp theo, chưa có UI.
- **Đồng bộ sao lưu đám mây:** Phase sau, premium feature.
- **`@react-native-community/datetimepicker`:** Chỉ dùng ở `add-memory.tsx`, các chỗ khác dùng custom picker.

---

## Security notes

- `DATA_ENCRYPTION_KEY` required in production (code comment) nhưng chưa enforce check khi boot.
- Swagger default OFF in production (`swaggerEnabled` = `nodeEnv !== "production"`).
- `allowMockOAuth` chỉ bật khi `NODE_ENV=test`.
- Rate limiting trên `/v1/auth/*`.
- CSP + HSTS headers chỉ production.
- No `Alert.alert` usage — toàn bộ dùng custom `AlertDialogProvider`.
