-- Nhịp tâm trạng (slider) theo user; partner trong couple đọc được qua API.

CREATE TABLE IF NOT EXISTS user_mood (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  value SMALLINT NOT NULL CHECK (value >= 0 AND value <= 100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_mood_updated_at ON user_mood(updated_at DESC);
