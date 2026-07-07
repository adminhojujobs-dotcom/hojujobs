import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getPostAuthDestination, getSafeNextPath } from "@/lib/authRedirect";
import { getSiteOrigin } from "@/lib/siteUrl";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/trackEvent";
import hojuJobsLogo from "@/assets/hoju-jobs-logo.png";

const PENDING_AUTH_EVENT_KEY = "hoju_pending_auth_event";

function queueAuthEvent(
  eventName:
    "auth_login_clicked" | "auth_signup_clicked" | "auth_google_clicked",
  metadata: Record<string, unknown>,
) {
  sessionStorage.setItem(
    PENDING_AUTH_EVENT_KEY,
    JSON.stringify({ eventName, metadata }),
  );
  trackEvent(eventName, { metadata });
}

export default function Auth() {
  useSEO({
    title: "로그인 | Hoju Jobs",
    description: "Hoju Jobs 로그인 페이지",
    noindex: true,
  });

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, needsOnboarding } = useAuth();

  // After any successful session (email or OAuth), leave /auth and strip /auth#… — home unless ?next= is set (e.g. 공고 등록).
  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    const pendingAuthEvent = sessionStorage.getItem(PENDING_AUTH_EVENT_KEY);
    if (pendingAuthEvent) {
      sessionStorage.removeItem(PENDING_AUTH_EVENT_KEY);
      try {
        const parsed = JSON.parse(pendingAuthEvent) as {
          eventName?:
            | "auth_login_clicked"
            | "auth_signup_clicked"
            | "auth_google_clicked";
          metadata?: Record<string, unknown>;
        };
        if (parsed.eventName)
          trackEvent(parsed.eventName, { metadata: parsed.metadata });
      } catch {}
    }
    const dest = getPostAuthDestination(searchParams, needsOnboarding);
    navigate(dest, { replace: true });
  }, [user, authLoading, needsOnboarding, searchParams, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      queueAuthEvent("auth_login_clicked", {
        method: "email",
        surface: "auth_form",
      });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("로그인 성공!");
        // Redirect handled in useEffect once session is applied (avoids leaving /auth#)
      }
    } else {
      queueAuthEvent("auth_signup_clicked", {
        method: "email",
        surface: "auth_form",
      });
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: getSiteOrigin() },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("가입 확인 이메일을 확인해주세요!");
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    queueAuthEvent("auth_google_clicked", { surface: "auth_form" });
    const next = getSafeNextPath(searchParams);
    const origin = getSiteOrigin();
    const returnUrl =
      next != null
        ? `${origin}/auth?${new URLSearchParams({ next })}`
        : `${origin}/auth`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: returnUrl },
    });
    if (error) {
      toast.error("Google 로그인 실패");
    }
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white text-neutral-950">
      <main className="mx-auto flex w-full flex-1 justify-center px-5 py-10 sm:py-16">
        <section className="w-full max-w-[360px]">
          <div className="text-center">
            <p className="text-sm font-black tracking-[-0.04em] text-neutral-950">
              호주의 모든 기회는 호주잡스로 통한다!
            </p>
            <img
              src={hojuJobsLogo}
              alt="Hoju Jobs"
              className="mx-auto mt-3 h-auto w-[150px] object-contain"
            />
          </div>

          <div className="mt-8">
            <form onSubmit={handleEmailAuth} className="grid gap-2.5">
              <Label htmlFor="email" className="sr-only">
                이메일
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-md border-slate-300 pl-10 text-sm font-bold shadow-none placeholder:text-slate-300 focus-visible:ring-blue-600"
                  required
                />
              </div>

              <Label htmlFor="password" className="sr-only">
                비밀번호
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-md border-slate-300 pl-10 text-sm font-bold shadow-none placeholder:text-slate-300 focus-visible:ring-blue-600"
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="mt-1 h-11 rounded-md bg-blue-600 text-sm font-black text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs font-black uppercase text-slate-400">
                <span className="bg-white px-3">또는</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                aria-label="Google로 로그인"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-5 text-center text-xs font-bold text-slate-500">
              {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
              <button
                type="button"
                onClick={() => {
                  trackEvent("auth_mode_toggled", {
                    metadata: { next_mode: isLogin ? "signup" : "login" },
                  });
                  setIsLogin(!isLogin);
                }}
                className="font-black text-blue-700 hover:underline"
              >
                {isLogin ? "회원가입" : "로그인"}
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
