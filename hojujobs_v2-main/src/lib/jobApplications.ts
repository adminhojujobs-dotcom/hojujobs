import type { UserProfile } from "@/lib/userProfile";

export interface CvSnapshot {
  full_name: string;
  contact_number: string;
  email: string;
  visa_type: string;
  introduction: string;
  education: string | null;
  work_history: string | null;
  other_info: string | null;
}

export interface CompanyJobApplication {
  id: string;
  opening_id: string;
  applicant_user_id: string;
  cv_snapshot: CvSnapshot;
  created_at: string;
}

export function cvSnapshotFromProfile(profile: UserProfile): CvSnapshot {
  return {
    full_name: profile.full_name?.trim() ?? "",
    contact_number: profile.contact_number?.trim() ?? "",
    email: profile.email?.trim() ?? "",
    visa_type: profile.visa_type?.trim() ?? "",
    introduction: profile.introduction?.trim() ?? "",
    education: profile.education?.trim() || null,
    work_history: profile.work_history?.trim() || null,
    other_info: profile.other_info?.trim() || null,
  };
}

export function formatApplicationDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
