with location_map(from_loc, to_loc) as (
  values
    ('시드니 CBD', '시드니 시티'),
    ('멜버른 CBD', '멜버른 시티')
),
normalized_jobs as (
  select
    j.id,
    array(
      select normalized_loc
      from (
        select
          coalesce(m.to_loc, loc_value) as normalized_loc,
          min(ord) as first_seen
        from unnest(j.location) with ordinality as u(loc_value, ord)
        left join location_map m on m.from_loc = u.loc_value
        group by coalesce(m.to_loc, loc_value)
      ) normalized
      order by first_seen
    ) as normalized_location
  from public.jobs j
  where j.location && (select array_agg(from_loc) from location_map)
)
update public.jobs j
set location = n.normalized_location
from normalized_jobs n
where j.id = n.id
  and j.location is distinct from n.normalized_location;
