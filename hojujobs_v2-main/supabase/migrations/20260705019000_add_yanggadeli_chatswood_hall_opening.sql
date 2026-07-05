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
  'yanggadeli',
  '채스우드',
  '채스우드점',
  'Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067',
  'Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067',
  '0450 622 558',
  '+61450622558',
  'yanggafoods@gmail.com',
  '[]'::jsonb,
  '[]'::jsonb,
  2
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'yanggadeli'
    AND branch_name = '채스우드'
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
  'yanggadeli',
  (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'yanggadeli'
      AND branch_name = '채스우드'
    LIMIT 1
  ),
  'NSW',
  'Chatswood',
  'Yangga Korean Deli 채스우드점 홀 스태프 모집',
  'Yangga Korean Deli 채스우드점',
  '면접 시 경력에 따라 협의',
  '급여',
  '목, 금, 토, 일',
  '상시',
  2,
  '[
    ["급여", "면접 시 경력에 따라 협의", "주말 시급은 평일 시급의 1.25배 적용"],
    ["근무지역", "Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067", "채스우드점"],
    ["근무형태", "홀 스태프 1명"],
    ["근무요일", "목, 금, 토, 일"],
    ["담당업무", "홀 업무, 고객응대, 매장 판매 지원"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀 스태프 1명"],
    ["지원자격", "손이 빠르고 책임감 있으신 분, 밝고 긍정적인 마인드로 팀워크가 가능하신 분, TFN 소지자 필수"],
    ["지원방법", "이메일 또는 문자로 지원"],
    ["연락처", "0450 622 558"],
    ["이메일", "yanggafoods@gmail.com"],
    ["지원서류", "이름, 나이, 거주 지역, 근무 시작 가능일, 비자 상태(비자 만료일 포함), 지원 포지션, 간단한 경력"]
  ]'::jsonb,
  ARRAY['홀 업무', '고객응대', '매장 판매', '팀워크', 'TFN 필수'],
  'yanggafoods@gmail.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'yanggadeli'
    AND title = 'Yangga Korean Deli 채스우드점 홀 스태프 모집'
);

UPDATE public.company_job_openings
SET
  branch_id = (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'yanggadeli'
      AND branch_name = '채스우드'
    LIMIT 1
  ),
  area = 'NSW',
  suburb = 'Chatswood',
  company = 'Yangga Korean Deli 채스우드점',
  pay = '면접 시 경력에 따라 협의',
  pay_type = '급여',
  hours = '목, 금, 토, 일',
  posted_at = '상시',
  sort_order = 2,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "면접 시 경력에 따라 협의", "주말 시급은 평일 시급의 1.25배 적용"],
    ["근무지역", "Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067", "채스우드점"],
    ["근무형태", "홀 스태프 1명"],
    ["근무요일", "목, 금, 토, 일"],
    ["담당업무", "홀 업무, 고객응대, 매장 판매 지원"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀 스태프 1명"],
    ["지원자격", "손이 빠르고 책임감 있으신 분, 밝고 긍정적인 마인드로 팀워크가 가능하신 분, TFN 소지자 필수"],
    ["지원방법", "이메일 또는 문자로 지원"],
    ["연락처", "0450 622 558"],
    ["이메일", "yanggafoods@gmail.com"],
    ["지원서류", "이름, 나이, 거주 지역, 근무 시작 가능일, 비자 상태(비자 만료일 포함), 지원 포지션, 간단한 경력"]
  ]'::jsonb,
  skill_tags = ARRAY['홀 업무', '고객응대', '매장 판매', '팀워크', 'TFN 필수'],
  apply_email = 'yanggafoods@gmail.com',
  updated_at = now()
WHERE company_slug = 'yanggadeli'
  AND title = 'Yangga Korean Deli 채스우드점 홀 스태프 모집';
