
-- =====================
-- INDUSTRY 비어있음 수정
-- =====================
UPDATE jobs SET industry = '요식업' WHERE id = 3266;
UPDATE jobs SET industry = '건설/시공업' WHERE id = 3267;
UPDATE jobs SET industry = '유통/판매업' WHERE id = 3268;
UPDATE jobs SET industry = '기타' WHERE id = 3269;

-- =====================
-- CONTACT 오류
-- =====================

-- ID 3269: contact "0432552290" → 설명에 "0432552289" 명시 (오타)
UPDATE jobs SET contact = '0432552289' WHERE id = 3269;

-- ID 3276: contact "0406371393" → 설명에 "0406371593" 명시 (오타)
UPDATE jobs SET contact = '0406371593' WHERE id = 3276;

-- ID 3298: contact "0481124789" → 설명에 "0406574030" 명시 (sticky 번호)
UPDATE jobs SET contact = '0406574030' WHERE id = 3298;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 3352: email "info.lerooftop@gmail.com" → 설명에 "Acc.lerooftop@gmail.com" 명시
UPDATE jobs SET email = 'Acc.lerooftop@gmail.com' WHERE id = 3352;

-- ID 3333: email "ksusan2122@gmail.com" → 설명에 "sungun4729@gmail.com" 명시
UPDATE jobs SET email = 'sungun4729@gmail.com' WHERE id = 3333;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 3266: location [] → 설명에 "194 Victoria Rd, Gladesville" 명시 → 글레이즈빌
UPDATE jobs SET location = '{"글레이즈빌"}' WHERE id = 3266;
UPDATE jobs SET google_search = '일식 레스토랑 글레이즈빌' WHERE id = 3266;

-- ID 3267: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3267;
UPDATE jobs SET google_search = '페인터 중간기술자 시드니' WHERE id = 3267;

-- ID 3268: location [] → 설명에 "리드컴역 2분 거리" 명시 → 리드컴
UPDATE jobs SET location = '{"리드컴"}' WHERE id = 3268;
UPDATE jobs SET google_search = '장터365마트 리드컴' WHERE id = 3268;

-- ID 3269: location [] → 설명에 "Australian College of Professional Careers" = 로즈
UPDATE jobs SET location = '{"로즈"}' WHERE id = 3269;
UPDATE jobs SET google_search = '시드니 컬리지 인턴십 로즈' WHERE id = 3269;

-- ID 3272: google_search "BLUE36 CAFE 노스시드니 노스 시드니" 중복
UPDATE jobs SET google_search = 'BLUE36 CAFE 노스 시드니' WHERE id = 3272;

-- ID 3273: location ["펜리스"] → 다지점 공고이나 웨어하우스도 리드컴에 있음 → 펜리스+리드컴+라우스힐 등
UPDATE jobs SET location = '{"라우스 힐","펜리스","마운트 드루이트","시드니 CBD","미란다","리버풀","리드컴"}' WHERE id = 3273;
UPDATE jobs SET google_search = 'Chefs Buffet Korean BBQ 펜리스' WHERE id = 3273;

-- ID 3280: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3280;
UPDATE jobs SET google_search = 'T/A 스시샵 세인트 아이브스' WHERE id = 3280;

-- ID 3283: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3283;
UPDATE jobs SET google_search = 'Vehicle Body Builder TA 시드니' WHERE id = 3283;

-- ID 3287: location ["뉴트럴베이"] → 표준 표기: "뉴트럴 베이"
UPDATE jobs SET location = '{"뉴트럴 베이"}' WHERE id = 3287;
UPDATE jobs SET google_search = 'MoguMogu 일식당 뉴트럴 베이' WHERE id = 3287;

-- ID 3288: location [] → 홈청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3288;
UPDATE jobs SET google_search = '홈청소 서브팀 시드니' WHERE id = 3288;

-- ID 3290: location ["뉴트럴베이"] → 표준 표기: "뉴트럴 베이"
UPDATE jobs SET location = '{"뉴트럴 베이"}' WHERE id = 3290;
UPDATE jobs SET google_search = '일식당 뉴트럴 베이' WHERE id = 3290;

-- ID 3292: google_search "시드니" → 너무 일반적, 업체명 추가
UPDATE jobs SET google_search = '쿠쿠 호주법인 시드니' WHERE id = 3292;

-- ID 3293: location [] → 청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3293;
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 3293;

-- ID 3295: location [] → 설명에 suburb 없음 (이스트우드 미용실 추정)
UPDATE jobs SET location = '{"이스트우드"}' WHERE id = 3295;
UPDATE jobs SET google_search = '복구매직 모델 이스트우드' WHERE id = 3295;

-- ID 3301: location ["노스쇼어"] → "노스쇼어" 는 지역이 아닌 광역 개념 → "혼스비" (혼스비역에서 픽업)
UPDATE jobs SET location = '{"혼스비"}' WHERE id = 3301;
UPDATE jobs SET google_search = '홈청소 혼스비' WHERE id = 3301;

-- ID 3305: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3305;
UPDATE jobs SET google_search = 'Toki 레스토랑 시드니' WHERE id = 3305;

-- ID 3314: location [] → 설명에 "뱅스타운점" 명시 → 뱅크스타운
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 3314;
UPDATE jobs SET google_search = 'Guzman y Gomez 뱅크스타운' WHERE id = 3314;

-- ID 3318: location [] → 설명에 "Meadowbank Station 도보 1분" 명시 → 메도우뱅크
UPDATE jobs SET location = '{"메도우뱅크"}' WHERE id = 3318;
UPDATE jobs SET google_search = '속눈썹 연장 모델 메도우뱅크' WHERE id = 3318;

-- ID 3321: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3321;
UPDATE jobs SET google_search = '아지오헤어 시드니' WHERE id = 3321;

-- ID 3325: google_search "노스스타라 종로화로 North 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 3325;

-- ID 3328: google_search "Rokyo Sushi Bar 캐슬힐 카슬힐" 중복
UPDATE jobs SET google_search = 'Rokyo Sushi Bar 카슬힐' WHERE id = 3328;

-- ID 3329: google_search "탑라이드 BBQ WANG 라이드" → 라이드 잘못됨
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 3329;

-- ID 3331: location [] → 타일/페이빙 시드니 광역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3331;
UPDATE jobs SET google_search = '타일 페이빙 기술자 시드니' WHERE id = 3331;

-- ID 3334: location ["리드컴"] → 설명에 "Marsden Park" 명시 (리드컴은 픽드랍)
UPDATE jobs SET location = '{"매스든 파크"}' WHERE id = 3334;
UPDATE jobs SET google_search = '초이스 스시 롤메이커 매스든 파크' WHERE id = 3334;

-- ID 3339: location [] → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3339;

-- ID 3341: google_search "Empower English Academy 로즈힐 로즈" → 로즈힐(Rosehill)≠로즈(Rhodes) 중복
UPDATE jobs SET google_search = 'Empower English Academy 로즈' WHERE id = 3341;

-- ID 3342: google_search "한식당 노스스트라스필드 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '한식당 명동 노스 스트라스필드' WHERE id = 3342;

-- ID 3343: location [] → 설명에 "맥콰리" 명시 → 맥쿼리 파크
UPDATE jobs SET location = '{"맥쿼리 파크"}' WHERE id = 3343;
UPDATE jobs SET google_search = '트럭 배송보조 맥쿼리 파크' WHERE id = 3343;

-- ID 3345: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3345;
UPDATE jobs SET google_search = 'T/A 스시샵 롤메이커 세인트 아이브스' WHERE id = 3345;

-- ID 3351: location [] → suburb 없음
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3351;

-- ID 3355: google_search "DonDon 스트라타" → 오타 (스트라타=strata, 스트라스필드 아님)
UPDATE jobs SET google_search = 'DonDon 스트라스필드' WHERE id = 3355;
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 3355;

-- ID 3356: location [] → 이사청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3356;
UPDATE jobs SET google_search = '이사청소 시드니' WHERE id = 3356;

-- ID 3359: google_search "일식레스토랑 랜윅 랜드윅" 중복
UPDATE jobs SET google_search = '일식레스토랑 랜드윅' WHERE id = 3359;

-- ID 3361: google_search "스트라플라자 토모야 스트라플필드 스트라스필드" 오타+중복
UPDATE jobs SET google_search = '토모야 스트라스필드' WHERE id = 3361;

-- ID 3365: google_search "웨스트라이드 헤어디자이너 웨스트 라이드" 중복
UPDATE jobs SET google_search = '서울헤어 웨스트 라이드' WHERE id = 3365;

-- ID 3368: location [] → 설명에 "시티 Korean BBQ 뷔페 오감" → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 3368;
UPDATE jobs SET google_search = '오감 Korean BBQ 뷔페 시드니 CBD' WHERE id = 3368;

-- ID 3374: location ["댄드농"] → MARAE는 Chadstone에 위치 → 채드스톤
UPDATE jobs SET location = '{"채드스톤"}' WHERE id = 3374;
UPDATE jobs SET google_search = 'MARAE Izakaya 채드스톤' WHERE id = 3374;

-- ID 3375: location ["댄드농"] → Chadstone → 채드스톤
UPDATE jobs SET location = '{"채드스톤"}' WHERE id = 3375;
UPDATE jobs SET google_search = 'MARAE 일식 쉐프 채드스톤' WHERE id = 3375;

-- ID 3381: location [] → suburb 없음 → 멜버른 (설명에 suburb 없음)
UPDATE jobs SET location = '{"멜버른"}' WHERE id = 3381;
UPDATE jobs SET google_search = 'Chun''s Kalguksu 멜버른' WHERE id = 3381;

-- ID 3383: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3383;
UPDATE jobs SET google_search = '블랙베리 라즈베리 농장 콥스 하버' WHERE id = 3383;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 3348: 음악학원 어드민 → 교육업 (기타 아님)
UPDATE jobs SET industry = '교육업' WHERE id = 3348;
;
