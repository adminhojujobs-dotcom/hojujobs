
UPDATE view_counts
SET 
  count = count + floor(random() * 11 + 5)::int,
  updated_at = now()
WHERE job_id >= 718;
;
