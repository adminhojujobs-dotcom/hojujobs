import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, Search } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type CompanyProfileRow = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
};

type StatusFilter = "all" | "active" | "inactive";
type SortKey = "name" | "status";
type SortDirection = "asc" | "desc";

export default function Directory() {
  const navigate = useNavigate();

  useSEO({
    title: "회사 디렉토리 | Hoju Jobs",
    description: "등록된 회사 프로필 전체 목록을 확인하세요.",
    canonical: "https://hojujobs.com/directory",
    htmlLang: "ko",
    ogLocale: "ko_KR",
    noindex: true,
  });

  const [profiles, setProfiles] = useState<CompanyProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    let cancelled = false;

    async function fetchProfiles() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("company_profiles")
        .select("id, name, slug, address, phone, email, is_active")
        .order("name", { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        console.error("company_profiles fetch error:", fetchError);
        setError("회사 목록을 불러오지 못했습니다.");
        setProfiles([]);
      } else {
        setProfiles((data ?? []) as CompanyProfileRow[]);
      }

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
      if (statusFilter === "active" && !profile.is_active) return false;
      if (statusFilter === "inactive" && profile.is_active) return false;

      if (!trimmed) return true;
      const haystack = `${profile.name ?? ""} ${profile.slug ?? ""} ${profile.address ?? ""} ${profile.phone ?? ""} ${profile.email ?? ""}`.toLowerCase();
      return haystack.includes(trimmed);
    });

    const sorted = [...filtered].sort((a, b) => {
      let result = 0;
      if (sortKey === "name") {
        result = (a.name ?? "").localeCompare(b.name ?? "", "ko");
      } else if (sortKey === "status") {
        result = Number(a.is_active) - Number(b.is_active);
      }
      return sortDirection === "asc" ? result : -result;
    });

    return sorted;
  }, [profiles, keyword, statusFilter, sortKey, sortDirection]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const SortableHead = ({ label, sortableKey, className }: { label: string; sortableKey: SortKey; className?: string }) => (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => toggleSort(sortableKey)}
        className={cn(
          "inline-flex items-center gap-1 font-bold transition-colors hover:text-foreground",
          sortKey === sortableKey ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    </TableHead>
  );

  const openCompany = (slug: string) => {
    navigate(`/company/${slug}`);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="mb-6 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">회사 디렉토리</h1>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="회사명, 주소 검색"
              className="h-10 pl-9 text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
              <SelectTrigger className="h-10 w-[9rem] text-sm">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="active">활성</SelectItem>
                <SelectItem value="inactive">비활성</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={`${sortKey}:${sortDirection}`}
              onValueChange={(value) => {
                const [key, direction] = value.split(":") as [SortKey, SortDirection];
                setSortKey(key);
                setSortDirection(direction);
              }}
            >
              <SelectTrigger className="h-10 w-[11rem] text-sm">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name:asc">이름 (가나다)</SelectItem>
                <SelectItem value="name:desc">이름 (역순)</SelectItem>
                <SelectItem value="status:desc">활성 먼저</SelectItem>
                <SelectItem value="status:asc">비활성 먼저</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead label="회사명" sortableKey="name" />
                <TableHead className="font-bold text-muted-foreground">주소</TableHead>
                <SortableHead label="상태" sortableKey="status" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="py-12 text-center text-sm text-muted-foreground">
                    불러오는 중...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={3} className="py-12 text-center text-sm text-muted-foreground">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredProfiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="py-12 text-center text-sm text-muted-foreground">
                    조건에 맞는 회사가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProfiles.map((profile) => (
                  <TableRow
                    key={profile.id}
                    tabIndex={0}
                    role="link"
                    aria-label={`${profile.name} 프로필 보기`}
                    className="cursor-pointer transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                    onClick={() => openCompany(profile.slug)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openCompany(profile.slug);
                      }
                    }}
                  >
                    <TableCell className="max-w-[14rem] truncate whitespace-nowrap font-bold text-slate-950">
                      {profile.name}
                    </TableCell>
                    <TableCell className="max-w-[16rem] truncate text-slate-600">{profile.address || "-"}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold",
                          profile.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500",
                        )}
                      >
                        {profile.is_active ? "활성" : "비활성"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!loading && !error && (
          <p className="mt-3 text-sm text-slate-500">총 {filteredProfiles.length}개 회사</p>
        )}
      </main>
    </div>
  );
}
