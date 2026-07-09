-- The 5 new Melbourne companies' subtitles were bare "location + cuisine +
-- 레스토랑" tags, then briefly English-tagged ("Korean BBQ" etc). Rewrites
-- them as pure-Korean, moderately short descriptions matching sibling
-- companies' style and length (e.g. KMALL09 "호주 최대 규모의 한국식
-- 백화점·마트").
UPDATE public.company_profiles SET subtitle = '멜버른 숯불 바베큐 전문점', updated_at = now() WHERE slug = 'bbqcode';
UPDATE public.company_profiles SET subtitle = '멜버른 도심의 한식 바베큐집', updated_at = now() WHERE slug = 'paiksbbq';
UPDATE public.company_profiles SET subtitle = '다양한 한식 메뉴를 선보이는 레스토랑', updated_at = now() WHERE slug = 'dooboo';
UPDATE public.company_profiles SET subtitle = '치킨과 맥주를 함께 즐기는 한식 주점', updated_at = now() WHERE slug = 'samsamchicken';
UPDATE public.company_profiles SET subtitle = '백종원 대표가 만든 한식 바베큐 브랜드', updated_at = now() WHERE slug = 'bornga';
