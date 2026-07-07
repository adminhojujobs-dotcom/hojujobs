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
  phone = '0492 835 133',
  phone_href = '+61492835133',
  email = 'sinyoungparktwo4859@gmail.com',
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
  '#허스트빌 석기시대# 에서 함께 할 주방식구를 기다립니다!!',
  'Stoneage Korean BBQ 석기시대 허스트빌',
  '$25 ~ $28',
  '시급',
  '풀타임 10:30~22:00',
  '상시',
  0,
  '[
    ["급여", "$25 ~ $28"],
    ["근무지역", "266 Forest Rd, Hurstville NSW 2220", "Stoneage Korean BBQ 석기시대 허스트빌"],
    ["근무요일", "협의 가능"],
    ["근무시간", "풀타임 10:30~22:00", "월요일~금요일 15:00~16:45 브레이크 타임"],
    ["모집분야", "주방 스토브파트"],
    ["복리후생", "체계적인 업무 분담, 친절한 교육"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "주방 직원"],
    ["모집분야", "스토브파트"],
    ["우대사항", "주방 경력 없어도 지원 가능"],
    ["업무내용", "찌개, 계란찜, 야채 프랩, 음식 준비 등"],
    ["지원방법", "문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락"],
    ["연락처", "0492 835 133"],
    ["이메일", "sinyoungparktwo4859@gmail.com"]
  ]'::jsonb,
  'Hurstville에 위치한 Stoneage Korean BBQ 석기시대에서 함께할 주방 스토브파트 직원을 모집합니다.',
  '[
    {
      "title": "모집 분야",
      "items": [
        "주방 스토브파트"
      ]
    },
    {
      "title": "근무조건",
      "items": [
        "시급 $25 ~ $28",
        "풀타임 오전 10시 30분 ~ 오후 10시",
        "월요일~금요일 오후 3시 ~ 오후 4시 45분 브레이크 타임"
      ]
    },
    {
      "title": "업무 내용",
      "items": [
        "찌개, 계란찜, 야채 프랩, 음식 준비 등이 주된 업무입니다",
        "각 파트별 업무가 분담되어 체계적으로 일할 수 있습니다",
        "주방 경력이 없어도 친절히 알려드립니다"
      ]
    },
    {
      "title": "지원 방법",
      "items": [
        "문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락해주세요",
        "연락처: 0492 835 133",
        "이메일: sinyoungparktwo4859@gmail.com"
      ]
    }
  ]'::jsonb,
  ARRAY['주방 스토브파트', 'Korean BBQ', '초보 가능', '체계적인 업무', '음식 준비'],
  'sinyoungparktwo4859@gmail.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'stoneage'
    AND title = '#허스트빌 석기시대# 에서 함께 할 주방식구를 기다립니다!!'
);
