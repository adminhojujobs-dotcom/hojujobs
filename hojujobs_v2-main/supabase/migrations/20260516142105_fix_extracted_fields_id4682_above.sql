
-- =====================
-- CONTACT 오류
-- =====================

-- ID 4763: email "w84998214@gmail.com" → 설명에 "borngasydney@gmail.com" 명시 → fix
UPDATE jobs SET email = 'borngasydney@gmail.com' WHERE id = 4763;

-- ID 4733: email "ksusan2122@gmail.com" → 설명에 "sungun4729@gmail.com" 명시
UPDATE jobs SET email = 'sungun4729@gmail.com' WHERE id = 4733;

-- ID 4817: email "dulwichhill@tilemarket.com" → TLD 잘림 → "dulwichhill@tilemarket.com.au"
UPDATE jobs SET email = 'dulwichhill@tilemarket.com.au' WHERE id = 4817;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 4692: location [] → 설명에 "st leonards 역 도보 10분거리" → 세인트 레오나즈
UPDATE jobs SET location = '{"세인트 레오나즈"}' WHERE id = 4692;
UPDATE jobs SET google_search = '웨어하우스 보조 세인트 레오나즈' WHERE id = 4692;

-- ID 4704: google_search "Bunsik 로즈워터사이드 로즈" → 중복
UPDATE jobs SET google_search = 'Bunsik Rhodes 로즈' WHERE id = 4704;

-- ID 4707: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4707;
UPDATE jobs SET google_search = '청소 슈퍼바이저 시드니' WHERE id = 4707;

-- ID 4708: google_search "BBQ WANG 탑 탑라이드" → "탑" 중복
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 4708;

-- ID 4709: google_search "식당 리드컴" → 업체명 추가
UPDATE jobs SET google_search = '미라네 포차 리드컴' WHERE id = 4709;

-- ID 4713: location [] → 로즈 픽업, 현장 불명 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4713;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 4713;

-- ID 4721: google_search "KMALL09 리드컴쇼핑센터점 리드컴" → 중복
UPDATE jobs SET google_search = 'KMALL09 리드컴' WHERE id = 4721;

-- ID 4728: location ["글레이즈빌","라이드","드러모인"] → 실제 근무지는 드러모인
-- (글레이즈빌/라이드/드러모인 언급됐지만 주소는 드러모인)
UPDATE jobs SET location = '{"드러모인"}' WHERE id = 4728;
UPDATE jobs SET google_search = '일식당 드러모인' WHERE id = 4728;

-- ID 4730: location ["이스터른 서브어브"] → "이스터른 서브어브" 는 지역이 아닌 광역 개념
-- 설명에 "Bondi / Coogee / Randwick" 명시
UPDATE jobs SET location = '{"본다이","쿠지","랜드윅"}' WHERE id = 4730;
UPDATE jobs SET google_search = '홈청소 본다이 쿠지 랜드윅' WHERE id = 4730;

-- ID 4731: location ["리드컴","세븐 힐스"] → 설명에 "Seven Hills" 명시 (리드컴은 픽업)
UPDATE jobs SET location = '{"세븐 힐스"}' WHERE id = 4731;
UPDATE jobs SET google_search = 'Akira sushi 세븐 힐스' WHERE id = 4731;

-- ID 4738: location [] → "스트라 플라자" = 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 4738;
UPDATE jobs SET google_search = '뷰티 샵인샵 스트라스필드' WHERE id = 4738;

-- ID 4746: location [] → 설명에 "서리힐" 명시 → 서리 힐스
UPDATE jobs SET location = '{"서리 힐스"}' WHERE id = 4746;
UPDATE jobs SET google_search = '브런치 카페 서리 힐스' WHERE id = 4746;

-- ID 4747: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4747;
UPDATE jobs SET google_search = 'Kobalt ENC HR 인턴 시드니' WHERE id = 4747;

-- ID 4758: location [] → 설명에 "마틴 플레이스 역" → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 4758;
UPDATE jobs SET google_search = '그라우트 데모도 시드니 CBD' WHERE id = 4758;

-- ID 4766: location [] → 타일팀, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4766;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 4766;

-- ID 4777: google_search "Sparrow s Mill Express 헤이마켓 시드니 CBD" → 중복
UPDATE jobs SET google_search = 'Sparrow''s Mill Express 헤이마켓' WHERE id = 4777;

-- ID 4778: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4778;
UPDATE jobs SET google_search = 'Restaurant Toki 페이스트리 쉐프 시드니' WHERE id = 4778;

-- ID 4782: location [] → suburb 없음 (시드니+멜버른)
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4782;
UPDATE jobs SET google_search = '회계법인 마케팅 시드니' WHERE id = 4782;

-- ID 4788: location [] → 실비집, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4788;
UPDATE jobs SET google_search = '실비집 시드니' WHERE id = 4788;

-- ID 4800: location [] → 에이원택배, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4800;
UPDATE jobs SET google_search = '에이원택배 파트타임 시드니' WHERE id = 4800;

-- ID 4804: location [] → 타일/페이빙, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4804;
UPDATE jobs SET google_search = '타일 페이빙 기술자 시드니' WHERE id = 4804;

-- ID 4813: location ["애들레이드"] → 설명에 NSW,VIC,TAS,WA 여러 지역 → 잘못됨
-- 주요 NSW 육가공 공장 → 시드니 인근 (골번 Goulburn) + 여러 주
UPDATE jobs SET location = '{"굴번","멜버른","론서스턴"}' WHERE id = 4813;
UPDATE jobs SET google_search = 'AK Workforce 육가공 굴번' WHERE id = 4813;

-- ID 4815: location [] → suburb 없음 (타일 웨어하우스) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4815;
UPDATE jobs SET google_search = 'SP Tiling 웨어하우스 시드니' WHERE id = 4815;

-- ID 4821: location [] → 부동산, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4821;

-- ID 4826: google_search "SUSHIA Lavington 라빙턴 래빙턴" → 중복 (라빙턴=래빙턴)
UPDATE jobs SET google_search = 'SUSHIA Lavington 래빙턴' WHERE id = 4826;

-- ID 4829: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4829;
UPDATE jobs SET google_search = '헤어드레서 디자이너 시드니' WHERE id = 4829;

-- ID 4833: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4833;
UPDATE jobs SET google_search = 'KOBAB 식당 시드니' WHERE id = 4833;

-- ID 4834: google_search "BBQ LAB 글랜웨이벌리 글렌 웨이벌리" → 중복/오타
UPDATE jobs SET google_search = 'BBQ LAB 글렌 웨이벌리' WHERE id = 4834;

-- ID 4837: location [] → 설명에 "Steakhousegrill66 199 william st" = 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 4837;
UPDATE jobs SET google_search = 'Steakhouse Grill 66 시드니 CBD' WHERE id = 4837;

-- ID 4847: location [] → 인생네컷, suburb 없음 (차이나타운=헤이마켓)
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 4847;
UPDATE jobs SET google_search = '인생네컷 헤이마켓' WHERE id = 4847;

-- ID 4848: location ["멜버른 CBD"] → 설명에 "Collins St Melbourne" → 맞음 ✅
-- google_search "시티 LOA 헤어살롱 멜버른 CBD" → "시티" 중복
UPDATE jobs SET google_search = 'LOA Hair Salon 멜버른 CBD' WHERE id = 4848;

-- ID 4850: location [] → 재택근무, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4850;

-- ID 4852: location ["채드스톤","오피서"] → 오피서는 잘못됨 (채드스톤이 맞음)
UPDATE jobs SET location = '{"채드스톤"}' WHERE id = 4852;
UPDATE jobs SET google_search = '하나로마트 채드스톤' WHERE id = 4852;

-- ID 4860: location [] → Woolgoolga → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 4860;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 4860;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 4753: SUSHIA Bathurst → 요식업 (기타 아님)
UPDATE jobs SET industry = '요식업' WHERE id = 4753;

-- ID 4798: iae글로벌 유학 유학상담원 → 교육업 (기타 아님)
UPDATE jobs SET industry = '교육업' WHERE id = 4798;
;
