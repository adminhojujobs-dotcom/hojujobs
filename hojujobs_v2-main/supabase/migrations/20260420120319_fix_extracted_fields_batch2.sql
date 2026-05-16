
-- ID 903: industry "요식업" but it's a butcher shop → 제조/기술업. email "000" is clearly wrong → NULL
UPDATE jobs SET industry = '제조/기술업', email = NULL WHERE id = 903;

-- ID 902: industry "건설/인테리어" → 건설/시공업 (normalise)
UPDATE jobs SET industry = '건설/시공업' WHERE id = 902;

-- ID 901: industry "청소 및 운전 보조" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 901;

-- ID 900: location ["스트라스필드"] but description says Coogee/Randwick/Bondi area → fix
UPDATE jobs SET location = '{"쿠지","랜드윅","본다이"}', industry = '청소/환경미화업' WHERE id = 900;

-- ID 899: industry "청소 서비스" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 899;

-- ID 898: industry "청소 서비스" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 898;

-- ID 896: industry "청소 서비스" → 청소/환경미화업. google_search "노던비치 청소 서비스 노던비치 노던 비치" has triple mention → fix
UPDATE jobs SET industry = '청소/환경미화업', google_search = '홈청소 노던 비치' WHERE id = 896;

-- ID 895: industry "농장/농업" → 기타 (farm work). contact "0493281904" - description says same, correct. kakaoid extracted but in wrong field, fine.
UPDATE jobs SET industry = '기타' WHERE id = 895;

-- ID 893: location ["블랙타운"] but description says Huntingwood (near Blacktown) → keep, acceptable. industry "청소/미화" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 893;

-- ID 892: industry "청소/미화" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 892;

-- ID 891: industry "청소/관리 서비스" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 891;

-- ID 890: contact "0481124789" is wrong — description clearly says "0406574030"
UPDATE jobs SET contact = '0406574030', industry = '요식업' WHERE id = 890;

-- ID 889: industry "건설자재/타일 판매 및 물류" → 건설/시공업. email "girrween.mgmt1@gmail.com" — description says "Girraween.mgmt1@tilemarket.com.au" → fix
UPDATE jobs SET industry = '건설/시공업', email = 'Girraween.mgmt1@tilemarket.com.au' WHERE id = 889;

-- ID 887: industry "타일/페이빙 시공 기술" → 건설/시공업
UPDATE jobs SET industry = '건설/시공업' WHERE id = 887;

-- ID 886: industry "전기/태양광/소방 설비 공사" → 설비/시설관리업
UPDATE jobs SET industry = '설비/시설관리업' WHERE id = 886;

-- ID 884: industry "마트/식료품" → 유통/판매업. contact is NULL but description has no phone number — correct.
UPDATE jobs SET industry = '유통/판매업' WHERE id = 884;

-- ID 883: industry "타일 시공/건축" → 건설/시공업
UPDATE jobs SET industry = '건설/시공업' WHERE id = 883;

-- ID 881: industry "미용/뷰티 서비스" → 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 881;

-- ID 878: industry "미용실" → 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 878;

-- ID 877: location ["리버풀","홈부시"] but description says Strathfield/Homebush/Lidcombe pickup → 홈부시 is not a real suburb, should be 홈부쉬. 리버풀 is not mentioned — fix
UPDATE jobs SET location = '{"스트라스필드","리드컴"}' WHERE id = 877;

-- ID 876: industry "미용실" → 미용/뷰티업. google_search "미용실 캐링포드 칼링포드" has wrong spelling → fix
UPDATE jobs SET industry = '미용/뷰티업', google_search = '미용실 칼링포드' WHERE id = 876;

-- ID 875: location ["글리브"] is correct. industry ok.
-- ID 874: location ["시드니"] should be 시드니 CBD (Westfield Sydney City)
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 874;

-- ID 873: industry "청소 서비스" → 청소/환경미화업. google_search "레드펀, 애시필드" has wrong spelling "애시필드" → 애쉬필드
UPDATE jobs SET industry = '청소/환경미화업', google_search = '청소 서비스 레드펀 애쉬필드' WHERE id = 873;

-- ID 869: location ["리버풀"] but description says Liverpool St in CITY → 시드니 CBD
UPDATE jobs SET location = '{"시드니 CBD"}' WHERE id = 869;

-- ID 868: google_search "BBQ WANG 16 Church St 리드 탑라이드" has "리드" (wrong) → fix
UPDATE jobs SET google_search = 'BBQ WANG 16 Church St 탑라이드' WHERE id = 868;

-- ID 867: industry "미용실" → 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 867;

-- ID 866: industry "미용실" → 미용/뷰티업
UPDATE jobs SET industry = '미용/뷰티업' WHERE id = 866;

-- ID 865: industry "유통/물류" → 물류/운송업
UPDATE jobs SET industry = '물류/운송업' WHERE id = 865;

-- ID 862: location ["엔스더우"] is garbled — description says NSW-wide → fix to 시드니
UPDATE jobs SET location = '{"시드니"}', industry = '건설/시공업' WHERE id = 862;

-- ID 858: industry "건축/인테리어" → 건설/시공업
UPDATE jobs SET industry = '건설/시공업' WHERE id = 858;

-- ID 857: industry "교육" → 교육업
UPDATE jobs SET industry = '교육업' WHERE id = 857;

-- ID 856: industry "통신/전자제품 판매" → 유통/판매업
UPDATE jobs SET industry = '유통/판매업' WHERE id = 856;

-- ID 853: google_search is just "시드니" with no business name → fix
UPDATE jobs SET google_search = 'PPROJECTS TILING 시드니' WHERE id = 853;

-- ID 852: industry "사무직" → 기타
UPDATE jobs SET industry = '기타' WHERE id = 852;

-- ID 851: industry "물류/배송" → 물류/운송업
UPDATE jobs SET industry = '물류/운송업' WHERE id = 851;

-- ID 850: industry "교육" → 교육업. location ["시드니"] → 스트라스필드 (address says Strathfield Plaza)
UPDATE jobs SET industry = '교육업', location = '{"스트라스필드"}' WHERE id = 850;

-- ID 849: industry "식료품점" → 유통/판매업
UPDATE jobs SET industry = '유통/판매업' WHERE id = 849;

-- ID 906: industry "기술/건설" → 건설/시공업
UPDATE jobs SET industry = '건설/시공업' WHERE id = 906;

-- ID 905: industry "편의점/주류 판매점" → 유통/판매업
UPDATE jobs SET industry = '유통/판매업' WHERE id = 905;

-- ID 904: industry "청소/미화 서비스" → 청소/환경미화업
UPDATE jobs SET industry = '청소/환경미화업' WHERE id = 904;

-- ID 859: industry "목공/가구 제작" → 건설/시공업
UPDATE jobs SET industry = '건설/시공업' WHERE id = 859;
;
