CREATE TABLE IF NOT EXISTS nudges (
  id UUID PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  CONSTRAINT chk_nudges_type CHECK (
    type IN ('POKE', 'HUG', 'MISS_YOU', 'KISS', 'ANGRY', 'MAKE_UP', 'EAT_TOGETHER', 'CALL_ME')
  ),
  CONSTRAINT chk_nudges_not_self CHECK (from_user_id IS DISTINCT FROM to_user_id)
);

CREATE INDEX IF NOT EXISTS idx_nudges_to_user_created
  ON nudges(to_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_nudges_couple_created
  ON nudges(couple_id, created_at DESC);
