
-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 1929, 1930, 1931: industry 비어있음 → 요식업
UPDATE jobs SET industry = '요식업' WHERE id IN (1929, 1930, 1931);

-- ID 2024: industry "요식업" but it's a food store/supermarket → 유통/판매업
UPDATE jobs SET industry = '유통/판매업' WHERE id = 2024;

-- ID 2022: SM Cleaning 마케팅/세일즈 → 청소/환경미화업 (회사는 청소회사)
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 2022;

-- ID 2080: 미용실 → 미용/뷰티업 (비어있음 아님, industry NULL 대신 비어있음)
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 2080 AND (industry IS NULL OR industry = '');

-- =====================
-- CONTACT 오류
-- =====================

-- ID 1929, 1930, 1931: location 비어있음 → 이스트우드
UPDATE jobs SET location = '{"이스트우드"}' WHERE id = 1929;
UPDATE jobs SET location = '{"이스트우드"}' WHERE id = 1930;
-- ID 1931: 시드니 시티
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 1931;

-- ID 1944: "탑라이드 BBQ WANG 라이드" → 라이드 잘못됨, 탑라이드가 주소
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 1944;

-- ID 1965: contact "0493492045" → 설명에 "0493495045" 명시 (오타)
UPDATE jobs SET contact = '0493495045' WHERE id = 1965;

-- ID 1979: contact "0426561004" → 설명에 "0410 131 223" 명시 → fix
UPDATE jobs SET contact = '0410131223' WHERE id = 1979;

-- ID 1997: contact "0481124789" → 설명에 "0406574030" 명시 → fix
UPDATE jobs SET contact = '0406574030' WHERE id = 1997;

-- ID 2012: contact "0422290461" → 설명에 "0424 289 700" 명시 → fix
UPDATE jobs SET contact = '0424289700' WHERE id = 2012;

-- ID 2064: email "hongjyyong@gmail.com" but description says "ssangchi1@daum.net" → fix
UPDATE jobs SET email = 'ssangchi1@daum.net' WHERE id = 2064;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 1942: "코치 드라이버 Sydney CBD 뉴카슬" → google_search 틀림 (Sydney CBD 없음)
UPDATE jobs SET google_search = '코치 드라이버 고든 뉴카슬' WHERE id = 1942;

-- ID 1945: location ["채스우드","로즈"] → 4개 지점 운영, 더 정확히
UPDATE jobs SET location = '{"시드니 CBD","버우드","로즈","채스우드"}' WHERE id = 1945;

-- ID 1947: location ["시드니 CBD"] → 설명에 "Glebe" 명시
UPDATE jobs SET location = '{"글리브"}' WHERE id = 1947;
UPDATE jobs SET google_search = '쿄야끼니꾸 글리브' WHERE id = 1947;

-- ID 1948: google_search "서리힐즈 서리 힐스" 중복
UPDATE jobs SET google_search = 'Single O 서리 힐스' WHERE id = 1948;

-- ID 1955: location ["파라마타"] → 설명에 "Northmead" 명시
UPDATE jobs SET location = '{"노스미드"}' WHERE id = 1955;
UPDATE jobs SET google_search = '일식 테이크어웨이 노스미드' WHERE id = 1955;

-- ID 1962: location ["시드니"] → 설명에 "Rydalmere" 주소 명시
UPDATE jobs SET location = '{"리달미어"}' WHERE id = 1962;
UPDATE jobs SET google_search = 'Smile Meat 리달미어' WHERE id = 1962;

-- ID 1966: location ["시드니"] → 설명에 "Martin Place, Kent Street" 명시 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 1966;
UPDATE jobs SET google_search = 'Bibbs 한식 푸드코트 시드니 CBD' WHERE id = 1966;

-- ID 1969: google_search "콥스하버 브런치카페 캅스 하버" 오타+중복
UPDATE jobs SET google_search = 'Oliver Brown 카페 코프스 하버' WHERE id = 1969;

-- ID 1970: google_search "체리빈 베이커리 웨스트라이드 웨스트 라이드" 중복
UPDATE jobs SET google_search = '체리빈 베이커리 웨스트 라이드' WHERE id = 1970;

-- ID 1972: google_search "타일 시공 뉴캐슬 뉴카슬" 중복 (오타+정식표기)
UPDATE jobs SET google_search = '타일 시공 뉴카슬' WHERE id = 1972;

-- ID 1979: location ["로즈"] but google_search "식당 로즈힐 로즈" 중복/잘못됨
UPDATE jobs SET google_search = '한국식 일식당 로즈' WHERE id = 1979;

-- ID 1981: google_search "피어몬트 시바스키친 채스우드" → 채스우드 잘못됨
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 1981;

-- ID 1985: location ["시드니"] → 설명에 "라우즈힐, 캠벨타운" 두 지점
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 1985;
UPDATE jobs SET google_search = 'Sushi Densha 라우스 힐 캠벨타운' WHERE id = 1985;

-- ID 1987: google_search "타이거 포차 채스우드 차이나타운 헤이마켓" 중복/채스우드 잘못됨
UPDATE jobs SET google_search = '타이거 포차 헤이마켓' WHERE id = 1987;

-- ID 1989: google_search "Sushi Takeaway shop 캐슬힐 카슬힐" 중복/오타
UPDATE jobs SET google_search = 'Sushi Takeaway Castle Towers 카슬힐' WHERE id = 1989;

-- ID 1995: google_search "노포식당 시티 시드니 CBD" 중복
UPDATE jobs SET google_search = '노포식당 시드니 CBD' WHERE id = 1995;

-- ID 1997: google_search "sushi takeaway 센트럴코스트 센트럴 코스트" 중복
UPDATE jobs SET google_search = '스시 테이크어웨이 센트럴 코스트' WHERE id = 1997;

-- ID 1998: location ["라이카트","허스트빌","채스우드","라이드"] - 다지점, 라이드보다 정확히
UPDATE jobs SET location = '{"시드니 CBD","채스우드","허스트빌","라이카트"}' WHERE id = 1998;

-- ID 2010: google_search "식당 이스트우드" → 업체명 추가
UPDATE jobs SET google_search = 'Ten Thousand 이스트우드' WHERE id = 2010;

-- ID 2012: location ["시드니"] → 설명에 "올림픽파크" 명시
UPDATE jobs SET location = '{"올림픽 파크"}' WHERE id = 2012;
UPDATE jobs SET google_search = '시로이오렌지 올림픽 파크' WHERE id = 2012;

-- ID 2017: google_search "Yang san park Korean BBQ 시티 차이나타운 헤이마켓" 중복
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 2017;

-- ID 2028: location ["카슬힐"] → 실제 근무지는 맥쿼리 센터
UPDATE jobs SET location = '{"맥쿼리 파크"}' WHERE id = 2028;
UPDATE jobs SET google_search = '주얼리 매장 맥쿼리 센터 맥쿼리 파크' WHERE id = 2028;

-- ID 2029: google_search "영어 선생님 Collingwood 칼링포드" → Collingwood 잘못됨
UPDATE jobs SET google_search = '영어 선생님 학원 칼링포드' WHERE id = 2029;

-- ID 2034: location [] → 설명에 "스트라 역 2분거리" 명시 → 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2034;
UPDATE jobs SET google_search = '스트라 뷰티샵 스트라스필드' WHERE id = 2034;

-- ID 2036: location [] → 설명에 "카오카오 중식당" but no suburb → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2036;

-- ID 2039: google_search "로즈 코마츠 로즈힐" → 로즈힐은 다른 suburb
UPDATE jobs SET google_search = '코마츠 일식당 로즈' WHERE id = 2039;

-- ID 2045, 2046: location ["시드니"] → 설명에 "Rhodes Station 앞" 명시
UPDATE jobs SET location = '{"로즈"}' WHERE id IN (2045, 2046);
UPDATE jobs SET google_search = '마케팅 직원 로즈' WHERE id IN (2045, 2046);

-- ID 2059: google_search "BLOOM NAIL 시드니 버우드" 중복/시드니 잘못됨
UPDATE jobs SET google_search = 'BLOOM NAIL 버우드' WHERE id = 2059;

-- ID 2062: google_search "채스우드 정육점 Chatswood" 중복
UPDATE jobs SET google_search = '정육점 채스우드' WHERE id = 2062;

-- ID 2063: location ["리버풀"] → 주소 "Liverpool St 시티" → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 2063;
UPDATE jobs SET google_search = 'Kimsunyoung Hair 시드니 CBD' WHERE id = 2063;

-- ID 2065: google_search "진선미 헤어 Sydney CBD 타운홀 시드니 CBD" 중복/영문+한글 중복
UPDATE jobs SET google_search = '진선미 헤어 시드니 CBD' WHERE id = 2065;

-- ID 2067: location [] → 설명에 특정 suburb 없음, 시드니 전역
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2067;

-- ID 2072: location ["울리 크릭"] → 표기 수정 (Wolli Creek = 울리 크릭, 맞음)
-- ID 2073: location [] → 설명에 "Gladesville" 명시
UPDATE jobs SET location = '{"글레이즈빌"}' WHERE id = 2073;

-- ID 2077: location ["시드니"] → 설명에 "Camperdown/Glebe" 명시
UPDATE jobs SET location = '{"캠퍼다운","글리브"}' WHERE id = 2077;
UPDATE jobs SET google_search = 'Dusk 미용실 네일 캠퍼다운' WHERE id = 2077;

-- ID 2078: location ["시드니 CBD"] → 설명에 "Glebe" 명시
UPDATE jobs SET location = '{"글리브"}' WHERE id = 2078;
UPDATE jobs SET google_search = 'Dusk Hair 글리브' WHERE id = 2078;

-- ID 2080: location [] → 설명에 "빅마켓 앞 에쉘" → 시드니 CBD (Big W가 있는 City)
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 2080;
UPDATE jobs SET google_search = '에쉘 미용실 시드니 CBD' WHERE id = 2080;

-- ID 2081: location ["론즈데일"] → 멜버른 Lonsdale St이므로 멜버른 CBD
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 2081;
UPDATE jobs SET google_search = '박봉숙 식당 멜버른 CBD' WHERE id = 2081;

-- ID 2085: location [] → 설명에 "525 little lonsdale st" = 멜버른 CBD
UPDATE jobs SET location = '{"멜버른 CBD"}' WHERE id = 2085;
UPDATE jobs SET google_search = '새마을식당 Paik BBQ 멜버른 CBD' WHERE id = 2085;

-- ID 2088: location ["앨버트 파크"] → Albert Park 맞음, google_search OK
;
