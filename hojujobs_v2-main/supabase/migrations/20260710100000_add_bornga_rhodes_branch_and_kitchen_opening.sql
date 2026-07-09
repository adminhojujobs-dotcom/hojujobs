-- Bornga expands to a new Rhodes (NSW/Sydney) branch alongside its
-- existing Melbourne CBD one. Adds the branch and a real dinner-shift
-- kitchen-staff listing sourced from a community job-board post — the
-- tiered pay figures ($26.44/$33.05/$39.66/$59.49, rising after 2 weeks to
-- $27.08/$33.85/$40.62/$60.93) match standard Hospitality & Cookery Award
-- weekday/Saturday(1.25x)/Sunday(1.5x)/public-holiday(2.25x) penalty rates.
INSERT INTO public.company_branches
  (company_slug, branch_name, branch_label, address, map_query, email, sort_order, is_active)
VALUES (
  'bornga',
  'Rhodes',
  '로즈점',
  'Level 1, 14 Walker St, Rhodes NSW 2138',
  'Level 1, 14 Walker St, Rhodes NSW 2138',
  'borngarhodeskitchen@gmail.com',
  2,
  true
);

INSERT INTO public.company_job_openings
  (company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order, is_active,
   detail_intro, skill_tags, condition_rows, recruitment_rows, apply_email, quick_apply)
SELECT
  'bornga',
  b.id,
  'NSW',
  'Rhodes',
  '본가 로즈점 디너 주방 스태프 구인',
  'Bornga 로즈점',
  '평일 $26.44 (2주 후 $27.08)',
  '시급',
  '디너 16:00-21:30 (주 20시간)',
  '상시모집',
  1,
  true,
  'Rhodes Central에 위치한 백종원의 ‘본가’에서 함께 일할 주방 팀원을 찾습니다. Rhodes 역에서 도보 3분 거리로 출퇴근이 편리합니다.',
  ARRAY['그릴 서비스','주방 보조','위생관리'],
  '[
    ["급여", "평일 $26.44 (2주 후 $27.08)", "토요일 1.25배 · 일요일 1.5배 · 공휴일 2.25배 (Hospitality & Cookery Award 기준, 연차·연금 포함, 기술·성과에 따라 인상)"],
    ["근무지역", "Level 1, 14 Walker St, Rhodes NSW 2138", "Rhodes 역에서 도보 3분"],
    ["근무요일", "협의 가능", "금·토 디너 근무 가능자 우대"],
    ["근무시간", "디너 16:00-21:30 (종료 시간 유동적)", "주 20시간 정도"],
    ["모집분야", "주방 스태프"],
    ["복리후생", "직원 20% 할인, 오전 투잡 병행 가능, Hospitality & Cookery Award 임금 준수(연차·연금 포함)"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "1명"],
    ["우대사항", "주방 경력자 우대, 빠르게 배우는 분 우대, 금·토 디너 근무 가능자 우대"],
    ["지원방법", "이메일로 레주메 제출"],
    ["이메일", "borngarhodeskitchen@gmail.com"]
  ]'::jsonb,
  'borngarhodeskitchen@gmail.com',
  false
FROM public.company_branches b
WHERE b.company_slug = 'bornga' AND b.branch_name = 'Rhodes';
