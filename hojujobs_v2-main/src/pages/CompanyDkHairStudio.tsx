import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { ModernHeader } from "@/components/ModernHeader";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";

type CompanyProfileRow = Database["public"]["Tables"]["company_profiles"]["Row"];
type DetailRow = [string, string, string?];

const logoUrl = "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/dk-hairstudio.jpg";

const fallbackProfile: CompanyProfileRow = {
  id: "fallback-dkhairstudio",
  slug: "dkhairstudio",
  name: "DK Hair Studio",
  profile_title: "DK Hair Studio 직원 모집",
  subtitle: "Sydney's Premium Korean Hair Studio — 버우드 · 헤이마켓 · 채스우드 · 로즈 · 브로드웨이",
  logo_url: logoUrl,
  photo_url: logoUrl,
  badges: ["구인", "NSW", "여러 지점", "상시모집", "파트타임 / 풀타임"],
  about_paragraphs: [
    "DK Hair Studio는 시드니 전역에서 운영되는 프리미엄 코리안 헤어 스튜디오로, 버우드, 헤이마켓, 채스우드, 로즈, 브로드웨이 등 주요 한인 생활권과 도심 지역에 지점을 두고 있습니다.",
    "고객별 상담을 바탕으로 컷, 컬러, 펌, 스타일링 서비스를 제공하며, 따뜻한 부티크 살롱 분위기와 전문적인 디자이너 서비스를 중요하게 생각합니다. 헤어 업계 경력자와 성장 의지가 있는 주니어 스태프 모두 환영합니다.",
  ],
  phone: "0491 709 913",
  phone_href: "+61491709913",
  email: "dkhairstudio.dk@gmail.com",
  instagram_url: "https://www.instagram.com/dk_hairstudio/?hl=en",
  instagram_handle: "@dk_hairstudio",
  address: "Shop 4/160 Broadway, Chippendale NSW 2008",
  map_query: "Shop 4/160 Broadway, Chippendale NSW 2008",
  condition_rows: [
    ["급여", "면접 시 협의", "포지션, 경력, 근무 가능 요일에 따라 협의"],
    ["근무지역", "버우드 · 헤이마켓 · 채스우드 · 로즈 · 브로드웨이", "지점별 별도 채용"],
    ["근무요일", "풀타임 / 파트타임", "주말 근무 가능자 우대"],
    ["근무시간", "살롱 운영 시간 내 협의", "지점 및 예약 상황에 따라 조율"],
    ["모집분야", "헤어 디자이너, 주니어/어시스턴트, 리셉션", "경력자 우대, 트레이닝 가능"],
    ["복리후생", "법정 연금, 유급 휴가, 기술 트레이닝, 팀 근무 환경", "Hair and Beauty Industry Award 기준"],
  ] as Json,
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "헤어 살롱 경력, 컬러/펌/컷 경험, 기본 영어 소통, 장기 근무 가능"],
    ["지원방법", "인스타그램 DM 또는 이메일로 이름, 연락처, 경력, 희망 지점, 가능 요일을 전달"],
  ] as Json,
  skill_tags: ["헤어컷", "컬러", "펌", "샴푸", "고객상담", "리셉션"],
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

export default function CompanyDkHairStudio() {
  const { slug = "dkhairstudio" } = useParams();
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
    description: `${profile.name} 회사 프로필과 채용정보. 주소, 연락처, 인스타그램, 매장 소개와 근무조건을 확인하세요.`,
    canonical: `https://hojujobs.com/company/${profile.slug}`,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    keywords: `${profile.name} 채용, DK Hair Studio 구인, 시드니 미용실 구인, Korean hair salon Sydney`,
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
                    className={index === 1 ? "rounded-full bg-blue-50 px-4 py-1.5 text-sm font-black text-blue-700" : "rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black text-slate-700"}
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
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <img src={profile.logo_url} alt={profile.name} className="aspect-square w-full object-cover" />
            </div>
          </div>
        </section>

        <nav className="mt-14 grid grid-cols-3 border border-slate-200 text-center text-lg font-black text-slate-400">
          <a href="#conditions" className="border-r border-slate-200 px-4 py-5 text-blue-700">근무조건</a>
          <a href="#details" className="border-r border-slate-200 px-4 py-5 hover:text-slate-950">상세요강</a>
          <a href="#company" className="px-4 py-5 hover:text-slate-950">기업정보</a>
        </nav>

        <section id="company" className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h2 className="mb-6 text-3xl font-black tracking-[-0.04em]">회사 소개</h2>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              {profile.photo_url && (
                <img src={profile.photo_url} alt={`${profile.name} salon`} className="h-72 w-full object-cover sm:h-96" />
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
                <a href={profile.phone_href ? `tel:${profile.phone_href}` : undefined} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-blue-50 hover:text-blue-700">
                  <span className="block text-slate-400">전화번호</span>
                  {profile.phone}
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-blue-50 hover:text-blue-700">
                  <span className="block text-slate-400">지원 이메일</span>
                  {profile.email}
                </a>
              )}
              {profile.instagram_url && (
                <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-blue-50 hover:text-blue-700">
                  <span className="block text-slate-400">Instagram</span>
                  {profile.instagram_handle ?? profile.instagram_url}
                </a>
              )}
              <div className="block rounded-md bg-slate-50 p-4">
                <span className="block text-slate-400">대표 주소</span>
                {profile.address}
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
                <p className="mb-4 text-base font-black text-blue-700">이런 스킬이 있으면 좋아요!</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skill_tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-5 text-3xl font-black tracking-[-0.04em]">근무지역</h2>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-lg font-black text-slate-900">
            <MapPin className="h-5 w-5 text-blue-700" />
            {profile.address}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-black text-blue-700"
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
            <p className="p-5 text-sm font-semibold text-slate-500">지도는 대표 매장(브로드웨이점) 위치를 나타내며, 버우드·헤이마켓·채스우드·로즈 등 다른 지점은 예약 페이지와 인스타그램 안내를 확인해 주세요.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
