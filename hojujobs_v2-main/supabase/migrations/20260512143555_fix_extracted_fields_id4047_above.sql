
-- =====================
-- LOCATION 오류
-- =====================

-- ID 4124: location [] → 픽업은 로즈, 실제 현장 불명 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4124;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 4124;

-- ID 4208: location [] → 리드컴 픽업장소, 실제 현장 불명 → 시드니
-- industry "기타" → 건설/시공업 (대모도=데모도)
UPDATE jobs SET location = '{"시드니"}', industry = '건설/시공업' WHERE id = 4208;
UPDATE jobs SET google_search = '대모도 건설 시드니' WHERE id = 4208;

-- ID 4284: location [] → 설명에 "Chowon – kew, Melbourne" 명시 → 큐
UPDATE jobs SET location = '{"큐"}' WHERE id = 4284;
UPDATE jobs SET google_search = 'Chowon Japanese Dining 큐' WHERE id = 4284;

-- ID 4285: location [] → 설명에 "Chowon – kew, Melbourne" 명시 → 큐
UPDATE jobs SET location = '{"큐"}' WHERE id = 4285;
UPDATE jobs SET google_search = 'Chowon Japanese Dining 큐' WHERE id = 4285;

-- ID 4293: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
-- google_search "농장 Woolgoolga 울굴가" → 중복/영한혼용
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 4293;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 4293;
;
