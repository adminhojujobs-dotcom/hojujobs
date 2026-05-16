
-- 외식/식음료업
UPDATE jobs SET industry = '외식/식음료업'
WHERE industry IN ('요식업', '음식점/유흥업', '판매/주점');

-- 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업'
WHERE industry IN ('청소 서비스', '청소', '청소/미화', '청소/서비스', '청소/시설 관리', '청소/가사 서비스', '청소/미화 서비스', '청소/청소 용역', '청소업', '청소 서비스업', '청소/가사', '청소 및 운전 보조', '청소/건설 보조');

-- 건설/시공업
UPDATE jobs SET industry = '건설/시공업'
WHERE industry IN ('건설/인테리어', '건축/인테리어', '인테리어/건축', '건축자재/건설', '타일 시공/건축', '도장/페인팅 기술', '석재 시공', '제조/건설', '현장 작업');

-- 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업'
WHERE industry IN ('미용실', '미용업', '미용/뷰티', '마사지 업소', '마사지/건강관리', '물리치료/마사지');

-- 유통/판매업
UPDATE jobs SET industry = '유통/판매업'
WHERE industry IN ('쇼핑/유통', '식자재 유통', '유통업', '소매업', '담배 판매점', '정육점', '전자제품 수리 및 액세서리 판매');

-- 물류/운송업
UPDATE jobs SET industry = '물류/운송업'
WHERE industry IN ('물류/창고 관리', '물류/배송 및 관리직', '이사/물류', '식품 유통/물류', '물류/유통');

-- 제조/기술업
UPDATE jobs SET industry = '제조/기술업'
WHERE industry IN ('제조업', '산업/제조', '육가공업', '자동차 부품', '자동차 부품 유통', '자동차 정비');

-- 교육업
UPDATE jobs SET industry = '교육업'
WHERE industry = '교육';

-- 의료/복지서비스업
UPDATE jobs SET industry = '의료/복지서비스업'
WHERE industry IN ('치과', '병원/의료', '의료기기/의료 영업');

-- 설비/시설관리업
UPDATE jobs SET industry = '설비/시설관리업'
WHERE industry IN ('전기/태양광/소방 설비', '시설 관리');

-- 기타
UPDATE jobs SET industry = '기타'
WHERE industry IN ('사무직', '금융', '부동산업', '농업', 'PC방', '미상', '');
;
