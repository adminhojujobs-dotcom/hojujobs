
-- Reinterpret stored UTC wall-clock time as Sydney local time, then store correctly as UTC
UPDATE jobs
SET uploaded_at = (uploaded_at AT TIME ZONE 'UTC') AT TIME ZONE 'Australia/Sydney'
WHERE uploaded_at IS NOT NULL;
;
