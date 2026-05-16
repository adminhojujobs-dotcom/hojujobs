
-- =====================
-- CONTACT 오류 (설명에 없는 번호 → 설명에서 맞는 번호로 교체)
-- =====================

-- ID 3087: email typo "alaphatilingact" → "alphatilingact"
UPDATE jobs SET email = 'rex@alphatilingact.com.au' WHERE id = 3087;

-- ID 3114: contact "0414223700" → 설명에 "0403139852" 명시
UPDATE jobs SET contact = '0403139852' WHERE id = 3114;

-- ID 3140: contact "0297486963" → 설명에 "0450540317" 명시
UPDATE jobs SET contact = '0450540317' WHERE id = 3140;

-- ID 3175: email "dulwichhill@tilemarket.com" → "dulwichhill@tilemarket.com.au" (TLD 잘림)
UPDATE jobs SET email = 'dulwichhill@tilemarket.com.au' WHERE id = 3175;

-- ID 3227: email "ksusan2122@gmail.com" → 설명에 "sungun4729@gmail.com" 명시
UPDATE jobs SET email = 'sungun4729@gmail.com' WHERE id = 3227;

-- ID 3231: contact "0432552290" → 설명에 "0432552289" 명시 (오타)
UPDATE jobs SET contact = '0432552289' WHERE id = 3231;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 3064: location [] → 설명에 "트리니티 치과" (연락처만 있고 suburb 없음) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3064;
UPDATE jobs SET google_search = '트리니티 치과 시드니' WHERE id = 3064;

-- ID 3083: location ["본다이"] → 설명에 "106 Ebley St, Bondi Junction" 명시 → 본다이 정션
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 3083;
UPDATE jobs SET google_search = '토모 라멘 본다이 정션' WHERE id = 3083;

-- ID 3086: location ["시드니"] → 설명에 "GOMAPS Trading" 시드니 광역 물류 → 시드니 맞음 ✅
-- industry "유통/판매업" → 물류/운송업 (창고+딜리버리)
UPDATE jobs SET industry = '물류/운송업' WHERE id = 3086;

-- ID 3094: location [] → 설명에 "로즈" 픽업 언급 → 시드니 (픽업만 로즈, 실제 현장은 불명)
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3094;
UPDATE jobs SET google_search = '타일 기술자 시드니' WHERE id = 3094;

-- ID 3121: location [] → 설명에 "Chullora" 주소 명시 → 출로라
UPDATE jobs SET location = '{"출로라"}' WHERE id = 3121;
UPDATE jobs SET google_search = '아라멕스 택배 출로라' WHERE id = 3121;

-- ID 3125: google_search "고기부페 글레이즈빌 브로드웨이" → 글레이즈빌 잘못됨 (설명에 글리브/브로드웨이)
UPDATE jobs SET google_search = '고기부페 글리브 브로드웨이' WHERE id = 3125;

-- ID 3154: google_search "스시숍 노던비치 노던 비치스 노던 비치" 중복
-- 설명에 "노던비치 프렌치 포레스트" → 포레스트빌이 더 정확
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id = 3154;
UPDATE jobs SET google_search = '스시숍 포레스트빌' WHERE id = 3154;

-- ID 3156: google_search "노던비치 스시숍 노던 비치스 노던 비치" 중복
UPDATE jobs SET google_search = '스시숍 노던 비치' WHERE id = 3156;

-- ID 3181: google_search "Rokyo Sushi Bar 캐슬힐 카슬힐" 중복
UPDATE jobs SET google_search = 'Rokyo Sushi Bar 카슬힐' WHERE id = 3181;

-- ID 3182: google_search "Rokyo Sushi Bar 캐슬힐 카슬힐" 중복
UPDATE jobs SET google_search = 'Rokyo Sushi Bar 카슬힐' WHERE id = 3182;

-- ID 3183: location ["뉴포트"] → google_search "일식 핫푸드 레스토랑 노던비치 뉴포트" → 노던비치 중복
UPDATE jobs SET google_search = '스시소라 일식 핫푸드 뉴포트' WHERE id = 3183;

-- ID 3189: location ["시드니"] → 설명에 "주소: Rydalmere" (김방앗간) → 리달미어
UPDATE jobs SET location = '{"리달미어"}' WHERE id = 3189;
UPDATE jobs SET google_search = '김방앗간 두부팀 리달미어' WHERE id = 3189;

-- ID 3194: location [] → 설명에 "이스트우드,에핑 픽업" → 픽업 장소, 현장은 "Zerland쪽" = 제틀랜드
UPDATE jobs SET location = '{"제틀랜드"}' WHERE id = 3194;
UPDATE jobs SET google_search = '타일 서포트 제틀랜드' WHERE id = 3194;

-- ID 3231: location ["시드니"] → 설명에 "Australian College of Professional Careers" (Rhodes) → 로즈
UPDATE jobs SET location = '{"로즈"}' WHERE id = 3231;
UPDATE jobs SET google_search = '시드니 컬리지 인턴십 로즈' WHERE id = 3231;

-- ID 3246: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3246;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 3246;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 3075: "제페니즈 TE 레스토랑 Wentworth Point 웬트워스 포인트" 중복/영한혼용
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 3075;

-- ID 3095: google_search NULL → 청소업체 suburb 없음
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 3095;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3095;

-- ID 3102: google_search "미장 데모도" → suburb 없음
UPDATE jobs SET google_search = '미장 데모도 시드니' WHERE id = 3102;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3102;

-- ID 3163: google_search "청소" → 너무 일반적
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 3163;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3163;

-- ID 3178: location ["채스우드","린필드"] → 설명에 "웨스트린필드" 명시 → 린필드만
UPDATE jobs SET location = '{"린필드"}' WHERE id = 3178;
UPDATE jobs SET google_search = '바리스타 로컬 카페 린필드' WHERE id = 3178;

-- ID 3190: google_search "타일 데모도" → suburb 없음
UPDATE jobs SET google_search = '타일 데모도 시드니' WHERE id = 3190;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3190;

-- ID 3194: already fixed above

-- ID 3195: google_search "타일 데모도 기술자" → suburb 없음
UPDATE jobs SET google_search = '타일 데모도 기술자 시드니' WHERE id = 3195;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3195;

-- ID 3210: google_search "일식 T/A판매 및 서빙" → suburb 없음
UPDATE jobs SET google_search = '일식 T/A 스시 시드니' WHERE id = 3210;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3210;

-- ID 3231: google_search "시드니" → 너무 일반적 (already fixed above)

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 3145: 헬스장 스태프 → 기타 맞음 ✅
-- ID 3086: 창고+딜리버리 → 물류/운송업 (유통/판매업에서 변경, already above)
;
