
-- =====================
-- CONTACT 오류
-- =====================

-- ID 2643: location ["콥스하버","그래프턴"] → 표준표기 수정
UPDATE jobs SET location = '{"코프스 하버","그래프턴"}' WHERE id = 2643;

-- ID 2645: location ["채스우드","프렌치스 포레스트"] → 근무지는 프렌치스 포레스트, 채스우드는 통근 언급만
UPDATE jobs SET location = '{"프렌치스 포레스트"}' WHERE id = 2645;
UPDATE jobs SET google_search = '카페 바리스타 프렌치스 포레스트' WHERE id = 2645;

-- ID 2647: google_search "탑라이드 BBQ WANG 라이드" → 라이드 잘못됨
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 2647;

-- ID 2658: location [] → 시드니 전역 청소업체
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2658;
UPDATE jobs SET google_search = '청소 서비스 시드니' WHERE id = 2658;

-- ID 2662: location [] → 설명에 특정 suburb 없음
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2662;
UPDATE jobs SET google_search = '미장 데모도 시드니' WHERE id = 2662;

-- ID 2666: location ["시드니"] → 설명에 "Smithfield" 명시
UPDATE jobs SET location = '{"스미스필드"}' WHERE id = 2666;
UPDATE jobs SET google_search = '돼지 육가공 공장 스미스필드' WHERE id = 2666;

-- ID 2668: location ["시드니"] → 설명에 "뱅스타운 Little Saigon Plaza" 명시
UPDATE jobs SET location = '{"뱅크스타운"}' WHERE id = 2668;
UPDATE jobs SET google_search = 'Hurricane''s grill 뱅크스타운' WHERE id = 2668;

-- ID 2676: google_search "Yang san park Korean BBQ 시티 차이나타운 헤이마켓" 중복
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 2676;

-- ID 2677: location ["로즈"] → 근무지는 채스우드점인데 로즈 추출됨 (다지점이나 제목에 채스우드 명시)
UPDATE jobs SET location = '{"채스우드","로즈"}' WHERE id = 2677;
UPDATE jobs SET google_search = 'Yangga Deli 채스우드' WHERE id = 2677;

-- ID 2683: location ["서리 힐스","보태니"] → "보태니" 오타 → "보타니"
UPDATE jobs SET location = '{"서리 힐스","보타니"}' WHERE id = 2683;

-- ID 2689: location ["캅스 하버"] → 표준: "코프스 하버"
UPDATE jobs SET location = '{"코프스 하버"}' WHERE id = 2689;
UPDATE jobs SET google_search = '브런치 카페 코프스 하버' WHERE id = 2689;

-- ID 2693: google_search "웬포Wentworth point 제페니즈 TE 레스토랑 웬트워스 포인트" 중복/영한혼용
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 2693;

-- ID 2694: google_search "제페니즈 TE 레스토랑 웬포 웬트워스 포인트" 중복
UPDATE jobs SET google_search = 'TE Japanese Dining 웬트워스 포인트' WHERE id = 2694;

-- ID 2701: location ["리드컴"] → 설명에 "Marsden Park" 명시 (픽드랍이 리드컴)
UPDATE jobs SET location = '{"매스든 파크"}' WHERE id = 2701;
UPDATE jobs SET google_search = '초이스 스시 매스든 파크' WHERE id = 2701;

-- ID 2702: google_search "치기공소 노스라이드 노스 라이드" 중복
UPDATE jobs SET google_search = '치기공소 노스 라이드' WHERE id = 2702;

-- ID 2706: google_search "Sparrow s Mill Express 헤이마켓 시드니 CBD" 중복
UPDATE jobs SET google_search = 'Sparrow''s Mill Express 헤이마켓' WHERE id = 2706;

-- ID 2712: google_search "일식 T/A 핫푸드 타운홀 시드니 CBD" 중복
UPDATE jobs SET google_search = '일식 T/A 핫푸드 시드니 CBD' WHERE id = 2712;

-- ID 2714: google_search "카페 캐링바 카링바" 중복
UPDATE jobs SET google_search = '카페 카링바' WHERE id = 2714;

-- ID 2721: contact "0481124789" → 설명에 "0406574030" 명시 (반복적인 sticky 번호)
UPDATE jobs SET contact = '0406574030' WHERE id = 2721;
UPDATE jobs SET google_search = '스시 테이크어웨이 센트럴 코스트' WHERE id = 2721;

-- ID 2724: google_search "한식당 애들레이드 캠시" → 애들레이드 잘못됨
UPDATE jobs SET google_search = '청담 한식당 캠시' WHERE id = 2724;

-- ID 2730: location [] → 설명에 "스트라필드" 명시 → 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2730;

-- ID 2736: location [] → 설명에 "스트라 역 근처" 명시 → 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2736;
UPDATE jobs SET google_search = 'DonDon 스트라스필드' WHERE id = 2736;

-- ID 2744: google_search "피어몬트 시바스키친 글레이즈빌" → 글레이즈빌 잘못됨
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 2744;

-- ID 2746: location ["파라마타","시티 타운홀","웨어하우스"] → "시티 타운홀"은 시드니 CBD, 웨어하우스는 리드컴 인근
UPDATE jobs SET location = '{"라우스 힐","펜리스","마운트 드루이트","시드니 CBD","리드컴","미란다","리버풀"}' WHERE id = 2746;
UPDATE jobs SET google_search = 'Chefs Buffet Korean BBQ 시드니 CBD' WHERE id = 2746;

-- ID 2753: location [] → 설명에 "콥스하버/울굴가" 명시 → 코프스 하버
UPDATE jobs SET location = '{"코프스 하버"}' WHERE id = 2753;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 코프스 하버' WHERE id = 2753;

-- ID 2757: contact "0406371393" → 설명에 "0406371593" 명시 (오타)
UPDATE jobs SET contact = '0406371593' WHERE id = 2757;

-- ID 2758: location [] → 설명에 "채스우드 역에서 픽업" → 채스우드 근방
UPDATE jobs SET location = '{"채스우드"}' WHERE id = 2758;
UPDATE jobs SET google_search = '카페 주방직원 채스우드' WHERE id = 2758;

-- ID 2759: location ["코프스 하버"] → 맞음 ✅

-- ID 2760: location [] → 설명에 suburb 없음, 채스우드 근방으로 보임 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2760;
UPDATE jobs SET google_search = '포장 음식 주방 시드니' WHERE id = 2760;

-- ID 2768: contact "0422290461" → 설명에 "0424 289 700" 명시
UPDATE jobs SET contact = '0424289700' WHERE id = 2768;
UPDATE jobs SET google_search = '시로이오렌지 일식집 올림픽 파크' WHERE id = 2768;

-- ID 2774: contact "0493492045" → 설명에 "0493495045" 명시 (오타)
UPDATE jobs SET contact = '0493495045' WHERE id = 2774;

-- ID 2783: google_search "Wentworth 신사동 꼬꼬치킨 point 로즈" → 근무지는 웬트워스 포인트
UPDATE jobs SET location = '{"웬트워스 포인트"}' WHERE id = 2783;
UPDATE jobs SET google_search = '신사동꼬꼬치킨 웬트워스 포인트' WHERE id = 2783;

-- ID 2784: google_search "명동 노스스트라스필드 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '명동 한식당 노스 스트라스필드' WHERE id = 2784;

-- ID 2800: location [] → 설명에 suburb 없음 (시드니 전역 배송)
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2800;
UPDATE jobs SET google_search = 'SOLUTIONWIDE 배송 시드니' WHERE id = 2800;

-- ID 2806: google_search "AVEDA Salon Gaia Hair 모스만 모즈먼" → 중복
UPDATE jobs SET google_search = 'Gaia Hair Beauty AVEDA 모즈먼' WHERE id = 2806;

-- ID 2809: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2809;
UPDATE jobs SET google_search = '현장 미장 보조 시드니' WHERE id = 2809;

-- ID 2812: google_search "passiontree velvet 카페 캐슬힐 카슬힐" 중복
UPDATE jobs SET google_search = 'passiontree velvet 카슬힐' WHERE id = 2812;

-- ID 2813: google_search "cafe 캐슬힐 카슬힐" 중복
UPDATE jobs SET google_search = 'passiontree velvet cafe 카슬힐' WHERE id = 2813;

-- ID 2818: location [] → 설명에 "Chowon – kew, Melbourne" 명시 → 큐
UPDATE jobs SET location = '{"큐"}' WHERE id = 2818;

-- ID 2821: location [] → 설명에 "서울가든 하이포인트" → 하이포인트는 멜버른 매리비농
UPDATE jobs SET location = '{"매리비농"}' WHERE id = 2821;
UPDATE jobs SET google_search = '서울가든 하이포인트 매리비농' WHERE id = 2821;
;
