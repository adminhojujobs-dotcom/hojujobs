
-- =====================
-- CONTACT 오류
-- =====================

-- ID 3488: email = leafcafe.com.au → 이메일 아님, URL임 → NULL
UPDATE jobs SET email = NULL WHERE id = 3488;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 3390, 3391: location ["웨이벌리"] → 설명에 "49C Bondi rd, Bondi Junction" 명시 → 본다이 정션
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 3390;
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 3391;
UPDATE jobs SET google_search = 'Cafe Waverley 본다이 정션' WHERE id = 3390;
UPDATE jobs SET google_search = 'cafe Waverley 본다이 정션' WHERE id = 3391;

-- ID 3395: location ["로즈"] → 설명에 "체스우드 매장" 명시 → 채스우드
UPDATE jobs SET location = '{"채스우드","로즈"}' WHERE id = 3395;
UPDATE jobs SET google_search = 'Yangga Deli 채스우드' WHERE id = 3395;

-- ID 3398, 3399: google_search "제페니즈 TE 레스토랑 Wentworth Point 웬트워스 포인트" 중복
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 3398;
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 3399;

-- ID 3400: location ["펜리스","웨스트레이크"] → "웨스트레이크"는 없는 suburb → 다지점
UPDATE jobs SET location = '{"라우스 힐","펜리스","마운트 드루이트","시드니 CBD","미란다","리버풀","리드컴"}' WHERE id = 3400;

-- ID 3405: location ["채스우드","린필드"] → 설명에 "웨스트린필드" 명시 → 린필드만, 채스우드는 통근 언급
UPDATE jobs SET location = '{"린필드"}' WHERE id = 3405;
UPDATE jobs SET google_search = '바리스타 카페 린필드' WHERE id = 3405;

-- ID 3409: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3409;
UPDATE jobs SET google_search = '타일 기술자 데모도 시드니' WHERE id = 3409;

-- ID 3415: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3415;
UPDATE jobs SET google_search = '페인터 중간기술자 시드니' WHERE id = 3415;

-- ID 3420: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3420;
UPDATE jobs SET google_search = 'TMD Studio 사진 영상 시드니' WHERE id = 3420;

-- ID 3427: location ["드러모인"] → 설명에 "19 Roseby St Drummoyne" 맞음 ✅
-- industry 유통/판매업 → SUSHIA 스시샵 = 요식업
UPDATE jobs SET industry = '요식업' WHERE id = 3427;

-- ID 3429: location ["시드니"] → 설명에 "43 Antoine St, Rydalmere" 명시 → 리달미어
UPDATE jobs SET location = '{"리달미어"}' WHERE id = 3429;
UPDATE jobs SET google_search = 'Smile Meat 리달미어' WHERE id = 3429;

-- ID 3431: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 3431;
UPDATE jobs SET google_search = 'T/A 스시샵 세인트 아이브스' WHERE id = 3431;

-- ID 3435: google_search "명동 North 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '명동 한식당 노스 스트라스필드' WHERE id = 3435;

-- ID 3436: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3436;
UPDATE jobs SET google_search = '배관공사 시드니' WHERE id = 3436;

-- ID 3447: google_search "노던비치 스시숍 노던 비치스 노던 비치" 중복
UPDATE jobs SET google_search = '스시숍 노던 비치' WHERE id = 3447;

-- ID 3448: location ["프렌치 포레스트"] → 표준 표기 "포레스트빌"
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id = 3448;
UPDATE jobs SET google_search = '스시숍 포레스트빌' WHERE id = 3448;

-- ID 3454: location ["시드니"] → 설명에 "Vore St, SILVERWATER" 명시 → 실버워터
UPDATE jobs SET location = '{"실버워터"}' WHERE id = 3454;
UPDATE jobs SET google_search = '시드니 본오피스 Admin 실버워터' WHERE id = 3454;

-- ID 3460: location [] → 설명에 "픽업은 로즈 가능" → 픽업장소 아닌 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3460;
UPDATE jobs SET google_search = '타일 데모도 중간기술자 시드니' WHERE id = 3460;

-- ID 3463: google_search "Jongro Hwaro Korean BBQ North 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '종로화로 Korean BBQ 노스 스트라스필드' WHERE id = 3463;

-- ID 3464: location [] → 설명에 "NSW 콥스하버/울굴가" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3464;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 3464;

-- ID 3465: google_search "Sushi Densha 라우즈힐 캠벨타운" → 라우즈힐 오타
UPDATE jobs SET google_search = 'Sushi Densha 라우스 힐 캠벨타운' WHERE id = 3465;

-- ID 3466: location [] → 설명에 "Macquarie University" → 맥쿼리 파크
UPDATE jobs SET location = '{"맥쿼리 파크"}' WHERE id = 3466;
UPDATE jobs SET google_search = '수학 과외 맥쿼리 파크' WHERE id = 3466;

-- ID 3467: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3467;
UPDATE jobs SET google_search = '미장 기술자 시드니' WHERE id = 3467;

-- ID 3468: location ["시드니"] → 설명에 "78 Harbour St Haymarket" 명시 → 헤이마켓
UPDATE jobs SET location = '{"헤이마켓"}' WHERE id = 3468;
UPDATE jobs SET google_search = '백종원 본가 헤이마켓' WHERE id = 3468;

-- ID 3470: google_search "노스스타라 종로화로 North 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 3470;

-- ID 3473: location ["채스우드","포레스트빌"] → 설명에 "채스우드에서 버스로 10분" = 통근 참고, 실제 근무지는 포레스트빌
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id = 3473;
UPDATE jobs SET google_search = 'Brewscape cafe 포레스트빌' WHERE id = 3473;

-- ID 3474: location ["채스우드"] → 실제 근무지는 포레스트빌 (Brewscape)
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id = 3474;
UPDATE jobs SET google_search = 'Brewscape cafe 포레스트빌' WHERE id = 3474;

-- ID 3483: google_search "스트라스필드 식당" → 업체명 추가
UPDATE jobs SET google_search = '6sim 식당 스트라스필드' WHERE id = 3483;

-- ID 3489: location [] → suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3489;
UPDATE jobs SET google_search = '페인트 작업 시드니' WHERE id = 3489;

-- ID 3495: location ["리드컴"] → 설명에 "Wetherill Park" 명시 → 웨더릴 파크
UPDATE jobs SET location = '{"웨더릴 파크"}' WHERE id = 3495;
UPDATE jobs SET google_search = 'E-piping 페인트 보조 웨더릴 파크' WHERE id = 3495;

-- ID 3498: google_search "올림픽파크 일식집 올림픽 파크" 중복
UPDATE jobs SET google_search = '시로이오렌지 올림픽 파크' WHERE id = 3498;

-- ID 3502: location [] → 홈청소 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3502;
UPDATE jobs SET google_search = '홈청소 서브팀 시드니' WHERE id = 3502;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 3427: SUSHIA = 요식업 (유통/판매업이 아님, already above)
-- ID 3466: 과외/교육 → 교육업
UPDATE jobs SET industry = '교육업' WHERE id = 3466;
;
