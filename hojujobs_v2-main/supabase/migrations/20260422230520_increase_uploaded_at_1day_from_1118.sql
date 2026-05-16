
UPDATE jobs
SET uploaded_at = uploaded_at + INTERVAL '1 day'
WHERE id >= 1118;
;
