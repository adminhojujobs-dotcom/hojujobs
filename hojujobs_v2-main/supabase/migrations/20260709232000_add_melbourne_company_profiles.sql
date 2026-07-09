DELETE FROM public.company_job_openings
WHERE company_slug IN ('bbqcode', 'paiksbbq', 'dooboo', 'samsamchicken', 'bornga');

DELETE FROM public.company_branches
WHERE company_slug IN ('bbqcode', 'paiksbbq', 'dooboo', 'samsamchicken', 'bornga');

DELETE FROM public.company_profiles
WHERE slug IN ('bbqcode', 'paiksbbq', 'dooboo', 'samsamchicken', 'bornga');

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
  'bbqcode',
  'BBQ Code',
  'BBQ Code 직원 모집',
  '글렌 웨이벌리에서 시작한 멜버른 Korean Charcoal BBQ 레스토랑',
  'https://www.google.com/s2/favicons?domain=bbqcode.com.au&sz=256',
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=80',
  ARRAY['구인', 'VIC', '다지점', '상시모집', '풀타임 / 파트타임'],
  ARRAY[
    'BBQ Code는 2018년 Glen Waverley에서 시작해 Melbourne CBD와 Doncaster East까지 확장한 Korean Charcoal BBQ 레스토랑입니다.',
    '프리미엄 고기 세트, 한식 사이드, 따뜻한 테이블 서비스를 중심으로 운영되며 홀, 주방, 그릴 서비스 등 다양한 포지션에서 팀원을 모집할 수 있습니다.'
  ],
  '+61 416 496 977',
  '+61416496977',
  'eat@bbqcode.com.au',
  NULL,
  NULL,
  '249 Springvale Rd, Glen Waverley VIC 3150',
  '249 Springvale Rd, Glen Waverley VIC 3150',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Glen Waverley · Doncaster East · Melbourne CBD", "지점별 별도 채용"],
    ["근무요일", "주중 / 주말 협의", "런치·디너 시프트 운영"],
    ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 스태프, 그릴 서비스", "경력자 우대, 초보자 가능"],
    ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~2명"],
    ["우대사항", "Korean BBQ 또는 레스토랑 경험자, 주말 근무 가능자, 영어 소통 가능자"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  ARRAY['홀 서빙', '그릴 서비스', '주방 보조', '고객응대', '테이블 정리', '위생관리']
),
(
  'paiksbbq',
  'PAIK''S BBQ',
  'PAIK''S BBQ 직원 모집',
  'Melbourne CBD Little Lonsdale St Korean BBQ 레스토랑',
  'https://ui-avatars.com/api/?name=PAIK%27S+BBQ&background=111827&color=fff&size=256&bold=true',
  'https://static.where-e.com/Australia/Paik-S-Bbq_31c30b5ff7140ca87a6a040c5f076fe4.jpg',
  ARRAY['구인', 'VIC', 'Melbourne CBD', '상시모집', '풀타임 / 파트타임'],
  ARRAY[
    'PAIK''S BBQ는 Melbourne CBD Little Lonsdale Street에 위치한 Korean BBQ 레스토랑입니다.',
    '도심 접근성이 좋은 매장에서 홀 서비스, 주방 보조, 테이블 정리와 고객응대 등 레스토랑 운영 전반을 함께할 팀원을 모집할 수 있습니다.'
  ],
  '03 9972 2043',
  '+61399722043',
  'saemaul10082018@gmail.com',
  NULL,
  NULL,
  '525 Little Lonsdale St, Melbourne VIC 3000',
  '525 Little Lonsdale St, Melbourne VIC 3000',
  '[
    ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
    ["근무지역", "525 Little Lonsdale St, Melbourne VIC 3000", "Melbourne CBD"],
    ["근무요일", "주중 / 주말 협의", "디너 및 주말 가능자 우대"],
    ["근무시간", "풀타임 / 파트타임", "매장 운영 상황에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 스태프, 키친핸드", "초보자 가능, 경력자 우대"],
    ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "1~2명"],
    ["우대사항", "Korean BBQ 또는 홀/주방 경험자, 장기 근무 가능자"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  ARRAY['홀 서빙', '주방 보조', '키친핸드', '고객응대', '테이블 정리', '위생관리']
),
(
  'dooboo',
  'DOOBOO',
  'DOOBOO 직원 모집',
  '순두부·비빔밥·돈가스 등 한식 메뉴를 운영하는 Melbourne 다지점 레스토랑',
  'https://images.squarespace-cdn.com/content/v1/6281bd30d89ad1244a348d0e/6854b493-de91-44b5-ba33-6fa61c8a34b6/Dooboo-Logo-%28Hot-Pot%292.png?format=1500w',
  'https://images.squarespace-cdn.com/content/v1/6281bd30d89ad1244a348d0e/ee9c0c6e-2c03-4caa-bdbe-abe435e46c6b/Dooboo-093-1-.jpg',
  ARRAY['구인', 'VIC', '다지점', '상시모집', '풀타임 / 파트타임'],
  ARRAY[
    'DOOBOO는 Melbourne CBD, Box Hill, Glen Waverley, Clayton에서 순두부, 비빔밥, 돈가스, 치킨 등 다양한 한식 메뉴를 선보이는 레스토랑입니다.',
    '쇼핑센터와 중심 상권에 위치한 매장에서 홀 서비스, 주방 조리 보조, 캐셔, 키친핸드 등 다양한 포지션의 팀원을 모집할 수 있습니다.'
  ],
  '03 8395 3782',
  '+61383953782',
  NULL,
  'https://www.instagram.com/dooboo.au/',
  '@dooboo.au',
  '261 Swanston St, Melbourne VIC 3000',
  '261 Swanston St, Melbourne VIC 3000',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Melbourne CBD · Box Hill · Glen Waverley · Clayton", "지점별 별도 채용"],
    ["근무요일", "주중 / 주말 협의", "런치·디너 시프트 운영"],
    ["근무시간", "풀타임 / 파트타임", "매장별 영업시간에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "초보자 가능, 경력자 우대"],
    ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~2명"],
    ["우대사항", "한식당 경험자, 주말 근무 가능자, 영어 소통 가능자"],
    ["본사 연락처", "03 8395 3782", "전 지점 공통 HQ 번호"],
    ["지원방법", "지점 연락처 또는 본사 번호로 문의"]
  ]'::jsonb,
  ARRAY['홀 서빙', '한식 조리', '주방 보조', '캐셔', '고객응대', '위생관리']
),
(
  'samsamchicken',
  'SamSam Chicken & Beer',
  'SamSam Chicken & Beer 직원 모집',
  'Melbourne CBD와 Box Hill에서 운영되는 Korean Chicken & Beer 레스토랑',
  'https://images.squarespace-cdn.com/content/v1/5ab08d4d1aef1d04ff510c72/1607573003335-Y4H31KSPNHWMUL8LDUAT/SamSam_Symbol-01.png',
  'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1600&q=80',
  ARRAY['구인', 'VIC', '다지점', '상시모집', '풀타임 / 파트타임'],
  ARRAY[
    'SamSam Chicken & Beer는 2015년 Melbourne City에서 시작한 Korean casual restaurant로, 갓 튀긴 치킨과 맥주 문화를 Melbourne에 소개해 왔습니다.',
    'CBD와 Box Hill 지점에서 치킨, 한식 메뉴, 음료 서비스를 운영하며 홀, 주방, 키친핸드, 캐셔 포지션의 팀원을 모집할 수 있습니다.'
  ],
  '03 8395 3782',
  '+61383953782',
  NULL,
  NULL,
  NULL,
  '207-209 Swanston St, Melbourne VIC 3000',
  '207-209 Swanston St, Melbourne VIC 3000',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Melbourne CBD · Box Hill", "지점별 별도 채용"],
    ["근무요일", "주중 / 주말 협의", "런치·디너 시프트 운영"],
    ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "치킨 조리 경험자 우대"],
    ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~2명"],
    ["우대사항", "치킨/주방 경험자, 밝은 고객응대, 주말 근무 가능자"],
    ["HQ 연락처", "03 8395 3782", "예약은 지점 연락처 이용"],
    ["지원방법", "지점 연락처로 문의"]
  ]'::jsonb,
  ARRAY['홀 서빙', '치킨 조리', '주방 보조', '캐셔', '고객응대', '위생관리']
),
(
  'bornga',
  'Bornga',
  'Bornga 직원 모집',
  'Melbourne Chinatown Little Bourke St Korean BBQ 레스토랑',
  'https://www.google.com/s2/favicons?domain=bornga.kr&sz=256',
  'https://media-cdn.tripadvisor.com/media/photo-l/1a/24/59/8d/caption.jpg',
  ARRAY['구인', 'VIC', 'Melbourne CBD', '상시모집', '풀타임 / 파트타임'],
  ARRAY[
    'Bornga는 백종원 대표가 만든 글로벌 Korean BBQ 브랜드로, 전통 한식과 BBQ 메뉴를 중심으로 운영되는 레스토랑입니다.',
    'Melbourne Chinatown Little Bourke Street 지점에서 홀 서비스, 주방, 그릴 서비스, 매장 운영을 함께할 팀원을 모집할 수 있습니다.'
  ],
  '03 9995 0643',
  '+61399950643',
  'mbornga@gmail.com',
  'https://www.instagram.com/bornga_aus/',
  '@bornga_aus',
  'Level 1/178 Little Bourke St, Melbourne VIC 3000',
  'Level 1/178 Little Bourke St, Melbourne VIC 3000',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Level 1/178 Little Bourke St, Melbourne VIC 3000", "Melbourne Chinatown"],
    ["근무요일", "주중 / 주말 협의", "디너 및 주말 가능자 우대"],
    ["근무시간", "풀타임 / 파트타임", "매장 운영 상황에 따라 조율"],
    ["모집분야", "홀 스태프, 주방 스태프, 그릴 서비스", "Korean BBQ 경험자 우대"],
    ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "1~2명"],
    ["우대사항", "Korean BBQ 또는 레스토랑 경험자, 장기 근무 가능자"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  ARRAY['홀 서빙', '그릴 서비스', '주방 보조', '고객응대', '테이블 정리', '위생관리']
);

INSERT INTO public.company_branches (
  company_slug, branch_name, branch_label, address, map_query, phone, phone_href, email, condition_rows, recruitment_rows, sort_order
) VALUES
('bbqcode', 'Glen Waverley', '글렌 웨이벌리점', '249 Springvale Rd, Glen Waverley VIC 3150', '249 Springvale Rd, Glen Waverley VIC 3150', '+61 416 496 977', '+61416496977', 'eat@bbqcode.com.au', '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "249 Springvale Rd, Glen Waverley VIC 3150", "BBQ Code Glen Waverley"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 그릴 서비스", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "주말 근무 가능자, Korean BBQ 경험자"],
  ["연락처", "+61 416 496 977"],
  ["이메일", "eat@bbqcode.com.au"],
  ["지원방법", "전화 또는 이메일 문의"]
]'::jsonb, 1),
('bbqcode', 'Doncaster East', '돈캐스터 이스트점', '11-13/958 Doncaster Rd, Doncaster East VIC 3109', '11-13/958 Doncaster Rd, Doncaster East VIC 3109', '+61 430 085 542', '+61430085542', 'eat@bbqcode.com.au', '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "11-13/958 Doncaster Rd, Doncaster East VIC 3109", "BBQ Code Doncaster East"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 그릴 서비스", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "주말 근무 가능자, Korean BBQ 경험자"],
  ["연락처", "+61 430 085 542"],
  ["이메일", "eat@bbqcode.com.au"],
  ["지원방법", "전화 또는 이메일 문의"]
]'::jsonb, 2),
('bbqcode', 'Melbourne CBD', '멜버른 CBD점', '105 Little Bourke St, Melbourne VIC 3000', '105 Little Bourke St, Melbourne VIC 3000', '+61 494 568 026', '+61494568026', 'eat@bbqcode.com.au', '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "105 Little Bourke St, Melbourne VIC 3000", "BBQ Code Melbourne CBD"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 그릴 서비스", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "주말 근무 가능자, Korean BBQ 경험자"],
  ["연락처", "+61 494 568 026"],
  ["이메일", "eat@bbqcode.com.au"],
  ["지원방법", "전화 또는 이메일 문의"]
]'::jsonb, 3),
('paiksbbq', 'Lonsdale', '론스데일점', '525 Little Lonsdale St, Melbourne VIC 3000', '525 Little Lonsdale St, Melbourne VIC 3000', '03 9972 2043', '+61399722043', 'saemaul10082018@gmail.com', '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "525 Little Lonsdale St, Melbourne VIC 3000", "PAIK''S BBQ Lonsdale"],
  ["근무요일", "주중 / 주말 협의", "디너 및 주말 가능자 우대"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 상황에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "Korean BBQ 또는 레스토랑 경험자"],
  ["연락처", "03 9972 2043"],
  ["이메일", "saemaul10082018@gmail.com"],
  ["지원방법", "전화 또는 이메일 문의"]
]'::jsonb, 1),
('dooboo', 'Melbourne CBD', '멜버른 CBD점', '261 Swanston St, Melbourne VIC 3000', '261 Swanston St, Melbourne VIC 3000', '0420 436 456', '+61420436456', NULL, '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "261 Swanston St, Melbourne VIC 3000", "DOOBOO Melbourne CBD"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "영업시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "한식당 경험자, 주말 근무 가능자"],
  ["연락처", "0420 436 456"],
  ["본사 연락처", "03 8395 3782"],
  ["지원방법", "전화 문의"]
]'::jsonb, 1),
('dooboo', 'Box Hill', '박스힐점', 'SP100, Box Hill Central, 1 Main St, Box Hill VIC 3128', 'SP100, Box Hill Central, 1 Main St, Box Hill VIC 3128', '0410 701 577', '+61410701577', NULL, '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "SP100, Box Hill Central, 1 Main St, Box Hill VIC 3128", "DOOBOO Box Hill"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "영업시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "한식당 경험자, 주말 근무 가능자"],
  ["연락처", "0410 701 577"],
  ["본사 연락처", "03 8395 3782"],
  ["지원방법", "전화 문의"]
]'::jsonb, 2),
('dooboo', 'Glen Waverley', '글렌 웨이벌리점', 'G-004, The Glen, 235 Springvale Rd, Glen Waverley VIC 3160', 'G-004, The Glen, 235 Springvale Rd, Glen Waverley VIC 3160', '03 8806 1650', '+61388061650', NULL, '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "G-004, The Glen, 235 Springvale Rd, Glen Waverley VIC 3160", "DOOBOO Glen Waverley"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "영업시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "한식당 경험자, 주말 근무 가능자"],
  ["연락처", "03 8806 1650"],
  ["본사 연락처", "03 8395 3782"],
  ["지원방법", "전화 문의"]
]'::jsonb, 3),
('dooboo', 'Clayton', '클레이튼점', '336A Clayton Rd, Clayton VIC 3168', '336A Clayton Rd, Clayton VIC 3168', '0410 298 682', '+61410298682', NULL, '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "336A Clayton Rd, Clayton VIC 3168", "DOOBOO Clayton"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "영업시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "초보자 가능"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "한식당 경험자, 주말 근무 가능자"],
  ["연락처", "0410 298 682"],
  ["본사 연락처", "03 8395 3782"],
  ["지원방법", "전화 문의"]
]'::jsonb, 4),
('samsamchicken', 'Melbourne CBD', '멜버른 CBD점', '207-209 Swanston St, Melbourne VIC 3000', '207-209 Swanston St, Melbourne VIC 3000', '0451 671 174', '+61451671174', NULL, '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "207-209 Swanston St, Melbourne VIC 3000", "SamSam Chicken & Beer CBD"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "치킨 조리 경험자 우대"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "치킨/주방 경험자, 주말 근무 가능자"],
  ["연락처", "0451 671 174"],
  ["HQ 연락처", "03 8395 3782"],
  ["지원방법", "전화 문의"]
]'::jsonb, 1),
('samsamchicken', 'Box Hill', '박스힐점', 'SP 102, Box Hill Central, 1 Main St, Box Hill VIC 3128', 'SP 102, Box Hill Central, 1 Main St, Box Hill VIC 3128', '0415 825 284', '+61415825284', NULL, '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "SP 102, Box Hill Central, 1 Main St, Box Hill VIC 3128", "SamSam Chicken & Beer Box Hill"],
  ["근무요일", "주중 / 주말 협의", "런치·디너 시프트"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 키친핸드, 캐셔", "치킨 조리 경험자 우대"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "치킨/주방 경험자, 주말 근무 가능자"],
  ["연락처", "0415 825 284"],
  ["HQ 연락처", "03 8395 3782"],
  ["지원방법", "전화 문의"]
]'::jsonb, 2),
('bornga', 'Melbourne CBD', '멜버른 CBD점', 'Level 1/178 Little Bourke St, Melbourne VIC 3000', 'Level 1/178 Little Bourke St, Melbourne VIC 3000', '03 9995 0643', '+61399950643', 'mbornga@gmail.com', '[
  ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
  ["근무지역", "Level 1/178 Little Bourke St, Melbourne VIC 3000", "Bornga Melbourne"],
  ["근무요일", "주중 / 주말 협의", "디너 및 주말 가능자 우대"],
  ["근무시간", "풀타임 / 파트타임", "매장 운영 시간에 따라 조율"],
  ["모집분야", "홀 스태프, 주방 스태프, 그릴 서비스", "Korean BBQ 경험자 우대"],
  ["복리후생", "법정 연금, 스태프밀, 직원 할인", "Hospitality Industry Award 기준"]
]'::jsonb, '[
  ["모집마감", "상시모집"],
  ["모집인원", "1~2명"],
  ["우대사항", "Korean BBQ 또는 레스토랑 경험자"],
  ["연락처", "03 9995 0643"],
  ["이메일", "mbornga@gmail.com"],
  ["지원방법", "전화 또는 이메일 문의"]
]'::jsonb, 1);

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
  apply_email,
  detail_intro,
  condition_rows,
  recruitment_rows,
  skill_tags
)
SELECT
  branch.company_slug,
  branch.id,
  'VIC',
  branch.suburb,
  branch.title,
  branch.company_label,
  '면접 시 협의',
  '급여',
  '풀타임 / 파트타임',
  '상시',
  branch.sort_order,
  branch.apply_email,
  branch.detail_intro,
  branch.condition_rows,
  branch.recruitment_rows,
  branch.skill_tags
FROM (
  SELECT b.*, 'Glen Waverley' AS suburb, 'BBQ Code Glen Waverley점 홀/주방 직원 모집' AS title, 'BBQ Code Glen Waverley점' AS company_label, 'eat@bbqcode.com.au' AS apply_email, 'BBQ Code Glen Waverley 지점에서 Korean BBQ 서비스를 함께할 홀/주방 팀원을 모집합니다.' AS detail_intro, ARRAY['홀 서빙', '그릴 서비스', '주방 보조', '고객응대', '위생관리'] AS skill_tags FROM public.company_branches b WHERE b.company_slug = 'bbqcode' AND b.branch_name = 'Glen Waverley'
  UNION ALL SELECT b.*, 'Doncaster East', 'BBQ Code Doncaster East점 홀/주방 직원 모집', 'BBQ Code Doncaster East점', 'eat@bbqcode.com.au', 'BBQ Code Doncaster East 지점에서 Korean BBQ 서비스를 함께할 홀/주방 팀원을 모집합니다.', ARRAY['홀 서빙', '그릴 서비스', '주방 보조', '고객응대', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'bbqcode' AND b.branch_name = 'Doncaster East'
  UNION ALL SELECT b.*, 'Melbourne CBD', 'BBQ Code Melbourne CBD점 홀/주방 직원 모집', 'BBQ Code Melbourne CBD점', 'eat@bbqcode.com.au', 'BBQ Code Melbourne CBD 지점에서 Korean BBQ 서비스를 함께할 홀/주방 팀원을 모집합니다.', ARRAY['홀 서빙', '그릴 서비스', '주방 보조', '고객응대', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'bbqcode' AND b.branch_name = 'Melbourne CBD'
  UNION ALL SELECT b.*, 'Melbourne CBD', 'PAIK''S BBQ Lonsdale점 홀/주방 직원 모집', 'PAIK''S BBQ Lonsdale점', 'saemaul10082018@gmail.com', 'PAIK''S BBQ에서 Korean BBQ 레스토랑 운영을 함께할 홀/주방 팀원을 모집합니다.', ARRAY['홀 서빙', '주방 보조', '키친핸드', '고객응대', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'paiksbbq' AND b.branch_name = 'Lonsdale'
  UNION ALL SELECT b.*, 'Melbourne CBD', 'DOOBOO Melbourne CBD점 홀/주방 직원 모집', 'DOOBOO Melbourne CBD점', NULL, 'DOOBOO Melbourne CBD 지점에서 한식 메뉴와 서비스를 함께할 팀원을 모집합니다.', ARRAY['홀 서빙', '한식 조리', '주방 보조', '캐셔', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'dooboo' AND b.branch_name = 'Melbourne CBD'
  UNION ALL SELECT b.*, 'Box Hill', 'DOOBOO Box Hill점 홀/주방 직원 모집', 'DOOBOO Box Hill점', NULL, 'DOOBOO Box Hill 지점에서 한식 메뉴와 서비스를 함께할 팀원을 모집합니다.', ARRAY['홀 서빙', '한식 조리', '주방 보조', '캐셔', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'dooboo' AND b.branch_name = 'Box Hill'
  UNION ALL SELECT b.*, 'Glen Waverley', 'DOOBOO Glen Waverley점 홀/주방 직원 모집', 'DOOBOO Glen Waverley점', NULL, 'DOOBOO Glen Waverley 지점에서 한식 메뉴와 서비스를 함께할 팀원을 모집합니다.', ARRAY['홀 서빙', '한식 조리', '주방 보조', '캐셔', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'dooboo' AND b.branch_name = 'Glen Waverley'
  UNION ALL SELECT b.*, 'Clayton', 'DOOBOO Clayton점 홀/주방 직원 모집', 'DOOBOO Clayton점', NULL, 'DOOBOO Clayton 지점에서 한식 메뉴와 서비스를 함께할 팀원을 모집합니다.', ARRAY['홀 서빙', '한식 조리', '주방 보조', '캐셔', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'dooboo' AND b.branch_name = 'Clayton'
  UNION ALL SELECT b.*, 'Melbourne CBD', 'SamSam Chicken & Beer CBD점 홀/주방 직원 모집', 'SamSam Chicken & Beer CBD점', NULL, 'SamSam Chicken & Beer CBD 지점에서 치킨과 한식 서비스를 함께할 팀원을 모집합니다.', ARRAY['홀 서빙', '치킨 조리', '주방 보조', '캐셔', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'samsamchicken' AND b.branch_name = 'Melbourne CBD'
  UNION ALL SELECT b.*, 'Box Hill', 'SamSam Chicken & Beer Box Hill점 홀/주방 직원 모집', 'SamSam Chicken & Beer Box Hill점', NULL, 'SamSam Chicken & Beer Box Hill 지점에서 치킨과 한식 서비스를 함께할 팀원을 모집합니다.', ARRAY['홀 서빙', '치킨 조리', '주방 보조', '캐셔', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'samsamchicken' AND b.branch_name = 'Box Hill'
  UNION ALL SELECT b.*, 'Melbourne CBD', 'Bornga Melbourne점 홀/주방 직원 모집', 'Bornga Melbourne점', 'mbornga@gmail.com', 'Bornga Melbourne 지점에서 Korean BBQ 서비스를 함께할 홀/주방 팀원을 모집합니다.', ARRAY['홀 서빙', '그릴 서비스', '주방 보조', '고객응대', '위생관리'] FROM public.company_branches b WHERE b.company_slug = 'bornga' AND b.branch_name = 'Melbourne CBD'
) AS branch;
