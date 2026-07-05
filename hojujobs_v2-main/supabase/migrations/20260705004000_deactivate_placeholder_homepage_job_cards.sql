UPDATE public.homepage_job_cards
SET is_active = false,
    updated_at = now()
WHERE job_url IS NULL
   OR job_url NOT LIKE '/company/%'
   OR NOT EXISTS (
     SELECT 1
     FROM public.company_profiles
     WHERE company_profiles.slug = regexp_replace(homepage_job_cards.job_url, '^/company/', '')
       AND company_profiles.is_active = true
   );
