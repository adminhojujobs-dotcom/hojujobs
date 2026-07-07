-- Rewords the prose content (titles, descriptions, detail sections, skill tags) of
-- company_job_openings rows that were originally scraped verbatim from other sites.
-- Addresses, phone numbers, emails, prices, and exact time ranges are left unchanged.

-- Bunsik Rhodes (파트타임 2명)
UPDATE public.company_job_openings SET
  title = $t$Bunsik 로즈 쇼핑몰 매장 파트타임 직원 채용 (2명)$t$,
  condition_rows = $j$[["급여","면접에서 경력과 역량을 반영해 협의합니다"],["근무지역","Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138","BUNSIK Rhodes"],["근무요일","토 · 일 · 월"],["근무시간","A: 12:00~20:00 / B: 10:00~18:00"],["모집분야","파트타임 스태프 2명 모집"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","2명"],["업무내용","포스(POS) 운영, 고객 응대, 재고 확인, 매장 청결 관리, 주방 보조"],["우대사항","경력 무관하며 손이 빠르고 위생관리에 철저하신 분"],["지원방법","지원서 양식과 이력서를 이메일로 보내주세요"],["이메일","BunsikOP@gmail.com"]]$j$::jsonb,
  detail_intro = $t$로즈 워터사이드 쇼핑몰에 위치한 BUNSIK 매장에서 함께 일할 파트타임 직원을 찾고 있습니다.$t$,
  detail_sections = $j$[{"title":"업무소개","items":["포스(POS) 운영과 고객 응대","재고 확인, 매장 청결 유지, 주방 보조 업무","경력이 없어도 체계적으로 교육해드립니다"]},{"title":"근무조건","items":["A타임 1명, 12:00~20:00 (토·일·월)","B타임 1명, 10:00~18:00 (토·월)","급여는 면접에서 경력과 역량을 고려해 협의합니다"]},{"title":"지원방법","items":["지원서 양식을 작성하고 이력서를 첨부해 이메일로 보내주세요","메일 제목 예시: [분식 로즈] A 또는 B 파트타임 지원","Email: BunsikOP@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['파트타임','포스(POS) 운영','고객응대','재고관리','주방보조','경력 무관']
WHERE id = 'dc6f9630-818a-463e-85d8-15d2168224b0';

-- Bunsik Top Ryde (남자직원)
UPDATE public.company_job_openings SET
  title = $t$Bunsik Top Ryde 쇼핑몰 매장 남성 직원 채용$t$,
  condition_rows = $j$[["급여","면접에서 경력과 역량을 반영해 협의합니다"],["근무지역","Corner of Blaxland Road & Devlin Street Shop L1 K403 / Top, Ryde NSW 2112","BUNSIK Top Ryde"],["근무요일","주 5일 이상 근무","주말 근무 가능자"],["근무시간","09:00~18:00","목요일은 근무시간에서 제외됩니다"],["모집분야","남성 직원"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","남성 직원"],["업무내용","분식 메뉴 조리, 재료 손질, 주방 위생 관리, 포스(POS) 운영, 고객 응대"],["우대사항","경력 무관하며 손이 빠르고 위생관리에 철저하신 분 환영"],["지원방법","지원서 양식과 이력서를 이메일로 보내주세요"],["이메일","BunsikOP@gmail.com"]]$j$::jsonb,
  detail_intro = $t$탑라이드 시티 쇼핑몰 BUNSIK 매장에서 함께할 남성 직원을 모집합니다.$t$,
  detail_sections = $j$[{"title":"업무소개","items":["치킨, 핫도그 등 대표 분식 메뉴 조리","재료 손질과 주방 위생 관리","포스(POS) 운영과 고객 응대"]},{"title":"근무조건","items":["근무시간: 09:00~18:00 (목요일 제외)","근무형태: 주 5일 이상 근무 가능자","주말 근무 포함","급여는 면접에서 협의합니다"]},{"title":"지원방법","items":["지원서 양식을 작성하고 이력서를 첨부해 이메일로 보내주세요","메일 제목 예시: [분식 탑라이드] 지원","Email: BunsikOP@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['남성 직원','분식조리','주방보조','포스(POS) 운영','고객응대','경력 무관']
WHERE id = '6b811e44-a2d7-42bc-8655-dd247bdf99d0';

-- Bunsik Parramatta
UPDATE public.company_job_openings SET
  title = $t$Bunsik Parramatta 쇼핑몰 매장 직원 채용$t$,
  condition_rows = $j$[["급여","면접에서 경력과 역량을 반영해 협의합니다"],["근무지역","Westfield Parramatta, K544 Level 5/131 Church St, Parramatta NSW 2150","BUNSIK Parramatta"],["근무요일","주 5일 이상 근무","주말 근무 가능자"],["근무시간","09:00~18:00","목요일은 근무시간에서 제외됩니다"],["모집분야","매장 매니저, 키친 스태프, 캐셔 및 홀 스태프"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","매장 직원"],["업무내용","매장 운영 관리, 재고 및 발주 관리, 분식 조리, 고객 응대, 매장 정리정돈"],["우대사항","관련 업종 관리자 경력자 우대, 경력 무관 지원 가능, 기본 영어 소통 가능자 우대"],["지원방법","지원서 양식과 이력서를 이메일로 보내주세요"],["이메일","BunsikOP@gmail.com"]]$j$::jsonb,
  detail_intro = $t$웨스트필드 파라마타 쇼핑몰 BUNSIK 매장에서 함께 일할 직원을 모집합니다.$t$,
  detail_sections = $j$[{"title":"모집분야","items":["매장 매니저","키친 스태프","캐셔 및 홀 스태프"]},{"title":"근무조건","items":["근무시간: 09:00~18:00 (목요일 제외)","주 5일 이상 근무 가능자","주말 근무 포함","급여는 면접에서 협의합니다"]},{"title":"지원방법","items":["지원서 양식을 작성하고 이력서를 첨부해 이메일로 보내주세요","메일 제목 예시: [분식 파라마타] 매니저 / 홀 / 키친 포지션 지원","Email: BunsikOP@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['매장매니저','키친보조','캐셔','홀스태프','분식조리','고객응대']
WHERE id = '0f5ad267-da85-45a1-ad71-1b06076b1593';

-- Bunsik Rhodes (캐셔)
UPDATE public.company_job_openings SET
  title = $t$Bunsik 로즈 워터사이드 매장 캐셔 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의"],["근무지역","Shop77 / Level 1/1 Rider Blvd, Rhodes NSW 2138","Bunsik Rhodes"],["근무요일","월 · 토 · 일"],["근무시간","12:00~20:00"],["모집분야","캐셔"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","캐셔"],["업무내용","고객 응대, 계산 업무"],["우대사항","나이, 성별, 경력 무관 / 손이 빠르고 꼼꼼하신 분"],["지원방법","이력서를 이메일로 보내거나 문자로 이름과 나이, 간단한 이력을 남겨주세요"],["연락처","0424 457 088"],["이메일","bunsik.rhodes.au@gmail.com"]]$j$::jsonb,
  detail_intro = $t$로즈 워터사이드 쇼핑몰 푸드코트에 위치한 Bunsik Rhodes에서 함께 일할 캐셔를 채용합니다.$t$,
  detail_sections = $j$[{"title":"근무조건","items":["모집분야: 캐셔","근무형태: 파트타임","근무요일: 월, 토, 일","근무시간: 12:00~20:00","주요업무: 고객 응대, 계산 업무"]},{"title":"지원자격","items":["나이, 성별, 경력 무관","손이 빠르고 꼼꼼하신 분","친절하고 밝은 성격을 가지신 분"]},{"title":"지원방법","items":["이력서를 이메일로 보내주세요","문자로 이름과 나이, 간단한 이력을 남겨주세요","Email: bunsik.rhodes.au@gmail.com","Phone: 0424 457 088"]}]$j$::jsonb,
  skill_tags = ARRAY['캐셔','계산업무','고객응대','파트타임','경력 무관']
WHERE id = '28b00eff-64f7-4beb-88fd-420c9bef8b4c';

-- Bunsik Hurstville
UPDATE public.company_job_openings SET
  title = $t$Bunsik Hurstville 쇼핑몰 매장 파트타임 직원 채용$t$,
  condition_rows = $j$[["급여","면접에서 경력과 역량을 반영해 협의합니다"],["근무지역","Westfield Hurstville, Shop 463/3 Cross St, Hurstville NSW 2220","BUNSIK Hurstville"],["근무요일","주 2일 이상 근무","주말 근무 가능자"],["근무시간","09:00~18:00","목요일은 근무시간에서 제외됩니다"],["모집분야","파트타임 스태프"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","파트타임 스태프"],["업무내용","분식 메뉴 조리, 재료 손질, 주방 위생 관리, 포스(POS) 운영, 고객 응대"],["우대사항","경력 무관하며 손이 빠르고 위생관리에 철저하신 분 환영"],["지원방법","지원서 양식과 이력서를 이메일로 보내주세요"],["이메일","BunsikOP@gmail.com"]]$j$::jsonb,
  detail_intro = $t$웨스트필드 허스트빌 쇼핑몰 BUNSIK 매장에서 함께 일할 파트타임 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"업무소개","items":["치킨, 핫도그 등 대표 분식 메뉴 조리","재료 손질과 주방 위생 관리","포스(POS) 운영과 고객 응대"]},{"title":"근무조건","items":["근무시간: 09:00~18:00 (목요일 제외)","근무형태: 파트타임, 주 2일 이상 근무 가능자","주말 근무 포함","급여는 면접에서 협의합니다"]},{"title":"지원방법","items":["지원서 양식을 작성하고 이력서를 첨부해 이메일로 보내주세요","메일 제목 예시: [분식 허스트빌] 지원","Email: BunsikOP@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['파트타임','분식조리','주방보조','포스(POS) 운영','고객응대','경력 무관']
WHERE id = '65797eaa-d09c-43a2-b291-0c1f604e6deb';

-- Bunsik Liverpool
UPDATE public.company_job_openings SET
  title = $t$Bunsik Liverpool 매장 홀 직원 채용$t$,
  condition_rows = $j$[["급여","면접 후 협의","경력자 우대"],["근무지역","Westfield Liverpool, Lot 22, S259/25 George St, Liverpool NSW 2170","Bunsik Liverpool"],["근무요일","주 2~3일 이상","평일/주말 가능자"],["근무시간","평일/주말 08:30~18:00, 목요일 08:30~20:30"],["모집분야","홀 스태프"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","홀 스태프"],["업무내용","홀 전반 업무"],["우대사항","책임감 있고 성실하신 분, 경력자 우대"],["지원방법","이름, 나이, 거주 지역, 비자상태, 비자 만료일, 근무 가능 요일/시간을 문자 또는 이메일로 보내주세요"],["연락처","0499 558 922"],["이메일","bunsikliverpool@gmail.com"]]$j$::jsonb,
  detail_intro = $t$리버풀에 위치한 Bunsik 매장에서 함께할 홀 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"근무조건","items":["지역: Liverpool","근무일수: 주 2~3일 이상","영업시간: 평일/주말 08:30~18:00, 목요일 08:30~20:30","급여: 면접 후 협의"]},{"title":"업무내용","items":["홀 전반 업무","체계적으로 정리된 업무 환경"]},{"title":"지원방법","items":["이름, 나이, 거주 지역, 비자상태, 비자 만료일, 근무 가능 요일/시간을 적어 보내주세요","Phone: 0499 558 922","Email: bunsikliverpool@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['홀스태프','경력 무관','파트타임','책임감','성실함']
WHERE id = 'c869265c-7525-4d0c-a2df-13ad67c555e6';

-- Bunsik Roselands
UPDATE public.company_job_openings SET
  title = $t$Bunsik Roselands 매장 한식 경력 주방 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의"],["근무지역","24 Roselands Ave, Roselands NSW 2196","BUNSIK Roselands"],["근무요일","주 3일 이상","주말 포함"],["근무시간","09:00~18:00"],["모집분야","한식 경력 주방 스태프"],["복리후생","쇼핑몰 내 매장 근무"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","주방 스태프"],["업무내용","주방 업무, 캐셔, 고객 응대, 재고 관리"],["우대사항","한식당 경력자 우대, Roselands Shopping Centre 출퇴근 가능자"],["지원방법","지원서 양식과 이력서를 이메일로 보내주세요"],["이메일","BunsikOP@gmail.com"]]$j$::jsonb,
  detail_intro = $t$Roselands 쇼핑몰 안에 위치한 BUNSIK에서 주방을 맡아주실 키친 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"업무소개","items":["주방 업무","캐셔 및 고객 응대","재고 관리"]},{"title":"근무조건","items":["근무시간: 09:00~18:00","주 3일 이상 근무 가능자","주말 포함","시급은 면접에서 협의 후 결정"]},{"title":"지원자격","items":["한식당 경력자 우대","Roselands Shopping Centre로 출퇴근 가능하신 분"]},{"title":"지원방법","items":["이름, 나이, 비자, 비자만료일, 전화번호, 근무 가능한 요일을 포함해 이메일로 보내주세요","Email: BunsikOP@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['주방보조','한식경력','캐셔','고객응대','재고관리','주말근무']
WHERE id = '1cfa0c70-3978-4563-9198-66087f222fe7';

-- Bunsik Chatswood
UPDATE public.company_job_openings SET
  title = $t$Bunsik Chatswood 매장 키친 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의"],["근무지역","Westfield Chatswood, Shop 228, Level 2/1 Anderson St, Chatswood NSW 2067","BUNSIK Chatswood"],["근무요일","주 5일 이상","주말 포함"],["근무시간","09:00~18:00"],["모집분야","키친 / 주방 스태프"],["복리후생","체계적인 교육과 훈련을 지원합니다"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","키친 스태프"],["업무내용","간단한 분식 조리, 재료 손질, 재고 관리"],["우대사항","주방 경력이 적거나 없어도 지원 가능"],["지원방법","어느 매장에 지원하는지 제목에 적어 이력서와 함께 이메일로 보내주세요"],["이메일","BunsikOP@gmail.com"]]$j$::jsonb,
  detail_intro = $t$웨스트필드 채스우드 BUNSIK 매장에서 함께할 키친/주방 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"업무소개","items":["간단한 분식 조리","재료 손질","재고 관리"]},{"title":"근무조건","items":["근무시간: 09:00~18:00","주 5일 이상 근무 가능자","주말 포함","시급은 면접에서 협의 후 결정"]},{"title":"지원방법","items":["이력서와 함께 이메일로 보내주세요","제목에 어느 매장에 지원하는지 적어주세요","예: 분식 허스트빌 키친 포지션 지원","Email: BunsikOP@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['키친스태프','주방보조','분식조리','재료손질','재고관리','경력 무관']
WHERE id = '1d830d1a-5ff7-4664-8efe-33df92186872';

-- Chicken V Eastwood
UPDATE public.company_job_openings SET
  title = $t$Chicken V 이스트우드점 홀/주방 스태프 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의","경력자 우대"],["근무지역","Eastwood NSW 2122","이스트우드역에서 도보 5분"],["근무형태","풀타임 / 파트타임"],["근무시간","월~일 11:00 - 24:00","매장 영업시간 기준"],["모집분야","홀, 주방 스태프"],["복리후생","매일 저녁식사 제공, 직원 할인","직원이 손님으로 방문 시 할인 제공"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","홀/주방 스태프"],["우대사항","경력자 우대"],["초보지원","경력이 없어도 지원 가능합니다"],["지원방법","문자 또는 이메일로 지원해주세요"],["연락처","0451 600 616"],["이메일","iseoyun6816@gmail.com"],["지원서류","이름, 나이, 비자 상태, 거주지를 포함해주세요"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['홀서빙','주방업무','고객응대','팀워크','경력 무관 환영']
WHERE id = 'bd839939-e7da-42ee-b378-e894e57b9a64';

-- Chicken V & Busan Pocha City (주방)
UPDATE public.company_job_openings SET
  title = $t$Chicken V & Busan Pocha City 주방 스태프 채용$t$,
  condition_rows = $j$[["급여","면접과 트라이얼 후 경력에 따라 협의","경력자 우대, 야간 근무 시 추가 시급 지급"],["근무지역","345b Sussex St, Sydney NSW 2000","타운홀에서 도보 2분"],["근무형태","풀타임(주 4~5일) / 파트타임","주말 포함"],["근무시간","월~수 17:00 - 25:00, 목 17:00 - 26:00, 금/토 11:30 - 26:00, 일 11:30 - 24:00"],["모집분야","주방 스태프"],["복리후생","매일 저녁식사와 음료 제공, 직원 할인, 야간 근무 추가 시급"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","주방 스태프"],["우대사항","경력자 우대"],["지원대상","학생, 워홀 비자 지원 가능"],["지원방법","이메일 또는 문자로 지원해주세요"],["연락처","0449 705 536"],["이메일","iseoyun6816@gmail.com"],["지원서류","이력서와 함께 연락 부탁드립니다"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['주방조리','안주조리','팀워크','경력자 우대','야간근무']
WHERE id = '89a331ac-8911-4c84-8e4a-698023b90e73';

-- Busan Pocha & Chicken V (홀)
UPDATE public.company_job_openings SET
  title = $t$Busan Pocha & Chicken V 시티점 홀 파트타임 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의","야간 근무 시 나이트 웨이지 지급"],["근무지역","345b Sussex St, Sydney NSW 2000","타운홀에서 도보 2분"],["근무형태","파트타임 홀 스태프"],["근무요일","주 2-3일"],["근무시간","월~목 17:00 - 25:00, 금/토 11:30 - 26:00, 일 11:30 - 24:00"],["복리후생","매일 저녁식사 제공, 직원 할인, 나이트 웨이지"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","홀 파트타임 스태프"],["우대사항","경력자 우대"],["초보지원","경력이 없어도 지원 가능합니다"],["지원방법","문자 또는 이메일로 지원해주세요"],["연락처","0449 705 536"],["이메일","iseoyun6816@gmail.com"],["근무환경","직원 평균 연령대가 젊어 친구처럼 편안한 분위기입니다"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['홀서빙','고객응대','파트타임','팀워크','경력 무관 환영']
WHERE id = 'c3d73517-fc70-4232-b8ab-5e376f90228b';

-- DK Hairstudio
UPDATE public.company_job_openings SET
  title = $t$DK HAIRSTUDIO 시드니 5개 지점 인턴 & 디자이너 채용$t$,
  condition_rows = $j$[["급여","경력 디자이너 $37~$40+ / 경력 인턴 up to $29+","커미션제 및 제품 판매 커미션 선택 가능"],["근무지역","Rhodes · Chatswood · Broadway · Burwood · Haymarket","시드니 5개 지점"],["근무요일","주 4~5일 근무","주말 포함, 수습기간 있음"],["근무시간","지점 운영 상황에 따라 협의"],["모집분야","인턴, 디자이너"],["복리후생","주 2회 1:1 교육, 상시 정기 교육, 장비 지원, 장기근무 보너스, 학생비자 학비 지원, 스폰서 비자 가능"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","시드니 5개 지점 인턴 및 디자이너"],["모집분야","인턴, 디자이너"],["우대사항","헤어 커리어 성장 의지, 컬러·펌·나노플라스티 시술에 관심, 글로벌 고객 응대 가능, SNS 브랜딩·촬영·콘텐츠 제작에 관심 있는 분"],["지원방법","이력서, 포트폴리오, 비자 상태를 이메일 또는 인스타그램 DM으로 보내주세요"],["연락처","0491 709 913"],["이메일","dkhairstudio.dk@gmail.com"],["인스타그램","@dk_hairstudio"]]$j$::jsonb,
  detail_intro = $t$DK HAIRSTUDIO는 시드니에서 빠르게 성장 중인 글로벌 헤어살롱으로, 탄탄한 교육 시스템을 바탕으로 인턴과 디자이너를 체계적으로 양성합니다.$t$,
  detail_sections = $j$[{"title":"교육 시스템","items":["주 2회 1:1 디자이너 전담 교육","실전 위주의 맞춤형 커리큘럼","컬러, 펌, 포일워크, 나노플라스티 등 개인 역량에 맞춘 교육 과정","정기 교육 프로그램: 인턴 집중 교육, 영어 수업, 컬러 트렌드, 로컬 테크닉, K-펌, 나노플라스티 실습","BBQ 및 팀 네트워킹 행사"]},{"title":"지원 환경","items":["삼각대, 가발, 연습 장비 매장 내 제공","SNS 촬영 장비 지원","실전 모델 교육 적극 지원","총 5단계, 15개월 디자이너 양성 과정","분기별 진급 테스트로 역량에 따라 승급 기간 단축 가능"]},{"title":"근무 조건","items":["주 4~5일 근무, 주말 포함","수습기간 있음","시급제: 경력 디자이너 $37~$40+, 경력 인턴 up to $29+","커미션제: 총매출 10% 공제 후 43~48% 지급","제품 판매 커미션: 시급제 15%, 커미션제 25%"]},{"title":"장기근무 혜택","items":["학생비자 학비 지원","장기근무 보너스","스폰서 비자 가능"]},{"title":"지원 방법","items":["이력서, 포트폴리오, 비자 상태를 함께 보내주세요","Email: dkhairstudio.dk@gmail.com","문자/전화: 0491 709 913","Instagram DM: @dk_hairstudio"]}]$j$::jsonb,
  skill_tags = ARRAY['인턴','디자이너','컬러','펌','포일워크','나노플라스티','SNS 브랜딩','영어 수업','스폰서 비자']
WHERE id = '19b40f21-f5a8-4d28-84b6-b22005171dc7';

-- KMALL09 Lidcombe KOPO
UPDATE public.company_job_openings SET
  title = $t$케이몰 리드컴 KOPO 분식매장 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의","동종 업계 경력에 따라 협의"],["근무지역","Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141","2호점"],["근무형태","풀타임 / 파트타임"],["영업시간","오전 10시 - 오후 7시30분"],["담당업무","고객 응대 및 메뉴 서빙, 음식 준비 및 간단 조리, 재료 손질"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","협의"],["우대사항","동종 업계 경력자, 손이 빠르고 서비스 마인드가 있으신 분"],["지원방법","이메일로 이력서를 접수해주세요"],["지원서류","성함, 연락처, 경력 사항, 비자 상태, 희망 근무시간을 포함해주세요"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['고객응대','메뉴서빙','음식준비','간단조리','재료손질']
WHERE id = '6cbe90aa-8aff-4d95-a03e-51b39a74514e';

-- KMALL09 Lidcombe 요아정
UPDATE public.company_job_openings SET
  title = $t$케이몰09 리드컴 요아정 매장 매니저 및 직원 채용$t$,
  condition_rows = $j$[["급여","경력에 따라 협의","성과에 따른 인센티브 가능"],["근무지역","Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141","2호점"],["근무형태","매장 매니저(Full Time), 직원"],["근무시간","12PM - 9:00PM"],["담당업무","매장 전반 운영, 재고 및 발주 관리, 고객 서비스 및 컴플레인 대응, 위생 및 식품 안전 관리"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집분야","매장 매니저(Full Time), 직원"],["우대사항","외식업 또는 매장 관리 경험자, 한국어 및 영어 소통 가능자"],["인재상","긍정적이고 밝은 리더십을 가지신 분, 문제를 스스로 해결하는 분, 팀을 이끌고 성장시키는 것을 좋아하는 분"],["지원방법","이메일로 간단한 자기소개를 보내주세요"],["지원서류","간단한 자기소개"],["이메일","kmall09.ops.oscar@gmail.com"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['매장운영','재고관리','발주관리','고객서비스','위생관리','식품안전']
WHERE id = '54b1dbf2-d5bf-4226-8a87-2716589f303f';

-- KMALL09 Lidcombe 2호점
UPDATE public.company_job_openings SET
  title = $t$케이몰09 리드컴 2호점 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의","General Retail Industry Award 기준 준수, 주말 및 공휴일 법정 수당 지급"],["근무지역","Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141","2호점"],["근무요일","면접 시 협의 가능","주 5~6일 가능자 우대"],["근무시간","풀타임 / 오전 파트타임","근무시간 및 요일은 면접에서 협의 가능"],["모집분야","진열파트 2명, 어드민 1명, 캐셔 1명","진열·재고관리, 매장 운영 지원, 계산 및 고객응대"],["복리후생","법정 연금, 유급 휴가, 직원 할인","KMALL 상품 구매 시 직원 할인 제공"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","진열파트 2명, 어드민 1명, 캐셔 1명"],["우대사항","대형유통/마트 경험자, 영어/중국어 가능자, RSA 소지자(캐셔·어드민 해당), 비자 만료일 1년 이상"],["지원방법","이메일로 이력서를 접수해주세요"],["지원서류","성함, 연락처, 지원 근무지, 지원 파트, 경력 사항, 비자 상태, 희망 근무시간을 포함해주세요"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['상품진열','재고관리','계산업무','고객응대','매장운영','입고처리']
WHERE id = '5ac2efef-6140-4df6-abd8-a668206e1620';

-- KMALL09 Bankstown 3호점
UPDATE public.company_job_openings SET
  title = $t$케이몰09 뱅크스타운 3호점 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의","경력에 따른 대우"],["근무지역","Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200","3호점"],["근무형태","풀타임 / 파트타임"],["근무시간","주말 1일 필수 근무","주말 2일 가능자 우대, 주 5~6일 근무자 우대"],["모집분야","캐셔 1명, 남직원 1명","상품 입고, 진열, 재고 관리, 리빙 섹션 관리 및 판매"],["복리후생","법정 연금 12%, 유급 연차, 직원 할인","Superannuation 12%, Annual Leave, KMALL09 직원 할인 제공"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","캐셔 1명, 남직원 1명"],["우대사항","한국 및 호주 마트 근무 경험자, 영어 또는 중국어 가능자, RSA 자격증 보유자(캐셔 부문 해당)"],["초보지원","경력이 없어도 지원 가능하며, 업무 적응을 친절히 도와드립니다"],["지원방법","이메일로 이력서를 접수해주세요"],["이메일","JUN.MOON@KMALL09.COM.AU"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['상품입고','상품진열','재고관리','리빙섹션','판매','계산업무']
WHERE id = '553419f9-7bc9-4c7b-8ef1-5abbacb194d9';

-- KMALL09 City 4호점
UPDATE public.company_job_openings SET
  title = $t$케이몰09 시드니 시티 4호점 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의"],["근무지역","537 George St, Sydney NSW 2000","4호점 · 오픈예정"],["근무요일","면접 시 협의 가능","주말 근무 하루 필수, 이틀 가능자 우대"],["근무시간","풀타임 / 파트타임","근무시간 및 요일은 면접에서 협의 가능"],["모집분야","매니저, 진열파트, 어드민, 캐셔","매장관리, 상품 진열 및 재고관리, 매장 운영 지원, 계산 및 고객응대"],["복리후생","Annual Leave, Super, 직원 할인","KMALL 상품 구매 시 직원 할인 제공"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","포지션별 채용"],["우대사항","대형유통/마트 경험자, 영어/중국어 가능자, RSA 소지자(캐셔만 해당), 비자 만료일 1년 이상"],["지원방법","이메일로 이력서를 접수해주세요"],["지원서류","성함, 연락처, 지원 근무지, 지원 파트, 경력 사항, 비자 상태, 희망 근무시간을 포함해주세요"],["이메일","md@kmall09.com.au"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['매장관리','상품진열','재고관리','계산업무','고객응대','매장운영']
WHERE id = '58019cf6-9a01-43e1-8d0e-c8e2dfba1afa';

-- 박봉숙 Eastwood
UPDATE public.company_job_openings SET
  title = $t$박봉숙 레스토랑 이스트우드점 홀 매니저·슈퍼바이저 채용$t$,
  condition_rows = $j$[["급여","능력에 따른 동종업계 최고 대우"],["근무지역","108 Rowe St, Eastwood NSW 2122","이스트우드역에서 3분"],["근무형태","홀 매니저 / 슈퍼바이저"],["근무시간","협의 가능"],["모집분야","홀 매니저, 슈퍼바이저"],["지원자격","매니저: 연령 40세 이하, 성별 무관, 워홀비자 가능, 호주 식당 경력 3년 이상 / 슈퍼바이저: 20대 선호, 성별 무관, 경력 1년 이상"],["복리후생","능력에 따른 동종업계 최고 대우"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","홀 매니저 / 슈퍼바이저"],["우대사항","성실하고 일 처리가 좋으신 분, 자발적이고 상황 변화에 유연하게 대응하는 스타일"],["지원제외","일 처리가 느리고 상황판단이 빠르지 않으신 분은 지원을 삼가주세요"],["지원방법","전화보다는 문자로 간단한 소개를 먼저 보내주세요. 이력서는 없어도 괜찮습니다."],["연락처","0423 058 922"],["이메일","pbseastwood@gmail.com"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['홀매니저','슈퍼바이저','고객응대','매장관리','경력자 우대','스케줄관리']
WHERE id = '2ebbead7-9eac-4064-b46a-b1ac7b67a1ef';

-- Gogido 박봉숙 Burwood
UPDATE public.company_job_openings SET
  title = $t$GOGIDO 박봉숙 버우드점 동반 성장할 직원 채용$t$,
  condition_rows = $j$[["급여","면접 시 협의","포지션과 경력에 따라 협의"],["근무지역","173 Burwood Road, Burwood NSW 2134","GOGIDO 박봉숙 Burwood"],["근무형태","풀타임 / 파트타임","원하는 요일과 시간에 맞춰 스케줄 조정 가능"],["근무요일","월요일 ~ 일요일","원하는 요일 선택 가능"],["근무시간","10:00 - 23:30"],["모집분야","Kitchen, Hall","Chef, Kitchen Hand, Restaurant Manager, Assistant Manager, Floor Staff"],["복리후생","맛있는 점심 제공, Superannuation 지급, Tax 지급, 주말 및 공휴일 추가 수당 지급","편안하고 존중받는 근무환경"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","주방 및 홀 스태프"],["모집분야","Chef, Kitchen Hand, Restaurant Manager, Assistant Manager, Floor Staff"],["우대사항","경력자 우대"],["지원대상","오래 함께 성장할 분을 환영합니다"],["지원방법","전화 또는 이메일로 지원해주세요"],["주방지원","0473 374 710"],["홀지원","0433 253 136"],["이메일","hoshi74@naver.com"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['Kitchen','Chef','Kitchen Hand','Hall','Restaurant Manager','Assistant Manager','Floor Staff','경력자 우대']
WHERE id = '97594903-bb12-4f3e-b1c4-a60bd7a09d15';

-- Stoneage Hurstville (주방)
UPDATE public.company_job_openings SET
  title = $t$석기시대 허스트빌점 주방 스태프를 찾습니다$t$,
  condition_rows = $j$[["급여","$25 ~ $28"],["근무지역","266 Forest Rd, Hurstville NSW 2220","Stoneage Korean BBQ 석기시대 허스트빌"],["근무요일","협의 가능"],["근무시간","풀타임 10:30~22:00","월요일~금요일 15:00~16:45 브레이크 타임"],["모집분야","주방 스토브파트"],["복리후생","체계적인 업무 분담, 친절한 교육"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","주방 스태프"],["모집분야","스토브파트"],["우대사항","주방 경력이 없어도 지원 가능"],["업무내용","찌개, 계란찜, 야채 손질, 음식 준비 등"],["지원방법","문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락해주세요"],["연락처","0492 835 133"],["이메일","sinyoungparktwo4859@gmail.com"]]$j$::jsonb,
  detail_intro = $t$허스트빌에 위치한 Stoneage Korean BBQ 석기시대에서 함께할 주방 스토브파트 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"모집 분야","items":["주방 스토브파트"]},{"title":"근무조건","items":["시급 $25 ~ $28","풀타임 오전 10시 30분 ~ 오후 10시","월요일~금요일 오후 3시 ~ 오후 4시 45분 브레이크 타임"]},{"title":"업무 내용","items":["찌개, 계란찜, 야채 손질, 음식 준비 등이 주요 업무입니다","파트별로 업무가 나뉘어 있어 체계적으로 일할 수 있습니다","주방 경력이 없어도 친절히 알려드립니다"]},{"title":"지원 방법","items":["문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락해주세요","연락처: 0492 835 133","이메일: sinyoungparktwo4859@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['주방스토브파트','Korean BBQ','경력 무관','체계적인 업무분담','음식준비']
WHERE id = '3d9891c2-dc4f-4c0f-bb7d-18ef449de99e';

-- Stoneage Hurstville (홀)
UPDATE public.company_job_openings SET
  title = $t$석기시대 허스트빌점, 시티에서 20분 거리 홀 스태프 채용$t$,
  condition_rows = $j$[["급여","$25 ~ $28"],["근무지역","266 Forest Rd, Hurstville NSW 2220","Stoneage Korean BBQ 석기시대 허스트빌"],["근무요일","협의 가능","요식업 특성상 금토일 근무 필수"],["근무시간","풀타임 10:30~22:00 / 파트타임 17:00 또는 18:00~22:00","월요일~금요일 15:00~16:45 브레이크 타임, 라스트오더 21:00"],["모집분야","홀"],["복리후생","현지인·외국인 손님 응대 경험, 영어 실력 향상 가능"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","홀 스태프"],["모집분야","홀"],["우대사항","연령, 경력 상관없이 지원 가능"],["업무내용","홀 고객응대 및 매장 업무"],["지원방법","문자로 이름/나이/비자상태/근무 가능 요일을 포함해 연락해주세요"],["연락처","0405 337 022"],["이메일","janepark6249@gmail.com"]]$j$::jsonb,
  detail_intro = $t$허스트빌에 위치한 Stoneage Korean BBQ 석기시대에서 함께 일할 홀 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"근무시간","items":["풀타임 10:30~22:00","파트타임 17:00 또는 18:00~22:00","월요일~금요일 15:00~16:45 브레이크 타임","라스트오더 오후 9시, 상황에 따라 퇴근시간 변동 가능","요식업 특성상 금토일 근무 필수"]},{"title":"근무조건","items":["시급 $25~$28","홀 파트","연령, 경력 상관없이 지원 가능"]},{"title":"지원 방법","items":["문자로 이름/나이/비자상태/근무 가능 요일을 포함해 연락해주세요","예: 홍길동/26/워킹00개월남음/모든요일가능","연락처: 0405 337 022","이메일: janepark6249@gmail.com","면접 시 이력서를 지참해주세요"]}]$j$::jsonb,
  skill_tags = ARRAY['홀스태프','고객응대','Korean BBQ','경력 무관','영어 응대','금토일 근무']
WHERE id = 'a7d15a6e-3174-40c2-bdde-f2f909816c53';

-- Stoneage West Ryde
UPDATE public.company_job_openings SET
  title = $t$석기시대 웨스트라이드점 주방 및 홀 스태프 채용$t$,
  condition_rows = $j$[["급여","면접 후 결정"],["근무지역","1A Chatham Rd, West Ryde NSW 2114","Stoneage Korean BBQ 석기시대"],["근무요일","협의 가능"],["근무시간","풀타임 10:30~22:00 / 파트타임 10:30~14:30 또는 16:45~22:00","평일 브레이크 타임 14:30~16:45, 라스트오더 21:00"],["모집분야","주방 스토브파트, 홀 파트"],["복리후생","식사 제공"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","주방 및 홀 스태프"],["모집분야","주방 스토브파트, 홀 파트"],["업무내용","주방: 찌개, 계란찜, 야채 손질, 고기 준비 등 / 홀: 고객응대 및 홀 업무"],["우대사항","경력 무관 지원 가능, 친절히 교육해드립니다"],["지원방법","문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락해주세요"],["연락처","0431 085 242"],["이메일","stoneage974@gmail.com"]]$j$::jsonb,
  detail_intro = $t$웨스트라이드에 위치한 Stoneage Korean BBQ 석기시대에서 함께 일할 주방 및 홀 스태프를 모집합니다.$t$,
  detail_sections = $j$[{"title":"모집 분야","items":["주방 스토브파트","홀 파트"]},{"title":"근무시간","items":["풀타임 오전 10시 30분 ~ 오후 10시","파트타임 오전 10시 30분 ~ 오후 2시 30분 또는 오후 4시 45분 ~ 오후 10시","평일 브레이크 타임 오후 2시 30분 ~ 오후 4시 45분","주말 파트타임은 시간 변동 가능","라스트오더 오후 9시"]},{"title":"업무 내용","items":["주방: 찌개, 계란찜, 야채 손질, 고기 준비 등","홀: 고객응대 및 홀 업무","경력이 없어도 어렵지 않게 배울 수 있도록 친절히 알려드립니다"]},{"title":"지원 방법","items":["문자로 간단한 경력 및 자기소개, 지원분야, 이름/나이/경력을 포함해 연락해주세요","연락처: 0431 085 242","이메일: stoneage974@gmail.com"]}]$j$::jsonb,
  skill_tags = ARRAY['주방스토브파트','홀파트','Korean BBQ','경력 무관','식사제공','고객응대']
WHERE id = '76d89920-58cf-44bb-aadf-f6e5c1191a10';

-- Sushi Yuzen Sydney CBD
UPDATE public.company_job_openings SET
  title = $t$스시유젠 시드니 시티점 롤메이커 채용$t$,
  condition_rows = $j$[["급여","$33.19 + Super"],["근무지역","Shop HC 32, 301 George Street, Sydney NSW 2000","Sydney CBD"],["근무형태","Tax Job only"],["근무요일","월~금요일","5 Days, 주 30시간"],["근무시간","08:00 - 14:30"],["담당업무","스시 롤메이킹, 밥과 재료 준비, 친절한 고객 응대"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","SUSHI YUZEN Sydney CBD 롤메이커 1명"],["지원자격","스시 롤메이킹 경험, 긍정적이고 밝은 성격, 문제 없는 비자 및 최소 1년 이상 근무 가능"],["우대사항","테이크어웨이 매장 또는 스시 레스토랑 경험자, 생선 손질 가능자"],["지원방법","이메일로 지원해주세요"],["지원서류","지원하는 매장 및 포지션(예: Sydney, Roll Maker), 이력서, 비자상태와 비자만료일"],["이메일","hr@sushiyuzen.com.au"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['스시롤메이킹','스시밥준비','재료준비','고객응대','일식주방','Tax Job']
WHERE id = '83e1eada-f44d-40f7-88ad-e119b6f0d2c5';

-- Yangga Korean Deli Chatswood
UPDATE public.company_job_openings SET
  title = $t$양가 코리안 델리 채스우드점 홀 스태프 채용$t$,
  condition_rows = $j$[["급여","면접 시 경력에 따라 협의","주말 시급은 평일 시급의 1.25배 적용"],["근무지역","Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067","채스우드점"],["근무형태","홀 스태프 1명"],["근무요일","목, 금, 토, 일"],["담당업무","홀 업무, 고객응대, 매장 판매 지원"]]$j$::jsonb,
  recruitment_rows = $j$[["모집마감","상시모집"],["모집인원","홀 스태프 1명"],["지원자격","손이 빠르고 책임감 있으신 분, 밝고 긍정적인 마인드로 팀워크가 가능하신 분, TFN 소지자 필수"],["지원방법","이메일 또는 문자로 지원해주세요"],["연락처","0450 622 558"],["이메일","yanggafoods@gmail.com"],["지원서류","이름, 나이, 거주 지역, 근무 시작 가능일, 비자 상태(비자 만료일 포함), 지원 포지션, 간단한 경력"]]$j$::jsonb,
  detail_intro = NULL,
  detail_sections = '[]'::jsonb,
  skill_tags = ARRAY['홀업무','고객응대','매장판매','팀워크','TFN 필수']
WHERE id = '2b23dcc0-a241-49f1-86dc-ae6fee3c547c';
