export type AccountType = "job_seeker" | "business";

export interface UserProfile {
  user_id: string;
  account_type: AccountType;
  onboarding_completed: boolean;
  job_email_opt_in: boolean;
  full_name: string | null;
  contact_number: string | null;
  email: string | null;
  visa_type: string | null;
  introduction: string | null;
  education: string | null;
  work_history: string | null;
  other_info: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessJobListing {
  id: string;
  user_id: string;
  branch_id: string;
  company_slug: string;
  title: string;
  salary: string | null;
  details: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyBranchOption {
  id: string;
  company_slug: string;
  branch_name: string;
  branch_label: string | null;
  address: string;
  company_name: string;
}

export const USER_PROFILE_SELECT =
  "user_id, account_type, onboarding_completed, job_email_opt_in, full_name, contact_number, email, visa_type, introduction, education, work_history, other_info, created_at, updated_at";

export const VISA_TYPE_OPTIONS = [
  "Working Holiday (subclass 417)",
  "Work and Holiday (subclass 462)",
  "Student (subclass 500)",
  "Temporary Graduate (subclass 485)",
  "Skilled Independent (subclass 189)",
  "Other",
] as const;

export function branchOptionLabel(branch: CompanyBranchOption) {
  const location = branch.branch_label || branch.branch_name;
  return `${branch.company_name} · ${location}`;
}
