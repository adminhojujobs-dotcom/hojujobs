-- Adds a real kitchen-staff listing from Arkim F&B (operator of DOOBOO,
-- SamSam Chicken & Beer, and 센트럴키친 across 10 locations) to both
-- brands' Melbourne CBD ("City") branches, sourced from a community
-- job-board post.
INSERT INTO public.company_job_openings
  (company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order, is_active,
   detail_intro, skill_tags, condition_rows, recruitment_rows, apply_email, quick_apply)
VALUES
(
  'dooboo',
  '1f223cc0-c2f7-42a3-8bd9-ce91eba01afd',
  'VIC',
  'Melbourne CBD',
  'DOOBOO 멜버른 CBD점 주방직원 모집',
  'DOOBOO 멜버른 CBD점',
  '시급 $30',
  '시급',
  '협의',
  '상시모집',
  5,
  true,
  'DOOBOO, SamSam Chicken, 센트럴키친 등 총 10개 지점을 운영하는 Arkim F&B에서 시티 지점 주방 직원을 구인합니다.',
  ARRAY['주방 보조','한식 조리','위생관리'],
  '[
    ["급여", "시급 $30", "경력에 따라 우대 및 임금 협상 가능"],
    ["근무지역", "261 Swanston St, Melbourne VIC 3000", "DOOBOO 멜버른 CBD점"],
    ["모집분야", "주방 직원", "DOOBOO · SamSam Chicken · 센트럴키친 등 총 10개 지점 운영 (Arkim F&B)"],
    ["복리후생", "야간·주말·공휴일 수당, 연금(Super), 애뉴얼리브 모두 지급 (호주 정부 가이드라인 준수)"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["우대사항", "경력자 우대, 경력 없어도 손이 빠르거나 빠르게 배우는 분 환영, 스폰서비자 가능, 추후 SID 비자 지원 가능"],
    ["지원방법", "이메일로 레쥬메 전달 또는 문자로 간단히 연락"],
    ["연락처", "0458701983"],
    ["이메일", "Jayden.lee@arkimfnb.com"]
  ]'::jsonb,
  'Jayden.lee@arkimfnb.com',
  false
),
(
  'samsamchicken',
  'd931e222-f5b8-4da6-8911-453ab059388c',
  'VIC',
  'Melbourne CBD',
  'SamSam Chicken & Beer CBD점 주방직원 모집',
  'SamSam Chicken & Beer CBD점',
  '시급 $30',
  '시급',
  '협의',
  '상시모집',
  3,
  true,
  'DOOBOO, SamSam Chicken, 센트럴키친 등 총 10개 지점을 운영하는 Arkim F&B에서 시티 지점 주방 직원을 구인합니다.',
  ARRAY['주방 보조','치킨 조리','위생관리'],
  '[
    ["급여", "시급 $30", "경력에 따라 우대 및 임금 협상 가능"],
    ["근무지역", "207-209 Swanston St, Melbourne VIC 3000", "SamSam Chicken & Beer CBD점"],
    ["모집분야", "주방 직원", "DOOBOO · SamSam Chicken · 센트럴키친 등 총 10개 지점 운영 (Arkim F&B)"],
    ["복리후생", "야간·주말·공휴일 수당, 연금(Super), 애뉴얼리브 모두 지급 (호주 정부 가이드라인 준수)"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["우대사항", "경력자 우대, 경력 없어도 손이 빠르거나 빠르게 배우는 분 환영, 스폰서비자 가능, 추후 SID 비자 지원 가능"],
    ["지원방법", "이메일로 레쥬메 전달 또는 문자로 간단히 연락"],
    ["연락처", "0458701983"],
    ["이메일", "Jayden.lee@arkimfnb.com"]
  ]'::jsonb,
  'Jayden.lee@arkimfnb.com',
  false
);
