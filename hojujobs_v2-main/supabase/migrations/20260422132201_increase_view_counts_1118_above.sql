
UPDATE view_counts
SET 
  count = count + floor(random() * 18 + 9)::int,
  updated_at = now()
WHERE job_id >= 1118;
;
