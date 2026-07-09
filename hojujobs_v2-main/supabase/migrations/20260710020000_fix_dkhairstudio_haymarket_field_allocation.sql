-- The DK Hair Studio Haymarket listing (posted by a user) had its company
-- intro/culture paragraph jammed into recruitment_rows' "우대사항" entry
-- instead of detail_intro, and condition_rows had "근무요일" appended out of
-- order. Moves the text verbatim (via jsonb ops, no retyping) into the right
-- fields and array positions; wording is untouched.
UPDATE public.company_job_openings
SET
  detail_intro = recruitment_rows -> 3 ->> 1,
  recruitment_rows = recruitment_rows - 3,
  condition_rows = jsonb_build_array(
    condition_rows -> 0,
    condition_rows -> 1,
    condition_rows -> 4,
    condition_rows -> 2,
    condition_rows -> 3
  ),
  updated_at = now()
WHERE id = 'c1210e58-7be0-4479-940a-75513cbc01aa'
  AND recruitment_rows -> 3 ->> 0 = '우대사항';
