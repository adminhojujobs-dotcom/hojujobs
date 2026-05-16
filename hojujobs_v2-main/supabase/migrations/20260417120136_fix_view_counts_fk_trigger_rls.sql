
-- 1. 고아 레코드 삭제 (jobs에 없는 job_id의 view_counts)
DELETE FROM view_counts
WHERE job_id NOT IN (SELECT id FROM jobs);

-- 2. FK 제약조건 추가 (job 삭제 시 view_count 자동 삭제)
ALTER TABLE view_counts
  ADD CONSTRAINT fk_view_counts_job_id
  FOREIGN KEY (job_id)
  REFERENCES jobs(id)
  ON DELETE CASCADE;

-- 3. job_id 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_view_counts_job_id ON view_counts(job_id);

-- 4. 기존 중복 함수 제거 후 단일 버전으로 통합 (integer 타입, SECURITY DEFINER)
DROP FUNCTION IF EXISTS increment_view_count(bigint);
DROP FUNCTION IF EXISTS increment_view_count(integer);

CREATE FUNCTION increment_view_count(p_job_id integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  INSERT INTO view_counts (job_id, count, updated_at)
  VALUES (p_job_id, 1, now())
  ON CONFLICT (job_id)
  DO UPDATE SET
    count = view_counts.count + 1,
    updated_at = now()
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

-- 5. 함수 실행 권한 부여 (익명 포함)
GRANT EXECUTE ON FUNCTION increment_view_count(integer) TO anon, authenticated;

-- 6. 신규 job 생성 시 view_counts row 자동 생성 트리거
CREATE OR REPLACE FUNCTION create_view_count_for_new_job()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO view_counts (job_id, count, updated_at)
  VALUES (NEW.id, 0, now())
  ON CONFLICT (job_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_create_view_count_on_job_insert ON jobs;
CREATE TRIGGER trg_create_view_count_on_job_insert
  AFTER INSERT ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION create_view_count_for_new_job();

-- 7. 기존 jobs 중 view_counts row가 없는 것 초기화
INSERT INTO view_counts (job_id, count, updated_at)
SELECT id, 0, now()
FROM jobs
WHERE id NOT IN (SELECT job_id FROM view_counts)
ON CONFLICT (job_id) DO NOTHING;

-- 8. RLS 정책 추가 (INSERT/UPDATE — 익명 사용자 포함)
DROP POLICY IF EXISTS "누구나 조회수 증가 가능" ON view_counts;
DROP POLICY IF EXISTS "누구나 조회수 업데이트 가능" ON view_counts;

CREATE POLICY "누구나 조회수 증가 가능"
  ON view_counts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "누구나 조회수 업데이트 가능"
  ON view_counts
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
;
