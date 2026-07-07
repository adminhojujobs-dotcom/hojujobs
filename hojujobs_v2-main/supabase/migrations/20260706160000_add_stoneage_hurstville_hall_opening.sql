ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[],
ADD COLUMN IF NOT EXISTS apply_email text;

UPDATE public.company_branches
SET
  address = '266 Forest Rd, Hurstville NSW 2220',
  map_query = '266 Forest Rd, Hurstville NSW 2220',
  phone = '0405 337 022',
  phone_href = '+61405337022',
  email = 'janepark6249@gmail.com',
  updated_at = now()
WHERE company_slug = 'stoneage'
  AND branch_name = '허스트빌';

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
  detail_intro,
  detail_sections,
  skill_tags,
  apply_email
)
SELECT
  'stoneage',
  (
    SELECT id
    FROM public.company_branches
    WHERE company_slug = 'stoneage'
      AND branch_name = '허스트빌'
    LIMIT 1
  ),
  'NSW',
  'Hurstville',
  '[시티에서 단 20분] 허스트빌 석기시대에서 홀식구를 찾고 있어요!',
  'Stoneage Korean BBQ 석기시대 허스트빌',
  '$25 ~ $28',
  '시급',
  '풀타임 10:30~22:00 / 파트타임 17:00 또는 18:00~22:00',
  '상시',
  0,
  '[
    ["급여", "$25 ~ $28"],
    ["근무지역", "266 Forest Rd, Hurstville NSW 2220", "Stoneage Korean BBQ 석기시대 허스트빌"],
    ["근무요일", "협의 가능", "요식업 특성상 금토일 근무 필수"],
    ["근무시간", "풀타임 10:30~22:00 / 파트타임 17:00 또는 18:00~22:00", "월요일~금요일 15:00~16:45 브레이크 타임, 라스트오더 21:00"],
    ["모집분야", "홀"],
    ["복리후생", "현지인·외국인 손님 응대 경험, 영어 실력 향상 가능"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀 직원"],
    ["모집분야", "홀"],
    ["우대사항", "연령, 경력 상관없이 지원 가능"],
    ["업무내용", "홀 고객응대 및 매장 업무"],
    ["지원방법", "문자로 이름/나이/비자상태/근무가능요일을 포함해 연락"],
    ["연락처", "0405 337 022"],
    ["이메일", "janepark6249@gmail.com"]
  ]'::jsonb,
  'Hurstville에 위치한 Stoneage Korean BBQ 석기시대에서 함께 일할 홀 직원을 모집합니다.',
  '[
    {
      "title": "근무시간",
      "items": [
        "풀타임 10:30~22:00",
        "파트타임 17:00 또는 18:00~22:00",
        "월요일~금요일 15:00~16:45 브레이크 타임",
        "라스트오더 오후 9시, 상황에 따라 퇴근시간 변동 가능",
        "요식업 특성상 금토일 근무 필수"
      ]
    },
    {
      "title": "근무조건",
      "items": [
        "시급 $25~$28",
        "홀 파트",
        "연령, 경력 상관없이 지원 가능"
      ]
    },
    {
      "title": "지원 방법",
      "items": [
        "문자로 이름/나이/비자상태/근무가능요일을 포함해 연락해주세요",
        "예: 홍길동/26/워킹00개월남음/모든요일가능",
        "연락처: 0405 337 022",
        "이메일: janepark6249@gmail.com",
        "면접 시 이력서 지참 부탁드립니다"
      ]
    }
  ]'::jsonb,
  ARRAY['홀', '고객응대', 'Korean BBQ', '초보 가능', '영어 응대', '금토일 근무'],
  'janepark6249@gmail.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'stoneage'
    AND title = '[시티에서 단 20분] 허스트빌 석기시대에서 홀식구를 찾고 있어요!'
);
