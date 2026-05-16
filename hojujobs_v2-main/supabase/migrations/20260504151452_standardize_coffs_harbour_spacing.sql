
UPDATE jobs
SET location = array_replace(location, '콥스하버', '콥스 하버')
WHERE '콥스하버' = ANY(location);
;
