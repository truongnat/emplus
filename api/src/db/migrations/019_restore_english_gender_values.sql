-- Restore canonical English gender values across the database contract.

ALTER TABLE users DROP CONSTRAINT IF EXISTS chk_users_gender;

UPDATE users SET gender = 'MALE' WHERE gender = 'NAM';
UPDATE users SET gender = 'FEMALE' WHERE gender = 'NU';
UPDATE users SET gender = 'OTHER' WHERE gender = 'KHAC';
UPDATE users SET gender = 'PREFER_NOT_TO_SAY' WHERE gender = 'KHONG_TIET_LO';

ALTER TABLE users ADD CONSTRAINT chk_users_gender
  CHECK (gender IN ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'));
