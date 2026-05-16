
-- =====================
-- CONTACT 오류
-- =====================

-- ID 4297: contact 있음 ✅, location [] → 모나베일 픽업, 워리우드 픽업 → 노던 비치 지역
UPDATE jobs SET location = '{"노던 비치"}' WHERE id = 4297;
UPDATE jobs SET google_search = '홈청소 노던 비치' WHERE id = 4297;

-- ID 4316: contact NULL → 설명에 "+61 423693080" → 0423693080
UPDATE jobs SET contact = '0423693080' WHERE id = 4316;

-- ID 4371: contact NULL → 설명에 "422707880" (9자리, 앞 0 누락) → 0422707880
UPDATE jobs SET contact = '0422707880' WHERE id = 4371;

-- ID 4400: contact "0423843881" → 설명에 첫번째 번호 "0404194559" 먼저 나옴 → fix
UPDATE jobs SET contact = '0404194559' WHERE id = 4400;

-- ID 4441: google_search "AVEDA salon Gaia Hair Beauty 모스만 모즈먼" → 중복
UPDATE jobs SET google_search = 'Gaia Hair Beauty AVEDA 모즈먼' WHERE id = 4441;

-- ID 4450: contact "0426561004" → 설명에 "0410 131 223" 명시 → fix
UPDATE jobs SET contact = '0410131223' WHERE id = 4450;

-- ID 4471: contact "0422290461" → 설명에 "0424 289 700" 명시 → fix
UPDATE jobs SET contact = '0424289700' WHERE id = 4471;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 4354: email "ksusan2122@gmail.com" → 설명에 "sungun4729@gmail.com" 명시
UPDATE jobs SET email = 'sungun4729@gmail.com' WHERE id = 4354;

-- ID 4401: email "dulwichhill@tilemarket.com" → TLD 잘림 → "dulwichhill@tilemarket.com.au"
UPDATE jobs SET email = 'dulwichhill@tilemarket.com.au' WHERE id = 4401;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 4298: location ["혼스비","로즈"] → 멜로즈파크와 혼스비 두 지점 → 멜로즈 파크 추가, 로즈 제거
UPDATE jobs SET location = '{"혼스비","멜로즈 파크"}' WHERE id = 4298;
UPDATE jobs SET google_search = 'Hopi hair design 혼스비 멜로즈 파크' WHERE id = 4298;

-- ID 4299: location ["브로드웨이","채스우드","로즈"] → 실제로 시티/버우드/로즈/채스우드/브로드웨이 5개 지점
UPDATE jobs SET location = '{"시드니 CBD","버우드","로즈","채스우드","브로드웨이"}' WHERE id = 4299;

-- ID 4302: location [] → 이벤트/미팅 공고, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4302;

-- ID 4303: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4303;
UPDATE jobs SET google_search = '미장 기술자 시드니' WHERE id = 4303;

-- ID 4310: google_search "참새방앗간 익스프레스 헤이마켓 시드니 CBD" → 헤이마켓=시드니CBD 중복
UPDATE jobs SET google_search = 'Sparrow''s Mill Express 헤이마켓' WHERE id = 4310;

-- ID 4317: google_search "한상 점 헤이마켓 시드니 CBD" → 중복 + "점" 어색
UPDATE jobs SET google_search = '한상 한식당 헤이마켓' WHERE id = 4317;

-- ID 4318: google_search "진선미 헤어 타운홀 시드니 CBD" → 타운홀=시드니CBD 중복
UPDATE jobs SET google_search = '진선미 헤어 시드니 CBD' WHERE id = 4318;

-- ID 4320: location ["시드니"] → 설명에 "라우즈힐, 캠벨타운" 두 지점 명시
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 4320;
UPDATE jobs SET google_search = 'Sushi Densha 라우스 힐 캠벨타운' WHERE id = 4320;

-- ID 4331: location ["채스우드","린필드"] → 웨스트린필드 카페, 채스우드=통근 언급
UPDATE jobs SET location = '{"린필드"}' WHERE id = 4331;
UPDATE jobs SET google_search = '바리스타 로컬 카페 린필드' WHERE id = 4331;

-- ID 4332: google_search "BBQ WANG 탑 탑라이드" → "탑" 중복
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 4332;

-- ID 4335: location ["리드컴"] → 근무지는 뱅크스타운 (Little Saigon Plaza), 리드컴은 거리 언급
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 4335;
UPDATE jobs SET google_search = 'KMALL09 뱅크스타운' WHERE id = 4335;

-- ID 4367: location ["시드니 CBD"] → 설명에 "Neutral Bay, 81 Military Rd" 명시 → 뉴트럴 베이
UPDATE jobs SET location = '{"뉴트럴 베이"}' WHERE id = 4367;
UPDATE jobs SET google_search = 'MoguMogu 일식당 뉴트럴 베이' WHERE id = 4367;

-- ID 4384: google_search "노스스타라 종로화로 노스 스트라스필드" → "노스스타라" 잘못됨
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 4384;

-- ID 4390: google_search "시드니" → 너무 일반적
UPDATE jobs SET google_search = '코코스유학원 시드니' WHERE id = 4390;

-- ID 4397: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4397;
UPDATE jobs SET google_search = '회계법인 마케팅 시드니' WHERE id = 4397;

-- ID 4409: google_search "포크리프트 작업 뉴캐슬 근교 뉴카슬" → 중복
UPDATE jobs SET google_search = '포크리프트 작업 뉴카슬' WHERE id = 4409;

-- ID 4443: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4443;
UPDATE jobs SET google_search = 'SOLUTIONWIDE 배송 시드니' WHERE id = 4443;

-- ID 4461: google_search "Cafe Fran Rafi Oatlands 오트랜드스 오트랜즈" → 중복
UPDATE jobs SET google_search = 'Cafe Fran Rafi 오트랜즈' WHERE id = 4461;

-- ID 4489, 4490: location [] → 설명에 "시티점" 명시 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id IN (4489, 4490);
UPDATE jobs SET google_search = '이선생 국밥 시드니 CBD' WHERE id IN (4489, 4490);

-- ID 4503: location [] → 설명에 "시티에 위치한" 명시 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 4503;
UPDATE jobs SET google_search = 'LOA Hair 시드니 CBD' WHERE id = 4503;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 4328, 4330: 한식당 컨설팅 서비스 → 기타 (요식업 아님, 고용 공고 아닌 서비스)
UPDATE jobs SET industry = '기타' WHERE id IN (4328, 4330);

-- ID 4390: 유학원 컨설팅/세일즈 → 교육업 (기타 아님)
UPDATE jobs SET industry = '교육업' WHERE id = 4390;

-- ID 4441: AVEDA hair salon → 미용/뷰티업 맞음 ✅

-- ID 4476: 농장 → 기타 맞음 ✅
;
