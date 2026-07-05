INSERT INTO public.company_profiles (
  slug,
  name,
  profile_title,
  subtitle,
  logo_url,
  photo_url,
  badges,
  about_paragraphs,
  phone,
  phone_href,
  email,
  instagram_url,
  instagram_handle,
  address,
  map_query,
  condition_rows,
  recruitment_rows,
  skill_tags
) VALUES (
  'dkhairstudio',
  'DK Hair Studio',
  'DK Hair Studio 직원 모집',
  'Sydney''s Premium Korean Hair Studio — 버우드 · 헤이마켓 · 채스우드 · 로즈 · 브로드웨이',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/dk-hairstudio.jpg',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/dk-hairstudio.jpg',
  ARRAY['구인', 'NSW', '여러 지점', '상시모집', '파트타임 / 풀타임'],
  ARRAY[
    'DK Hair Studio는 시드니 전역에서 운영되는 프리미엄 코리안 헤어 스튜디오로, 버우드, 헤이마켓, 채스우드, 로즈, 브로드웨이 등 주요 한인 생활권과 도심 지역에 지점을 두고 있습니다.',
    '고객별 상담을 바탕으로 컷, 컬러, 펌, 스타일링 서비스를 제공하며, 따뜻한 부티크 살롱 분위기와 전문적인 디자이너 서비스를 중요하게 생각합니다. 헤어 업계 경력자와 성장 의지가 있는 주니어 스태프 모두 환영합니다.'
  ],
  '0491 709 913',
  '+61491709913',
  'dkhairstudio.dk@gmail.com',
  'https://www.instagram.com/dk_hairstudio/?hl=en',
  '@dk_hairstudio',
  'Shop 4/160 Broadway, Chippendale NSW 2008',
  'Shop 4/160 Broadway, Chippendale NSW 2008',
  '[
    ["급여", "면접 시 협의", "포지션, 경력, 근무 가능 요일에 따라 협의"],
    ["근무지역", "버우드 · 헤이마켓 · 채스우드 · 로즈 · 브로드웨이", "지점별 별도 채용"],
    ["근무요일", "풀타임 / 파트타임", "주말 근무 가능자 우대"],
    ["근무시간", "살롱 운영 시간 내 협의", "지점 및 예약 상황에 따라 조율"],
    ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대, 트레이닝 가능"],
    ["복리후생", "법정 연금, 유급 휴가, 기술 트레이닝, 팀 근무 환경", "Hair and Beauty Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "헤어 살롱 경력, 컬러/펌/컷 경험, 기본 영어 소통, 장기 근무 가능"],
    ["지원방법", "인스타그램 DM 또는 이메일로 이름, 연락처, 경력, 희망 지점, 가능 요일을 전달"]
  ]'::jsonb,
  ARRAY['헤어컷', '컬러', '펌', '샴푸', '고객상담', '리셉션']
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  profile_title = EXCLUDED.profile_title,
  subtitle = EXCLUDED.subtitle,
  logo_url = EXCLUDED.logo_url,
  photo_url = EXCLUDED.photo_url,
  badges = EXCLUDED.badges,
  about_paragraphs = EXCLUDED.about_paragraphs,
  phone = EXCLUDED.phone,
  phone_href = EXCLUDED.phone_href,
  email = EXCLUDED.email,
  instagram_url = EXCLUDED.instagram_url,
  instagram_handle = EXCLUDED.instagram_handle,
  address = EXCLUDED.address,
  map_query = EXCLUDED.map_query,
  condition_rows = EXCLUDED.condition_rows,
  recruitment_rows = EXCLUDED.recruitment_rows,
  skill_tags = EXCLUDED.skill_tags,
  is_active = true,
  updated_at = now();

DELETE FROM public.company_branches
WHERE company_slug = 'dkhairstudio';

INSERT INTO public.company_branches (
  company_slug,
  branch_name,
  branch_label,
  address,
  map_query,
  phone,
  phone_href,
  email,
  condition_rows,
  recruitment_rows,
  sort_order
) VALUES
(
  'dkhairstudio',
  '버우드',
  'Burwood',
  '35AA Burwood Rd, Burwood NSW 2134',
  '35AA Burwood Rd, Burwood NSW 2134',
  '0491 709 913',
  '+61491709913',
  'dkhairstudio.dk@gmail.com',
  '[["급여", "면접 시 협의", "포지션과 경력에 따라 협의"], ["근무지역", "35AA Burwood Rd, Burwood NSW 2134", "DK Hairstudio Burwood"], ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대"]]'::jsonb,
  '[["모집마감", "상시모집"], ["모집인원", "지점별 1~3명"], ["지원방법", "인스타그램 DM 또는 이메일로 지원"]]'::jsonb,
  1
),
(
  'dkhairstudio',
  '헤이마켓',
  'Haymarket',
  '812B George St, Haymarket NSW 2000',
  '812B George St, Haymarket NSW 2000',
  '0491 709 913',
  '+61491709913',
  'dkhairstudio.dk@gmail.com',
  '[["급여", "면접 시 협의", "포지션과 경력에 따라 협의"], ["근무지역", "812B George St, Haymarket NSW 2000", "DK Hairstudio Haymarket"], ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대"]]'::jsonb,
  '[["모집마감", "상시모집"], ["모집인원", "지점별 1~3명"], ["지원방법", "인스타그램 DM 또는 이메일로 지원"]]'::jsonb,
  2
),
(
  'dkhairstudio',
  '채스우드',
  'Chatswood',
  'Shop 1/77 Archer St, Chatswood NSW 2067',
  'Shop 1/77 Archer St, Chatswood NSW 2067',
  '0491 709 913',
  '+61491709913',
  'dkhairstudio.dk@gmail.com',
  '[["급여", "면접 시 협의", "포지션과 경력에 따라 협의"], ["근무지역", "Shop 1/77 Archer St, Chatswood NSW 2067", "DK Hairstudio Chatswood"], ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대"]]'::jsonb,
  '[["모집마감", "상시모집"], ["모집인원", "지점별 1~3명"], ["지원방법", "인스타그램 DM 또는 이메일로 지원"]]'::jsonb,
  3
),
(
  'dkhairstudio',
  '로즈',
  'Rhodes',
  'Rhodes NSW 2138',
  'Rhodes NSW 2138',
  '0491 709 913',
  '+61491709913',
  'dkhairstudio.dk@gmail.com',
  '[["급여", "면접 시 협의", "포지션과 경력에 따라 협의"], ["근무지역", "Rhodes NSW 2138", "DK Hairstudio Rhodes"], ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대"]]'::jsonb,
  '[["모집마감", "상시모집"], ["모집인원", "지점별 1~3명"], ["지원방법", "인스타그램 DM 또는 이메일로 지원"]]'::jsonb,
  4
),
(
  'dkhairstudio',
  '브로드웨이',
  'Broadway',
  'Shop 4/160 Broadway, Chippendale NSW 2008',
  'Shop 4/160 Broadway, Chippendale NSW 2008',
  '0491 709 913',
  '+61491709913',
  'dkhairstudio.dk@gmail.com',
  '[["급여", "면접 시 협의", "포지션과 경력에 따라 협의"], ["근무지역", "Shop 4/160 Broadway, Chippendale NSW 2008", "DK Hairstudio Broadway"], ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대"]]'::jsonb,
  '[["모집마감", "상시모집"], ["모집인원", "지점별 1~3명"], ["지원방법", "인스타그램 DM 또는 이메일로 지원"]]'::jsonb,
  5
);

DELETE FROM public.homepage_job_cards
WHERE company_label = 'DK Hair Studio'
   OR job_url = '/company/dkhairstudio';

INSERT INTO public.homepage_job_cards (
  sort_order,
  logo_text,
  logo_url,
  logo_tone,
  company_label,
  location_label,
  title,
  pay_type,
  pay_amount,
  job_url
) VALUES (
  11,
  'DK Hair Studio',
  'https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/dk-hairstudio.jpg',
  'black',
  'DK Hair Studio',
  'NSW · 여러 지점',
  'DK Hair Studio 직원 모집',
  '급여',
  '면접 시 협의',
  '/company/dkhairstudio'
);
