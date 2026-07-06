alter table public.company_job_openings
  add column if not exists quick_apply boolean not null default false,
  add column if not exists posted_by_user_id uuid references auth.users (id) on delete set null;

create index if not exists idx_company_job_openings_posted_by_user_id
  on public.company_job_openings (posted_by_user_id);

create table if not exists public.company_job_applications (
  id uuid primary key default gen_random_uuid(),
  opening_id uuid not null references public.company_job_openings (id) on delete cascade,
  applicant_user_id uuid not null references auth.users (id) on delete cascade,
  cv_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (opening_id, applicant_user_id)
);

create index if not exists idx_company_job_applications_opening_id
  on public.company_job_applications (opening_id);

create index if not exists idx_company_job_applications_applicant_user_id
  on public.company_job_applications (applicant_user_id);

alter table public.company_job_applications enable row level security;

create policy "Applicants can read own company job applications"
  on public.company_job_applications for select
  using (auth.uid() = applicant_user_id);

create policy "Opening owners can read applications"
  on public.company_job_applications for select
  using (
    exists (
      select 1
      from public.company_job_openings cjo
      where cjo.id = opening_id
        and cjo.posted_by_user_id = auth.uid()
    )
  );

create policy "Users can apply to quick apply company openings"
  on public.company_job_applications for insert
  with check (
    auth.uid() = applicant_user_id
    and exists (
      select 1
      from public.company_job_openings cjo
      where cjo.id = opening_id
        and cjo.quick_apply = true
        and cjo.is_active = true
        and (cjo.posted_by_user_id is null or cjo.posted_by_user_id != auth.uid())
    )
  );

create policy "Owners can read own company job openings"
  on public.company_job_openings for select
  using (posted_by_user_id = auth.uid());

create policy "Business users can insert company job openings"
  on public.company_job_openings for insert
  with check (
    posted_by_user_id = auth.uid()
    and exists (
      select 1
      from public.user_profiles up
      where up.user_id = auth.uid()
        and up.account_type = 'business'
    )
  );

create policy "Owners can update own company job openings"
  on public.company_job_openings for update
  using (posted_by_user_id = auth.uid())
  with check (posted_by_user_id = auth.uid());

create policy "Owners can delete own company job openings"
  on public.company_job_openings for delete
  using (posted_by_user_id = auth.uid());
