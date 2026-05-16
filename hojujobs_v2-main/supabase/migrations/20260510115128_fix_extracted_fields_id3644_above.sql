
-- =====================
-- CONTACT 오류
-- =====================

-- ID 3662: contact "042235902구" → 마지막 글자가 한국어 "구" = 0 → 0422359029
-- 설명에서 확인: "042235902구" → "0422359029"
UPDATE jobs SET contact = '0422359029' WHERE id = 3662;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 3646: google_search "마사지사 탑 탑라이드" 중복
UPDATE jobs SET google_search = '마사지사 탑라이드 매릭빌' WHERE id = 3646;

-- ID 3647: google_search "탑 BBQ WANG 탑라이드" 중복
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 3647;

-- ID 3648: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3648;
UPDATE jobs SET google_search = '타일 기술자 데모도 시드니' WHERE id = 3648;

-- ID 3650: location ["리드컴","킹스그로브"] → 리드컴은 픽업장소, 실제 현장은 킹스그로브
UPDATE jobs SET location = '{"킹스그로브"}' WHERE id = 3650;
UPDATE jobs SET google_search = '타일 뒷일 킹스그로브' WHERE id = 3650;

-- ID 3651: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3651;
UPDATE jobs SET google_search = 'TMD Studio 사진 영상 시드니' WHERE id = 3651;

-- ID 3653: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3653;
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 3653;

-- ID 3659: location [] → 설명에 "울굴가, 콥스하버, 그래프턴" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3659;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 3659;

-- ID 3660: location ["파라마타"] → 설명에 "시티 리버풀스트릿점" 명시 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD","파라마타"}' WHERE id = 3660;
UPDATE jobs SET google_search = '신전떡볶이 시드니 CBD' WHERE id = 3660;

-- ID 3662: location ["제틀랜드"] ✅ 맞음 (Zetland)

-- ID 3669: location [] → 설명에 "모스만에 위치" 명시 → 모즈먼
UPDATE jobs SET location = '{"모즈먼"}' WHERE id = 3669;
UPDATE jobs SET google_search = 'Gaia Hair Beauty AVEDA 모즈먼' WHERE id = 3669;

-- ID 3673: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3673;
UPDATE jobs SET google_search = '타일 데모도 시드니' WHERE id = 3673;

-- ID 3674: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3674;
UPDATE jobs SET google_search = '미장 기술자 시드니' WHERE id = 3674;

-- ID 3678: location [] → suburb 없음 (부동산 재택근무) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3678;

-- ID 3680: location [] → 설명에 suburb 없음 (교육기관) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3680;
UPDATE jobs SET google_search = '교육기관 마케팅 시드니' WHERE id = 3680;

-- ID 3684: location ["시드니"] → 설명에 "장소: Silverwater" 명시 → 실버워터
UPDATE jobs SET location = '{"실버워터"}' WHERE id = 3684;
UPDATE jobs SET google_search = 'Kofood 식품 배송 실버워터' WHERE id = 3684;

-- ID 3687: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3687;
UPDATE jobs SET google_search = 'T/A 스시샵 세인트 아이브스' WHERE id = 3687;

-- ID 3688: location [] → 설명에 suburb 없음 (카오카오 중식당) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3688;
UPDATE jobs SET google_search = '카오카오 중식당 시드니' WHERE id = 3688;

-- ID 3689: location ["오트랜즈"] → google_search "Cafe Fran Rafi Oatlands 오트랜드스 오트랜즈" 중복
UPDATE jobs SET google_search = 'Cafe Fran Rafi 오트랜즈' WHERE id = 3689;

-- ID 3691, 3692: location ["웨이벌리"] → 주소 "49C Bondi rd Bondi junction" → 본다이 정션
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 3691;
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 3692;
UPDATE jobs SET google_search = 'cafe Waverley 본다이 정션' WHERE id = 3691;
UPDATE jobs SET google_search = 'Cafe Waverley 본다이 정션' WHERE id = 3692;

-- ID 3698: location ["이스트우드","에핑"] → 픽업은 이스트우드/에핑, 실제 현장은 제틀랜드(Zerland)
UPDATE jobs SET location = '{"제틀랜드"}' WHERE id = 3698;
UPDATE jobs SET google_search = '타일 서포트 제틀랜드' WHERE id = 3698;

-- ID 3704: location ["시드니"] → 설명에 "라우즈힐", "캠벨타운" 두 지점 명시
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 3704;
UPDATE jobs SET google_search = 'Sushi Densha 라우스 힐 캠벨타운' WHERE id = 3704;

-- ID 3707: location ["채스우드","린필드"] → 실제 근무지는 린필드(웨스트린필드), 채스우드는 통근 언급
UPDATE jobs SET location = '{"린필드"}' WHERE id = 3707;
UPDATE jobs SET google_search = '바리스타 로컬 카페 린필드' WHERE id = 3707;

-- ID 3710: location [] → suburb 없음 → 시드니 (모나베일 현장이지만 데이잡)
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3710;
UPDATE jobs SET google_search = '타일 데모도 단기 시드니' WHERE id = 3710;

-- ID 3713: location ["시티 타운 홀","펜리스","맥쿼리 파크"] → "시티 타운 홀" → 시드니 CBD, "맥쿼리 파크"는 웨어하우스 아님(리드컴)
UPDATE jobs SET location = '{"시드니 CBD","펜리스","마운트 드루이트","라우스 힐","미란다","리버풀","리드컴"}' WHERE id = 3713;
UPDATE jobs SET google_search = 'Chefs Buffet Korean BBQ 시드니 CBD' WHERE id = 3713;

-- ID 3714: location [] → 시드니 전역 청소
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3714;
UPDATE jobs SET google_search = '스트라타 청소 가드닝 시드니' WHERE id = 3714;

-- ID 3718: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3718;
UPDATE jobs SET google_search = 'T/A 스시가게 롤메이커 세인트 아이브스' WHERE id = 3718;

-- ID 3720: google_search "육가공 공장 Smithfield 시드니" → Smithfield 영문 제거
UPDATE jobs SET google_search = '육가공 공장 스미스필드' WHERE id = 3720;

-- ID 3723: google_search "펍 청소 쿠지비치 쿠지" → 중복
UPDATE jobs SET google_search = '펍 청소 쿠지' WHERE id = 3723;

-- ID 3724: location ["시드니 CBD"] → google_search "시티 참새방앗간 시드니 CBD" 중복("시티 = 시드니 CBD")
UPDATE jobs SET google_search = '참새방앗간 시드니 CBD' WHERE id = 3724;

-- ID 3725: location [] → 설명에 "Chullora" 명시 → 출로라
UPDATE jobs SET location = '{"출로라"}' WHERE id = 3725;
UPDATE jobs SET google_search = '아라멕스 택배 출로라' WHERE id = 3725;

-- ID 3727: location ["노스 시드니"] → 설명에 "north sydney, ashfield" 두 곳 → 두 곳 모두
UPDATE jobs SET location = '{"노스 시드니","애쉬필드"}' WHERE id = 3727;
UPDATE jobs SET google_search = '헬스장 청소 노스 시드니 애쉬필드' WHERE id = 3727;

-- ID 3734: location [] → 설명에 "Chullora Market Place" 명시 → 출로라
UPDATE jobs SET location = '{"출로라"}' WHERE id = 3734;
UPDATE jobs SET google_search = '빨간고추 출로라' WHERE id = 3734;

-- ID 3735: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3735;
UPDATE jobs SET google_search = '페인터 기술자 시드니' WHERE id = 3735;

-- ID 3736: google_search "Red pepper Bistro Starathfield 스트라스필드" → "Starathfield" 오타
UPDATE jobs SET google_search = 'Red Pepper Bistro 스트라스필드' WHERE id = 3736;

-- ID 3737: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3737;
UPDATE jobs SET google_search = '실비집 시드니' WHERE id = 3737;

-- ID 3744: location ["보몬트 힐스"] → "보몬트 힐스"가 맞음 (Beaumont Hills) ✅

-- ID 3745: location [] → 설명에 "Coffs Harbour, NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3745;
UPDATE jobs SET google_search = '블루베리 라즈베리 농장 콥스 하버' WHERE id = 3745;

-- ID 3748: location [] → 설명에 "울굴가/콥스하버" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3748;
UPDATE jobs SET google_search = '라즈베리 블랙베리 픽커 콥스 하버' WHERE id = 3748;

-- ID 3752: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3752;
UPDATE jobs SET google_search = '레노베이션 철거 시드니' WHERE id = 3752;

-- ID 3755: location [] → 설명에 "모스만에 위치한 AVEDA salon" 명시 → 모즈먼
UPDATE jobs SET location = '{"모즈먼"}' WHERE id = 3755;
UPDATE jobs SET google_search = 'Gaia Hair Beauty AVEDA 모즈먼' WHERE id = 3755;

-- ID 3757: location [] → suburb 없음, 로즈 픽업 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3757;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 3757;

-- ID 3760: location ["시드니 CBD"] → 설명에 "Neutral Bay, 81 Military Rd" 명시 → 뉴트럴 베이
UPDATE jobs SET location = '{"뉴트럴 베이"}' WHERE id = 3760;
UPDATE jobs SET google_search = 'MoguMogu 일식당 뉴트럴 베이' WHERE id = 3760;

-- ID 3761: location ["리버풀"] → "Liverpool St" = 시드니 CBD 거리명 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 3761;
UPDATE jobs SET google_search = 'Kimsunyoung Hair 시드니 CBD' WHERE id = 3761;

-- ID 3769: google_search "SUSHI ROLL 탑 탑라이드" → "탑" 중복
UPDATE jobs SET google_search = 'SUSHI ROLL 탑라이드' WHERE id = 3769;

-- ID 3784: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3784;
UPDATE jobs SET google_search = '타일 기술자 데모도 시드니' WHERE id = 3784;

-- ID 3787: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3787;

-- ID 3789: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3789;
UPDATE jobs SET google_search = '무빙 청소 시드니' WHERE id = 3789;

-- ID 3794: google_search "샤브다이닝 스트라필드 스트라스필드" → 중복/오타
UPDATE jobs SET google_search = '샤브다이닝 도깨비 스트라스필드' WHERE id = 3794;

-- ID 3795: google_search "식당 리드컴" → 업체명 추가
UPDATE jobs SET google_search = '강남베이커리 카페 리드컴' WHERE id = 3795;

-- ID 3799: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3799;
UPDATE jobs SET google_search = '타일 보조 시드니' WHERE id = 3799;

-- ID 3802: location [] → 설명에 "105 Little Bourke Street, Melbourne" 명시 → 멜버른 CBD
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 3802;
UPDATE jobs SET google_search = 'BBQ CODE 멜버른 CBD' WHERE id = 3802;

-- ID 3803: google_search "BBQ CODE 글렌 웨이버리 웨이벌리" 중복/오타
UPDATE jobs SET google_search = 'BBQ CODE 글렌 웨이벌리' WHERE id = 3803;
;
