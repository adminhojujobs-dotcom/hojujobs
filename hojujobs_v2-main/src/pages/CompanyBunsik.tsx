import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { ModernHeader } from "@/components/ModernHeader";
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
  id: "fallback-bunsik",
  slug: "bunsik",
  name: "BUNSIK",
  profile_title: "BUNSIK 직원 모집",
  subtitle: "떡볶이 · 치킨 · 핫도그 · 컵밥 K-Food 분식 프랜차이즈",
  logo_url: "https://bunsik.au/wp-content/uploads/2023/07/bunsik-logo.png",
  photo_url: "https://bunsik.au/wp-content/uploads/2023/07/bunsik-image.png",
  badges: ["구인", "NSW", "다지점", "상시모집", "파트타임 / 풀타임"],
  about_paragraphs: [
    "BUNSIK(분식)은 떡볶이, 치킨, 핫도그, 컵밥 등 한국의 대표 분식 메뉴를 선보이는 K-Food 프랜차이즈로, 시드니 전역 Westfield 쇼핑센터 푸드코트에서 매장을 운영하고 있습니다.",
    "채스우드, 허스트빌, 버우드, 탑라이드, 파라마타 등 각 지점에서 매장 매니저, 키친 스태프, 캐셔/홀 스태프를 모집합니다. 주방 경력이 없어도 체계적인 트레이닝을 제공합니다.",
  ],
  phone: null,
  phone_href: null,
  email: "BunsikOP@gmail.com",
  instagram_url: "https://www.instagram.com/bunsik_au/",
  instagram_handle: "@bunsik_au",
  address: "Westfield Parramatta, 159-175 Church St, Parramatta NSW 2150",
  map_query: "Westfield Parramatta, 159-175 Church St, Parramatta NSW 2150",
  condition_rows: [
    ["급여", "면접 시 협의", "경력 및 포지션에 따라 협의"],
    ["근무지역", "채스우드 · 허스트빌 · 버우드 · 탑라이드 · 파라마타 등", "Westfield 쇼핑센터 내 매장, 지점별 별도 채용"],
    ["근무요일", "주 2일 ~ 주 5일 이상", "지점 및 포지션에 따라 다름"],
    ["근무시간", "09:00 ~ 18:00 (매장별 상이)", "목요일 휴무 지점 있음"],
    ["모집분야", "매장 매니저, 키친 스태프, 캐셔/홀 스태프", "초보자 가능, 트레이닝 제공"],
    ["복리후생", "법정 연금, 유급 휴가, 체계적 트레이닝", "Fast Food Industry Award 기준"],
  ],
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1~3명"],
    ["우대사항", "주방/카페 경력자, 기본 영어 소통 가능자, 손이 빠르고 위생 관념이 철저한 분"],
    ["지원방법", "이메일 제목에 지원 매장을 명시하여 이력서 접수"],
  ],
  skill_tags: ["분식 조리", "POS 운영", "고객응대", "재고관리", "위생관리", "매장운영"],
  is_active: true,
  created_at: "",
  updated_at: "",
};

const fallbackJobOpenings: JobOpening[] = [
  { id: "fallback-1", area: "NSW", suburb: "Parramatta", title: "BUNSIK 직원 모집", company: "BUNSIK", pay: "면접 시 협의", payType: "급여", hours: "09:00 ~ 18:00 (매장별 상이)", postedAt: "상시" },
];

export default function CompanyBunsik() {
  const { slug = "bunsik" } = useParams();
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
    description: `${profile.name} 회사 프로필과 채용정보. 주소, 연락처, 인스타그램, 매장 소개와 근무조건을 확인하세요.`,
    canonical: `https://hojujobs.com/company/${profile.slug}`,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    keywords: `${profile.name} 채용, 분식 프랜차이즈 구인, 시드니 한인 구인, Korean jobs Australia`,
  });

  if (isLoadingCompany) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
        <ModernHeader />
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
                <div key={`bunsik-job-skeleton-${index}`} className="grid gap-4 border-b border-slate-200 px-5 py-7 lg:grid-cols-[10rem_minmax(0,1fr)_11rem_9rem]">
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
      <ModernHeader />
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
