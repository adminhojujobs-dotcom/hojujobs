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
  '버우드',
  'Gogido Burwood',
  'Burwood NSW 2134',
  'Burwood NSW 2134',
  '0433 253 136',
  '+61433253136',
  'hoshi74@naver.com',
  '[]'::jsonb,
  '[]'::jsonb,
  3
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'parkbongsook'
    AND branch_name = '버우드'
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
  'parkbongsook',
  (SELECT id FROM public.company_branches WHERE company_slug = 'parkbongsook' AND branch_name = '버우드' LIMIT 1),
  'NSW',
  'Burwood',
  'Gogido 박봉숙 Burwood 함께 성장할 직원 모집',
  'GOGIDO 박봉숙 Burwood',
  '면접 시 협의',
  '급여',
  '10:00 - 23:30',
  '상시',
  2,
  '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "Burwood NSW 2134", "GOGIDO 박봉숙 Burwood"],
    ["근무형태", "풀타임 / 파트타임", "원하는 요일과 시간만큼 스케줄 조정 가능"],
    ["근무요일", "월요일 ~ 일요일", "원하는 요일 선택 가능"],
    ["근무시간", "10:00 - 23:30"],
    ["모집분야", "Kitchen, Hall", "Chef, Kitchen Hand, Restaurant Manager, Assistant Manager, Floor Staff"],
    ["복리후생", "맛있는 점심 제공, Superannuation 지급, Tax 지급, 주말 및 공휴일 Extra Pay 지급", "편안하고 존중받는 근무환경"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "주방 및 홀 직원"],
    ["모집분야", "Chef, Kitchen Hand, Restaurant Manager, Assistant Manager, Floor Staff"],
    ["우대사항", "경력자 우대"],
    ["지원대상", "오래 함께 성장할 분 환영"],
    ["지원방법", "전화 또는 이메일로 지원"],
    ["주방지원", "0473 374 710"],
    ["홀지원", "0433 253 136"],
    ["이메일", "hoshi74@naver.com"]
  ]'::jsonb,
  ARRAY['Kitchen', 'Chef', 'Kitchen Hand', 'Hall', 'Restaurant Manager', 'Assistant Manager', 'Floor Staff', '경력자 우대'],
  'hoshi74@naver.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'parkbongsook'
    AND title = 'Gogido 박봉숙 Burwood 함께 성장할 직원 모집'
);
