ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[] NOT NULL DEFAULT '{}'::text[];

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
  '로즈',
  '로즈점',
  'Rhodes NSW 2138',
  'Rhodes NSW 2138',
  '0433 277 043',
  '+61433277043',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  1
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'yanggadeli'
    AND branch_name = '로즈'
);

UPDATE public.company_job_openings
SET
  branch_id = (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'yanggadeli'
      AND branch_name = '로즈'
    LIMIT 1
  ),
  area = 'NSW',
  suburb = 'Rhodes',
  title = 'Yangga Deli 로즈점 주방 직원 모집',
  company = 'Yangga Deli 로즈점',
  pay = '면접 시 경력에 따라 협의',
  pay_type = '급여',
  hours = '7am - 3pm',
  posted_at = '상시',
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "면접 시 경력에 따라 협의", "주말 시급은 평일 시급의 1.25배 적용"],
    ["근무지역", "로즈 매장", "테이크어웨이 및 반찬 전문 매장"],
    ["근무형태", "주방 1명, 풀타임"],
    ["근무요일", "평일 4일 + 주말 1일", "총 주 5일 근무"],
    ["근무시간", "7am - 3pm"],
    ["담당업무", "매장 판매 음식 조리 및 준비, 오전 당일 판매 음식 조리, 오후 식재료 준비(Prep)"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집인원", "주방 1명"],
    ["지원자격", "손이 빠르고 책임감 있으신 분, 밝고 긍정적인 마인드로 팀워크가 가능하신 분, TFN 소지자 필수"],
    ["지원방법", "문자로 지원"],
    ["연락처", "0433 277 043"],
    ["지원서류", "이름, 나이, 거주 지역, 근무 시작 가능일, 비자 상태(비자 만료일 포함), 지원 포지션, 간단한 경력"]
  ]'::jsonb,
  skill_tags = ARRAY['음식 조리', '식재료 준비', 'Prep', '주방 업무', '팀워크', 'TFN 필수'],
  updated_at = now()
WHERE company_slug = 'yanggadeli'
  AND sort_order = 1;
