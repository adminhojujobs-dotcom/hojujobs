
-- 외식/식음료업
UPDATE jobs SET industry = '외식/식음료업'
WHERE industry = '요식업';

-- 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업'
WHERE industry IN ('미용실', '미용/뷰티', '마사지 서비스업', '마사지샵');

-- 건설/시공업
UPDATE jobs SET industry = '건설/시공업'
WHERE industry IN ('건설/건축', '건설/노무', '건축/인테리어');

-- 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업'
WHERE industry IN ('청소/생활지원 서비스', '가사 서비스');

-- 유통/판매업
UPDATE jobs SET industry = '유통/판매업'
WHERE industry IN ('유통/마트', '소매업', '자동차 부품 유통/판매');

-- 설비/시설관리업
UPDATE jobs SET industry = '설비/시설관리업'
WHERE industry = '설치/유지보수';

-- 제조/기술업
UPDATE jobs SET industry = '제조/기술업'
WHERE industry = '육가공';

-- 교육업
UPDATE jobs SET industry = '교육업'
WHERE industry = '교육';

-- 기타
UPDATE jobs SET industry = '기타'
WHERE industry IN ('회계/세무', '마케팅/예술', '촬영 코디네이터/현지 촬영 지원', '여행업', '');
;
