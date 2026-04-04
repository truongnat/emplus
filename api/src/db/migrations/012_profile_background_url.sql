-- Profile header / banner image URL (public object URL after media upload)
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_background_url VARCHAR(500);
