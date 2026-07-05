import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin, Star } from "lucide-react";
import { ModernHeader } from "@/components/ModernHeader";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";

type CompanyProfileRow = Database["public"]["Tables"]["company_profiles"]["Row"];
type CompanyBranchRow = Database["public"]["Tables"]["company_branches"]["Row"];
type DetailRow = [string, string, string?];
type BranchJobOpening = {
  area: string;
  suburb: string;
  title: string;
  company: string;
  pay: string;
  payType: string;
  hours: string;
  postedAt: string;
};

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

function openingsForBranch(branch: CompanyBranchRow): BranchJobOpening[] {
  const company = `KMALL09 ${branch.branch_label ?? ""} ${branch.branch_name}점`.trim();

  switch (branch.branch_name) {
    case "이스트우드":
      return [
        { area: "NSW", suburb: "Eastwood", title: "KMALL09 이스트우드점 상품 진열 및 재고관리 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "풀타임/파트타임", postedAt: "상시" },
        { area: "NSW", suburb: "Eastwood", title: "KMALL09 이스트우드점 캐셔 및 고객응대 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
        { area: "NSW", suburb: "Eastwood", title: "KMALL09 이스트우드점 어드민/매장 운영 지원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
      ];
    case "리드컴":
      return [
        { area: "NSW", suburb: "Lidcombe", title: "KMALL09 리드컴 2호점 진열파트 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "풀타임/오전 파트타임", postedAt: "상시" },
        { area: "NSW", suburb: "Lidcombe", title: "KMALL09 리드컴 2호점 어드민 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
        { area: "NSW", suburb: "Lidcombe", title: "KMALL09 리드컴 2호점 캐셔 및 고객응대 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
      ];
    case "뱅크스타운":
      return [
        { area: "NSW", suburb: "Bankstown", title: "KMALL09 뱅크스타운점 캐셔 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "풀타임/파트타임", postedAt: "상시" },
        { area: "NSW", suburb: "Bankstown", title: "KMALL09 뱅크스타운점 입고·진열·리빙섹션 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "주말 포함 협의", postedAt: "상시" },
      ];
    case "시드니 시티":
      return [
        { area: "NSW", suburb: "Sydney CBD", title: "KMALL09 시드니 시티점 매니저 후보 모집", company, pay: "면접 시 협의", payType: "급여", hours: "풀타임", postedAt: "오픈예정" },
        { area: "NSW", suburb: "Sydney CBD", title: "KMALL09 시드니 시티점 진열파트 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "풀타임/파트타임", postedAt: "오픈예정" },
        { area: "NSW", suburb: "Sydney CBD", title: "KMALL09 시드니 시티점 어드민 및 캐셔 직원 모집", company, pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "오픈예정" },
      ];
    default:
      return [
        { area: "NSW", suburb: branch.branch_name, title: `KMALL09 ${branch.branch_name}점 직원 모집`, company, pay: "면접 시 협의", payType: "급여", hours: "시간협의", postedAt: "상시" },
      ];
  }
}

export default function CompanyKmall09() {
  const { slug = "kmall09" } = useParams();
  const [profile, setProfile] = useState<CompanyProfileRow>(fallbackProfile);
  const [branches, setBranches] = useState<CompanyBranchRow[]>(fallbackBranches);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(fallbackBranches[0].id);
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

      if (cancelled) return;

      if (!error && data) {
        setProfile(data);
      }

      if (!branchError && branchData && branchData.length > 0) {
        setBranches(branchData);
        setSelectedBranchId(branchData[0].id);
      }

      setIsLoadingCompany(false);
    }

    fetchCompanyData();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === selectedBranchId) ?? branches[0],
    [branches, selectedBranchId],
  );

  const heroBadges = useMemo(
    () => ["구인", "NSW", ...branches.map((branch) => branch.branch_name), "상시모집", "풀타임 / 파트타임"],
    [branches],
  );

  const branchOpenings = useMemo(() => openingsForBranch(selectedBranch), [selectedBranch]);
  const mapQuery = encodeURIComponent(selectedBranch.map_query || selectedBranch.address);
  const contactPhone = selectedBranch.phone ?? profile.phone;
  const contactPhoneHref = selectedBranch.phone_href ?? profile.phone_href;
  const contactEmail = selectedBranch.email ?? profile.email;

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
        <ModernHeader />
        <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12">
          <div className="mb-6 h-5 w-24 rounded bg-slate-100" />
          <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={`kmall-hero-skeleton-${index}`} className="h-8 w-24 rounded-full bg-slate-100" />
                  ))}
                </div>
                <div className="h-12 max-w-2xl rounded bg-slate-100" />
                <div className="mt-5 h-6 max-w-lg rounded bg-slate-100" />
              </div>
              <div className="h-32 rounded-2xl border border-slate-100 bg-slate-50" />
            </div>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="mb-6 h-9 w-40 rounded bg-slate-100" />
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="h-72 w-full bg-slate-100 sm:h-96" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-full rounded bg-slate-100" />
                  <div className="h-5 w-11/12 rounded bg-slate-100" />
                  <div className="h-5 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            </div>
            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-5 h-8 w-28 rounded bg-slate-100" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`kmall-contact-skeleton-${index}`} className="h-20 rounded-md bg-slate-50" />
                ))}
              </div>
            </aside>
          </section>

          <section className="mt-14">
            <div className="mb-3 h-5 w-48 rounded bg-slate-100" />
            <div className="grid grid-cols-1 border border-slate-200 sm:grid-flow-col sm:auto-cols-fr">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`kmall-branch-skeleton-${index}`} className="h-20 border-b border-slate-200 bg-white sm:border-b-0 sm:border-r last:border-r-0" />
              ))}
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
                {heroBadges.map((badge, index) => (
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
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <img src={profile.logo_url} alt={profile.name} className="mx-auto h-24 w-auto object-contain" />
            </div>
          </div>
        </section>

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
            <h2 className="mb-5 text-2xl font-black tracking-[-0.04em]">
              연락처
              {selectedBranch.branch_name && <span className="ml-2 text-sm font-bold text-blue-700">{selectedBranch.branch_name}점</span>}
            </h2>
            <div className="space-y-4 text-sm font-semibold text-slate-700">
              {contactPhone && (
                <a href={contactPhoneHref ? `tel:${contactPhoneHref}` : undefined} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-blue-50 hover:text-blue-700">
                  <span>
                    <span className="block text-slate-400">전화번호</span>
                    {contactPhone}
                  </span>
                </a>
              )}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-blue-50 hover:text-blue-700">
                  <span>
                    <span className="block text-slate-400">지원 이메일</span>
                    {contactEmail}
                  </span>
                </a>
              )}
              {profile.instagram_url && (
                <a href={profile.instagram_url} target="_blank" rel="noreferrer" className="block rounded-md bg-slate-50 p-4 transition-colors hover:bg-blue-50 hover:text-blue-700">
                  <span>
                    <span className="block text-slate-400">Instagram</span>
                    {profile.instagram_handle ?? profile.instagram_url}
                  </span>
                </a>
              )}
              <div className="block rounded-md bg-slate-50 p-4">
                <span>
                  <span className="block text-slate-400">주소</span>
                  {selectedBranch.address}
                </span>
              </div>
            </div>
          </aside>
        </section>

        {branches.length > 1 && (
          <section className="mt-14">
            <p className="mb-3 text-sm font-black text-slate-400">지점 선택 · {branches.length}개 매장 운영 중</p>
            <div className="grid grid-cols-1 border border-slate-200 text-center font-black text-slate-400 sm:grid-flow-col sm:auto-cols-fr">
              {branches.map((branch, index) => {
                const isSelected = branch.id === selectedBranch.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`flex flex-col items-center gap-1 border-slate-200 px-4 py-4 transition-colors ${index !== branches.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""} ${isSelected ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 hover:text-slate-950"}`}
                  >
                    <span className="text-base sm:text-lg">{branch.branch_name}</span>
                    {branch.branch_label && <span className="text-xs font-bold text-slate-400">{branch.branch_label}</span>}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section id="conditions" className="mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-black tracking-[-0.04em]">
              채용 공고
              {selectedBranch.branch_name && <span className="ml-2 text-lg font-bold text-blue-700">{selectedBranch.branch_name}점 {selectedBranch.branch_label}</span>}
            </h2>
            <p className="text-sm font-bold text-slate-400">{branchOpenings.length}개 포지션</p>
          </div>

          <div className="overflow-hidden border-y border-t-neutral-950 border-b-slate-200 bg-white">
            <div className="hidden grid-cols-[5rem_13rem_minmax(0,1fr)_11rem_9rem_6rem] items-center border-b border-slate-200 px-5 py-5 text-center text-lg font-black text-neutral-950 lg:grid">
              <div />
              <div>지역</div>
              <div>모집제목/기업명</div>
              <div>급여(원)</div>
              <div>근무시간</div>
              <div>등록일</div>
            </div>

            <div className="divide-y divide-slate-200">
              {branchOpenings.map((opening) => (
                <article
                  key={`${selectedBranch.id}-${opening.title}`}
                  className="grid gap-4 px-5 py-7 lg:grid-cols-[5rem_13rem_minmax(0,1fr)_11rem_9rem_6rem] lg:items-center lg:gap-0"
                >
                  <div className="hidden justify-center lg:flex">
                    <Star className="h-6 w-6 text-slate-300" strokeWidth={1.8} />
                  </div>

                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 lg:block lg:text-center">
                    <span className="text-sm font-black text-slate-400 lg:hidden">지역</span>
                    <div className="text-base font-black leading-7 text-neutral-900">
                      <p>{opening.area}</p>
                      <p>{opening.suburb}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 lg:block">
                    <span className="text-sm font-black text-slate-400 lg:hidden">모집제목</span>
                    <div>
                      <Link to="/" className="group inline-flex max-w-full items-center gap-2 text-xl font-black leading-snug tracking-[-0.03em] text-neutral-950 hover:text-blue-700">
                        <span className="line-clamp-2">{opening.title}</span>
                        <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500" />
                      </Link>
                      <p className="mt-2 text-base font-black text-slate-400">{opening.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 lg:block lg:text-center">
                    <span className="text-sm font-black text-slate-400 lg:hidden">급여</span>
                    <div className="flex flex-wrap items-center gap-2 lg:justify-center">
                      <span className="text-lg font-black text-neutral-950">{opening.pay}</span>
                      <span className="rounded-full border border-blue-600 px-2.5 py-1 text-xs font-black text-blue-700">{opening.payType}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 lg:block lg:text-center">
                    <span className="text-sm font-black text-slate-400 lg:hidden">근무시간</span>
                    <p className="text-base font-black text-neutral-950">{opening.hours}</p>
                  </div>

                  <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 lg:block lg:text-center">
                    <span className="text-sm font-black text-slate-400 lg:hidden">등록일</span>
                    <p className="text-lg font-black text-blue-600">{opening.postedAt}</p>
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

        <section className="mt-16">
          <h2 className="mb-5 text-3xl font-black tracking-[-0.04em]">근무지역</h2>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-lg font-black text-slate-900">
            <MapPin className="h-5 w-5 text-blue-700" />
            {selectedBranch.address}
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
              title={`${profile.name} ${selectedBranch.branch_name} map`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="p-5 text-sm font-semibold text-slate-500">지도는 선택한 지점({selectedBranch.branch_name})의 위치를 나타내며, 실제 출입구 및 매장 위치는 쇼핑센터 안내를 확인해 주세요.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
