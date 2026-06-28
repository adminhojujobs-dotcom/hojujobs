alter table public.jobs
  add column if not exists image_url text;

alter table public.jobs_archive
  add column if not exists image_url text;
