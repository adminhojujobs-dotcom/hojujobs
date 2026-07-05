import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { ModernHeader } from "@/components/ModernHeader";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";

type CompanyProfileRow = Database["public"]["Tables"]["company_profiles"]["Row"];
type DetailRow = [string, string, string?];

const fallbackProfile: CompanyProfileRow = {
  id: "fallback-chickenv",
  slug: "chickenv",
  name: "Chicken V",
  profile_title: "Chicken V 직원 모집",
  subtitle: "치킨 & 부산포차 — 이스트우드 · 시드니 시티 매장 홀/주방 직원 모집",
  logo_url: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/chickenv.png",
  photo_url: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/photos/chickenv.jpg",
  badges: ["구인", "NSW", "다지점", "상시모집", "파트타임 / 풀타임"],
  about_paragraphs: [
    "Chicken V는 치킨과 안주를 함께 즐길 수 있는 한국식 포차 콘셉트 매장으로, 이스트우드(Chicken V Eastwood & Busanjip)와 시드니 시티(Chicken V & Busan Pocha City, 345b Sussex St)에서 매장을 운영하고 있습니다.",
    "이스트우드역과 타운홀 도보 거리에 위치해 접근성이 좋으며, 매일 맛있는 석식(스텝밀)과 직원 할인을 제공합니다. 초보자도 환영하며 경력자는 우대합니다.",
  ],
  phone: null,
  phone_href: null,
  email: "iseoyun6816@gmail.com",
  instagram_url: "https://www.instagram.com/chickenvsydney/",
  instagram_handle: "@chickenvsydney",
  address: "345b Sussex St, Sydney NSW 2000",
  map_query: "345b Sussex St, Sydney NSW 2000",
  condition_rows: [
    ["급여", "면접 시 협의", "경력에 따라 웨이지 우대, 나이트 타임 추가 수당"],
    ["근무지역", "이스트우드 · 시드니 시티(Sussex St)", "매장별 별도 채용"],
    ["근무요일", "풀타임(주 4~5일) / 파트타임(주말 포함)", "지점 및 포지션에 따라 다름"],
    ["근무시간", "11:00 ~ 24:00 (시티점은 익일 새벽까지)", "지점별 Trading Hours 상이"],
    ["모집분야", "홀 스태프, 주방 스태프", "초보 환영, 경력자 우대"],
    ["복리후생", "매일 석식(스텝밀) 제공, 직원 할인, 나이트 웨이지", "Hospitality Industry Award 기준"],
  ] as Json,
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~2명"],
    ["우대사항", "경력자 우대, 워킹홀리데이/학생비자 가능"],
    ["지원방법", "이름·나이·비자상태·거주지를 문자로 전달"],
  ] as Json,
  skill_tags: ["홀 서빙", "주방 조리", "포차 안주 조리", "고객응대", "매장정리", "재고관리"],
  is_active: true,
  created_at: "",
  updated_at: "",
};

function detailRowsFromJson(value: Json): DetailRow[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((row) => {
    if (!Array.isArray(row)) return [];
    const [label, content, note] = row;
    if (typeof label !== "string" || typeof content !== "string") return [];
    return [[label, content, typeof note === "string" ? note : undefined] satisfies DetailRow];
  });
}

export default function CompanyChickenV() {
  const { slug = "chickenv" } = useParams();
  const [profile, setProfile] = useState<CompanyProfileRow>(fallbackProfile);

  useEffect(() => {
    let cancelled = false;

    async function fetchCompanyProfile() {
      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (cancelled || error || !data) return;
      setProfile(data);
    }

    fetchCompanyProfile();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const conditionRows = useMemo(() => detailRowsFromJson(profile.condition_rows), [profile.condition_rows]);
  const recruitmentRows = useMemo(() => detailRowsFromJson(profile.recruitment_rows), [profile.recruitment_rows]);
  const mapQuery = encodeURIComponent(profile.map_query || profile.address);

  useSEO({
    title: `${profile.profile_title} | 호주잡스`,
    description: `${profile.name} 회사 프로필과 채용정보. 주소, 연락처, 매장 소개와 근무조건을 확인하세요.`,
    canonical: `https://hojujobs.com/company/${profile.slug}`,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    keywords: `${profile.name} 채용, 치킨 포차 구인, 시드니 한인 구인, Korean jobs Australia`,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
      <ModernHeader />
      <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {profile.badges.map((badge, index) => (
                  <span
                    key={`${badge}-${index}`}
                    className={index === 1 ? "rounded-full bg-orange-50 px-4 py-1.5 text-sm font-black text-orange-700" : "rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black text-slate-700"}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-neutral-950 sm:text-5xl">
                {profile.profile_title}
              </h1>
              <p className="mt-5 text-lg font-semibold text-slate-600">{profile.subtitle}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <img src={profile.logo_url} alt={profile.name} className="mx-auto h-24 w-auto object-contain" />
            </div>
          </div>
        </section>

        <nav className="mt-14 grid grid-cols-3 border border-slate-200 text-center text-lg font-black text-slate-400">
          <a href="#conditions" className="border-r border-slate-200 px-4 py-5 text-orange-700">근무조건</a>
          <a href="#details" className="border-r border-slate-200 px-4 py-5 hover:text-slate-950">상세요강</a>
          <a href="#company" className="px-4 py-5 hover:text-slate-950">기업정보</a>
        </nav>

        <section id="company" className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h2 className="mb-6 text-3xl font-black tracking-[-0.04em]">회사 소개</h2>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              {profile.photo_url && (
                <img src={profile.photo_url} alt={`${profile.name} store`} className="h-72 w-full object-cover sm:h-96" />
              )}
              <div className="space-y-4 p-6 text-base font-medium leading-8 text-slate-700">
                {profile.about_paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em]">연락처</h2>
            <div className="space-y-4 text-sm font-semibold text-slate-700">
              {profile.phone && (
                <a href={profile.phone_href ? `tel:${profile.phone_href}` : undefined} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-orange-50 hover:text-orange-700">
                  <span>
                    <span className="block text-slate-400">전화번호</span>
                    {profile.phone}
                  </span>
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-orange-50 hover:text-orange-700">
                  <span>
                    <span className="block text-slate-400">지원 이메일</span>
                    {profile.email}
                  </span>
                </a>
              )}
              {profile.instagram_url && (
                <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-orange-50 hover:text-orange-700">
                  <span>
                    <span className="block text-slate-400">Instagram</span>
                    {profile.instagram_handle ?? profile.instagram_url}
                  </span>
                </a>
              )}
              <div className="block rounded-md bg-slate-50 p-4">
                <span>
                  <span className="block text-slate-400">주소</span>
                  {profile.address}
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section id="conditions" className="mt-16">
          <h2 className="mb-6 text-3xl font-black tracking-[-0.04em]">근무조건</h2>
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
            <div className="grid gap-x-12 gap-y-7 lg:grid-cols-2">
              {conditionRows.map(([label, value, note]) => (
                <div key={label} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <dt className="text-base font-black text-slate-400">{label}</dt>
                  <dd>
                    <p className="text-lg font-black text-slate-950">{value}</p>
                    {note && <p className="mt-1 text-sm font-semibold text-slate-500">{note}</p>}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="details" className="mt-16">
          <h2 className="mb-6 text-3xl font-black tracking-[-0.04em]">모집조건</h2>
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
            <div className="grid gap-x-12 gap-y-7 lg:grid-cols-2">
              {recruitmentRows.map(([label, value]) => (
                <div key={label} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <dt className="text-base font-black text-slate-400">{label}</dt>
                  <dd className="text-lg font-black leading-8 text-slate-950">{value}</dd>
                </div>
              ))}
            </div>
            {profile.skill_tags.length > 0 && (
              <div className="mt-8 border-t border-slate-200 pt-7">
                <p className="mb-4 text-base font-black text-orange-700">이런 스킬이 있으면 좋아요!</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skill_tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-orange-50 px-4 py-2 text-sm font-black text-orange-700">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-5 text-3xl font-black tracking-[-0.04em]">근무지역</h2>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-lg font-black text-slate-900">
            <MapPin className="h-5 w-5 text-orange-700" />
            {profile.address}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-black text-orange-700"
            >
              지도 크게 보기
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <iframe
              title={`${profile.name} map`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="p-5 text-sm font-semibold text-slate-500">지도는 대표 매장(시티점) 위치를 나타내며, 이스트우드점은 이스트우드 역 인근 매장 안내를 확인해 주세요.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
