# Ticket 54 — Notes

- `nickname` = tên hiển thị trong sản phẩm; không thêm cột `display_name` để tránh trùng nghĩa.
- Ảnh bìa và avatar dùng cùng endpoint upload timeline (`POST /v1/media/upload`); URL tuyệt đối https? từ MinIO.
- Validation URL: chỉ chấp nhận `http://` hoặc `https://` cho `avatarUrl` và `profileBackgroundUrl` khi cập nhật.
