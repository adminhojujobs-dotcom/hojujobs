-- Follow-up to 20260710020000: the DK Hair Studio Haymarket listing's
-- detail_intro was still one giant blurb (company intro + training program +
-- equipment support + promotion system + global clients + "who we're
-- looking for" + long-term perks, all run together). Splits it into the
-- fields those pieces actually belong to, matching the pattern already used
-- by DK's own other (well-formed) listing:
--   - short company intro stays in detail_intro
--   - training/equipment/promotion/global-client blurbs -> detail_sections
--     (title + bullet items; this column existed but was never rendered
--     anywhere, so this migration is paired with a CompanyJobDetail.tsx
--     change that adds a "상세 안내" section for it)
--   - "DK HAIRSTUDIO가 찾는 분" (candidate profile) -> recruitment_rows 우대사항
--   - "장기근무 혜택" (long-term perks) -> condition_rows 복리후생
-- Wording is preserved verbatim within each bullet; only comma-joining
-- follows the same convention already used by every other 우대사항/복리후생
-- value in this table.
UPDATE public.company_job_openings
SET
  detail_intro = 'DK HAIRSTUDIO는
시드니에서 가장 빠르게 성장하는 글로벌 헤어살롱으로,
강력한 교육 시스템을 기반으로 디자이너를 체계적으로 육성하고 있습니다.

⭐ DK HAIRSTUDIO의 핵심 강점은 ‘교육’이며, 시드니 최고 수준의 체계적인 교육 시스템을 운영합니다.',
  detail_sections = '[
    {"title": "주 2회 1:1 디자이너 전담교육", "items": ["실전 중심의 맞춤형 교육", "컬러·펌·포일워크·나노플라스티 등 개별 역량에 맞춘 커리큘럼", "빠른 성장 가능"]},
    {"title": "올데이 정기 교육 (전 지점 통합)", "items": ["오전: 인턴 집중 교육 + 영어 수업", "오후: 컬러 트렌드 / 로컬 테크닉 / K-펌 / 나노플라스티 실전 교육", "저녁: BBQ & 팀 네트워킹"]},
    {"title": "장비·도구 전폭 지원", "items": ["삼각대, 가발, 연습 장비 매장 제공", "SNS 촬영 장비 지원", "실전 모델 교육 적극 지원"]},
    {"title": "체계적인 승급 시스템", "items": ["총 5단계, 15개월 디자이너 양성과정", "분기별 진급 테스트", "역량에 따라 승급 기간 단축 가능"]},
    {"title": "글로벌 고객 기반", "items": ["외국인 고객 비율 높음", "로컬식 포일워크·블론드·나노플라스티 수요 많음", "실전 경험이 빠르게 쌓임"]},
    {"title": "DK에서 성장하면", "items": ["트랜디컬러·K-펌·나노플라스티·로컬 테크닉 모두 습득", "글로벌 고객 실전 경험", "SNS 브랜딩 능력 향상", "빠른 승급 가능", "팀워크 중심의 건강한 조직 문화"]}
  ]'::jsonb,
  condition_rows = condition_rows || '[["복리후생", "학생비자 학비 지원, 장기근무 보너스, 스폰서 비자 가능"]]'::jsonb,
  recruitment_rows = jsonb_build_array(
    recruitment_rows -> 0,
    recruitment_rows -> 2,
    jsonb_build_array('우대사항', '헤어 커리어를 진지하게 성장시키고 싶은 분, 트렌디한 컬러·펌·나노플라스티 배우고 싶은 분, 글로벌 고객과 소통하며 실전 감각 키우고 싶은 분, SNS 브랜딩·촬영·콘텐츠 제작에 관심 있는 분, 팀워크·성장 문화가 잘 맞는 분'),
    recruitment_rows -> 1,
    recruitment_rows -> 3,
    recruitment_rows -> 4
  ),
  updated_at = now()
WHERE id = 'c1210e58-7be0-4479-940a-75513cbc01aa';
