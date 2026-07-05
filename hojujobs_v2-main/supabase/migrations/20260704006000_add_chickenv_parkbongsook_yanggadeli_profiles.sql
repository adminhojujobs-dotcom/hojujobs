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
) VALUES
(
  'chickenv',
  'Chicken V',
  'Chicken V 직원 모집',
  '치킨 & 부산포차 — 이스트우드 · 시드니 시티 매장 홀/주방 직원 모집',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/chickenv.png',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/photos/chickenv.jpg',
  ARRAY['구인', 'NSW', '다지점', '상시모집', '파트타임 / 풀타임'],
  ARRAY[
    'Chicken V는 치킨과 안주를 함께 즐길 수 있는 한국식 포차 콘셉트 매장으로, 이스트우드(Chicken V Eastwood & Busanjip)와 시드니 시티(Chicken V & Busan Pocha City, 345b Sussex St)에서 매장을 운영하고 있습니다.',
    '이스트우드역과 타운홀 도보 거리에 위치해 접근성이 좋으며, 매일 맛있는 석식(스텝밀)과 직원 할인을 제공합니다. 초보자도 환영하며 경력자는 우대합니다.'
  ],
  NULL,
  NULL,
  'iseoyun6816@gmail.com',
  'https://www.instagram.com/chickenvsydney/',
  '@chickenvsydney',
  '345b Sussex St, Sydney NSW 2000',
  '345b Sussex St, Sydney NSW 2000',
  '[
    ["급여", "면접 시 협의", "경력에 따라 웨이지 우대, 나이트 타임 추가 수당"],
    ["근무지역", "이스트우드 · 시드니 시티(Sussex St)", "매장별 별도 채용"],
    ["근무요일", "풀타임(주 4~5일) / 파트타임(주말 포함)", "지점 및 포지션에 따라 다름"],
    ["근무시간", "11:00 ~ 24:00 (시티점은 익일 새벽까지)", "지점별 Trading Hours 상이"],
    ["모집분야", "홀 스태프, 주방 스태프", "초보 환영, 경력자 우대"],
    ["복리후생", "매일 석식(스텝밀) 제공, 직원 할인, 나이트 웨이지", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~2명"],
    ["우대사항", "경력자 우대, 워킹홀리데이/학생비자 가능"],
    ["지원방법", "이름·나이·비자상태·거주지를 문자로 전달"]
  ]'::jsonb,
  ARRAY['홀 서빙', '주방 조리', '포차 안주 조리', '고객응대', '매장정리', '재고관리']
),
(
  'parkbongsook',
  '박봉숙',
  '박봉숙 직원 모집',
  '이스트우드 · 시드니 시티(차이나타운) — 한식 포차 레스토랑',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/parkbongsook.png',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/photos/parkbongsook.jpg',
  ARRAY['구인', 'NSW', '다지점', '상시모집', '파트타임 / 풀타임'],
  ARRAY[
    '박봉숙 레스토랑은 이스트우드와 시드니 시티 차이나타운에서 운영되는 한식 포차 레스토랑으로, 활기찬 분위기 속에서 다양한 한식 메뉴와 안주를 선보입니다.',
    '이스트우드점은 역에서 1분 거리에 위치해 있으며, 시티점(박봉숙City)은 영업시간이 11AM~4AM으로 길어 근무시간 조율이 자유롭습니다. 비자 스폰서도 가능합니다.'
  ],
  '(02) 8592 9312',
  '+61285929312',
  'pbseastwood@gmail.com',
  'https://www.instagram.com/parkbongsook_restaurant/',
  '@parkbongsook_restaurant',
  '108 Rowe St, Eastwood NSW 2122',
  '108 Rowe St, Eastwood NSW 2122',
  '[
    ["급여", "$26.5 ~ $29.5 + 주말수당 + 연금", "포지션(홀/주방/매니저)에 따라 협의"],
    ["근무지역", "이스트우드 · 시드니 시티(차이나타운)", "지점별 별도 채용"],
    ["근무요일", "풀타임 / 파트타임", "희망 근무시간 최대 반영"],
    ["근무시간", "이스트우드 11:00~24:00 / 시티 11AM~4AM", "매장별 영업시간 상이"],
    ["모집분야", "홀 스태프, 주방/키친핸드, 매니저·슈퍼바이저", "경력자 우대, 초보 가능"],
    ["복리후생", "스텝밀 제공, 직원할인 20%, 애뉴얼리브·연금 지급", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~2명"],
    ["우대사항", "장기 근무 가능자, 워킹홀리데이/학생비자 환영, 비자 스폰서 가능(시티점)"],
    ["지원방법", "이름/나이/성별/비자상태/경력을 문자로 전달"]
  ]'::jsonb,
  ARRAY['홀 서빙', '주방 조리', '키친핸드', '포차 안주 조리', '고객응대', '매장관리']
),
(
  'yanggadeli',
  'Yangga Deli',
  'Yangga Deli 직원 모집',
  '로즈 · 채스우드 — 테이크어웨이 & 반찬 전문점',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/yangga-deli.png',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/photos/yangga-deli.jpg',
  ARRAY['구인', 'NSW', '다지점', '상시모집', '파트타임 / 풀타임'],
  ARRAY[
    'Yangga Deli는 로즈와 채스우드 지역에서 테이크어웨이 및 반찬 전문 매장으로 운영되고 있으며, 도시락, 김밥, 반찬 등 다양한 한식 메뉴를 판매합니다.',
    '주방, 홀 스태프, 김밥 스태프 등 매장별로 다양한 포지션을 모집하며, 손이 빠르고 책임감 있는 팀원을 찾고 있습니다. Tax File Number(TFN) 소지자만 지원 가능합니다.'
  ],
  '0450 622 558',
  '+61450622558',
  'yanggafoods@gmail.com',
  'https://www.instagram.com/yangga_koreandeli/',
  '@yangga_koreandeli',
  'Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067',
  'Chatswood Chase Shopping Centre, Chatswood NSW 2067',
  '[
    ["급여", "면접 시 경력에 따라 협의", "주말 시급은 평일 시급의 1.25배 적용"],
    ["근무지역", "로즈 · 채스우드(Chatswood Chase)", "지점별 별도 채용"],
    ["근무요일", "풀타임(주 5일) 또는 파트타임(주 2~4일)", "지점 및 포지션에 따라 다름"],
    ["근무시간", "07:00~15:00 / 07:00~16:30 (매장별 상이)", "김밥·홀 포지션은 별도 시간대"],
    ["모집분야", "주방 스태프, 홀 스태프, 김밥 스태프", "TFN 소지자 필수"],
    ["복리후생", "주말 수당(1.25배), 안정적인 시프트 운영", "Fast Food/Retail Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1명"],
    ["우대사항", "손이 빠르고 책임감 있는 분, 밝고 긍정적인 팀워크"],
    ["지원방법", "이름·나이·거주지역·근무가능일·비자상태를 문자 또는 이메일로 전달"]
  ]'::jsonb,
  ARRAY['김밥 만들기', '반찬 조리', '도시락 조리', '캐셔', '디스플레이', '고객응대']
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
) VALUES
(
  7,
  'Chicken V',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/chickenv.png',
  'red',
  'Chicken V',
  'NSW · 다지점',
  'Chicken V 직원 모집',
  '급여',
  '면접 시 협의',
  '/company/chickenv'
),
(
  8,
  '박봉숙',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/parkbongsook.png',
  'black',
  '박봉숙',
  'NSW · 다지점',
  '박봉숙 직원 모집',
  '시급',
  '$26.5 ~ $29.5 + Super',
  '/company/parkbongsook'
),
(
  9,
  'Yangga
Deli',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/yangga-deli.png',
  'neutral',
  'Yangga Deli',
  'NSW · 다지점',
  'Yangga Deli 직원 모집',
  '급여',
  '면접 시 협의',
  '/company/yanggadeli'
);
