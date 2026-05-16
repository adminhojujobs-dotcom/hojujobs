
-- 2026-05-12 01:00:00 Sydney (AEST UTC+10) = 2026-05-11 15:00:00+00 UTC
-- id 3805 = base time, each subsequent id adds 1 second
-- id 4043 = 4043 - 3805 = 238 seconds later = latest

UPDATE jobs
SET uploaded_at = (TIMESTAMPTZ '2026-05-11 15:00:00+00') + ((id - 3805) * INTERVAL '1 second')
WHERE id BETWEEN 3805 AND 4043;
;
