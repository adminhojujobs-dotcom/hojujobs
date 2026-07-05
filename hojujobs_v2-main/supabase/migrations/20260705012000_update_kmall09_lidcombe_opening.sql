ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[] NOT NULL DEFAULT '{}'::text[];

UPDATE public.company_job_openings
SET
  branch_id = (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'kmall09'
      AND branch_name = '리드컴'
    LIMIT 1
  ),
  area = 'NSW',
  suburb = 'Lidcombe',
  title = 'KMALL09 리드컴 2호점 직원 모집',
  company = 'KMALL09 2호점 리드컴점',
  pay = '면접 시 협의',
  pay_type = '급여',
  hours = '풀타임 / 오전 파트타임',
  posted_at = '상시',
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "면접 시 협의", "General Retail Industry Award 기준 준수, 주말 및 공휴일 법정 수당 지급"],
    ["근무지역", "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141", "KMALL09 2호점 리드컴 쇼핑센터"],
    ["근무요일", "면접 시 협의 가능", "주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 오전 파트타임", "근무시간 및 요일 조건 면접 시 협의 가능"],
    ["모집분야", "진열파트 2명, 어드민 1명, 캐셔 1명", "진열·재고관리, 매장 운영 지원, 계산 및 고객응대"],
    ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "KMALL 상품 구매 직원 할인혜택 제공"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집인원", "진열파트 2명, 어드민 1명, 캐셔 1명"],
    ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, RSA 소지자(캐셔·어드민 해당), 비자 만료일 1년 이상"],
    ["지원방법", "이메일로 이력서 접수"],
    ["지원서류", "성함, 연락처, 지원근무지, 지원 파트, 경력 사항, 비자 상태, 희망근무시간 포함"]
  ]'::jsonb,
  skill_tags = ARRAY['상품 진열', '재고 관리', '계산 업무', '고객응대', '매장 운영', '입고 처리'],
  updated_at = now()
WHERE company_slug = 'kmall09'
  AND sort_order = 6;
