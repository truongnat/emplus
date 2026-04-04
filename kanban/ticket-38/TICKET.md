# Ticket 38 — Màn thêm kỷ niệm: UI đồng bộ + form (ảnh MinIO, lịch, ghi chú)

## Metadata

- **ticket_id**: 38
- **status**: done
- **domain_stack**: `mobile` (Expo) + `api` (Hono / MinIO)
- **closed**: 2026-04-04

## Spec

- Đồng bộ **shell** với Home / Timeline: `LoginGridAnimatedBackground`, `useAuthGridChrome`, padding 22, thẻ bo 28.
- Form bám **API** `POST /v1/timeline/memories`: `title`, `memoryDate` (YYYY-MM-DD), `description` (ghi chú), `mediaUrls[]`, `tags: ["ky-niem"]`.
- **Nhiều ảnh**: upload qua API lên **MinIO**, nhận URL công khai rồi gửi trong `mediaUrls`.
- **Ngày kỷ niệm**: calendar picker (`@react-native-community/datetimepicker`), không nhập tay.
- **Ghi chú**: multiline → `description`.

## Implementation

### API

- `POST /v1/media/upload` — multipart `file`; `requireAuth`; JPEG/PNG/WebP/GIF; tối đa 10MB; lưu `timeline/{userId}/{uuid}.ext`; trả `{ url }`.
- `MINIO_PUBLIC_BASE_URL` (tuỳ chọn) cho thiết bị thật / LAN.
- Sanitize middleware: bỏ qua `json()` khi `multipart/form-data` để không đọc body.

### Mobile

- `pickMemoryImages` (`expo-helpers`), tối đa 12 ảnh / lần chọn cộng dồn.
- `ApiClient.post` hỗ trợ `FormData` (không gắn `Content-Type: application/json`).
- `uploadTimelineMemoryPhoto` → `/media/upload`.
- `app/add-memory.tsx`: preview dạng strip, Input soft, modal date iOS, Android native picker.

## Verify

- `bunx tsc --noEmit` trong `api/` và `mobile/`.

## Residual risk

- Upload thành công nhưng `createMemory` lệch → object orphan trên MinIO (chưa dọn).
- Thiết bị thật cần **MINIO_PUBLIC_BASE_URL** trỏ tới host máy dev nếu `localhost` không resolve.
