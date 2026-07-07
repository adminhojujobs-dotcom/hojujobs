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

export interface CompanyOpeningExtraField {
  label: string;
  value: string;
}

export interface CompanyOpeningFormInput {
  userId: string;
  branch: CompanyBranchOption;
  title: string;
  // Core fields — always shown in the form.
  pay: string;
  positionType?: string;
  workDays?: string;
  workHours?: string;
  benefits?: string;
  headcount?: string;
  deadline?: string;
  preferredQualifications?: string;
  howToApply?: string;
  applyEmail?: string;
  // Optional fields — common enough to offer, but hidden from the listing when left blank.
  employmentType?: string;
  contactPhone?: string;
  requiredDocuments?: string;
  duties?: string;
  // Free-form additions for anything that doesn't fit the standard fields.
  conditionExtraFields?: CompanyOpeningExtraField[];
  recruitmentExtraFields?: CompanyOpeningExtraField[];
  skillTags?: string[];
  quickApply: boolean;
  sortOrder?: number;
}

export function buildCompanyOpeningInsert(args: CompanyOpeningFormInput) {
  const { area, suburb } = areaSuburbFromBranch(args.branch);
  const pay = args.pay.trim() || "면접 시 협의";
  const workHours = args.workHours?.trim() || "시간협의";
  const deadline = args.deadline?.trim() || "상시모집";
  const applyEmail = args.applyEmail?.trim() || args.branch.email?.trim() || null;
  const howToApply =
    args.howToApply?.trim() ||
    (args.quickApply
      ? "사이트에서 빠른 지원으로 이력서를 제출해주세요."
      : applyEmail
        ? `이메일로 문의: ${applyEmail}`
        : "공고 내 연락처로 문의해주세요.");

  const conditionRows: [string, string, string?][] = [
    ["급여", pay],
    ["근무지역", args.branch.address, args.branch.branch_label ?? args.branch.branch_name],
    ["근무시간", workHours],
  ];
  if (args.positionType?.trim()) conditionRows.push(["모집분야", args.positionType.trim()]);
  if (args.workDays?.trim()) conditionRows.push(["근무요일", args.workDays.trim()]);
  if (args.employmentType?.trim()) conditionRows.push(["근무형태", args.employmentType.trim()]);
  if (args.benefits?.trim()) conditionRows.push(["복리후생", args.benefits.trim()]);
  if (args.duties?.trim()) conditionRows.push(["담당업무", args.duties.trim()]);
  for (const field of args.conditionExtraFields ?? []) {
    if (field.label.trim() && field.value.trim()) {
      conditionRows.push([field.label.trim(), field.value.trim()]);
    }
  }

  const recruitmentRows: [string, string][] = [
    ["모집마감", deadline],
    ["지원방법", howToApply],
  ];
  if (args.headcount?.trim()) recruitmentRows.push(["모집인원", args.headcount.trim()]);
  if (args.preferredQualifications?.trim()) recruitmentRows.push(["우대사항", args.preferredQualifications.trim()]);
  if (args.requiredDocuments?.trim()) recruitmentRows.push(["지원서류", args.requiredDocuments.trim()]);
  if (args.contactPhone?.trim()) recruitmentRows.push(["연락처", args.contactPhone.trim()]);
  if (applyEmail) recruitmentRows.push(["이메일", applyEmail]);
  for (const field of args.recruitmentExtraFields ?? []) {
    if (field.label.trim() && field.value.trim()) {
      recruitmentRows.push([field.label.trim(), field.value.trim()]);
    }
  }

  return {
    company_slug: args.branch.company_slug,
    branch_id: args.branch.id,
    area,
    suburb,
    title: args.title.trim(),
    company: companyLabelFromBranch(args.branch),
    pay,
    pay_type: "급여",
    hours: workHours,
    posted_at: deadline,
    sort_order: args.sortOrder ?? 9999,
    quick_apply: args.quickApply,
    posted_by_user_id: args.userId,
    apply_email: applyEmail,
    detail_intro: args.duties?.trim() || null,
    condition_rows: conditionRows as Json,
    recruitment_rows: recruitmentRows as Json,
    skill_tags: (args.skillTags ?? []).map((tag) => tag.trim()).filter(Boolean),
    is_active: true,
  };
}

export function openingPublicPath(companySlug: string, openingId: string) {
  return `/company/${companySlug}/opening/${openingId}`;
}

export function formatOpeningDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function countApplicationsByOpening(
  rows: { opening_id: string }[],
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.opening_id, (counts.get(row.opening_id) ?? 0) + 1);
  }
  return counts;
}
