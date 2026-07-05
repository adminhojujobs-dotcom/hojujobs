ALTER TABLE public.company_job_openings
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
  title = '리드컴 케이몰 KOPO 분식매장 직원 모집',
  company = 'KMALL09 KOPO 분식매장',
  pay = '면접 시 협의',
  pay_type = '급여',
  hours = '풀타임 / 파트타임',
  posted_at = '상시',
  detail_intro = '리드컴 케이몰안에 있는 "KOPO" 분식매장에서 직원 구인합니다.',
  detail_sections = '[
    {
      "title": "근무조건",
      "items": [
        "근무형태: 풀타임 / 파트타임",
        "영업시간: 오전 10시 - 오후 7시30분",
        "근무지: 리드컴 케이몰"
      ]
    },
    {
      "title": "담당업무",
      "items": [
        "손님 응대 및 메뉴 서빙",
        "음식 준비 및 간단조리",
        "재료 프랩"
      ]
    },
    {
      "title": "지원방법",
      "items": [
        "이메일로 이력서를 보내주세요.",
        "성함, 연락처, 경력 사항, 비자 상태, 희망근무시간 등을 포함해주시기 바랍니다.",
        "kmall09.ops.oscar@gmail.com"
      ]
    },
    {
      "title": "우대사항",
      "items": [
        "동종 업계 경력",
        "손이 빠르고 서비스 마인드가 있으신 분"
      ]
    }
  ]'::jsonb,
  skill_tags = ARRAY['고객응대', '메뉴 서빙', '음식 준비', '간단조리', '재료 프랩'],
  updated_at = now()
WHERE company_slug = 'kmall09'
  AND sort_order = (
    SELECT min(sort_order)
    FROM public.company_job_openings
    WHERE company_slug = 'kmall09'
  );
