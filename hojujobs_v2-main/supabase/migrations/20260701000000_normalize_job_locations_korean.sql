with location_map(from_loc, to_loc) as (
  values
    ('NSW', '시드니'),
    ('WA', '퍼스'),
    ('기라윈', '지라윈'),
    ('노던 비치 에어리어', '노던 비치'),
    ('노던 비치스', '노던 비치'),
    ('노던 비치즈', '노던 비치'),
    ('노스브리지', '노스 브릿지'),
    ('노스쇼어', '노스 쇼어'),
    ('노스웨스트', '노웨스트'),
    ('뉴카슬', '뉴캐슬'),
    ('돈카스터', '돈캐스터'),
    ('돈카스터 이스트', '돈캐스터 이스트'),
    ('라우즈힐', '라우스 힐'),
    ('라이달미어', '리달미어'),
    ('레이컴바', '라켐바'),
    ('마운트 드루잇', '마운트 드루이트'),
    ('뱅스타운', '뱅크스타운'),
    ('버크루즈', '바클루즈'),
    ('발윈', '볼윈'),
    ('볼컴 힐스', '버컴 힐스'),
    ('센트럴코스트', '센트럴 코스트'),
    ('시티 브로드웨이', '브로드웨이'),
    ('시티 타운홀', '타운홀'),
    ('써리힐', '서리 힐스'),
    ('어번', '오번'),
    ('어밍턴', '어밍톤'),
    ('올림픽파크', '올림픽 파크'),
    ('울구울가', '울굴가'),
    ('워터루', '워털루'),
    ('캅스 하버', '콥스 하버'),
    ('코프스 하버', '콥스 하버'),
    ('클레이튼', '클레이턴'),
    ('테리힐', '테리힐즈'),
    ('템페', '템피'),
    ('풋츠크레이', '풋스크레이'),
    ('홈부시', '홈부쉬'),
    ('매도뱅크', '메도우뱅크'),
    ('메도뱅크', '메도우뱅크'),
    ('바랑갈루', '바랑가루'),
    ('매랙빌', '매릭빌')
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
