
-- 건설/시공업
UPDATE jobs SET industry = '건설/시공업'
WHERE industry IN ('건설/인테리어', '건축/인테리어', '건설업', '건설/목공', '타일/페이빙 시공', '타일 시공/건축', '건설자재/타일 판매 및 물류', '인테리어/건축 마감 공사', '건축/인테리어 보조', '물류/건설');

-- 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업'
WHERE industry IN ('청소/미화', '청소 서비스', '청소 서비스업', '청소', '청소/미화 서비스', '청소 및 운전 보조', '병원 청소', '청소/세탁 서비스', '청소/가사도우미', '청소/가사 서비스');

-- 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업'
WHERE industry IN ('미용실', '미용/뷰티');

-- 유통/판매업
UPDATE jobs SET industry = '유통/판매업'
WHERE industry IN ('식자재 유통', '자동차 부품 유통/판매', '자동차 부품 유통', '쇼핑/의류 판매', '의류/패션');

-- 물류/운송업
UPDATE jobs SET industry = '물류/운송업'
WHERE industry IN ('물류/창고 관리', '이사/운송');

-- 제조/기술업
UPDATE jobs SET industry = '제조/기술업'
WHERE industry IN ('제조업', '정육점/식품 가공', '육가공/식품 가공업', '육가공');

-- 교육업
UPDATE jobs SET industry = '교육업'
WHERE industry = '교육';

-- 의료/복지서비스업
UPDATE jobs SET industry = '의료/복지서비스업'
WHERE industry = '설비/시설관리업';

-- 기타
UPDATE jobs SET industry = '기타'
WHERE industry IN ('PC방/게임방', '농장/농업', '미상', '');
;
