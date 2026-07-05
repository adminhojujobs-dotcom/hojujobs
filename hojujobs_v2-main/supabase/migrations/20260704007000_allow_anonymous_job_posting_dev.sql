DROP POLICY IF EXISTS "jobs_insert" ON public.jobs;
CREATE POLICY "jobs_insert"
ON public.jobs
FOR INSERT
TO public
WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));

DROP POLICY IF EXISTS "jobs_update" ON public.jobs;
CREATE POLICY "jobs_update"
ON public.jobs
FOR UPDATE
TO public
USING ((auth.uid() = user_id) OR has_role('admin'::text, auth.uid()) OR (user_id IS NULL));

DROP POLICY IF EXISTS "jobs_delete" ON public.jobs;
CREATE POLICY "jobs_delete"
ON public.jobs
FOR DELETE
TO public
USING ((auth.uid() = user_id) OR has_role('admin'::text, auth.uid()) OR (user_id IS NULL));

CREATE POLICY "Allow users to delete own realestate anon"
ON public.hojunara_realestate_share
FOR DELETE
TO anon
USING (user_id IS NULL);
