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
      AND branch_name = '뱅크스타운'
    LIMIT 1
  ),
  area = 'NSW',
  suburb = 'Bankstown',
  title = 'KMALL09 뱅크스타운 3호점 직원 모집',
  company = 'KMALL09 3호점 뱅크스타운점',
  pay = '면접 시 협의',
  pay_type = '급여',
  hours = '풀타임 / 파트타임',
  posted_at = '상시',
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "면접 시 협의", "경력에 따른 대우"],
    ["근무지역", "LITTLE SAIGON PLAZA, Bankstown", "KMALL09 3호점, 뱅크스타운역 도보 5분 거리"],
    ["근무형태", "풀타임 / 파트타임"],
    ["근무시간", "주말 1일 필수 근무", "주말 2일 가능자 우대, 주 5~6일 근무자 우대"],
    ["모집분야", "캐셔 1명, 남직원 1명", "상품 입고, 진열, 재고 관리, 리빙 섹션 관리 및 세일즈"],
    ["복리후생", "법정 연금 12%, 유급 연차, 직원 할인", "Superannuation 12%, Annual Leave, KMALL09 직원 할인 혜택 제공"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집인원", "캐셔 1명, 남직원 1명"],
    ["우대사항", "한국 및 호주 마트 근무 경험자, 영어 또는 중국어 가능자, RSA 자격증 보유자(캐셔 부문 해당)"],
    ["초보지원", "무경력자 지원 가능, 업무에 빠르게 적응하실 수 있도록 친절히 도와드립니다"],
    ["지원방법", "이메일로 이력서 접수"],
    ["이메일", "JUN.MOON@KMALL09.COM.AU"]
  ]'::jsonb,
  skill_tags = ARRAY['상품 입고', '상품 진열', '재고 관리', '리빙 섹션', '세일즈', '계산 업무'],
  updated_at = now()
WHERE company_slug = 'kmall09'
  AND sort_order = 7;
