UPDATE public.company_branches
SET
  address = 'Lower Ground, 6 Walker St, Rhodes NSW 2138',
  map_query = 'Lower Ground, 6 Walker St, Rhodes NSW 2138',
  updated_at = now()
WHERE company_slug = 'yanggadeli'
  AND branch_name = '로즈';

UPDATE public.company_job_openings AS opening
SET
  condition_rows = (
    SELECT jsonb_agg(
      CASE
        WHEN row_item->>0 = '근무지역' THEN
          jsonb_build_array(
            '근무지역',
            branch.address,
            COALESCE(NULLIF(branch.branch_label, ''), NULLIF(branch.branch_name, ''), opening.company)
          )
        ELSE row_item
      END
      ORDER BY row_ordinality
    )
    FROM jsonb_array_elements(opening.condition_rows) WITH ORDINALITY AS rows(row_item, row_ordinality)
  ),
  updated_at = now()
FROM public.company_branches AS branch
WHERE branch.id = opening.branch_id
  AND branch.company_slug = 'yanggadeli'
  AND branch.branch_name = '로즈'
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(opening.condition_rows) AS row_item
    WHERE row_item->>0 = '근무지역'
  );
