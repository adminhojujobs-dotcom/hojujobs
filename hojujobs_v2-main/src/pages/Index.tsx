import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { BLOG_POSTS } from "@/data/blogPosts";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { UserJobsTable } from "@/components/UserJobsTable";
import { USER_JOB_SELECT, type UserJobRow } from "@/lib/userJobs";
import { EventsCalendarIcon, NewsIcon, SalesTagIcon } from "@/components/icons/PromoIcons";

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

interface PromoItem {
  label: string;
  href: string;
  external?: boolean;
  imageUrl?: string | null;
  meta?: string;
}

interface PromoSection {
  title: string;
  moreHref: string;
  moreExternal?: boolean;
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

const promoSectionVisuals: Record<string, { image: string; tone: string }> = {
  "세일과 할인": { image: "SALE", tone: "bg-cyan-50 text-cyan-700" },
  "호주 생활 뉴스": { image: "ABC", tone: "bg-indigo-50 text-indigo-700" },
  "커뮤니티 이벤트": { image: "JUL", tone: "bg-slate-100 text-slate-700" },
};

const mobileShortcutItems = [
  {
    label: "세일",
    href: "/sales",
    icon: SalesTagIcon,
  },
  {
    label: "뉴스",
    href: "/news",
    icon: NewsIcon,
  },
  {
    label: "이벤트",
    href: "/events",
    icon: EventsCalendarIcon,
  },
];

const promoSectionIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "채용정보": Briefcase,
  "세일과 할인": SalesTagIcon,
  "호주 생활 뉴스": NewsIcon,
  "커뮤니티 이벤트": EventsCalendarIcon,
};

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
    location: normalizeFeaturedLocation(row.location_label),
    title: row.title,
    payType: row.pay_type,
    pay: row.pay_amount,
    jobUrl: row.job_url,
  };
}

function companySlugFromJobUrl(jobUrl?: string | null) {
  return jobUrl?.match(/^\/company\/([^/?#]+)/)?.[1] ?? null;
}

function normalizeFeaturedLocation(location: string) {
  const parts = location.split("·").map((part) => part.trim()).filter(Boolean);
  const visibleParts = parts.filter((part) => part !== "여러 지점");

  return visibleParts.length > 0 ? visibleParts.join(" · ") : location;
}

function applyMultipleBranchLabels(cards: JobCardItem[], branchCounts: Record<string, number>) {
  return cards.map((card) => {
    const slug = companySlugFromJobUrl(card.jobUrl);

    if (!slug || (branchCounts[slug] ?? 0) <= 1) return card;

    return {
      ...card,
      location: normalizeFeaturedLocation(card.location),
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
  location: "NSW",
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
  location: "NSW",
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
  location: "NSW · VIC",
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
  location: "NSW",
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
  location: "NSW",
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
  location: "NSW",
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
  location: "NSW",
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
  location: "NSW",
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

function QuickSectionsSkeleton() {
  return (
    <section className="mx-auto max-w-[1220px] overflow-hidden px-5 pb-10 sm:pb-12 lg:px-9">
      <div className="md:hidden">
        <div className="h-[190px] animate-pulse rounded-2xl bg-slate-100" />
        <div className="mt-5 grid grid-cols-3 gap-3">
          {mobileShortcutItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} to={href} className="flex flex-col items-center gap-1.5 text-sm font-black text-neutral-900">
              <Icon className="h-9 w-9" strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden rounded-sm border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)] md:block">
        <div className="flex items-center gap-7 border-b border-slate-200 px-6">
          {["세일과 할인", "호주 생활 뉴스", "커뮤니티 이벤트"].map((title) => (
            <div key={title} className="py-4">
              <div className="h-7 w-28 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
        <div className="grid h-[268px] grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-8 overflow-hidden px-6 py-7">
          <div className="flex min-h-0 flex-col justify-between">
            {[0, 1].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="h-[84px] w-[104px] shrink-0 animate-pulse rounded-lg bg-slate-100" />
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex min-h-0 flex-col divide-y divide-slate-100">
            {[0, 1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-1 items-center justify-between gap-4 py-3 first:pt-0">
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 border-t border-slate-200 py-4">
          <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
          <div className="h-5 w-36 animate-pulse rounded bg-slate-100" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </section>
  );
}

function QuickSections() {
  const [promoSections, setPromoSections] = useState<PromoSection[]>([]);
  const [isLoadingPromoSections, setIsLoadingPromoSections] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchSaleDeals() {
      const { data, error } = await supabase
        .from("ozbargain_deals")
        .select("rank, title, category, image_url")
        .order("rank", { ascending: true })
        .limit(7);

      if (error || !data || data.length === 0) return null;

      const [top, second, ...rest] = data;
      const visuals = promoSectionVisuals["세일과 할인"];

      return {
        title: "세일과 할인",
        moreHref: "/sales",
        preview: {
          label: top.category,
          title: top.title,
          meta: "딜 보기",
          href: `/sales/${top.rank}`,
          imageUrl: top.image_url,
          ...visuals,
        },
        items: [
          ...(second ? [{ label: second.title, href: `/sales/${second.rank}`, imageUrl: second.image_url, meta: second.category }] : []),
          ...rest.slice(0, 5).map((deal) => ({ label: deal.title, href: `/sales/${deal.rank}`, imageUrl: deal.image_url, meta: deal.category })),
        ],
      } satisfies PromoSection;
    }

    async function fetchNewsArticles() {
      const { data, error } = await supabase
        .from("news_articles")
        .select("title, source_name, source_url, category_label_ko, image_url")
        .eq("show_on_news_page", true)
        .order("sort_order", { ascending: true })
        .order("original_published_at", { ascending: false })
        .limit(7);

      if (error || !data || data.length === 0) return null;

      const [top, second, ...rest] = data;
      const visuals = promoSectionVisuals["호주 생활 뉴스"];

      return {
        title: "호주 생활 뉴스",
        moreHref: "/news",
        preview: {
          label: `${top.source_name} · ${top.category_label_ko}`,
          title: top.title,
          meta: "기사 보기",
          href: translatedNewsUrl(top.source_url),
          external: true,
          imageUrl: top.image_url,
          ...visuals,
        },
        items: [
          ...(second
            ? [{ label: second.title, href: translatedNewsUrl(second.source_url), external: true, imageUrl: second.image_url, meta: second.source_name }]
            : []),
          ...rest.slice(0, 5).map((article) => ({ label: article.title, href: translatedNewsUrl(article.source_url), external: true, imageUrl: article.image_url, meta: article.source_name })),
        ],
      } satisfies PromoSection;
    }

    async function fetchCommunityEvents() {
      const { data, error } = await supabase
        .from("community_events")
        .select("title, organizer, event_date_label, location_label, image_url, source_url")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .limit(7);

      if (error || !data || data.length === 0) return null;

      const [top, second, ...rest] = data;
      const visuals = promoSectionVisuals["커뮤니티 이벤트"];

      return {
        title: "커뮤니티 이벤트",
        moreHref: top.source_url,
        moreExternal: true,
        preview: {
          label: top.location_label ?? top.organizer,
          title: top.title,
          meta: top.event_date_label ?? "자세히 보기",
          href: top.source_url,
          external: true,
          imageUrl: top.image_url,
          ...visuals,
        },
        items: [
          ...(second ? [{ label: second.title, href: second.source_url, external: true, imageUrl: second.image_url, meta: second.organizer }] : []),
          ...rest.slice(0, 5).map((event) => ({ label: event.title, href: event.source_url, external: true, imageUrl: event.image_url, meta: event.organizer })),
        ],
      } satisfies PromoSection;
    }

    async function fetchPromoSections() {
      const sections = await Promise.all([fetchSaleDeals(), fetchNewsArticles(), fetchCommunityEvents()]);

      if (cancelled) return;

      setPromoSections(sections.filter((section): section is PromoSection => Boolean(section)));
      setIsLoadingPromoSections(false);
    }

    fetchPromoSections();

    return () => {
      cancelled = true;
    };
  }, []);

  const visiblePromoSections = promoSections;

  useEffect(() => {
    if (visiblePromoSections.length === 0) return;

    const timer = setInterval(() => {
      setActiveSectionIndex((prev) => (prev + 1) % visiblePromoSections.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [visiblePromoSections.length]);

  useEffect(() => {
    if (activeSectionIndex >= visiblePromoSections.length) {
      setActiveSectionIndex(0);
    }
  }, [activeSectionIndex, visiblePromoSections.length]);

  if (isLoadingPromoSections) {
    return <QuickSectionsSkeleton />;
  }

  if (visiblePromoSections.length === 0) {
    return null;
  }

  const activeSection = visiblePromoSections[activeSectionIndex] ?? visiblePromoSections[0];
  const ActiveSectionIcon = promoSectionIcons[activeSection.title] ?? Briefcase;
  const [firstItem, ...restItems] = activeSection.items;
  const bigPictureItems = [
    {
      title: activeSection.preview.title,
      meta: activeSection.preview.label,
      imageUrl: activeSection.preview.imageUrl,
      href: activeSection.preview.href,
      external: activeSection.preview.external,
    },
    ...(firstItem
      ? [
          {
            title: firstItem.label,
            meta: firstItem.meta,
            imageUrl: firstItem.imageUrl,
            href: firstItem.href,
            external: firstItem.external,
          },
        ]
      : []),
  ];
  const textOnlyItems = restItems;

  const mobileCtaLabels: Record<string, string> = {
    "세일과 할인": "딜 보기",
    "호주 생활 뉴스": "기사 보기",
    "커뮤니티 이벤트": "자세히 보기",
  };

  const allMobileCards = visiblePromoSections.flatMap((section) => {
    const cta = mobileCtaLabels[section.title] ?? "자세히 보기";

    return [
      {
        categoryTitle: section.title,
        label: section.preview.label,
        title: section.preview.title,
        meta: section.preview.meta,
        imageUrl: section.preview.imageUrl,
        image: section.preview.image,
        tone: section.preview.tone,
        href: section.preview.href,
        external: section.preview.external,
      },
      ...section.items.slice(0, 2).map((item) => ({
        categoryTitle: section.title,
        label: item.meta ?? section.title,
        title: item.label,
        meta: cta,
        imageUrl: item.imageUrl,
        image: section.preview.image,
        tone: section.preview.tone,
        href: item.href,
        external: item.external,
      })),
    ];
  });

  return (
    <section className="mx-auto max-w-[1220px] overflow-hidden px-5 pb-10 sm:pb-12 lg:px-9">
      <div className="md:hidden">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-3">
            {allMobileCards.map((card, index) => (
              <CarouselItem key={`${card.categoryTitle}-${index}`} className="basis-[94%] pl-3">
                <PromoLink
                  href={card.href}
                  external={card.external}
                  className={`group relative flex h-[190px] overflow-hidden rounded-2xl ${card.imageUrl ? "bg-slate-900" : card.tone}`}
                >
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-black opacity-25">{card.image}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/75" />
                  <div className="relative flex h-full w-full flex-col p-4 text-white">
                    <span className="w-fit rounded-lg bg-black/35 px-2.5 py-1 text-[0.7rem] font-black backdrop-blur-sm">
                      {card.categoryTitle}
                    </span>
                    <div className="mt-auto">
                      <p className="mb-1.5 line-clamp-1 text-xs font-black text-white/85">{card.label}</p>
                      <h3 className="line-clamp-2 text-base font-black leading-tight tracking-[-0.04em]">
                        {card.title}
                      </h3>
                      <div className="mt-2.5 flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-white">
                          {card.meta}
                          <ExternalLink className="h-3 w-3" />
                        </span>
                        <span className="rounded-full bg-black/45 px-2.5 py-1 text-[0.7rem] font-black backdrop-blur-sm">
                          {index + 1} / {allMobileCards.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </PromoLink>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {mobileShortcutItems.map(({ label, href, icon: Icon }) => (
            <Link key={label} to={href} className="flex flex-col items-center gap-1.5 text-sm font-black text-neutral-900">
              <Icon className="h-9 w-9" strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden rounded-sm border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)] md:block">
        <div className="flex items-center gap-7 border-b border-slate-200 px-6">
          {visiblePromoSections.map(({ title }, index) => (
            <button
              key={title}
              type="button"
              onClick={() => setActiveSectionIndex(index)}
              className={`border-b-2 py-4 text-lg font-black tracking-[-0.03em] transition-colors ${
                index === activeSectionIndex
                  ? "border-blue-600 text-neutral-950"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="grid h-[268px] grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-8 overflow-hidden px-6 py-7">
          <div className="flex min-h-0 flex-col justify-between">
            {bigPictureItems.map((item, index) => (
              <PromoLink
                key={`${activeSection.title}-big-${index}`}
                href={item.href}
                external={item.external}
                className="group flex min-w-0 items-center gap-4"
              >
                <div className={`h-[84px] w-[104px] shrink-0 overflow-hidden rounded-lg ${activeSection.preview.tone}`}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ActiveSectionIcon className="h-7 w-7" strokeWidth={1.8} />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-black leading-snug tracking-[-0.02em] text-neutral-950 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  {item.meta && <p className="mt-1.5 line-clamp-1 text-xs font-bold text-slate-400">{item.meta}</p>}
                </div>
              </PromoLink>
            ))}
          </div>

          <div className="flex min-h-0 flex-col divide-y divide-slate-100">
            {textOnlyItems.map((item, index) => (
              <PromoLink
                key={`${activeSection.title}-text-${index}`}
                href={item.href}
                external={item.external}
                className="group flex min-w-0 flex-1 items-center justify-between gap-4 py-3 first:pt-0"
              >
                <span className="line-clamp-1 text-sm font-bold text-slate-800 group-hover:text-blue-700">{item.label}</span>
                {item.meta && <span className="shrink-0 text-xs font-bold text-slate-400">· {item.meta}</span>}
              </PromoLink>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[2.25rem_13rem_2.25rem] items-center justify-center gap-4 border-t border-slate-200 py-4">
          <button
            type="button"
            onClick={() => setActiveSectionIndex((activeSectionIndex - 1 + visiblePromoSections.length) % visiblePromoSections.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-neutral-950"
            aria-label="이전 카테고리"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <PromoLink href={activeSection.moreHref} external={activeSection.moreExternal} className="truncate text-center text-sm font-bold text-slate-500 hover:text-blue-700">
            <span className="font-black text-neutral-950">{activeSection.title}</span> 더보기 {activeSectionIndex + 1}/{visiblePromoSections.length}
          </PromoLink>
          <button
            type="button"
            onClick={() => setActiveSectionIndex((activeSectionIndex + 1) % visiblePromoSections.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-neutral-950"
            aria-label="다음 카테고리"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function JobCard({ job }: { job: JobCardItem }) {
  const mutedPay = job.payType === "￦";
  const logoColorClass = logoToneClasses[job.logoTone] ?? logoToneClasses.blue;

  return (
    <Link to={job.jobUrl ?? "/"} className="group flex min-h-[250px] flex-col rounded-xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:min-h-[240px] sm:rounded-2xl sm:px-7 sm:py-8 sm:shadow-none">
      <div className="mb-6 flex h-10 items-start justify-start sm:mb-7 sm:h-12">
        {job.logoUrl ? (
          <img src={job.logoUrl} alt={`${job.company} logo`} className="max-h-10 max-w-[7rem] object-contain object-left sm:max-h-12 sm:max-w-[9rem]" />
        ) : (
          <span className={`whitespace-pre-line text-sm font-black leading-none sm:text-base ${logoColorClass}`}>{job.logo}</span>
        )}
      </div>
      <p className="mb-3 truncate text-[0.7rem] font-semibold text-slate-500 sm:text-xs">
        {job.company}<span className="mx-1 text-slate-300">·</span>{job.location}
      </p>
      <h3 className="line-clamp-3 min-h-[64px] text-[0.92rem] font-black leading-[1.35] tracking-[-0.04em] text-neutral-950 sm:line-clamp-2 sm:min-h-[58px] sm:text-[1.2rem]">
        {job.title}
      </h3>
      <div className="mt-auto flex items-center justify-between pt-8">
        <p className="truncate text-[0.72rem] font-black sm:text-sm">
          <span className={mutedPay ? "text-slate-400" : job.payType === "월급" ? "text-blue-600" : "text-sky-500"}>{job.payType}</span>
          <span className="ml-1 text-slate-500">{job.pay}</span>
        </p>
        <span className="hidden text-2xl font-light text-slate-400 transition-colors group-hover:text-blue-600 sm:inline">+</span>
      </div>
    </Link>
  );
}

function JobCardSkeleton() {
  return (
    <div className="flex min-h-[250px] flex-col rounded-xl bg-white px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:min-h-[240px] sm:rounded-2xl sm:px-7 sm:py-8 sm:shadow-none">
      <div className="mb-6 h-10 w-28 rounded-md bg-slate-100 sm:mb-7 sm:h-12 sm:w-36" />
      <div className="mb-2 h-4 w-full rounded bg-slate-100 sm:mb-3 sm:h-5 sm:w-48" />
      <div className="space-y-3">
        <div className="h-5 w-full rounded bg-slate-100 sm:h-6" />
        <div className="h-5 w-4/5 rounded bg-slate-100 sm:h-6" />
      </div>
      <div className="mt-auto h-4 w-28 rounded bg-slate-100 sm:h-5 sm:w-40" />
    </div>
  );
}

const HOMEPAGE_USER_JOBS_LIMIT = 10;

function UserUploadedJobs() {
  const [jobs, setJobs] = useState<UserJobRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUserJobs() {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError, count } = await supabase
        .from("jobs")
        .select(USER_JOB_SELECT, { count: "exact" })
        .lte("uploaded_at", new Date().toISOString())
        .order("uploaded_at", { ascending: false })
        .limit(HOMEPAGE_USER_JOBS_LIMIT);

      if (cancelled) return;

      if (fetchError) {
        console.error("homepage jobs fetch error:", fetchError);
        setError("공고를 불러오지 못했습니다.");
        setJobs([]);
        setTotalCount(0);
      } else {
        setJobs((data ?? []) as UserJobRow[]);
        setTotalCount(count ?? data?.length ?? 0);
      }

      setIsLoading(false);
    }

    fetchUserJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-12 sm:py-14 lg:px-9">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">방금 등록된 공고</h2>
        <Link
          to="/jobs"
          aria-label="더 많은 방금 등록된 공고 보기"
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-500 transition-colors hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:py-2 sm:text-sm"
        >
          <span>더보기</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div>
        <UserJobsTable jobs={jobs} loading={isLoading} error={error} showContact={false} plainTitle variant="albamon" />
      </div>
    </section>
  );
}

function FeaturedJobs({ jobs, isLoading }: { jobs: JobCardItem[]; isLoading: boolean }) {
  return (
    <section className="bg-neutral-50 py-12 sm:py-14">
      <div className="mx-auto max-w-[1220px] px-5 lg:px-9">
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">
              <span className="sm:hidden">지금 가장 주목받는 알바</span>
              <span className="hidden sm:inline">지금 가장 주목받는 알바</span>
            </h2>
          </div>
          <Link
            to="/directory"
            aria-label="더 많은 채용정보 보기"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-500 transition-colors hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span>더보기</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <JobCardSkeleton key={`job-card-skeleton-${index}`} />)
            : jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </section>
  );
}

const GUIDES_PREVIEW_COUNT = 4;

function WorkingHolidayGuides() {
  const guidePosts = BLOG_POSTS.slice(0, GUIDES_PREVIEW_COUNT);

  return (
    <section className="border-t border-slate-100 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-[1220px] px-5 lg:px-9">
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <h2 className="text-lg font-black tracking-[-0.04em] text-neutral-950 sm:text-xl">워홀러에게 필요한 추천 콘텐츠</h2>
          <Link
            to="/blog"
            aria-label="더 많은 추천 콘텐츠 보기"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-500 transition-colors hover:border-blue-200 hover:text-blue-700 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span>더보기</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {guidePosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={`group min-w-0 ${index >= 2 ? "hidden sm:block" : ""}`}
            >
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-white">
                <img src={post.imageSrc} alt={post.imageAlt} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="pt-3">
                <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-[-0.035em] text-neutral-950">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
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
      <main className="pt-8 md:pt-10">
        <QuickSections />
        <FeaturedJobs jobs={homepageJobCards} isLoading={isLoadingHomepageJobCards} />
        <UserUploadedJobs />
        <WorkingHolidayGuides />
      </main>
    </div>
  );
};

export default Index;
