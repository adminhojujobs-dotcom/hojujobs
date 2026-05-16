
-- =====================
-- CONTACT 오류
-- =====================

-- ID 3553: email "0511syd@gmail.com" → 숫자로 시작하지만 "@" 있으므로 유효. 맞음 ✅

-- =====================
-- LOCATION 오류
-- =====================

-- ID 3506: google_search "Chicken V Busan Pocha 타운홀 시드니 CBD" 중복
UPDATE jobs SET google_search = 'Chicken V Busan Pocha 시드니 CBD' WHERE id = 3506;

-- ID 3508: location ["채스우드","린필드"] → 실제 근무지는 린필드(웨스트린필드), 채스우드는 통근 언급
UPDATE jobs SET location = '{"린필드"}' WHERE id = 3508;
UPDATE jobs SET google_search = '바리스타 카페 린필드' WHERE id = 3508;

-- ID 3511: google_search "BBQ WANG 라이드 탑라이드" → 라이드 잘못됨
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 3511;

-- ID 3523: location ["시드니"] → 설명에 "장소: Silverwater" 명시 → 실버워터
UPDATE jobs SET location = '{"실버워터"}' WHERE id = 3523;
UPDATE jobs SET google_search = 'Kofood 식품 배송 실버워터' WHERE id = 3523;

-- ID 3524: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3524;
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 3524;

-- ID 3525: location ["로즈"] → 설명에 "체스우드 매장" 명시 → 채스우드
UPDATE jobs SET location = '{"채스우드","로즈"}' WHERE id = 3525;
UPDATE jobs SET google_search = 'Yangga Deli 채스우드' WHERE id = 3525;

-- ID 3527: location ["시드니 CBD"] → 설명에 "Neutral Bay, 81 Military Rd" 명시 → 뉴트럴 베이
UPDATE jobs SET location = '{"뉴트럴 베이"}' WHERE id = 3527;
UPDATE jobs SET google_search = 'MoguMogu 일식당 뉴트럴 베이' WHERE id = 3527;

-- ID 3533: google_search "Sparrow s Mill Express 헤이마켓 시드니 CBD" → 헤이마켓=시드니 CBD 중복
UPDATE jobs SET google_search = 'Sparrow''s Mill Express 헤이마켓' WHERE id = 3533;

-- ID 3535: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3535;
UPDATE jobs SET google_search = 'T/A 스시샵 세인트 아이브스' WHERE id = 3535;

-- ID 3539: google_search "이스트우드 밀양국밥 NSW" → NSW 불필요
UPDATE jobs SET google_search = '밀양국밥 이스트우드' WHERE id = 3539;

-- ID 3541: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3541;
UPDATE jobs SET google_search = '청소 슈퍼바이저 시드니' WHERE id = 3541;

-- ID 3544: location ["시드니 국제공항"] → 표준: "마스콧" (시드니 공항이 있는 suburb)
UPDATE jobs SET location = '{"마스콧"}' WHERE id = 3544;
UPDATE jobs SET google_search = 'Prada 시드니 공항 마스콧' WHERE id = 3544;

-- ID 3545: location [] → 우버이츠, 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3545;

-- ID 3546: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3546;
UPDATE jobs SET google_search = '라즈베리 블랙베리 픽커 콥스 하버' WHERE id = 3546;

-- ID 3548: google_search "KMALL09 리드컴쇼핑센터점 리드컴" 중복
UPDATE jobs SET google_search = 'KMALL09 리드컴' WHERE id = 3548;

-- ID 3550: location ["브로드웨이","채스우드","로즈"] → DK 4개 지점, 설명에 시티/버우드/로즈/채스우드/브로드웨이 명시
-- 설명에 "(시티 / 버우드 / 로즈 / 채스우드 / 브로드웨이 지점 채용 중)" → 모두 포함
UPDATE jobs SET location = '{"시드니 CBD","버우드","로즈","채스우드","브로드웨이"}' WHERE id = 3550;

-- ID 3551: google_search "노스스타라 종로화로 North 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 3551;

-- ID 3556: location ["리버풀"] → 설명에 "Liverpool st" = 시드니 CBD 거리명 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 3556;
UPDATE jobs SET google_search = 'Kimsunyoung Hair 시드니 CBD' WHERE id = 3556;

-- ID 3558: location ["오트랜드스"] → 표준: "오트랜즈" (Oatlands)
UPDATE jobs SET location = '{"오트랜즈"}' WHERE id = 3558;
UPDATE jobs SET google_search = 'Cafe Fran Rafi 오트랜즈' WHERE id = 3558;

-- ID 3559: location [] → 설명에 "NSW 콥스하버/울굴가" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3559;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 3559;

-- ID 3562: location ["시드니"] → 설명에 "Bondi, Coogee, Randwick" 명시
UPDATE jobs SET location = '{"본다이","쿠지","랜드윅"}' WHERE id = 3562;
UPDATE jobs SET google_search = '스트라타 청소 본다이 쿠지 랜드윅' WHERE id = 3562;

-- ID 3566: location [] → 재택근무, 특정 suburb 없음
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3566;
UPDATE jobs SET google_search = '청소 어드민 재택근무 시드니' WHERE id = 3566;

-- ID 3570: google_search "케어 웨스트 라이드" → 업체명으로 수정
UPDATE jobs SET google_search = 'Good Morning Clinic 웨스트 라이드' WHERE id = 3570;

-- ID 3574: location ["페난킬스"] → "페넌트 힐스" (Pennant Hills 오타)
UPDATE jobs SET location = '{"페넌트 힐스"}' WHERE id = 3574;
UPDATE jobs SET google_search = '학교 청소 페넌트 힐스' WHERE id = 3574;

-- ID 3575: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3575;
UPDATE jobs SET google_search = '스트라타 청소 가드닝 시드니' WHERE id = 3575;

-- ID 3577: location ["채스우드"] → Brewscape = 포레스트빌, 채스우드는 통근 언급
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id = 3577;
UPDATE jobs SET google_search = 'Brewscape cafe 포레스트빌' WHERE id = 3577;

-- ID 3578: location [] → 다지점 Chefs Buffet
UPDATE jobs SET location = '{"라우스 힐","펜리스","마운트 드루이트","시드니 CBD","미란다","리버풀","리드컴"}' WHERE id = 3578;
UPDATE jobs SET google_search = 'Chefs Buffet Korean BBQ 라우스 힐' WHERE id = 3578;

-- ID 3580: google_search "제페니즈 TE 레스토랑 Wentworth Point 웬트워스 포인트" 중복
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 3580;

-- ID 3581: google_search "웬포Wentworthpoint 제페니즈 일식 스시 웬트워스 포인트" 중복
UPDATE jobs SET google_search = 'TE 일식 스시 웬트워스 포인트' WHERE id = 3581;

-- ID 3597: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3597;
UPDATE jobs SET google_search = '타일 기술자 시드니' WHERE id = 3597;

-- ID 3611: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3611;
UPDATE jobs SET google_search = '타일 기술자 데모도 시드니' WHERE id = 3611;

-- ID 3615: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3615;
UPDATE jobs SET google_search = 'T/A 스시가게 롤메이커 세인트 아이브스' WHERE id = 3615;

-- ID 3618: location ["에센든","케일러"] → google_search 잘못됨 "에센돈 군 2호점 노스 큐 에센든"
UPDATE jobs SET google_search = '군 Korean BBQ 에센든' WHERE id = 3618;

-- ID 3622: location ["코린디"] → 설명에 "Coffs Harbour 근교 (울굴가/코린디)" → 콥스 하버로 통일
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3622;
UPDATE jobs SET google_search = '베리 농장 콥스 하버' WHERE id = 3622;

-- ID 3625: location [] → 설명에 suburb 없음 → 멜버른 CBD (Emporium Melbourne 추정)
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 3625;
UPDATE jobs SET google_search = 'MIGA Korean Jeongsik 멜버른 CBD' WHERE id = 3625;

-- ID 3628: location [] → 멜버른 CBD (마이코리안스쿨, 시티에 있음)
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 3628;

-- ID 3639: google_search "마사지샵 east 오클리" → 모든 지점 있으므로 더 포괄적으로
UPDATE jobs SET google_search = '마사지샵 오클리 헌팅데일 블랙번' WHERE id = 3639;

-- ID 3641: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3641;
UPDATE jobs SET google_search = '라즈 블랙 블루베리 농장 콥스 하버' WHERE id = 3641;

-- ID 3642: location [] → suburb 없음 → 시드니 (박봉숙 코리아타운점 = 이스트우드 또는 시티)
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3642;
UPDATE jobs SET google_search = '박봉숙 식당 시드니' WHERE id = 3642;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 3573: 학원 교사 → 교육업 (기타 아님) ← already "교육업" ✅
-- ID 3628: 언어 교환 이벤트 → 교육업 맞음 ✅
-- ID 3631: 디지털 마케팅 재택근무 → 기타 맞음 ✅
-- ID 3639: 마사지 → 미용/뷰티업 맞음 ✅
;
