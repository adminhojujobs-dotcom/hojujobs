
-- =====================
-- CONTACT 오류
-- =====================

-- ID 1223: contact = "0" → NULL
UPDATE jobs SET contact = NULL WHERE id = 1223;

-- ID 1257: contact에 이메일 저장됨 → NULL
UPDATE jobs SET contact = NULL WHERE id = 1257;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 1312: email = "n/a" → NULL (이메일 없는 공고)
UPDATE jobs SET email = NULL WHERE id = 1312;

-- ID 1325: email = "000" → NULL
UPDATE jobs SET email = NULL WHERE id = 1325;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 1227: "시드니 CBD" → 설명에 "시티 부근에서 이동" - 홈청소는 특정 suburb 없음, 시드니 CBD 유지 OK
-- ID 1245: "시드니" → "올림픽 파크" (설명에 Olympic Park 명시)
UPDATE jobs SET location = '{"올림픽 파크"}' WHERE id = 1245;

-- ID 1207: "콩코드 웨스트" 올바르나 "콩코드"는 중복 제거
UPDATE jobs SET location = '{"콩코드 웨스트"}' WHERE id = 1207;

-- ID 1161: "노스 스트라스필드","스트라스필드" → 노스 스트라스필드만 (제목에 명시)
UPDATE jobs SET location = '{"노스 스트라스필드"}' WHERE id = 1161;

-- ID 1312: 워리우드 쇼핑센터는 와리우드(Warriewood)에 위치 → 워리우드
UPDATE jobs SET location = '{"워리우드"}' WHERE id = 1312;

-- =====================
-- GOOGLE_SEARCH 오류 (중복 suburb명)
-- =====================

-- ID 1161: "노스 스트래스필드 노스 스트라스필드" 오타+중복
UPDATE jobs SET google_search = 'yume sushi 노스 스트라스필드' WHERE id = 1161;

-- ID 1164: "시드니 시티 소풍 시드니 CBD" 중복
UPDATE jobs SET google_search = '소풍 한식당 시드니 CBD' WHERE id = 1164;

-- ID 1171: "맥콰리 파크 맥쿼리 파크" 오타+중복
UPDATE jobs SET google_search = 'sushi train Mitzu 맥쿼리 파크' WHERE id = 1171;

-- ID 1195: "스트라 샵 스트라 스트라스필드" 중복
UPDATE jobs SET google_search = '스트라 뷰티샵 스트라스필드' WHERE id = 1195;

-- ID 1197: "시티 일식 테이크어웨이 샵 시드니 시드니 CBD" 중복
UPDATE jobs SET google_search = '일식 테이크어웨이 시드니 CBD' WHERE id = 1197;

-- ID 1207: "Mattina Concord Concord 콩코드 웨스트" 중복
UPDATE jobs SET google_search = 'Mattina Cafe 콩코드 웨스트' WHERE id = 1207;

-- ID 1227: "홈청소 시드니 시드니 CBD" 중복
UPDATE jobs SET google_search = '홈청소 시드니 CBD' WHERE id = 1227;

-- ID 1240: "kimsunyoung 시드니 시드니 CBD" 중복
UPDATE jobs SET google_search = '김선영 미용실 월드스퀘어 시드니 CBD' WHERE id = 1240;

-- ID 1245: "올림픽파크 일식집 올림픽파크 시드니" 중복+suburb수정
UPDATE jobs SET google_search = '시로이오렌지 일식집 올림픽 파크' WHERE id = 1245;

-- ID 1312: "스시테이커웨이 와리우드 디 와이" → 와리우드만
UPDATE jobs SET google_search = '스시 테이크어웨이 워리우드' WHERE id = 1312;

-- ID 1344: "신전떡볶이 2호점 멜버른 노스 멜버른" 중복
UPDATE jobs SET google_search = '신전떡볶이 2호점 노스 멜버른' WHERE id = 1344;

-- ID 1349: "시티 리본헤어 멜버른 멜버른 CBD" 중복
UPDATE jobs SET google_search = 'Ribbon Hair 멜버른 CBD' WHERE id = 1349;
;
