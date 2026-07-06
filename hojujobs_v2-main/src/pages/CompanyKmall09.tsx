import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";

type CompanyProfileRow = Database["public"]["Tables"]["company_profiles"]["Row"];
type CompanyBranchRow = Database["public"]["Tables"]["company_branches"]["Row"];
type CompanyJobOpeningRow = Database["public"]["Tables"]["company_job_openings"]["Row"];
type DetailRow = [string, string, string?];
type BranchJobOpening = {
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

function toBranchJobOpening(row: CompanyJobOpeningRow): BranchJobOpening {
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
  id: "fallback-kmall09",
  slug: "kmall09",
  name: "KMALL09",
  profile_title: "KMALL09 직원 모집",
  subtitle: "호주 최대 규모의 한국식 백화점·그로서리 스토어",
  logo_url: "https://kmall09.com.au/cdn/shop/files/LOGO_COLOR_SETTING-01.jpg?v=1768457068&width=480",
  photo_url: "https://static.wixstatic.com/media/fc9cb9_73509c4a52b94edeba32f754c926b5b7~mv2.png/v1/fill/w_1000%2Ch_541%2Cq_90%2Cenc_avif%2Cquality_auto/fc9cb9_73509c4a52b94edeba32f754c926b5b7~mv2.png",
  badges: ["구인", "NSW", "다지점", "상시모집", "풀타임 / 파트타임"],
  about_paragraphs: [
    "KMALL09는 한국 식품, 뷰티, 생활용품, 트렌드 상품을 한곳에서 만날 수 있는 대형 복합 쇼핑 공간입니다. 이스트우드(1호점), 리드컴(2호점), 뱅크스타운(3호점)에서 매장을 운영하며, 시드니 시티(4호점)를 오픈 준비 중입니다.",
    "매장별로 신선식품, 그로서리, 푸드코트, K-뷰티와 생활용품을 함께 운영하는 한국형 원스톱 스토어입니다. 아래에서 지점을 선택하면 해당 매장의 근무조건과 위치를 확인할 수 있습니다.",
  ],
  phone: "(02) 8068 1575",
  phone_href: "+61280681575",
  email: "kmall09.ops.oscar@gmail.com",
  instagram_url: "https://www.instagram.com/kmall09/",
  instagram_handle: "@kmall09",
  address: "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141",
  map_query: "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141",
  condition_rows: [
    ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
    ["근무지역", "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141", "리드컴 쇼핑센터 내 매장"],
    ["근무요일", "협의 가능", "주 5~6일 가능자 우대"],
    ["근무시간", "풀타임 / 오전 파트타임", "매장 운영 상황에 따라 조율"],
    ["모집분야", "진열파트, 어드민, 캐셔", "매장 운영 및 고객응대"],
    ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"],
  ] as Json,
  recruitment_rows: [
    ["모집마감", "상시모집"],
    ["모집인원", "진열파트 2명, 어드민 1명, 캐셔 1명"],
    ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, RSA 소지자, 장기 근무 가능자"],
    ["지원방법", "이메일로 이력서 접수"],
  ] as Json,
  skill_tags: ["상품 진열", "재고 관리", "계산 업무", "고객응대", "매장 운영", "입고 처리"],
  is_active: true,
  created_at: "",
  updated_at: "",
};

const fallbackBranches: CompanyBranchRow[] = [
  {
    id: "fallback-branch-eastwood",
    company_slug: "kmall09",
    branch_name: "이스트우드",
    branch_label: "1호점",
    address: "Unit 1/1-7 Rowe St, Eastwood NSW 2122",
    map_query: "Unit 1/1-7 Rowe St, Eastwood NSW 2122",
    phone: null,
    phone_href: null,
    email: "kmall09.ops.oscar@gmail.com",
    condition_rows: [
      ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
      ["근무지역", "Unit 1/1-7 Rowe St, Eastwood NSW 2122", "KMALL09 1호점 (이스트우드 원조 매장)"],
      ["근무요일", "협의 가능", "주 5~6일 가능자 우대"],
      ["근무시간", "풀타임 / 파트타임", "매장 운영 상황에 따라 조율"],
      ["모집분야", "매장 상황에 따라 상시 채용", "진열·어드민·캐셔 등"],
      ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"],
    ] as Json,
    recruitment_rows: [
      ["모집마감", "상시모집"],
      ["모집인원", "매장 상황에 따라 채용"],
      ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, 비자 만료일 1년 이상"],
      ["지원방법", "이메일로 이력서 접수"],
    ] as Json,
    sort_order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-branch-lidcombe",
    company_slug: "kmall09",
    branch_name: "리드컴",
    branch_label: "2호점",
    address: "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141",
    map_query: "Shopping Centre, Level 1/92 Parramatta Rd, Lidcombe NSW 2141",
    phone: "(02) 8068 1575",
    phone_href: "+61280681575",
    email: "kmall09.ops.oscar@gmail.com",
    condition_rows: fallbackProfile.condition_rows,
    recruitment_rows: fallbackProfile.recruitment_rows,
    sort_order: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-branch-bankstown",
    company_slug: "kmall09",
    branch_name: "뱅크스타운",
    branch_label: "3호점",
    address: "Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200",
    map_query: "Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200",
    phone: "0434 007 404",
    phone_href: "+61434007404",
    email: "JUN.MOON@KMALL09.COM.AU",
    condition_rows: [
      ["급여", "면접 시 협의", "경력에 따른 대우"],
      ["근무지역", "Lower Ground, Little Saigon Plaza, 462 Chapel Rd, Bankstown NSW 2200", "KMALL09 3호점 (뱅크스타운역 도보 5분)"],
      ["근무요일", "주말 1일 필수", "주말 2일 / 주 5~6일 가능자 우대"],
      ["근무시간", "풀타임 / 파트타임", "면접 시 협의"],
      ["모집분야", "캐셔 1명, 남직원 1명(입고·진열·리빙섹션)", "리빙 섹션 관리 및 세일즈 포함"],
      ["복리후생", "법정 연금(Super) 12%, 유급 연차, 직원 할인", "General Retail Industry Award 기준"],
    ] as Json,
    recruitment_rows: [
      ["모집마감", "상시모집"],
      ["모집인원", "캐셔 1명, 남직원 1명"],
      ["우대사항", "한국/호주 마트 경험자, 영어·중국어 가능자, RSA 소지자(캐셔)"],
      ["지원방법", "이메일로 이력서 접수"],
    ] as Json,
    sort_order: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-branch-city",
    company_slug: "kmall09",
    branch_name: "시드니 시티",
    branch_label: "4호점 · 오픈예정",
    address: "537 George St, Sydney NSW 2000",
    map_query: "537 George St, Sydney NSW 2000",
    phone: null,
    phone_href: null,
    email: "kmall09.ops.oscar@gmail.com",
    condition_rows: [
      ["급여", "면접 시 협의", "포지션 및 경력에 따라 협의"],
      ["근무지역", "537 George St, Sydney NSW 2000", "KMALL09 4호점, 오픈 준비 중"],
      ["근무요일", "주말 1일 필수, 이틀 우대", "주 5~6일 가능자 우대"],
      ["근무시간", "풀타임 / 파트타임", "면접 시 협의"],
      ["모집분야", "매니저, 진열파트, 어드민, 캐셔", "인원 추후 확정"],
      ["복리후생", "법정 연금, 유급 휴가, 직원 할인", "General Retail Industry Award 기준"],
    ] as Json,
    recruitment_rows: [
      ["모집마감", "상시모집"],
      ["모집인원", "전 포지션 추가 채용 중"],
      ["우대사항", "대형유통/마트 경험, 영어/중국어 가능, RSA 소지자(캐셔)"],
      ["지원방법", "이메일로 이력서 접수"],
    ] as Json,
    sort_order: 4,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

function detailRowsFromJson(value: Json): DetailRow[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((row) => {
    if (!Array.isArray(row)) return [];
    const [label, content, note] = row;
    if (typeof label !== "string" || typeof content !== "string") return [];
    return [[label, content, typeof note === "string" ? note : undefined] satisfies DetailRow];
  });
}

const fallbackJobOpenings: BranchJobOpening[] = [
  { id: "fallback-kopo-lidcombe-1", area: "NSW", suburb: "Lidcombe", title: "리드컴 케이몰 KOPO 분식매장 직원 모집", company: "KMALL09 KOPO 분식매장", pay: "면접 시 협의", payType: "급여", hours: "풀타임 / 파트타임", postedAt: "상시" },
  { id: "fallback-eastwood-2", area: "NSW", suburb: "Eastwood", title: "KMALL09 이스트우드점 캐셔 및 고객응대 직원 모집", company: "KMALL09 1호점 이스트우드점", pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
  { id: "fallback-eastwood-3", area: "NSW", suburb: "Eastwood", title: "KMALL09 이스트우드점 어드민/매장 운영 지원 모집", company: "KMALL09 1호점 이스트우드점", pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
  { id: "fallback-lidcombe-1", area: "NSW", suburb: "Lidcombe", title: "KMALL09 리드컴 2호점 진열파트 직원 모집", company: "KMALL09 2호점 리드컴점", pay: "면접 시 협의", payType: "급여", hours: "풀타임/오전 파트타임", postedAt: "상시" },
  { id: "fallback-lidcombe-2", area: "NSW", suburb: "Lidcombe", title: "KMALL09 리드컴 2호점 어드민 직원 모집", company: "KMALL09 2호점 리드컴점", pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
  { id: "fallback-lidcombe-3", area: "NSW", suburb: "Lidcombe", title: "KMALL09 리드컴 2호점 직원 모집", company: "KMALL09 2호점 리드컴점", pay: "면접 시 협의", payType: "급여", hours: "풀타임 / 오전 파트타임", postedAt: "상시" },
  { id: "fallback-bankstown-1", area: "NSW", suburb: "Bankstown", title: "KMALL09 뱅크스타운 3호점 직원 모집", company: "KMALL09 3호점 뱅크스타운점", pay: "면접 시 협의", payType: "급여", hours: "풀타임 / 파트타임", postedAt: "상시" },
  { id: "fallback-bankstown-2", area: "NSW", suburb: "Bankstown", title: "KMALL09 뱅크스타운점 입고·진열·리빙섹션 직원 모집", company: "KMALL09 3호점 뱅크스타운점", pay: "면접 시 협의", payType: "급여", hours: "주말 포함 협의", postedAt: "상시" },
  { id: "fallback-city-1", area: "NSW", suburb: "Sydney CBD", title: "KMALL09 시티 4호점 직원 모집", company: "KMALL09 4호점 시드니 시티점", pay: "면접 시 협의", payType: "급여", hours: "풀타임 / 파트타임", postedAt: "시티오픈" },
  { id: "fallback-city-2", area: "NSW", suburb: "Sydney CBD", title: "KMALL09 시드니 시티점 진열파트 직원 모집", company: "KMALL09 4호점 · 오픈예정 시드니 시티점", pay: "면접 시 협의", payType: "급여", hours: "풀타임/파트타임", postedAt: "오픈예정" },
  { id: "fallback-city-3", area: "NSW", suburb: "Sydney CBD", title: "KMALL09 시드니 시티점 어드민 및 캐셔 직원 모집", company: "KMALL09 4호점 · 오픈예정 시드니 시티점", pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "오픈예정" },
];

export default function CompanyKmall09() {
  const { slug = "kmall09" } = useParams();
  const [profile, setProfile] = useState<CompanyProfileRow>(fallbackProfile);
  const [branches, setBranches] = useState<CompanyBranchRow[]>(fallbackBranches);
  const [branchOpenings, setBranchOpenings] = useState<BranchJobOpening[]>(fallbackJobOpenings);
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

      const { data: branchData, error: branchError } = await supabase
        .from("company_branches")
        .select("*")
        .eq("company_slug", slug)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

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

      if (!branchError && branchData && branchData.length > 0) {
        setBranches(branchData);
      }

      if (!jobError && jobData && jobData.length > 0) {
        setBranchOpenings(jobData.map(toBranchJobOpening));
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
    description: `${profile.name} 회사 프로필과 채용정보. 지점별 주소, 연락처, 인스타그램, 매장 소개와 근무조건을 확인하세요.`,
    canonical: `https://hojujobs.com/company/${profile.slug}`,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    keywords: `${profile.name} 채용, 리드컴 한인마트 구인, 이스트우드 구인, 뱅크스타운 구인, 시드니 한인 구인, Korean jobs Australia`,
  });

  if (isLoadingCompany) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-white text-neutral-950">
        <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
          <div className="mb-6 h-5 w-24 rounded bg-slate-100" />
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="h-72 w-full bg-slate-100 sm:h-96" />
            <div className="p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
                <div>
                  <div className="h-12 max-w-2xl rounded bg-slate-100" />
                  <div className="mt-5 h-6 max-w-lg rounded bg-slate-100" />
                </div>
                <div className="h-32 rounded-2xl border border-slate-100 bg-slate-50" />
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="mb-6 h-9 w-44 rounded bg-slate-100" />
            <div className="border-y border-t-neutral-950 border-b-slate-200 bg-white">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`kmall-job-skeleton-${index}`} className="grid gap-4 border-b border-slate-200 px-5 py-7 lg:grid-cols-[5rem_13rem_minmax(0,1fr)_11rem_9rem_6rem]">
                  <div className="hidden h-6 w-6 rounded bg-slate-100 lg:block" />
                  <div className="h-12 rounded bg-slate-100" />
                  <div className="h-14 rounded bg-slate-100" />
                  <div className="h-10 rounded bg-slate-100" />
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
            <h2 className="text-2xl font-black tracking-[-0.04em]">
              채용 공고
              <span className="ml-2 text-base font-bold text-blue-700">전체 지점</span>
            </h2>
            <p className="text-sm font-bold text-slate-400">{branchOpenings.length}개 포지션</p>
          </div>

          <div className="overflow-hidden border-y border-t-neutral-950 border-b-slate-200 bg-white">
            <div className="hidden grid-cols-[10rem_minmax(0,1fr)_11rem_9rem] items-center border-b border-slate-200 px-5 py-5 text-center text-base font-black text-neutral-950 lg:grid">
              <div className="text-left">지역</div>
              <div>모집제목/기업명</div>
              <div>급여</div>
              <div>근무시간</div>
            </div>

            <div className="divide-y divide-slate-200">
              {branchOpenings.map((opening) => (
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
