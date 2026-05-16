
-- ID 1150: 뉴카슬 타일 기술자 → 뉴카슬 (NSW이지만 시드니 아님, 비워야 함)
UPDATE jobs SET location = '{}' WHERE id = 1150;

-- ID 1204: Bathurst NSW → 시드니 아님, 비워야 함
UPDATE jobs SET location = '{}' WHERE id = 1204;

-- ID 1213: Coffs Harbour / Woolgoolga → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1213;

-- ID 1266: 설명에 "근무처: 161 Manchester Road Auburn NSW" → 오번 (시드니)
UPDATE jobs SET location = '{"오번"}' WHERE id = 1266;

-- ID 1281: 브리즈번 → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1281;

-- ID 1331: 주소 "535 Little Lonsdale Street Melbourne VIC" → 멜버른, 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1331;

-- ID 1332: 멜버른 인디 레코드 레이블 → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1332;

-- ID 1338: Melbourne F&B 마케터 → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1338;

-- ID 1339: Chadstone VIC (하나로마트) → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1339;

-- ID 1340: Melbourne CBD Collins St → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1340;

-- ID 1343: Oakleigh East, Blackburn → 멜버른 교외, 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1343;

-- ID 1344: 노스 멜버른 33 Blackwood St → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1344;

-- ID 1345: Broadmeadows VIC → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1345;

-- ID 1348: 멜버른 CBD → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1348;

-- ID 1349: 멜버른 CBD Ribbon Hair → 시드니 아님
UPDATE jobs SET location = '{}' WHERE id = 1349;
;
