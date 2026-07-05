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
  'chickenv',
  '이스트우드',
  'Eastwood',
  'Eastwood NSW 2122',
  'Eastwood NSW 2122',
  '0451 600 616',
  '+61451600616',
  'iseoyun6816@gmail.com',
  '[]'::jsonb,
  '[]'::jsonb,
  1
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'chickenv'
    AND branch_name = '이스트우드'
);

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
  'chickenv',
  '시티',
  'City',
  '345b Sussex St, Sydney NSW 2000',
  '345b Sussex St, Sydney NSW 2000',
  '0449 705 536',
  '+61449705536',
  'iseoyun6816@gmail.com',
  '[]'::jsonb,
  '[]'::jsonb,
  2
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_branches
  WHERE company_slug = 'chickenv'
    AND branch_name = '시티'
);

DELETE FROM public.company_job_openings
WHERE company_slug = 'chickenv'
  AND title = 'Chicken V 직원 모집';

INSERT INTO public.company_job_openings (
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours,
  posted_at, sort_order, condition_rows, recruitment_rows, skill_tags, apply_email
)
SELECT
  'chickenv',
  (SELECT id FROM public.company_branches WHERE company_slug = 'chickenv' AND branch_name = '이스트우드' LIMIT 1),
  'NSW',
  'Eastwood',
  'Chicken V Eastwood 홀/주방 직원 모집',
  'Chicken V Eastwood & Busanjip',
  '면접 시 협의',
  '급여',
  '11:00 - 24:00',
  '상시',
  1,
  '[
    ["급여", "면접 시 협의", "경력자 우대"],
    ["근무지역", "Eastwood NSW 2122", "이스트우드역 도보 5분 거리"],
    ["근무형태", "풀타임 / 파트타임"],
    ["근무시간", "월~일 11:00 - 24:00", "가게 Trading Hours 기준"],
    ["모집분야", "홀, 주방 직원"],
    ["복리후생", "매일 석식 제공, 직원 할인", "손님으로 방문 시 직원 할인 제공"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀/주방 직원"],
    ["우대사항", "경력자 우대"],
    ["초보지원", "초보도 환영"],
    ["지원방법", "문자 또는 이메일로 지원"],
    ["연락처", "0451 600 616"],
    ["이메일", "iseoyun6816@gmail.com"],
    ["지원서류", "이름, 나이, 비자 상태, 거주지 포함"]
  ]'::jsonb,
  ARRAY['홀 서빙', '주방 업무', '고객응대', '팀워크', '초보 환영'],
  'iseoyun6816@gmail.com'
WHERE NOT EXISTS (
  SELECT 1 FROM public.company_job_openings
  WHERE company_slug = 'chickenv'
    AND title = 'Chicken V Eastwood 홀/주방 직원 모집'
);

INSERT INTO public.company_job_openings (
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours,
  posted_at, sort_order, condition_rows, recruitment_rows, skill_tags, apply_email
)
SELECT
  'chickenv',
  (SELECT id FROM public.company_branches WHERE company_slug = 'chickenv' AND branch_name = '시티' LIMIT 1),
  'NSW',
  'Sydney CBD',
  'Chicken V & Busan Pocha City 주방 직원 모집',
  'Chicken V & Busan Pocha City',
  '면접 후 경력에 따라 협의',
  '급여',
  '17:00 - 26:00',
  '상시',
  2,
  '[
    ["급여", "면접과 트라이얼 후 경력에 따라 협의", "경력자 우대, 나이트 타임 근무 시 추가 시급"],
    ["근무지역", "345b Sussex St, Sydney NSW 2000", "타운홀 도보 2분 거리"],
    ["근무형태", "풀타임(주 4~5일) / 파트타임", "주말 포함"],
    ["근무시간", "월~수 17:00 - 25:00, 목 17:00 - 26:00, 금/토 11:30 - 26:00, 일 11:30 - 24:00"],
    ["모집분야", "주방 직원"],
    ["복리후생", "매일 석식과 음료 제공, 직원 할인, 나이트 타임 추가 시급"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "주방 직원"],
    ["우대사항", "경력자 우대"],
    ["지원대상", "학생분, 워홀 가능"],
    ["지원방법", "이메일 또는 문자로 지원"],
    ["연락처", "0449 705 536"],
    ["이메일", "iseoyun6816@gmail.com"],
    ["지원서류", "이력서와 함께 연락"]
  ]'::jsonb,
  ARRAY['주방 조리', '포차 안주 조리', '팀워크', '경력자 우대', '나이트 근무'],
  'iseoyun6816@gmail.com'
WHERE NOT EXISTS (
  SELECT 1 FROM public.company_job_openings
  WHERE company_slug = 'chickenv'
    AND title = 'Chicken V & Busan Pocha City 주방 직원 모집'
);

INSERT INTO public.company_job_openings (
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours,
  posted_at, sort_order, condition_rows, recruitment_rows, skill_tags, apply_email
)
SELECT
  'chickenv',
  (SELECT id FROM public.company_branches WHERE company_slug = 'chickenv' AND branch_name = '시티' LIMIT 1),
  'NSW',
  'Sydney CBD',
  'Busan Pocha & Chicken V 홀 파트타임 직원 모집',
  'Busan Pocha & Chicken V City',
  '면접 시 협의',
  '급여',
  '주 2-3일',
  '상시',
  3,
  '[
    ["급여", "면접 시 협의", "나이트 타임 근무 시 나이트 웨이지 지급"],
    ["근무지역", "345b Sussex St, Sydney NSW 2000", "타운홀 도보 2분 거리"],
    ["근무형태", "파트타임 홀 직원"],
    ["근무요일", "주 2-3일"],
    ["근무시간", "월~목 17:00 - 25:00, 금/토 11:30 - 26:00, 일 11:30 - 24:00"],
    ["복리후생", "매일 석식 제공, 직원 할인, 나이트 웨이지"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀 파트타임 직원"],
    ["우대사항", "경력자 우대"],
    ["초보지원", "초보도 환영"],
    ["지원방법", "문자 또는 이메일로 지원"],
    ["연락처", "0449 705 536"],
    ["이메일", "iseoyun6816@gmail.com"],
    ["근무환경", "직원 평균 연령이 높지 않아 친구 같은 분위기"]
  ]'::jsonb,
  ARRAY['홀 서빙', '고객응대', '파트타임', '팀워크', '초보 환영'],
  'iseoyun6816@gmail.com'
WHERE NOT EXISTS (
  SELECT 1 FROM public.company_job_openings
  WHERE company_slug = 'chickenv'
    AND title = 'Busan Pocha & Chicken V 홀 파트타임 직원 모집'
);
