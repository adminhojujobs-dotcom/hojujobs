UPDATE public.company_branches
SET
  branch_name = '브룩필드 플레이스',
  branch_label = 'Brookfield Place, Sydney CBD',
  address = 'Shop HC 32, 301 George Street, Sydney NSW 2000',
  map_query = 'Shop HC 32, 301 George Street, Sydney NSW 2000',
  email = 'hr@sushiyuzen.com.au',
  condition_rows = '[["급여", "면접 시 협의"], ["근무지역", "Shop HC 32, 301 George Street, Sydney NSW 2000", "SUSHI YUZEN Brookfield Place"], ["모집분야", "매장 직원"]]'::jsonb,
  recruitment_rows = '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  sort_order = 2,
  is_active = true,
  updated_at = now()
WHERE company_slug = 'sushiyuzen'
  AND branch_name = '시드니 CBD';

WITH branches(company_slug, branch_name, branch_label, address, sort_order) AS (
  VALUES
    ('sushiyuzen', '노스포인트', 'Northpoint, North Sydney', 'NorthPoint Food Hall, Shop 17a, 100 Miller Street, North Sydney NSW 2060', 1),
    ('sushiyuzen', '브룩필드 플레이스', 'Brookfield Place, Sydney CBD', 'Shop HC 32, 301 George Street, Sydney NSW 2000', 2),
    ('sushiyuzen', '시드니 플레이스', 'Sydney Place, Sydney CBD', 'Shop CB 04, 180 George Street, Sydney NSW 2000', 3),
    ('sushiyuzen', '더 록스 센터', 'The Rocks Centre Sydney', 'Shop 22, 10-26 Playfair Street, The Rocks, Sydney NSW 2000', 4),
    ('sushiyuzen', '파라마타 스퀘어', 'Parramatta Square', 'Shop 3.04, Building 3 Parramatta Square, 153 Macquarie Street, Parramatta NSW 2150', 5),
    ('sushiyuzen', '530 콜린스 스트리트', '530 Collins Street', 'Shop T00, 530 Collins Street, Melbourne VIC 3000', 6),
    ('sushiyuzen', '530 리틀 콜린스 스트리트', '530 Little Collins Street', 'Shop 5 Ground Floor, 530 Little Collins Street, Melbourne VIC 3000', 7),
    ('sushiyuzen', '하드웨어 레인', '30 Hardware Lane', '30 Hardware Lane, Melbourne VIC 3000', 8),
    ('sushiyuzen', '디스트릭트 쇼핑 센터', 'The District Shopping Centre', 'Shop TM-G-T18A, 90 Waterfront Way, Docklands VIC 3008', 9)
)
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
)
SELECT
  company_slug,
  branch_name,
  branch_label,
  address,
  address,
  NULL,
  NULL,
  'hr@sushiyuzen.com.au',
  jsonb_build_array(
    jsonb_build_array('급여', '면접 시 협의'),
    jsonb_build_array('근무지역', address, 'SUSHI YUZEN ' || branch_label),
    jsonb_build_array('모집분야', '매장 직원')
  ),
  '[["모집마감", "상시모집"], ["지원방법", "이메일로 지원"]]'::jsonb,
  sort_order
FROM branches next_branch
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches existing
  WHERE existing.company_slug = next_branch.company_slug
    AND (
      existing.branch_name = next_branch.branch_name
      OR existing.branch_label = next_branch.branch_label
      OR existing.address = next_branch.address
    )
);

UPDATE public.company_profiles
SET
  address = 'North Sydney · Sydney CBD · The Rocks · Parramatta · Melbourne CBD · Docklands',
  map_query = 'Shop HC 32, 301 George Street, Sydney NSW 2000',
  condition_rows = '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "North Sydney · Sydney CBD · The Rocks · Parramatta · Melbourne CBD · Docklands", "SUSHI YUZEN 매장"],
    ["근무요일", "협의 가능"],
    ["근무시간", "매장 운영 시간 내 협의"],
    ["모집분야", "롤메이커, 키친, 캐셔, 매장 직원"],
    ["복리후생", "법정 연금, 트레이닝, 팀 근무 환경"]
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'sushiyuzen';
