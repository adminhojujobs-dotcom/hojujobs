
-- ===== INDUSTRY =====

-- 청소 관련 통합
UPDATE jobs SET industry = '청소업'
WHERE industry IN ('청소 서비스', '청소/미화', '청소업', '청소 서비스업', '청소/환경관리', '청소/환경미화', '청소/시설 관리', '청소/청소 용역');

-- 건설/인테리어 통합
UPDATE jobs SET industry = '건설/인테리어'
WHERE industry IN ('건설/인테리어', '건축/인테리어', '타일 시공/인테리어', '도장/페인팅 작업');

-- 미용 통합
UPDATE jobs SET industry = '미용/뷰티'
WHERE industry IN ('미용실', '미용/건강관리');

-- 유통/판매 통합
UPDATE jobs SET industry = '유통/판매'
WHERE industry IN ('식품점/소매업', '쇼핑몰/판매직', '식자재 유통/도매', '식자재 유통', '식품점');

-- 배관 정규화
UPDATE jobs SET industry = '배관/설비'
WHERE industry = '배관 설비';

-- 미상 → 기타
UPDATE jobs SET industry = '기타'
WHERE industry = '미상';

-- ===== LOCATION =====

-- 시드니 CBD/시티 통합
UPDATE jobs SET location = array_replace(location, '시드니', '시드니 CBD');
UPDATE jobs SET location = array_replace(location, '시드니 시티', '시드니 CBD');

-- 노스 쇼어 → 노스 시드니
UPDATE jobs SET location = array_replace(location, '노스 쇼어', '노스 시드니');

-- 오타 및 표기 수정
UPDATE jobs SET location = array_replace(location, '하임아켓', '헤이마켓');
UPDATE jobs SET location = array_replace(location, '뉴잉톤', '뉴잉턴');
UPDATE jobs SET location = array_replace(location, '채스우드', '체스우드');

-- 차이나타운 → 헤이마켓
UPDATE jobs SET location = array_replace(location, '차이나타운', '헤이마켓');
;
