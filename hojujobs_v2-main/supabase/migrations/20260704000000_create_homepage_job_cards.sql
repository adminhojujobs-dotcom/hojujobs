CREATE TABLE public.homepage_job_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  logo_text text NOT NULL,
  logo_tone text NOT NULL DEFAULT 'blue',
  company_label text NOT NULL,
  location_label text NOT NULL,
  title text NOT NULL,
  pay_type text NOT NULL,
  pay_amount text NOT NULL,
  job_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.homepage_job_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active homepage job cards"
ON public.homepage_job_cards
FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can read all homepage job cards"
ON public.homepage_job_cards
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert homepage job cards"
ON public.homepage_job_cards
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update homepage job cards"
ON public.homepage_job_cards
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete homepage job cards"
ON public.homepage_job_cards
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE INDEX idx_homepage_job_cards_active_order
ON public.homepage_job_cards (is_active, sort_order, created_at DESC);

INSERT INTO public.homepage_job_cards (
  sort_order,
  logo_text,
  logo_tone,
  company_label,
  location_label,
  title,
  pay_type,
  pay_amount
) VALUES
  (10, 'coupang
fulfillment services', 'blue', '쿠팡CFS 인천,부천센터 입사 ...', '인천 남동구', '★인센티브 진짜 마감임박★최대 1,251만원 3달근무시★집앞셔틀&...', '월급', '3,946,136원'),
  (20, 'BURGER
KING', 'red', '버거킹', '전국', '전국 버거킹 아르바이트 모집', '￦', '공고별 확인'),
  (30, 'No Brand
Burger', 'black', 'No-Brand안양평촌점', '경기 안양시', '노브랜드 안양평촌점 스태프 모집', '시급', '11,500원'),
  (40, 'coupang
logistics services', 'blue-dark', '#보너스150만원 #초간단즉시...', '경남 양산시', '[연최대5020만] 물류 알바관리자 채용(헬퍼리더)', '연봉', '50,200,000원'),
  (50, 'UNI
QLO', 'red', '에프알엘코리아주식회사', '경기 의왕시', '[유니클로] 롯데몰 의왕점 오픈멤버 풀타이머 모집(주 5일, 일 8시간)', '연봉', '33,320,000원'),
  (60, 'coupang
logistics services', 'blue-dark', '#보너스150만원 #초간단즉시...', '인천 서구', '[연최대5020만] 물류 알바관리자 채용(헬퍼리더)', '연봉', '50,200,000원'),
  (70, 'DELI
by ASHLEY', 'black', '(주)이랜드이츠', '전국', '애슐리퀸즈와 함께할 아르바이트를 모집합니다.', '￦', '공고별 확인'),
  (80, 'coupang
fulfillment services', 'blue', '쿠팡CFS 인천,부천센터 입사 ...', '인천 미추홀', '[마감임박]입사인센티브 받자!3달 근무시 +717만★4시간/주말/주3일', '월급', '2,035,729원'),
  (90, 'Kurly', 'purple', '컬리', '서울 송파구', '마켓컬리 새벽배송 물류센터 파트타이머 모집', '시급', '12,200원'),
  (100, 'coupang
logistics services', 'blue-dark', '쿠팡로지스틱스', '전국', '배송 캠프 운영 지원 아르바이트 모집', '일급', '160,000원'),
  (110, 'coupang
fulfillment services', 'blue', '쿠팡CFS', '경기 부천시', '물류센터 주간/야간 단기 알바 대규모 모집', '월급', '3,120,000원'),
  (120, 'coupang
fulfillment services', 'blue', '쿠팡CFS', '인천 중구', '입출고/포장 스태프 즉시 근무 가능자 채용', '시급', '11,900원');
