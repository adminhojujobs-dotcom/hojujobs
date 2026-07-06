import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { BranchSearchSelect } from "@/components/BranchSearchSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CompanyBranchOption } from "@/lib/userProfile";
import { toast } from "sonner";

export default function PostJob() {
  useSEO({ title: "채용 공고 등록 | Hoju Jobs", description: "사업자 채용 공고 등록", noindex: true });

  const navigate = useNavigate();
  const preview = useDevPreviewAuth();
  const { user, loading, needsOnboarding, isBusiness } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<CompanyBranchOption | null>(null);
  const [form, setForm] = useState({
    branchId: "",
    title: "",
    salary: "",
    details: "",
  });

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (preview) {
      toast.message("미리보기 모드입니다. 실제 저장은 로그인 후 가능합니다.");
      return;
    }
    if (!user || !selectedBranch || !form.title.trim()) {
      toast.error("지점과 공고명을 입력해주세요.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("business_job_listings").insert({
      user_id: user.id,
      branch_id: selectedBranch.id,
      company_slug: selectedBranch.company_slug,
      title: form.title.trim(),
      salary: form.salary.trim() || null,
      details: form.details.trim() || null,
    });

    if (error) {
      toast.error("공고 등록에 실패했습니다.");
      setSubmitting(false);
      return;
    }

    toast.success("채용 공고가 등록되었습니다.");
    navigate("/profile");
    setSubmitting(false);
  };

  if (!preview && (loading || !user || !isBusiness)) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center px-4 py-16 text-sm text-muted-foreground">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <Link to="/profile" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          프로필로 돌아가기
        </Link>

        <h1 className="mb-6 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">채용 공고 등록</h1>

        {preview && (
          <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            미리보기 모드 — UI만 확인할 수 있습니다.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="space-y-2">
            <Label>사업체 지점 *</Label>
            <BranchSearchSelect
              value={form.branchId}
              onChange={(branchId, branch) => {
                setForm((prev) => ({ ...prev, branchId }));
                setSelectedBranch(branch);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">공고명 *</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">급여</Label>
            <Input id="salary" value={form.salary} onChange={(e) => setForm((prev) => ({ ...prev, salary: e.target.value }))} placeholder="예: 시급 $25" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">상세 내용</Label>
            <Textarea id="details" rows={6} value={form.details} onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? "등록 중..." : "공고 등록"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
