import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Building2, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { AccountType } from "@/lib/userProfile";

export default function Onboarding() {
  useSEO({
    title: "계정 유형 선택 | Hoju Jobs",
    description: "호주잡스에서 사용할 계정 유형을 선택하세요.",
    noindex: true,
  });

  const navigate = useNavigate();
  const preview = useDevPreviewAuth();
  const { user, loading, needsOnboarding, refreshProfile } = useAuth();
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const [jobEmailOptIn, setJobEmailOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!preview && !loading && !user) {
    navigate("/auth", { replace: true });
    return null;
  }

  if (!preview && !loading && user && !needsOnboarding) {
    navigate("/profile", { replace: true });
    return null;
  }

  const handleSubmit = async () => {
    if (preview) {
      toast.message("미리보기 모드입니다. 실제 저장은 로그인 후 가능합니다.");
      return;
    }

    if (!user || !selectedType) {
      toast.error("계정 유형을 선택해주세요.");
      return;
    }

    setSubmitting(true);

    const payload = {
      user_id: user.id,
      account_type: selectedType,
      onboarding_completed: true,
      job_email_opt_in: selectedType === "job_seeker" ? jobEmailOptIn : false,
      email: user.email ?? null,
    };

    const { error } = await supabase.from("user_profiles").upsert(payload, { onConflict: "user_id" });

    if (error) {
      toast.error("계정 설정 저장에 실패했습니다.");
      setSubmitting(false);
      return;
    }

    await refreshProfile();
    toast.success("계정 설정이 완료되었습니다.");
    navigate("/profile", { replace: true });
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="mb-3 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">계정 유형을 선택하세요</h1>
        <p className="mb-8 text-sm text-slate-600 sm:text-base">
          처음 오신 것을 환영합니다. 호주잡스에서 어떤 방식으로 이용하실지 선택해 주세요.
        </p>

        {preview && (
          <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            미리보기 모드 — UI만 확인할 수 있습니다.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSelectedType("job_seeker")}
            className={cn(
              "rounded-2xl border bg-white p-6 text-left transition-colors",
              selectedType === "job_seeker" ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300",
            )}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-black text-neutral-950">일반 회원</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              호주에서 일자리를 찾고 계신 분께 추천합니다. 채용 공고 탐색, 지원, CV 작성 등 워킹홀리데이 한국인을 위한 취업 지원 기능을 이용할 수 있습니다.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedType("business")}
            className={cn(
              "rounded-2xl border bg-white p-6 text-left transition-colors",
              selectedType === "business" ? "border-blue-600 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300",
            )}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-black text-neutral-950">호주 사업자</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              호주 사업체를 운영 중이신 분께 추천합니다. 사업체 정보를 등록하고, 워킹홀리데이 이용자가 볼 수 있는 채용 공고를 업로드할 수 있습니다.
            </p>
          </button>
        </div>

        {selectedType === "job_seeker" && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <Checkbox
                id="job-email-opt-in"
                checked={jobEmailOptIn}
                onCheckedChange={(checked) => setJobEmailOptIn(checked === true)}
              />
              <div className="space-y-1">
                <Label htmlFor="job-email-opt-in" className="text-sm font-semibold text-neutral-950">
                  새로운 채용 공고 이메일을 받고 싶습니다
                </Label>
                <p className="text-sm text-slate-500">관련 공고가 등록되면 이메일로 알려드립니다.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button type="button" onClick={handleSubmit} disabled={!selectedType || submitting} className="h-11 px-6 font-black">
            {submitting ? "저장 중..." : "시작하기"}
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
