import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  formatUserJobContact,
  formatUserJobLocation,
  type UserJobRow,
  type UserJobSortDirection,
  type UserJobSortKey,
} from "@/lib/userJobs";

interface UserJobsTableProps {
  jobs: UserJobRow[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  sortKey?: UserJobSortKey;
  sortDirection?: UserJobSortDirection;
  onSort?: (key: UserJobSortKey) => void;
  showContact?: boolean;
  plainTitle?: boolean;
  variant?: "default" | "albamon";
}

function SortableHead({
  label,
  sortableKey,
  sortKey,
  onSort,
  className,
}: {
  label: string;
  sortableKey: UserJobSortKey;
  sortKey?: UserJobSortKey;
  sortDirection?: UserJobSortDirection;
  onSort?: (key: UserJobSortKey) => void;
  className?: string;
}) {
  if (!onSort) {
    return <TableHead className={cn("font-bold text-muted-foreground", className)}>{label}</TableHead>;
  }

  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => onSort(sortableKey)}
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
}

export function UserJobsTable({
  jobs,
  loading = false,
  error = null,
  emptyMessage = "표시할 공고가 없습니다.",
  sortKey,
  sortDirection,
  onSort,
  showContact = true,
  plainTitle = false,
  variant = "default",
}: UserJobsTableProps) {
  const navigate = useNavigate();
  const isAlbamon = variant === "albamon";
  const columnCount = isAlbamon ? 5 : showContact ? 4 : 3;

  const openJob = (id: number) => {
    navigate(`/job/${id}`);
  };

  if (isAlbamon) {
    return (
      <>
      <div className="sm:hidden">
        {loading ? (
          <div className="border-b border-slate-200 py-12 text-center text-sm font-semibold text-slate-500">불러오는 중...</div>
        ) : error ? (
          <div className="border-b border-slate-200 py-12 text-center text-sm font-semibold text-slate-500">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="border-b border-slate-200 py-12 text-center text-sm font-semibold text-slate-500">{emptyMessage}</div>
        ) : (
          <div className="divide-y divide-slate-200">
            {jobs.map((job) => {
              const location = formatUserJobLocation(job);
              const hasLocation = location !== "-";

              return (
              <button
                key={job.id}
                type="button"
                aria-label={`${job.title ?? "공고"} 상세 보기`}
                className="flex w-full flex-col gap-1 px-4 py-2.5 text-left transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                onClick={() => openJob(job.id)}
              >
                <span className={cn("truncate text-xs font-bold text-neutral-500", !hasLocation && "invisible")}>
                  {hasLocation ? location : "-"}
                </span>

                <h3 className="line-clamp-2 text-sm font-black leading-snug text-neutral-950">{job.title || "-"}</h3>

                <div className="mt-0.5 flex items-center justify-between gap-3 border-t border-slate-100 pt-2">
                  <span className="truncate text-xs font-bold text-slate-500">{job.industry || "-"}</span>
                  <span className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-neutral-900">
                    자세히 보기
                  </span>
                </div>
              </button>
              );
            })}
          </div>
        )}
      </div>

      <Table className="hidden min-w-[860px] text-[15px] sm:table">
        <TableHeader>
          <TableRow className="border-b border-t border-neutral-900 hover:bg-transparent">
            <TableHead className="h-14 w-[62%] px-5 text-left text-base font-black text-neutral-950">공고</TableHead>
            <TableHead className="h-14 w-[20%] px-5 text-left text-base font-black text-neutral-950">지역</TableHead>
            <TableHead className="h-14 w-[18%] px-5 text-left text-base font-black text-neutral-950">업종</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columnCount} className="py-14 text-center text-sm font-semibold text-slate-500">
                불러오는 중...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columnCount} className="py-14 text-center text-sm font-semibold text-slate-500">
                {error}
              </TableCell>
            </TableRow>
          ) : jobs.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columnCount} className="py-14 text-center text-sm font-semibold text-slate-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow
                key={job.id}
                tabIndex={0}
                role="link"
                aria-label={`${job.title ?? "공고"} 상세 보기`}
                className="h-12 cursor-pointer border-b border-slate-200 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                onClick={() => openJob(job.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openJob(job.id);
                  }
                }}
              >
                <TableCell className="max-w-[34rem] truncate px-5 text-base font-bold text-neutral-950">
                  {job.title || "-"}
                </TableCell>
                <TableCell className="max-w-[18rem] truncate px-5 text-base font-semibold text-neutral-600">
                  {formatUserJobLocation(job)}
                </TableCell>
                <TableCell className="max-w-[14rem] truncate px-5 text-base font-semibold text-neutral-600">
                  {job.industry || "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHead label="공고명" sortableKey="title" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} />
          {showContact && <TableHead className="font-bold text-muted-foreground">연락처</TableHead>}
          <TableHead className={cn("font-bold text-muted-foreground", showContact ? "hidden sm:table-cell" : "")}>지역</TableHead>
          <SortableHead
            label="업종"
            sortableKey="industry"
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={onSort}
            className={showContact ? "hidden md:table-cell" : "hidden sm:table-cell"}
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columnCount} className="py-12 text-center text-sm text-muted-foreground">
              불러오는 중...
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={columnCount} className="py-12 text-center text-sm text-muted-foreground">
              {error}
            </TableCell>
          </TableRow>
        ) : jobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columnCount} className="py-12 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          jobs.map((job) => (
            <TableRow
              key={job.id}
              tabIndex={0}
              role="link"
              aria-label={`${job.title ?? "공고"} 상세 보기`}
              className="cursor-pointer transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
              onClick={() => openJob(job.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openJob(job.id);
                }
              }}
            >
              <TableCell
                className={cn(
                  "max-w-[16rem] truncate whitespace-nowrap text-slate-950",
                  plainTitle ? "font-medium" : "font-bold",
                )}
              >
                {job.title || "-"}
              </TableCell>
              {showContact && (
                <TableCell className="max-w-[12rem] truncate whitespace-nowrap text-slate-600">
                  {formatUserJobContact(job)}
                </TableCell>
              )}
              <TableCell className={cn("max-w-[14rem] truncate text-slate-600", showContact && "hidden sm:table-cell")}>
                {formatUserJobLocation(job)}
              </TableCell>
              <TableCell className={cn("max-w-[10rem] truncate whitespace-nowrap text-slate-600", showContact ? "hidden md:table-cell" : "hidden sm:table-cell")}>
                {job.industry || "-"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
