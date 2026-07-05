import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { ModernHeader } from "@/components/ModernHeader";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
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
  const [opening, setOpening] = useState<CompanyJobOpeningRow | null>(null);
  const [profile, setProfile] = useState<CompanyProfileRow | null>(null);
  const [branch, setBranch] = useState<CompanyBranchRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <ModernHeader />
        <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-12">
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
        <ModernHeader />
        <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center">
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
      <ModernHeader />
      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-12">
        <Link to={`/company/${slug}`} className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          {profile?.name ?? opening.company} 채용정보
        </Link>

        <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{opening.posted_at}</span>
              <h1 className="mt-4 max-w-xl text-2xl font-black leading-tight tracking-[-0.04em] text-neutral-950 sm:text-3xl">
                {opening.title}
              </h1>
              <p className="mt-3 text-base font-bold text-slate-500">{opening.company}</p>
            </div>
            {profile?.logo_url && (
              <img src={profile.logo_url} alt={profile.name} className="h-16 w-auto shrink-0 object-contain" />
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
            <span className="text-lg font-black text-neutral-950">{opening.pay}</span>
            <span className="rounded-full border border-blue-600 px-2.5 py-1 text-xs font-black text-blue-700">{opening.pay_type}</span>
            <span className="ml-2 text-sm font-bold text-slate-400">·</span>
            <span className="text-sm font-bold text-slate-600">{opening.hours}</span>
            <span className="text-sm font-bold text-slate-400">·</span>
            <span className="text-sm font-bold text-slate-600">{opening.area} {opening.suburb}</span>
          </div>

          {(contactPhone || contactEmail) && (
            <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              {contactPhone && (
                <a
                  href={contactPhoneHref ? `tel:${contactPhoneHref}` : undefined}
                  className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-blue-700"
                >
                  전화 지원 {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-black text-neutral-900 transition-colors hover:bg-slate-50"
                >
                  이메일 지원
                </a>
              )}
            </div>
          )}
        </section>

        {conditionRows.length > 0 && (
          <section className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="mb-5 text-xl font-bold text-neutral-900">근무조건</h2>
            <div className="space-y-4">
              {conditionRows.map(([label, value, note]) => (
                <div key={label} className="grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-2">
                  <dt className="text-sm font-normal text-slate-500">{label}</dt>
                  <dd>
                    <p className="text-sm font-medium text-neutral-900">{value}</p>
                    {note && <p className="mt-2 text-xs font-normal text-slate-400">{note}</p>}
                  </dd>
                </div>
              ))}
            </div>
          </section>
        )}

        {recruitmentRows.length > 0 && (
          <section className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="mb-5 text-xl font-bold text-neutral-900">모집조건</h2>
            <div className="space-y-4">
              {recruitmentRows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-2">
                  <dt className="text-sm font-normal text-slate-500">{label}</dt>
                  <dd className="text-sm font-medium leading-5 text-neutral-900">{value}</dd>
                </div>
              ))}
            </div>
          </section>
        )}

        {skillTags.length > 0 && (
          <section className="mt-8 border-t border-slate-200 pt-6">
            <p className="mb-3 text-sm font-bold text-blue-700">이런 스킬이 있으면 좋아요!</p>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <span key={tag} className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {address && (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-black tracking-[-0.04em]">근무지역</h2>
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
    </div>
  );
}
