CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  nickname VARCHAR(50),
  avatar_url VARCHAR(500),
  gender VARCHAR(20) NOT NULL,
  dob DATE,
  auth_provider VARCHAR(20) NOT NULL,
  auth_id VARCHAR(255) NOT NULL,
  password_hash TEXT,
  timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_users_gender CHECK (gender IN ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY')),
  CONSTRAINT chk_users_provider CHECK (auth_provider IN ('LOCAL', 'GOOGLE', 'APPLE')),
  CONSTRAINT chk_users_password_for_local CHECK (
    (auth_provider = 'LOCAL' AND password_hash IS NOT NULL)
    OR (auth_provider <> 'LOCAL')
  ),
  CONSTRAINT uq_users_auth UNIQUE (auth_provider, auth_id),
  CONSTRAINT uq_users_email UNIQUE (email)
);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS password_hash TEXT;

ALTER TABLE users
  DROP CONSTRAINT IF EXISTS chk_users_provider;

ALTER TABLE users
  ADD CONSTRAINT chk_users_provider
  CHECK (auth_provider IN ('LOCAL', 'GOOGLE', 'APPLE'));

ALTER TABLE users
  DROP CONSTRAINT IF EXISTS chk_users_password_for_local;

ALTER TABLE users
  ADD CONSTRAINT chk_users_password_for_local
  CHECK (
    (auth_provider = 'LOCAL' AND password_hash IS NOT NULL)
    OR (auth_provider <> 'LOCAL')
  );

CREATE TABLE IF NOT EXISTS user_sessions (
  access_token TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS couples (
  id UUID PRIMARY KEY,
  partner_1_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  partner_2_id UUID REFERENCES users(id) ON DELETE SET NULL,
  love_start_date DATE,
  wedding_date DATE,
  status VARCHAR(30) NOT NULL,
  invite_code VARCHAR(10),
  invite_expires_at TIMESTAMPTZ,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_couples_status CHECK (status IN ('CHO_GHEP_DOI', 'DANG_YEU', 'DA_CUOI', 'DA_CHIA_TAY')),
  CONSTRAINT chk_couples_not_self CHECK (partner_1_id IS DISTINCT FROM partner_2_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_couples_invite_code ON couples(invite_code) WHERE invite_code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_couples_pair_unique ON couples (
  LEAST(partner_1_id, partner_2_id),
  GREATEST(partner_1_id, partner_2_id)
)
WHERE partner_2_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  memory_date DATE NOT NULL,
  media_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_memories_couple_date ON memories(couple_id, memory_date DESC);

CREATE TABLE IF NOT EXISTS emotional_cycles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  cycle_duration INTEGER NOT NULL,
  period_duration INTEGER NOT NULL,
  symptom_notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_tracking_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_emotional_cycles_user_id ON emotional_cycles(user_id);
