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
  'parkbongsook',
  '이스트우드',
  'Eastwood',
  '108 Rowe St, Eastwood NSW 2122',
  '108 Rowe St, Eastwood NSW 2122',
  '0423 058 922',
  '+61423058922',
  'pbseastwood@gmail.com',
  '[]'::jsonb,
  '[]'::jsonb,
  1
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'parkbongsook'
    AND branch_name = '이스트우드'
);

UPDATE public.company_branches
SET
  branch_label = 'Eastwood',
  address = '108 Rowe St, Eastwood NSW 2122',
  map_query = '108 Rowe St, Eastwood NSW 2122',
  phone = '0423 058 922',
  phone_href = '+61423058922',
  email = 'pbseastwood@gmail.com',
  updated_at = now()
WHERE company_slug = 'parkbongsook'
  AND branch_name = '이스트우드';

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
  'parkbongsook',
  (SELECT id FROM public.company_branches WHERE company_slug = 'parkbongsook' AND branch_name = '이스트우드' LIMIT 1),
  'NSW',
  'Eastwood',
  '이스트우드 홀 매니저/슈퍼바이저 모집',
  '박봉숙 레스토랑 Eastwood',
  '능력에 따른 동종업계 최고대우',
  '급여',
  '협의 가능',
  '상시',
  1,
  '[
    ["급여", "능력에 따른 동종업계 최고대우"],
    ["근무지역", "108 Rowe St, Eastwood NSW 2122", "Eastwood Station에서 3분"],
    ["근무형태", "홀 매니저 / 슈퍼바이저"],
    ["근무시간", "협의 가능"],
    ["모집분야", "홀 매니저, 슈퍼바이저"],
    ["지원자격", "매니저: 연령 40세 이하, 성별무관, 워홀비자 가능, 호주 식당 경력 3년 이상 / 슈퍼바이저: 20대 선호, 성별무관, 경력 1년 이상"],
    ["복리후생", "능력에 따른 동종업계 최고대우"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀 매니저 / 슈퍼바이저"],
    ["우대사항", "성실하고 일을 잘하는 분, 자발적이고 변화에 유동적으로 맞춰 일하는 스타일"],
    ["지원제외", "손발이 느리고 상황판단력이 빠르지 않으신 분"],
    ["지원방법", "전화 말고 문자로 간단한 소개 먼저 부탁드립니다. 이력서 없어도 됩니다."],
    ["연락처", "0423 058 922"],
    ["이메일", "pbseastwood@gmail.com"]
  ]'::jsonb,
  ARRAY['홀 매니저', '슈퍼바이저', '고객응대', '매장관리', '경력자 우대', '스케줄 관리'],
  'pbseastwood@gmail.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'parkbongsook'
    AND title = '이스트우드 홀 매니저/슈퍼바이저 모집'
);
