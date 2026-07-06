import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { BranchSearchSelect } from "@/components/BranchSearchSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  branchOptionLabel,
  type BusinessJobListing,
  type CompanyBranchOption,
  VISA_TYPE_OPTIONS,
} from "@/lib/userProfile";
import { toast } from "sonner";

type BusinessJobWithBranch = BusinessJobListing & {
  branch?: CompanyBranchOption | null;
};

export default function Profile() {
  useSEO({ title: "내 프로필 | Hoju Jobs", description: "Hoju Jobs 내 프로필", noindex: true });

  const navigate = useNavigate();
  const preview = useDevPreviewAuth();
  const { user, loading, needsOnboarding, isBusiness, isJobSeeker, profile, refreshProfile, signOut } = useAuth();

  const [saving, setSaving] = useState(false);
  const [cvForm, setCvForm] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    visa_type: "",
    introduction: "",
    education: "",
    work_history: "",
    other_info: "",
    job_email_opt_in: false,
  });

  const [businessJobs, setBusinessJobs] = useState<BusinessJobWithBranch[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobForm, setJobForm] = useState({
    branchId: "",
    companySlug: "",
    title: "",
    salary: "",
    details: "",
  });
  const [selectedBranch, setSelectedBranch] = useState<CompanyBranchOption | null>(null);
  const [postingJob, setPostingJob] = useState(false);

  useEffect(() => {
    if (preview) return;
    if (!loading && !user) {
      navigate("/auth?next=/profile", { replace: true });
      return;
    }
    if (!loading && user && needsOnboarding) {
      navigate("/onboarding", { replace: true });
    }
  }, [preview, loading, user, needsOnboarding, navigate]);

  useEffect(() => {
    if (!profile || !isJobSeeker) return;
    setCvForm({
      full_name: profile.full_name ?? "",
      contact_number: profile.contact_number ?? "",
      email: profile.email ?? user?.email ?? "",
      visa_type: profile.visa_type ?? "",
      introduction: profile.introduction ?? "",
      education: profile.education ?? "",
      work_history: profile.work_history ?? "",
      other_info: profile.other_info ?? "",
      job_email_opt_in: profile.job_email_opt_in,
    });
  }, [profile, isJobSeeker, user?.email]);

  useEffect(() => {
    if (preview?.isBusiness) {
      setBusinessJobs([
        {
          id: "preview-job-1",
          user_id: user?.id ?? "preview",
          branch_id: "preview-branch",
          company_slug: "kmall09",
          title: "카페 홀 서빙 스태프",
          salary: "시급 $26",
          details: "주말 근무 가능자 우대. 한국어/영어 가능.",
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          branch: {
            id: "preview-branch",
            company_slug: "kmall09",
            branch_name: "Lidcombe",
            branch_label: "리드컴",
            address: "Lidcombe NSW",
            company_name: "KMALL09",
          },
        },
      ]);
      setJobsLoading(false);
      return;
    }

    if (!user || !isBusiness) return;

    let cancelled = false;

    async function fetchBusinessJobs() {
      setJobsLoading(true);
      const { data, error } = await supabase
        .from("business_job_listings")
        .select("id, user_id, branch_id, company_slug, title, salary, details, is_active, created_at, updated_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        toast.error("등록한 공고를 불러오지 못했습니다.");
        setBusinessJobs([]);
        setJobsLoading(false);
        return;
      }

      const listings = (data ?? []) as BusinessJobListing[];
      const branchIds = [...new Set(listings.map((job) => job.branch_id))];

      if (branchIds.length === 0) {
        setBusinessJobs(listings.map((job) => ({ ...job, branch: null })));
        setJobsLoading(false);
        return;
      }

      const { data: branchRows } = await supabase
        .from("company_branches")
        .select("id, company_slug, branch_name, branch_label, address")
        .in("id", branchIds);

      const slugs = [...new Set((branchRows ?? []).map((row) => row.company_slug))];
      const { data: profiles } = await supabase
        .from("company_profiles")
        .select("slug, name")
        .in("slug", slugs);

      const nameBySlug = new Map((profiles ?? []).map((row) => [row.slug, row.name]));
      const branchById = new Map(
        (branchRows ?? []).map((row) => [
          row.id,
          {
            id: row.id,
            company_slug: row.company_slug,
            branch_name: row.branch_name,
            branch_label: row.branch_label,
            address: row.address,
            company_name: nameBySlug.get(row.company_slug) ?? row.company_slug,
          } satisfies CompanyBranchOption,
        ]),
      );

      setBusinessJobs(
        listings.map((job) => ({
          ...job,
          branch: branchById.get(job.branch_id) ?? null,
        })),
      );
      setJobsLoading(false);
    }

    fetchBusinessJobs();
    return () => {
      cancelled = true;
    };
  }, [user, isBusiness, preview]);

  const saveCv = async (event: React.FormEvent) => {
    event.preventDefault();
    if (preview) {
      toast.message("미리보기 모드입니다. 실제 저장은 로그인 후 가능합니다.");
      return;
    }
    if (!user) return;

    if (!cvForm.full_name.trim() || !cvForm.contact_number.trim() || !cvForm.email.trim() || !cvForm.visa_type || !cvForm.introduction.trim()) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: cvForm.full_name.trim(),
        contact_number: cvForm.contact_number.trim(),
        email: cvForm.email.trim(),
        visa_type: cvForm.visa_type,
        introduction: cvForm.introduction.trim(),
        education: cvForm.education.trim() || null,
        work_history: cvForm.work_history.trim() || null,
        other_info: cvForm.other_info.trim() || null,
        job_email_opt_in: cvForm.job_email_opt_in,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      toast.error("프로필 저장에 실패했습니다.");
    } else {
      toast.success("프로필이 저장되었습니다.");
      await refreshProfile();
    }
    setSaving(false);
  };

  const submitBusinessJob = async (event: React.FormEvent) => {
    event.preventDefault();
    if (preview) {
      toast.message("미리보기 모드입니다. 실제 저장은 로그인 후 가능합니다.");
      return;
    }
    if (!user || !selectedBranch || !jobForm.title.trim()) {
      toast.error("지점과 공고명을 입력해주세요.");
      return;
    }

    setPostingJob(true);
    const { data, error } = await supabase
      .from("business_job_listings")
      .insert({
        user_id: user.id,
        branch_id: selectedBranch.id,
        company_slug: selectedBranch.company_slug,
        title: jobForm.title.trim(),
        salary: jobForm.salary.trim() || null,
        details: jobForm.details.trim() || null,
      })
      .select("id, user_id, branch_id, company_slug, title, salary, details, is_active, created_at, updated_at")
      .single();

    if (error || !data) {
      toast.error("공고 등록에 실패했습니다.");
      setPostingJob(false);
      return;
    }

    setBusinessJobs((current) => [{ ...(data as BusinessJobListing), branch: selectedBranch }, ...current]);
    setJobForm({ branchId: "", companySlug: "", title: "", salary: "", details: "" });
    setSelectedBranch(null);
    toast.success("채용 공고가 등록되었습니다.");
    setPostingJob(false);
  };

  const deleteBusinessJob = async (jobId: string) => {
    if (preview) {
      toast.message("미리보기 모드입니다.");
      return;
    }
    if (!confirm("이 공고를 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("business_job_listings").delete().eq("id", jobId);
    if (error) {
      toast.error("공고 삭제에 실패했습니다.");
      return;
    }
    setBusinessJobs((current) => current.filter((job) => job.id !== jobId));
    toast.success("공고가 삭제되었습니다.");
  };

  if (!preview && (loading || !user || !profile)) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-[#f7f8fb] px-4 py-16 text-sm text-muted-foreground">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        {preview && (
          <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            미리보기 모드 — UI만 확인할 수 있습니다.
          </p>
        )}

        <h1 className="mb-2 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">내 프로필</h1>
        <p className="mb-8 text-sm text-slate-600">
          {isBusiness ? "사업자 계정으로 채용 공고를 관리할 수 있습니다." : "이력서 정보를 작성하고 수정할 수 있습니다."}
        </p>

        {isJobSeeker ? (
          <form onSubmit={saveCv} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="full_name">이름 *</Label>
                <Input id="full_name" value={cvForm.full_name} onChange={(e) => setCvForm((prev) => ({ ...prev, full_name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_number">연락처 *</Label>
                <Input id="contact_number" type="tel" value={cvForm.contact_number} onChange={(e) => setCvForm((prev) => ({ ...prev, contact_number: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <Input id="email" type="email" value={cvForm.email} onChange={(e) => setCvForm((prev) => ({ ...prev, email: e.target.value }))} required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>비자 종류 *</Label>
                <Select value={cvForm.visa_type} onValueChange={(value) => setCvForm((prev) => ({ ...prev, visa_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="비자 종류를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {VISA_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="introduction">자기소개 *</Label>
                <Textarea id="introduction" rows={4} value={cvForm.introduction} onChange={(e) => setCvForm((prev) => ({ ...prev, introduction: e.target.value }))} required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="education">학력</Label>
                <Textarea id="education" rows={3} value={cvForm.education} onChange={(e) => setCvForm((prev) => ({ ...prev, education: e.target.value }))} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="work_history">경력</Label>
                <Textarea id="work_history" rows={4} value={cvForm.work_history} onChange={(e) => setCvForm((prev) => ({ ...prev, work_history: e.target.value }))} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="other_info">기타 정보</Label>
                <Textarea id="other_info" rows={3} value={cvForm.other_info} onChange={(e) => setCvForm((prev) => ({ ...prev, other_info: e.target.value }))} />
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <Checkbox
                id="profile-job-email-opt-in"
                checked={cvForm.job_email_opt_in}
                onCheckedChange={(checked) => setCvForm((prev) => ({ ...prev, job_email_opt_in: checked === true }))}
              />
              <div>
                <Label htmlFor="profile-job-email-opt-in" className="text-sm font-semibold">
                  새로운 채용 공고 이메일을 받고 싶습니다
                </Label>
                <p className="mt-1 text-sm text-slate-500">관련 공고가 등록되면 이메일로 알려드립니다.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "저장 중..." : "프로필 저장"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <form onSubmit={submitBusinessJob} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-neutral-950">채용 공고 등록</h2>
                <Button type="button" variant="outline" size="sm" onClick={() => navigate("/post-job")}>
                  <Plus className="mr-1 h-4 w-4" />
                  전체 화면
                </Button>
              </div>

              <div className="space-y-2">
                <Label>사업체 지점 *</Label>
                <BranchSearchSelect
                  value={jobForm.branchId}
                  onChange={(branchId, branch) => {
                    setJobForm((prev) => ({ ...prev, branchId, companySlug: branch.company_slug }));
                    setSelectedBranch(branch);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">공고명 *</Label>
                <Input id="job-title" value={jobForm.title} onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-salary">급여</Label>
                <Input id="job-salary" value={jobForm.salary} onChange={(e) => setJobForm((prev) => ({ ...prev, salary: e.target.value }))} placeholder="예: 시급 $25" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-details">상세 내용</Label>
                <Textarea id="job-details" rows={5} value={jobForm.details} onChange={(e) => setJobForm((prev) => ({ ...prev, details: e.target.value }))} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={postingJob}>
                  {postingJob ? "등록 중..." : "공고 등록"}
                </Button>
              </div>
            </form>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-black text-neutral-950">등록한 채용 공고</h2>
              {jobsLoading ? (
                <p className="text-sm text-muted-foreground">불러오는 중...</p>
              ) : businessJobs.length === 0 ? (
                <p className="rounded-xl border border-dashed bg-slate-50 py-10 text-center text-sm text-muted-foreground">
                  등록한 공고가 없습니다.
                </p>
              ) : (
                <div className="space-y-3">
                  {businessJobs.map((job) => (
                    <div key={job.id} className="rounded-xl border border-slate-100 px-4 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-bold text-neutral-950">{job.title}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {job.branch ? branchOptionLabel(job.branch) : job.company_slug}
                          </p>
                          {job.salary && <p className="mt-1 text-sm font-semibold text-blue-700">{job.salary}</p>}
                          {job.details && <p className="mt-2 line-clamp-3 text-sm text-slate-600">{job.details}</p>}
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => void deleteBusinessJob(job.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Button type="button" variant="outline" onClick={() => void signOut()} className="gap-2">
            <LogOut className="h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </main>
    </div>
  );
}
