import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CompanyProfileRow = Database["public"]["Tables"]["company_profiles"]["Row"];
type CompanyJobOpeningRow = Database["public"]["Tables"]["company_job_openings"]["Row"];
type JobOpening = {
  id: string;
  area: string;
  suburb: string;
  title: string;
  company: string;
  pay: string;
  payType: string;
  hours: string;
  postedAt: string;
};

function toJobOpening(row: CompanyJobOpeningRow): JobOpening {
  return {
    id: row.id,
    area: row.area,
    suburb: row.suburb,
    title: row.title,
    company: row.company,
    pay: row.pay,
    payType: row.pay_type,
    hours: row.hours,
    postedAt: row.posted_at,
  };
}

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
  ],
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "매장별 1명 (다수 포지션 동시 진행)"],
    ["우대사항", "스시롤메이킹/일식 주방 경력자, 비자 1년 이상 남은 분, RSA 소지자(홀 포지션 우대)"],
    ["지원방법", "지원 매장·포지션, 이력서, 비자상태를 이메일로 접수"],
  ],
  skill_tags: ["스시롤메이킹", "일식 조리", "바텐딩", "홀 서비스", "POS 운영", "재고관리"],
  is_active: true,
  created_at: "",
  updated_at: "",
};

const fallbackJobOpenings: JobOpening[] = [
  { id: "fallback-sydney-cbd-rollmaker", area: "NSW", suburb: "Sydney CBD", title: "SUSHI YUZEN Sydney CBD 롤메이커 모집", company: "SUSHI YUZEN Sydney CBD", pay: "$33.19 + Super", payType: "시급", hours: "08:00 - 14:30", postedAt: "상시" },
];

export default function CompanySushiYuzen() {
  const { slug = "sushiyuzen" } = useParams();
  const [profile, setProfile] = useState<CompanyProfileRow>(fallbackProfile);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(fallbackJobOpenings);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCompanyData() {
      const { data, error } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      const { data: jobData, error: jobError } = await supabase
        .from("company_job_openings")
        .select("*")
        .eq("company_slug", slug)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      if (!error && data) {
        setProfile(data);
      }

      if (!jobError && jobData && jobData.length > 0) {
        setJobOpenings(jobData.map(toJobOpening));
      }

      setIsLoadingCompany(false);
    }

    fetchCompanyData();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useSEO({
    title: `${profile.profile_title} | 호주잡스`,
    description: `${profile.name} 회사 프로필과 채용정보. 주소, 연락처, 매장 소개와 근무조건을 확인하세요.`,
    canonical: `https://hojujobs.com/company/${profile.slug}`,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    keywords: `${profile.name} 채용, 일식당 구인, 스시 롤메이커 구인, 시드니 한인 구인, Korean jobs Australia`,
  });

  if (isLoadingCompany) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
        <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
          <div className="mb-6 h-5 w-24 rounded bg-slate-100" />
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="h-72 w-full bg-slate-100 sm:h-96" />
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 sm:h-20 sm:w-20" />
                <div>
                  <div className="h-8 w-64 rounded bg-slate-100" />
                  <div className="mt-3 h-5 w-48 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="mb-6 h-9 w-44 rounded bg-slate-100" />
            <div className="border-y border-t-neutral-950 border-b-slate-200 bg-white">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={`sushiyuzen-job-skeleton-${index}`} className="grid gap-4 border-b border-slate-200 px-5 py-7 lg:grid-cols-[10rem_minmax(0,1fr)_11rem_9rem]">
                  <div className="h-12 rounded bg-slate-100" />
                  <div className="h-14 rounded bg-slate-100" />
                  <div className="h-10 rounded bg-slate-100" />
                  <div className="h-10 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <section id="company" className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          {profile.photo_url && (
            <img src={profile.photo_url} alt={`${profile.name} store`} className="h-72 w-full object-cover sm:h-96" />
          )}
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:h-20 sm:w-20">
                <img src={profile.logo_url} alt={profile.name} className="h-full w-full object-contain" />
              </div>
              <div>
                <h1 className="max-w-4xl text-xl font-black leading-tight tracking-[-0.05em] text-neutral-950 sm:text-3xl">
                  {profile.profile_title}
                </h1>
                <p className="mt-2 text-base font-semibold text-slate-600">{profile.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="conditions" className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-black tracking-[-0.04em]">채용 공고</h2>
            <p className="text-sm font-bold text-slate-400">{jobOpenings.length}개 포지션</p>
          </div>

          <div className="overflow-hidden border-y border-t-neutral-950 border-b-slate-200 bg-white">
            <div className="hidden grid-cols-[10rem_minmax(0,1fr)_11rem_9rem] items-center border-b border-slate-200 px-5 py-5 text-center text-base font-black text-neutral-950 lg:grid">
              <div className="text-left">지역</div>
              <div>모집제목/기업명</div>
              <div>급여</div>
              <div>근무시간</div>
            </div>

            <div className="divide-y divide-slate-200">
              {jobOpenings.map((opening) => (
                <article
                  key={`${opening.suburb}-${opening.title}`}
                  className="px-5 py-6 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)_11rem_9rem] lg:items-center lg:gap-0 lg:py-7"
                >
                  <div className="flex flex-col gap-2 lg:hidden">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-slate-500">{opening.company}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-blue-600">{opening.postedAt}</span>
                        <Heart className="h-5 w-5 text-slate-300" strokeWidth={1.8} />
                      </div>
                    </div>

                    <Link to={`/company/${profile.slug}/opening/${opening.id}`} className="text-lg font-black leading-snug tracking-[-0.03em] text-neutral-950">
                      {opening.title}
                    </Link>

                    <p className="text-sm font-bold text-slate-400">{opening.hours}</p>

                    <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <p className="text-sm font-bold text-slate-500">
                        {opening.area} {opening.suburb} · <span className="text-neutral-900">{opening.pay}</span>
                      </p>
                      <Link
                        to={`/company/${profile.slug}/opening/${opening.id}`}
                        className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-neutral-900"
                      >
                        지원하기
                      </Link>
                    </div>
                  </div>

                  <div className="hidden lg:contents">
                    <div className="text-left text-sm font-black leading-6 text-neutral-900">
                      <p>{opening.area}</p>
                      <p>{opening.suburb}</p>
                    </div>

                    <div>
                      <Link to={`/company/${profile.slug}/opening/${opening.id}`} className="group inline-flex max-w-full items-center gap-2 text-lg font-black leading-snug tracking-[-0.03em] text-neutral-950 hover:text-blue-700">
                        <span className="line-clamp-2">{opening.title}</span>
                        <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500" />
                      </Link>
                      <p className="mt-2 text-sm font-black text-slate-400">{opening.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                      <span className="text-base font-black text-neutral-950">{opening.pay}</span>
                    </div>

                    <p className="text-center text-sm font-black text-neutral-950">{opening.hours}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {profile.skill_tags.length > 0 && (
            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
              <p className="mb-4 text-base font-black text-blue-700">이런 스킬이 있으면 좋아요!</p>
              <div className="flex flex-wrap gap-2">
                {profile.skill_tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
