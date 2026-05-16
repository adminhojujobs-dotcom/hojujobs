
-- =====================
-- CONTACT 오류
-- =====================

-- ID 2597: contact "0422692542" → 설명에 "0422692452" 명시 (오타, 두 자리 바뀜)
UPDATE jobs SET contact = '0422692452' WHERE id = 2597;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 2363 already fixed previously
-- No new email errors found in this batch

-- =====================
-- LOCATION 오류
-- =====================

-- ID 2585: location [] → 시드니 전역 청소업체, 특정 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2585;
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 2585;

-- ID 2595: location [] → 설명에 특정 suburb 없음 (카오카오 중식당) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2595;
UPDATE jobs SET google_search = '카오카오 중식당 시드니' WHERE id = 2595;

-- ID 2597: location [] → 설명에 특정 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2597;
UPDATE jobs SET google_search = '미장 타일 데모도 시드니' WHERE id = 2597;

-- ID 2602: location [] → 설명에 "스트라 역 근처" 명시 → 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2602;
UPDATE jobs SET google_search = 'DonDon 스트라스필드' WHERE id = 2602;

-- ID 2604: location ["시드니"] → 설명에 "Level 1 78 Harbour St Haymarket" 명시 → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 2604;
UPDATE jobs SET google_search = '본가 KBBQ 헤이마켓' WHERE id = 2604;

-- ID 2606: location [] → 설명에 특정 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2606;
UPDATE jobs SET google_search = 'igniis bake roast 시드니' WHERE id = 2606;

-- ID 2619: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만 (혼스비는 언급만)
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 2619;
UPDATE jobs SET google_search = '스시 롤메이커 세인트 아이브스' WHERE id = 2619;

-- ID 2628: location [] → 설명에 이메일만 있고 suburb 없음 → 멜버른 CBD (새마을식당은 멜버른 CBD 위치)
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 2628;
UPDATE jobs SET google_search = 'PAIK''S BBQ 새마을식당 멜버른 CBD' WHERE id = 2628;

-- ID 2632: location [] → 설명에 "KOREAN BBQ 뷔페 오감" — 시드니 CBD (제목에 "시티)" 명시)
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 2632;
UPDATE jobs SET google_search = '오감 Korean BBQ 뷔페 시드니 CBD' WHERE id = 2632;

-- ID 2638: location [] → 설명에 "Woolgoolga NSW" 명시 → 코프스 하버
UPDATE jobs SET location = '{"코프스 하버"}' WHERE id = 2638;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 코프스 하버' WHERE id = 2638;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 2594: "AVEDA salon Gaia Hair Beauty 모스만 모즈먼" — 중복 표기 (모스만=모즈먼)
UPDATE jobs SET google_search = 'Gaia Hair Beauty AVEDA 모즈먼' WHERE id = 2594;

-- ID 2596: "타이거 포차 시티 차이나타운 헤이마켓" — 중복/과잉
UPDATE jobs SET google_search = '타이거 포차 헤이마켓' WHERE id = 2596;

-- ID 2605: "피어몬트 시바스키친 채스우드" — 채스우드 잘못됨 (근무지는 피어몬트)
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 2605;

-- ID 2607: "It s corn 버우드 차이나타운 헤이마켓" — 중복/버우드 차이나타운=헤이마켓
UPDATE jobs SET google_search = 'It''s Corn 헤이마켓' WHERE id = 2607;

-- ID 2616: "홈청소 레드펀 시드니 CBD" — 레드펀과 시드니 CBD 중복(픽업 장소가 레드펀, 시드니 전역 청소)
UPDATE jobs SET google_search = '홈청소 레드펀' WHERE id = 2616;
UPDATE jobs SET location = '{"레드펀"}' WHERE id = 2616;

-- ID 2624: "명동 노스스트라스필드 노스 스트라스필드" — 중복
UPDATE jobs SET google_search = '한식당 명동 노스 스트라스필드' WHERE id = 2624;

-- ID 2633: "BBQ Code East 큐 돈캐스터" — "큐" 잘못됨 (큐는 멜버른 교외, 돈카스터이스트가 맞음)
UPDATE jobs SET google_search = 'BBQ Code 돈캐스터 이스트' WHERE id = 2633;

-- ID 2637: "글렌웨이버리 헤어샵 글렌 웨이벌리" — 중복
UPDATE jobs SET google_search = 'jn1 헤어샵 글렌 웨이벌리' WHERE id = 2637;
;
