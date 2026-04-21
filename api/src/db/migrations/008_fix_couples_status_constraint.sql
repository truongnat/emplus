-- Update couples status constraint to use Vietnamese names as per codebase conventions
-- and migrate existing data if any.

-- 1. Temporary disable the constraint
ALTER TABLE couples DROP CONSTRAINT IF EXISTS chk_couples_status;

-- 2. Update existing status values from English to Vietnamese
UPDATE couples SET status = 'PENDING' WHERE status = 'PENDING';
UPDATE couples SET status = 'DATING' WHERE status = 'DATING';
UPDATE couples SET status = 'MARRIED' WHERE status = 'MARRIED';
UPDATE couples SET status = 'SEPARATED' WHERE status = 'BROKEN_UP';

-- 3. Re-add the constraint with correct English values
ALTER TABLE couples ADD CONSTRAINT chk_couples_status 
  CHECK (status IN ('PENDING', 'DATING', 'MARRIED', 'SEPARATED'));
