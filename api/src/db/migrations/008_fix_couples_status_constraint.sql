-- Update couples status constraint to use Vietnamese names as per codebase conventions
-- and migrate existing data if any.

-- 1. Temporary disable the constraint
ALTER TABLE couples DROP CONSTRAINT IF EXISTS chk_couples_status;

-- 2. Update existing status values from English to Vietnamese
UPDATE couples SET status = 'CHO_GHEP_DOI' WHERE status = 'PENDING';
UPDATE couples SET status = 'DANG_YEU' WHERE status = 'DATING';
UPDATE couples SET status = 'DA_CUOI' WHERE status = 'MARRIED';
UPDATE couples SET status = 'DA_CHIA_TAY' WHERE status = 'BROKEN_UP';

-- 3. Re-add the constraint with correct Vietnamese values
ALTER TABLE couples ADD CONSTRAINT chk_couples_status 
  CHECK (status IN ('CHO_GHEP_DOI', 'DANG_YEU', 'DA_CUOI', 'DA_CHIA_TAY'));
