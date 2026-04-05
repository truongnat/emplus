-- Add index on user_sessions.user_id for CASCADE performance
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions (user_id);

-- Ensure is_admin is NOT NULL (backfill existing NULLs to false)
UPDATE users SET is_admin = FALSE WHERE is_admin IS NULL;
ALTER TABLE users ALTER COLUMN is_admin SET NOT NULL;
ALTER TABLE users ALTER COLUMN is_admin SET DEFAULT FALSE;
