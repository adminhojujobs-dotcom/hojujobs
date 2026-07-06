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
}: UserJobsTableProps) {
  const navigate = useNavigate();
  const columnCount = showContact ? 4 : 3;

  const openJob = (id: number) => {
    navigate(`/job/${id}`);
  };

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
