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
  AND opening.condition_rows <> '[]'::jsonb
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(opening.condition_rows) AS row_item
    WHERE row_item->>0 = '근무지역'
  );
