import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDevPreviewAuth } from "@/components/DevPreviewAuth";
import { supabase } from "@/integrations/supabase/client";
import { BranchSearchSelect } from "@/components/BranchSearchSelect";
import { LocationPicker } from "@/components/LocationPicker";
import {
  ExtraFieldsEditor,
  FormRow,
  FormSection,
  jobFormInputClass as inputClass,
  jobFormTextareaClass as textareaClass,
} from "@/components/JobFormLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  buildCompanyOpeningInsert,
  openingPublicPath,
  type CompanyOpeningExtraField,
} from "@/lib/companyJobOpenings";
import type { CompanyBranchOption } from "@/lib/userProfile";
import { toast } from "sonner";

const EMPTY_GENERIC_FORM = {
  title: "",
  industry: "",
  contact: "",
  email: "",
  kakaoid: "",
  google_search: "",
  description: "",
};

export function JobPostingForm() {
  const navigate = useNavigate();
  const preview = useDevPreviewAuth();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<CompanyBranchOption | null>(null);
  const [form, setForm] = useState({
    branchId: "",
    title: "",
    pay: "",
    positionType: "",
    workDays: "",
    workHours: "",
    benefits: "",
    headcount: "",
    deadline: "",
    preferredQualifications: "",
    howToApply: "",
    applyEmail: "",
    contactPhone: "",
    employmentType: "",
    requiredDocuments: "",
    duties: "",
    quickApply: false,
  });
  const [workExtraFields, setWorkExtraFields] = useState<CompanyOpeningExtraField[]>([]);
  const [recruitmentExtraFields, setRecruitmentExtraFields] = useState<CompanyOpeningExtraField[]>([]);
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkillTag = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skillTags.includes(trimmed)) {
      setSkillTags((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const [postMode, setPostMode] = useState<"company" | "generic">("company");
  const [genericForm, setGenericForm] = useState(EMPTY_GENERIC_FORM);
  const [genericLocations, setGenericLocations] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [submittingGeneric, setSubmittingGeneric] = useState(false);

  useEffect(() => {
    if (postMode !== "generic" || preview) return;
    supabase
      .from("jobs")
      .select("location")
      .then(({ data }) => {
        setAvailableLocations([...new Set((data ?? []).flatMap((row) => row.location ?? []))].sort());
      });
  }, [postMode, preview]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (preview) {
      toast.message("미리보기 모드입니다. 실제 저장은 로그인 후 가능합니다.");
      return;
    }
    const requiredFields: [string, string][] = [
      [form.title, "공고명"],
      [form.pay, "급여"],
      [form.positionType, "모집분야"],
      [form.workDays, "근무요일"],
      [form.workHours, "근무시간"],
      [form.headcount, "모집인원"],
      [form.deadline, "모집마감"],
      [form.preferredQualifications, "우대사항"],
      [form.howToApply, "지원방법"],
      [form.applyEmail, "이메일"],
      [form.contactPhone, "연락처"],
    ];
    const missingField = requiredFields.find(([value]) => !value.trim());
    if (!user || !selectedBranch || missingField) {
      toast.error(missingField ? `${missingField[1]}을(를) 입력해주세요.` : "지점을 선택해주세요.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from("company_job_openings")
      .insert(buildCompanyOpeningInsert({
        userId: user.id,
        branch: selectedBranch,
        title: form.title,
        pay: form.pay,
        positionType: form.positionType,
        workDays: form.workDays,
        workHours: form.workHours,
        benefits: form.benefits,
        headcount: form.headcount,
        deadline: form.deadline,
        preferredQualifications: form.preferredQualifications,
        howToApply: form.howToApply,
        applyEmail: form.applyEmail,
        contactPhone: form.contactPhone,
        employmentType: form.employmentType,
        requiredDocuments: form.requiredDocuments,
        duties: form.duties,
        conditionExtraFields: workExtraFields,
        recruitmentExtraFields,
        skillTags,
        quickApply: form.quickApply,
      }))
      .select("id, company_slug")
      .single();

    if (error || !data) {
      toast.error("공고 등록에 실패했습니다.");
      setSubmitting(false);
      return;
    }

    toast.success("채용 공고가 등록되었습니다.");
    navigate(openingPublicPath(data.company_slug, data.id));
    setSubmitting(false);
  };

  const handleSubmitGeneric = async (event: React.FormEvent) => {
    event.preventDefault();
    if (preview) {
      toast.message("미리보기 모드입니다. 실제 저장은 로그인 후 가능합니다.");
      return;
    }
    if (!user || !genericForm.title.trim() || !genericForm.industry.trim() || genericLocations.length === 0) {
      toast.error("제목, 지역, 업종을 입력해주세요.");
      return;
    }

    setSubmittingGeneric(true);
    const { data, error } = await supabase
      .from("jobs")
      .insert({
        user_id: user.id,
        title: genericForm.title.trim(),
        industry: genericForm.industry.trim(),
        location: genericLocations,
        contact: genericForm.contact.trim() || null,
        email: genericForm.email.trim() || null,
        kakaoid: genericForm.kakaoid.trim() || null,
        google_search: genericForm.google_search.trim() || null,
        description: genericForm.description.trim() || null,
        uploaded_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !data) {
      toast.error("공고 등록에 실패했습니다.");
      setSubmittingGeneric(false);
      return;
    }

    toast.success("채용 공고가 등록되었습니다.");
    navigate(`/job/${data.id}`);
    setSubmittingGeneric(false);
  };

  if (postMode === "generic") {
    return (
      <form onSubmit={handleSubmitGeneric} className="space-y-16">
        <FormSection title="기본 정보">
          <p className="-mt-4 text-xs font-semibold text-slate-400">
            사업체 프로필 없이 간단한 공고를 등록합니다.{" "}
            <button
              type="button"
              onClick={() => setPostMode("company")}
              className="font-black text-blue-700 hover:underline"
            >
              사업체 목록에서 선택하기
            </button>
          </p>
          <FormRow label="제목" htmlFor="generic-title" required>
            <Input
              id="generic-title"
              value={genericForm.title}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="예: 주방 보조"
              className={inputClass}
              required
            />
          </FormRow>
          <FormRow label="지역" required>
            <LocationPicker
              availableLocations={availableLocations}
              selectedLocations={genericLocations}
              onLocationsChange={setGenericLocations}
            />
          </FormRow>
          <FormRow label="업종" htmlFor="generic-industry" required>
            <Input
              id="generic-industry"
              value={genericForm.industry}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, industry: e.target.value }))}
              placeholder="예: 요식업"
              className={inputClass}
              required
            />
          </FormRow>
          <FormRow label="연락처" htmlFor="generic-contact">
            <Input
              id="generic-contact"
              value={genericForm.contact}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, contact: e.target.value }))}
              placeholder="예: 0412 345 678"
              className={inputClass}
            />
          </FormRow>
          <FormRow label="이메일" htmlFor="generic-email">
            <Input
              id="generic-email"
              type="email"
              value={genericForm.email}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="예: jobs@example.com"
              className={inputClass}
            />
          </FormRow>
          <FormRow label="카카오톡 ID" htmlFor="generic-kakaoid">
            <Input
              id="generic-kakaoid"
              value={genericForm.kakaoid}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, kakaoid: e.target.value }))}
              placeholder="예: kakao123"
              className={inputClass}
            />
          </FormRow>
          <FormRow label="구글 지도 검색어" htmlFor="generic-google-search" hint="공고 상세페이지에 지도가 자동으로 표시됩니다">
            <Input
              id="generic-google-search"
              value={genericForm.google_search}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, google_search: e.target.value }))}
              placeholder="예: 이스트우드 카페, Eastwood NSW"
              className={inputClass}
            />
          </FormRow>
          <FormRow label="상세 내용" htmlFor="generic-description">
            <Textarea
              id="generic-description"
              rows={6}
              value={genericForm.description}
              onChange={(e) => setGenericForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="상세한 공고 내용을 입력해주세요"
              className={textareaClass}
            />
          </FormRow>
        </FormSection>

        <div className="flex justify-end">
          <Button type="submit" className="h-12 rounded-md bg-blue-600 px-8 font-black text-white hover:bg-blue-700" disabled={submittingGeneric}>
            {submittingGeneric ? "등록 중..." : "공고 등록하기"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <FormSection title="기본 정보">
        <FormRow label="사업체 지점" required>
          <BranchSearchSelect
            value={form.branchId}
            onChange={(branchId, branch) => {
              setForm((prev) => ({ ...prev, branchId }));
              setSelectedBranch(branch);
            }}
          />
          <button
            type="button"
            onClick={() => setPostMode("generic")}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            사업체 프로필이 없으신가요? 일반 공고로 등록하기
          </button>
        </FormRow>
        <FormRow label="공고명" htmlFor="title" required>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className={inputClass}
            required
          />
        </FormRow>
      </FormSection>

      <FormSection title="근무 조건">
        <FormRow label="급여" htmlFor="pay" required>
          <Input id="pay" value={form.pay} onChange={(e) => setForm((prev) => ({ ...prev, pay: e.target.value }))} placeholder="예: 시급 $25" className={inputClass} required />
        </FormRow>
        <FormRow label="모집분야" htmlFor="positionType" required>
          <Input id="positionType" value={form.positionType} onChange={(e) => setForm((prev) => ({ ...prev, positionType: e.target.value }))} placeholder="예: 홀 스태프" className={inputClass} required />
        </FormRow>
        <FormRow label="근무요일" htmlFor="workDays" required>
          <Input id="workDays" value={form.workDays} onChange={(e) => setForm((prev) => ({ ...prev, workDays: e.target.value }))} placeholder="예: 주 3일 이상" className={inputClass} required />
        </FormRow>
        <FormRow label="근무시간" htmlFor="workHours" required>
          <Input id="workHours" value={form.workHours} onChange={(e) => setForm((prev) => ({ ...prev, workHours: e.target.value }))} placeholder="예: 09:00~18:00" className={inputClass} required />
        </FormRow>
        <FormRow label="복리후생" htmlFor="benefits">
          <Input id="benefits" value={form.benefits} onChange={(e) => setForm((prev) => ({ ...prev, benefits: e.target.value }))} placeholder="예: 체계적인 트레이닝 제공" className={inputClass} />
        </FormRow>
        <ExtraFieldsEditor
          fields={workExtraFields}
          onChange={setWorkExtraFields}
          labelPlaceholder="항목명 (예: 주차 가능)"
          emptyHint="주차 가능, 유니폼 지급 등 근무 조건에 추가할 항목을 자유롭게 입력하세요."
        />
      </FormSection>

      <FormSection title="모집 조건">
        <FormRow label="모집인원" htmlFor="headcount" required>
          <Input id="headcount" value={form.headcount} onChange={(e) => setForm((prev) => ({ ...prev, headcount: e.target.value }))} placeholder="예: 1명" className={inputClass} required />
        </FormRow>
        <FormRow label="모집마감" htmlFor="deadline" required>
          <Input id="deadline" value={form.deadline} onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))} placeholder="상시모집" className={inputClass} required />
        </FormRow>
        <FormRow label="우대사항" htmlFor="preferredQualifications" required>
          <Textarea id="preferredQualifications" rows={3} value={form.preferredQualifications} onChange={(e) => setForm((prev) => ({ ...prev, preferredQualifications: e.target.value }))} className={textareaClass} required />
        </FormRow>
        <FormRow label="지원방법" htmlFor="howToApply" required>
          <Input id="howToApply" value={form.howToApply} onChange={(e) => setForm((prev) => ({ ...prev, howToApply: e.target.value }))} placeholder="예: 이메일로 지원" className={inputClass} required />
        </FormRow>
        <ExtraFieldsEditor
          fields={recruitmentExtraFields}
          onChange={setRecruitmentExtraFields}
          labelPlaceholder="예: 초보 지원"
          emptyHint="초보 지원, 우대 조건 등 모집 조건에 추가할 항목을 자유롭게 입력하세요."
        />
      </FormSection>

      <FormSection title="연락처">
        <FormRow label="이메일" htmlFor="applyEmail" required>
          <Input id="applyEmail" type="email" value={form.applyEmail} onChange={(e) => setForm((prev) => ({ ...prev, applyEmail: e.target.value }))} placeholder="hr@company.com" className={inputClass} required />
        </FormRow>
        <FormRow label="연락처" htmlFor="contactPhone" required>
          <Input id="contactPhone" value={form.contactPhone} onChange={(e) => setForm((prev) => ({ ...prev, contactPhone: e.target.value }))} placeholder="예: 0400 000 000" className={inputClass} required />
        </FormRow>
      </FormSection>

      <FormSection title="선택 항목">
        <p className="-mt-4 text-xs font-semibold text-slate-400">비워두면 공고에 표시되지 않습니다.</p>
        <FormRow label="근무형태" htmlFor="employmentType">
          <Input id="employmentType" value={form.employmentType} onChange={(e) => setForm((prev) => ({ ...prev, employmentType: e.target.value }))} placeholder="예: 파트타임" className={inputClass} />
        </FormRow>
        <FormRow label="지원서류" htmlFor="requiredDocuments">
          <Input id="requiredDocuments" value={form.requiredDocuments} onChange={(e) => setForm((prev) => ({ ...prev, requiredDocuments: e.target.value }))} placeholder="예: 이력서, 비자상태와 만료일" className={inputClass} />
        </FormRow>
        <FormRow label="담당업무" htmlFor="duties">
          <Textarea id="duties" rows={3} value={form.duties} onChange={(e) => setForm((prev) => ({ ...prev, duties: e.target.value }))} className={textareaClass} />
        </FormRow>
      </FormSection>

      <FormSection title="이런 스킬이 있으면 좋아요">
        <FormRow label="스킬">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkillTag();
                }
              }}
              placeholder="예: 고객응대"
              className={inputClass}
            />
            <Button type="button" variant="outline" className="rounded-md" onClick={addSkillTag}>
              추가
            </Button>
          </div>
          <p className="text-xs font-semibold text-slate-400">지원자에게 보여줄 스킬을 자유롭게 추가하세요.</p>
          {skillTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setSkillTags((prev) => prev.filter((t) => t !== tag))}
                    className="hover:text-blue-900"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </FormRow>
      </FormSection>

      <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
        <Checkbox
          id="quick-apply"
          checked={form.quickApply}
          onCheckedChange={(checked) => setForm((prev) => ({ ...prev, quickApply: checked === true }))}
        />
        <div>
          <Label htmlFor="quick-apply" className="text-sm font-bold text-neutral-950">
            빠른 지원 활성화
          </Label>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            활성화하면 구직자가 프로필 이력서로 바로 지원할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="h-12 rounded-md bg-blue-600 px-8 font-black text-white hover:bg-blue-700" disabled={submitting}>
          {submitting ? "등록 중..." : "공고 등록"}
        </Button>
      </div>
    </form>
  );
}
