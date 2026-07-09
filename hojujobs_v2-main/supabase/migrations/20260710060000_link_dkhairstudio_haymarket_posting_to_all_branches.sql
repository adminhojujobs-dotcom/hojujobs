-- The DK Hair Studio Haymarket listing's title/content ("시드니 5개 지점")
-- was always meant to cover all 5 branches. Rather than duplicating the row
-- per branch, this makes it branch-agnostic (branch_id null, suburb
-- "여러 지점", 근무지역 listing all 5 addresses) — the same convention
-- already used by DK's other multi-branch listing (19b40f21).
UPDATE public.company_job_openings
SET
  branch_id = NULL,
  suburb = '여러 지점',
  company = 'DK HAIRSTUDIO',
  condition_rows = jsonb_build_array(
    condition_rows -> 0,
    jsonb_build_array('근무지역', 'Rhodes · Chatswood · Broadway · Burwood · Haymarket', '시드니 5개 지점'),
    condition_rows -> 2,
    condition_rows -> 3,
    condition_rows -> 4,
    condition_rows -> 5
  ),
  updated_at = now()
WHERE id = 'c1210e58-7be0-4479-940a-75513cbc01aa';
