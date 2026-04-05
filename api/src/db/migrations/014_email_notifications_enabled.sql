-- Tùy chọn nhận thông báo qua email (marketing / digest — worker gửi mail cần kiểm tra cột này).
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS email_notifications_enabled BOOLEAN NOT NULL DEFAULT true;

COMMENT ON COLUMN users.email_notifications_enabled IS 'User bật nhận email thông báo từ ứng dụng';
