alter table public.business_job_listings
  add column if not exists quick_apply boolean not null default false;

create table if not exists public.business_job_applications (
  id uuid primary key default gen_random_uuid(),
  job_listing_id uuid not null references public.business_job_listings (id) on delete cascade,
  applicant_user_id uuid not null references auth.users (id) on delete cascade,
  cv_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (job_listing_id, applicant_user_id)
);

create index if not exists idx_business_job_applications_job_listing_id
  on public.business_job_applications (job_listing_id);

create index if not exists idx_business_job_applications_applicant_user_id
  on public.business_job_applications (applicant_user_id);

alter table public.business_job_applications enable row level security;

create policy "Applicants can read own applications"
  on public.business_job_applications for select
  using (auth.uid() = applicant_user_id);

create policy "Job owners can read applications for their listings"
  on public.business_job_applications for select
  using (
    exists (
      select 1
      from public.business_job_listings bjl
      where bjl.id = job_listing_id
        and bjl.user_id = auth.uid()
    )
  );

create policy "Users can apply to quick apply listings"
  on public.business_job_applications for insert
  with check (
    auth.uid() = applicant_user_id
    and exists (
      select 1
      from public.business_job_listings bjl
      where bjl.id = job_listing_id
        and bjl.quick_apply = true
        and bjl.is_active = true
        and bjl.user_id != auth.uid()
    )
  );
