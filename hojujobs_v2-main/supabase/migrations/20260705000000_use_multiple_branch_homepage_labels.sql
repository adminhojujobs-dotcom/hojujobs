UPDATE public.homepage_job_cards
SET location_label = CASE
  WHEN company_label = 'KMALL09' THEN 'NSW · 여러 지점'
  ELSE replace(location_label, '다지점', '여러 지점')
END
WHERE company_label = 'KMALL09'
   OR location_label LIKE '%다지점%';
