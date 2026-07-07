ALTER TABLE public.company_job_openings
ADD COLUMN IF NOT EXISTS condition_rows jsonb,
ADD COLUMN IF NOT EXISTS recruitment_rows jsonb,
ADD COLUMN IF NOT EXISTS detail_intro text,
ADD COLUMN IF NOT EXISTS detail_sections jsonb,
ADD COLUMN IF NOT EXISTS skill_tags text[],
ADD COLUMN IF NOT EXISTS apply_email text;

UPDATE public.company_branches
SET email = 'bunsik.rhodes.au@gmail.com',
    phone = '0424 457 088',
    phone_href = '+61424457088',
    updated_at = now()
WHERE company_slug = 'bunsik'
  AND branch_name = '로즈';

UPDATE public.company_branches
SET email = 'bunsikliverpool@gmail.com',
    phone = '0499 558 922',
    phone_href = '+61499558922',
    updated_at = now()
WHERE company_slug = 'bunsik'
  AND branch_name = '리버풀';

INSERT INTO public.company_job_openings (
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order,
  condition_rows, recruitment_rows, detail_intro, detail_sections, skill_tags, apply_email
)
SELECT * FROM (
  VALUES
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '로즈' LIMIT 1),
    'NSW',
    'Rhodes',
    '로즈 워터사이드 Bunsik 캐셔 구함',
    'Bunsik Rhodes',
    '면접 시 협의',
    '급여',
    '12:00~20:00',
    '상시',
    0,
    '[["급여", "면접 시 협의"], ["근무지역", "Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138", "Bunsik Rhodes"], ["근무요일", "월 · 토 · 일"], ["근무시간", "12:00~20:00"], ["모집분야", "캐셔"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "캐셔"], ["업무내용", "손님접대, 계산"], ["우대사항", "나이, 성별, 경력 무관 / 손이 빠르고 꼼꼼하신 분"], ["지원방법", "이력서를 이메일로 보내거나 문자로 이름과 나이, 간단한 이력을 남겨주세요"], ["연락처", "0424 457 088"], ["이메일", "bunsik.rhodes.au@gmail.com"]]'::jsonb,
    'Rhodes Waterside 쇼핑센터 푸드코트 내 Bunsik Rhodes에서 함께 일할 캐셔를 모집합니다.',
    '[{"title":"근무조건","items":["모집분야: 캐셔","근무형태: 파트타임","근무요일: 월, 토, 일","근무시간: 12:00~20:00","주요업무: 손님접대, 계산"]},{"title":"지원자격","items":["나이, 성별, 경력 무관","손이 빠르고 꼼꼼하신 분","친절하고 밝은 성격을 가지신 분"]},{"title":"지원방법","items":["이력서를 이메일로 보내주세요","문자로 이름과 나이, 간단한 이력을 남겨주세요","Email: bunsik.rhodes.au@gmail.com","Phone: 0424 457 088"]}]'::jsonb,
    ARRAY['캐셔', '계산', '손님접대', '파트타임', '초보 가능'],
    'bunsik.rhodes.au@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '리버풀' LIMIT 1),
    'NSW',
    'Liverpool',
    'Bunsik Liverpool 홀 직원 구합니다',
    'Bunsik Liverpool',
    '면접 후 협의',
    '급여',
    '평일/주말 08:30~18:00, 목요일 08:30~20:30',
    '상시',
    0,
    '[["급여", "면접 후 협의", "경력자 우대"], ["근무지역", "Westfield Liverpool, Lot 22, S259/25 George St, Liverpool NSW 2170", "Bunsik Liverpool"], ["근무요일", "주 2~3일 이상", "평일/주말 가능자"], ["근무시간", "평일/주말 08:30~18:00, 목요일 08:30~20:30"], ["모집분야", "홀"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "홀 직원"], ["업무내용", "홀 전반적인 업무"], ["우대사항", "책임감 있고 성실하신 분, 경력자 우대"], ["지원방법", "Liverpool, 이름, 나이, 사는 지역, 비자상태, 비자 만료일, 근무가능 요일/시간을 문자 또는 이메일로 전달"], ["연락처", "0499 558 922"], ["이메일", "bunsikliverpool@gmail.com"]]'::jsonb,
    'Liverpool에 위치한 Bunsik에서 홀 직원을 모집합니다.',
    '[{"title":"근무조건","items":["지역: Liverpool","근무일수: 주 2~3일 이상","영업시간: 평일/주말 08:30~18:00, 목요일 08:30~20:30","급여: 면접 후 협의"]},{"title":"업무내용","items":["홀 전반적인 업무","체계적인 업무 환경"]},{"title":"지원방법","items":["이름, 나이, 사는 지역, 비자상태, 비자 만료일, 근무가능 요일/시간을 적어 보내주세요","Phone: 0499 558 922","Email: bunsikliverpool@gmail.com"]}]'::jsonb,
    ARRAY['홀', '초보 가능', '파트타임', '책임감', '성실함'],
    'bunsikliverpool@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '로즈' LIMIT 1),
    'NSW',
    'Rhodes',
    '[Rhodes] 쇼핑센터 내 Bunsik 매장 파트타임 직원 채용 (2명)',
    'BUNSIK Rhodes',
    '면접 시 협의',
    '급여',
    'A 12:00~20:00 / B 10:00~18:00',
    '상시',
    0,
    '[["급여", "면접 시 경력과 역량에 따라 협의"], ["근무지역", "Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138", "BUNSIK Rhodes"], ["근무요일", "토 · 일 · 월"], ["근무시간", "A: 12:00~20:00 / B: 10:00~18:00"], ["모집분야", "파트타임 직원 2명"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "2명"], ["업무내용", "POS기 사용, 손님 응대, 재고 파악, 매장 청결 유지, 주방 보조"], ["우대사항", "초보자 가능, 손이 빠르고 위생 관념이 철저하신 분"], ["지원방법", "지원 양식과 이력서를 이메일로 전달"], ["이메일", "BunsikOP@gmail.com"]]'::jsonb,
    'Rhodes Waterside 쇼핑센터 내 BUNSIK에서 함께 근무할 파트타임 직원을 모집합니다.',
    '[{"title":"업무소개","items":["POS기 사용 및 손님 응대","재고 파악, 매장 청결 유지, 주방 보조","초보자도 체계적인 트레이닝 제공"]},{"title":"근무조건","items":["A: 1명, 12:00~20:00 토·일·월","B: 1명, 10:00~18:00 토·월","급여는 면접 시 경력과 역량에 따라 협의"]},{"title":"지원방법","items":["지원 양식 작성 후 이력서를 첨부하여 이메일로 보내주세요","이메일 제목 예시: [분식 로즈] A or B 파트타임 지원합니다","Email: BunsikOP@gmail.com"]}]'::jsonb,
    ARRAY['파트타임', 'POS', '손님응대', '재고관리', '주방보조', '초보 가능'],
    'BunsikOP@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '허스트빌' LIMIT 1),
    'NSW',
    'Hurstville',
    '[Hurstville] 쇼핑센터 내 Bunsik 매장 파트타임 직원 채용',
    'BUNSIK Hurstville',
    '면접 시 협의',
    '급여',
    '09:00~18:00',
    '상시',
    0,
    '[["급여", "면접 시 경력과 역량에 따라 협의"], ["근무지역", "Westfield Hurstville, Shop 463/3 Cross St, Hurstville NSW 2220", "BUNSIK Hurstville"], ["근무요일", "주 2일 이상", "주말 근무 포함"], ["근무시간", "09:00~18:00", "목요일 제외"], ["모집분야", "파트타임 직원"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "파트타임 직원"], ["업무내용", "분식 메뉴 조리, 재료 준비, 주방 위생 관리, POS기 사용, 손님 응대"], ["우대사항", "초보자 가능, 손이 빠르고 위생 관념이 철저하신 분"], ["지원방법", "지원 양식과 이력서를 이메일로 전달"], ["이메일", "BunsikOP@gmail.com"]]'::jsonb,
    'Westfield Hurstville 쇼핑센터 내 BUNSIK에서 함께 근무할 파트타임 직원을 모집합니다.',
    '[{"title":"업무소개","items":["치킨, 핫도그 등 주요 분식 메뉴 조리","재료 준비 및 주방 위생 관리","POS기 사용 및 손님 응대"]},{"title":"근무조건","items":["근무시간: 09:00~18:00 (목요일 제외)","근무형태: 파트타임, 주 2일 이상 가능자","주말 근무 포함","급여는 면접 시 협의"]},{"title":"지원방법","items":["지원 양식 작성 후 이력서를 첨부하여 이메일로 보내주세요","이메일 제목 예시: [분식 허스트빌] 지원합니다","Email: BunsikOP@gmail.com"]}]'::jsonb,
    ARRAY['파트타임', '분식조리', '주방', 'POS', '손님응대', '초보 가능'],
    'BunsikOP@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '탑라이드' LIMIT 1),
    'NSW',
    'Top Ryde',
    'Top Ryde 쇼핑센터 내 Bunsik 매장 남자직원 채용',
    'BUNSIK Top Ryde',
    '면접 시 협의',
    '급여',
    '09:00~18:00',
    '상시',
    0,
    '[["급여", "면접 시 경력과 역량에 따라 협의"], ["근무지역", "Corner of Blaxland Road & Devlin Street Shop L1 K403 / Top, Ryde NSW 2112", "BUNSIK Top Ryde"], ["근무요일", "주 5일 이상", "주말 근무 포함"], ["근무시간", "09:00~18:00", "목요일 제외"], ["모집분야", "남자직원"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "남자직원"], ["업무내용", "분식 메뉴 조리, 재료 준비, 주방 위생 관리, POS기 사용, 손님 응대"], ["우대사항", "초보자 가능, 손이 빠르고 위생 관념이 철저하신 분"], ["지원방법", "지원 양식과 이력서를 이메일로 전달"], ["이메일", "BunsikOP@gmail.com"]]'::jsonb,
    'Top Ryde City 쇼핑센터 내 BUNSIK에서 함께 근무할 남자직원을 모집합니다.',
    '[{"title":"업무소개","items":["치킨, 핫도그 등 주요 분식 메뉴 조리","재료 준비 및 주방 위생 관리","POS기 사용 및 손님 응대"]},{"title":"근무조건","items":["근무시간: 09:00~18:00 (목요일 제외)","근무형태: 주 5일 이상 가능자","주말 근무 포함","급여는 면접 시 협의"]},{"title":"지원방법","items":["지원 양식 작성 후 이력서를 첨부하여 이메일로 보내주세요","이메일 제목 예시: [분식 탑라이드] 지원합니다","Email: BunsikOP@gmail.com"]}]'::jsonb,
    ARRAY['남자직원', '분식조리', '주방', 'POS', '손님응대', '초보 가능'],
    'BunsikOP@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '채스우드' LIMIT 1),
    'NSW',
    'Chatswood',
    '[Chatswood/채스우드] 키친 직원 구합니다.',
    'BUNSIK Chatswood',
    '면접 시 협의',
    '급여',
    '09:00~18:00',
    '상시',
    0,
    '[["급여", "면접 시 협의"], ["근무지역", "Westfield Chatswood, Shop 228, Level 2/1 Anderson St, Chatswood NSW 2067", "BUNSIK Chatswood"], ["근무요일", "주 5일 이상", "주말 포함"], ["근무시간", "09:00~18:00"], ["모집분야", "키친 / 주방 직원"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "키친 직원"], ["업무내용", "간단한 분식 조리, 재료 준비, 재고 관리"], ["우대사항", "주방경력이 적거나 없어도 지원 가능"], ["지원방법", "어느 매장에 지원하는지 제목에 적어 이력서와 함께 이메일로 전달"], ["이메일", "BunsikOP@gmail.com"]]'::jsonb,
    'Westfield Chatswood 안에 위치한 BUNSIK에서 키친/주방 직원을 모집합니다.',
    '[{"title":"업무소개","items":["간단한 분식 조리","재료 준비","재고 관리"]},{"title":"근무조건","items":["근무시간: 09:00~18:00","주 5일 이상 근무 가능자","주말 포함","시급은 면접 시 협의 후 결정"]},{"title":"지원방법","items":["이력서와 함께 이메일로 보내주세요","제목에 어느 매장에 지원하는지 적어주세요","예: 분식 허스트빌 키친 포지션 지원합니다","Email: BunsikOP@gmail.com"]}]'::jsonb,
    ARRAY['키친', '주방', '분식조리', '재료준비', '재고관리', '초보 가능'],
    'BunsikOP@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '파라마타' LIMIT 1),
    'NSW',
    'Parramatta',
    '[Parramatta] 쇼핑센터 내 BUNSIK 매장 직원 채용',
    'BUNSIK Parramatta',
    '면접 시 협의',
    '급여',
    '09:00~18:00',
    '상시',
    0,
    '[["급여", "면접 시 경력과 역량에 따라 협의"], ["근무지역", "Westfield Parramatta, K544 Level 5/131 Church St, Parramatta NSW 2150", "BUNSIK Parramatta"], ["근무요일", "주 5일 이상", "주말 근무 포함"], ["근무시간", "09:00~18:00", "목요일 제외"], ["모집분야", "매장 매니저, 키친 스태프, 캐셔 및 홀 스태프"], ["복리후생", "체계적인 트레이닝 제공"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "매장 직원"], ["업무내용", "매장 운영 관리, 재고 및 자재 주문 관리, 분식 조리, 고객 응대, 매장 정리"], ["우대사항", "관련 업종 관리자 경력자 우대, 초보자 가능, 기본 영어 소통 가능자 우대"], ["지원방법", "지원 양식과 이력서를 이메일로 전달"], ["이메일", "BunsikOP@gmail.com"]]'::jsonb,
    'Westfield Parramatta 쇼핑센터 내 BUNSIK에서 함께 근무할 직원을 모집합니다.',
    '[{"title":"모집분야","items":["매장 매니저","키친 스태프","캐셔 및 홀 스태프"]},{"title":"근무조건","items":["근무시간: 09:00~18:00 (목요일 제외)","주 5일 이상 근무 가능자","주말 근무 포함","급여는 면접 시 협의"]},{"title":"지원방법","items":["지원 양식 작성 후 이력서를 첨부하여 이메일로 보내주세요","이메일 제목 예시: [분식 파라마타] 매니저 / 홀 / 키친 포지션 지원합니다","Email: BunsikOP@gmail.com"]}]'::jsonb,
    ARRAY['매장매니저', '키친', '캐셔', '홀', '분식조리', '고객응대'],
    'BunsikOP@gmail.com'
  ),
  (
    'bunsik',
    (SELECT id FROM public.company_branches WHERE company_slug = 'bunsik' AND branch_name = '로즈랜드' LIMIT 1),
    'NSW',
    'Roselands',
    '[Roselands/로즈랜드] 한식경력 주방 직원 구합니다',
    'BUNSIK Roselands',
    '면접 시 협의',
    '급여',
    '09:00~18:00',
    '상시',
    0,
    '[["급여", "면접 시 협의"], ["근무지역", "24 Roselands Ave, Roselands NSW 2196", "BUNSIK Roselands"], ["근무요일", "주 3일 이상", "주말 포함"], ["근무시간", "09:00~18:00"], ["모집분야", "한식 경력 주방 직원"], ["복리후생", "쇼핑센터 내 매장 근무"]]'::jsonb,
    '[["모집마감", "상시모집"], ["모집인원", "주방 직원"], ["업무내용", "주방, 캐셔, 손님 응대, 재고 관리"], ["우대사항", "한식당 경력자 우대, Roselands Shopping Centre 출퇴근 가능자"], ["지원방법", "지원 양식과 이력서를 이메일로 전달"], ["이메일", "BunsikOP@gmail.com"]]'::jsonb,
    'Roselands 쇼핑센터 안에 위치한 BUNSIK에서 주방을 맡아 일해주실 키친 직원을 모집합니다.',
    '[{"title":"업무소개","items":["주방 업무","캐셔 및 손님 응대","재고 관리"]},{"title":"근무조건","items":["근무시간: 09:00~18:00","주 3일 이상 근무 가능자","주말 포함","시급은 면접 시 협의 후 결정"]},{"title":"지원자격","items":["한식당 경력자 우대","Roselands Shopping Centre로 출퇴근 가능하신 분"]},{"title":"지원방법","items":["이름, 나이, 비자, 비자만료일, 전화번호, 근무 가능한 요일을 포함해 이메일로 보내주세요","Email: BunsikOP@gmail.com"]}]'::jsonb,
    ARRAY['주방', '한식경력', '캐셔', '손님응대', '재고관리', '주말근무'],
    'BunsikOP@gmail.com'
  )
) AS opening(
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order,
  condition_rows, recruitment_rows, detail_intro, detail_sections, skill_tags, apply_email
)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.company_job_openings existing
  WHERE existing.company_slug = opening.company_slug
    AND existing.title = opening.title
);
