ALTER TABLE public.homepage_job_cards
ADD COLUMN logo_url text;

INSERT INTO public.homepage_job_cards (
  sort_order,
  logo_text,
  logo_url,
  logo_tone,
  company_label,
  location_label,
  title,
  pay_type,
  pay_amount,
  job_url
) VALUES (
  5,
  'KMALL09',
  'https://kmall09.com.au/cdn/shop/files/LOGO_COLOR_SETTING-01.jpg?v=1768457068&width=480',
  'blue',
  'KMALL09',
  'NSW · 리드컴',
  'KMALL09 직원 모집',
  '급여',
  '면접 시 협의',
  '/company/kmall09'
);
