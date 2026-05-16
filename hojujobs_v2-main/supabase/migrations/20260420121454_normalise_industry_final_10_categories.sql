
-- 건설/시공업
UPDATE jobs SET industry = '건설/시공업'
WHERE industry IN (
  '타일/바닥재 시공', '철거/건설', '건설 현장 보조', '건설/건설 보조',
  '건설/토목 또는 건설 보조', '건설/기술직', '건설/철거 보조',
  '배관/설비', '건축자재/타일 판매'
);

-- 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업'
WHERE industry IN (
  '청소', '청소/건설 보조', '청소 서비스업'
);

-- 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업'
WHERE industry IN (
  '마사지/건강 관리', '미용/네일샵'
);

-- 유통/판매업
UPDATE jobs SET industry = '유통/판매업'
WHERE industry IN (
  '상점/판매점', '식품점/소매업', '건축자재/타일 판매',
  '슈퍼마켓', '소매/마켓', '마트/소매업'
);

-- 물류/운송업
UPDATE jobs SET industry = '물류/운송업'
WHERE industry IN (
  '배송/물류', '택배 배달'
);

-- 제조/기술업
UPDATE jobs SET industry = '제조/기술업'
WHERE industry IN (
  '자동차 정비/타이어 전문점', '자동차 정비'
);

-- 기타
UPDATE jobs SET industry = '기타'
WHERE industry IN (
  '회계/사무', '재택 부업/재무 컨설팅',
  '화재 안전 제품/시스템 박람회 (산업 전시)'
);
;
