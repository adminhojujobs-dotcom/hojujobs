ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[],
ADD COLUMN IF NOT EXISTS apply_email text;

UPDATE public.company_branches
SET
  address = '1A Chatham Rd, West Ryde NSW 2114',
  map_query = '1A Chatham Rd, West Ryde NSW 2114',
  phone = '0431 085 242',
  phone_href = '+61431085242',
  email = 'stoneage974@gmail.com',
  updated_at = now()
WHERE company_slug = 'stoneage'
  AND branch_name = '웨스트라이드';

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
      AND branch_name = '웨스트라이드'
    LIMIT 1
  ),
  'NSW',
  'West Ryde',
  'Korean BBQ 레스토랑에서 주방직원 및 홀직원 구인합니다.',
  'Stoneage Korean BBQ 석기시대',
  '면접 후 결정',
  '시급',
  '풀타임 10:30~22:00 / 파트타임 협의',
  '상시',
  0,
  '[
    ["급여", "면접 후 결정"],
    ["근무지역", "1A Chatham Rd, West Ryde NSW 2114", "Stoneage Korean BBQ 석기시대"],
    ["근무요일", "협의 가능"],
    ["근무시간", "풀타임 10:30~22:00 / 파트타임 10:30~14:30 또는 16:45~22:00", "평일 브레이크 타임 14:30~16:45, 라스트오더 21:00"],
    ["모집분야", "주방 스토브파트, 홀 파트"],
    ["복리후생", "식사 제공"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "주방 및 홀 직원"],
    ["모집분야", "주방 스토브파트, 홀 파트"],
    ["업무내용", "주방: 찌개, 계란찜, 야채손질, 고기 준비 등 / 홀: 고객응대 및 홀 업무"],
    ["우대사항", "초보 지원 가능, 친절히 교육"],
    ["지원방법", "문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락"],
    ["연락처", "0431 085 242"],
    ["이메일", "stoneage974@gmail.com"]
  ]'::jsonb,
  'West Ryde에 위치한 Stoneage Korean BBQ 석기시대에서 함께 지내실 주방 및 홀 직원을 모집합니다.',
  '[
    {
      "title": "모집 분야",
      "items": [
        "주방 스토브파트",
        "홀 파트"
      ]
    },
    {
      "title": "근무시간",
      "items": [
        "풀타임 오전 10시 30분 ~ 오후 10시",
        "파트타임 오전 10시 30분 ~ 오후 2시 30분 또는 오후 4시 45분 ~ 오후 10시",
        "평일 브레이크 타임 오후 2시 30분 ~ 오후 4시 45분",
        "주말 파트타임은 시간 변동 가능",
        "라스트오더 오후 9시"
      ]
    },
    {
      "title": "업무 내용",
      "items": [
        "주방: 찌개, 계란찜, 야채손질, 고기 준비 등",
        "홀: 고객응대 및 홀 업무",
        "초보도 어렵지 않게 배울 수 있도록 친절히 알려드립니다"
      ]
    },
    {
      "title": "지원 방법",
      "items": [
        "문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락해주세요",
        "연락처: 0431 085 242",
        "이메일: stoneage974@gmail.com"
      ]
    }
  ]'::jsonb,
  ARRAY['주방 스토브파트', '홀 파트', 'Korean BBQ', '초보 가능', '식사 제공', '고객응대'],
  'stoneage974@gmail.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'stoneage'
    AND title = 'Korean BBQ 레스토랑에서 주방직원 및 홀직원 구인합니다.'
);
