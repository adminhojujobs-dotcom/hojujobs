
-- 중복 통합
UPDATE jobs SET location = array_replace(location, '차이나타운', '헤이마켓');
UPDATE jobs SET location = array_replace(location, '노스 쇼어', '노스 시드니');
UPDATE jobs SET location = array_replace(location, '시드니', '시드니 CBD') WHERE location = '{"시드니"}';
UPDATE jobs SET location = array_replace(location, '마운트 웨이버리', '마운트 웨이벌리');
UPDATE jobs SET location = array_replace(location, '채스우드', '채스우드'); -- already correct
UPDATE jobs SET location = array_replace(location, '레드콤브', '리드컴');

-- 오타/불명확한 값 수정
UPDATE jobs SET location = array_replace(location, '버른', '멜버른');
UPDATE jobs SET location = array_replace(location, '쿠퍼스 하버', '코프스 하버');
UPDATE jobs SET location = array_replace(location, '웬트워스', '웬트워스 포인트');
UPDATE jobs SET location = array_replace(location, '맥쿼리', '맥쿼리 파크');
UPDATE jobs SET location = array_replace(location, '센트럴', '시드니 CBD');
UPDATE jobs SET location = array_replace(location, '센트럴 파크', '시드니 CBD');
UPDATE jobs SET location = array_replace(location, '타운홀', '시드니 CBD');

-- 지역명이 아닌 값 제거
UPDATE jobs SET location = array_remove(location, '하버 호텔');
UPDATE jobs SET location = array_remove(location, '홍대');
UPDATE jobs SET location = array_remove(location, '이너 웨스트');
UPDATE jobs SET location = array_remove(location, '웨스턴 에어리어');
UPDATE jobs SET location = array_remove(location, '미드 노스 코스트 리전');
UPDATE jobs SET location = array_remove(location, '출로라');
UPDATE jobs SET location = array_remove(location, '샌디 비치');

-- 멜버른 관련 통합
UPDATE jobs SET location = array_replace(location, '사우스 이스트 멜버른', '멜버른');
;
