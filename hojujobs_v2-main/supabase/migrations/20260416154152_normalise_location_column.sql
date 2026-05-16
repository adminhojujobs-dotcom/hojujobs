
-- 시드니 CBD/시티 통합
UPDATE jobs SET location = array_replace(location, '시드니', '시드니 CBD');
UPDATE jobs SET location = array_replace(location, '시드니 시티', '시드니 CBD');

-- 노스 쇼어 → 노스 시드니
UPDATE jobs SET location = array_replace(location, '노스 쇼어', '노스 시드니');

-- 오타 및 표기 수정
UPDATE jobs SET location = array_replace(location, '하임아켓', '헤이마켓');
UPDATE jobs SET location = array_replace(location, '뉴잉톤', '뉴잉턴');
UPDATE jobs SET location = array_replace(location, '채스우드', '체스우드');

-- 차이나타운 → 헤이마켓 (지리적으로 동일 구역)
UPDATE jobs SET location = array_replace(location, '차이나타운', '헤이마켓');
;
