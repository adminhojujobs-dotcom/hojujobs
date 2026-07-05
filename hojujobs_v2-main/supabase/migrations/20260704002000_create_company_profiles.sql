CREATE TABLE public.company_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  profile_title text NOT NULL,
  subtitle text NOT NULL,
  logo_url text NOT NULL,
  photo_url text,
  badges text[] NOT NULL DEFAULT '{}',
  about_paragraphs text[] NOT NULL DEFAULT '{}',
  phone text,
  phone_href text,
  email text,
  instagram_url text,
  instagram_handle text,
  address text NOT NULL,
  map_query text,
  condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
  recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
  skill_tags text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active company profiles"
ON public.company_profiles
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can read all company profiles"
ON public.company_profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert company profiles"
ON public.company_profiles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update company profiles"
ON public.company_profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete company profiles"
ON public.company_profiles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

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
  'kmall09',
  'KMALL09',
  'KMALL09 직원 모집',
  '호주 최대 규모의 한국식 백화점·그로서리 스토어',
  'https://kmall09.com.au/cdn/shop/files/LOGO_COLOR_SETTING-01.jpg?v=1768457068&width=480',
  'https://static.wixstatic.com/media/fc9cb9_73509c4a52b94edeba32f754c926b5b7~mv2.png/v1/fill/w_1000%2Ch_541%2Cq_90%2Cenc_avif%2Cquality_auto/fc9cb9_73509c4a52b94edeba32f754c926b5b7~mv2.png',
  ARRAY['구인', 'NSW', '리드컴', '상시모집', '풀타임 / 파트타임'],
  ARRAY[
    'KMALL09는 한국 식품, 뷰티, 생활용품, 트렌드 상품을 한곳에서 만날 수 있는 대형 복합 쇼핑 공간입니다. 리드컴 매장은 신선식품, 그로서리, 푸드코트, K-뷰티와 생활용품을 함께 운영하는 한국형 원스톱 스토어입니다.',
    '새롭게 확장되는 매장 환경에서 상품 진열, 재고 관리, 매장 운영 지원, 계산 업무와 고객응대 등 다양한 파트의 팀원을 모집합니다.'
  ],
  '(02) 8068 1575',
  '+61280681575',
  'kmall09.ops.oscar@gmail.com',
  'https://www.instagram.com/kmall09/',
  '@kmall09',
  'Level 1, Lidcombe Shopping Centre, 92 Parramatta Rd, Lidcombe NSW 2141',
  'Level 1, Lidcombe Shopping Centre, 92 Parramatta Rd, Lidcombe NSW 2141',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Level 1, Lidcombe Shopping Centre, 92 Parramatta Rd, Lidcombe NSW 2141", "리드컴 쇼핑센터 내 매장"],
    ["근무요일", "협의 가능", "주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 오전 파트타임", "매장 운영 상황에 따라 조율"],
    ["모집분야", "진열파트, 어드민, 캐셔", "매장 운영 및 고객응대"],
    ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "진열파트 2명, 어드민 1명, 캐셔 1명"],
    ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, RSA 소지자, 장기 근무 가능자"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  ARRAY['상품 진열', '재고 관리', '계산 업무', '고객응대', '매장 운영', '입고 처리']
);
