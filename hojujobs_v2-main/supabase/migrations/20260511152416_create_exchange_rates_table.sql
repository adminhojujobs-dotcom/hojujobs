
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE IF NOT EXISTS public.exchange_rates (
  base_currency TEXT PRIMARY KEY DEFAULT 'KRW',
  aud NUMERIC,
  usd NUMERIC,
  jpy NUMERIC,
  eur NUMERIC,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed a placeholder row so frontend never gets empty
INSERT INTO public.exchange_rates (base_currency) VALUES ('KRW')
ON CONFLICT (base_currency) DO NOTHING;

-- Public read access (dashboard reads it via anon key)
ALTER TABLE public.exchange_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read exchange_rates" ON public.exchange_rates
  FOR SELECT USING (true);
;
