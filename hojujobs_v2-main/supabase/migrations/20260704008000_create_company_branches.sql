CREATE TABLE public.company_branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_slug text NOT NULL REFERENCES public.company_profiles(slug) ON DELETE CASCADE,
  branch_name text NOT NULL,
  branch_label text,
  address text NOT NULL,
  map_query text,
  phone text,
  phone_href text,
  email text,
  condition_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
  recruitment_rows jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.company_branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active company branches"
ON public.company_branches
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can read all company branches"
ON public.company_branches
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert company branches"
ON public.company_branches
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update company branches"
ON public.company_branches
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete company branches"
ON public.company_branches
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE INDEX idx_company_branches_slug_active_order
ON public.company_branches (company_slug, is_active, sort_order);

INSERT INTO public.company_branches (
  company_slug, branch_name, branch_label, address, map_query, phone, phone_href, email, condition_rows, recruitment_rows, sort_order
) VALUES
(
  'kmall09',
  '이스트우드',
  '1호점',
  'Unit 1/1-7 Rowe St, Eastwood NSW 2122',
  'Unit 1/1-7 Rowe St, Eastwood NSW 2122',
  NULL,
  NULL,
  'kmall09.ops.oscar@gmail.com',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Unit 1/1-7 Rowe St, Eastwood NSW 2122", "KMALL09 1호점 (이스트우드 원조 매장)"],
    ["근무요일", "협의 가능", "주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 파트타임", "매장 운영 상황에 따라 조율"],
    ["모집분야", "매장 상황에 따라 상시 채용", "진열·어드민·캐셔 등"],
    ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "매장 상황에 따라 채용"],
    ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, 비자 만료일 1년 이상"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  1
),
(
  'kmall09',
  '리드컴',
  '2호점',
  'Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141',
  'Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141',
  '(02) 8068 1575',
  '+61280681575',
  'kmall09.ops.oscar@gmail.com',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141", "KMALL09 2호점 (리드컴 쇼핑센터 내)"],
    ["근무요일", "협의 가능", "주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 오전 파트타임", "매장 운영 상황에 따라 조율"],
    ["모집분야", "진열파트 2명(남), 어드민 1명, 캐셔 1명", "매장 운영 및 고객응대"],
    ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "진열파트 2명, 어드민 1명, 캐셔 1명"],
    ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, RSA 소지자, 비자 만료일 1년 이상"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  2
),
(
  'kmall09',
  '뱅크스타운',
  '3호점',
  'Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200',
  'Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200',
  '0434 007 404',
  '+61434007404',
  'JUN.MOON@KMALL09.COM.AU',
  '[
    ["급여", "면접 시 협의", "경력에 따른 대우"],
    ["근무지역", "Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200", "KMALL09 3호점 (뱅크스타운역 도보 5분)"],
    ["근무요일", "주말 1일 필수", "주말 2일 / 주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 파트타임", "면접 시 협의"],
    ["모집분야", "캐셔 1명, 남직원 1명(입고·진열·리빙섹션)", "리빙 섹션 관리 및 세일즈 포함"],
    ["복리후생", "법정 연금(Super) 12%, 유급 연차, 직원 할인", "General Retail Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "캐셔 1명, 남직원 1명"],
    ["우대사항", "한국/호주 마트 경험자, 영어·중국어 가능자, RSA 소지자(캐셔)"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  3
),
(
  'kmall09',
  '시드니 시티',
  '4호점 · 오픈예정',
  '537 George St, Sydney NSW 2000',
  '537 George St, Sydney NSW 2000',
  NULL,
  NULL,
  'kmall09.ops.oscar@gmail.com',
  '[
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "537 George St, Sydney NSW 2000", "KMALL09 4호점, 오픈 준비 중"],
    ["근무요일", "주말 1일 필수, 이틀 우대", "주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 파트타임", "면접 시 협의"],
    ["모집분야", "매니저, 진열파트, 어드민, 캐셔", "인원 추후 확정"],
    ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"]
  ]'::jsonb,
  '[
    ["모집마감", "상시모집"],
    ["모집인원", "전 포지션 추가 채용 중"],
    ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, RSA 소지자(캐셔)"],
    ["지원방법", "이메일로 이력서 접수"]
  ]'::jsonb,
  4
);
