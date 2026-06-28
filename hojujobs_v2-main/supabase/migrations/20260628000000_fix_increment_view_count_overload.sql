drop function if exists public.increment_view_count(bigint);

do $$
begin
  if exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'view_counts'
  ) then
    alter publication supabase_realtime drop table public.view_counts;
  end if;
end $$;

create or replace function public.increment_view_count(p_job_id integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.view_counts (job_id, count, updated_at)
  values (p_job_id, 1, now())
  on conflict (job_id)
  do update set
    count = public.view_counts.count + 1,
    updated_at = now()
  returning count into new_count;

  return new_count;
end;
$$;

grant execute on function public.increment_view_count(integer) to anon, authenticated;
