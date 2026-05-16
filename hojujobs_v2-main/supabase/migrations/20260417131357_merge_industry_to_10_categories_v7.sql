
-- 조경/정원관리업, 배관/설비업 → 건설/시공업
UPDATE jobs SET industry = '건설/시공업'
WHERE industry IN ('조경/정원관리업', '배관/설비업');

-- 부동산업 → 물류/운송업
UPDATE jobs SET industry = '물류/운송업'
WHERE industry = '부동산업';

-- 돌봄/복지서비스업 → 의료/복지서비스업
UPDATE jobs SET industry = '의료/복지서비스업'
WHERE industry = '돌봄/복지서비스업';
;
