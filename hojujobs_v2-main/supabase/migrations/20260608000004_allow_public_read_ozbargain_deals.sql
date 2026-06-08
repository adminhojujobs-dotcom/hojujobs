create policy "Public can read deals"
  on public.ozbargain_deals for select
  to anon, authenticated
  using (true);
