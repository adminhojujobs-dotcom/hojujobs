ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[],
ADD COLUMN IF NOT EXISTS apply_email text;

UPDATE public.company_profiles
SET
  phone = '0491 709 913',
  phone_href = '+61491709913',
  email = 'dkhairstudio.dk@gmail.com',
  instagram_url = 'https://www.instagram.com/dk_hairstudio/',
  instagram_handle = '@dk_hairstudio',
  updated_at = now()
WHERE slug = 'dkhairstudio';

UPDATE public.company_branches
SET
  phone = '0491 709 913',
  phone_href = '+61491709913',
  email = 'dkhairstudio.dk@gmail.com',
  updated_at = now()
WHERE company_slug = 'dkhairstudio';

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
  'dkhairstudio',
  NULL,
  'NSW',
  '여러 지점',
  'DK HAIRSTUDIO 채용 시드니 5개 지점 — 인턴 & 디자이너 모집',
  'DK HAIRSTUDIO',
  '디자이너 $37~$40+ / 인턴 up to $29+',
  '시급',
  '주 4~5일 근무',
  '상시',
  0,
  '[
    ["급여", "경력 디자이너 $37~$40+ / 경력 인턴 up to $29+", "커미션제 및 제품 판매 커미션 선택 가능"],
    ["근무지역", "Rhodes · Chatswood · Broadway · Burwood · Haymarket", "시드니 5개 지점"],
    ["근무요일", "주 4~5일 근무", "주말 포함, 수습기간 있음"],
    ["근무시간", "지점 운영 상황에 따라 협의"],
    ["모집분야", "인턴, 디자이너"],
    ["복리후생", "주 2회 1:1 교육, 올데이 정기 교육, 장비 지원, 장기근무 보너스, 학생비자 학비 지원, 스폰서 비자 가능"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "시드니 5개 지점 인턴 및 디자이너"],
    ["모집분야", "인턴, 디자이너"],
    ["우대사항", "헤어 커리어 성장 의지, 컬러·펌·나노플라스티 관심, 글로벌 고객 응대, SNS 브랜딩·촬영·콘텐츠 제작 관심"],
    ["지원방법", "이력서, 포트폴리오, 비자 상태를 이메일 또는 인스타그램 DM으로 전달"],
    ["연락처", "0491 709 913"],
    ["이메일", "dkhairstudio.dk@gmail.com"],
    ["인스타그램", "@dk_hairstudio"]
  ]'::jsonb,
  'DK HAIRSTUDIO는 시드니에서 빠르게 성장하는 글로벌 헤어살롱으로, 강력한 교육 시스템을 기반으로 인턴과 디자이너를 체계적으로 육성합니다.',
  '[
    {
      "title": "교육 시스템",
      "items": [
        "주 2회 1:1 디자이너 전담교육",
        "실전 중심 맞춤형 교육",
        "컬러, 펌, 포일워크, 나노플라스티 등 개별 역량에 맞춘 커리큘럼",
        "올데이 정기 교육: 인턴 집중 교육, 영어 수업, 컬러 트렌드, 로컬 테크닉, K-펌, 나노플라스티 실전 교육",
        "BBQ 및 팀 네트워킹"
      ]
    },
    {
      "title": "지원 환경",
      "items": [
        "삼각대, 가발, 연습 장비 매장 제공",
        "SNS 촬영 장비 지원",
        "실전 모델 교육 적극 지원",
        "총 5단계, 15개월 디자이너 양성과정",
        "분기별 진급 테스트 및 역량에 따른 승급 기간 단축 가능"
      ]
    },
    {
      "title": "근무 조건",
      "items": [
        "주 4~5일 근무, 주말 포함",
        "수습기간 있음",
        "시급제: 경력 디자이너 $37~$40+, 경력 인턴 up to $29+",
        "커미션제: 총매출 10% 공제 후 43~48% 지급",
        "제품 판매 커미션: 시급제 15%, 커미션제 25%"
      ]
    },
    {
      "title": "장기근무 혜택",
      "items": [
        "학생비자 학비 지원",
        "장기근무 보너스",
        "스폰서 비자 가능"
      ]
    },
    {
      "title": "지원 방법",
      "items": [
        "이력서, 포트폴리오, 비자 상태를 함께 보내주세요",
        "Email: dkhairstudio.dk@gmail.com",
        "문자/전화: 0491 709 913",
        "Instagram DM: @dk_hairstudio"
      ]
    }
  ]'::jsonb,
  ARRAY['인턴', '디자이너', '컬러', '펌', '포일워크', '나노플라스티', 'SNS 브랜딩', '영어 수업', '스폰서 비자'],
  'dkhairstudio.dk@gmail.com'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings
  WHERE company_slug = 'dkhairstudio'
    AND title = 'DK HAIRSTUDIO 채용 시드니 5개 지점 — 인턴 & 디자이너 모집'
);
