
-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 1777: industry 비어있음 → 요식업
UPDATE jobs SET industry = '요식업' WHERE id = 1777;

-- ID 1787: industry 비어있음 → 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 1787;

-- ID 1788: industry 비어있음 → 미용/뷰티업 (속눈썹 연장)
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 1788;

-- ID 1789: industry 비어있음 → 물류/운송업 (드라이버)
UPDATE jobs SET industry = '물류/운송업' WHERE id = 1789;

-- ID 1810: location ["리버풀"] → 실제 주소 "Liverpool st, 시티" → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 1810;

-- =====================
-- CONTACT 오류
-- =====================

-- ID 1831: contact NULL but description has "공431262961" (공 is not a digit, typo for 0)
UPDATE jobs SET contact = '0431262961' WHERE id = 1831;

-- ID 1873: contact "0493492045" but description says "0493495045" → fix typo
UPDATE jobs SET contact = '0493495045' WHERE id = 1873;

-- ID 1878: contact "0422290461" but description says "0424 289 700" → fix
UPDATE jobs SET contact = '0424289700' WHERE id = 1878;

-- ID 1889: contact "0414049616" but description says "0452 644 119" → fix
UPDATE jobs SET contact = '0452644119' WHERE id = 1889;

-- ID 1900: contact "0481124789" but description says "0406574030" → fix
UPDATE jobs SET contact = '0406574030' WHERE id = 1900;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 1889: email "kind1649@icloud.com" but description says "yeongminseo@gmail.com" → fix
UPDATE jobs SET email = 'yeongminseo@gmail.com' WHERE id = 1889;

-- ID 1913: email "hanjames@live.com" but description says "unkles@outlook.com" → fix
UPDATE jobs SET email = 'unkles@outlook.com' WHERE id = 1913;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 1782: location [] → 설명에 "벨모어 근처" 명시
UPDATE jobs SET location = '{"벨모어"}' WHERE id = 1782;

-- ID 1786: location ["시드니"] → 설명에 "라우즈힐, 캠벨타운" 두 지점 명시
UPDATE jobs SET location = '{"라우스 힐","캠벨타운"}' WHERE id = 1786;

-- ID 1787: location [] → World Square 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 1787;

-- ID 1788: location [] → 설명에 "버우드, 시티" 명시
UPDATE jobs SET location = '{"버우드","시드니 CBD"}' WHERE id = 1788;

-- ID 1789: location [] → 설명에 "Kingsgrove" 주소 명시
UPDATE jobs SET location = '{"킹스그로브"}' WHERE id = 1789;

-- ID 1797: location [] → 시드니 전역 청소/마케팅, 시드니 CBD로
UPDATE jobs SET location = '{"시드니"}' WHERE id = 1797;

-- ID 1800: "채스우드에서 버스로 15분" → 버스 경로, 근무지 불명확하나 설명에 챗스우드 언급만 있어 제거
UPDATE jobs SET location = '{}' WHERE id = 1800;

-- ID 1815: location ["시드니"] → 설명에 "뉴잉톤 근접" 명시
UPDATE jobs SET location = '{"뉴잉턴"}' WHERE id = 1815;

-- ID 1818: location ["웨스트 라이드","스트라스필드"] → 주소 "1B Chatham Rd, West Ryde" → 웨스트 라이드만
UPDATE jobs SET location = '{"웨스트 라이드"}' WHERE id = 1818;

-- ID 1828: google_search "더블베이 mibon 더블 베이" 중복 → 수정
UPDATE jobs SET google_search = 'mibon 더블 베이' WHERE id = 1828;

-- ID 1855: location ["디 와이","브룩베일","맨리","프레시워터","나라위나"] - 실제 주소는 Freshwater, 나머지는 인접 지역 언급
UPDATE jobs SET location = '{"프레시워터"}' WHERE id = 1855;

-- ID 1856: 같은 Freshwater 식당
UPDATE jobs SET location = '{"프레시워터"}' WHERE id = 1856;

-- ID 1869: location ["로즈랜드"] → 설명에 "라우즈힐" 명시 (Rouse Hill이 실제 근무지)
UPDATE jobs SET location = '{"라우스 힐"}' WHERE id = 1869;

-- ID 1876: location [] → 설명에 "리버우드 홈살롱" 명시
UPDATE jobs SET location = '{"리버우드"}' WHERE id = 1876;

-- ID 1879: location ["뉴타운"] → 설명에 "뉴잉턴" 명시 (뉴타운과 다른 지역)
UPDATE jobs SET location = '{"뉴잉턴"}' WHERE id = 1879;

-- ID 1881: location ["웨스트 라이드","스트라스필드"] → 설명에 "웨스트라이드 역 근처" 만 명시
UPDATE jobs SET location = '{"웨스트 라이드"}' WHERE id = 1881;

-- ID 1887: location [] → 설명에 "뱅스타운" 명시
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 1887;

-- ID 1894: location ["홈부시"] → 표준 표기 "홈부쉬"
UPDATE jobs SET location = '{"홈부쉬"}' WHERE id = 1894;

-- ID 1878: location ["시드니"] → 설명에 "올림픽파크" 명시
UPDATE jobs SET location = '{"올림픽 파크"}' WHERE id = 1878;

-- ID 1899: location ["로즈베리"] → Rosebery가 맞음, 표기 수정
UPDATE jobs SET location = '{"로즈베리"}' WHERE id = 1899;

-- =====================
-- GOOGLE_SEARCH 오류
-- =====================

-- ID 1779: "탑라이드 BBQ WANG 라이드" → 라이드는 버스 경로, 탑라이드가 근무지
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 1779;

-- ID 1780: "기타 이스트우드" → 업체명 추가
UPDATE jobs SET google_search = 'PC방 Geekstar 이스트우드' WHERE id = 1780;

-- ID 1784: google_search "sushi hotaru Galeries 시드니 CBD" → OK, 유지

-- ID 1785: "스시테이커웨이 Warriewood 디 와이" → 근무지는 워리우드
UPDATE jobs SET google_search = '스시테이크어웨이 워리우드' WHERE id = 1785;

-- ID 1792: "요식업 이스트우드" → 업체명 추가
UPDATE jobs SET google_search = '이스트우드 대형 횟집 이스트우드' WHERE id = 1792;

-- ID 1795: "청소/환경미화업 시드니 CBD" → 업체명 추가
UPDATE jobs SET google_search = 'Geekstar 피시방 청소 시드니 CBD' WHERE id = 1795;

-- ID 1796: "기타 시드니 CBD" → 업체명 추가
UPDATE jobs SET google_search = 'Geekstar 피시방 야간 시드니 CBD' WHERE id = 1796;

-- ID 1798: "청소/환경미화업 서리힐스 서리 힐스" 중복
UPDATE jobs SET google_search = '청소 서리 힐스' WHERE id = 1798;

-- ID 1799: "청소/환경미화업 Eastern Area 뉴타운" → 업종명 제거
UPDATE jobs SET google_search = '스트라타 청소 뉴타운' WHERE id = 1799;

-- ID 1805: "청소/환경미화업 스트라스필드" → 업종명 제거
UPDATE jobs SET google_search = '스트라타 청소 스트라스필드' WHERE id = 1805;

-- ID 1809: "요식업 채스우드" → 업체명 추가
UPDATE jobs SET google_search = '선데이서울 채스우드' WHERE id = 1809;

-- ID 1817: "요식업 어밍톤" → 업체명 추가
UPDATE jobs SET google_search = '삼시세끼 어밍톤' WHERE id = 1817;

-- ID 1818: "Stoneage Korean BBQ 웨스트라이드 웨스트 라이드" 중복
UPDATE jobs SET google_search = 'Stoneage Korean BBQ 웨스트 라이드' WHERE id = 1818;

-- ID 1821: "제조/기술업 로즈" → 업체명 추가
UPDATE jobs SET google_search = '밋앤델리 정육점 로즈' WHERE id = 1821;

-- ID 1823: "Mattina 콘코드 웨스트 콩코드" 중복/오타
UPDATE jobs SET google_search = 'Mattina Cafe 콩코드 웨스트' WHERE id = 1823;

-- ID 1827: "요식업 카슬힐" → 업체명 추가
UPDATE jobs SET google_search = 'Rokyo Sushi Bar 카슬힐' WHERE id = 1827;

-- ID 1829: "요식업 채스우드" → 업체명 추가
UPDATE jobs SET google_search = '채스우드 주막' WHERE id = 1829;

-- ID 1839: "Sushi Takeaway shop 캐슬힐 카슬힐" 중복/오타
UPDATE jobs SET google_search = 'Sushi Takeaway Castle Towers 카슬힐' WHERE id = 1839;

-- ID 1844: "봄봄 샐러드 바 모스만 모즈먼" 중복
UPDATE jobs SET google_search = '봄봄 Bombom 모즈먼' WHERE id = 1844;

-- ID 1858: "명동 노스스트라스필드 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '한식당 명동 노스 스트라스필드' WHERE id = 1858;

-- ID 1862: "요식업 이스트우드" → 업체명 없음
UPDATE jobs SET google_search = '이스트우드 한식당' WHERE id = 1862;

-- ID 1865: "Chefs Buffet Korean BBQ 시드니 CBD 타운홀" 중복
UPDATE jobs SET google_search = 'Chefs Buffet Korean BBQ 시드니 CBD' WHERE id = 1865;

-- ID 1866: "청소/환경미화업 채스우드" → 업종명 제거
UPDATE jobs SET google_search = 'Chase 명품샵 청소 채스우드' WHERE id = 1866;

-- ID 1874: "리드컴 Chatswood" → 채스우드는 잘못됨, 리드컴 카페
UPDATE jobs SET google_search = '카페 리드컴' WHERE id = 1874;

-- ID 1875: "Woolgoolga 코프스 하버" 중복 정보
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 코프스 하버' WHERE id = 1875;

-- ID 1879: suburb 수정 (뉴잉턴으로 location 바꿨으므로)
UPDATE jobs SET google_search = '미용실 뉴잉턴' WHERE id = 1879;

-- ID 1881: suburb 수정
UPDATE jobs SET google_search = 'Nail Station 웨스트 라이드' WHERE id = 1881;

-- ID 1884: "후레쉬아시아나나 마트 메도뱅크 메도우뱅크" 오타+중복
UPDATE jobs SET google_search = '후레쉬아시아나 마트 메도우뱅크' WHERE id = 1884;

-- ID 1890: 너무 길고 중복
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 코프스 하버' WHERE id = 1890;

-- ID 1894: suburb 수정
UPDATE jobs SET google_search = '시드니장어 홈부쉬' WHERE id = 1894;

-- ID 1895: "It s corn 버우드 차이나타운 헤이마켓" - 버우드는 잘못됨(버우드 차이나타운 = 헤이마켓)
UPDATE jobs SET google_search = 'It''s Corn 헤이마켓' WHERE id = 1895;

-- ID 1921: "BBQ Code Doncaster East 큐 돈캐스터" → 큐는 잘못됨
UPDATE jobs SET google_search = 'BBQ Code 돈캐스터 이스트' WHERE id = 1921;

-- ID 1922: 너무 길고 중복
UPDATE jobs SET google_search = '마사지샵 오클리' WHERE id = 1922;

-- ID 1928: "BBQ CODE 글렌 웨이버리 웨이벌리" 오타+중복
UPDATE jobs SET google_search = 'BBQ CODE 글렌 웨이벌리' WHERE id = 1928;
;
