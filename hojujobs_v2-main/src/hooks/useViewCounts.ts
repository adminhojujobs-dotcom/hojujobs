import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const viewCountStorageKey = (jobId: number) => `hoju_job_view_count_${jobId}`;

function readStoredViewCount(jobId: number): number | null {
  try {
    const raw = sessionStorage.getItem(viewCountStorageKey(jobId));
    if (raw === null) return null;

    const cached = Number(raw);
    return Number.isFinite(cached) ? cached : null;
  } catch {
    return null;
  }
}

function writeStoredViewCount(jobId: number, count: number) {
  try {
    sessionStorage.setItem(viewCountStorageKey(jobId), String(count));
  } catch {
    // Session storage may be unavailable in private or restricted browser contexts.
  }
}

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

  useEffect(() => {
    Object.entries(initialCounts).forEach(([jobId, count]) => {
      if (Number.isFinite(count)) writeStoredViewCount(Number(jobId), count);
    });
  }, [initialCounts]);

  const increment = useCallback(async (jobId: number) => {
    const newCount = await incrementViewCount(jobId);
    if (newCount === null) return readStoredViewCount(jobId) ?? 0;

    writeStoredViewCount(jobId, newCount);
    setCounts((prev) => ({ ...prev, [jobId]: Math.max(prev[jobId] ?? 0, newCount) }));
    return newCount;
  }, []);

  const hydrateCounts = useCallback((nextCounts: Record<number, number>) => {
    setCounts((prev) => {
      const merged = { ...prev };

      Object.entries(nextCounts).forEach(([jobId, count]) => {
        if (!Number.isFinite(count)) return;

        const numericJobId = Number(jobId);
        const previous = merged[numericJobId];
        const next = previous === undefined ? count : Math.max(previous, count);
        merged[numericJobId] = next;
        writeStoredViewCount(numericJobId, next);
      });

      return merged;
    });
  }, []);

  const getCount = useCallback(
    (jobId: number) => counts[jobId] ?? readStoredViewCount(jobId) ?? 0,
    [counts]
  );

  return { counts, increment, getCount, hydrateCounts };
}
