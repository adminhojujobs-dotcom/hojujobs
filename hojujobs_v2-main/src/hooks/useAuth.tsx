import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { USER_PROFILE_SELECT, type UserProfile } from "@/lib/userProfile";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  profile: UserProfile | null;
  profileLoading: boolean;
  needsOnboarding: boolean;
  isBusiness: boolean;
  isJobSeeker: boolean;
  refreshProfile: () => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  profile: null,
  profileLoading: false,
  needsOnboarding: false,
  isBusiness: false,
  isJobSeeker: false,
  refreshProfile: async () => null,
  signOut: async () => {},
});

export const useAuth = () => {
  const preview = useDevPreviewAuth();
  const context = useContext(AuthContext);
  if (preview) return preview;
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null);
      setProfileLoading(false);
      return null;
    }

    setProfileLoading(true);
    const { data, error } = await supabase
      .from("user_profiles")
      .select(USER_PROFILE_SELECT)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("user_profiles fetch error:", error);
      setProfile(null);
      setProfileLoading(false);
      return null;
    }

    const nextProfile = (data as UserProfile | null) ?? null;
    setProfile(nextProfile);
    setProfileLoading(false);
    return nextProfile;
  }, [user?.id]);

  const checkAdmin = async (userId: string) => {
    setAdminLoading(true);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
    setAdminLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        if (nextSession?.user) {
          checkAdmin(nextSession.user.id);
        } else {
          setIsAdmin(false);
          setAdminLoading(false);
          setProfile(null);
          setProfileLoading(false);
        }
        setSessionLoading(false);
      },
    );

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        checkAdmin(initialSession.user.id);
      }
      setSessionLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      setProfileLoading(false);
      return;
    }
    void refreshProfile();
  }, [user?.id, refreshProfile]);

  const loading = sessionLoading || adminLoading || (Boolean(user) && profileLoading);
  const needsOnboarding = Boolean(user && !profileLoading && (!profile || !profile.onboarding_completed));
  const isBusiness = profile?.account_type === "business";
  const isJobSeeker = profile?.account_type === "job_seeker";

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        profile,
        profileLoading,
        needsOnboarding,
        isBusiness,
        isJobSeeker,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
