
-- =====================
-- CONTACT 오류
-- =====================

-- ID 1044, 846: contact에 이메일이 들어감 → NULL (이메일만 있고 전화번호 없는 공고)
UPDATE jobs SET contact = NULL WHERE id IN (1044, 846);

-- ID 837: contact = "0" → NULL (설명에 전화번호 없음)
UPDATE jobs SET contact = NULL WHERE id = 837;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 1042: email = "000" → NULL (설명에 이메일 없음)
UPDATE jobs SET email = NULL WHERE id = 1042;

-- ID 607: email "alstkdzz26.gmail.com" → "@" 빠진 오타 → 수정
UPDATE jobs SET email = 'alstkdzz26@gmail.com' WHERE id = 607;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 1097: "노던 비치스" (오타) → "노던 비치"
UPDATE jobs SET location = '{"노던 비치"}' WHERE id = 1097;

-- ID 1093: "시드니" → "실버워터" (주소: Vore St, Silverwater 명시)
UPDATE jobs SET location = '{"실버워터"}' WHERE id = 1093;

-- ID 1076: location ["로즈랜드","로즈"] → 로즈랜드만 (주소: Roselands Shopping Centre)
UPDATE jobs SET location = '{"로즈랜드"}' WHERE id = 1076;

-- ID 449: "스카트필드" → "스코필드" (Schofields)
UPDATE jobs SET location = '{"스코필드"}' WHERE id = 449;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 1076: 분식점은 유통/판매업이 아닌 요식업
UPDATE jobs SET industry = '요식업' WHERE id = 1076;

-- ID 1062: 타이어/정비 → 제조/기술업 (물류/운송업이 아님)
UPDATE jobs SET industry = '제조/기술업' WHERE id = 1062;

-- ID 1063: 웨어하우스 관리 → 물류/운송업 (건설 자재지만 역할은 물류)
UPDATE jobs SET industry = '물류/운송업' WHERE id = 1063;

-- ID 1055: 공장 구인 → 제조/기술업 (기타가 아님)
UPDATE jobs SET industry = '제조/기술업' WHERE id = 1055;

-- ID 1088: 웨어하우스/딜리버리 → 물류/운송업 (건설/시공업이 아님)
UPDATE jobs SET industry = '물류/운송업' WHERE id = 1088;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 1101: "시드니 시드니 CBD" 중복
UPDATE jobs SET google_search = 'convenience store bottle shop 시드니 CBD' WHERE id = 1101;

-- ID 1097: "노던비치 노던비치 노던 비치스" 중복/오타
UPDATE jobs SET google_search = '스시숍 노던 비치' WHERE id = 1097;

-- ID 1093: "■■■" 특수문자 포함 → 정리
UPDATE jobs SET google_search = '시드니 본오피스 Admin 실버워터' WHERE id = 1093;

-- ID 1092: "■■■" 특수문자 포함 → 정리
UPDATE jobs SET google_search = '회계 인턴 실버워터' WHERE id = 1092;

-- ID 1084: "카페 스틴레어즈 세인트 레오나즈" 오타
UPDATE jobs SET google_search = '카페 세인트 레오나즈' WHERE id = 1084;

-- ID 1060: "카링포드 칼링포드" 중복/오타
UPDATE jobs SET google_search = 'skin clinic 칼링포드' WHERE id = 1060;

-- ID 1048: "kimsunyoung 시드니 시드니 CBD" 중복
UPDATE jobs SET google_search = '김선영 미용실 월드스퀘어 시드니 CBD' WHERE id = 1048;

-- ID 1052: "스탠호프 가든 스탠호프 가든스" 중복
UPDATE jobs SET google_search = 'Hato Sushi 스탠호프 가든스' WHERE id = 1052;
;
