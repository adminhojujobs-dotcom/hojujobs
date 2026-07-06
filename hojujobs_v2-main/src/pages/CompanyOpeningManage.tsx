import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Users, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import {
  openingPublicPath,
  MANAGED_COMPANY_OPENING_SELECT,
  type ManagedCompanyOpening,
} from "@/lib/companyJobOpenings";
import {
  formatApplicationDate,
  type CompanyJobApplication,
  type CvSnapshot,
} from "@/lib/jobApplications";
import { branchOptionLabel, type CompanyBranchOption } from "@/lib/userProfile";
import { Button } from "@/components/ui/button";

function CvSnapshotView({ cv }: { cv: CvSnapshot }) {
  const rows: { label: string; value: string | null | undefined }[] = [
    { label: "이름", value: cv.full_name },
    { label: "연락처", value: cv.contact_number },
    { label: "이메일", value: cv.email },
    { label: "비자", value: cv.visa_type },
    { label: "자기소개", value: cv.introduction },
    { label: "학력", value: cv.education },
    { label: "경력", value: cv.work_history },
    { label: "기타", value: cv.other_info },
  ];

  return (
    <dl className="space-y-3">
      {rows.map(({ label, value }) =>
        value ? (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{value}</dd>
          </div>
        ) : null,
      )}
    </dl>
  );
}

export default function CompanyOpeningManage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { user, loading, isBusiness } = useAuth();
  const [opening, setOpening] = useState<ManagedCompanyOpening | null>(null);
  const [branch, setBranch] = useState<CompanyBranchOption | null>(null);
  const [applications, setApplications] = useState<CompanyJobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth?next=/my-jobs/" + id, { replace: true });
      return;
    }
    if (!loading && user && !isBusiness) {
      navigate("/profile", { replace: true });
    }
  }, [loading, user, isBusiness, navigate, id]);

  useEffect(() => {
    if (!user || !isBusiness) return;

    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);

      const { data: openingData, error } = await supabase
        .from("company_job_openings")
        .select(MANAGED_COMPANY_OPENING_SELECT)
        .eq("id", id)
        .eq("posted_by_user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !openingData) {
        setOpening(null);
        setIsLoading(false);
        return;
      }

      const listing = openingData as ManagedCompanyOpening;
      setOpening(listing);

      if (listing.branch_id) {
        const { data: branchRow } = await supabase
          .from("company_branches")
          .select("id, company_slug, branch_name, branch_label, address")
          .eq("id", listing.branch_id)
          .maybeSingle();

        if (branchRow && !cancelled) {
          const { data: profile } = await supabase
            .from("company_profiles")
            .select("name")
            .eq("slug", branchRow.company_slug)
            .maybeSingle();

          setBranch({
            id: branchRow.id,
            company_slug: branchRow.company_slug,
            branch_name: branchRow.branch_name,
            branch_label: branchRow.branch_label,
            address: branchRow.address,
            company_name: profile?.name ?? branchRow.company_slug,
          });
        }
      }

      const { data: applicationRows } = await supabase
        .from("company_job_applications")
        .select("id, opening_id, applicant_user_id, cv_snapshot, created_at")
        .eq("opening_id", id)
        .order("created_at", { ascending: false });

      if (!cancelled) {
        setApplications((applicationRows ?? []) as CompanyJobApplication[]);
        setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [user, isBusiness, id]);

  useSEO({
    title: opening ? `${opening.title} · 지원자 | Hoju Jobs` : "공고 관리 | Hoju Jobs",
    description: "채용 공고 지원자 관리",
    noindex: true,
  });

  if (loading || isLoading || !user) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-[#f7f8fb] px-4 py-16 text-sm text-muted-foreground">
        불러오는 중...
      </div>
    );
  }

  if (!opening) {
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
        <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
          <p className="text-base font-bold text-slate-500">공고를 찾을 수 없습니다.</p>
          <Link to="/profile" className="mt-4 inline-block text-sm font-black text-blue-700 hover:underline">
            프로필로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <Link to="/profile" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          프로필로 돌아가기
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-center gap-2">
            {opening.quick_apply && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                <Zap className="h-3 w-3" />
                빠른 지원
              </span>
            )}
            <Link
              to={openingPublicPath(opening.company_slug, opening.id)}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              공개 페이지 보기
            </Link>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-[-0.04em] text-neutral-950">{opening.title}</h1>
          {branch && <p className="mt-2 text-sm text-slate-500">{branchOptionLabel(branch)}</p>}
          {opening.pay && <p className="mt-2 text-sm font-semibold text-blue-700">{opening.pay}</p>}
          {opening.detail_intro && <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600">{opening.detail_intro}</p>}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-500" />
            <h2 className="text-lg font-black text-neutral-950">
              지원자 ({applications.length})
            </h2>
          </div>

          {!opening.quick_apply ? (
            <p className="rounded-xl border border-dashed bg-slate-50 py-10 text-center text-sm text-muted-foreground">
              이 공고는 빠른 지원이 활성화되어 있지 않습니다.
            </p>
          ) : applications.length === 0 ? (
            <p className="rounded-xl border border-dashed bg-slate-50 py-10 text-center text-sm text-muted-foreground">
              아직 지원자가 없습니다.
            </p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="rounded-xl border border-slate-100 px-4 py-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-neutral-950">{application.cv_snapshot.full_name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatApplicationDate(application.created_at)} 지원
                      </p>
                    </div>
                    {application.cv_snapshot.email && (
                      <Button asChild variant="outline" size="sm">
                        <a href={`mailto:${application.cv_snapshot.email}`}>이메일 보내기</a>
                      </Button>
                    )}
                  </div>
                  <CvSnapshotView cv={application.cv_snapshot} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
