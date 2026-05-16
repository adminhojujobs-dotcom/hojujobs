
-- ===== LOCATION → 표준 호주 suburb 영문명 =====
UPDATE jobs SET location = array_replace(location, '노스 쇼어',       'North Sydney');
UPDATE jobs SET location = array_replace(location, '노스 시드니',      'North Sydney');
UPDATE jobs SET location = array_replace(location, '노웨스트',         'Norwest');
UPDATE jobs SET location = array_replace(location, '뉴잉턴',          'Newington');
UPDATE jobs SET location = array_replace(location, '뉴잉톤',          'Newington');
UPDATE jobs SET location = array_replace(location, '뉴타운',          'Newtown');
UPDATE jobs SET location = array_replace(location, '라우스 힐',        'Rouse Hill');
UPDATE jobs SET location = array_replace(location, '라이드',          'Ryde');
UPDATE jobs SET location = array_replace(location, '로즈',            'Rhodes');
UPDATE jobs SET location = array_replace(location, '리드컴',          'Lidcombe');
UPDATE jobs SET location = array_replace(location, '메도우뱅크',       'Meadowbank');
UPDATE jobs SET location = array_replace(location, '사우스 허스트빌',   'South Hurstville');
UPDATE jobs SET location = array_replace(location, '세인트 아이브스',   'St Ives');
UPDATE jobs SET location = array_replace(location, '센트럴 코스트',     'Central Coast');
UPDATE jobs SET location = array_replace(location, '스탠호프 가든스',   'Stanhope Gardens');
UPDATE jobs SET location = array_replace(location, '스트라스필드',      'Strathfield');
UPDATE jobs SET location = array_replace(location, '시드니 CBD',       'Sydney CBD');
UPDATE jobs SET location = array_replace(location, '시드니 시티',       'Sydney CBD');
UPDATE jobs SET location = array_replace(location, '시드니',           'Sydney CBD');
UPDATE jobs SET location = array_replace(location, '실버워터',         'Silverwater');
UPDATE jobs SET location = array_replace(location, '에핑',            'Epping');
UPDATE jobs SET location = array_replace(location, '워리우드',         'Warrawee');
UPDATE jobs SET location = array_replace(location, '웨스트 라이드',     'West Ryde');
UPDATE jobs SET location = array_replace(location, '이스트우드',        'Eastwood');
UPDATE jobs SET location = array_replace(location, '차이나타운',        'Haymarket');
UPDATE jobs SET location = array_replace(location, '채스우드',         'Chatswood');
UPDATE jobs SET location = array_replace(location, '체스우드',         'Chatswood');
UPDATE jobs SET location = array_replace(location, '체리브룩',         'Cherrybrook');
UPDATE jobs SET location = array_replace(location, '캠벨타운',         'Campbelltown');
UPDATE jobs SET location = array_replace(location, '켈리빌',          'Kellyville');
UPDATE jobs SET location = array_replace(location, '킹스크로스',       'Kings Cross');
UPDATE jobs SET location = array_replace(location, '탑라이드',         'Top Ryde');
UPDATE jobs SET location = array_replace(location, '파라마타',         'Parramatta');
UPDATE jobs SET location = array_replace(location, '허스트빌',         'Hurstville');
UPDATE jobs SET location = array_replace(location, '헤이마켓',         'Haymarket');
UPDATE jobs SET location = array_replace(location, '하임아켓',         'Haymarket');
UPDATE jobs SET location = array_replace(location, '혼스비',          'Hornsby');
UPDATE jobs SET location = array_replace(location, '수지',            'Sushi');

-- ===== INDUSTRY 통합 =====

-- 청소 관련 통합
UPDATE jobs SET industry = '청소업'
WHERE industry IN ('청소 서비스', '청소/미화', '청소 서비스업', '청소/환경관리', '청소/환경미화', '청소/시설 관리', '청소/청소 용역');

-- 건설/인테리어 통합
UPDATE jobs SET industry = '건설/인테리어'
WHERE industry IN ('건축/인테리어', '타일 시공/인테리어', '도장/페인팅 작업');

-- 미용 통합
UPDATE jobs SET industry = '미용/뷰티'
WHERE industry IN ('미용실', '미용/건강관리');

-- 유통/판매 통합
UPDATE jobs SET industry = '유통/판매'
WHERE industry IN ('식품점/소매업', '쇼핑몰/판매직', '식자재 유통/도매', '식자재 유통', '식품점');

-- 배관 정규화
UPDATE jobs SET industry = '배관/설비'
WHERE industry = '배관 설비';

-- 미상 → 기타
UPDATE jobs SET industry = '기타'
WHERE industry = '미상';
;
