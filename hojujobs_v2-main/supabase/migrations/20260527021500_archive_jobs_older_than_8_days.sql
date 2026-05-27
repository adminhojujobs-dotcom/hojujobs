BEGIN;

INSERT INTO public.jobs_archive
OVERRIDING SYSTEM VALUE
SELECT *
FROM public.jobs
WHERE uploaded_at IS NOT NULL
  AND uploaded_at < now() - interval '8 days'
ON CONFLICT (id) DO NOTHING;

DELETE FROM public.jobs
WHERE uploaded_at IS NOT NULL
  AND uploaded_at < now() - interval '8 days'
  AND EXISTS (
    SELECT 1
    FROM public.jobs_archive
    WHERE jobs_archive.id = jobs.id
  );

COMMIT;
