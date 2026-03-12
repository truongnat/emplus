-- Migration: Create anniversaries table
-- Date: 2026-03-07

CREATE TABLE IF NOT EXISTS anniversaries (
  id UUID PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  recurrence_type VARCHAR(20) NOT NULL DEFAULT 'NONE',
  category VARCHAR(30) NOT NULL,
  is_system_generated BOOLEAN NOT NULL DEFAULT FALSE,
  notify_settings JSONB NOT NULL DEFAULT '{"t7": true, "t3": true, "t0": true}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for querying anniversaries by couple
CREATE INDEX IF NOT EXISTS idx_anniversaries_couple_id ON anniversaries(couple_id);

-- Index for querying upcoming anniversaries
CREATE INDEX IF NOT EXISTS idx_anniversaries_event_date ON anniversaries(couple_id, event_date);
