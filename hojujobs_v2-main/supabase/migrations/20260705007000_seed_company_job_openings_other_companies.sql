-- One faithful job_openings row per company, using each company's existing
-- profile_title / condition_rows text verbatim (no invented per-suburb/per-role postings).
INSERT INTO public.company_job_openings (
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order
) VALUES
('bunsik', NULL, 'NSW', 'Parramatta', 'BUNSIK 직원 모집', 'BUNSIK', '면접 시 협의', '급여', '09:00 ~ 18:00 (매장별 상이)', '상시', 1),
('sushiyuzen', NULL, 'NSW', 'Parramatta', 'SUSHI YUZEN 직원 모집', 'SUSHI YUZEN', '$31.19 ~ $35.15 + Super', '시급', '매장별 상이 (예: 08:00~14:30)', '상시', 1),
('chickenv', NULL, 'NSW', 'Sydney CBD', 'Chicken V 직원 모집', 'Chicken V', '면접 시 협의', '급여', '11:00 ~ 24:00 (시티점은 익일 새벽까지)', '상시', 1),
('parkbongsook', NULL, 'NSW', 'Eastwood', '박봉숙 직원 모집', '박봉숙', '$26.5 ~ $29.5 + 주말수당 + 연금', '시급', '이스트우드 11:00~24:00 / 시티 11AM~4AM', '상시', 1),
('yanggadeli', NULL, 'NSW', 'Chatswood', 'Yangga Deli 직원 모집', 'Yangga Deli', '면접 시 경력에 따라 협의', '급여', '07:00~15:00 / 07:00~16:30 (매장별 상이)', '상시', 1),
('stoneage', NULL, 'NSW', 'West Ryde', '석기시대 직원 모집', '석기시대', '면접 시 협의', '급여', '점심·저녁 영업 시간대', '상시', 1),
('dkhairstudio', NULL, 'NSW', 'Chippendale', 'DK Hair Studio 직원 모집', 'DK Hair Studio', '면접 시 협의', '급여', '살롱 운영 시간 내 협의', '상시', 1);
