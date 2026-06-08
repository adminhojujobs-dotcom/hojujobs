-- Supabase's "privacy settings" toggle switched security_invoker to on,
-- which breaks the auth.users join. Reset to off (security definer behaviour).
alter view public.user_activity_summary set (security_invoker = off);
