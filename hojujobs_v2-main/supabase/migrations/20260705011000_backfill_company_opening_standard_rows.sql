ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.company_job_openings AS opening
SET
  condition_rows = COALESCE(
    (
      SELECT branch.condition_rows
      FROM public.company_branches AS branch
      WHERE branch.id = opening.branch_id
    ),
    profile.condition_rows,
    '[]'::jsonb
  ),
  recruitment_rows = COALESCE(
    (
      SELECT branch.recruitment_rows
      FROM public.company_branches AS branch
      WHERE branch.id = opening.branch_id
    ),
    profile.recruitment_rows,
    '[]'::jsonb
  ),
  updated_at = now()
FROM public.company_profiles AS profile
WHERE profile.slug = opening.company_slug
  AND (
    opening.condition_rows = '[]'::jsonb
    OR opening.recruitment_rows = '[]'::jsonb
  );
