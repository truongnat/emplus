-- Giờ sinh (HH:mm 24h, TEXT) — nullable.
ALTER TABLE users ADD COLUMN IF NOT EXISTS birth_time VARCHAR(5);

ALTER TABLE users ADD CONSTRAINT chk_users_birth_time
  CHECK (birth_time IS NULL OR birth_time ~ '^\d{2}:\d{2}$');
