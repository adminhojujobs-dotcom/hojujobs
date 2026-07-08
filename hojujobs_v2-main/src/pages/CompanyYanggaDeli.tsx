import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Heart, List } from "lucide-react";
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
  id: "fallback-yanggadeli",
  slug: "yanggadeli",
  name: "Yangga Deli",
  profile_title: "Yangga Deli 직원 모집",
  subtitle: "로즈 · 채스우드 — 테이크어웨이 & 반찬 전문점",
  logo_url: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/yangga-deli.png",
  photo_url: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/photos/yangga-deli.jpg",
  badges: ["구인", "NSW", "다지점", "상시모집", "파트타임 / 풀타임"],
  about_paragraphs: [
    "Yangga Deli는 로즈와 채스우드 지역에서 테이크어웨이 및 반찬 전문 매장으로 운영되고 있으며, 도시락, 김밥, 반찬 등 다양한 한식 메뉴를 판매합니다.",
    "주방, 홀 스태프, 김밥 스태프 등 매장별로 다양한 포지션을 모집하며, 손이 빠르고 책임감 있는 팀원을 찾고 있습니다. Tax File Number(TFN) 소지자만 지원 가능합니다.",
  ],
  phone: "0450 622 558",
  phone_href: "+61450622558",
  email: "yanggafoods@gmail.com",
  instagram_url: "https://www.instagram.com/yangga_koreandeli/",
  instagram_handle: "@yangga_koreandeli",
  address: "Chatswood Chase Shopping Centre, 345 Victoria Ave, Chatswood NSW 2067",
  map_query: "Chatswood Chase Shopping Centre, Chatswood NSW 2067",
  condition_rows: [
    ["급여", "면접 시 경력에 따라 협의", "주말 시급은 평일 시급의 1.25배 적용"],
    ["근무지역", "로즈 · 채스우드(Chatswood Chase)", "지점별 별도 채용"],
    ["근무요일", "풀타임(주 5일) 또는 파트타임(주 2~4일)", "지점 및 포지션에 따라 다름"],
    ["근무시간", "07:00~15:00 / 07:00~16:30 (매장별 상이)", "김밥·홀 포지션은 별도 시간대"],
    ["모집분야", "주방 스태프, 홀 스태프, 김밥 스태프", "TFN 소지자 필수"],
    ["복리후생", "주말 수당(1.25배), 안정적인 시프트 운영", "Fast Food/Retail Industry Award 기준"],
  ],
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "지점별 1명"],
    ["우대사항", "손이 빠르고 책임감 있는 분, 밝고 긍정적인 팀워크"],
    ["지원방법", "이름·나이·거주지역·근무가능일·비자상태를 문자 또는 이메일로 전달"],
  ],
  skill_tags: ["김밥 만들기", "반찬 조리", "도시락 조리", "캐셔", "디스플레이", "고객응대"],
  is_active: true,
  created_at: "",
  updated_at: "",
};

const fallbackJobOpenings: JobOpening[] = [
  { id: "fallback-1", area: "NSW", suburb: "Rhodes", title: "Yangga Deli 로즈점 주방 직원 모집", company: "Yangga Deli 로즈점", pay: "면접 시 경력에 따라 협의", payType: "급여", hours: "7am - 3pm", postedAt: "상시" },
  { id: "fallback-2", area: "NSW", suburb: "Chatswood", title: "Yangga Korean Deli 채스우드점 홀 스태프 모집", company: "Yangga Korean Deli 채스우드점", pay: "면접 시 경력에 따라 협의", payType: "급여", hours: "목, 금, 토, 일", postedAt: "상시" },
];

export default function CompanyYanggaDeli() {
  const { slug = "yanggadeli" } = useParams();
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
    keywords: `${profile.name} 채용, 반찬 델리 구인, 김밥 스태프 구인, 시드니 한인 구인, Korean jobs Australia`,
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
                <div key={`yanggadeli-job-skeleton-${index}`} className="grid gap-4 border-b border-slate-200 px-5 py-7 lg:grid-cols-[10rem_minmax(0,1fr)_11rem_9rem]">
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
        <div className="mb-6 flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-normal text-slate-500 transition-colors hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            홈으로
          </Link>
          <Link to="/directory" className="inline-flex items-center gap-1.5 text-sm font-normal text-slate-500 transition-colors hover:text-slate-950">
            <List className="h-4 w-4" />
            목록
          </Link>
        </div>

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
                <h1 className="max-w-4xl text-xl font-normal leading-tight tracking-[-0.05em] text-neutral-950 sm:text-3xl">
                  {profile.profile_title}
                </h1>
                <p className="mt-2 text-base font-normal text-slate-600">{profile.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="conditions" className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-black tracking-[-0.04em]">채용 공고</h2>
            <p className="text-sm font-normal text-slate-400">{jobOpenings.length}개 포지션</p>
          </div>

          <div className="overflow-hidden border-y border-t-neutral-950 border-b-slate-200 bg-white">
            <div className="hidden grid-cols-[10rem_minmax(0,1fr)_11rem_9rem] items-center border-b border-slate-200 px-5 py-5 text-center text-base font-normal text-neutral-950 lg:grid">
              <div className="text-left">지역</div>
              <div>모집제목/기업명</div>
              <div>급여</div>
              <div>근무시간</div>
            </div>

            <div className="divide-y divide-slate-200">
              {jobOpenings.map((opening) => (
                <article
                  key={`${opening.suburb}-${opening.title}`}
                  className="px-5 py-4 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)_11rem_9rem] lg:items-center lg:gap-0 lg:py-7"
                >
                  <div className="flex flex-col gap-1.5 lg:hidden">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-normal text-slate-500">{opening.company}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-normal text-blue-600">{opening.postedAt}</span>
                        <Heart className="h-4 w-4 text-slate-300" strokeWidth={1.8} />
                      </div>
                    </div>

                    <Link to={`/company/${profile.slug}/opening/${opening.id}`} className="text-base font-normal leading-snug tracking-[-0.03em] text-neutral-950">
                      {opening.title}
                    </Link>

                    <p className="text-xs font-normal text-slate-400">{opening.hours}</p>

                    <div className="mt-1.5 flex items-center justify-between gap-3 border-t border-slate-100 pt-2">
                      <p className="text-xs font-normal text-slate-500">
                        {opening.area} {opening.suburb} · <span className="text-neutral-900">{opening.pay}</span>
                      </p>
                      <Link
                        to={`/company/${profile.slug}/opening/${opening.id}`}
                        className="shrink-0 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-normal text-neutral-900"
                      >
                        지원하기
                      </Link>
                    </div>
                  </div>

                  <div className="hidden lg:contents">
                    <div className="text-left text-sm font-normal leading-6 text-neutral-900">
                      <p>{opening.area}</p>
                      <p>{opening.suburb}</p>
                    </div>

                    <div>
                      <Link to={`/company/${profile.slug}/opening/${opening.id}`} className="group inline-flex max-w-full items-center gap-2 text-lg font-normal leading-snug tracking-[-0.03em] text-neutral-950 hover:text-blue-700">
                        <span className="line-clamp-2">{opening.title}</span>
                        <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500" />
                      </Link>
                      <p className="mt-2 text-sm font-normal text-slate-400">{opening.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                      <span className="text-base font-normal text-neutral-950">{opening.pay}</span>
                    </div>

                    <p className="text-center text-sm font-normal text-neutral-950">{opening.hours}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {profile.skill_tags.length > 0 && (
            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
              <p className="mb-4 text-base font-normal text-blue-700">이런 스킬이 있으면 좋아요!</p>
              <div className="flex flex-wrap gap-2">
                {profile.skill_tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-blue-50 px-4 py-2 text-sm font-normal text-blue-700">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
