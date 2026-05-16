
-- =====================
-- CONTACT 오류
-- =====================

-- ID 3905: contact "0412896479" → 설명에 "0412 팔96 사칠9" 명시 (팔=8, 사=4, 칠=7)
-- 0412 8 96 4 7 9 → 0412896479 맞음 ✅ (한국어 숫자 치환하면 동일)
-- 검증: 팔=8, 사=4, 칠=7 → 0412 8 96 4 7 9 = 0412896479 ✅

-- =====================
-- LOCATION 오류
-- =====================

-- ID 3836, 3960, 4015: ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id IN (3836, 3960, 4015);
UPDATE jobs SET google_search = 'T/A 스시샵 세인트 아이브스' WHERE id IN (3836, 4015);
UPDATE jobs SET google_search = 'T/A 스시가게 롤메이커 세인트 아이브스' WHERE id = 3960;

-- ID 3863: ["채스우드","린필드"] → 실제 근무지는 린필드(웨스트린필드), 채스우드=통근 언급
UPDATE jobs SET location = '{"린필드"}' WHERE id = 3863;
UPDATE jobs SET google_search = '바리스타 로컬 카페 린필드' WHERE id = 3863;

-- ID 3898: location [] → 설명에 "울굴가(Woolgoolga NSW)" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3898;
UPDATE jobs SET google_search = '라즈베리 블랙베리 픽커 콥스 하버' WHERE id = 3898;

-- ID 3975, 3977: location [] → Brewscape = 포레스트빌 (채스우드=통근 언급)
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id IN (3975, 3977);

-- ID 4000: location ["리버풀"] → "Liverpool st" = 시드니 CBD 거리명 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 4000;
UPDATE jobs SET google_search = 'Kimsunyoung Hair 시드니 CBD' WHERE id = 4000;

-- ID 4018: location [] → 설명에 "리드컴에서 픽업" → 픽업장소, 실제 현장 suburb 불명 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4018;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 4018;

-- ID 4021: location [] → 설명에 "콥스하버/울굴가" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 4021;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 4021;

-- ID 4041: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 4041;
UPDATE jobs SET google_search = '라즈베리 블랙베리 블루베리 농장 콥스 하버' WHERE id = 4041;

-- ID 3905: google_search "타일 하청팀" → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3905;
UPDATE jobs SET google_search = 'TND Tiling 타일 하청팀 시드니' WHERE id = 3905;
;
