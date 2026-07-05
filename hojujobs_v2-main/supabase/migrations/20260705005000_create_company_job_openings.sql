CREATE TABLE public.company_job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_slug text NOT NULL REFERENCES public.company_profiles(slug) ON DELETE CASCADE,
  branch_id uuid REFERENCES public.company_branches(id) ON DELETE CASCADE,
  area text NOT NULL,
  suburb text NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  pay text NOT NULL,
  pay_type text NOT NULL DEFAULT '급여',
  hours text NOT NULL,
  posted_at text NOT NULL DEFAULT '상시',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.company_job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active company job openings"
ON public.company_job_openings
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can read all company job openings"
ON public.company_job_openings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert company job openings"
ON public.company_job_openings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update company job openings"
ON public.company_job_openings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete company job openings"
ON public.company_job_openings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE INDEX idx_company_job_openings_slug_active_order
ON public.company_job_openings (company_slug, is_active, sort_order);

INSERT INTO public.company_job_openings (
  company_slug, branch_id, area, suburb, title, company, pay, pay_type, hours, posted_at, sort_order
) VALUES
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '이스트우드'),
  'NSW', 'Eastwood', 'KMALL09 이스트우드점 상품 진열 및 재고관리 직원 모집', 'KMALL09 1호점 이스트우드점', '면접 시 협의', '급여', '풀타임/파트타임', '상시', 1
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '이스트우드'),
  'NSW', 'Eastwood', 'KMALL09 이스트우드점 캐셔 및 고객응대 직원 모집', 'KMALL09 1호점 이스트우드점', '면접 시 협의', '급여', '시간협의', '상시', 2
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '이스트우드'),
  'NSW', 'Eastwood', 'KMALL09 이스트우드점 어드민/매장 운영 지원 모집', 'KMALL09 1호점 이스트우드점', '면접 시 협의', '급여', '시간협의', '상시', 3
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '리드컴'),
  'NSW', 'Lidcombe', 'KMALL09 리드컴 2호점 진열파트 직원 모집', 'KMALL09 2호점 리드컴점', '면접 시 협의', '급여', '풀타임/오전 파트타임', '상시', 4
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '리드컴'),
  'NSW', 'Lidcombe', 'KMALL09 리드컴 2호점 어드민 직원 모집', 'KMALL09 2호점 리드컴점', '면접 시 협의', '급여', '시간협의', '상시', 5
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '리드컴'),
  'NSW', 'Lidcombe', 'KMALL09 리드컴 2호점 캐셔 및 고객응대 직원 모집', 'KMALL09 2호점 리드컴점', '면접 시 협의', '급여', '시간협의', '상시', 6
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '뱅크스타운'),
  'NSW', 'Bankstown', 'KMALL09 뱅크스타운점 캐셔 직원 모집', 'KMALL09 3호점 뱅크스타운점', '면접 시 협의', '급여', '풀타임/파트타임', '상시', 7
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '뱅크스타운'),
  'NSW', 'Bankstown', 'KMALL09 뱅크스타운점 입고·진열·리빙섹션 직원 모집', 'KMALL09 3호점 뱅크스타운점', '면접 시 협의', '급여', '주말 포함 협의', '상시', 8
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '시드니 시티'),
  'NSW', 'Sydney CBD', 'KMALL09 시드니 시티점 매니저 후보 모집', 'KMALL09 4호점 · 오픈예정 시드니 시티점', '면접 시 협의', '급여', '풀타임', '오픈예정', 9
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '시드니 시티'),
  'NSW', 'Sydney CBD', 'KMALL09 시드니 시티점 진열파트 직원 모집', 'KMALL09 4호점 · 오픈예정 시드니 시티점', '면접 시 협의', '급여', '풀타임/파트타임', '오픈예정', 10
),
(
  'kmall09',
  (SELECT id FROM public.company_branches WHERE company_slug = 'kmall09' AND branch_name = '시드니 시티'),
  'NSW', 'Sydney CBD', 'KMALL09 시드니 시티점 어드민 및 캐셔 직원 모집', 'KMALL09 4호점 · 오픈예정 시드니 시티점', '면접 시 협의', '급여', '시간협의', '오픈예정', 11
);
