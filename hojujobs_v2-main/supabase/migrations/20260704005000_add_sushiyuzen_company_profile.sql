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
  'sushiyuzen',
  'SUSHI YUZEN',
  'SUSHI YUZEN 직원 모집',
  'SUSHI YUZEN · MARAE · DOMO · Hello Chicken — 시드니·멜버른 일식 다이닝 그룹',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviGMYOpZPvAIearZo8cgzB1YLQQsIQD9cQKh9FWE1sw&s',
  'https://static.wixstatic.com/media/827304_91349400cf644c308799f9161b922e29~mv2.jpg/v1/fill/w_1200,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/sushiyuzen_parramatta_shop_JPG.jpg',
  ARRAY['구인', 'NSW · VIC', '다지점', '상시모집', 'Tax Job'],
  ARRAY[
    'SUSHI YUZEN은 시드니 CBD와 파라마타에 스시 전문 매장을 운영하며, MARAE Izakaya(Chadstone), DOMO1·DOMO2 Izakaya(멜버른 CBD), Hello Chicken(Southbank) 등 다양한 브랜드를 함께 운영하는 일식 다이닝 그룹입니다.',
    '롤메이커, 핫푸드 쿡, 바텐더, 홀 슈퍼바이저 등 매장별로 다양한 포지션을 상시 모집하며, 전 매장 Tax Job(정식 세금신고) 포지션으로 채용합니다.'
  ],
  NULL,
  NULL,
  'hr@sushiyuzen.com.au',
  'https://www.instagram.com/sushi_yuzen/',
  '@sushi_yuzen',
  'Parramatta Square, Parramatta NSW 2150',
  'Parramatta Square, Parramatta NSW 2150',
  '[
    ["급여", "$31.19 ~ $35.15 + Super", "포지션 및 매장에 따라 협의"],
    ["근무지역", "시드니 CBD · 파라마타 · 멜버른 CBD · 채드스톤 · 사우스뱅크", "SUSHI YUZEN · MARAE · DOMO1/2 · Hello Chicken 매장"],
    ["근무요일", "주 5일(평일) 또는 주말 포함 캐주얼", "브랜드 및 포지션에 따라 다름"],
    ["근무시간", "매장별 상이 (예: 08:00~14:30)", "Tax Job only"],
    ["모집분야", "롤메이커, 핫푸드 쿡, 바텐더, 홀 슈퍼바이저", "브랜드별 별도 채용 진행"],
    ["복리후생", "법정 연금(Super), 정식 세금신고(Tax Job)", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "매장별 1명 (다수 포지션 동시 진행)"],
    ["우대사항", "스시롤메이킹/일식 주방 경력자, 비자 1년 이상 남은 분, RSA 소지자(홀 포지션 우대)"],
    ["지원방법", "지원 매장·포지션, 이력서, 비자상태를 이메일로 접수"]
  ]'::jsonb,
  ARRAY['스시롤메이킹', '일식 조리', '바텐딩', '홀 서비스', 'POS 운영', '재고관리']
);

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
  6,
  'SUSHI
YUZEN',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviGMYOpZPvAIearZo8cgzB1YLQQsIQD9cQKh9FWE1sw&s',
  'black',
  'Sushi Yuzen',
  'NSW · VIC · 다지점',
  'SUSHI YUZEN 직원 모집',
  '시급',
  '$31.19 ~ $35.15 + Super',
  '/company/sushiyuzen'
);
