# Ticket 38 — Ghi chú kỹ thuật

- Phụ thuộc bucket `emplus` đã `anonymous download` (docker `minio-init`).
- Client không upload thẳng MinIO; chỉ gọi API có bearer token.

## Hotfix (2026-04-04)

- Ảnh sau khi chọn: picker `Compatible` + `exif: false` + `quality` 0.75; thumbnail `expo-image` `transition={0}`, `cachePolicy`, `priority="high"`.
- Lịch: `locale` `vi_VN` / `vi-VN` theo platform.
- Form: thêm chọn **Loại** → một tag (`ky-niem` | `chi-phi` | `nhiem-vu`).
- Submit: bỏ hàng `ActivityIndicator` dưới nút (trùng với `Button` `loading`).
- Loại: 3 chip một hàng (`flex: 1`, `nowrap`).
