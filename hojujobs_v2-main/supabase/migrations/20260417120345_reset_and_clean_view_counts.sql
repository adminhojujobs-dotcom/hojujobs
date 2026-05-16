
-- 1. 기존 view_counts 전체 삭제 후 jobs 기준으로 순서대로 재삽입 (count = 0 초기화)
TRUNCATE view_counts RESTART IDENTITY;

-- 2. jobs.id 순서대로 깔끔하게 재삽입
INSERT INTO view_counts (job_id, count, updated_at)
SELECT id, 0, now()
FROM jobs
ORDER BY id ASC;
;
