ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[] NOT NULL DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS apply_email text;

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
  'sushiyuzen',
  '시드니 CBD',
  'Sydney CBD',
  'Sydney CBD NSW 2000',
  'Sydney CBD NSW 2000',
  NULL,
  NULL,
  'hr@sushiyuzen.com.au',
  '[]'::jsonb,
  '[]'::jsonb,
  1
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'sushiyuzen'
    AND branch_name = '시드니 CBD'
);

UPDATE public.company_job_openings
SET sort_order = sort_order + 1
WHERE company_slug = 'sushiyuzen'
  AND title <> 'SUSHI YUZEN Sydney CBD 롤메이커 모집'
  AND NOT EXISTS (
    SELECT 1
    FROM public.company_job_openings
    WHERE company_slug = 'sushiyuzen'
      AND title = 'SUSHI YUZEN Sydney CBD 롤메이커 모집'
  );

INSERT INTO public.company_job_openings (
  company_slug,
  branch_id,
  area,
  suburb,
  title,
  company,
  pay,
  pay_type,
  hours,
  posted_at,
  sort_order,
  condition_rows,
  recruitment_rows,
  skill_tags,
  apply_email
)
SELECT
  'sushiyuzen',
  (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'sushiyuzen'
      AND branch_name = '시드니 CBD'
    LIMIT 1
  ),
  'NSW',
  'Sydney CBD',
  'SUSHI YUZEN Sydney CBD 롤메이커 모집',
  'SUSHI YUZEN Sydney CBD',
  '$33.19 + Super',
  '시급',
  '08:00 - 14:30',
  '상시',
  1,
  '[
    ["급여", "$33.19 + Super"],
    ["근무지역", "Sydney CBD NSW 2000", "Sydney CBD 중심 여러 매장"],
    ["근무형태", "Tax Job only"],
    ["근무요일", "월~금요일", "5 Days, 주 30시간"],
    ["근무시간", "08:00 - 14:30"],
    ["담당업무", "스시 롤메이킹, 밥과 재료 준비, 고객 친절 응대"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "SUSHI YUZEN Sydney CBD 롤메이커 1명"],
    ["지원자격", "스시 롤메이킹 경험, 긍정적이고 밝은 성격, 문제 없는 비자 및 최소 1년 이상 근무 가능"],
    ["우대사항", "Take Away Shop 또는 Sushi Restaurant 경험, 생선 손질 가능자"],
    ["지원방법", "이메일로 지원"],
    ["지원서류", "지원하는 매장 및 포지션(예: Sydney, Roll Maker), 이력서, 비자상태와 비자만료일"],
    ["이메일", "hr@sushiyuzen.com.au"]
  ]'::jsonb,
  ARRAY['스시 롤메이킹', '스시 밥 준비', '재료 준비', '고객응대', '일식 주방', 'Tax Job'],
  'hr@sushiyuzen.com.au'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'sushiyuzen'
    AND title = 'SUSHI YUZEN Sydney CBD 롤메이커 모집'
);

UPDATE public.company_job_openings
SET
  branch_id = (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'sushiyuzen'
      AND branch_name = '시드니 CBD'
    LIMIT 1
  ),
  area = 'NSW',
  suburb = 'Sydney CBD',
  company = 'SUSHI YUZEN Sydney CBD',
  pay = '$33.19 + Super',
  pay_type = '시급',
  hours = '08:00 - 14:30',
  posted_at = '상시',
  sort_order = 1,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "$33.19 + Super"],
    ["근무지역", "Sydney CBD NSW 2000", "Sydney CBD 중심 여러 매장"],
    ["근무형태", "Tax Job only"],
    ["근무요일", "월~금요일", "5 Days, 주 30시간"],
    ["근무시간", "08:00 - 14:30"],
    ["담당업무", "스시 롤메이킹, 밥과 재료 준비, 고객 친절 응대"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집인원", "SUSHI YUZEN Sydney CBD 롤메이커 1명"],
    ["지원자격", "스시 롤메이킹 경험, 긍정적이고 밝은 성격, 문제 없는 비자 및 최소 1년 이상 근무 가능"],
    ["우대사항", "Take Away Shop 또는 Sushi Restaurant 경험, 생선 손질 가능자"],
    ["지원방법", "이메일로 지원"],
    ["지원서류", "지원하는 매장 및 포지션(예: Sydney, Roll Maker), 이력서, 비자상태와 비자만료일"],
    ["이메일", "hr@sushiyuzen.com.au"]
  ]'::jsonb,
  skill_tags = ARRAY['스시 롤메이킹', '스시 밥 준비', '재료 준비', '고객응대', '일식 주방', 'Tax Job'],
  apply_email = 'hr@sushiyuzen.com.au',
  updated_at = now()
WHERE company_slug = 'sushiyuzen'
  AND title = 'SUSHI YUZEN Sydney CBD 롤메이커 모집';
