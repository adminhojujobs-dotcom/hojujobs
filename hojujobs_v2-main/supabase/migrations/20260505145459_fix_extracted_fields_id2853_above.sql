
-- =====================
-- CONTACT 오류
-- =====================

-- ID 2887: contact "0406371393" → 설명에 "0406371593" 명시 (오타)
UPDATE jobs SET contact = '0406371593' WHERE id = 2887;

-- ID 2896: contact "0414223700" → 설명에 "0403 139 852" 명시 → fix
UPDATE jobs SET contact = '0403139852' WHERE id = 2896;

-- ID 2937: contact "0493492045" → 설명에 "0493495045" 명시 (오타)
UPDATE jobs SET contact = '0493495045' WHERE id = 2937;

-- ID 2976: contact "0481124789" → 설명에 "0406574030" 명시 (sticky 번호)
UPDATE jobs SET contact = '0406574030' WHERE id = 2976;

-- ID 3008: contact "0422290461" → 설명에 "0424 289 700" 명시
UPDATE jobs SET contact = '0424289700' WHERE id = 3008;

-- ID 3009: contact "0410510068" → 설명에 "0401 510 068" 명시 (digits transposed)
UPDATE jobs SET contact = '0401510068' WHERE id = 3009;

-- =====================
-- EMAIL 오류
-- =====================

-- ID 2856: email NULL 맞음 (이메일 없음, 이력서를 이메일로만 - 없음)
-- ID 2940: email "hyuna@leftofifeld.com.au" → 설명에 "hyuna@leftoffield.com.au" (오타)
UPDATE jobs SET email = 'hyuna@leftoffield.com.au' WHERE id = 2940;

-- ID 3020: email "info.lerooftop@gmail.com" → 설명에 "Acc.lerooftop@gmail.com" → fix
UPDATE jobs SET email = 'Acc.lerooftop@gmail.com' WHERE id = 3020;

-- =====================
-- LOCATION 오류
-- =====================

-- ID 2860: location ["캐브라마타"] → 표준: "캐브라마타" (올바름 ✅)

-- ID 2863: location ["뉴타운","매랙빌","시덴햄"] → "매랙빌" 오타 → "매릭빌", "시덴햄" → "시드넘"
UPDATE jobs SET location = '{"뉴타운","매릭빌","시드넘"}' WHERE id = 2863;
UPDATE jobs SET google_search = 'Pickled Monkey 시드넘' WHERE id = 2863;

-- ID 2864: google_search "초심 뉴잉톤 뉴잉턴" 중복 → 수정
UPDATE jobs SET google_search = '초심 뉴잉턴' WHERE id = 2864;

-- ID 2865: location ["채스우드","프렌치스 포레스트"] → 근무지는 프렌치스 포레스트, 채스우드는 통근 언급
UPDATE jobs SET location = '{"프렌치스 포레스트"}' WHERE id = 2865;
UPDATE jobs SET google_search = 'Equinox 카페 프렌치스 포레스트' WHERE id = 2865;

-- ID 2873: location [] → 설명에 "버큼힐 쇼핑센터" 명시 → 버큼힐
UPDATE jobs SET location = '{"버큼힐"}' WHERE id = 2873;
UPDATE jobs SET google_search = '브런치 카페 버큼힐' WHERE id = 2873;

-- ID 2875: location ["서리 힐스","보태니"] → "보태니" → "보타니"
UPDATE jobs SET location = '{"서리 힐스","보타니"}' WHERE id = 2875;

-- ID 2878: location ["혼스비","세인트 아이브스"] → 주소 "213a Monavale rd St Ives" → 세인트 아이브스만
UPDATE jobs SET location = '{"세인트 아이브스"}' WHERE id = 2878;
UPDATE jobs SET google_search = 'T/A 스시가게 세인트 아이브스' WHERE id = 2878;

-- ID 2879: google_search "스시샵 글레이브 글리브" 오타+중복
UPDATE jobs SET google_search = 'Sushi Gen 글리브' WHERE id = 2879;

-- ID 2880: location ["시드니"] → 설명에 "Sydney Airport" 명시 → 마스콧
UPDATE jobs SET location = '{"마스콧"}' WHERE id = 2880;
UPDATE jobs SET google_search = 'Hikari Ramen Donburi 시드니 공항 마스콧' WHERE id = 2880;

-- ID 2891: location ["콥스하버"] → 표준: "콥스 하버"
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 2891;
UPDATE jobs SET google_search = '브런치 카페 콥스 하버' WHERE id = 2891;

-- ID 2897: location [] → 제목에 "노스스트라" 명시 → 노스 스트라스필드
UPDATE jobs SET location = '{"노스 스트라스필드"}' WHERE id = 2897;
UPDATE jobs SET google_search = 'Su hair 노스 스트라스필드' WHERE id = 2897;

-- ID 2902: location ["웨스트필드","웨어하우스"] → 잘못됨. 실제 지점: 라우스힐,펜리스,마운트드루이트,시드니CBD,미란다,리버풀,리드컴
UPDATE jobs SET location = '{"라우스 힐","펜리스","마운트 드루이트","시드니 CBD","미란다","리버풀","리드컴"}' WHERE id = 2902;
UPDATE jobs SET google_search = 'Chefs Buffet Korean BBQ 라우스 힐' WHERE id = 2902;

-- ID 2910: google_search "Yang san park Korean BBQ 시티 차이나타운 헤이마켓" 중복
UPDATE jobs SET google_search = 'Yang san park Korean BBQ 헤이마켓' WHERE id = 2910;

-- ID 2919: google_search "노스라이드 한식당 노스 라이드" 중복
UPDATE jobs SET google_search = '한식당 노스 라이드' WHERE id = 2919;

-- ID 2922: google_search "체리브룩 일식당 채스우드" → 채스우드 잘못됨
UPDATE jobs SET google_search = '체리브룩 일식당' WHERE id = 2922;

-- ID 2923: google_search "Sparrow s Mill Express 헤이마켓 시드니 CBD" 중복
UPDATE jobs SET google_search = 'Sparrow''s Mill Express 헤이마켓' WHERE id = 2923;

-- ID 2924: google_search "탑라이드 BBQ WANG 라이드" → 라이드 잘못됨
UPDATE jobs SET google_search = 'BBQ WANG 탑라이드' WHERE id = 2924;

-- ID 2925: google_search "The Bunsik Burger 서리힐스 서리 힐스" 중복
UPDATE jobs SET google_search = 'The Bunsik Burger 서리 힐스' WHERE id = 2925;

-- ID 2935: location ["코프스 하버"] → "콥스 하버"로 통일
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 2935;
UPDATE jobs SET google_search = '브런치 카페 콥스 하버' WHERE id = 2935;

-- ID 2936: google_search "키친핸드 킹스 크로스 킹스크로스" 중복
UPDATE jobs SET google_search = '키친핸드 킹스크로스' WHERE id = 2936;

-- ID 2947: google_search "daytime cleaner 노스시드니 노스 시드니" 중복
UPDATE jobs SET google_search = 'daytime cleaner 노스 시드니' WHERE id = 2947;

-- ID 2953: google_search "피어몬트 시바스키친 채스우드" → 채스우드 잘못됨
UPDATE jobs SET google_search = '시바스키친 피어몬트' WHERE id = 2953;

-- ID 2962: google_search "Gyuniku 차이나타운 헤이마켓" 중복 → 차이나타운 제거
UPDATE jobs SET google_search = 'Gyuniku 헤이마켓' WHERE id = 2962;

-- ID 2964: location ["리버풀"] → 설명에 "Liverpool st" = 시드니 CBD 거리명
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 2964;
UPDATE jobs SET google_search = 'Kimsunyoung Hair 시드니 CBD' WHERE id = 2964;

-- ID 2966: google_search "종로화로 North 노스 스트라스필드" 중복
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 2966;

-- ID 2972: email "girrween.mgmt1@gmail.com" → 설명에 "Girraween.mgmt1@tilemarket.com.au" 명시
UPDATE jobs SET email = 'Girraween.mgmt1@tilemarket.com.au' WHERE id = 2972;

-- ID 2973: location ["윈스턴 힐스"] → 설명에 "winston hill" → 윈스턴 힐스 맞음 ✅

-- ID 2975: location [] → 설명에 suburb 없음 → 시드니
UPDATE jobs SET location = '{"시드니"}' WHERE id = 2975;
UPDATE jobs SET google_search = '일식 T/A 스시 시드니' WHERE id = 2975;

-- ID 2976: google_search "sushi takeaway 센트럴코스트 센트럴 코스트" 중복
UPDATE jobs SET google_search = '스시 테이크어웨이 센트럴 코스트' WHERE id = 2976;

-- ID 2980: google_search "2135Vibe 스트래필드 스트라스필드" 오타+중복
UPDATE jobs SET google_search = '2135 Vibe 스트라스필드' WHERE id = 2980;

-- ID 2981: location ["시드니 CBD"] → 설명에 "스트라스필드" 명시 → 스트라스필드
UPDATE jobs SET location = '{"스트라스필드"}' WHERE id = 2981;
UPDATE jobs SET google_search = '2135 vibe 스트라스필드' WHERE id = 2981;

-- ID 2983: google_search "홍대포차 홍대 치펜데일" → 홍대 제거
UPDATE jobs SET google_search = '홍대포차 치펜데일' WHERE id = 2983;

-- ID 2993: location ["채스우드"] → 설명에 "Forestville" 명시 → 포레스트빌
UPDATE jobs SET location = '{"포레스트빌"}' WHERE id = 2993;
UPDATE jobs SET google_search = 'Brewscape 카페 포레스트빌' WHERE id = 2993;

-- ID 2995: location ["시드니 CBD"] → 설명에 "Drummoyne" 명시 → 드러모인
UPDATE jobs SET location = '{"드러모인"}' WHERE id = 2995;
UPDATE jobs SET google_search = '일식당 드러모인' WHERE id = 2995;

-- ID 3005: location ["시드니 CBD"] → 설명에 "North Strathfield" 명시 → 노스 스트라스필드
UPDATE jobs SET location = '{"노스 스트라스필드"}' WHERE id = 3005;
UPDATE jobs SET google_search = '종로화로 노스 스트라스필드' WHERE id = 3005;

-- ID 3010: google_search "타일/페이빙 건설" → 너무 일반적, suburb 없음
UPDATE jobs SET google_search = '타일 페이빙 기술자 시드니' WHERE id = 3010;
UPDATE jobs SET location = '{"시드니"}' WHERE id = 3010;

-- ID 3021: location ["리브즈비"] → 표준: "레브즈비" (Revesby)
UPDATE jobs SET location = '{"레브즈비"}' WHERE id = 3021;
UPDATE jobs SET google_search = 'OIL RIGHT 레브즈비' WHERE id = 3021;

-- ID 3024: google_search "웨스트라이드 서울헤어 웨스트 라이드" 중복
UPDATE jobs SET google_search = '서울헤어 웨스트 라이드' WHERE id = 3024;

-- ID 3028: google_search "BLUE36 CAFE 노스시드니 노스 시드니" 중복
UPDATE jobs SET google_search = 'BLUE36 CAFE 노스 시드니' WHERE id = 3028;

-- ID 3031: location ["채스우드","린필드"] → 설명에 "웨스트린필드에 위치" → 린필드 (린필드 서쪽)
UPDATE jobs SET location = '{"린필드"}' WHERE id = 3031;
UPDATE jobs SET google_search = '바리스타 로컬 카페 린필드' WHERE id = 3031;

-- ID 3049: google_search "BBQ Code 글렌 웨이버리 웨이벌리" 중복
UPDATE jobs SET google_search = 'BBQ Code 글렌 웨이벌리' WHERE id = 3049;

-- ID 3055: location [] → 설명에 "Woolgoolga NSW" 명시 → 콥스 하버
UPDATE jobs SET location = '{"콥스 하버"}' WHERE id = 3055;
UPDATE jobs SET google_search = '라즈베리 블랙베리 농장 콥스 하버' WHERE id = 3055;

-- ID 3056: location [] → 설명에 "158 High St, Kew" 명시 → 큐
UPDATE jobs SET location = '{"큐"}' WHERE id = 3056;
UPDATE jobs SET google_search = 'Guljak Rhapsody 큐' WHERE id = 3056;

-- =====================
-- INDUSTRY 오류
-- =====================

-- ID 2853: 농장 모집 → industry "기타" 맞음 ✅
-- ID 2857: 떡 배달 → industry "물류/운송업" 맞음 ✅
-- ID 2901: 캔버라 타일 → industry "건설/시공업" 맞음 ✅

-- ID 3001: "jennys house 디자이너" → 미용/뷰티업 (기타 아님)
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 3001;

-- ID 3021: "oil right" 일반 현장직 → 건설/시공업 맞음 ✅
;
