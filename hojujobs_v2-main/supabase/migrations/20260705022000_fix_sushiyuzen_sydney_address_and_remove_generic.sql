UPDATE public.company_branches
SET
  address = 'Shop HC 32, 301 George Street, Sydney NSW 2000',
  map_query = 'Shop HC 32, 301 George Street, Sydney NSW 2000',
  updated_at = now()
WHERE company_slug = 'sushiyuzen'
  AND branch_name = '시드니 CBD';

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
  AND branch.company_slug = 'sushiyuzen'
  AND branch.branch_name = '시드니 CBD'
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(opening.condition_rows) AS row_item
    WHERE row_item->>0 = '근무지역'
  );

DELETE FROM public.company_job_openings
WHERE company_slug = 'sushiyuzen'
  AND title = 'SUSHI YUZEN 직원 모집';
