import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export async function incrementViewCount(jobId: number): Promise<number | null> {
  const { data, error } = await (supabase.rpc as unknown as (
    fn: "increment_view_count",
    args: { p_job_id: number }
  ) => Promise<{ data: number | null; error: Error | null }>)("increment_view_count", {
    p_job_id: jobId,
  });

  if (error) {
    console.error("Error incrementing view count:", error);
    return null;
  }

  return data ?? 0;
}

export async function fetchViewCountByJobId(jobId: number): Promise<number> {
  const { data, error } = await supabase
    .from("view_counts")
    .select("count")
    .eq("job_id", jobId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching view count:", error);
    return 0;
  }

  return data?.count ?? 0;
}

export async function fetchViewCountsByJobIds(jobIds: number[]): Promise<Record<number, number>> {
  const uniqueIds = [...new Set(jobIds)];
  if (uniqueIds.length === 0) return {};

  const { data, error } = await supabase
    .from("view_counts")
    .select("job_id, count")
    .in("job_id", uniqueIds);

  if (error) {
    console.error("Error fetching view counts:", error);
    return {};
  }

  const counts: Record<number, number> = {};
  data?.forEach((row) => {
    counts[row.job_id] = row.count;
  });
  return counts;
}

export function useViewCounts(initialCounts: Record<number, number> = {}) {
  const [counts, setCounts] = useState<Record<number, number>>(initialCounts);

  const increment = useCallback(async (jobId: number) => {
    const newCount = await incrementViewCount(jobId);
    if (newCount === null) return counts[jobId] ?? 0;

    setCounts((prev) => ({ ...prev, [jobId]: newCount }));
    return newCount;
  }, [counts]);

  const hydrateCounts = useCallback((nextCounts: Record<number, number>) => {
    setCounts((prev) => ({ ...prev, ...nextCounts }));
  }, []);

  const getCount = useCallback(
    (jobId: number) => counts[jobId] || 0,
    [counts]
  );

  return { counts, increment, getCount, hydrateCounts };
}
