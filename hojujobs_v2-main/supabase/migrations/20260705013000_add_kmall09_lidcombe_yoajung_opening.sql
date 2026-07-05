ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[] NOT NULL DEFAULT '{}'::text[];

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
  skill_tags
)
SELECT
  'kmall09',
  (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'kmall09'
      AND branch_name = '리드컴'
    LIMIT 1
  ),
  'NSW',
  'Lidcombe',
  'KMALL09 리드컴 요아정 매장 매니저 및 직원 모집',
  'KMALL09 Lidcombe 요아정',
  '경력에 따라 협의',
  '급여',
  '12PM - 9:00PM',
  '상시',
  5,
  '[
    ["급여", "경력에 따라 협의", "성과에 따른 인센티브 가능"],
    ["근무지역", "KMall Lidcombe", "요거트 아이스크림 매장"],
    ["근무형태", "매장 매니저(Full Time), 직원"],
    ["근무시간", "12PM - 9:00PM"],
    ["담당업무", "매장 전반 운영, 재고 및 발주 관리, 고객 서비스 및 컴플레인 대응, 위생 및 식품 안전 관리"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집분야", "매장 매니저(Full Time), 직원"],
    ["우대사항", "외식업 또는 매장 관리 경험자, 한국어 및 영어 소통 가능자"],
    ["인재상", "긍정적이고 밝은 리더십, 문제를 스스로 해결하는 분, 팀을 이끌고 성장시키는 것을 좋아하는 분"],
    ["지원방법", "이메일로 간단한 자기소개 접수"],
    ["지원서류", "간단한 자기소개"],
    ["이메일", "kmall09.ops.oscar@gmail.com"]
  ]'::jsonb,
  ARRAY['매장 운영', '재고 관리', '발주 관리', '고객 서비스', '위생 관리', '식품 안전']
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'kmall09'
    AND title = 'KMALL09 리드컴 요아정 매장 매니저 및 직원 모집'
);

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
  company = 'KMALL09 Lidcombe 요아정',
  pay = '경력에 따라 협의',
  pay_type = '급여',
  hours = '12PM - 9:00PM',
  posted_at = '상시',
  sort_order = 5,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "경력에 따라 협의", "성과에 따른 인센티브 가능"],
    ["근무지역", "KMall Lidcombe", "요거트 아이스크림 매장"],
    ["근무형태", "매장 매니저(Full Time), 직원"],
    ["근무시간", "12PM - 9:00PM"],
    ["담당업무", "매장 전반 운영, 재고 및 발주 관리, 고객 서비스 및 컴플레인 대응, 위생 및 식품 안전 관리"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집분야", "매장 매니저(Full Time), 직원"],
    ["우대사항", "외식업 또는 매장 관리 경험자, 한국어 및 영어 소통 가능자"],
    ["인재상", "긍정적이고 밝은 리더십, 문제를 스스로 해결하는 분, 팀을 이끌고 성장시키는 것을 좋아하는 분"],
    ["지원방법", "이메일로 간단한 자기소개 접수"],
    ["지원서류", "간단한 자기소개"],
    ["이메일", "kmall09.ops.oscar@gmail.com"]
  ]'::jsonb,
  skill_tags = ARRAY['매장 운영', '재고 관리', '발주 관리', '고객 서비스', '위생 관리', '식품 안전'],
  updated_at = now()
WHERE company_slug = 'kmall09'
  AND title = 'KMALL09 리드컴 요아정 매장 매니저 및 직원 모집';
