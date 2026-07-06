import type { Json } from "@/integrations/supabase/types";
import type { CompanyBranchOption } from "@/lib/userProfile";

const STATE_PATTERN = /\b(NSW|VIC|QLD|SA|WA|TAS|NT|ACT)\b/i;

export interface ManagedCompanyOpening {
  id: string;
  company_slug: string;
  branch_id: string | null;
  title: string;
  pay: string;
  hours: string;
  quick_apply: boolean;
  is_active: boolean;
  posted_by_user_id: string | null;
  detail_intro: string | null;
  created_at: string;
  updated_at: string;
}

export const MANAGED_COMPANY_OPENING_SELECT =
  "id, company_slug, branch_id, title, pay, hours, quick_apply, is_active, posted_by_user_id, detail_intro, created_at, updated_at";

export function areaSuburbFromBranch(branch: CompanyBranchOption) {
  const stateMatch = branch.address.match(STATE_PATTERN);
  const area = stateMatch ? stateMatch[1].toUpperCase() : "NSW";
  const suburbMatch = branch.address.match(/,\s*([^,]+?)\s+(?:NSW|VIC|QLD|SA|WA|TAS|NT|ACT)\b/i);
  const suburb = suburbMatch?.[1]?.trim() || branch.branch_label || branch.branch_name;
  return { area, suburb };
}

export function companyLabelFromBranch(branch: CompanyBranchOption) {
  if (branch.branch_label) {
    return `${branch.company_name} ${branch.branch_label}`;
  }
  return `${branch.company_name} ${branch.branch_name}`;
}

export function buildCompanyOpeningInsert(args: {
  userId: string;
  branch: CompanyBranchOption;
  title: string;
  salary: string;
  details: string;
  quickApply: boolean;
  sortOrder?: number;
}) {
  const { area, suburb } = areaSuburbFromBranch(args.branch);
  const pay = args.salary.trim() || "면접 시 협의";
  const details = args.details.trim();
  const conditionRows: Json = details
    ? ([["상세 내용", details]] as Json)
    : ([] as Json);

  return {
    company_slug: args.branch.company_slug,
    branch_id: args.branch.id,
    area,
    suburb,
    title: args.title.trim(),
    company: companyLabelFromBranch(args.branch),
    pay,
    pay_type: "급여",
    hours: "시간협의",
    posted_at: "상시",
    sort_order: args.sortOrder ?? 9999,
    quick_apply: args.quickApply,
    posted_by_user_id: args.userId,
    detail_intro: details || null,
    condition_rows: conditionRows,
    recruitment_rows: [] as Json,
    skill_tags: [] as string[],
    is_active: true,
  };
}

export function openingPublicPath(companySlug: string, openingId: string) {
  return `/company/${companySlug}/opening/${openingId}`;
}
