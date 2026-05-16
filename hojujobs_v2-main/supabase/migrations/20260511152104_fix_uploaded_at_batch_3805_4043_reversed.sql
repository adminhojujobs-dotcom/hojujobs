
-- id 4043 = base (oldest) = 2026-05-12 01:00:00 Sydney = 2026-05-11 15:00:00+00 UTC
-- id 3805 = newest = base + (4043 - 3805) seconds = base + 238 seconds
-- So each row: base + (4043 - id) seconds

UPDATE jobs
SET uploaded_at = (TIMESTAMPTZ '2026-05-11 15:00:00+00') + ((4043 - id) * INTERVAL '1 second')
WHERE id BETWEEN 3805 AND 4043;
;
