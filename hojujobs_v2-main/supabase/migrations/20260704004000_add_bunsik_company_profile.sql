INSERT INTO public.company_profiles (
  slug,
  name,
  profile_title,
  subtitle,
  logo_url,
  photo_url,
  badges,
  about_paragraphs,
  phone,
  phone_href,
  email,
  instagram_url,
  instagram_handle,
  address,
  map_query,
  condition_rows,
  recruitment_rows,
  skill_tags
) VALUES (
  'bunsik',
  'BUNSIK',
  'BUNSIK 직원 모집',
  '떡볶이 · 치킨 · 핫도그 · 컵밥 K-Food 분식 프랜차이즈',
  'https://bunsik.au/wp-content/uploads/2023/07/bunsik-logo.png',
  'https://bunsik.au/wp-content/uploads/2023/07/bunsik-image.png',
  ARRAY['구인', 'NSW', '다지점', '상시모집', '파트타임 / 풀타임'],
  ARRAY[
    'BUNSIK(분식)은 떡볶이, 치킨, 핫도그, 컵밥 등 한국의 대표 분식 메뉴를 선보이는 K-Food 프랜차이즈로, 시드니 전역 Westfield 쇼핑센터 푸드코트에서 매장을 운영하고 있습니다.',
    '채스우드, 허스트빌, 버우드, 탑라이드, 파라마타 등 각 지점에서 매장 매니저, 키친 스태프, 캐셔/홀 스태프를 모집합니다. 주방 경력이 없어도 체계적인 트레이닝을 제공합니다.'
  ],
  NULL,
  NULL,
  'BunsikOP@gmail.com',
  'https://www.instagram.com/bunsik_au/',
  '@bunsik_au',
  'Westfield Parramatta, 159-175 Church St, Parramatta NSW 2150',
  'Westfield Parramatta, 159-175 Church St, Parramatta NSW 2150',
  '[
    ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
    ["근무지역", "채스우드 · 허스트빌 · 버우드 · 탑라이드 · 파라마타 등", "Westfield 쇼핑센터 내 매장, 지점별 별도 채용"],
    ["근무요일", "주 2일 ~ 주 5일 이상", "지점 및 포지션에 따라 다름"],
    ["근무시간", "09:00 ~ 18:00 (매장별 상이)", "목요일 휴무 지점 있음"],
    ["모집분야", "매장 매니저, 키친 스태프, 캐셔/홀 스태프", "초보자 가능, 트레이닝 제공"],
    ["복리후생", "법정 연금, 유급 휴가, 체계적 트레이닝", "Fast Food Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "주방/카페 경력자, 기본 영어 소통 가능자, 손이 빠르고 위생 관념이 철저한 분"],
    ["지원방법", "이메일 제목에 지원 매장을 명시하여 이력서 접수"]
  ]'::jsonb,
  ARRAY['분식 조리', 'POS 운영', '고객응대', '재고관리', '위생관리', '매장운영']
);

UPDATE public.homepage_job_cards
SET job_url = '/company/bunsik',
    location_label = 'NSW · 다지점'
WHERE company_label = 'Bunsik';
