ALTER TABLE public.ozbargain_deals
ADD COLUMN IF NOT EXISTS promoted boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_ozbargain_deals_promoted_rank
ON public.ozbargain_deals (promoted, rank);
