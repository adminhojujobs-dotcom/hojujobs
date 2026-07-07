import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpDown, ChevronDown, Search } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CompanyProfileRow = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  is_active: boolean;
};

type CompanyBranch = {
  id: string;
  branch_name: string;
  branch_label: string | null;
  address: string;
};

type DirectoryCompany = CompanyProfileRow & {
  activeOpeningCount: number;
  openingSuburbs: string[];
  branches: CompanyBranch[];
};

type SortKey = "name";
type SortDirection = "asc" | "desc";

export default function Directory() {
  useSEO({
    title: "회사 업소록 | Hoju Jobs",
    description: "등록된 회사 프로필 전체 목록을 확인하세요.",
    canonical: "https://hojujobs.com/directory",
    htmlLang: "ko",
    ogLocale: "ko_KR",
    noindex: true,
  });

  const [profiles, setProfiles] = useState<DirectoryCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const [keyword, setKeyword] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const sortKey: SortKey = "name";

  useEffect(() => {
    let cancelled = false;

    async function fetchProfiles() {
      setLoading(true);
      setError(null);

      const [
        { data: profileRows, error: profileError },
        { data: openingRows, error: openingError },
        { data: branchRows, error: branchError },
      ] = await Promise.all([
        supabase
          .from("company_profiles")
          .select("id, name, slug, address, phone, email, logo_url, is_active")
          .eq("is_active", true)
          .order("name", { ascending: true }),
        supabase
          .from("company_job_openings")
          .select("company_slug, suburb, area")
          .eq("is_active", true),
        supabase
          .from("company_branches")
          .select("id, company_slug, branch_name, branch_label, address, sort_order")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

      if (cancelled) return;

      if (profileError || openingError || branchError) {
        console.error("directory fetch error:", profileError ?? openingError ?? branchError);
        setError("회사 목록을 불러오지 못했습니다.");
        setProfiles([]);
        setLoading(false);
        return;
      }

      const openingsBySlug = new Map<string, { count: number; suburbs: Set<string> }>();
      for (const opening of openingRows ?? []) {
        const entry = openingsBySlug.get(opening.company_slug) ?? { count: 0, suburbs: new Set<string>() };
        entry.count += 1;
        if (opening.suburb?.trim()) {
          entry.suburbs.add(`${opening.area} ${opening.suburb}`.trim());
        }
        openingsBySlug.set(opening.company_slug, entry);
      }

      const branchesBySlug = new Map<string, CompanyBranch[]>();
      for (const branch of branchRows ?? []) {
        const list = branchesBySlug.get(branch.company_slug) ?? [];
        list.push({ id: branch.id, branch_name: branch.branch_name, branch_label: branch.branch_label, address: branch.address });
        branchesBySlug.set(branch.company_slug, list);
      }

      setProfiles(
        ((profileRows ?? []) as CompanyProfileRow[]).map((profile) => {
          const openingInfo = openingsBySlug.get(profile.slug);
          return {
            ...profile,
            activeOpeningCount: openingInfo?.count ?? 0,
            openingSuburbs: openingInfo ? Array.from(openingInfo.suburbs).sort((a, b) => a.localeCompare(b, "ko")) : [],
            branches: branchesBySlug.get(profile.slug) ?? [],
          };
        }),
      );
      setLoading(false);
    }

    fetchProfiles();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProfiles = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    const filtered = profiles.filter((profile) => {
      if (!trimmed) return true;
      const suburbHaystack = profile.openingSuburbs.join(" ");
      const branchHaystack = profile.branches.map((b) => `${b.branch_label ?? ""} ${b.branch_name} ${b.address}`).join(" ");
      const haystack = `${profile.name ?? ""} ${profile.slug ?? ""} ${profile.phone ?? ""} ${profile.email ?? ""} ${suburbHaystack} ${branchHaystack}`.toLowerCase();
      return haystack.includes(trimmed);
    });

    const sorted = [...filtered].sort((a, b) => {
      const result = (a.name ?? "").localeCompare(b.name ?? "", "ko");
      return sortDirection === "asc" ? result : -result;
    });

    return sorted;
  }, [profiles, keyword, sortDirection]);

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleExpanded = (slug: string) => {
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition-colors hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <h1 className="mb-8 text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">회사 업소록</h1>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="회사명, 주소, 지역 검색"
              className="h-9 rounded-full border-slate-200 pl-9 text-sm"
            />
          </div>
        </div>

        <div className="overflow-hidden border-y border-t-neutral-950 border-b-slate-200 bg-white">
          <div className="hidden grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.4fr)_2rem] items-center border-b border-slate-200 px-5 py-4 text-sm font-black text-neutral-950 sm:grid">
            <div />
            <button
              type="button"
              onClick={toggleSort}
              className="inline-flex items-center gap-1 text-left transition-colors hover:text-blue-700"
            >
              회사명
              <ArrowUpDown className="h-3.5 w-3.5" />
            </button>
            <div>모집 지역 · 채용</div>
            <div />
          </div>

          {loading ? (
            <div className="px-5 py-14 text-center text-sm font-semibold text-slate-500">불러오는 중...</div>
          ) : error ? (
            <div className="px-5 py-14 text-center text-sm font-semibold text-slate-500">{error}</div>
          ) : filteredProfiles.length === 0 ? (
            <div className="px-5 py-14 text-center text-sm font-semibold text-slate-500">조건에 맞는 회사가 없습니다.</div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredProfiles.map((profile) => {
                const isExpanded = expandedSlugs.has(profile.slug);
                const hasBranches = profile.branches.length > 0;

                return (
                  <div key={profile.id}>
                  <div className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:gap-0">
                    <Link
                      to={`/company/${profile.slug}`}
                      className="group contents"
                      aria-label={`${profile.name} 프로필 보기`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white transition-colors group-hover:border-blue-200">
                        {profile.logo_url ? (
                          <img src={profile.logo_url} alt={profile.name} className="h-full w-full object-contain" />
                        ) : (
                          <span className="text-xs font-black text-slate-300">{profile.name.slice(0, 1)}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-base font-black text-neutral-950 group-hover:text-blue-700 group-hover:underline">
                            {profile.name}
                          </p>
                          {profile.activeOpeningCount > 0 && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-black text-blue-700">
                              채용 {profile.activeOpeningCount}건
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-sm font-semibold text-slate-500 sm:hidden">
                          {profile.openingSuburbs.length > 0 ? profile.openingSuburbs.slice(0, 2).join(", ") : "-"}
                        </p>
                      </div>

                      <div className="hidden min-w-0 sm:block">
                        {profile.openingSuburbs.length > 0 ? (
                          <p className="truncate text-xs font-semibold text-blue-700">
                            모집 지역: {profile.openingSuburbs.join(", ")}
                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-slate-400">-</p>
                        )}
                      </div>
                    </Link>

                      {hasBranches ? (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-label={`${profile.name} 지점 ${isExpanded ? "숨기기" : "보기"}`}
                          onClick={() => toggleExpanded(profile.slug)}
                          className={cn(
                            "flex shrink-0 items-center gap-1 justify-self-end rounded-full border px-2.5 py-1 text-[11px] font-black transition-colors",
                            isExpanded
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                          )}
                        >
                          지점 {profile.branches.length}
                          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isExpanded && "rotate-180")} />
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>

                    {hasBranches && isExpanded && (
                      <div className="divide-y divide-slate-100 bg-slate-50 px-5 py-2 sm:pl-[4.75rem]">
                        {profile.branches.map((branch) => (
                          <div key={branch.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-2.5">
                            <span className="text-sm font-black text-neutral-950">
                              {branch.branch_label ?? branch.branch_name}
                            </span>
                            <span className="text-sm font-semibold text-slate-500">{branch.address}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!loading && !error && (
          <p className="mt-3 text-sm text-slate-500">총 {filteredProfiles.length}개 회사</p>
        )}
      </main>
    </div>
  );
}
