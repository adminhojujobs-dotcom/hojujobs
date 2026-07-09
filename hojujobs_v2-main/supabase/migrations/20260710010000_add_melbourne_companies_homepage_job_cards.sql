-- Adds the 5 new Melbourne companies (BBQ Code, PAIK'S BBQ, DOOBOO,
-- SamSam Chicken & Beer, Bornga) to the homepage "지금 알바 모집 중인 곳들"
-- card grid, matching the existing 8 rows' convention.
INSERT INTO public.homepage_job_cards
  (sort_order, logo_text, logo_url, logo_tone, company_label, location_label, title, pay_type, pay_amount, job_url, is_active)
VALUES
  (16, 'BBQ Code', 'https://www.google.com/s2/favicons?domain=bbqcode.com.au&sz=256', 'purple', 'BBQ Code', 'VIC · 여러 지점', 'BBQ Code 직원 모집', '급여', '면접 시 협의', '/company/bbqcode', true),
  (17, E'PAIK\'S BBQ', 'https://ui-avatars.com/api/?name=PAIK%27S+BBQ&background=111827&color=fff&size=256&bold=true', 'blue-dark', E'PAIK\'S BBQ', 'VIC', E'PAIK\'S BBQ 직원 모집', '급여', '면접 시 협의', '/company/paiksbbq', true),
  (18, 'DOOBOO', 'https://images.squarespace-cdn.com/content/v1/6281bd30d89ad1244a348d0e/6854b493-de91-44b5-ba33-6fa61c8a34b6/Dooboo-Logo-%28Hot-Pot%292.png?format=1500w', 'blue', 'DOOBOO', 'VIC · 여러 지점', 'DOOBOO 직원 모집', '급여', '면접 시 협의', '/company/dooboo', true),
  (19, E'SamSam\nChicken & Beer', 'https://images.squarespace-cdn.com/content/v1/5ab08d4d1aef1d04ff510c72/1607573003335-Y4H31KSPNHWMUL8LDUAT/SamSam_Symbol-01.png', 'red', 'SamSam Chicken & Beer', 'VIC · 여러 지점', 'SamSam Chicken & Beer 직원 모집', '급여', '면접 시 협의', '/company/samsamchicken', true),
  (20, 'Bornga', 'https://www.google.com/s2/favicons?domain=bornga.kr&sz=256', 'black', 'Bornga', 'VIC', 'Bornga 직원 모집', '급여', '면접 시 협의', '/company/bornga', true);
