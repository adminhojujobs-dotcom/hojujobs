-- Adds a real BBQ Code Doncaster East (2호점) evening part-time hall staff
-- listing, sourced from a community job-board post. BBQ Code's job openings
-- table had only its Glen Waverley listing left at the time (Doncaster East
-- and Melbourne CBD rows seeded earlier were no longer present) — this adds
-- back the Doncaster East one with the specific real details from the post.
INSERT INTO public.company_job_openings
  (company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order, is_active,
   detail_intro, skill_tags, condition_rows, recruitment_rows, apply_email, quick_apply)
VALUES (
  'bbqcode',
  '182d2cbb-127b-4e57-8b8a-adccf7483747',
  'VIC',
  'Doncaster East',
  'BBQ Code 돈캐스터 이스트점 저녁타임 파트타임 홀 직원 모집',
  'BBQ Code 돈캐스터 이스트점',
  '파트타임 $26.44 + 연금 + 유급휴가',
  '시급',
  '저녁 5시~9시30분 (4~4시간30분)',
  '상시모집',
  2,
  true,
  '시티에서 동쪽 Doncaster East에 위치한 한국 바베큐 레스토랑 BBQ Code 2호점에서 저녁타임 파트타임 홀 직원을 구인합니다. 출퇴근 교통편을 확인하고 지원해주세요.',
  ARRAY['홀 서빙','고기굽기','고객응대','영어 회화'],
  '[
    ["급여", "파트타임 $26.44 + 연금 + 유급휴가", "토요일 1.25배 · 일요일 1.5배 (희망 시 캐쉬잡 가능)"],
    ["근무지역", "958 Doncaster Rd, Doncaster East VIC 3109", "BBQ Code 돈캐스터 이스트점 (2호점)"],
    ["근무요일", "금·토·일 저녁 근무 가능자 우대", "해당 요일 근무 가능자 우선 채용"],
    ["근무시간", "저녁 5시 또는 5시30분 - 9시30분 (4~4시간30분)", "영업시간 5:00pm-9:30pm, 라스트오더 8:30pm"],
    ["모집분야", "파트타임 홀 서버", "BBQ 식당 서빙 경력자, 영어 회화 가능자 우대"],
    ["복리후생", "주 12~24시간 근무, 트레이닝 기간 2주"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "홀 직원 (인원 협의)"],
    ["우대사항", "BBQ 식당 알바 경력(서빙, 손님응대, 고기굽기), 영어 회화 가능자, 금·토·일 저녁 근무 가능자"],
    ["지원방법", "이메일로 이력서 접수 시 주방/홀 희망 포지션과 지원 지점을 함께 적어주세요"],
    ["이메일", "jeongwantae@gmail.com"]
  ]'::jsonb,
  'jeongwantae@gmail.com',
  false
);
