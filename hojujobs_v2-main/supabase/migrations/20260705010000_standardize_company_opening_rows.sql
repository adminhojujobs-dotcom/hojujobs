ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb;

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
  title = '리드컴 케이몰 KOPO 분식매장 직원 모집',
  company = 'KMALL09 KOPO 분식매장',
  pay = '면접 시 협의',
  pay_type = '급여',
  hours = '풀타임 / 파트타임',
  posted_at = '상시',
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  condition_rows = '[
    ["급여", "면접 시 협의", "동종 업계 경력에 따라 협의"],
    ["근무지역", "리드컴 케이몰", "KMALL09 리드컴 쇼핑센터 내 KOPO 분식매장"],
    ["근무형태", "풀타임 / 파트타임"],
    ["영업시간", "오전 10시 - 오후 7시30분"],
    ["담당업무", "손님 응대 및 메뉴 서빙, 음식 준비 및 간단조리, 재료 프랩"]
  ]'::jsonb,
  recruitment_rows = '[
    ["모집마감", "상시모집"],
    ["모집인원", "협의"],
    ["우대사항", "동종 업계 경력, 손이 빠르고 서비스 마인드가 있으신 분"],
    ["지원방법", "이메일로 이력서 접수"],
    ["지원서류", "성함, 연락처, 경력 사항, 비자 상태, 희망근무시간 포함"]
  ]'::jsonb,
  skill_tags = ARRAY['고객응대', '메뉴 서빙', '음식 준비', '간단조리', '재료 프랩'],
  updated_at = now()
WHERE company_slug = 'kmall09'
  AND sort_order = (
    SELECT min(sort_order)
    FROM public.company_job_openings
    WHERE company_slug = 'kmall09'
  );
