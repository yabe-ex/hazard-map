-- Add photo_taken_at column to hazard_posts to store the distance from post location in meters
ALTER TABLE hazard_posts ADD COLUMN IF NOT EXISTS photo_taken_at INTEGER;
COMMENT ON COLUMN hazard_posts.photo_taken_at IS 'Distance in meters between the post location and the photo EXIF location';
