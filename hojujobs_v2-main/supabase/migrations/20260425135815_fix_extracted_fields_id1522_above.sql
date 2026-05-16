
-- =====================
-- CONTACT 오류
-- =====================

-- ID 1604: contact에 이메일 저장됨 → NULL (전화번호 없는 공고)
UPDATE jobs SET contact = NULL WHERE id = 1604;

-- ID 1653: contact = "0" → NULL, email = "j" → NULL (설명에 이메일 잘림)
UPDATE jobs SET contact = NULL, email = NULL WHERE id = 1653;

-- ID 1654: contact = "0" → NULL (설명에 전화번호 없음)
UPDATE jobs SET contact = NULL WHERE id = 1654;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 1612: email = "000" → NULL
UPDATE jobs SET email = NULL WHERE id = 1612;

-- ID 1620: email = "." → NULL
UPDATE jobs SET email = NULL WHERE id = 1620;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 1639: location ["시드니"] → 설명에 "홈부쉬 시드니장어" 명시
UPDATE jobs SET location = '{"홈부쉬"}', google_search = '시드니장어 홈부쉬' WHERE id = 1639;

-- ID 1643: location ["시드니 CBD"] → 설명에 "Camperdown" 명시
UPDATE jobs SET location = '{"캠퍼다운"}', google_search = 'Izakaya Shogun 캠퍼다운' WHERE id = 1643;

-- ID 1652: location ["시드니 CBD"] → 설명에 "Chippendale" 명시 (홍대포차)
UPDATE jobs SET location = '{"치펜데일"}', google_search = '홍대포차 치펜데일' WHERE id = 1652;

-- ID 1654: location [] → 설명에 "UTS 대학교 바로 건너" = Chippendale
UPDATE jobs SET location = '{"치펜데일"}' WHERE id = 1654;

-- ID 1743: location ["시드니 CBD"] → 설명에 "Ultimo 근처" 명시
UPDATE jobs SET location = '{"울티모"}', google_search = 'Coco Salon 울티모' WHERE id = 1743;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 1620: google_search "리드컴" 만 있고 업체명 없음 → 개선
UPDATE jobs SET google_search = '드루와포차 리드컴' WHERE id = 1620;

-- ID 1653: google_search "시드니" 만 있음 → 개선
UPDATE jobs SET google_search = 'Vuza Hospitality 시드니' WHERE id = 1653;
;
