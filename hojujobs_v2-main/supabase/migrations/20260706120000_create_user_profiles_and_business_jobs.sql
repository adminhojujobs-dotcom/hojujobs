create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  account_type text not null check (account_type in ('job_seeker', 'business')),
  onboarding_completed boolean not null default false,
  job_email_opt_in boolean not null default false,
  full_name text,
  contact_number text,
  email text,
  visa_type text,
  introduction text,
  education text,
  work_history text,
  other_info text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_job_listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  branch_id uuid not null references public.company_branches (id) on delete restrict,
  company_slug text not null,
  title text not null,
  salary text,
  details text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_profiles_account_type on public.user_profiles (account_type);
create index if not exists idx_business_job_listings_user_id on public.business_job_listings (user_id);
create index if not exists idx_business_job_listings_branch_id on public.business_job_listings (branch_id);
create index if not exists idx_business_job_listings_company_slug on public.business_job_listings (company_slug);

alter table public.user_profiles enable row level security;
alter table public.business_job_listings enable row level security;

create policy "Users can read own profile"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = user_id);

create policy "Users can read own business job listings"
  on public.business_job_listings for select
  using (auth.uid() = user_id);

create policy "Public can read active business job listings"
  on public.business_job_listings for select
  using (is_active = true);

create policy "Users can insert own business job listings"
  on public.business_job_listings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own business job listings"
  on public.business_job_listings for update
  using (auth.uid() = user_id);

create policy "Users can delete own business job listings"
  on public.business_job_listings for delete
  using (auth.uid() = user_id);
