UPDATE public.company_branches
SET
  address = '173 Burwood Road, Burwood NSW 2134',
  map_query = '173 Burwood Road, Burwood NSW 2134',
  updated_at = now()
WHERE company_slug = 'parkbongsook'
  AND branch_name = '버우드';

UPDATE public.company_job_openings
SET
  condition_rows = (
    SELECT jsonb_agg(
      CASE
        WHEN row_value->>0 = '근무지역'
          THEN jsonb_build_array('근무지역', '173 Burwood Road, Burwood NSW 2134', COALESCE(row_value->>2, 'GOGIDO 박봉숙 Burwood'))
        ELSE row_value
      END
      ORDER BY row_ordinality
    )
    FROM jsonb_array_elements(condition_rows) WITH ORDINALITY AS rows(row_value, row_ordinality)
  ),
  updated_at = now()
WHERE company_slug = 'parkbongsook'
  AND title = 'Gogido 박봉숙 Burwood 함께 성장할 직원 모집';
