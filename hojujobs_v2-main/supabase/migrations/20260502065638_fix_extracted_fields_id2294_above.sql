
-- =====================
-- CONTACT 오류
-- =====================

-- ID 2356: contact "0481124789" → 설명에 "0406574030" 명시
UPDATE jobs SET contact = '0406574030' WHERE id = 2356;

-- ID 2358: contact "0422290461" → 설명에 "0424 289 700" 명시
UPDATE jobs SET contact = '0424289700' WHERE id = 2358;

-- ID 2390: contact "0493492045" → 설명에 "0493495045" 명시 (오타)
UPDATE jobs SET contact = '0493495045' WHERE id = 2390;

-- ID 2445: contact "0426561004" → 설명에 "0410 131 223" 명시
UPDATE jobs SET contact = '0410131223' WHERE id = 2445;

-- ID 2470: contact "0406371393" → 설명에 "0406371593" 명시 (오타)
UPDATE jobs SET contact = '0406371593' WHERE id = 2470;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 2363: email "girrween.mgmt1@gmail.com" → 설명에 "Girraween.mgmt1@tilemarket.com.au" 명시
UPDATE jobs SET email = 'Girraween.mgmt1@tilemarket.com.au' WHERE id = 2363;

-- ID 2470: email "info@Layupandco.com.au" → 설명에 "into@Layupandco.com.au" (오타인데 설명 기준)
-- "into" is clearly a typo for "info" in the original listing — keep info@ as it's correct
-- Actually the description says "into@" which is the typo; the correct company email should be info@
-- Leave as-is since info@ is more likely the intended email

-- ID 2541: email "az03038@gmail.com" → 설명에 "parknamkyu7@naver.com" 명시
UPDATE jobs SET email = 'parknamkyu7@naver.com' WHERE id = 2541;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 2342: location [] → 설명에 "4/11 George Street, North Strathfield NSW 2137" 명시
UPDATE jobs SET location = '{"노스 스트라스필드"}' WHERE id = 2342;
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 2342;

-- ID 2431: location ["시드니 CBD"] → 설명에 "Chippendale" 명시
UPDATE jobs SET location = '{"치펜데일"}' WHERE id = 2431;
UPDATE jobs SET google_search = '홍대포차 치펜데일' WHERE id = 2431;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 2356: "스시 T/A샵 센트럴코스트 센트럴 코스트" 중복
UPDATE jobs SET google_search = '스시 T/A샵 센트럴 코스트' WHERE id = 2356;

-- ID 2358: "올림픽파크 일식집 올림픽 파크" 중복
UPDATE jobs SET google_search = '시로이오렌지 일식집 올림픽 파크' WHERE id = 2358;
;
