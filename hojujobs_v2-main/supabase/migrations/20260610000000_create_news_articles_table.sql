-- Create news_articles table for the HojuJobs news page
create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),

  category_key text not null,
  category_label_ko text not null,
  category_summary_ko text,
  category_tone text,

  title text not null,
  summary_ko text not null,
  meta text,
  published_at_label_ko text,

  source_name text not null,
  source_url text not null unique,
  source_domain text,
  original_published_at timestamptz,

  is_featured boolean not null default false,
  show_on_news_page boolean not null default true,
  show_on_dashboard boolean not null default false,
  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint news_articles_category_key_check
    check (category_key in (
      'settle',
      'commute',
      'culture',
      'travel',
      'visa',
      'jobs',
      'education',
      'housing',
      'money',
      'safety',
      'community',
      'korea-australia'
    ))
);

-- Indexes
create index if not exists news_articles_news_page_idx
on public.news_articles (
  show_on_news_page,
  category_key,
  sort_order,
  original_published_at desc
);

create index if not exists news_articles_dashboard_idx
on public.news_articles (
  show_on_dashboard,
  sort_order,
  original_published_at desc
);

create index if not exists news_articles_source_url_idx
on public.news_articles (source_url);

-- RLS
alter table public.news_articles enable row level security;

-- Public read policy (only if not exists)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'news_articles'
      and policyname = 'Public can read visible news articles'
  ) then
    execute $policy$
      create policy "Public can read visible news articles"
      on public.news_articles
      for select
      using (
        show_on_news_page = true
        or show_on_dashboard = true
      )
    $policy$;
  end if;
end;
$$;

-- updated_at trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_news_articles_updated_at on public.news_articles;

create trigger set_news_articles_updated_at
before update on public.news_articles
for each row
execute function public.set_updated_at();
