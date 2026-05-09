CREATE TABLE IF NOT EXISTS custom_milestones (
  id UUID PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  milestone_date DATE NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'CUSTOM',
  category VARCHAR(30) NOT NULL DEFAULT 'OTHER',
  remind_before_days INTEGER[] NOT NULL DEFAULT ARRAY[1,3,7],
  is_important BOOLEAN NOT NULL DEFAULT false,
  created_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_custom_milestones_type CHECK (type IN ('CUSTOM')),
  CONSTRAINT chk_custom_milestones_category CHECK (category IN ('ANNIVERSARY', 'DATE', 'MEMORY', 'GIFT', 'OTHER'))
);

CREATE INDEX IF NOT EXISTS idx_custom_milestones_couple_date
  ON custom_milestones(couple_id, milestone_date);

CREATE INDEX IF NOT EXISTS idx_custom_milestones_couple_important
  ON custom_milestones(couple_id, is_important);
