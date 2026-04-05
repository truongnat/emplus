-- Cho phép người dùng tắt hiển thị trạng thái online với người khác (presence sau này đọc cờ này).
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS show_online_status BOOLEAN NOT NULL DEFAULT true;

COMMENT ON COLUMN users.show_online_status IS 'false = không hiển thị online cho người khác (theo policy sản phẩm).';
