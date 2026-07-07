import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";
import { useSEO } from "@/hooks/useSEO";
import { JobPostingForm } from "@/components/JobPostingForm";

export default function PostJob() {
  useSEO({ title: "채용 공고 등록 | Hoju Jobs", description: "사업자 채용 공고 등록", noindex: true });

  const navigate = useNavigate();
  const preview = useDevPreviewAuth();
  const { user, loading, needsOnboarding, isBusiness } = useAuth();

  useEffect(() => {
    if (preview) return;
    if (!loading && !user) {
      navigate("/auth?next=/post-job", { replace: true });
      return;
    }
    if (!loading && user && needsOnboarding) {
      navigate("/onboarding", { replace: true });
      return;
    }
    if (!loading && user && !needsOnboarding && !isBusiness) {
      navigate("/profile", { replace: true });
    }
  }, [preview, loading, user, needsOnboarding, isBusiness, navigate]);

  if (!preview && (loading || !user || !isBusiness)) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center px-4 py-16 text-sm font-semibold text-slate-500">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white text-neutral-950">
      <main className="mx-auto w-full max-w-[880px] px-5 py-8 sm:py-12">
        <Link
          to="/profile"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          프로필로 돌아가기
        </Link>

        <h1 className="mb-8 text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">채용 공고 등록</h1>

        {preview && (
          <p className="mb-8 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
            미리보기 모드 — UI만 확인할 수 있습니다.
          </p>
        )}

        <JobPostingForm />
      </main>
    </div>
  );
}
