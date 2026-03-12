CREATE TABLE IF NOT EXISTS user_refresh_sessions (
  refresh_token TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_refresh_sessions_user_id ON user_refresh_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_refresh_sessions_expires_at ON user_refresh_sessions(expires_at);
