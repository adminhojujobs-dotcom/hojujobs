ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS apply_email text;

UPDATE public.company_job_openings AS opening
SET apply_email = COALESCE(
  (
    SELECT branch.email
    FROM public.company_branches AS branch
    WHERE branch.id = opening.branch_id
  ),
  (
    SELECT profile.email
    FROM public.company_profiles AS profile
    WHERE profile.slug = opening.company_slug
  )
)
WHERE apply_email IS NULL;

UPDATE public.company_job_openings
SET apply_email = 'kmall09.ops.oscar@gmail.com'
WHERE company_slug = 'kmall09'
  AND title IN (
    '리드컴 케이몰 KOPO 분식매장 직원 모집',
    'KMALL09 리드컴 2호점 직원 모집',
    'KMALL09 리드컴 요아정 매장 매니저 및 직원 모집'
  );

UPDATE public.company_job_openings
SET apply_email = 'JUN.MOON@KMALL09.COM.AU'
WHERE company_slug = 'kmall09'
  AND title = 'KMALL09 뱅크스타운 3호점 직원 모집';

UPDATE public.company_job_openings
SET apply_email = 'md@kmall09.com.au'
WHERE company_slug = 'kmall09'
  AND title = 'KMALL09 시티 4호점 직원 모집';

UPDATE public.company_job_openings
SET apply_email = NULL
WHERE company_slug = 'yanggadeli'
  AND title = 'Yangga Deli 로즈점 주방 직원 모집';
