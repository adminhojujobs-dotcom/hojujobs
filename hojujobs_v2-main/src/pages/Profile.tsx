import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Trash2, Users, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { BranchSearchSelect } from "@/components/BranchSearchSelect";
import {
  FormRow,
  FormSection,
  jobFormInputClass as inputClass,
  jobFormTextareaClass as textareaClass,
} from "@/components/JobFormLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  buildCompanyOpeningInsert,
  countApplicationsByOpening,
  formatOpeningDate,
  MANAGED_COMPANY_OPENING_SELECT,
  openingPublicPath,
  type ManagedCompanyOpening,
} from "@/lib/companyJobOpenings";
import {
  branchOptionLabel,
  type CompanyBranchOption,
  VISA_TYPE_OPTIONS,
} from "@/lib/userProfile";
import { toast } from "sonner";

type ManagedOpeningWithBranch = ManagedCompanyOpening & {
  branch?: CompanyBranchOption | null;
  applicationCount?: number;
};

const labelClass = "text-sm font-bold text-slate-600";

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

  const [managedOpenings, setManagedOpenings] = useState<ManagedOpeningWithBranch[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobForm, setJobForm] = useState({
    branchId: "",
    companySlug: "",
    title: "",
    pay: "",
    duties: "",
    quickApply: false,
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
      setManagedOpenings([
        {
          id: "preview-opening-1",
          company_slug: "kmall09",
          branch_id: "preview-branch",
          title: "카페 홀 서빙 스태프",
          pay: "시급 $26",
          hours: "시간협의",
          quick_apply: true,
          is_active: true,
          posted_by_user_id: user?.id ?? "preview",
          detail_intro: "주말 근무 가능자 우대. 한국어/영어 가능.",
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

    async function fetchManagedOpenings() {
      setJobsLoading(true);
      const { data, error } = await supabase
        .from("company_job_openings")
        .select(MANAGED_COMPANY_OPENING_SELECT)
        .eq("posted_by_user_id", user.id)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        toast.error("등록한 공고를 불러오지 못했습니다.");
        setManagedOpenings([]);
        setJobsLoading(false);
        return;
      }

      const listings = (data ?? []) as ManagedCompanyOpening[];
      const openingIds = listings.map((job) => job.id);
      const branchIds = [...new Set(listings.map((job) => job.branch_id).filter(Boolean))] as string[];

      const [{ data: applicationRows }, branchResult] = await Promise.all([
        openingIds.length > 0
          ? supabase.from("company_job_applications").select("opening_id").in("opening_id", openingIds)
          : Promise.resolve({ data: [] as { opening_id: string }[] }),
        branchIds.length > 0
          ? supabase
              .from("company_branches")
              .select("id, company_slug, branch_name, branch_label, address, email")
              .in("id", branchIds)
          : Promise.resolve({ data: [] as { id: string; company_slug: string; branch_name: string; branch_label: string | null; address: string; email: string | null }[] }),
      ]);

      if (cancelled) return;

      const applicationCounts = countApplicationsByOpening(applicationRows ?? []);
      const branchRows = branchResult.data ?? [];

      if (branchRows.length === 0) {
        setManagedOpenings(
          listings.map((job) => ({
            ...job,
            branch: null,
            applicationCount: applicationCounts.get(job.id) ?? 0,
          })),
        );
        setJobsLoading(false);
        return;
      }

      const slugs = [...new Set(branchRows.map((row) => row.company_slug))];
      const { data: profiles } = await supabase
        .from("company_profiles")
        .select("slug, name")
        .in("slug", slugs);

      if (cancelled) return;

      const nameBySlug = new Map((profiles ?? []).map((row) => [row.slug, row.name]));
      const branchById = new Map(
        branchRows.map((row) => [
          row.id,
          {
            id: row.id,
            company_slug: row.company_slug,
            branch_name: row.branch_name,
            branch_label: row.branch_label,
            address: row.address,
            company_name: nameBySlug.get(row.company_slug) ?? row.company_slug,
            email: row.email,
          } satisfies CompanyBranchOption,
        ]),
      );

      setManagedOpenings(
        listings.map((job) => ({
          ...job,
          branch: job.branch_id ? branchById.get(job.branch_id) ?? null : null,
          applicationCount: applicationCounts.get(job.id) ?? 0,
        })),
      );
      setJobsLoading(false);
    }

    fetchManagedOpenings();
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
      .from("company_job_openings")
      .insert(
        buildCompanyOpeningInsert({
          userId: user.id,
          branch: selectedBranch,
          title: jobForm.title,
          pay: jobForm.pay,
          duties: jobForm.duties,
          quickApply: jobForm.quickApply,
        }),
      )
      .select(MANAGED_COMPANY_OPENING_SELECT)
      .single();

    if (error || !data) {
      toast.error("공고 등록에 실패했습니다.");
      setPostingJob(false);
      return;
    }

    setManagedOpenings((current) => [{ ...(data as ManagedCompanyOpening), branch: selectedBranch }, ...current]);
    setJobForm({ branchId: "", companySlug: "", title: "", pay: "", duties: "", quickApply: false });
    setSelectedBranch(null);
    toast.success("채용 공고가 등록되었습니다.");
    setPostingJob(false);
  };

  const deleteManagedOpening = async (openingId: string) => {
    if (preview) {
      toast.message("미리보기 모드입니다.");
      return;
    }
    if (!confirm("이 공고를 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("company_job_openings").delete().eq("id", openingId);
    if (error) {
      toast.error("공고 삭제에 실패했습니다.");
      return;
    }
    setManagedOpenings((current) => current.filter((job) => job.id !== openingId));
    toast.success("공고가 삭제되었습니다.");
  };

  if (!preview && (loading || !user || !profile)) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center px-4 py-16 text-sm font-semibold text-slate-500">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white text-neutral-950">
      <main className="mx-auto w-full max-w-[720px] px-5 py-8 sm:py-12">
        {preview && (
          <p className="mb-8 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
            미리보기 모드 — UI만 확인할 수 있습니다.
          </p>
        )}

        <h1 className="mb-2 text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">내 프로필</h1>
        <p className="mb-8 text-sm font-semibold text-slate-500">
          {isBusiness ? "사업자 계정으로 채용 공고를 관리할 수 있습니다." : "이력서 정보를 작성하고 수정할 수 있습니다."}
        </p>

        {isJobSeeker ? (
          <form onSubmit={saveCv} className="space-y-16">
            <FormSection title="기본 정보">
              <FormRow label="이름" htmlFor="full_name" required>
                <Input id="full_name" value={cvForm.full_name} onChange={(e) => setCvForm((prev) => ({ ...prev, full_name: e.target.value }))} placeholder="예: 김민수" className={inputClass} required />
              </FormRow>
              <FormRow label="연락처" htmlFor="contact_number" required>
                <Input id="contact_number" type="tel" value={cvForm.contact_number} onChange={(e) => setCvForm((prev) => ({ ...prev, contact_number: e.target.value }))} placeholder="예: 0400 000 000" className={inputClass} required />
              </FormRow>
              <FormRow label="이메일" htmlFor="email" required>
                <Input id="email" type="email" value={cvForm.email} onChange={(e) => setCvForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="예: minsu@example.com" className={inputClass} required />
              </FormRow>
              <FormRow label="비자 종류" required>
                <Select value={cvForm.visa_type} onValueChange={(value) => setCvForm((prev) => ({ ...prev, visa_type: value }))}>
                  <SelectTrigger className={inputClass}>
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
              </FormRow>
            </FormSection>

            <FormSection title="자기소개">
              <FormRow label="자기소개" htmlFor="introduction" required>
                <Textarea
                  id="introduction"
                  rows={4}
                  value={cvForm.introduction}
                  onChange={(e) => setCvForm((prev) => ({ ...prev, introduction: e.target.value }))}
                  placeholder="예: 워킹홀리데이(subclass 417)로 호주에 온 지 3개월 되었습니다. 밝고 성실한 성격으로 카페/리테일 아르바이트 경험이 있습니다."
                  className={textareaClass}
                  required
                />
              </FormRow>
            </FormSection>

            <FormSection title="학력·경력">
              <FormRow label="학력" htmlFor="education">
                <Textarea
                  id="education"
                  rows={3}
                  value={cvForm.education}
                  onChange={(e) => setCvForm((prev) => ({ ...prev, education: e.target.value }))}
                  placeholder="예: 서울 OO대학교 경영학과 졸업"
                  className={textareaClass}
                />
              </FormRow>
              <FormRow label="경력" htmlFor="work_history">
                <Textarea
                  id="work_history"
                  rows={4}
                  value={cvForm.work_history}
                  onChange={(e) => setCvForm((prev) => ({ ...prev, work_history: e.target.value }))}
                  placeholder="예: 한국 카페 바리스타 1년, 호주 리테일 매장 3개월 근무"
                  className={textareaClass}
                />
              </FormRow>
              <FormRow label="기타 정보" htmlFor="other_info">
                <Textarea
                  id="other_info"
                  rows={3}
                  value={cvForm.other_info}
                  onChange={(e) => setCvForm((prev) => ({ ...prev, other_info: e.target.value }))}
                  placeholder="예: 주말 근무 가능, 영어 회화 가능, 화이트카드 소지"
                  className={textareaClass}
                />
              </FormRow>
            </FormSection>

            <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
              <Checkbox
                id="profile-job-email-opt-in"
                checked={cvForm.job_email_opt_in}
                onCheckedChange={(checked) => setCvForm((prev) => ({ ...prev, job_email_opt_in: checked === true }))}
              />
              <div>
                <Label htmlFor="profile-job-email-opt-in" className="text-sm font-bold text-neutral-950">
                  새로운 채용 공고 이메일을 받고 싶습니다
                </Label>
                <p className="mt-1 text-sm font-semibold text-slate-500">관련 공고가 등록되면 이메일로 알려드립니다.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="h-12 rounded-md bg-blue-600 px-8 font-black text-white hover:bg-blue-700" disabled={saving}>
                {saving ? "저장 중..." : "프로필 저장"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-10">
            <form onSubmit={submitBusinessJob} className="space-y-5 border-b border-slate-200 pb-8">
              <h2 className="text-lg font-black tracking-[-0.03em] text-neutral-950">채용 공고 등록</h2>

              <div className="space-y-2">
                <Label className={labelClass}>사업체 지점 *</Label>
                <BranchSearchSelect
                  value={jobForm.branchId}
                  onChange={(branchId, branch) => {
                    setJobForm((prev) => ({ ...prev, branchId, companySlug: branch.company_slug }));
                    setSelectedBranch(branch);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title" className={labelClass}>공고명 *</Label>
                <Input id="job-title" value={jobForm.title} onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))} className={inputClass} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-salary" className={labelClass}>급여</Label>
                <Input id="job-salary" value={jobForm.pay} onChange={(e) => setJobForm((prev) => ({ ...prev, pay: e.target.value }))} placeholder="예: 시급 $25" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-details" className={labelClass}>담당업무</Label>
                <Textarea id="job-details" rows={5} value={jobForm.duties} onChange={(e) => setJobForm((prev) => ({ ...prev, duties: e.target.value }))} className={textareaClass} />
              </div>
              <p className="text-xs font-semibold text-slate-400">
                근무조건, 모집조건 등 나머지 항목은 상단의 "업로드" 메뉴에서 입력할 수 있습니다.
              </p>
              <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
                <Checkbox
                  id="job-quick-apply"
                  checked={jobForm.quickApply}
                  onCheckedChange={(checked) => setJobForm((prev) => ({ ...prev, quickApply: checked === true }))}
                />
                <div>
                  <Label htmlFor="job-quick-apply" className="text-sm font-bold text-neutral-950">
                    빠른 지원 활성화
                  </Label>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    활성화하면 구직자가 프로필 이력서로 바로 지원할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="h-11 rounded-md bg-blue-600 px-6 font-black text-white hover:bg-blue-700" disabled={postingJob}>
                  {postingJob ? "등록 중..." : "공고 등록"}
                </Button>
              </div>
            </form>

            <section>
              <h2 className="mb-5 text-lg font-black tracking-[-0.03em] text-neutral-950">등록한 채용 공고</h2>
              {jobsLoading ? (
                <p className="text-sm font-semibold text-slate-500">불러오는 중...</p>
              ) : managedOpenings.length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm font-semibold text-slate-500">
                  등록한 공고가 없습니다.
                </p>
              ) : (
                <div className="divide-y divide-slate-200 border-y border-t-neutral-950 border-b-slate-200">
                  {managedOpenings.map((opening) => (
                    <div key={opening.id} className="px-1 py-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <Link
                            to={openingPublicPath(opening.company_slug, opening.id)}
                            className="block hover:opacity-80"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-base font-black text-neutral-950">{opening.title}</p>
                              {opening.quick_apply && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-emerald-700">
                                  <Zap className="h-3 w-3" />
                                  빠른 지원
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              {opening.branch ? branchOptionLabel(opening.branch) : opening.company_slug}
                            </p>
                            {opening.branch?.address && (
                              <p className="mt-1 text-xs font-semibold text-slate-400">{opening.branch.address}</p>
                            )}
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                              {opening.pay && <span className="font-black text-blue-700">{opening.pay}</span>}
                              <span className="font-semibold text-slate-400">{formatOpeningDate(opening.created_at)} 등록</span>
                            </div>
                            {opening.detail_intro && (
                              <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-600">{opening.detail_intro}</p>
                            )}
                          </Link>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <Button asChild variant="outline" size="sm" className="rounded-md">
                              <Link to={openingPublicPath(opening.company_slug, opening.id)}>사이트에서 보기</Link>
                            </Button>
                            {opening.quick_apply && (
                              <Button asChild variant="outline" size="sm" className="rounded-md">
                                <Link to={`/my-jobs/${opening.id}`}>
                                  <Users className="mr-1.5 h-3.5 w-3.5" />
                                  지원자 관리 ({opening.applicationCount ?? 0})
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => void deleteManagedOpening(opening.id)}>
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
          <Button type="button" variant="outline" className="gap-2 rounded-md" onClick={() => void signOut()}>
            <LogOut className="h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </main>
    </div>
  );
}
