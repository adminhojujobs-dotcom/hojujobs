import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { UserJobsTable } from "@/components/UserJobsTable";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  USER_JOB_SELECT,
  userJobSearchHaystack,
  type UserJobRow,
  type UserJobSortDirection,
  type UserJobSortKey,
} from "@/lib/userJobs";

type LocationFilter = "all" | string;
type IndustryFilter = "all" | string;

const sortLabels: Record<string, string> = {
  "uploaded_at:desc": "최신 등록순",
  "uploaded_at:asc": "오래된 등록순",
  "title:asc": "제목 (가나다)",
};

export default function Jobs() {
  useSEO({
    title: "모든 공고 | Hoju Jobs",
    description: "회원이 직접 올린 호주 구인구직 공고를 확인하세요.",
    canonical: "https://hojujobs.com/jobs",
    htmlLang: "ko",
    ogLocale: "ko_KR",
  });

  const [jobs, setJobs] = useState<UserJobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [industryFilter, setIndustryFilter] = useState<IndustryFilter>("all");
  const [sortKey, setSortKey] = useState<UserJobSortKey>("uploaded_at");
  const [sortDirection, setSortDirection] = useState<UserJobSortDirection>("desc");

  useEffect(() => {
    let cancelled = false;

    async function fetchJobs() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("jobs")
        .select(USER_JOB_SELECT)
        .lte("uploaded_at", new Date().toISOString())
        .order("uploaded_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        console.error("jobs fetch error:", fetchError);
        setError("공고 목록을 불러오지 못했습니다.");
        setJobs([]);
      } else {
        setJobs((data ?? []) as UserJobRow[]);
      }

      setLoading(false);
    }

    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  const locationOptions = useMemo(() => {
    const values = new Set<string>();
    for (const job of jobs) {
      for (const location of job.location ?? []) {
        if (location?.trim()) values.add(location.trim());
      }
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b, "ko"));
  }, [jobs]);

  const industryOptions = useMemo(() => {
    const values = new Set<string>();
    for (const job of jobs) {
      if (job.industry?.trim()) values.add(job.industry.trim());
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b, "ko"));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      if (locationFilter !== "all") {
        const locations = job.location ?? [];
        if (!locations.includes(locationFilter)) return false;
      }

      if (industryFilter !== "all" && job.industry !== industryFilter) return false;

      if (!trimmed) return true;
      return userJobSearchHaystack(job).includes(trimmed);
    });

    const sorted = [...filtered].sort((a, b) => {
      let result = 0;

      if (sortKey === "title") {
        result = (a.title ?? "").localeCompare(b.title ?? "", "ko");
      } else if (sortKey === "industry") {
        result = (a.industry ?? "").localeCompare(b.industry ?? "", "ko");
      } else if (sortKey === "uploaded_at") {
        result = new Date(a.uploaded_at ?? 0).getTime() - new Date(b.uploaded_at ?? 0).getTime();
      }

      return sortDirection === "asc" ? result : -result;
    });

    return sorted;
  }, [jobs, keyword, locationFilter, industryFilter, sortKey, sortDirection]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
        <h1 className="mb-8 text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">모든 공고</h1>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="공고명, 지역, 업종 검색"
              className="h-9 rounded-full border-slate-200 pl-9 text-sm"
            />
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(
              "flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition-colors hover:border-slate-300",
              locationFilter !== "all" && "border-blue-300 bg-blue-50 text-blue-700"
            )}>
              <span>{locationFilter === "all" ? "지역" : locationFilter}</span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
              <DropdownMenuItem
                onSelect={() => setLocationFilter("all")}
                className={cn(locationFilter === "all" && "font-bold text-blue-700")}
              >
                전체 지역
              </DropdownMenuItem>
              {locationOptions.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onSelect={() => setLocationFilter(location)}
                  className={cn(locationFilter === location && "font-bold text-blue-700")}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(
              "flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition-colors hover:border-slate-300",
              industryFilter !== "all" && "border-blue-300 bg-blue-50 text-blue-700"
            )}>
              <span>{industryFilter === "all" ? "업종" : industryFilter}</span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
              <DropdownMenuItem
                onSelect={() => setIndustryFilter("all")}
                className={cn(industryFilter === "all" && "font-bold text-blue-700")}
              >
                전체 업종
              </DropdownMenuItem>
              {industryOptions.map((industry) => (
                <DropdownMenuItem
                  key={industry}
                  onSelect={() => setIndustryFilter(industry)}
                  className={cn(industryFilter === industry && "font-bold text-blue-700")}
                >
                  {industry}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition-colors hover:border-slate-300">
              <span>{sortLabels[`${sortKey}:${sortDirection}`]}</span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {(Object.keys(sortLabels) as Array<keyof typeof sortLabels>).map((key) => {
                const [nextKey, nextDirection] = key.split(":") as [UserJobSortKey, UserJobSortDirection];
                const active = sortKey === nextKey && sortDirection === nextDirection;
                return (
                  <DropdownMenuItem
                    key={key}
                    onSelect={() => {
                      setSortKey(nextKey);
                      setSortDirection(nextDirection);
                    }}
                    className={cn(active && "font-bold text-blue-700")}
                  >
                    {sortLabels[key]}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-hidden border-y border-t-neutral-950 border-b-slate-200 bg-white">
          <UserJobsTable
            jobs={filteredJobs}
            loading={loading}
            error={error}
            emptyMessage="조건에 맞는 공고가 없습니다."
            showContact={false}
            plainTitle
            variant="albamon"
          />
        </div>

        {!loading && !error && (
          <p className="mt-3 text-sm text-slate-500">총 {filteredJobs.length}개 공고</p>
        )}
      </main>
    </div>
  );
}
