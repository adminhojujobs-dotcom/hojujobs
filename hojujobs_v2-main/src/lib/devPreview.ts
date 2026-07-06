import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/lib/userProfile";

export type DevPreviewMode = "onboarding" | "job_seeker" | "business";

const MOCK_USER = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "preview@hojujobs.local",
} as User;

const MOCK_JOB_SEEKER_PROFILE: UserProfile = {
  user_id: MOCK_USER.id,
  account_type: "job_seeker",
  onboarding_completed: true,
  job_email_opt_in: true,
  full_name: "김민수",
  contact_number: "0400 000 000",
  email: "preview@hojujobs.local",
  visa_type: "Working Holiday (subclass 417)",
  introduction: "멜버른에서 카페/리테일 알바를 찾고 있는 워홀러입니다.",
  education: "서울 ○○대학교 경영학과 졸업",
  work_history: "한국 카페 바리스타 1년",
  other_info: "주말 근무 가능, 영어 회화 가능",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const MOCK_BUSINESS_PROFILE: UserProfile = {
  user_id: MOCK_USER.id,
  account_type: "business",
  onboarding_completed: true,
  job_email_opt_in: false,
  full_name: null,
  contact_number: null,
  email: "business@hojujobs.local",
  visa_type: null,
  introduction: null,
  education: null,
  work_history: null,
  other_info: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function isDevPreviewEnabled() {
  return import.meta.env.DEV;
}

export function getDevPreviewAuthState(mode: DevPreviewMode) {
  const base = {
    user: MOCK_USER,
    session: null,
    loading: false,
    isAdmin: false,
    profileLoading: false,
    refreshProfile: async () => (mode === "job_seeker" ? MOCK_JOB_SEEKER_PROFILE : MOCK_BUSINESS_PROFILE),
    signOut: async () => {},
  };

  if (mode === "onboarding") {
    return {
      ...base,
      profile: null,
      needsOnboarding: true,
      isBusiness: false,
      isJobSeeker: false,
    };
  }

  if (mode === "job_seeker") {
    return {
      ...base,
      profile: MOCK_JOB_SEEKER_PROFILE,
      needsOnboarding: false,
      isBusiness: false,
      isJobSeeker: true,
    };
  }

  return {
    ...base,
    profile: MOCK_BUSINESS_PROFILE,
    needsOnboarding: false,
    isBusiness: true,
    isJobSeeker: false,
  };
}
