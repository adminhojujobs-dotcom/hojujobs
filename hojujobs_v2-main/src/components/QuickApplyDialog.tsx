import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { openingPublicPath } from "@/lib/companyJobOpenings";
import { cvSnapshotFromProfile } from "@/lib/jobApplications";
import { isCvComplete } from "@/lib/userProfile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface QuickApplyDialogProps {
  companySlug: string;
  openingId: string;
  openingTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplied?: () => void;
}

export function QuickApplyDialog({
  companySlug,
  openingId,
  openingTitle,
  open,
  onOpenChange,
  onApplied,
}: QuickApplyDialogProps) {
  const navigate = useNavigate();
  const { user, profile, loading, profileLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(false);

  const cvComplete = isCvComplete(profile);
  const openingPath = openingPublicPath(companySlug, openingId);

  useEffect(() => {
    if (!open || !user) {
      setAlreadyApplied(false);
      return;
    }

    let cancelled = false;
    setCheckingApplication(true);

    supabase
      .from("company_job_applications")
      .select("id")
      .eq("opening_id", openingId)
      .eq("applicant_user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setAlreadyApplied(Boolean(data));
          setCheckingApplication(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, user, openingId]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen && !user) {
      navigate(`/auth?next=${encodeURIComponent(openingPath)}`);
      return;
    }
    onOpenChange(nextOpen);
  };

  const handleApply = async () => {
    if (!user || !profile || !cvComplete) return;

    setSubmitting(true);
    const snapshot = cvSnapshotFromProfile(profile);
    const { error } = await supabase.from("company_job_applications").insert({
      opening_id: openingId,
      applicant_user_id: user.id,
      cv_snapshot: snapshot,
    });

    if (error) {
      if (error.code === "23505") {
        setAlreadyApplied(true);
        toast.message("이미 지원한 공고입니다.");
      } else {
        toast.error("지원에 실패했습니다. 다시 시도해주세요.");
      }
      setSubmitting(false);
      return;
    }

    toast.success("지원이 완료되었습니다.");
    setAlreadyApplied(true);
    onApplied?.();
    onOpenChange(false);
    setSubmitting(false);
  };

  const isLoading = loading || profileLoading || checkingApplication;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>빠른 지원</DialogTitle>
          <DialogDescription>
            {openingTitle}에 프로필 이력서를 첨부해 지원합니다.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="py-6 text-center text-sm text-muted-foreground">불러오는 중...</p>
        ) : alreadyApplied ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-5 text-center">
            <p className="text-sm font-semibold text-blue-800">이미 지원한 공고입니다.</p>
            <p className="mt-1 text-sm text-blue-600">채용 담당자가 이력서를 확인할 수 있습니다.</p>
          </div>
        ) : !cvComplete ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
              <p className="text-sm font-semibold text-amber-900">이력서가 필요합니다</p>
              <p className="mt-1 text-sm text-amber-800">
                지원하려면 프로필에 이력서 정보를 먼저 작성해주세요.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link to={`/profile?next=${encodeURIComponent(openingPath)}`}>이력서 작성하기</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="h-4 w-4" />
                첨부될 이력서
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">이름</dt>
                  <dd className="font-medium text-neutral-900">{profile?.full_name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">연락처</dt>
                  <dd className="font-medium text-neutral-900">{profile?.contact_number}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">이메일</dt>
                  <dd className="font-medium text-neutral-900">{profile?.email}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">비자</dt>
                  <dd className="text-right font-medium text-neutral-900">{profile?.visa_type}</dd>
                </div>
              </dl>
            </div>
            <p className="text-xs text-slate-500">
              지원 시 위 이력서 정보가 채용 담당자에게 전달됩니다.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
          {!isLoading && !alreadyApplied && cvComplete && (
            <Button type="button" onClick={() => void handleApply()} disabled={submitting}>
              {submitting ? "지원 중..." : "이력서 첨부 후 지원"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
