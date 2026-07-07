import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/lib/userProfile";

export type DevPreviewMode = "onboarding" | "job_seeker" | "business";

const MOCK_USER = {
  id: "00000000-0000-4000-8000-000000000001",
  email: "",
} as User;

const MOCK_JOB_SEEKER_PROFILE: UserProfile = {
  user_id: MOCK_USER.id,
  account_type: "job_seeker",
  onboarding_completed: true,
  job_email_opt_in: false,
  full_name: null,
  contact_number: null,
  email: null,
  visa_type: null,
  introduction: null,
  education: null,
  work_history: null,
  other_info: null,
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
