
-- ID 153: email "n/a" → NULL
UPDATE jobs SET email = NULL WHERE id = 153;

-- ID 162: email "없음" → NULL
UPDATE jobs SET email = NULL WHERE id = 162;

-- ID 174: wrong contact number, description says 0410 131 223
UPDATE jobs SET contact = '0410131223' WHERE id = 174;

-- ID 196, 377: email "없음" → NULL
UPDATE jobs SET email = NULL WHERE id IN (196, 377);

-- ID 213: email typo trailing 'h'
UPDATE jobs SET email = 'hundonghan777@gmail.com' WHERE id = 213;

-- ID 219: Korean phone number in contact → NULL
UPDATE jobs SET contact = NULL WHERE id = 219;

-- ID 249: phone number in email field → NULL
UPDATE jobs SET email = NULL WHERE id = 249;

-- ID 265: extra digit in contact
UPDATE jobs SET contact = '0433172663' WHERE id = 265;

-- ID 285: contact was "0", description says 0405-162-374
UPDATE jobs SET contact = '0405162374' WHERE id = 285;

-- ID 302: non-standard format +61
UPDATE jobs SET contact = '0423693080' WHERE id = 302;

-- ID 370: email "000" → NULL
UPDATE jobs SET email = NULL WHERE id = 370;

-- ID 374: email typo "speicalsolution" → "specialsolution"
UPDATE jobs SET email = 'pristinespecialsolution@gmail.com' WHERE id = 374;

-- ID 438: email should be from description sbj0817@naver.com
UPDATE jobs SET email = 'sbj0817@naver.com' WHERE id = 438;

-- ID 252, 273: PC방 industry should be 기타 not 요식업
UPDATE jobs SET industry = '기타' WHERE id IN (252, 273);

-- ID 293: cleaning job misclassified as 미용/뷰티업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 293;

-- ID 312: general maintenance misclassified as 의료/복지서비스업
UPDATE jobs SET industry = '건설/시공업' WHERE id = 312;
;
