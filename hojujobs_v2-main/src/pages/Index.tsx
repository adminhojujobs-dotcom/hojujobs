import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ExternalLink,
  Search,
  ShieldAlert,
} from "lucide-react";
import { ModernHeader } from "@/components/ModernHeader";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

interface IndexProps {
  cityFilter?: string;
}

type HomepageJobCardRow = Database["public"]["Tables"]["homepage_job_cards"]["Row"];

interface JobCardItem {
  id: string;
  logo: string;
  logoUrl?: string | null;
  logoTone: string;
  company: string;
  location: string;
  title: string;
  payType: string;
  pay: string;
  jobUrl?: string | null;
}

const routeMeta: Record<string, { title: string; description: string; canonical: string }> = {
  NSW: {
    title: "호주잡스 - 시드니 한인 구인구직",
    description: "시드니 한인 구인구직 채용정보를 한눈에 찾아보세요.",
    canonical: "https://hojujobs.com/sydney",
  },
  VIC: {
    title: "호주잡스 - 멜버른 한인 구인구직",
    description: "멜버른 한인 구인구직 채용정보를 한눈에 찾아보세요.",
    canonical: "https://hojujobs.com/melbourne",
  },
  QLD: {
    title: "호주잡스 - 브리즈번 한인 구인구직",
    description: "브리즈번 한인 구인구직 채용정보를 한눈에 찾아보세요.",
    canonical: "https://hojujobs.com/brisbane",
  },
  SA: {
    title: "호주잡스 - 애들레이드 한인 구인구직",
    description: "애들레이드 한인 구인구직 채용정보를 한눈에 찾아보세요.",
    canonical: "https://hojujobs.com/adelaide",
  },
};

const locationGroups = [
  {
    state: "NSW",
    suburbs: ["스트라스필드", "리드컴", "이스트우드", "에핑", "채스우드", "로즈", "캠시", "버우드", "파라마타"],
  },
  {
    state: "VIC",
    suburbs: ["멜버른 CBD", "클레이튼", "박스힐", "글렌웨이버리", "카네기", "오클리", "돈카스터", "버우드", "사우스뱅크"],
  },
];

interface PromoItem {
  label: string;
  href: string;
  external?: boolean;
}

interface PromoSection {
  title: string;
  preview: {
    label: string;
    title: string;
    meta: string;
    image: string;
    imageUrl?: string | null;
    tone: string;
    href: string;
    external?: boolean;
  };
  items: PromoItem[];
}

function translatedNewsUrl(url: string) {
  return `https://translate.google.com/translate?sl=auto&tl=ko&u=${encodeURIComponent(url)}`;
}

const staticPromoSections: PromoSection[] = [
  {
    title: "채용정보",
    preview: {
      label: "쿠팡CFS · 인천 남동구",
      title: "입사 인센티브 지급 물류센터 단기/장기 알바 모집",
      meta: "월급 3,946,136원",
      image: "CFS",
      tone: "bg-blue-50 text-blue-700",
      href: "/",
    },
    items: [
      { label: "전국 버거킹 아르바이트 모집", href: "/" },
      { label: "노브랜드 안양평촌점 스태프 모집", href: "/" },
      { label: "유니클로 의왕점 오픈멤버 풀타이머 모집", href: "/" },
    ],
  },
  {
    title: "세일과 할인",
    preview: {
      label: "전자제품",
      title: "[VIC] Sigenergy 27kWh 배터리 + 10kW 인버터 특가",
      meta: "$9,900부터",
      image: "SALE",
      tone: "bg-cyan-50 text-cyan-700",
      href: "/sales",
    },
    items: [
      { label: "Macpac 남성용 다운 패딩 재킷 V2 $89", href: "/sales" },
      { label: "주말 장보기 Woolworths 반값 할인 모음", href: "/sales" },
      { label: "시드니 CBD 점심 도시락 특가 업데이트", href: "/sales" },
    ],
  },
  {
    title: "호주 생활 뉴스",
    preview: {
      label: "ABC News · 오늘",
      title: "호주 경제당국, 지역사회 지지 속 신규 정책 검토",
      meta: "기사 보기",
      image: "ABC",
      tone: "bg-indigo-50 text-indigo-700",
      href: "/news",
    },
    items: [
      { label: "세입자와 예산이 빠듯한 가구를 위한 겨울철 팁", href: "/news" },
      { label: "방학 앞두고 도로 사망 증가에 운전자 주의 당부", href: "/news" },
      { label: "보육 안전 단속에도 규정 위반 사례 드러나", href: "/news" },
    ],
  },
  {
    title: "커뮤니티 이벤트",
    preview: {
      label: "이번 주",
      title: "시드니 워홀 네트워킹 밋업 참가자 모집",
      meta: "무료 RSVP",
      image: "JUL",
      tone: "bg-slate-100 text-slate-700",
      href: "/",
    },
    items: [
      { label: "멜버른 한인 플리마켓 셀러 신청 접수", href: "/" },
      { label: "브리즈번 커피챗: 이력서와 인터뷰 준비", href: "/" },
      { label: "온라인 세미나: 호주 첫 월급과 세금 이해", href: "/" },
    ],
  },
];

const logoToneClasses: Record<string, string> = {
  blue: "text-blue-600",
  "blue-dark": "text-blue-700",
  black: "text-neutral-900",
  neutral: "text-neutral-800",
  purple: "text-purple-700",
  red: "text-red-600",
};

function mapHomepageJobCard(row: HomepageJobCardRow): JobCardItem {
  return {
    id: row.id,
    logo: row.logo_text,
    logoUrl: row.logo_url,
    logoTone: row.logo_tone,
    company: row.company_label,
    location: row.location_label,
    title: row.title,
    payType: row.pay_type,
    pay: row.pay_amount,
    jobUrl: row.job_url,
  };
}

function companySlugFromJobUrl(jobUrl?: string | null) {
  return jobUrl?.match(/^\/company\/([^/?#]+)/)?.[1] ?? null;
}

function multipleBranchesLabel(location: string) {
  const parts = location.split("·").map((part) => part.trim()).filter(Boolean);

  if (parts.length <= 1) return "여러 지점";
  return `${parts.slice(0, -1).join(" · ")} · 여러 지점`;
}

function applyMultipleBranchLabels(cards: JobCardItem[], branchCounts: Record<string, number>) {
  return cards.map((card) => {
    const slug = companySlugFromJobUrl(card.jobUrl);

    if (!slug || (branchCounts[slug] ?? 0) <= 1) return card;

    return {
      ...card,
      location: multipleBranchesLabel(card.location),
    };
  });
}

function filterCompanyCards(cards: JobCardItem[], activeCompanySlugs: Set<string>) {
  return cards.filter((card) => {
    const slug = companySlugFromJobUrl(card.jobUrl);
    return slug ? activeCompanySlugs.has(slug) : false;
  });
}

const kmall09JobCard: JobCardItem = {
  id: "fallback-kmall09",
  logo: "KMALL09",
  logoUrl: "https://kmall09.com.au/cdn/shop/files/LOGO_COLOR_SETTING-01.jpg?v=1768457068&width=480",
  logoTone: "blue",
  company: "KMALL09",
  location: "NSW · 여러 지점",
  title: "KMALL09 직원 모집",
  payType: "급여",
  pay: "면접 시 협의",
  jobUrl: "/company/kmall09",
};

const bunsikJobCard: JobCardItem = {
  id: "fallback-bunsik",
  logo: "Bunsik",
  logoUrl: "https://bunsik.au/wp-content/uploads/2023/07/bunsik-logo.png",
  logoTone: "red",
  company: "Bunsik",
  location: "NSW · 여러 지점",
  title: "Bunsik 직원 모집",
  payType: "급여",
  pay: "면접 시 협의",
  jobUrl: "/company/bunsik",
};

const sushiYuzenJobCard: JobCardItem = {
  id: "fallback-sushiyuzen",
  logo: "SUSHI\nYUZEN",
  logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviGMYOpZPvAIearZo8cgzB1YLQQsIQD9cQKh9FWE1sw&s",
  logoTone: "black",
  company: "Sushi Yuzen",
  location: "NSW · VIC · 여러 지점",
  title: "SUSHI YUZEN 직원 모집",
  payType: "시급",
  pay: "$31.19 ~ $35.15 + Super",
  jobUrl: "/company/sushiyuzen",
};

const chickenVJobCard: JobCardItem = {
  id: "fallback-chickenv",
  logo: "Chicken V",
  logoUrl: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/chickenv.png",
  logoTone: "red",
  company: "Chicken V",
  location: "NSW · 여러 지점",
  title: "Chicken V 직원 모집",
  payType: "급여",
  pay: "면접 시 협의",
  jobUrl: "/company/chickenv",
};

const parkBongsookJobCard: JobCardItem = {
  id: "fallback-parkbongsook",
  logo: "박봉숙",
  logoUrl: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/parkbongsook.png",
  logoTone: "black",
  company: "박봉숙",
  location: "NSW · 여러 지점",
  title: "박봉숙 직원 모집",
  payType: "시급",
  pay: "$26.5 ~ $29.5 + Super",
  jobUrl: "/company/parkbongsook",
};

const yanggaDeliJobCard: JobCardItem = {
  id: "fallback-yanggadeli",
  logo: "Yangga\nDeli",
  logoUrl: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/yangga-deli.png",
  logoTone: "neutral",
  company: "Yangga Deli",
  location: "NSW · 여러 지점",
  title: "Yangga Deli 직원 모집",
  payType: "급여",
  pay: "면접 시 협의",
  jobUrl: "/company/yanggadeli",
};

const stoneageJobCard: JobCardItem = {
  id: "fallback-stoneage",
  logo: "STONEAGE",
  logoUrl: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/stoneage_logo.png",
  logoTone: "black",
  company: "석기시대",
  location: "NSW · 여러 지점",
  title: "석기시대 직원 모집",
  payType: "급여",
  pay: "면접 시 협의",
  jobUrl: "/company/stoneage",
};

const dkHairStudioJobCard: JobCardItem = {
  id: "fallback-dkhairstudio",
  logo: "DK Hair Studio",
  logoUrl: "https://khxkzudzkklfyivgnmmq.supabase.co/storage/v1/object/public/company-logos/dk-hairstudio.jpg",
  logoTone: "black",
  company: "DK Hair Studio",
  location: "NSW · 여러 지점",
  title: "DK Hair Studio 직원 모집",
  payType: "급여",
  pay: "면접 시 협의",
  jobUrl: "/company/dkhairstudio",
};

function withPinnedCards(cards: JobCardItem[]) {
  const pinnedCards = [kmall09JobCard, bunsikJobCard, sushiYuzenJobCard, chickenVJobCard, parkBongsookJobCard, yanggaDeliJobCard, stoneageJobCard, dkHairStudioJobCard];
  const mergedCards = [...cards];

  pinnedCards.forEach((pinnedCard) => {
    const pinnedName = pinnedCard.company.toLowerCase();
    const existingIndex = mergedCards.findIndex((card) => card.company.toLowerCase().includes(pinnedName) || card.title.toLowerCase().includes(pinnedName));

    if (existingIndex === -1) {
      mergedCards.unshift(pinnedCard);
      return;
    }

    mergedCards[existingIndex] = {
      ...mergedCards[existingIndex],
      logoUrl: mergedCards[existingIndex].logoUrl ?? pinnedCard.logoUrl,
      jobUrl: mergedCards[existingIndex].jobUrl ?? pinnedCard.jobUrl,
    };
  });

  return mergedCards.slice(0, 12);
}

const fallbackJobCards: JobCardItem[] = [
  kmall09JobCard,
  bunsikJobCard,
  sushiYuzenJobCard,
  chickenVJobCard,
  parkBongsookJobCard,
  yanggaDeliJobCard,
  stoneageJobCard,
  dkHairStudioJobCard,
];

function PromoLink({ href, external, className, children }: { href: string; external?: boolean; className: string; children: ReactNode }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

function QuickSections() {
  const [promoSections, setPromoSections] = useState<PromoSection[]>(staticPromoSections);

  useEffect(() => {
    let cancelled = false;

    async function fetchSaleDeals() {
      const { data, error } = await supabase
        .from("ozbargain_deals")
        .select("rank, title, category, image_url")
        .order("rank", { ascending: true })
        .limit(4);

      if (cancelled || error || !data || data.length === 0) return;

      const [top, ...rest] = data;
      setPromoSections((prev) =>
        prev.map((section) =>
          section.title === "세일과 할인"
            ? {
                ...section,
                preview: { ...section.preview, label: top.category, title: top.title, meta: "딜 보기", href: `/sales/${top.rank}`, imageUrl: top.image_url },
                items: rest.slice(0, 3).map((deal) => ({ label: deal.title, href: `/sales/${deal.rank}` })),
              }
            : section,
        ),
      );
    }

    async function fetchNewsArticles() {
      const { data, error } = await supabase
        .from("news_articles")
        .select("title, source_name, source_url, category_label_ko, image_url")
        .eq("show_on_news_page", true)
        .order("sort_order", { ascending: true })
        .order("original_published_at", { ascending: false })
        .limit(4);

      if (cancelled || error || !data || data.length === 0) return;

      const [top, ...rest] = data;
      setPromoSections((prev) =>
        prev.map((section) =>
          section.title === "호주 생활 뉴스"
            ? {
                ...section,
                preview: {
                  ...section.preview,
                  label: `${top.source_name} · ${top.category_label_ko}`,
                  title: top.title,
                  meta: "기사 보기",
                  href: translatedNewsUrl(top.source_url),
                  external: true,
                  imageUrl: top.image_url,
                },
                items: rest.slice(0, 3).map((article) => ({ label: article.title, href: translatedNewsUrl(article.source_url), external: true })),
              }
            : section,
        ),
      );
    }

    fetchSaleDeals();
    fetchNewsArticles();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1520px] overflow-hidden px-5 pb-16 lg:px-9">
      <div className="grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-4">
        {promoSections.map(({ title, preview, items }) => {
          const shouldContainImage = title === "세일과 할인";

          return (
          <article key={title} className="flex min-h-[460px] w-full min-w-0 max-w-[calc(100vw-2.5rem)] flex-col rounded-sm border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.05)] sm:max-w-none">
            <div className="mb-5">
              <div className="min-w-0">
                <h2 className="text-2xl font-black tracking-[-0.04em] text-neutral-950">{title}</h2>
              </div>
            </div>

            <PromoLink href={preview.href} external={preview.external} className="group grid h-[290px] min-w-0 grid-rows-[112px_1fr] overflow-hidden border border-slate-200 p-4 transition-colors hover:border-blue-200">
              <div className={`mb-4 h-28 w-full overflow-hidden rounded-lg ${preview.tone}`}>
                {preview.imageUrl ? (
                  <img
                    src={preview.imageUrl}
                    alt={preview.title}
                    className={`h-full w-full ${shouldContainImage ? "bg-slate-50 object-contain" : "object-cover"}`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-black">{preview.image}</div>
                )}
              </div>
              <div className="flex min-w-0 max-w-full flex-col">
                <p className="mb-2 line-clamp-1 text-base font-black text-slate-500">{preview.label}</p>
                <h3 className="mb-4 line-clamp-3 max-w-full break-all text-lg font-black leading-snug tracking-[-0.03em] text-slate-950 [overflow-wrap:anywhere]">
                  {preview.title}
                </h3>
                <p className="mt-auto inline-flex items-center gap-2 text-base font-black text-blue-700">
                  {preview.meta}
                  <ExternalLink className="h-4 w-4" />
                </p>
              </div>
            </PromoLink>

            <div className="mt-auto min-w-0 overflow-hidden rounded-b-sm border-x border-b border-slate-200">
              {items.map((item) => (
                <PromoLink key={item.label} href={item.href} external={item.external} className="flex min-h-[58px] min-w-0 items-center justify-between gap-4 border-t border-slate-200 px-5 py-3 text-base font-black leading-snug text-slate-800 transition-colors hover:bg-slate-50 hover:text-blue-700">
                  <span className="line-clamp-1">{item.label}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
                </PromoLink>
              ))}
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="mx-auto max-w-[1520px] px-5 pb-16 lg:px-9">
      <h2 className="mb-6 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">지역별 알바</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        {locationGroups.map(({ state, suburbs }) => (
          <div key={state} className="rounded-sm border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
            <h3 className="mb-4 text-xl font-black text-blue-700">{state}</h3>
            <div className="flex flex-wrap gap-3">
              {suburbs.map((suburb) => (
                <Link
                  key={`${state}-${suburb}`}
                  to="/"
                  className="inline-flex h-11 items-center rounded-full bg-neutral-50 px-5 text-base font-black text-neutral-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {suburb}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function JobCard({ job }: { job: JobCardItem }) {
  const mutedPay = job.payType === "￦";
  const logoColorClass = logoToneClasses[job.logoTone] ?? logoToneClasses.blue;

  return (
    <Link to={job.jobUrl ?? "/"} className="group flex min-h-[240px] flex-col rounded-2xl bg-white px-7 py-8 transition-transform hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="mb-7 flex h-12 items-start">
        {job.logoUrl ? (
          <img src={job.logoUrl} alt={`${job.company} logo`} className="max-h-12 max-w-[9rem] object-contain object-left" />
        ) : (
          <span className={`whitespace-pre-line text-lg font-black leading-none ${logoColorClass}`}>{job.logo}</span>
        )}
      </div>
      <p className="mb-3 truncate text-base font-semibold text-slate-500">
        {job.company} <span className="mx-2 text-slate-300">·</span> {job.location}
      </p>
      <h3 className="line-clamp-2 min-h-[64px] text-[1.35rem] font-black leading-[1.35] tracking-[-0.04em] text-neutral-950">
        {job.title}
      </h3>
      <div className="mt-auto flex items-center justify-between pt-8">
        <p className="text-base font-black">
          <span className={mutedPay ? "text-slate-400" : job.payType === "월급" ? "text-blue-600" : "text-sky-500"}>{job.payType}</span>
          <span className="ml-1 text-slate-500">{job.pay}</span>
        </p>
        <span className="text-2xl font-light text-slate-400 transition-colors group-hover:text-blue-600">+</span>
      </div>
    </Link>
  );
}

function JobCardSkeleton() {
  return (
    <div className="flex min-h-[240px] flex-col rounded-2xl bg-white px-7 py-8">
      <div className="mb-7 h-12 w-36 rounded-md bg-slate-100" />
      <div className="mb-3 h-5 w-48 rounded bg-slate-100" />
      <div className="space-y-3">
        <div className="h-6 w-full rounded bg-slate-100" />
        <div className="h-6 w-4/5 rounded bg-slate-100" />
      </div>
      <div className="mt-auto h-5 w-40 rounded bg-slate-100" />
    </div>
  );
}

function FeaturedJobs({ jobs, isLoading }: { jobs: JobCardItem[]; isLoading: boolean }) {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-[1520px] px-5 lg:px-9">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black tracking-[-0.045em] text-neutral-950 sm:text-3xl">지금 가장 주목받는 알바</h2>
            <span className="inline-flex h-6 items-center rounded-md border border-slate-200 bg-white px-2 text-xs font-black text-slate-300">AD</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex h-10 items-center gap-1 rounded-full bg-white px-4 text-sm font-black text-slate-500 transition-colors hover:text-slate-900">
              상품안내
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/post-job" className="inline-flex h-10 items-center gap-1 rounded-full bg-white px-4 text-sm font-black text-slate-500 transition-colors hover:text-slate-900">
              신청하기
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => <JobCardSkeleton key={`job-card-skeleton-${index}`} />)
            : jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </section>
  );
}

const Index = ({ cityFilter }: IndexProps) => {
  const meta = cityFilter ? routeMeta[cityFilter] : undefined;
  const [homepageJobCards, setHomepageJobCards] = useState<JobCardItem[]>([]);
  const [isLoadingHomepageJobCards, setIsLoadingHomepageJobCards] = useState(true);

  useSEO({
    title: meta?.title ?? "호주잡스 - 호주 구인구직 | 한인 채용정보",
    description: meta?.description ?? "브랜드 알바, 지역별 알바, 추천 채용정보를 한곳에서 둘러보세요.",
    canonical: meta?.canonical ?? "https://hojujobs.com/",
    keywords: "알바, 구인구직, 브랜드 알바, 채용정보",
    htmlLang: "ko",
    ogLocale: "ko_KR",
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchHomepageJobCards() {
      const { data, error } = await supabase
        .from("homepage_job_cards")
        .select("id, sort_order, logo_text, logo_url, logo_tone, company_label, location_label, title, pay_type, pay_amount, job_url, is_active, created_at, updated_at")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(12);

      if (cancelled) return;

      if (error || !data || data.length === 0) {
        setHomepageJobCards(fallbackJobCards);
        setIsLoadingHomepageJobCards(false);
        return;
      }

      const rawCards = withPinnedCards(data.map(mapHomepageJobCard));
      const companySlugs = [...new Set(rawCards.map((card) => companySlugFromJobUrl(card.jobUrl)).filter(Boolean))];

      if (companySlugs.length === 0) {
        setHomepageJobCards(fallbackJobCards);
        setIsLoadingHomepageJobCards(false);
        return;
      }

      const { data: profiles, error: profilesError } = await supabase
        .from("company_profiles")
        .select("slug")
        .eq("is_active", true)
        .in("slug", companySlugs);

      if (cancelled) return;

      if (profilesError || !profiles || profiles.length === 0) {
        setHomepageJobCards(fallbackJobCards);
        setIsLoadingHomepageJobCards(false);
        return;
      }

      const activeCompanySlugs = new Set(profiles.map((profile) => profile.slug));
      const cards = filterCompanyCards(rawCards, activeCompanySlugs);

      const { data: branches } = await supabase
        .from("company_branches")
        .select("company_slug")
        .eq("is_active", true)
        .in("company_slug", [...activeCompanySlugs]);

      if (cancelled) return;

      const branchCounts = (branches ?? []).reduce<Record<string, number>>((counts, branch) => {
        counts[branch.company_slug] = (counts[branch.company_slug] ?? 0) + 1;
        return counts;
      }, {});

      setHomepageJobCards(applyMultipleBranchLabels(cards, branchCounts));
      setIsLoadingHomepageJobCards(false);
    }

    fetchHomepageJobCards();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-950">
      <ModernHeader />
      <main>
        <section className="mx-auto max-w-[1520px] px-5 py-8 lg:hidden">
          <div className="flex">
            <form className="flex h-12 w-full items-center rounded-full border-2 border-blue-600 bg-white pl-6 pr-5" onSubmit={(event) => event.preventDefault()}>
              <input
                aria-label="알바 검색"
                className="min-w-0 flex-1 bg-transparent text-base font-semibold text-neutral-900 outline-none placeholder:text-slate-400"
                placeholder="어떤 알바를 찾으세요?"
              />
              <Search className="h-6 w-6 text-neutral-300" />
            </form>
          </div>
        </section>
        <QuickSections />
        <LocationSection />
        <FeaturedJobs jobs={homepageJobCards} isLoading={isLoadingHomepageJobCards} />
        <section className="bg-neutral-50 pb-16">
          <div className="mx-auto flex max-w-[1520px] items-center justify-center gap-3 px-5 text-sm font-semibold text-slate-500 lg:px-9">
            <ShieldAlert className="h-4 w-4 text-blue-600" />
            안전한 채용정보를 위해 의심 공고는 고객센터로 알려주세요.
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
