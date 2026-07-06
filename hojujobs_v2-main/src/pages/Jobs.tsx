import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { UserJobsTable } from "@/components/UserJobsTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  USER_JOB_SELECT,
  userJobSearchHaystack,
  type UserJobRow,
  type UserJobSortDirection,
  type UserJobSortKey,
} from "@/lib/userJobs";

type LocationFilter = "all" | string;
type IndustryFilter = "all" | string;

export default function Jobs() {
  useSEO({
    title: "사용자 업로드 공고 | Hoju Jobs",
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

  const toggleSort = (key: UserJobSortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection(key === "uploaded_at" ? "desc" : "asc");
    }
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="mb-6 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">사용자 업로드 공고</h1>

        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="공고명, 지역, 업종 검색"
              className="h-10 pl-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-10 w-[9.5rem] text-sm">
                <SelectValue placeholder="지역" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 지역</SelectItem>
                {locationOptions.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="h-10 w-[9.5rem] text-sm">
                <SelectValue placeholder="업종" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 업종</SelectItem>
                {industryOptions.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={`${sortKey}:${sortDirection}`}
              onValueChange={(value) => {
                const [key, direction] = value.split(":") as [UserJobSortKey, UserJobSortDirection];
                setSortKey(key);
                setSortDirection(direction);
              }}
            >
              <SelectTrigger className="h-10 w-[11rem] text-sm">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uploaded_at:desc">최신 등록순</SelectItem>
                <SelectItem value="uploaded_at:asc">오래된 등록순</SelectItem>
                <SelectItem value="title:asc">제목 (가나다)</SelectItem>
                <SelectItem value="title:desc">제목 (역순)</SelectItem>
                <SelectItem value="industry:asc">업종 (가나다)</SelectItem>
                <SelectItem value="industry:desc">업종 (역순)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <UserJobsTable
            jobs={filteredJobs}
            loading={loading}
            error={error}
            emptyMessage="조건에 맞는 공고가 없습니다."
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={toggleSort}
          />
        </div>

        {!loading && !error && (
          <p className="mt-3 text-sm text-slate-500">총 {filteredJobs.length}개 공고</p>
        )}
      </main>
    </div>
  );
}
