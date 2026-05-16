
-- =====================
-- CONTACT 오류
-- =====================

-- ID 189: 설명에 0406574030 명시
UPDATE jobs SET contact = '0406574030' WHERE id = 189;

-- ID 247: 설명에 0452644119 명시
UPDATE jobs SET contact = '0452644119' WHERE id = 247;

-- ID 890: 설명에 0406574030 명시
UPDATE jobs SET contact = '0406574030' WHERE id = 890;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 247: 설명에 yeongminseo@gmail.com 명시
UPDATE jobs SET email = 'yeongminseo@gmail.com' WHERE id = 247;

-- ID 903: "000" 은 이메일이 아님
UPDATE jobs SET email = NULL WHERE id = 903;

-- ID 889: 설명에 Girraween.mgmt1@tilemarket.com.au 명시
UPDATE jobs SET email = 'Girraween.mgmt1@tilemarket.com.au' WHERE id = 889;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 170, 215: "라이드" → "매릭빌" (설명에 Top Ryde 또는 Marrickville)
UPDATE jobs SET location = '{"탑라이드","매릭빌"}' WHERE id IN (170, 215);

-- ID 175: 차이나타운 → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 175;

-- ID 197: 차이나타운 → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 197;

-- ID 225: 본다이 → 본다이 정션 (주소: 106 Ebley St, Bondi Junction)
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 225;

-- ID 231: 울티모 → 헤이마켓 (주소: 37 Ultimo Rd Haymarket)
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 231;

-- ID 239: 시드니 → 헤이마켓 (주소: 21/1 Dixon St)
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 239;

-- ID 240: 차이나타운 → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 240;

-- ID 245: 채스우드/라이드 → 이스트우드/라이드 (East Ryde 카페)
UPDATE jobs SET location = '{"이스트우드","라이드"}' WHERE id = 245;

-- ID 256: 본다이 → 워링가 (설명에 Warringah Mall 언급)
UPDATE jobs SET location = '{"본다이 정션","워링가"}' WHERE id = 256;

-- ID 283: 빈값 → 어밍톤 (설명에 "어밍톤 삼시세끼" 명시)
UPDATE jobs SET location = '{"어밍톤"}' WHERE id = 283;

-- ID 287: 빈값 → 리버우드 (설명에 "리버우드 홈살롱" 명시)
UPDATE jobs SET location = '{"리버우드"}' WHERE id = 287;

-- ID 519: 큐 제거 (주소: Carnegie만 해당)
UPDATE jobs SET location = '{"카네기"}' WHERE id = 519;

-- ID 524, 523: "우드 이스트" → "버우드 이스트"
UPDATE jobs SET location = '{"버우드 이스트"}' WHERE id IN (523, 524);

-- ID 515: 시드니 제거 (Dandenong South 웨어하우스가 근무지)
UPDATE jobs SET location = '{"댄드농"}' WHERE id = 515;

-- ID 900: 스트라스필드 → 쿠지/랜드윅/본다이 (설명에 Eastern Suburbs 명시)
UPDATE jobs SET location = '{"쿠지","랜드윅","본다이"}' WHERE id = 900;

-- ID 877: 리버풀/홈부시 → 스트라스필드/리드컴 (픽업 장소 오추출)
UPDATE jobs SET location = '{"스트라스필드","리드컴"}' WHERE id = 877;

-- ID 869: 리버풀 → 시드니 CBD (Liverpool St = 시티 거리명)
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 869;

-- ID 862: 엔스더우(garbled) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 862;

-- ID 850: 시드니 → 스트라스필드 (주소: Strathfield Plaza)
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 850;

-- =====================
-- INDUSTRY 오류
-- =====================

-- 비표준 카테고리 → 표준 10개로 통일
UPDATE jobs SET industry = '청소/환경미화업' WHERE industry IN (
  '청소/미화 서비스', '청소 서비스', '청소/관리 서비스', '청소/미화',
  '청소 및 운전 보조', '청소/생활지원 서비스', '병원 청소',
  '청소/세탁 서비스', '청소/가사도우미', '청소/가사 서비스',
  '청소/미화 서비스업', '청소/청소 용역업', '청소/환경관리'
);

UPDATE jobs SET industry = '건설/시공업' WHERE industry IN (
  '건설/인테리어', '건축/인테리어', '타일 시공/건축', '타일/페이빙 시공',
  '타일/페이빙 시공 기술', '도장/페인팅 작업', '도장/페인팅 기술',
  '건설/건축', '건설/노무', '건설/목공', '건설/토목', '건설/설치업',
  '인테리어/건축 마감 공사', '건축자재/건설', '건축/인테리어 보조',
  '물류/건설', '석재 시공', '제조/건설', '현장 작업', '기술/건설',
  '건설자재/타일 판매 및 물류', '전기/태양광/소방 설비 공사',
  '목공/가구 제작', '타일 시공/인테리어'
);

UPDATE jobs SET industry = '미용/뷰티업' WHERE industry IN (
  '미용실', '미용/뷰티', '미용업', '미용/건강관리',
  '마사지 서비스업', '마사지샵', '마사지/건강관리', '물리치료/마사지',
  '미용/뷰티 서비스'
);

UPDATE jobs SET industry = '유통/판매업' WHERE industry IN (
  '식료품점', '마트/식료품', '편의점/주류 판매점', '통신/전자제품 판매',
  '쇼핑/의류 판매', '의류/패션', '자동차 부품 유통/판매',
  '자동차 부품 유통', '식자재 유통/도매', '유통/마트', '소매업', '유통업'
);

UPDATE jobs SET industry = '물류/운송업' WHERE industry IN (
  '물류/배송', '물류/창고 관리', '이사/운송', '물류/유통', '유통/물류'
);

UPDATE jobs SET industry = '제조/기술업' WHERE industry IN (
  '정육점/식품 가공', '육가공/식품 가공업', '육가공', '제조업', '산업/제조'
);

UPDATE jobs SET industry = '교육업' WHERE industry IN ('교육', '교육 서비스');

UPDATE jobs SET industry = '의료/복지서비스업' WHERE industry IN (
  '병원/의료', '의료기기/의료 영업', '치과', '설비/시설관리업'
);

UPDATE jobs SET industry = '기타' WHERE industry IN (
  '사무직', 'PC방/게임방', 'PC방/게임방', '농장/농업', '농업',
  '미상', '부동산업', '부동산'
);

UPDATE jobs SET industry = '요식업' WHERE industry IN (
  '음식점/유흥업', '판매/주점'
);

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 144: "스티브스" 오타
UPDATE jobs SET google_search = 'T/A 스시샵 213a Monavale rd 세인트 아이브스' WHERE id = 144;

-- ID 147: 비즈니스명 오류
UPDATE jobs SET google_search = 'Sushi Wow Sushi Train 뉴타운' WHERE id = 147;

-- ID 154: 중복 표기
UPDATE jobs SET google_search = '청소 용역업 스트라스필드' WHERE id = 154;

-- ID 165: 중복 표기
UPDATE jobs SET google_search = '일식레스토랑 킹스크로스' WHERE id = 165;

-- ID 170, 215: 지역 수정
UPDATE jobs SET google_search = '마사지사 탑라이드 또는 매릭빌' WHERE id IN (170, 215);

-- ID 174: Rhodes 아닌 Rosehill 사용
UPDATE jobs SET google_search = '한식 일식당 로즈' WHERE id = 174;

-- ID 175: 헤이마켓으로 통일
UPDATE jobs SET google_search = '광장포차 헤이마켓' WHERE id = 175;

-- ID 197: 헤이마켓으로 통일
UPDATE jobs SET google_search = '타이거 포차 헤이마켓' WHERE id = 197;

-- ID 204: 중복/오타
UPDATE jobs SET google_search = 'MIKAZUKI 스트라스필드' WHERE id = 204;

-- ID 225: 본다이 정션으로 수정
UPDATE jobs SET google_search = 'Tomo Ramen 본다이 정션' WHERE id = 225;

-- ID 231: 헤이마켓으로 수정
UPDATE jobs SET google_search = 'Coco Salon 37 Ultimo Rd 헤이마켓' WHERE id = 231;

-- ID 236: 중복/오타
UPDATE jobs SET google_search = '김밥 테이크어웨이 스트라스필드' WHERE id = 236;

-- ID 239: 헤이마켓으로 수정
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 21/1 Dixon St 헤이마켓' WHERE id = 239;

-- ID 240: 헤이마켓으로 수정
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 240;

-- ID 245: 지역 수정
UPDATE jobs SET google_search = '이스트 라이드 카페 라이드' WHERE id = 245;

-- ID 263: 리드컴으로 수정
UPDATE jobs SET google_search = '클리닉 리드컴' WHERE id = 263;

-- ID 281: 표기 통일
UPDATE jobs SET google_search = 'Kims Tiling Supplies 30B Legge St 로즈랜드' WHERE id = 281;

-- ID 288: 채스우드 → 피어몬트
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 288;

-- ID 293: 맥쿼리빌 오류
UPDATE jobs SET google_search = '마사지 업소 청소 매릭빌' WHERE id = 293;

-- ID 853: 비즈니스명 없음
UPDATE jobs SET google_search = 'PPROJECTS TILING 시드니' WHERE id = 853;

-- ID 868: 리드 오타
UPDATE jobs SET google_search = 'BBQ WANG 16 Church St 탑라이드' WHERE id = 868;

-- ID 876: 캐링포드 오타
UPDATE jobs SET google_search = '미용실 칼링포드' WHERE id = 876;

-- ID 896: 중복 표기
UPDATE jobs SET google_search = '홈청소 노던 비치' WHERE id = 896;
;
