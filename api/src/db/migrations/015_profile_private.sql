-- Hồ sơ riêng tư: khi bật, client/backend có thể giới hạn ai xem được hồ sơ (áp dụng ở luồng discovery sau).
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS profile_private BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN users.profile_private IS 'true = hồ sơ chỉ hiển thị đầy đủ cho người đã ghép đôi (theo policy sản phẩm).';
