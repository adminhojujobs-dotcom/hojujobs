-- Refreshes the Mingles Australia community_events row with a real, dated event
-- (was a generic Instagram placeholder) sourced from mingley.com.au.
UPDATE public.community_events
SET
  title = '밍글스 시드니 한인 싱글파티 (무제한 와인)',
  description = '20~30대 재호주 한인을 위한 무제한 와인 스탠딩 소셜파티. 참가자 전원 직업·신원 확인을 거치며, 전문 호스트가 프라이빗 베뉴에서 행사를 진행합니다.',
  event_date_label = '7월 22일',
  location_label = '시드니',
  image_url = 'https://lhpgwniytpjowkgtllxq.supabase.co/storage/v1/object/public/event-images/event-detailed-9a6cb48c-6b0f-44b6-946c-07beab1e0e12-1765264341947-1765264341948.jpg',
  source_url = 'https://mingley.com.au/en/event-detail/?id=9a6cb48c-6b0f-44b6-946c-07beab1e0e12',
  updated_at = now()
WHERE organizer = 'Mingles Australia';
