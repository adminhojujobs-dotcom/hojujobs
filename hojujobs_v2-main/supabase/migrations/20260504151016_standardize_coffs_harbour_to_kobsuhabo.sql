
UPDATE jobs
SET location = array_replace(location, '코프스 하버', '콥스하버')
WHERE '코프스 하버' = ANY(location);
;
