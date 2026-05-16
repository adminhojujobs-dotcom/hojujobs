
-- =====================
-- CONTACT 오류
-- =====================

-- ID 2090: email "cyce0921@naver.com" 맞지만 설명에는 "Cyce0921@gmail.com" → gmail로 수정
UPDATE jobs SET email = 'cyce0921@gmail.com' WHERE id = 2090;

-- ID 2112: contact "0481124789" → 설명에 "0406574030" 명시 → fix
UPDATE jobs SET contact = '0406574030' WHERE id = 2112;

-- ID 2114: contact "0493492045" → 설명에 "0493495045" (오타) → fix
UPDATE jobs SET contact = '0493495045' WHERE id = 2114;

-- ID 2210, 2211: 두 번호 중 설명에 "0449766400" / "0414201609" → 두번째가 contact에, 첫번째도 있음. 첫번째 더 앞에 있음
UPDATE jobs SET contact = '0449766400' WHERE id IN (2210, 2211);

-- ID 2248: contact "0406371393" → 설명에 "0406371593" (오타) → fix
UPDATE jobs SET contact = '0406371593' WHERE id = 2248;

-- ID 2274: contact NULL, 설명에 전화번호 없음 (카톡/왓츠앱만 있음) → 맞음

-- =====================
-- EMAIL 오류
-- =====================

-- ID 2249: email "sshr48@naver.com" but 설명에 "gymye060919@gmail.com" 먼저 나옴
-- ID 2249 contact "0423843881" 이 설명에 두번째 번호, 첫번째는 "0404194559" → 더 먼저 나오는 번호
UPDATE jobs SET contact = '0404194559' WHERE id = 2249;

-- ID 2251: email "sshr48@naver.com" but location should be 헌터스 힐 not 시드니 CBD
UPDATE jobs SET location = '{"헌터스 힐"}' WHERE id = 2251;
UPDATE jobs SET google_search = '일식 핫푸드 쉐프 헌터스 힐' WHERE id = 2251;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 2094: location [] → 타일/페이빙 구인, 시드니 광역 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2094;
UPDATE jobs SET google_search = '타일/페이빙 기술자 시드니' WHERE id = 2094;

-- ID 2097: location [] → 설명에 특정 suburb 없음, 갯바위 식당 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2097;
UPDATE jobs SET google_search = '갯바위 주방 시드니' WHERE id = 2097;

-- ID 2098: location [] → 설명에 특정 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2098;
UPDATE jobs SET google_search = '한식 주방 시드니' WHERE id = 2098;

-- ID 2107: location ["크로눌라","울루워"] → 실제 주소 "453A Captain Cook Dr" = Woolooware → 울루워라
UPDATE jobs SET location = '{"울루워라"}' WHERE id = 2107;
UPDATE jobs SET google_search = '스시 테이크어웨이 울루워라' WHERE id = 2107;

-- ID 2109: google_search "체리빈 베이커리 웨스트라이드 웨스트 라이드" 중복
UPDATE jobs SET google_search = '체리빈 베이커리 웨스트 라이드' WHERE id = 2109;

-- ID 2110: google_search "탑라이드 BBQ WANG 라이드" → 라이드 잘못됨
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 2110;

-- ID 2112: google_search "스시 T/A샵 센트럴코스트 센트럴 코스트" 중복
UPDATE jobs SET google_search = '스시 T/A샵 센트럴 코스트' WHERE id = 2112;

-- ID 2117: google_search "명동 노스스트라스필드 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '한식당 명동 노스 스트라스필드' WHERE id = 2117;

-- ID 2120: google_search "Sushi Takeaway shop 캐슬힐 카슬힐" 중복/오타
UPDATE jobs SET google_search = 'Sushi Takeaway Castle Towers 카슬힐' WHERE id = 2120;

-- ID 2122: location ["콥스하버"] → 표준 표기 "코프스 하버"
UPDATE jobs SET location = '{"코프스 하버"}' WHERE id = 2122;
UPDATE jobs SET google_search = '브런치 카페 코프스 하버' WHERE id = 2122;

-- ID 2124: location ["시드니 CBD"] → 설명에 "스트라 역 2분거리" = 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2124;
UPDATE jobs SET google_search = '스트라 뷰티샵 스트라스필드' WHERE id = 2124;

-- ID 2146: location ["시드니"] → 설명에 "라우즈힐, 캠벨타운" 두 지점
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 2146;
UPDATE jobs SET google_search = 'Sushi Densha 라우스 힐 캠벨타운' WHERE id = 2146;

-- ID 2147: location [] → 설명에 "노스스트라" 명시 → 노스 스트라스필드
UPDATE jobs SET location = '{"노스 스트라스필드"}' WHERE id = 2147;
UPDATE jobs SET google_search = '한식당 명동 노스 스트라스필드' WHERE id = 2147;

-- ID 2149: google_search "제페니즈 TE 레스토랑 Wentworth Point 웬트워스 포인트" 중복/영한 혼용
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 2149;

-- ID 2150: location ["블랙타운","리드컴"] → 리드컴은 픽업 장소, 실제 근무지는 블랙타운 근처
UPDATE jobs SET location = '{"블랙타운"}' WHERE id = 2150;
UPDATE jobs SET google_search = '식당 청소 블랙타운' WHERE id = 2150;

-- ID 2152: google_search "타일링 작업 글레이즈빌 리드컴" → 글레이즈빌은 잘못됨 (리드컴 픽업)
UPDATE jobs SET google_search = '타일링 리드컴' WHERE id = 2152;

-- ID 2167: google_search "스시샵 글레이브 글리브" 오타 (글레이브 → 글리브)
UPDATE jobs SET google_search = '스시 Gen 글리브' WHERE id = 2167;

-- ID 2172: google_search "Rakuen Japanese Restaurant 리처드 라이카트" 오타(리처드)
UPDATE jobs SET google_search = 'Rakuen Japanese Restaurant 라이카트' WHERE id = 2172;

-- ID 2182: location [] → 설명에 "스트라필드점" 명시 → 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2182;
UPDATE jobs SET google_search = '로이드밤헤어 스트라스필드' WHERE id = 2182;

-- ID 2200: location ["리드컴"] → 근무지는 뱅크스타운 (Little Saigon Plaza), 리드컴은 거리 언급
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 2200;
UPDATE jobs SET google_search = 'KMALL09 뱅크스타운' WHERE id = 2200;

-- ID 2209: location ["시드니"] → 설명에 "15-17 Blaxland Road Rhodes" 명시 → 로즈
UPDATE jobs SET location = '{"로즈"}' WHERE id = 2209;
UPDATE jobs SET google_search = 'Australian College of Professional Careers 로즈' WHERE id = 2209;

-- ID 2213: location ["시드니"] → 설명에 "뉴잉톤 근접" 명시 → 뉴잉턴
UPDATE jobs SET location = '{"뉴잉턴"}' WHERE id = 2213;
UPDATE jobs SET google_search = 'KoFood 배송 뉴잉턴' WHERE id = 2213;

-- ID 2223: google_search "Mattina 콘코드 웨스트 콩코드" 중복
UPDATE jobs SET google_search = 'Mattina Cafe 콩코드 웨스트' WHERE id = 2223;

-- ID 2224: google_search "Stoneage Korean BBQ 웨스트라이드 웨스트 라이드" 중복
UPDATE jobs SET google_search = 'Stoneage Korean BBQ 웨스트 라이드' WHERE id = 2224;

-- ID 2229: location ["홈부쉬"] → 설명에 "근무지: 피어몬트" 명시 → 피어몬트
UPDATE jobs SET location = '{"피어몬트"}' WHERE id = 2229;
UPDATE jobs SET google_search = '호주 여행사 피어몬트' WHERE id = 2229;

-- ID 2237: google_search "식당 로즐랜즈 로즈랜드" 오타+중복
UPDATE jobs SET google_search = '야간 청소 라우스 힐' WHERE id = 2237;
-- 설명에 "라우즈힐 식당" 명시, location은 로즈랜드가 잘못됨
UPDATE jobs SET location = '{"라우스 힐"}' WHERE id = 2237;

-- ID 2239: location [] → 설명에 "노던비치" 명시
UPDATE jobs SET location = '{"노던 비치"}' WHERE id = 2239;
UPDATE jobs SET google_search = '노던비치 스시숍' WHERE id = 2239;

-- ID 2241: contact "0422290461" → 설명에 "0424 289 700" → fix
UPDATE jobs SET contact = '0424289700' WHERE id = 2241;

-- ID 2249: location ["시드니 CBD"] → 설명에 "Hunters Hill" 명시
-- already fixed above for 2251, same restaurant
-- ID 2250: location ["탑라이드","채스우드","헌터스 힐"] → 탑라이드/채스우드는 버스 경로, 근무지는 헌터스 힐
UPDATE jobs SET location = '{"헌터스 힐"}' WHERE id = 2250;
UPDATE jobs SET google_search = '일식 핫푸드 헌터스 힐' WHERE id = 2250;

-- ID 2264: location ["로즈"] → 설명에 "15-17 Blaxland Road Rhodes" 맞음, OK

-- ID 2271: location ["리버풀"] → Liverpool St = 시드니 CBD 거리명 → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 2271;
UPDATE jobs SET google_search = 'Kimsunyoung Hair 시드니 CBD' WHERE id = 2271;

-- ID 2274: location ["사우스뱅크"] → 멜버른 사우스뱅크 맞음, OK

-- ID 2277: location ["엔디버 힐"] → 표준: "엔데버 힐스" 
UPDATE jobs SET location = '{"엔데버 힐스"}' WHERE id = 2277;
UPDATE jobs SET google_search = 'BBQ-K 엔데버 힐스' WHERE id = 2277;

-- ID 2283: location ["오피서"] → 근무지는 채드스톤 (Chadstone)
UPDATE jobs SET location = '{"채드스톤"}' WHERE id = 2283;
UPDATE jobs SET google_search = '하나로마트 Chadstone 채드스톤' WHERE id = 2283;

-- ID 2207: location ["본다이 정션"] → 설명에 "본다이정션, 와링가몰" 두 지점
UPDATE jobs SET location = '{"본다이 정션","워링가"}' WHERE id = 2207;
UPDATE jobs SET google_search = '한식분식 본다이 정션 워링가몰' WHERE id = 2207;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 2096, 2119: 우버이츠 배달 → 물류/운송업 맞음 ✅
-- ID 2098: 돌봄기관 한식주방 → 요식업 맞음 ✅
-- ID 2123: 교육기관 마케팅 → 기타 맞음 ✅
-- ID 2182: 미용/뷰티업 맞음 ✅
-- ID 2229: 여행사 어드민 → 기타 맞음 ✅
-- ID 2230: 면세점 어드민 → 기타가 더 맞음 (판매업이 아닌 사무직)
UPDATE jobs SET industry = '기타' WHERE id = 2230;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 2089: "고든 스시하우스 익스프레스 스시 치킨" → 업체명 정리
UPDATE jobs SET google_search = 'Sushi House Express 고든' WHERE id = 2089;

-- ID 2090: "고든 일식테이크에웨이" → 업체명 없음, 오타
UPDATE jobs SET google_search = '일식 테이크어웨이 고든' WHERE id = 2090;

-- ID 2091: google_search 이미 OK ✅

-- ID 2132: "Yang san park Korean BBQ 시티 차이나타운 헤이마켓" 중복
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 2132;

-- ID 2153: google_search "농장 울굴가 코프스하버 코프스 하버" 중복
UPDATE jobs SET google_search = '베리 농장 코프스 하버' WHERE id = 2153;

-- ID 2158: google_search "홍대포차 홍대 치펜데일" → 홍대 제거
UPDATE jobs SET google_search = '홍대포차 치펜데일' WHERE id = 2158;

-- ID 2178: google_search "Sparrow s Mill Express 헤이마켓 시드니 CBD" 중복
UPDATE jobs SET google_search = 'Sparrow s Mill Express 헤이마켓' WHERE id = 2178;

-- ID 2206: google_search "타이거 포차 시티 차이나타운 헤이마켓" 중복
UPDATE jobs SET google_search = '타이거 포차 헤이마켓' WHERE id = 2206;

-- ID 2234: google_search "호텔 하우스키핑 노스시드니 노스 시드니" 중복
UPDATE jobs SET google_search = '호텔 하우스키핑 노스 시드니' WHERE id = 2234;

-- ID 2243: google_search "칸지 리드콤 리드컴" 중복/오타 (리드콤 → 리드컴)
UPDATE jobs SET google_search = '칸지 리드컴' WHERE id = 2243;

-- ID 2258: google_search "It s corn 버우드 차이나타운 헤이마켓" 중복/버우드 잘못됨
UPDATE jobs SET google_search = 'It''s Corn 헤이마켓' WHERE id = 2258;

-- ID 2261: google_search "라즈베리 픽킹 콥스 하버" → 표준 표기
UPDATE jobs SET google_search = '라즈베리 픽킹 코프스 하버' WHERE id = 2261;

-- ID 2268: google_search "타일 데모도 중간기술자 기술자 그라우터 시드니" → 너무 김
UPDATE jobs SET google_search = '타일 데모도 기술자 시드니' WHERE id = 2268;

-- ID 2272: location ["리드컴","본다이"] → 본다이는 잘못됨 (설명에 없음), Lidcombe/Silverwater가 회사 주소
UPDATE jobs SET location = '{"리드컴"}' WHERE id = 2272;
UPDATE jobs SET google_search = '태양광 소방전기 리드컴' WHERE id = 2272;

-- ID 2273: location ["이스트우드","레인 코브","채스우드"] → 설명에 여러 지점, 맞음 ✅

-- ID 2283: already fixed location above

-- ID 2288: google_search "마사지샵 east 오클리" → 표준화
UPDATE jobs SET google_search = '마사지샵 오클리 이스트' WHERE id = 2288;

-- ID 2293: google_search "블랙베리 라즈베리 농장 울굴가" → suburb 없음
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 코프스 하버' WHERE id = 2293;

-- ID 2235: contact "0296301937" → 9자리 번호, 아마 02-9630-1937 (전화번호) → OK (유선)
-- ID 2235: location ["리달미어"] → 설명에 "Rydalmere" 맞음 ✅
;
