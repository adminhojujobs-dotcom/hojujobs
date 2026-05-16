
-- =====================
-- CONTACT 오류
-- =====================

-- ID 4509: contact "0494650912" → 설명에 "049 465 0912" 명시 → 합치면 0494650912 맞음 ✅
-- ID 4608: email "info.lerooftop@gmail.com" → 설명에 "Acc.lerooftop@gmail.com" 명시
UPDATE jobs SET email = 'Acc.lerooftop@gmail.com' WHERE id = 4608;

-- ID 4531: email "ksusan2122@gmail.com" → 설명에 "sungun4729@gmail.com" 명시
UPDATE jobs SET email = 'sungun4729@gmail.com' WHERE id = 4531;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 4504, 4505: location [] → suburb 없음, 리드컴 픽업 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4504;
UPDATE jobs SET google_search = '청소 슈퍼바이저 시드니' WHERE id = 4504;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4505;
UPDATE jobs SET google_search = '청소 시드니' WHERE id = 4505;

-- ID 4506: location [] → 자차 배송, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4506;
UPDATE jobs SET google_search = '자차 배송 시드니' WHERE id = 4506;

-- ID 4516: location ["혼스비","로즈"] → 멜로즈파크가 실제 지점, 로즈 아님
UPDATE jobs SET location = '{"혼스비","멜로즈 파크"}' WHERE id = 4516;
UPDATE jobs SET google_search = 'Hopi hair design 혼스비 멜로즈 파크' WHERE id = 4516;

-- ID 4519: location [] → suburb 없음 (금융 브로커) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4519;
UPDATE jobs SET google_search = 'Kopro Finance 시드니' WHERE id = 4519;

-- ID 4527: location [] → 실비집, suburb 없음. 제목에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4527;
UPDATE jobs SET google_search = '실비집 시드니' WHERE id = 4527;

-- ID 4528: location ["시드니"] → 설명에 "뱅스타운 Little Saigon plaza" 명시 → 뱅크스타운
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 4528;
UPDATE jobs SET google_search = 'Hurricane''s grill 뱅크스타운' WHERE id = 4528;

-- ID 4529: google_search "초심 뉴잉톤 뉴잉턴" → 중복
UPDATE jobs SET google_search = '초심 뉴잉턴' WHERE id = 4529;

-- ID 4540: google_search "참새방앗간 익스프레스 헤이마켓 시드니 CBD" → 헤이마켓=시드니CBD 중복
UPDATE jobs SET google_search = 'Sparrow''s Mill Express 헤이마켓' WHERE id = 4540;

-- ID 4544: google_search에서 "stoneage974@gmail.com" → email 없음, 설명에 이메일 없음 OK
-- ID 4545: location ["엔스더우"] → 오타, 실제는 NSW 지역 (불명확) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4545;
UPDATE jobs SET google_search = '헤어드레서 파트너 시드니' WHERE id = 4545;

-- ID 4548: google_search "Cafe Fran Rafi Oatlands 오트랜드스 오트랜즈" → 중복
UPDATE jobs SET google_search = 'Cafe Fran Rafi 오트랜즈' WHERE id = 4548;

-- ID 4554: google_search "노스스타라 종로화로 노스 스트라스필드" → "노스스타라" 잘못됨
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 4554;

-- ID 4558: google_search "식당 리드컴" → 업체명 추가
UPDATE jobs SET google_search = '안다미로스시 리드컴' WHERE id = 4558;

-- ID 4559: location [] → suburb 없음 (타일팀) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4559;
UPDATE jobs SET google_search = '타일 데모도 기술자 시드니' WHERE id = 4559;

-- ID 4560: location [] → 이벤트, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4560;

-- ID 4561: google_search "식당 리드컴" → 업체명 추가
UPDATE jobs SET google_search = '미라네 포차 리드컴' WHERE id = 4561;

-- ID 4568: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4568;
UPDATE jobs SET google_search = '청소 시드니' WHERE id = 4568;

-- ID 4573: contact "0426561004" → 설명에 "0410 131 223" 명시 → fix
UPDATE jobs SET contact = '0410131223' WHERE id = 4573;

-- ID 4574: location [] → 홈청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4574;
UPDATE jobs SET google_search = '홈청소 시드니' WHERE id = 4574;

-- ID 4578: location ["시드니 CBD"] → 설명에 "Neutral Bay, 81 Military Rd" 명시 → 뉴트럴 베이
UPDATE jobs SET location = '{"뉴트럴 베이"}' WHERE id = 4578;
UPDATE jobs SET google_search = 'MoguMogu 일식당 뉴트럴 베이' WHERE id = 4578;

-- ID 4581: google_search "SUSHIA 마스코트 마스콧" → "마스코트" 오타+중복
UPDATE jobs SET google_search = 'SUSHIA 시드니 공항 마스콧' WHERE id = 4581;

-- ID 4586: location ["로즈"] → 설명에 "Wentworth point" 명시, 로즈는 셔틀버스 픽업
-- google_search "Wentworth 신사동 꼬꼬치킨 point 로즈" 잘못됨
UPDATE jobs SET location = '{"웬트워스 포인트"}' WHERE id = 4586;
UPDATE jobs SET google_search = '신사동꼬꼬치킨 웬트워스 포인트' WHERE id = 4586;

-- ID 4587: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4587;
UPDATE jobs SET google_search = 'Atelier O 빈티지샵 시드니' WHERE id = 4587;

-- ID 4589: location ["로즈"] → 설명에 "Chatswood (체스우드) 매장" → 채스우드
UPDATE jobs SET location = '{"채스우드","로즈"}' WHERE id = 4589;
UPDATE jobs SET google_search = 'Yangga Deli 채스우드' WHERE id = 4589;

-- ID 4591: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4591;
UPDATE jobs SET google_search = 'Restaurant Toki 파이스트리 쉐프 시드니' WHERE id = 4591;

-- ID 4593: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4593;
UPDATE jobs SET google_search = '청소 슈퍼바이저 시드니' WHERE id = 4593;

-- ID 4595: location ["레이컴바"] → 표준 표기 "레이컴바" (Lakemba) 맞음 ✅

-- ID 4602: location [] → 로즈 픽업, 실제 현장 불명 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4602;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 4602;

-- ID 4606: location ["시드니"] → google_search "클리너 시드니" → 업체명 없음 OK (Bondi/Coogee/Randwick)
-- 실제 근무지는 시드니 이스턴 지역 → 근무지 더 정확히
UPDATE jobs SET location = '{"본다이","쿠지","랜드윅"}' WHERE id = 4606;
UPDATE jobs SET google_search = '스트라타 클리너 본다이 쿠지 랜드윅' WHERE id = 4606;

-- ID 4617: location [] → suburb 없음 (타일팀) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4617;
UPDATE jobs SET google_search = '타일 기술자 중간기술자 시드니' WHERE id = 4617;

-- ID 4624: location ["시드니"] → 설명에 "라우즈힐, 캠벨타운" 두 지점 명시
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 4624;
UPDATE jobs SET google_search = 'Sushi Densha 라우스 힐 캠벨타운' WHERE id = 4624;

-- ID 4625: location [] → 부동산, suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4625;

-- ID 4626: google_search "Gaia Hair Beauty 모스만 모즈먼" → 중복 (모스만=비표준)
UPDATE jobs SET google_search = 'Gaia Hair Beauty AVEDA 모즈먼' WHERE id = 4626;

-- ID 4630: google_search "BBQ WANG 탑 탑라이드" → "탑" 중복
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 4630;

-- ID 4638: location ["라이드"] → "톱라이드쇼핑센터"에 위치 → 탑라이드
UPDATE jobs SET location = '{"탑라이드"}' WHERE id = 4638;
UPDATE jobs SET google_search = 'BUNSIK 탑라이드' WHERE id = 4638;

-- ID 4639: location [] → suburb 없음 (페인팅) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4639;
UPDATE jobs SET google_search = '페인팅 기술자 시드니' WHERE id = 4639;

-- ID 4641: google_search "미용 이스트우드" → 업체명 추가
UPDATE jobs SET google_search = 'CK ARTISTRY 네일 이스트우드' WHERE id = 4641;

-- ID 4644: google_search "시드니" → 너무 일반적
UPDATE jobs SET google_search = '박람회 운영 보조 시드니' WHERE id = 4644;

-- ID 4647: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4647;
UPDATE jobs SET google_search = 'KOBAB 식당 시드니' WHERE id = 4647;

-- ID 4649: google_search "애들레이드" → 너무 일반적
UPDATE jobs SET google_search = '통역사 Hort Connections 애들레이드' WHERE id = 4649;

-- ID 4651: location [] → 설명에 "Chowon – kew, Melbourne" 명시 → 큐
UPDATE jobs SET location = '{"큐"}' WHERE id = 4651;
UPDATE jobs SET google_search = 'Chowon Japanese Dining 큐' WHERE id = 4651;

-- ID 4652: google_search "시드니" → 너무 일반적, 멜버른 오프라인 마케팅 공고
UPDATE jobs SET google_search = '회계법인 마케팅 시드니 멜버른' WHERE id = 4652;

-- ID 4663: google_search "Ko B Q Pty Ltd 블랙번" → OK ✅

-- ID 4664: location ["시드니"] → google_search "마사지샵 시드니" → 업체명 없음 OK
-- 마사지샵 (성인향 내용이나 location/industry는 맞음) → 유지

-- ID 4665: google_search "시티 콜린스트릿 어핏 살롱 멜버른 CBD" → 한글+멜버른 중복/과김
UPDATE jobs SET google_search = 'AFEAT Hair Salon 멜버른 CBD' WHERE id = 4665;

-- ID 4666: location ["채드스톤"] → 설명에 "시티" 등 여러 지역, 채드스톤 연락처 분리
-- 실제로는 시티+채드스톤 두 곳 → 시드니 CBD+채드스톤 아닌, 시티는 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD","채드스톤"}' WHERE id = 4666;
UPDATE jobs SET google_search = '명품 매장 청소 시드니 CBD' WHERE id = 4666;

-- ID 4669: location [] → suburb 없음 (건설현장) → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 4669;
UPDATE jobs SET google_search = '건설현장 플로어 설치 시드니' WHERE id = 4669;

-- ID 4670: location [] → 새마을식당(멜버른 CBD) → 멜버른 CBD
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 4670;
UPDATE jobs SET google_search = 'PAIK''S BBQ 새마을식당 멜버른 CBD' WHERE id = 4670;

-- ID 4671: location [] → 사계/온도 레스토랑, suburb 없음 → 멜버른
UPDATE jobs SET location = '{"멜버른"}' WHERE id = 4671;
UPDATE jobs SET google_search = '사계 온도 레스토랑 멜버른' WHERE id = 4671;

-- ID 4673: location [] → Woolgoolga 농장 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 4673;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 4673;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 4580: SUSHIA = 요식업이 맞음 → 유통/판매업은 오류
UPDATE jobs SET industry = '요식업' WHERE id = 4580;

-- ID 4620: "시티 테이크어웨이 샵 세일즈" → 유통/판매업이 더 정확 (기타 아님)
UPDATE jobs SET industry = '유통/판매업' WHERE id = 4620;
;
