-- The DK Hair Studio Haymarket listing still had a dash-run-on 급여 blob
-- ("-시급제 ... -커미션제 ... -제품 판매 커미션 ...") shown both as the big
-- top-of-page pay figure and as the 근무조건 > 급여 row, plus a scissors
-- emoji in the title and a star emoji in detail_intro. Splits pay into a
-- clean headline (hourly range) with the commission detail moved to the
-- row's note, splits 근무요일's trailing "-수습기간 있음" into its own note,
-- and strips the two emoji. All figures/wording preserved verbatim.
UPDATE public.company_job_openings
SET
  title = 'DK HAIRSTUDIO 채용 시드니 5개 지점 — 인턴 & 디자이너 모집',
  pay = '경력 디자이너 $37–$40+ / 경력 인턴 up to $29+',
  detail_intro = replace(detail_intro, '⭐ DK HAIRSTUDIO의 핵심 강점은', 'DK HAIRSTUDIO의 핵심 강점은'),
  condition_rows = jsonb_build_array(
    jsonb_build_array('급여', '경력 디자이너 $37–$40+ / 경력 인턴 up to $29+', '커미션제 선택 가능: 총매출 10% 공제 후 43–48% 지급 (예: 매출 $19,945 → 커미션 45% = $8,078, 2주급) · 제품 판매 커미션 시급제 15%'),
    condition_rows -> 1,
    jsonb_build_array('근무요일', '주 4–5일 근무 (주말 포함)', '수습기간 있음'),
    condition_rows -> 3,
    condition_rows -> 4,
    condition_rows -> 5
  ),
  updated_at = now()
WHERE id = 'c1210e58-7be0-4479-940a-75513cbc01aa';
