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
  id: "fallback-sushiyuzen",
  slug: "sushiyuzen",
  name: "SUSHI YUZEN",
  profile_title: "SUSHI YUZEN 직원 모집",
  subtitle: "SUSHI YUZEN · MARAE · DOMO · Hello Chicken — 시드니·멜버른 일식 다이닝 그룹",
  logo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviGMYOpZPvAIearZo8cgzB1YLQQsIQD9cQKh9FWE1sw&s",
  photo_url:
    "https://static.wixstatic.com/media/827304_91349400cf644c308799f9161b922e29~mv2.jpg/v1/fill/w_1200,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/sushiyuzen_parramatta_shop_JPG.jpg",
  badges: ["구인", "NSW · VIC", "다지점", "상시모집", "Tax Job"],
  about_paragraphs: [
    "SUSHI YUZEN은 시드니 CBD와 파라마타에 스시 전문 매장을 운영하며, MARAE Izakaya(Chadstone), DOMO1·DOMO2 Izakaya(멜버른 CBD), Hello Chicken(Southbank) 등 다양한 브랜드를 함께 운영하는 일식 다이닝 그룹입니다.",
    "롤메이커, 핫푸드 쿡, 바텐더, 홀 슈퍼바이저 등 매장별로 다양한 포지션을 상시 모집하며, 전 매장 Tax Job(정식 세금신고) 포지션으로 채용합니다.",
  ],
  phone: null,
  phone_href: null,
  email: "hr@sushiyuzen.com.au",
  instagram_url: "https://www.instagram.com/sushi_yuzen/",
  instagram_handle: "@sushi_yuzen",
  address: "Parramatta Square, Parramatta NSW 2150",
  map_query: "Parramatta Square, Parramatta NSW 2150",
  condition_rows: [
    ["급여", "$31.19 ~ $35.15 + Super", "포지션 및 매장에 따라 협의"],
    ["근무지역", "시드니 CBD · 파라마타 · 멜버른 CBD · 채드스톤 · 사우스뱅크", "SUSHI YUZEN · MARAE · DOMO1/2 · Hello Chicken 매장"],
    ["근무요일", "주 5일(평일) 또는 주말 포함 캐주얼", "브랜드 및 포지션에 따라 다름"],
    ["근무시간", "매장별 상이 (예: 08:00~14:30)", "Tax Job only"],
    ["모집분야", "롤메이커, 핫푸드 쿡, 바텐더, 홀 슈퍼바이저", "브랜드별 별도 채용 진행"],
    ["복리후생", "법정 연금(Super), 정식 세금신고(Tax Job)", "Hospitality Industry Award 기준"],
  ] as Json,
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "매장별 1명 (다수 포지션 동시 진행)"],
    ["우대사항", "스시롤메이킹/일식 주방 경력자, 비자 1년 이상 남은 분, RSA 소지자(홀 포지션 우대)"],
    ["지원방법", "지원 매장·포지션, 이력서, 비자상태를 이메일로 접수"],
  ] as Json,
  skill_tags: ["스시롤메이킹", "일식 조리", "바텐딩", "홀 서비스", "POS 운영", "재고관리"],
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

export default function CompanySushiYuzen() {
  const { slug = "sushiyuzen" } = useParams();
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
    keywords: `${profile.name} 채용, 일식당 구인, 스시 롤메이커 구인, 시드니 한인 구인, Korean jobs Australia`,
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
                    className={index === 1 ? "rounded-full bg-amber-50 px-4 py-1.5 text-sm font-black text-amber-700" : "rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black text-slate-700"}
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
              <img src={profile.logo_url} alt={profile.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            </div>
          </div>
        </section>

        <nav className="mt-14 grid grid-cols-3 border border-slate-200 text-center text-lg font-black text-slate-400">
          <a href="#conditions" className="border-r border-slate-200 px-4 py-5 text-amber-700">근무조건</a>
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
                <a href={profile.phone_href ? `tel:${profile.phone_href}` : undefined} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-amber-50 hover:text-amber-700">
                  <span>
                    <span className="block text-slate-400">전화번호</span>
                    {profile.phone}
                  </span>
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-amber-50 hover:text-amber-700">
                  <span>
                    <span className="block text-slate-400">지원 이메일</span>
                    {profile.email}
                  </span>
                </a>
              )}
              {profile.instagram_url && (
                <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-amber-50 hover:text-amber-700">
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
                <p className="mb-4 text-base font-black text-amber-700">이런 스킬이 있으면 좋아요!</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skill_tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-amber-50 px-4 py-2 text-sm font-black text-amber-700">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-5 text-3xl font-black tracking-[-0.04em]">근무지역</h2>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-lg font-black text-slate-900">
            <MapPin className="h-5 w-5 text-amber-700" />
            {profile.address}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-black text-amber-700"
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
            <p className="p-5 text-sm font-semibold text-slate-500">지도는 대표 매장(파라마타점) 위치를 나타내며, 시드니 CBD·멜버른 CBD·채드스톤·사우스뱅크 등 다른 브랜드 매장은 각 쇼핑센터 안내를 확인해 주세요.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
