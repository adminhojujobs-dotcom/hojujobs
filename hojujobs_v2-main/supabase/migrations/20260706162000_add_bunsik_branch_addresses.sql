DELETE FROM public.company_branches
WHERE company_slug = 'bunsik';

INSERT INTO public.company_branches (
  company_slug,
  branch_name,
  branch_label,
  address,
  map_query,
  phone,
  phone_href,
  email,
  condition_rows,
  recruitment_rows,
  sort_order
) VALUES
(
  'bunsik',
  '리버풀',
  'Liverpool',
  'Westfield Liverpool, Lot 22, S259/25 George St, Liverpool NSW 2170',
  'Westfield Liverpool, Lot 22, S259/25 George St, Liverpool NSW 2170',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "Westfield Liverpool, Lot 22, S259/25 George St, Liverpool NSW 2170", "Bunsik Liverpool"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  1
),
(
  'bunsik',
  '로즈',
  'Rhodes',
  'Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138',
  'Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138", "Bunsik Rhodes"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  2
),
(
  'bunsik',
  '허스트빌',
  'Hurstville',
  'Westfield Hurstville, Shop 463/3 Cross St, Hurstville NSW 2220',
  'Westfield Hurstville, Shop 463/3 Cross St, Hurstville NSW 2220',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "Westfield Hurstville, Shop 463/3 Cross St, Hurstville NSW 2220", "BUNSIK Hurstville"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  3
),
(
  'bunsik',
  '탑라이드',
  'Top Ryde',
  'Corner of Blaxland Road & Devlin Street Shop L1 K403 / Top, Ryde NSW 2112',
  'Corner of Blaxland Road & Devlin Street Shop L1 K403 / Top, Ryde NSW 2112',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "Corner of Blaxland Road & Devlin Street Shop L1 K403 / Top, Ryde NSW 2112", "BUNSIK Top Ryde"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  4
),
(
  'bunsik',
  '채스우드',
  'Chatswood',
  'Westfield Chatswood, Shop 228, Level 2/1 Anderson St, Chatswood NSW 2067',
  'Westfield Chatswood, Shop 228, Level 2/1 Anderson St, Chatswood NSW 2067',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "Westfield Chatswood, Shop 228, Level 2/1 Anderson St, Chatswood NSW 2067", "BUNSIK Chatswood"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  5
),
(
  'bunsik',
  '파라마타',
  'Parramatta',
  'Westfield Parramatta, K544 Level 5/131 Church St, Parramatta NSW 2150',
  'Westfield Parramatta, K544 Level 5/131 Church St, Parramatta NSW 2150',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "Westfield Parramatta, K544 Level 5/131 Church St, Parramatta NSW 2150", "BUNSIK Parramatta"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  6
),
(
  'bunsik',
  '로즈랜드',
  'Roselands',
  '24 Roselands Ave, Roselands NSW 2196',
  '24 Roselands Ave, Roselands NSW 2196',
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  '[["급여", "면접 시 협의"], ["근무지역", "24 Roselands Ave, Roselands NSW 2196", "BUNSIK Roselands"], ["모집분야", "매장 직원"]]'::jsonb,
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  7
);

UPDATE public.company_profiles
SET
  address = 'Liverpool · Rhodes · Hurstville · Top Ryde · Chatswood · Parramatta · Roselands',
  map_query = 'Westfield Parramatta, K544 Level 5/131 Church St, Parramatta NSW 2150',
  condition_rows = '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "Liverpool · Rhodes · Hurstville · Top Ryde · Chatswood · Parramatta · Roselands", "지점별 채용"],
    ["근무요일", "협의 가능"],
    ["근무시간", "매장 운영 시간 내 협의"],
    ["모집분야", "매장 직원"],
    ["복리후생", "K-Food 프랜차이즈 매장 근무"]
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'bunsik';
