
-- =====================
-- CONTACT 오류
-- =====================
UPDATE jobs SET contact = NULL WHERE id IN (1044, 846);
UPDATE jobs SET contact = NULL WHERE id = 837;

-- =====================
-- EMAIL 오류
-- =====================
UPDATE jobs SET email = NULL WHERE id = 1042;
UPDATE jobs SET email = 'alstkdzz26@gmail.com' WHERE id = 607;

-- =====================
-- LOCATION 오류
-- =====================
UPDATE jobs SET location = '{"노던 비치"}' WHERE id = 1097;
UPDATE jobs SET location = '{"실버워터"}' WHERE id = 1093;
UPDATE jobs SET location = '{"로즈랜드"}' WHERE id = 1076;
UPDATE jobs SET location = array_replace(location, '스카트필드', '스코필드') WHERE '스카트필드' = ANY(location);

-- =====================
-- INDUSTRY 오류
-- =====================
UPDATE jobs SET industry = '요식업' WHERE id = 1076;
UPDATE jobs SET industry = '제조/기술업' WHERE id = 1062;
UPDATE jobs SET industry = '물류/운송업' WHERE id = 1063;
UPDATE jobs SET industry = '제조/기술업' WHERE id = 1055;
UPDATE jobs SET industry = '물류/운송업' WHERE id = 1088;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================
UPDATE jobs SET google_search = 'convenience store bottle shop 시드니 CBD' WHERE id = 1101;
UPDATE jobs SET google_search = '스시숍 노던 비치' WHERE id = 1097;
UPDATE jobs SET google_search = '시드니 본오피스 Admin 실버워터' WHERE id = 1093;
UPDATE jobs SET google_search = '회계 인턴 실버워터' WHERE id = 1092;
UPDATE jobs SET google_search = '카페 세인트 레오나즈' WHERE id = 1084;
UPDATE jobs SET google_search = 'skin clinic 칼링포드' WHERE id = 1060;
UPDATE jobs SET google_search = '김선영 미용실 월드스퀘어 시드니 CBD' WHERE id = 1048;
UPDATE jobs SET google_search = 'Hato Sushi 스탠호프 가든스' WHERE id = 1052;
;
