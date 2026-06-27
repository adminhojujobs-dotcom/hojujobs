DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'view_counts'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.view_counts;
  END IF;
END $$;
