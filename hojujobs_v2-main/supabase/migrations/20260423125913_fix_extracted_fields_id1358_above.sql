
-- =====================
-- CONTACT 오류
-- =====================

-- ID 1358: 설명에 "0450 622 558" 명시되어 있는데 "0450688558" 추출됨 → 수정
UPDATE jobs SET contact = '0450622558' WHERE id = 1358;

-- ID 1387: contact NULL, 설명에 두 번호 있음 "0493 033 897", "0407 500 577" → 첫번째 번호
UPDATE jobs SET contact = '0493033897' WHERE id = 1387;

-- ID 1399: contact = "0" → NULL
UPDATE jobs SET contact = NULL WHERE id = 1399;

-- ID 1435: contact "0430396001" 맞고, 두번째 "045203320306" 은 잘못된 번호 형식 (11자리) → 무시

-- =====================
-- EMAIL 오류
-- =====================

-- ID 1445: email = "." → NULL (점은 이메일 아님)
UPDATE jobs SET email = NULL WHERE id = 1445;

-- ID 1486: email = "petitange" → NULL (@ 없음, 잘못된 추출)
UPDATE jobs SET email = NULL WHERE id = 1486;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 1359: 설명에 "Chippendale, 센트럴역 도보 10분" → 치펜데일이 정확, 시드니 CBD 아님
UPDATE jobs SET location = '{"치펜데일"}' WHERE id = 1359;

-- ID 1361: location ["스트라스필드","혼스비"] 인데 제목/설명 모두 "혼스비" 만 언급
UPDATE jobs SET location = '{"혼스비"}' WHERE id = 1361;

-- ID 1364: google_search에 "서리힐스 서리 힐스" 중복, location은 맞음

-- ID 1390: location ["시드니"] → 설명에 "뱅스타운 Little Saigon Plaza" 명시
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 1390;

-- ID 1393: location ["리드컴"] → 설명에 "LITTLE SAIGON PLAZA, Bankstown" 명시 → 뱅크스타운이 근무지
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 1393;

-- ID 1410: 통번역 행사, 시드니에서 진행 → 시드니 CBD 맞음

-- ID 1412: location ["시드니"] → 설명에 "홈부쉬" 명시
UPDATE jobs SET location = '{"홈부쉬"}' WHERE id = 1412;

-- ID 1416: location ["시드니 CBD"] → 설명에 "Glebe" 명시
UPDATE jobs SET location = '{"글리브"}' WHERE id = 1416;

-- ID 1418: location ["시드니 CBD"] → 설명에 "Hunters Hill" 명시
UPDATE jobs SET location = '{"헌터스 힐"}' WHERE id = 1418;

-- ID 1419: location ["탑라이드","채스우드","헌터스 힐"] → 탑/채스우드는 버스 경로 언급, 근무지는 Hunters Hill만
UPDATE jobs SET location = '{"헌터스 힐"}' WHERE id = 1419;

-- ID 1424: location [] → 설명에 "노던비치 지역" 명시
UPDATE jobs SET location = '{"노던 비치"}' WHERE id = 1424;

-- ID 1440: location [] → 설명에 "타운즈빌" 명시
UPDATE jobs SET location = '{"타운스빌"}' WHERE id = 1440;

-- ID 1452: location ["시드니"] → 설명에 "뉴잉톤 근접" 명시
UPDATE jobs SET location = '{"뉴잉턴"}' WHERE id = 1452;

-- ID 1453: location ["웨스트 라이드","스트라스필드"] → 설명에 "웨스트라이드 역 근처" 만 명시
UPDATE jobs SET location = '{"웨스트 라이드"}' WHERE id = 1453;

-- ID 1457: location ["시드니 CBD"] → 설명에 "Camperdown" 명시
UPDATE jobs SET location = '{"캠퍼다운"}' WHERE id = 1457;

-- ID 1459: location ["시드니"] → 설명에 "라우즈힐", "캠벨타운" 두 지점 명시
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 1459;

-- ID 1466: location ["웨스트 라이드","스트라스필드"] → 설명에 "웨스트라이드역 3분" 만 명시
UPDATE jobs SET location = '{"웨스트 라이드"}' WHERE id = 1466;

-- ID 1473: location ["리드컴"] → 설명에 근무지는 "카슐라(Casula)" 이며 리드컴은 픽드랍 장소
UPDATE jobs SET location = '{"카술라"}' WHERE id = 1473;

-- ID 1479: location ["웨이벌리"] → 설명에 주소 "49C Bondi rd Bondi junction" → 본다이 정션
UPDATE jobs SET location = '{"본다이 정션"}' WHERE id = 1479;

-- ID 1483: location ["탑라이드"] → 설명에 주소 "16 Church St, Ryde" → 라이드 (Top Ryde 쇼핑센터 앞이지만 주소는 Ryde)
UPDATE jobs SET location = '{"탑라이드"}' WHERE id = 1483;

-- ID 1493: google_search "노던비치 노던 비치스 노던 비치" 중복 (location은 맞음)

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 1369: 타일 데모도 → 건설/시공업 (기타 아님)
UPDATE jobs SET industry = '건설/시공업' WHERE id = 1369;

-- ID 1391: 베딩 데모도 → 건설/시공업 (기타 아님)
UPDATE jobs SET industry = '건설/시공업' WHERE id = 1391;

-- ID 1410: 통역사 → 기타 (미용/뷰티업 아님, 뷰티 박람회 통역이지만 직무는 통역)
UPDATE jobs SET industry = '기타' WHERE id = 1410;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 1364: "청소/환경미화업 서리힐스 서리 힐스" 중복
UPDATE jobs SET google_search = '청소 서비스 서리 힐스' WHERE id = 1364;

-- ID 1373: "후레쉬아시아나 메도뱅크 메도우뱅크" 오타+중복
UPDATE jobs SET google_search = '후레쉬 아시아나 마트 메도우뱅크' WHERE id = 1373;

-- ID 1374: "Woolgoolga Coffs Harbour 울굴가 코프스 하버" 중복
UPDATE jobs SET google_search = '라즈베리 팜 코프스 하버' WHERE id = 1374;

-- ID 1378: "피어몬트 시바스키친 Chatswood" 채스우드는 잘못된 suburb
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 1378;

-- ID 1384: "Yang san park Korean BBQ 시티 차이나타운 헤이마켓" 중복
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 1384;

-- ID 1390: suburb 수정
UPDATE jobs SET google_search = 'Hurricane s grill Little Saigon Plaza 뱅크스타운' WHERE id = 1390;

-- ID 1393: suburb 수정
UPDATE jobs SET google_search = 'KMALL09 뱅크스타운' WHERE id = 1393;

-- ID 1412: suburb 수정
UPDATE jobs SET google_search = '시드니장어 홈부쉬' WHERE id = 1412;

-- ID 1416: suburb 수정
UPDATE jobs SET google_search = 'Dusk Hair 글리브' WHERE id = 1416;

-- ID 1417: "yume sushi 노스 스트래스필드 스트라스필드" 오타+중복
UPDATE jobs SET google_search = 'yume sushi 노스 스트라스필드' WHERE id = 1417;

-- ID 1418: suburb 수정
UPDATE jobs SET google_search = '일식 핫푸드 쉐프 헌터스 힐' WHERE id = 1418;

-- ID 1419: suburb 수정
UPDATE jobs SET google_search = '일식 핫푸드 해드쉐프 헌터스 힐' WHERE id = 1419;

-- ID 1433: "명동 노스스트라스필드 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '한식당 명동 노스 스트라스필드' WHERE id = 1433;

-- ID 1435: "드럼마운 드러모인" 오타+중복
UPDATE jobs SET google_search = '로컬 일식당 드러모인' WHERE id = 1435;

-- ID 1452: suburb 수정
UPDATE jobs SET google_search = 'KOFOOD 배송 뉴잉턴' WHERE id = 1452;

-- ID 1457: suburb 수정
UPDATE jobs SET google_search = 'Izakaya Shogun 캠퍼다운' WHERE id = 1457;

-- ID 1473: suburb 수정
UPDATE jobs SET google_search = '스시트레인 카술라' WHERE id = 1473;

-- ID 1479: suburb 수정
UPDATE jobs SET google_search = 'cafe Waverley 본다이 정션' WHERE id = 1479;

-- ID 1483: "탑라이드 BBQ WANG 라이드" 중복
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 1483;

-- ID 1488: "Sushi Takeaway shop 캐슬힐 카슬힐" 중복
UPDATE jobs SET google_search = 'Sushi Takeaway 카슬힐' WHERE id = 1488;

-- ID 1493: "홈청소 노던비치 노던 비치스 노던 비치" 중복
UPDATE jobs SET google_search = '홈청소 노던 비치' WHERE id = 1493;
;
