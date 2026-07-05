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
  'stoneage',
  '석기시대',
  '석기시대 직원 모집',
  'STONEAGE Korean BBQ — 허스트빌 · 웨스트라이드 · 캐슬힐 프리미엄 코리안 BBQ',
  '/stoneage_logo.png',
  'https://stoneagebbq.com.au/wp-content/uploads/2026/01/Generated-Image-December-29-2025-2_18AM.jpeg',
  ARRAY['구인', 'NSW', '여러 지점', '상시모집', '파트타임 / 풀타임'],
  ARRAY[
    '석기시대(STONEAGE Korean BBQ)는 시드니에서 프리미엄 코리안 BBQ를 선보이는 브랜드로, 허스트빌, 웨스트라이드, 캐슬힐 등 여러 지점에서 운영되고 있습니다.',
    '신선한 프리미엄 고기, 테이블 그릴 서비스, 다양한 반찬과 따뜻한 고객 경험을 중요하게 생각합니다. 초보자도 트레이닝을 통해 홀 서비스, 주방 보조, 매장 운영을 배울 수 있습니다.'
  ],
  '0493 645 627',
  '+61493645627',
  'info@oneul.com.au',
  'https://www.instagram.com/stoneage_sydney/',
  '@stoneage_sydney',
  '1A Chatham Rd, West Ryde NSW 2114',
  '1A Chatham Rd, West Ryde NSW 2114',
  '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "허스트빌 · 웨스트라이드 · 캐슬힐", "지점별 별도 채용"],
    ["근무요일", "풀타임 / 파트타임", "주말 근무 가능자 우대"],
    ["근무시간", "점심·저녁 영업 시간대", "지점 및 포지션에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 보조, 그릴 서비스, 매장 운영", "초보 가능, 경력자 우대"],
    ["복리후생", "법정 연금, 유급 휴가, 스태프밀, 트레이닝", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "Korean BBQ/레스토랑 경력, 기본 영어 소통, 주말 근무 가능, 장기 근무 가능"],
    ["지원방법", "인스타그램 또는 이메일로 이름, 연락처, 비자상태, 희망 지점, 가능 요일을 전달"]
  ]'::jsonb,
  ARRAY['홀 서빙', '테이블 그릴', '주방 보조', '고객응대', '위생관리', '매장정리']
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  profile_title = EXCLUDED.profile_title,
  subtitle = EXCLUDED.subtitle,
  logo_url = EXCLUDED.logo_url,
  photo_url = EXCLUDED.photo_url,
  badges = EXCLUDED.badges,
  about_paragraphs = EXCLUDED.about_paragraphs,
  phone = EXCLUDED.phone,
  phone_href = EXCLUDED.phone_href,
  email = EXCLUDED.email,
  instagram_url = EXCLUDED.instagram_url,
  instagram_handle = EXCLUDED.instagram_handle,
  address = EXCLUDED.address,
  map_query = EXCLUDED.map_query,
  condition_rows = EXCLUDED.condition_rows,
  recruitment_rows = EXCLUDED.recruitment_rows,
  skill_tags = EXCLUDED.skill_tags,
  is_active = true,
  updated_at = now();

DELETE FROM public.company_branches
WHERE company_slug = 'stoneage';

INSERT INTO public.company_branches (
  company_slug,
  branch_name,
  branch_label,
  address,
  map_query,
  phone,
  phone_href,
  email,
  condition_rows,
  recruitment_rows,
  sort_order
) VALUES
(
  'stoneage',
  '허스트빌',
  'Hurstville',
  '266 Forest Rd, Hurstville NSW 2220',
  '266 Forest Rd, Hurstville NSW 2220',
  '0433 548 994',
  '+61433548994',
  'info@oneul.com.au',
  '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "266 Forest Rd, Hurstville NSW 2220", "STONEAGE Hurstville"],
    ["근무요일", "풀타임 / 파트타임", "주말 근무 가능자 우대"],
    ["근무시간", "점심·저녁 영업 시간대", "지점 상황에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 보조, 그릴 서비스", "초보 가능, 경력자 우대"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "Korean BBQ/레스토랑 경력, 기본 영어 소통, 장기 근무 가능"],
    ["지원방법", "이메일 또는 인스타그램 DM으로 지원"]
  ]'::jsonb,
  1
),
(
  'stoneage',
  '웨스트라이드',
  'West Ryde',
  '1A Chatham Rd, West Ryde NSW 2114',
  '1A Chatham Rd, West Ryde NSW 2114',
  '0493 645 627',
  '+61493645627',
  'info@oneul.com.au',
  '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "1A Chatham Rd, West Ryde NSW 2114", "STONEAGE West Ryde"],
    ["근무요일", "풀타임 / 파트타임", "주말 근무 가능자 우대"],
    ["근무시간", "점심·저녁 영업 시간대", "지점 상황에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 보조, 그릴 서비스", "초보 가능, 경력자 우대"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "Korean BBQ/레스토랑 경력, 기본 영어 소통, 장기 근무 가능"],
    ["지원방법", "이메일 또는 인스타그램 DM으로 지원"]
  ]'::jsonb,
  2
),
(
  'stoneage',
  '캐슬힐',
  'Castle Hill',
  'Shop 16/15 De Clambe Dr, Castle Hill NSW 2154',
  'Shop 16/15 De Clambe Dr, Castle Hill NSW 2154',
  '0493 253 631',
  '+61493253631',
  'info@oneul.com.au',
  '[
    ["급여", "면접 시 협의", "포지션과 경력에 따라 협의"],
    ["근무지역", "Shop 16/15 De Clambe Dr, Castle Hill NSW 2154", "STONEAGE Castle Hill"],
    ["근무요일", "풀타임 / 파트타임", "주말 근무 가능자 우대"],
    ["근무시간", "점심·저녁 영업 시간대", "지점 상황에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 보조, 그릴 서비스", "초보 가능, 경력자 우대"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "Korean BBQ/레스토랑 경력, 기본 영어 소통, 장기 근무 가능"],
    ["지원방법", "이메일 또는 인스타그램 DM으로 지원"]
  ]'::jsonb,
  3
);

DELETE FROM public.homepage_job_cards
WHERE company_label = '석기시대'
   OR job_url = '/company/stoneage';

INSERT INTO public.homepage_job_cards (
  sort_order,
  logo_text,
  logo_url,
  logo_tone,
  company_label,
  location_label,
  title,
  pay_type,
  pay_amount,
  job_url
) VALUES (
  10,
  'STONEAGE',
  '/stoneage_logo.png',
  'black',
  '석기시대',
  'NSW · 여러 지점',
  '석기시대 직원 모집',
  '급여',
  '면접 시 협의',
  '/company/stoneage'
);
