CREATE TABLE IF NOT EXISTS in_app_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  couple_id UUID REFERENCES couples(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  icon_name VARCHAR(80),
  icon_color VARCHAR(32),
  icon_bg VARCHAR(32),
  action_label VARCHAR(120),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_in_app_notifications_user_created
  ON in_app_notifications (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_in_app_notifications_user_unread
  ON in_app_notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;

ALTER TABLE users ADD COLUMN IF NOT EXISTS expo_push_token TEXT;
