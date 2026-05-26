BEGIN;

CREATE TABLE IF NOT EXISTS public.jobs_archive
(LIKE public.jobs INCLUDING ALL);

ALTER TABLE public.jobs_archive ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read archived jobs" ON public.jobs_archive;

CREATE POLICY "Anyone can read archived jobs"
  ON public.jobs_archive
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO public.jobs_archive
OVERRIDING SYSTEM VALUE
SELECT *
FROM public.jobs
WHERE uploaded_at IS NOT NULL
  AND uploaded_at < now() - interval '10 days'
ON CONFLICT (id) DO NOTHING;

DELETE FROM public.jobs
WHERE uploaded_at IS NOT NULL
  AND uploaded_at < now() - interval '10 days'
  AND EXISTS (
    SELECT 1
    FROM public.jobs_archive
    WHERE jobs_archive.id = jobs.id
  );

COMMIT;
