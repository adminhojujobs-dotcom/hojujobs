-- Drops company_profiles columns that are fetched via select("*") but never
-- read from the row anywhere in the frontend. condition_rows/recruitment_rows
-- were superseded by the same-named columns on company_job_openings, which
-- are the ones actually rendered on job detail pages. badges/about_paragraphs/
-- phone_href/instagram_url/instagram_handle only ever existed as hardcoded
-- fallback constants duplicated per company page, never from the fetched row.
ALTER TABLE public.company_profiles
  DROP COLUMN badges,
  DROP COLUMN about_paragraphs,
  DROP COLUMN phone_href,
  DROP COLUMN instagram_url,
  DROP COLUMN instagram_handle,
  DROP COLUMN condition_rows,
  DROP COLUMN recruitment_rows;
