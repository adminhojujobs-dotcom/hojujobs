import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin, Zap } from "lucide-react";
import { QuickApplyDialog } from "@/components/QuickApplyDialog";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import type { Database, Json } from "@/integrations/supabase/types";

type CompanyProfileRow = Database["public"]["Tables"]["company_profiles"]["Row"];
type CompanyBranchRow = Database["public"]["Tables"]["company_branches"]["Row"];
type CompanyJobOpeningRow = Database["public"]["Tables"]["company_job_openings"]["Row"];
type DetailRow = [string, string, string?];

function detailRowsFromJson(value: Json): DetailRow[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((row) => {
    if (!Array.isArray(row)) return [];
    const [label, content, note] = row;
    if (typeof label !== "string" || typeof content !== "string") return [];
    return [[label, content, typeof note === "string" ? note : undefined] satisfies DetailRow];
  });
}

export default function CompanyJobDetail() {
  const { slug = "", openingId = "" } = useParams();
  const { user } = useAuth();
  const [opening, setOpening] = useState<CompanyJobOpeningRow | null>(null);
  const [profile, setProfile] = useState<CompanyProfileRow | null>(null);
  const [branch, setBranch] = useState<CompanyBranchRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchOpening() {
      setIsLoading(true);

      const { data: openingData, error: openingError } = await supabase
        .from("company_job_openings")
        .select("*")
        .eq("id", openingId)
        .eq("company_slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (cancelled) return;

      if (openingError || !openingData) {
        setOpening(null);
        setIsLoading(false);
        return;
      }

      setOpening(openingData);

      const { data: profileData } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (cancelled) return;
      if (profileData) setProfile(profileData);

      if (openingData.branch_id) {
        const { data: branchData } = await supabase
          .from("company_branches")
          .select("*")
          .eq("id", openingData.branch_id)
          .maybeSingle();

        if (cancelled) return;
        if (branchData) setBranch(branchData);
      }

      setIsLoading(false);
    }

    fetchOpening();

    return () => {
      cancelled = true;
    };
  }, [slug, openingId]);

  useEffect(() => {
    if (!user || !opening?.quick_apply) {
      setHasApplied(false);
      return;
    }

    supabase
      .from("company_job_applications")
      .select("id")
      .eq("opening_id", opening.id)
      .eq("applicant_user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setHasApplied(Boolean(data)));
  }, [user, opening]);

  const conditionRows = useMemo(
    () => {
      const rows = detailRowsFromJson(opening?.condition_rows ?? []);
      if (!branch?.address) return rows;

      return rows.map(([label, value, note]) =>
        label === "근무지역"
          ? [label, branch.address, note ?? branch.branch_label ?? branch.branch_name] satisfies DetailRow
          : [label, value, note] satisfies DetailRow
      );
    },
    [branch, opening],
  );
  const recruitmentRows = useMemo(
    () => detailRowsFromJson(opening?.recruitment_rows ?? []),
    [opening],
  );

  const address = branch?.address ?? profile?.address ?? "";
  const mapQuery = encodeURIComponent(branch?.map_query || branch?.address || profile?.map_query || profile?.address || "");
  const contactPhone = branch?.phone ?? profile?.phone ?? null;
  const contactPhoneHref = branch?.phone_href ?? profile?.phone_href ?? null;
  const contactEmail = opening?.apply_email ?? null;
  const skillTags =
    opening && opening.skill_tags.length > 0
      ? opening.skill_tags
      : profile?.skill_tags ?? [];

  useSEO({
    title: opening ? `${opening.title} | 호주잡스` : "채용정보 | 호주잡스",
    description: opening ? `${opening.company} · ${opening.suburb} · ${opening.pay}` : "호주 한인 커뮤니티 구인구직 게시판",
    canonical: opening ? `https://hojujobs.com/company/${slug}/opening/${opening.id}` : undefined,
    htmlLang: "ko",
    ogLocale: "ko_KR",
  });

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
        <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12 lg:px-9">
          <div className="mb-6 h-5 w-24 rounded bg-slate-100" />
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
            <div className="h-9 w-3/4 rounded bg-slate-100" />
            <div className="mt-4 h-5 w-1/3 rounded bg-slate-100" />
          </div>
        </main>
      </div>
    );
  }

  if (!opening) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
        <main className="mx-auto w-full max-w-[1220px] px-5 py-16 text-center lg:px-9">
          <p className="text-base font-bold text-slate-500">해당 공고를 찾을 수 없습니다.</p>
          <Link to={`/company/${slug}`} className="mt-4 inline-block text-sm font-black text-blue-700 hover:underline">
            기업 채용정보로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12 lg:px-9">
        <Link to={`/company/${slug}`} className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition-colors hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" />
          {profile?.name ?? opening.company} 채용정보
        </Link>

        <section className="border-y border-neutral-950 py-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">{opening.posted_at}</span>
                {opening.quick_apply && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                    <Zap className="h-3 w-3" />
                    빠른 지원
                  </span>
                )}
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-[-0.045em] text-neutral-950 sm:text-4xl">
                {opening.title}
              </h1>
              <p className="mt-3 text-base font-bold text-slate-500">{opening.company}</p>
            </div>
            {profile?.logo_url && (
              <img src={profile.logo_url} alt={profile.name} className="h-16 w-auto shrink-0 object-contain" />
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
            <span className="text-xl font-black text-neutral-950">{opening.pay}</span>
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">{opening.pay_type}</span>
            <span className="ml-2 text-sm font-bold text-slate-300">·</span>
            <span className="text-sm font-bold text-slate-600">{opening.hours}</span>
            <span className="text-sm font-bold text-slate-300">·</span>
            <span className="text-sm font-bold text-slate-600">{opening.area} {opening.suburb}</span>
          </div>

          {(opening.quick_apply || contactPhone || contactEmail) && (
            <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
              {opening.quick_apply && (
                hasApplied ? (
                  <Button disabled className="rounded-md px-5">
                    지원 완료
                  </Button>
                ) : (
                  <Button className="rounded-md bg-blue-600 px-5 hover:bg-blue-700" onClick={() => setApplyOpen(true)}>
                    지원하기
                  </Button>
                )
              )}
              {contactPhone && (
                <a
                  href={contactPhoneHref ? `tel:${contactPhoneHref}` : undefined}
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-blue-700"
                >
                  전화 지원 {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-black text-neutral-900 transition-colors hover:bg-slate-50"
                >
                  이메일 지원
                </a>
              )}
            </div>
          )}
        </section>

        {conditionRows.length > 0 && (
          <section className="border-b border-slate-200 py-8">
            <h2 className="mb-5 text-xl font-black tracking-[-0.035em] text-neutral-950">근무조건</h2>
            <dl className="divide-y divide-slate-100">
              {conditionRows.map(([label, value, note]) => (
                <div key={label} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <dt className="text-sm font-bold text-slate-500">{label}</dt>
                  <dd>
                    <p className="text-sm font-bold text-neutral-950 sm:text-base">{value}</p>
                    {note && <p className="mt-1.5 text-xs font-semibold text-slate-400">{note}</p>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {recruitmentRows.length > 0 && (
          <section className="border-b border-slate-200 py-8">
            <h2 className="mb-5 text-xl font-black tracking-[-0.035em] text-neutral-950">모집조건</h2>
            <dl className="divide-y divide-slate-100">
              {recruitmentRows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <dt className="text-sm font-bold text-slate-500">{label}</dt>
                  <dd className="text-sm font-bold leading-6 text-neutral-950 sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {skillTags.length > 0 && (
          <section className="border-b border-slate-200 py-8">
            <p className="mb-4 text-sm font-black text-blue-700">이런 스킬이 있으면 좋아요!</p>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <span key={tag} className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {address && (
          <section className="border-b border-slate-200 py-8">
            <h2 className="mb-4 text-xl font-black tracking-[-0.035em] text-neutral-950">근무지역</h2>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-base font-black text-slate-900">
              <MapPin className="h-4 w-4 text-blue-700" />
              {address}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-black text-blue-700"
              >
                지도 크게 보기
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <iframe
                title={`${opening.company} map`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        )}
      </main>

      {opening.quick_apply && (
        <QuickApplyDialog
          companySlug={slug}
          openingId={opening.id}
          openingTitle={opening.title}
          open={applyOpen}
          onOpenChange={setApplyOpen}
          onApplied={() => setHasApplied(true)}
        />
      )}
    </div>
  );
}
