UPDATE public.company_profiles
SET logo_url = 'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/stoneage_logo.png',
    updated_at = now()
WHERE slug = 'stoneage';

UPDATE public.homepage_job_cards
SET logo_url = 'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/stoneage_logo.png',
    updated_at = now()
WHERE job_url = '/company/stoneage'
   OR company_label = '석기시대';
