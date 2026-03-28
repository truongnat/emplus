-- Update users gender constraint to use Vietnamese names as per codebase conventions
-- and migrate existing data if any.

-- 1. Temporary disable the constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_gender;

-- 2. Update existing gender values from English to Vietnamese
UPDATE users SET gender = 'NAM' WHERE gender = 'MALE';
UPDATE users SET gender = 'NU' WHERE gender = 'FEMALE';
UPDATE users SET gender = 'KHAC' WHERE gender = 'OTHER';
UPDATE users SET gender = 'KHONG_TIET_LO' WHERE gender = 'PREFER_NOT_TO_SAY';

-- 3. Re-add the constraint with correct Vietnamese values
ALTER TABLE users ADD CONSTRAINT chk_users_gender 
  CHECK (gender IN ('NAM', 'NU', 'KHAC', 'KHONG_TIET_LO'));
