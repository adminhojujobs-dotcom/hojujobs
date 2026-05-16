
-- =============================================
-- 1단계: 업종(industry) 정규화 - 유사 업종 통합
-- =============================================

-- 미용 관련 통합 → '미용/뷰티'
UPDATE jobs SET industry = '미용/뷰티'
WHERE industry IN ('미용실', '미용업', '미용/건강관리', '미용/뷰티');

-- 청소 관련 통합 → '청소업'
UPDATE jobs SET industry = '청소업'
WHERE industry IN ('청소', '청소/미화', '청소 서비스', '청소/가사', '청소업');

-- 건설/인테리어 관련 통합 → '건설/인테리어'
UPDATE jobs SET industry = '건설/인테리어'
WHERE industry IN ('건축/인테리어', '건설/토목', '건설/목공', '배관/설비', '건설/인테리어');

-- 유통/판매 관련 통합 → '유통/판매'
UPDATE jobs SET industry = '유통/판매'
WHERE industry IN ('판매/주점', '유통/판매');

-- 요식업 관련 통합 → '요식업'
UPDATE jobs SET industry = '요식업'
WHERE industry IN ('음식점/유흥업', '요식업');

-- 돌봄/케어 서비스 → '돌봄/케어'
UPDATE jobs SET industry = '돌봄/케어'
WHERE industry = '돌봄/케어 서비스';

-- '오류' 값 → '기타' (NOT NULL 제약으로 인해 NULL 불가)
UPDATE jobs SET industry = '기타'
WHERE industry = '오류';

-- =============================================
-- 2단계: 위치(location) 정규화 함수 생성
-- =============================================

CREATE OR REPLACE FUNCTION map_location_to_region(suburbs text[])
RETURNS text[] AS $$
DECLARE
  suburb text;
  regions text[] := '{}';
  region text;
BEGIN
  IF suburbs IS NULL OR array_length(suburbs, 1) IS NULL THEN
    RETURN suburbs;
  END IF;

  FOREACH suburb IN ARRAY suburbs
  LOOP
    region := CASE
      -- 시드니 CBD & 이너 시티
      WHEN suburb IN ('시드니 CBD', '헤이마켓', '차이나타운', '울티모', '서리 힐스', '킹스크로스', '가디갈', '시드니') THEN '시드니 CBD'
      -- 이너 웨스트
      WHEN suburb IN ('뉴타운', '버우드', '애쉬필드', '로젤', '알렉산드리아', '뉴잉턴') THEN '이너 웨스트'
      -- 스트라스필드 / 버우드 / 리드컴
      WHEN suburb IN ('스트라스필드', '리드컴', '실버워터') THEN '스트라스필드/리드컴'
      -- 노스 시드니 & 노스 쇼어
      WHEN suburb IN ('노스 시드니', '채스우드', '세인트 레오나즈', '혼스비', '세인트 아이브스', '워리우드') THEN '노스 시드니'
      -- 이스턴 서버브
      WHEN suburb IN ('본다이', '본다이 정션', '벨뷰 힐', '쿠지', '랜드윅') THEN '이스턴 서버브'
      -- 사우스 시드니
      WHEN suburb IN ('허스트빌', '사우스 허스트빌', '마스콧') THEN '사우스 시드니'
      -- 라이드 & 이스트우드
      WHEN suburb IN ('라이드', '이스트우드', '로즈', '웨스트 라이드', '탑라이드', '레드콤브') THEN '라이드/이스트우드'
      -- 파라마타 & 웨스턴 시드니
      WHEN suburb IN ('파라마타', '마운트 드루이트', '캠벨타운', '라우스 힐', '스프링우드') THEN '웨스턴 시드니'
      -- 노스웨스트
      WHEN suburb IN ('켈리빌', '카슬힐', '노웨스트', '스탠호프 가든스', '듀럴', '체리브룩', '에핑') THEN '노스웨스트'
      -- 올림픽 파크 / 웬트워스 포인트
      WHEN suburb IN ('웬트워스 포인트') THEN '올림픽 파크'
      -- 센트럴 코스트
      WHEN suburb IN ('센트럴 코스트') THEN '센트럴 코스트'
      -- 캔버라
      WHEN suburb IN ('캔버라') THEN '캔버라'
      -- 포트 맥쿼리
      WHEN suburb IN ('포트 맥쿼리') THEN '포트 맥쿼리'
      ELSE suburb
    END;

    IF region IS NOT NULL AND NOT (regions @> ARRAY[region]) THEN
      regions := regions || region;
    END IF;
  END LOOP;

  RETURN regions;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 3단계: 위치 정규화 적용
-- =============================================

UPDATE jobs
SET location = map_location_to_region(location)
WHERE location IS NOT NULL AND array_length(location, 1) > 0;
;
