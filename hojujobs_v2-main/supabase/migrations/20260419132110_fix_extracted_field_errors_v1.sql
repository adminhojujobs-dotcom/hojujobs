
-- ID 144: google_search has "스티브스" (wrong) → "세인트 아이브스"
UPDATE jobs SET google_search = 'T/A 스시샵 213a Monavale rd 세인트 아이브스' WHERE id = 144;

-- ID 147: google_search "susi 뉴타운" → correct business name
UPDATE jobs SET google_search = 'Sushi Wow Sushi Train 뉴타운' WHERE id = 147;

-- ID 153: location is ["워리우드"] but description says Warriewood - 워리우드 is Warrawee, Warriewood is different suburb
-- Warriewood should be 워리우드 (this is actually correct mapping in context - leave)

-- ID 154: google_search has "스트래스필드 스트라스필드" (duplicated/wrong spelling) → fix
UPDATE jobs SET google_search = '청소 용역업 스트라스필드' WHERE id = 154;

-- ID 163: location has ["사우스 허스트빌"] correctly but google_search says "Hato Japanese Restaurant 사우스 허스트빌" - correct

-- ID 165: google_search "일식레스토랑 킹스 크로스 킹스크로스" → remove duplicate
UPDATE jobs SET google_search = '일식레스토랑 킹스크로스' WHERE id = 165;

-- ID 170: location ["탑라이드","라이드"] - description says "Top Ryde 또는 Marrickville" - 라이드 is wrong, should be 매릭빌
UPDATE jobs SET location = '{"탑라이드","매릭빌"}' WHERE id = 170;
UPDATE jobs SET google_search = '마사지사 탑라이드 또는 매릭빌' WHERE id = 170;

-- ID 173: industry is 물류/운송업 but it's a property/house manager role → 기타
UPDATE jobs SET industry = '기타' WHERE id = 173;

-- ID 174: google_search "한식 일식당 로즈힐" → Rhodes, not Rosehill
UPDATE jobs SET google_search = '한식 일식당 로즈' WHERE id = 174;

-- ID 175: location ["차이나타운"] → should be 헤이마켓 (Haymarket)
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 175;
UPDATE jobs SET google_search = '광장포차 헤이마켓' WHERE id = 175;

-- ID 189: contact is "0481124789" but description says "0406574030" — AI extracted wrong number
UPDATE jobs SET contact = '0406574030' WHERE id = 189;

-- ID 196: industry is 요식업 but it's a convenience store/bottle shop → 유통/판매업
UPDATE jobs SET industry = '유통/판매업' WHERE id = 196;

-- ID 197: location ["차이나타운"] → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 197;
UPDATE jobs SET google_search = '타이거 포차 헤이마켓' WHERE id = 197;

-- ID 204: google_search "MIKAZUKI 스트래스필드 스트라스필드" → fix duplicate/wrong spelling
UPDATE jobs SET google_search = 'MIKAZUKI 스트라스필드' WHERE id = 204;

-- ID 215: location ["탑라이드","라이드"] - same as 170, description says "Top Ryde 또는 Marrickville"
UPDATE jobs SET location = '{"탑라이드","매릭빌"}' WHERE id = 215;
UPDATE jobs SET google_search = '마사지사 탑라이드 또는 매릭빌' WHERE id = 215;

-- ID 225: location ["본다이"] but description says "본다이 정션" (106 Ebley St, Bondi Junction)
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 225;
UPDATE jobs SET google_search = 'Tomo Ramen 본다이 정션' WHERE id = 225;

-- ID 231: location ["울티모"] but address is "37 Ultimo Rd Haymarket" → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 231;
UPDATE jobs SET google_search = 'Coco Salon 37 Ultimo Rd 헤이마켓' WHERE id = 231;

-- ID 236: google_search "스트래스필드 스트라스필드" → fix
UPDATE jobs SET google_search = '김밥 테이크어웨이 스트라스필드' WHERE id = 236;

-- ID 239: location ["시드니"] but address is "21/1 Dixon St, Sydney" → 시드니 CBD (차이나타운)
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 239;
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 21/1 Dixon St 헤이마켓' WHERE id = 239;

-- ID 240: location ["차이나타운"] → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 240;
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 240;

-- ID 245: location ["채스우드","라이드"] but job is in "East Ryde" → fix to 이스트 라이드
UPDATE jobs SET location = '{"이스트우드","라이드"}' WHERE id = 245;
UPDATE jobs SET google_search = '이스트 라이드 카페 라이드' WHERE id = 245;

-- ID 247: contact is "0414049616" but description clearly states "0452 644 119"
UPDATE jobs SET contact = '0452644119' WHERE id = 247;
-- email is "kind1649@icloud.com" but description says "yeongminseo@gmail.com"
UPDATE jobs SET email = 'yeongminseo@gmail.com' WHERE id = 247;

-- ID 256: location ["본다이 정션","본다이"] - description mentions Warringah Mall + Bondi Junction. "본다이" alone is wrong, should be 워링가
UPDATE jobs SET location = '{"본다이 정션","워링가"}' WHERE id = 256;
UPDATE jobs SET google_search = '한식 분식점 본다이 정션 워링가몰' WHERE id = 256;

-- ID 263: google_search has "Redcombe 레드콤브" but job is in Lidcombe → fix
UPDATE jobs SET google_search = '클리닉 리드컴' WHERE id = 263;

-- ID 281: google_search "Kims Tiling Supplies 로즈랜즈" → 로즈랜드 (correct Korean)
UPDATE jobs SET google_search = 'Kims Tiling Supplies 30B Legge St 로즈랜드' WHERE id = 281;

-- ID 283: location is [] but description clearly says "어밍톤 삼시세끼" → 어밍톤
UPDATE jobs SET location = '{"어밍톤"}' WHERE id = 283;

-- ID 287: location is [] but description says "리버우드 홈살롱"
UPDATE jobs SET location = '{"리버우드"}' WHERE id = 287;

-- ID 288: google_search says "채스우드" but job is clearly in Pyrmont
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 288;

-- ID 293: google_search "마사지 업소 매릭빌 맥쿼리빌" → 맥쿼리빌 is wrong (it's Marrickville/매릭빌)
UPDATE jobs SET google_search = '마사지 업소 청소 매릭빌' WHERE id = 293;
;
