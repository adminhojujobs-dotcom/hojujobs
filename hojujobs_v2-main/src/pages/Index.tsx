import { useState, useMemo, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Home, Newspaper, Search, ChevronDown, ShoppingBag } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileLocationFilter } from "@/components/MobileLocationFilter";
import { MobileIndustryFilter } from "@/components/MobileIndustryFilter";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { JobCard } from "@/components/JobCard";
import { PromotedJobCard } from "@/components/PromotedJobCard";
import { Pagination } from "@/components/Pagination";
import { CategorySidebar } from "@/components/CategorySidebar";
import { fetchViewCountsByJobIds, useViewCounts } from "@/hooks/useViewCounts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { REGION_GROUPS, SUBURB_EN } from "@/data/regionMap";
import { useSEO } from "@/hooks/useSEO";
import { clearListingCaches } from "@/lib/listingCache";
import { trackEvent } from "@/lib/trackEvent";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 50;
const VISIBLE_JOB_DAYS = 6;
const LISTING_CACHE_TTL_MS = 5 * 60 * 1000;
const LISTING_CACHE_VERSION = 13;
const LISTING_REQUEST_TIMEOUT_MS = 15_000;
const SALE_PROMO_TIMEOUT_MS = 5_000;
const FILTER_METADATA_TIMEOUT_MS = 5_000;
const FILTER_METADATA_PAGE_SIZE = 1000;
const VIEWS_SORT_PAGE_SIZE = 1000;
const VIEWS_SORT_MAX_JOBS = 5000;
const PROMO_CITY_FILTERS = new Set(["NSW", "VIC", "QLD"]);
const SALE_PROMO_POOL_LIMIT = 10;
const SALE_PROMO_VISIBLE_COUNT = 2;
const SALE_PROMO_ROTATE_MS = 4500;
const FLATMATE_PROMO_POOL_LIMIT = 10;
const NEWS_PROMO_CANDIDATE_LIMIT = 24;
const NEWS_PROMO_HEADLINE_LIMIT = 3;
const SALE_PROMO_CACHE_KEY = "hoju_sale_promo_cache";
const DEFAULT_SELECTED_LOCATIONS: string[] = [];

type SortOption = "recent" | "views";

interface Job {
  id: number;
  title: string;
  location: string[];
  industry: string;
  uploaded_at: string;
  image_url?: string | null;
  Promoted?: boolean | null;
  user_id?: string | null;
}

interface JobFilterMeta {
  location: string[];
  industry: string;
}

interface SalePromoDeal {
  rank: number;
  title: string;
  category: string;
  imageUrl?: string;
}

interface FlatmatePromoListing {
  id: number;
  title: string | null;
  suburb: string | null;
  price: number | null;
  imageUrl?: string;
  photoUrls: string[];
  privateRoom: boolean | null;
  privateBathroom: boolean | null;
  genderRestriction: string | null;
}

interface NewsPromoArticle {
  id: number;
  title: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string | null;
  imageUrl: string | null;
  categoryKey: string;
}

interface SalePromoCache {
  version: number;
  deals: SalePromoDeal[];
  cachedAt: number;
}

const CITY_META: Record<string, { title: string; description: string; canonical: string; h1: string; tagline: string; keywords: string }> = {
  NSW: {
    title: "호주잡스 - 시드니 한인 구인구직",
    description: "시드니 한인 구인구직 게시판. 시드니 전 지역 한인 채용정보를 찾아보세요.",
    canonical: "https://hojujobs.com/sydney",
    h1: "시드니 한인 구인구직",
    tagline: "시드니 전 지역 한인 채용정보",
    keywords: "시드니 구인구직, 시드니 한인 구인, 시드니 구인, Sydney Korean jobs, 시드니 취업",
  },
  VIC: {
    title: "호주잡스 - 멜버른 한인 구인구직",
    description: "멜버른 한인 구인구직 게시판. 멜버른 전 지역 한인 채용정보를 찾아보세요.",
    canonical: "https://hojujobs.com/melbourne",
    h1: "멜버른 한인 구인구직",
    tagline: "멜버른 CBD, 글렌 웨이벌리, 박스힐 등 전 지역 한인 채용정보",
    keywords: "멜버른 구인구직, 멜번 한인 구인, 멜버른 구인, Melbourne Korean jobs, 멜번 취업",
  },
  QLD: {
    title: "호주잡스 - 브리즈번 한인 구인구직",
    description: "브리즈번 한인 구인구직 게시판. 브리즈번 전 지역 한인 채용정보를 찾아보세요.",
    canonical: "https://hojujobs.com/brisbane",
    h1: "브리즈번 한인 구인구직",
    tagline: "브리즈번 CBD, 골드코스트 등 전 지역 한인 채용정보",
    keywords: "브리즈번 구인구직, 브리즈번 한인 구인, Brisbane Korean jobs, 브리즈번 취업",
  },
  SA: {
    title: "호주잡스 - 애들레이드 한인 구인구직",
    description: "애들레이드 한인 구인구직 게시판. 애들레이드 전 지역 한인 채용정보를 찾아보세요.",
    canonical: "https://hojujobs.com/adelaide",
    h1: "애들레이드 한인 구인구직",
    tagline: "애들레이드 전 지역 한인 채용정보",
    keywords: "애들레이드 구인구직, 애들레이드 한인 구인, Adelaide Korean jobs, 애들레이드 취업",
  },
};

const DEFAULT_META = {
  title: "호주잡스 - 호주 구인구직 | 한인 채용정보",
  description: "호주 구인구직 게시판. 호주 잡스에서 시드니·멜번·브리즈번·애들레이드 최신 한인 채용정보를 찾아보세요.",
  canonical: "https://hojujobs.com/",
  h1: "호주 구인구직",
  tagline: "시드니·멜번·브리즈번·애들레이드 최신 한인 채용정보",
  keywords: "호주 구인구직, 호주 잡스, 호주잡스, 호주 한인 구인구직, 호주 구인, 시드니 구인, 멜번 구인, 브리즈번 구인, Korean jobs Australia, 호주 취업, 워홀 구인",
};

function getCityLocations(state: string) {
  const suburbSet = new Set<string>();

  REGION_GROUPS
    .filter((group) => group.state === state)
    .forEach((group) => {
      group.suburbs.forEach((suburb) => suburbSet.add(suburb));
    });

  Object.entries(SUBURB_EN).forEach(([suburb, englishName]) => {
    if (englishName.endsWith(` ${state}`)) {
      suburbSet.add(suburb);
    }
  });

  return [...suburbSet];
}

function mergeJobsById(...groups: Job[][]) {
  const seen = new Set<number>();
  const merged: Job[] = [];

  groups.flat().forEach((job) => {
    if (!seen.has(job.id)) {
      seen.add(job.id);
      merged.push(job);
    }
  });

  return merged;
}

function translatedNewsUrl(url: string) {
  return `https://translate.google.com/translate?sl=auto&tl=ko&u=${encodeURIComponent(url)}`;
}

function flatmatePromoTags(listing: FlatmatePromoListing) {
  const tags: string[] = [];

  if (listing.privateRoom === true) tags.push("독방");
  if (listing.privateRoom === false) tags.push("쉐어룸");
  if (listing.privateBathroom === true) tags.push("개인욕실");
  if (listing.genderRestriction === "female_only") tags.push("여성전용");
  if (listing.genderRestriction === "male_only") tags.push("남성전용");

  return tags.slice(0, 3);
}

function flatmatePromoPhotos(imageUrl?: string, postPhoto?: string[] | null) {
  return [
    imageUrl,
    ...(Array.isArray(postPhoto) ? postPhoto : []),
  ].filter((photo): photo is string => Boolean(photo?.trim()));
}

function FlatmatePromoImage({ listing }: { listing: FlatmatePromoListing }) {
  const uniquePhotos = useMemo(() => [...new Set(listing.photoUrls)], [listing.photoUrls]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentPhoto = uniquePhotos[photoIndex];

  useEffect(() => {
    setPhotoIndex(0);
  }, [listing.id]);

  if (!currentPhoto) return null;

  return (
    <img
      src={currentPhoto}
      alt={listing.title ?? "플렛메이트 렌트"}
      className="h-full w-full object-cover"
      onError={() => {
        setPhotoIndex((index) => (index + 1 < uniquePhotos.length ? index + 1 : index));
      }}
    />
  );
}

function selectNewsPromoHeadlines(articles: NewsPromoArticle[]) {
  const featured = articles[0];
  const usedCategories = new Set<string>();
  if (featured?.categoryKey) usedCategories.add(featured.categoryKey);

  const categoryDiverseHeadlines = articles.slice(1).filter((article) => {
    if (usedCategories.has(article.categoryKey)) return false;
    usedCategories.add(article.categoryKey);
    return true;
  });

  if (categoryDiverseHeadlines.length >= NEWS_PROMO_HEADLINE_LIMIT) {
    return categoryDiverseHeadlines.slice(0, NEWS_PROMO_HEADLINE_LIMIT);
  }

  const selectedIds = new Set(categoryDiverseHeadlines.map((article) => article.id));
  const fallbackHeadlines = articles
    .slice(1)
    .filter((article) => !selectedIds.has(article.id))
    .slice(0, NEWS_PROMO_HEADLINE_LIMIT - categoryDiverseHeadlines.length);

  return [...categoryDiverseHeadlines, ...fallbackHeadlines];
}

function matchesAnyLocation(locations: string[], locationSet: Set<string>) {
  return locations.some((location) => locationSet.has(location));
}

interface ListingCache {
  version: number;
  jobsData: Job[];
  filterJobs: JobFilterMeta[];
  totalJobsCount: number | null;
  counts: Record<number, number>;
  cachedAt: number;
}

function readListingCache(key: string): ListingCache | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ListingCache;
    const hasStalePromotedImages = parsed.jobsData.some((job) => job.Promoted === true && !("image_url" in job));
    if (
      parsed.version !== LISTING_CACHE_VERSION ||
      !parsed.cachedAt ||
      Date.now() - parsed.cachedAt > LISTING_CACHE_TTL_MS ||
      hasStalePromotedImages
    ) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeListingCache(key: string, cache: Omit<ListingCache, "cachedAt" | "version">) {
  try {
    sessionStorage.setItem(key, JSON.stringify({
      ...cache,
      version: LISTING_CACHE_VERSION,
      cachedAt: Date.now(),
    }));
  } catch {
    // Session storage may be unavailable in private or restricted browser contexts.
  }
}

function readSessionViewCount(jobId: number): number | null {
  const raw = sessionStorage.getItem(`hoju_job_view_count_${jobId}`);
  if (raw === null) return null;

  const cached = Number(raw);
  return Number.isFinite(cached) ? cached : null;
}

function mergeSessionViewCounts(counts: Record<number, number>, jobs: Pick<Job, "id">[]) {
  const nextCounts = { ...counts };

  jobs.forEach((job) => {
    const cached = readSessionViewCount(job.id);
    if (cached !== null) nextCounts[job.id] = Math.max(nextCounts[job.id] ?? 0, cached);
  });

  return nextCounts;
}

function readSalePromoCache(): SalePromoDeal[] | null {
  try {
    const raw = sessionStorage.getItem(SALE_PROMO_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SalePromoCache;
    if (parsed.version !== LISTING_CACHE_VERSION || !parsed.cachedAt || Date.now() - parsed.cachedAt > LISTING_CACHE_TTL_MS) {
      sessionStorage.removeItem(SALE_PROMO_CACHE_KEY);
      return null;
    }

    return parsed.deals;
  } catch {
    return null;
  }
}

function writeSalePromoCache(deals: SalePromoDeal[]) {
  try {
    sessionStorage.setItem(SALE_PROMO_CACHE_KEY, JSON.stringify({
      version: LISTING_CACHE_VERSION,
      deals,
      cachedAt: Date.now(),
    }));
  } catch {
    // Session storage may be unavailable in private or restricted browser contexts.
  }
}

function listingCacheKey({
  cityFilter,
  page,
  keyword,
  selectedLocations,
  industry,
  sortBy,
}: {
  cityFilter?: string;
  page: number;
  keyword: string;
  selectedLocations: string[];
  industry: string;
  sortBy: SortOption;
}) {
  const payload = {
    cityFilter: cityFilter ?? "all",
    page,
    keyword: keyword.trim().toLowerCase(),
    selectedLocations: [...selectedLocations].sort(),
    industry,
    sortBy,
  };

  return `hoju_listing_cache_${encodeURIComponent(JSON.stringify(payload))}`;
}

function removeJobFromListingCaches(jobId: number) {
  try {
    Object.keys(sessionStorage).forEach((key) => {
      if (!key.startsWith("hoju_listing_cache_")) return;

      const cached = readListingCache(key);
      if (!cached) return;

      const nextJobs = cached.jobsData.filter((job) => job.id !== jobId);
      const nextCounts = { ...cached.counts };
      delete nextCounts[jobId];

      sessionStorage.setItem(key, JSON.stringify({
        ...cached,
        jobsData: nextJobs,
        totalJobsCount: cached.totalJobsCount === null ? null : Math.max(0, cached.totalJobsCount - 1),
        counts: nextCounts,
        cachedAt: Date.now(),
      }));
    });
    sessionStorage.removeItem(`hoju_job_view_count_${jobId}`);
  } catch {
    // Session storage may be unavailable in private or restricted browser contexts.
  }
}

function isBrowserReload() {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return navigation?.type === "reload";
}

function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = LISTING_REQUEST_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Listing request timed out"));
    }, timeoutMs);

    Promise.resolve(promise)
      .then(resolve, reject)
      .finally(() => window.clearTimeout(timeoutId));
  });
}

function highlightPrices(value: string) {
  const pricePattern = /(?:A\$|\$)\d[\d,]*(?:\.\d{1,2})?/g;
  const parts: Array<string | JSX.Element> = [];
  let lastIndex = 0;

  for (const match of value.matchAll(pricePattern)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      parts.push(value.slice(lastIndex, matchIndex));
    }
    parts.push(
      <span key={`${match[0]}-${matchIndex}`} className="font-bold text-emerald-700">
        {match[0]}
      </span>
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }

  return parts.length > 0 ? parts : value;
}

function formatRent(price: number | null) {
  if (typeof price !== "number") return "문의";
  return `$${new Intl.NumberFormat("en-AU").format(price)}`;
}

interface IndexProps {
  cityFilter?: string;
}

let didClearListingCacheForDocumentReload = false;

const Index = ({ cityFilter }: IndexProps) => {
  const filterKey = cityFilter ? `hoju_filters_${cityFilter}` : "hoju_filters";

  const saved = useMemo(() => {
    try {
      const raw = sessionStorage.getItem(filterKey);
      if (raw) return JSON.parse(raw);
    } catch {
      // Ignore malformed saved filters and fall back to defaults.
    }
    return null;
  }, [filterKey]);

  const initialKeyword = saved?.keyword ?? "";
  const initialSelectedLocations = Array.isArray(saved?.locations) ? saved.locations : DEFAULT_SELECTED_LOCATIONS;
  const initialIndustry = saved?.industry ?? "all";
  const initialPage = saved?.page ?? 1;
  const initialSortBy = saved?.sortBy ?? "recent";
  const initialListingCache = useMemo(() => {
    if (isBrowserReload() && !didClearListingCacheForDocumentReload) return null;

    return readListingCache(listingCacheKey({
      cityFilter,
      page: initialPage,
      keyword: initialKeyword,
      selectedLocations: initialSelectedLocations,
      industry: initialIndustry,
      sortBy: initialSortBy,
    }));
  }, [cityFilter, initialIndustry, initialKeyword, initialPage, initialSelectedLocations, initialSortBy]);
  const initialSalePromoDeals = useMemo(() => readSalePromoCache() ?? [], []);

  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialSelectedLocations);
  const [industry, setIndustry] = useState(initialIndustry);
  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);
  const [jobsData, setJobsData] = useState<Job[]>(initialListingCache?.jobsData ?? []);
  const [filterJobs, setFilterJobs] = useState<JobFilterMeta[]>(initialListingCache?.filterJobs ?? []);
  const [loadingJobs, setLoadingJobs] = useState(!initialListingCache);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [totalJobsCount, setTotalJobsCount] = useState<number | null>(initialListingCache?.totalJobsCount ?? null);
  const [salePromoDeals, setSalePromoDeals] = useState<SalePromoDeal[]>(initialSalePromoDeals);
  const [salePromoPage, setSalePromoPage] = useState(0);
  const [flatmatePromoListings, setFlatmatePromoListings] = useState<FlatmatePromoListing[]>([]);
  const [newsPromoArticles, setNewsPromoArticles] = useState<NewsPromoArticle[]>([]);
  const [loadingSalePromoDeals, setLoadingSalePromoDeals] = useState(initialSalePromoDeals.length === 0);
  const [loadingFlatmatePromoListings, setLoadingFlatmatePromoListings] = useState(true);
  const [loadingNewsPromoArticles, setLoadingNewsPromoArticles] = useState(true);
  const [retryNonce, setRetryNonce] = useState(0);

  const { counts, getCount, hydrateCounts } = useViewCounts(initialListingCache?.counts ?? {});
  const { isAdmin } = useAuth();

  const meta = cityFilter ? (CITY_META[cityFilter] ?? DEFAULT_META) : DEFAULT_META;

  useSEO({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    keywords: meta.keywords,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    jsonLd: cityFilter ? {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: meta.title,
      url: meta.canonical,
      description: meta.description,
      inLanguage: "ko",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://hojujobs.com/#website",
        name: "Hoju Jobs",
        url: "https://hojujobs.com/",
      },
    } : {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://hojujobs.com/#website",
          name: "Hoju Jobs",
          alternateName: ["호주잡스", "호주 잡스", "호주 구인구직", "호주 한인 구인구직"],
          url: "https://hojujobs.com/",
          description: meta.description,
          inLanguage: "ko",
        },
        {
          "@type": "Organization",
          "@id": "https://hojujobs.com/#organization",
          name: "Hoju Jobs",
          alternateName: ["호주잡스", "호주 잡스", "호주 구인구직"],
          url: "https://hojujobs.com/",
          logo: { "@type": "ImageObject", url: "https://hojujobs.com/favicon.png" },
          description: "호주 한인 커뮤니티 구인구직 게시판. 시드니, 멜번, 브리즈번 등 호주 전역 한인 채용정보.",
          contactPoint: { "@type": "ContactPoint", email: "admin.hojujobs@gmail.com", contactType: "customer support" },
        },
      ],
    },
  });

  useEffect(() => {
    if (isBrowserReload() && !didClearListingCacheForDocumentReload) {
      didClearListingCacheForDocumentReload = true;
      clearListingCaches();
      sessionStorage.removeItem("hoju_scroll_y");
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(filterKey, JSON.stringify({
      keyword, locations: selectedLocations, industry, page, sortBy,
    }));
  }, [filterKey, keyword, selectedLocations, industry, page, sortBy]);

  useEffect(() => {
    const hydrateVisibleCounts = () => {
      if (jobsData.length === 0) return;
      hydrateCounts(mergeSessionViewCounts({}, jobsData));
    };

    window.addEventListener("pageshow", hydrateVisibleCounts);
    window.addEventListener("focus", hydrateVisibleCounts);

    return () => {
      window.removeEventListener("pageshow", hydrateVisibleCounts);
      window.removeEventListener("focus", hydrateVisibleCounts);
    };
  }, [jobsData, hydrateCounts]);

  const filterTrackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstFilterRender = useRef(true);
  const [flatmateManualScroll, setFlatmateManualScroll] = useState(false);
  const flatmateOuterRef = useRef<HTMLDivElement | null>(null);
  const flatmateTrackRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }
    if (filterTrackTimerRef.current) clearTimeout(filterTrackTimerRef.current);
    filterTrackTimerRef.current = setTimeout(() => {
      if (keyword.trim()) {
        trackEvent("search_performed", {
          listing_type: "job",
          metadata: {
            search_keyword: keyword.trim(),
            suburb: selectedLocations.join(", ") || undefined,
            category: industry !== "all" ? industry : undefined,
            city_filter: cityFilter ?? undefined,
          },
        });
      } else {
        trackEvent("filter_changed", {
          listing_type: "job",
          metadata: {
            selected_filters: {
              locations: selectedLocations,
              industry: industry !== "all" ? industry : undefined,
              sort_by: sortBy,
            },
            city_filter: cityFilter ?? undefined,
          },
        });
      }
    }, 1500);
    return () => { if (filterTrackTimerRef.current) clearTimeout(filterTrackTimerRef.current); };
  }, [keyword, selectedLocations, industry, sortBy]);

  useEffect(() => {
    let cancelled = false;
    const cachedDeals = readSalePromoCache();

    async function fetchSalePromoDeals() {
      if (!cachedDeals) {
        setLoadingSalePromoDeals(true);
      }

      const { data, error } = await withTimeout(
        supabase
          .from("ozbargain_deals")
          .select("rank, title, category, image_url")
          .lte("rank", SALE_PROMO_POOL_LIMIT)
          .order("rank", { ascending: true })
          .limit(SALE_PROMO_POOL_LIMIT),
        SALE_PROMO_TIMEOUT_MS
      );

      if (cancelled) return;

      if (error) {
        console.error("sale promo deals fetch error:", error);
        if (!cachedDeals) {
          setSalePromoDeals([]);
        }
        setLoadingSalePromoDeals(false);
        return;
      }

      const nextDeals = (data ?? []).map((deal) => ({
        rank: deal.rank,
        title: deal.title,
        category: deal.category,
        imageUrl: deal.image_url ?? undefined,
      }));
      setSalePromoPage(0);
      setSalePromoDeals(nextDeals);
      writeSalePromoCache(nextDeals);
      setLoadingSalePromoDeals(false);
    }

    if (cachedDeals) {
      setSalePromoDeals(cachedDeals);
      setLoadingSalePromoDeals(false);
    }
    fetchSalePromoDeals().catch((error) => {
      if (cancelled) return;
      console.error("sale promo deals fetch failed:", error);
      if (!cachedDeals) {
        setSalePromoDeals([]);
      }
      setLoadingSalePromoDeals(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(salePromoDeals.length / SALE_PROMO_VISIBLE_COUNT);
    if (totalPages <= 1) return;

    const intervalId = window.setInterval(() => {
      setSalePromoPage((page) => (page + 1) % totalPages);
    }, SALE_PROMO_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [salePromoDeals.length]);


  useEffect(() => {
    let cancelled = false;

    async function fetchFlatmatePromoListings() {
      setLoadingFlatmatePromoListings(true);

      const { data, error } = await withTimeout(
        supabase
          .from("hojunara_realestate_share")
          .select("id, title, suburb, price, image_url, post_photo, private_room, private_bathroom, gender_restriction, time_posted")
          .order("time_posted", { ascending: false })
          .limit(FLATMATE_PROMO_POOL_LIMIT),
        SALE_PROMO_TIMEOUT_MS
      );

      if (cancelled) return;

      if (error) {
        console.error("flatmate promo listings fetch error:", error);
        setFlatmatePromoListings([]);
        setLoadingFlatmatePromoListings(false);
        return;
      }

      setFlatmatePromoListings((data ?? []).map((listing) => ({
        id: listing.id,
        title: listing.title,
        suburb: listing.suburb,
        price: listing.price,
        imageUrl: listing.image_url ?? undefined,
        photoUrls: flatmatePromoPhotos(listing.image_url ?? undefined, listing.post_photo),
        privateRoom: listing.private_room,
        privateBathroom: listing.private_bathroom,
        genderRestriction: listing.gender_restriction,
      })));
      setLoadingFlatmatePromoListings(false);
    }

    fetchFlatmatePromoListings().catch((error) => {
      if (cancelled) return;
      console.error("flatmate promo listings fetch failed:", error);
      setFlatmatePromoListings([]);
      setLoadingFlatmatePromoListings(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchNewsPromoArticles() {
      setLoadingNewsPromoArticles(true);

      const newsSelect = "id, title, source_name, source_url, published_at_label_ko, original_published_at, sort_order, image_url, category_key";
      const { data, error } = await withTimeout(
        supabase
          .from("news_articles")
          .select(newsSelect)
          .eq("show_on_news_page", true)
          .order("sort_order", { ascending: true })
          .order("original_published_at", { ascending: false })
          .limit(NEWS_PROMO_CANDIDATE_LIMIT),
        SALE_PROMO_TIMEOUT_MS
      );

      if (cancelled) return;

      if (error) {
        console.error("news promo articles fetch error:", error);
        setNewsPromoArticles([]);
        setLoadingNewsPromoArticles(false);
        return;
      }

      setNewsPromoArticles((data ?? []).map((article) => ({
        id: article.id,
        title: article.title,
        sourceName: article.source_name,
        sourceUrl: article.source_url,
        publishedAt: article.published_at_label_ko,
        imageUrl: article.image_url ?? null,
        categoryKey: article.category_key,
      })));
      setLoadingNewsPromoArticles(false);
    }

    fetchNewsPromoArticles().catch((error) => {
      if (cancelled) return;
      console.error("news promo articles fetch failed:", error);
      setNewsPromoArticles([]);
      setLoadingNewsPromoArticles(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - VISIBLE_JOB_DAYS);

    const cityLocations = cityFilter ? getCityLocations(cityFilter) : [];
    const cityLocationSet = new Set(cityLocations);
    const shouldFilterCityOnClient = !!cityFilter;

    function matchesCity(job: Pick<Job, "location"> | JobFilterMeta) {
      return cityLocationSet.size === 0 || matchesAnyLocation(job.location, cityLocationSet);
    }

    function buildJobsQuery(from: number, to: number, withCount = false, applyCityFilter = true) {
      let query = supabase
        .from("jobs")
        .select("id, title, location, industry, uploaded_at, image_url, Promoted, user_id", withCount ? { count: "exact" } : undefined)
        .or("Promoted.is.null,Promoted.eq.false")
        .gte("uploaded_at", cutoff.toISOString())
        .lte("uploaded_at", new Date().toISOString());

      if (applyCityFilter && cityLocations.length > 0) {
        query = query.overlaps("location", cityLocations);
      }

      if (selectedLocations.length > 0) {
        query = query.overlaps("location", selectedLocations);
      }

      if (industry !== "all") {
        query = query.eq("industry", industry);
      }

      const trimmedKeyword = keyword.trim();
      if (trimmedKeyword) {
        query = query.ilike("title", `%${trimmedKeyword.replace(/[%_]/g, "\\$&")}%`);
      }

      return query.order("uploaded_at", { ascending: false }).range(from, to);
    }

    function buildPromotedJobsQuery() {
      let query = supabase
        .from("jobs")
        .select("id, title, location, industry, uploaded_at, image_url, Promoted, user_id")
        .eq("Promoted", true)
        .gte("uploaded_at", cutoff.toISOString())
        .lte("uploaded_at", new Date().toISOString());

      if (cityLocations.length > 0 && !PROMO_CITY_FILTERS.has(cityFilter ?? "")) {
        query = query.overlaps("location", cityLocations);
      }

      return query.order("uploaded_at", { ascending: false });
    }

    function buildFilterJobsQuery(from: number, to: number, applyCityFilter = true) {
      let query = supabase
        .from("jobs")
        .select("location, industry")
        .or("Promoted.is.null,Promoted.eq.false")
        .gte("uploaded_at", cutoff.toISOString())
        .lte("uploaded_at", new Date().toISOString());

      if (applyCityFilter && cityLocations.length > 0) {
        query = query.overlaps("location", cityLocations);
      }

      const trimmedKeyword = keyword.trim();
      if (trimmedKeyword) {
        query = query.ilike("title", `%${trimmedKeyword.replace(/[%_]/g, "\\$&")}%`);
      }

      return query.order("uploaded_at", { ascending: false }).range(from, to);
    }

    async function fetchFilterJobs() {
      let from = 0;
      let all: JobFilterMeta[] = [];

      while (true) {
        const { data, error } = await withTimeout(
          buildFilterJobsQuery(from, from + FILTER_METADATA_PAGE_SIZE - 1, !shouldFilterCityOnClient),
          FILTER_METADATA_TIMEOUT_MS
        );

        if (error) {
          console.error("filter jobs fetch error:", error);
          return all;
        }

        const batch = (data as unknown as JobFilterMeta[]) || [];
        if (batch.length === 0) break;

        all = all.concat(shouldFilterCityOnClient ? batch.filter(matchesCity) : batch);
        if (batch.length < FILTER_METADATA_PAGE_SIZE) break;
        from += FILTER_METADATA_PAGE_SIZE;
      }

      return all;
    }

    async function fetchAllMatchingJobs() {
      let nextFrom = 0;
      let allJobs: Job[] = [];

      while (nextFrom < VIEWS_SORT_MAX_JOBS) {
        const nextTo = Math.min(nextFrom + VIEWS_SORT_PAGE_SIZE - 1, VIEWS_SORT_MAX_JOBS - 1);
        const result = await withTimeout(buildJobsQuery(nextFrom, nextTo, false, !shouldFilterCityOnClient));

        if (result.error) {
          return { error: result.error, jobs: [] as Job[] };
        }

        const batch = ((result.data as unknown as Job[]) || []);
        const cityBatch = shouldFilterCityOnClient ? batch.filter(matchesCity) : batch;
        allJobs = allJobs.concat(cityBatch);

        if (batch.length < VIEWS_SORT_PAGE_SIZE) break;
        nextFrom += VIEWS_SORT_PAGE_SIZE;
      }

      return { error: null, jobs: allJobs };
    }

    async function fetchJobsWithClientCityFilter(from: number, to: number) {
      const result = await fetchAllMatchingJobs();
      if (result.error) {
        return { error: result.error, data: [] as Job[], count: 0 };
      }

      return {
        error: null,
        data: result.jobs.slice(from, to + 1),
        count: result.jobs.length,
      };
    }

    async function fetchJobsByViews(from: number, to: number) {
      let allJobs: Job[] = [];
      let totalCount = 0;
      let nextFrom = 0;

      if (shouldFilterCityOnClient) {
        const result = await fetchAllMatchingJobs();
        if (result.error) {
          return { error: result.error, jobs: [] as Job[], totalCount: 0, counts: {} as Record<number, number> };
        }

        allJobs = result.jobs;
        totalCount = result.jobs.length;
      } else {
        while (nextFrom < VIEWS_SORT_MAX_JOBS) {
          const nextTo = Math.min(nextFrom + VIEWS_SORT_PAGE_SIZE - 1, VIEWS_SORT_MAX_JOBS - 1);
          const result = await withTimeout(buildJobsQuery(nextFrom, nextTo, nextFrom === 0));

          if (result.error) {
            return { error: result.error, jobs: [] as Job[], totalCount: 0, counts: {} as Record<number, number> };
          }

          const batch = (result.data as unknown as Job[]) || [];
          if (nextFrom === 0) {
            totalCount = result.count ?? batch.length;
          }

          allJobs = allJobs.concat(batch);
          if (batch.length < VIEWS_SORT_PAGE_SIZE || allJobs.length >= totalCount) break;
          nextFrom += VIEWS_SORT_PAGE_SIZE;
        }
      }

      const countSnapshot = await withTimeout(fetchViewCountsByJobIds(allJobs.map((job) => job.id)));
      const sortedJobs = allJobs.sort((a, b) => {
        const viewDelta = (countSnapshot[b.id] || 0) - (countSnapshot[a.id] || 0);
        if (viewDelta !== 0) return viewDelta;
        return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime();
      });

      return {
        error: null,
        jobs: sortedJobs.slice(from, to + 1),
        totalCount,
        counts: countSnapshot,
      };
    }

    async function fetchJobs() {
      const cacheKey = listingCacheKey({ cityFilter, page, keyword, selectedLocations, industry, sortBy });
      const cached = readListingCache(cacheKey);
      if (cached) {
        hydrateCounts(mergeSessionViewCounts(cached.counts, cached.jobsData));
        setJobsData(cached.jobsData);
        setFilterJobs(cached.filterJobs);
        setTotalJobsCount(cached.totalJobsCount);
        setJobsError(null);
        setLoadingJobs(false);
        return;
      }

      setLoadingJobs(true);
      setJobsError(null);
      setJobsData([]);
      setTotalJobsCount(null);

      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        const filterJobsPromise = fetchFilterJobs().catch((error) => {
          console.error("filter metadata fetch error:", error);
          return [] as JobFilterMeta[];
        });

        const [currentPageJobs, promoted] = sortBy === "views"
          ? await Promise.all([
              fetchJobsByViews(from, to),
              withTimeout(buildPromotedJobsQuery()),
            ])
          : await Promise.all([
              shouldFilterCityOnClient
                ? fetchJobsWithClientCityFilter(from, to)
                : withTimeout(buildJobsQuery(from, to, true)),
              withTimeout(buildPromotedJobsQuery()),
            ]);

        if (cancelled) return;

        if (currentPageJobs.error) {
          console.error("jobs fetch error:", currentPageJobs.error);
          setJobsData([]);
          setTotalJobsCount(0);
          setJobsError("공고를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
          setLoadingJobs(false);
          return;
        }

        const pageJobs = sortBy === "views"
          ? currentPageJobs.jobs
          : ((currentPageJobs.data as unknown as Job[]) || []);
        const promotedJobs = promoted.error ? [] : ((promoted.data as unknown as Job[]) || []);
        const totalCount = sortBy === "views"
          ? currentPageJobs.totalCount
          : (currentPageJobs.count ?? pageJobs.length);
        const maxPage = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

        if (page > maxPage) {
          setLoadingJobs(false);
          setPage(maxPage);
          return;
        }

        if (promoted.error) {
          console.error("promoted jobs fetch error:", promoted.error);
        }

        const resolvedPageJobs = page === 1
          ? mergeJobsById(promotedJobs, pageJobs)
          : pageJobs;
        const fallbackFilterJobs = resolvedPageJobs.map(({ location, industry }) => ({ location, industry }));
        const fetchedCountSnapshot = sortBy === "views"
          ? currentPageJobs.counts
          : await withTimeout(fetchViewCountsByJobIds(resolvedPageJobs.map((job) => job.id)));
        const countSnapshot = mergeSessionViewCounts(fetchedCountSnapshot, resolvedPageJobs);
        if (cancelled) return;

        hydrateCounts(countSnapshot);
        setJobsData(resolvedPageJobs);
        setFilterJobs(fallbackFilterJobs);
        setTotalJobsCount(totalCount);
        setLoadingJobs(false);

        const nextFilterJobs = await filterJobsPromise;
        if (cancelled) return;

        const resolvedFilterJobs = nextFilterJobs.length > 0 ? nextFilterJobs : fallbackFilterJobs;
        setFilterJobs(resolvedFilterJobs);
        writeListingCache(cacheKey, {
          jobsData: resolvedPageJobs,
          filterJobs: resolvedFilterJobs,
          totalJobsCount: totalCount,
          counts: countSnapshot,
        });
      } catch (error) {
        if (cancelled) return;
        console.error("listing fetch failed:", error);
        setJobsData([]);
        setFilterJobs([]);
        setTotalJobsCount(0);
        setJobsError("공고를 불러오는 데 시간이 오래 걸리고 있습니다. 다시 시도해주세요.");
        setLoadingJobs(false);
      }
    }

    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, [cityFilter, page, keyword, selectedLocations, industry, sortBy, retryNonce, hydrateCounts]);

  const scrollRestored = useRef(false);
  useLayoutEffect(() => {
    if (!loadingJobs && !loadingSalePromoDeals && !loadingFlatmatePromoListings && !loadingNewsPromoArticles && !scrollRestored.current) {
      scrollRestored.current = true;
      const savedY = sessionStorage.getItem("hoju_scroll_y");
      if (savedY) {
        sessionStorage.removeItem("hoju_scroll_y");
        window.scrollTo({ top: Number(savedY) });
      }
    }
  }, [loadingJobs, loadingSalePromoDeals, loadingFlatmatePromoListings, loadingNewsPromoArticles]);

  // City pages derive their jobs from the shared recent-jobs query shape.
  const cityJobs = useMemo(() => jobsData, [jobsData]);

  const promotedJobs = useMemo(() => jobsData.filter((j) => j.Promoted === true), [jobsData]);
  const filterSourceJobs = filterJobs.length > 0 ? filterJobs : cityJobs;

  const locations = useMemo(() => {
    const cityLocs = filterSourceJobs.flatMap((j) =>
      cityFilter ? j.location.filter((loc) => (SUBURB_EN[loc] ?? "").endsWith(` ${cityFilter}`)) : j.location
    );
    const countMap: Record<string, number> = {};
    cityLocs.forEach((loc) => { countMap[loc] = (countMap[loc] || 0) + 1; });
    return [...new Set(cityLocs)].sort((a, b) => (countMap[b] || 0) - (countMap[a] || 0));
  }, [filterSourceJobs, cityFilter]);

  const filtered = useMemo(() => {
    const result = cityJobs.filter((job) => {
      const kw = keyword.toLowerCase();
      const matchKeyword = !kw || job.title.toLowerCase().includes(kw);
      const matchLocation = selectedLocations.length === 0 || job.location.some((loc) => selectedLocations.includes(loc));
      const matchIndustry = industry === "all" || job.industry === industry;
      return matchKeyword && matchLocation && matchIndustry;
    });

    if (sortBy === "views") {
      result.sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0));
    } else {
      result.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
    }

    return result;
  }, [keyword, selectedLocations, industry, sortBy, counts, cityJobs]);

  const locationCounts = useMemo(() => {
    const c: Record<string, number> = {};
    filterSourceJobs.forEach((j) => {
      (cityFilter ? j.location.filter((loc) => (SUBURB_EN[loc] ?? "").endsWith(` ${cityFilter}`)) : j.location)
        .forEach((loc) => { c[loc] = (c[loc] || 0) + 1; });
    });
    return c;
  }, [filterSourceJobs, cityFilter]);

  const industryCounts = useMemo(() => {
    const c: Record<string, number> = {};
    filterSourceJobs.forEach((j) => { c[j.industry] = (c[j.industry] || 0) + 1; });
    return c;
  }, [filterSourceJobs]);

  const industries = useMemo(() => {
    const seen = new Set<string>();
    return filterSourceJobs
      .map((j) => j.industry)
      .filter((i): i is string => !!i && !seen.has(i) && !!seen.add(i))
      .sort((a, b) => (industryCounts[b] || 0) - (industryCounts[a] || 0));
  }, [filterSourceJobs, industryCounts]);

  const hasActiveFilters = !!keyword || selectedLocations.length > 0 || industry !== "all";
  const displayTotalCount = hasActiveFilters
    ? (totalJobsCount ?? filtered.length)
    : (totalJobsCount ?? filtered.length);
  const displayTotalPages = Math.ceil((displayTotalCount ?? filtered.length) / ITEMS_PER_PAGE);
  const currentPage = Math.min(page, displayTotalPages || 1);
  const paginatedJobs = filtered;
  const showPromoSection = currentPage === 1 && (!cityFilter || PROMO_CITY_FILTERS.has(cityFilter));
  const showReadyPromoSection = showPromoSection && !loadingJobs && !loadingSalePromoDeals && !loadingFlatmatePromoListings && !loadingNewsPromoArticles;
  const showPromotedJobsInPromoSection = showReadyPromoSection;
  const loadingPromoSection = showPromoSection && !showReadyPromoSection;
  const loadingCards = loadingJobs || loadingPromoSection;
  const featuredNewsArticle = newsPromoArticles[0];
  const headlineNewsArticles = selectNewsPromoHeadlines(newsPromoArticles);
  const visibleSalePromoDeals = salePromoDeals.slice(
    salePromoPage * SALE_PROMO_VISIBLE_COUNT,
    salePromoPage * SALE_PROMO_VISIBLE_COUNT + SALE_PROMO_VISIBLE_COUNT,
  );
  const regularPaginatedJobs = showPromotedJobsInPromoSection
    ? paginatedJobs.filter((job) => job.Promoted !== true)
    : paginatedJobs;

  const handleReset = () => {
    setSelectedLocations([]);
    setIndustry("all");
    setKeyword("");
    setPage(1);
  };

  const handleDeleteJob = async (job: Job) => {
    if (!isAdmin) return;

    const { error } = await supabase.from("jobs").delete().eq("id", job.id);
    if (error) {
      toast.error("삭제 실패: " + error.message);
      return;
    }

    setJobsData((prev) => prev.filter((item) => item.id !== job.id));
    setTotalJobsCount((prev) => (prev === null ? prev : Math.max(0, prev - 1)));
    removeJobFromListingCaches(job.id);
    toast.success("공고가 삭제되었습니다.");
  };

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-5">
          <div className="hidden lg:block">
            <div className="sticky top-4">
            <CategorySidebar
              locations={locations}
              industries={industries}
              selectedLocations={selectedLocations}
              selectedIndustry={industry}
              onLocationsChange={(v) => { setSelectedLocations(v); setPage(1); }}
              onIndustryChange={(v) => { setIndustry(v); setPage(1); }}
              onReset={handleReset}
              locationCounts={locationCounts}
              industryCounts={industryCounts}
              cityFilter={cityFilter}
            />
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-5">
              <h1 className="text-xl font-extrabold tracking-normal text-foreground sm:text-2xl">{meta.h1}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{meta.tagline}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="키워드 검색 (예: 바리스타, 네일, 주방...)"
                  value={keyword}
                  onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                  onKeyDown={(e) => { if (e.key === "Enter") { (e.target as HTMLInputElement).blur(); } }}
                  className="pl-10"
                />
              </div>
              <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-3">
                <MobileLocationFilter
                  locations={locations}
                  selectedLocations={selectedLocations}
                  onLocationsChange={(v) => { setSelectedLocations(v); setPage(1); }}
                  locationCounts={locationCounts}
                  cityFilter={cityFilter}
                />
                <MobileIndustryFilter
                  industries={industries}
                  selectedIndustry={industry}
                  onIndustryChange={(v) => { setIndustry(v); setPage(1); }}
                  industryCounts={industryCounts}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-semibold text-foreground">{displayTotalCount ?? "계산 중"}</span>개의 공고
              </p>
              <div className="flex items-center gap-1.5">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="flex items-center justify-between gap-2 w-[130px] h-8 px-3 rounded-md border border-input bg-background text-xs ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <span>{sortBy === "recent" ? "최신순" : "조회순"}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setSortBy("recent"); setPage(1); }} className={sortBy === "recent" ? "font-semibold" : ""}>최신순</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSortBy("views"); setPage(1); }} className={sortBy === "views" ? "font-semibold" : ""}>조회순</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Promotional cards and promoted jobs stay pinned above filtered regular jobs. */}
            {showReadyPromoSection && (
              <div className="space-y-2 mb-2">
                {flatmatePromoListings.length > 0 && (
                  <div className="border border-border bg-white px-4 py-3 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 text-base font-extrabold text-slate-950">
                          <Home className="h-4 w-4 text-slate-700" />
                          최신 플렛 렌트
                        </p>
                      </div>
                      <Link to="/flatmates" className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-rose-300 px-3 text-xs font-bold text-slate-900 shadow-sm hover:bg-rose-400">
                        렌트 더 보기
                      </Link>
                    </div>
                    {(() => {
                      const switchToManual = () => {
                        if (flatmateManualScroll) return;
                        const track = flatmateTrackRef.current;
                        const outer = flatmateOuterRef.current;
                        const x = track ? -new DOMMatrixReadOnly(getComputedStyle(track).transform).m41 : 0;
                        setFlatmateManualScroll(true);
                        requestAnimationFrame(() => { if (outer) outer.scrollLeft = Math.max(0, x); });
                      };
                      const makeCards = (listings: typeof flatmatePromoListings, keyPrefix = "") =>
                        listings.map((listing, i) => {
                        const suburb = listing.suburb?.trim();
                        const tags = flatmatePromoTags(listing);
                        return (
                          <Link
                            key={`${keyPrefix}${listing.id}-${i}`}
                            to={`/flatmates/${listing.id}`}
                            className="w-[10.25rem] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white transition-[box-shadow,border-color] hover:border-slate-400 hover:shadow-sm sm:w-[11.25rem]"
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                              <FlatmatePromoImage listing={listing} />
                              {tags.length > 0 && (
                                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                                  {tags.map((tag) => (
                                    <span key={tag} className="rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200/80">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex h-[6.25rem] min-w-0 flex-col p-2">
                              <div className="mb-1 flex min-h-[1rem] items-center gap-1.5 overflow-hidden">
                                {suburb && <p className="truncate text-[11px] font-semibold text-slate-500">{suburb}</p>}
                              </div>
                              <p className="line-clamp-2 min-h-[2.1rem] text-xs font-extrabold leading-snug text-slate-950">{listing.title ?? "제목 없음"}</p>
                              <p className="mt-auto text-sm font-black text-slate-950">{formatRent(listing.price)} <span className="text-xs font-semibold text-slate-500">/ 주</span></p>
                            </div>
                          </Link>
                        );
                        });
                      return flatmateManualScroll ? (
                        <div ref={flatmateOuterRef} className="promo-carousel -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                          {makeCards(flatmatePromoListings)}
                        </div>
                      ) : (
                        <div
                          ref={flatmateOuterRef}
                          className="overflow-x-hidden pb-1"
                          onTouchStart={switchToManual}
                          onPointerDown={(e) => { if (e.pointerType !== "touch") switchToManual(); }}
                          onWheel={switchToManual}
                        >
                          <div ref={flatmateTrackRef} className="flatmate-marquee-track">
                            {makeCards([...flatmatePromoListings, ...flatmatePromoListings], "dup")}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
                <div className="border border-border bg-white px-4 py-3 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-base font-extrabold text-slate-950">
                        <Newspaper className="h-4 w-4 text-slate-700" />
                        호주 생활 뉴스
                      </p>
                    </div>
                    <Link to="/news" className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-blue-300 px-3 text-xs font-bold text-slate-900 shadow-sm hover:bg-blue-400">
                      뉴스 더 보기
                    </Link>
                  </div>

                  {featuredNewsArticle ? (
                    <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
                      <a
                        href={translatedNewsUrl(featuredNewsArticle.sourceUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackEvent("news_article_clicked", {
                            listing_id: featuredNewsArticle.id,
                            metadata: {
                              title: featuredNewsArticle.title,
                              source: featuredNewsArticle.sourceName,
                              source_url: featuredNewsArticle.sourceUrl,
                              category: featuredNewsArticle.categoryKey,
                              surface: "home_news_promo_featured",
                            },
                          });
                        }}
                        className="grid gap-3 p-3 transition-colors hover:bg-slate-50 sm:grid-cols-[7.5rem_1fr]"
                      >
                        {featuredNewsArticle.imageUrl && (
                          <div className="h-24 overflow-hidden rounded-md bg-slate-100 sm:h-full">
                            <img
                              src={featuredNewsArticle.imageUrl}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                            {featuredNewsArticle.sourceName}
                            {featuredNewsArticle.publishedAt && <span className="font-semibold text-slate-400">· {featuredNewsArticle.publishedAt}</span>}
                          </p>
                          <p className="line-clamp-2 text-sm font-black leading-snug text-slate-950 sm:text-base">{featuredNewsArticle.title}</p>
                          <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
                            기사 보기
                            <ExternalLink className="h-3 w-3" />
                          </p>
                        </div>
                      </a>

                      {headlineNewsArticles.length > 0 && (
                        <div className="divide-y divide-slate-200 border-t border-slate-200">
                          {headlineNewsArticles.map((article) => (
                            <a
                              key={article.id}
                              href={translatedNewsUrl(article.sourceUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                trackEvent("news_article_clicked", {
                                  listing_id: article.id,
                                  metadata: {
                                    title: article.title,
                                    source: article.sourceName,
                                    source_url: article.sourceUrl,
                                    category: article.categoryKey,
                                    surface: "home_news_promo_headline",
                                  },
                                });
                              }}
                              className="flex min-w-0 items-center justify-between gap-3 px-3 py-2.5 text-xs font-bold leading-snug text-slate-800 transition-colors hover:bg-slate-50"
                            >
                              <span className="line-clamp-1">{article.title}</span>
                              <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
                      <p className="text-xs font-semibold text-muted-foreground">환율, 최신 호주 뉴스, 구직 팁을 한곳에서 볼 수 있습니다.</p>
                      <Link to="/news" className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-50">
                        뉴스
                      </Link>
                    </div>
                  )}
                </div>
                {salePromoDeals.length > 0 && (
                  <div className="border border-border bg-white px-4 py-3 shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 text-base font-extrabold text-slate-950">
                          <ShoppingBag className="h-4 w-4 text-slate-700" />
                          최신 세일과 할인
                        </p>
                      </div>
                      <Link to="/sales" className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-emerald-300 px-3 text-xs font-bold text-slate-900 shadow-sm hover:bg-emerald-400">
                        세일 상품 더 보기
                      </Link>
                    </div>
                    <div key={salePromoPage} className="promo-flip grid gap-2 sm:grid-cols-2">
                      {visibleSalePromoDeals.map((deal) => (
                        <Link
                          key={deal.rank}
                          to={`/sales/${deal.rank}`}
                          className="flex h-[4.5rem] min-w-0 gap-2 overflow-hidden rounded-md border border-slate-200 bg-white p-2 transition-colors hover:bg-slate-50"
                        >
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-white p-1.5">
                            {deal.imageUrl && (
                              <img
                                src={deal.imageUrl}
                                alt={deal.title}
                                className="max-h-full w-full object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="mb-1 text-[11px] font-semibold text-slate-500">{deal.category}</p>
                            <p className="line-clamp-2 text-xs font-bold leading-snug text-slate-900">{highlightPrices(deal.title)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {showPromotedJobsInPromoSection && promotedJobs.length > 0 && (
                  <>
                    <p className="border-t border-border pt-3 text-xs font-semibold uppercase tracking-wide text-slate-600">추천 일자리</p>
                    {promotedJobs.map((job) => (
                      <PromotedJobCard key={job.id} job={job} viewCount={getCount(job.id)} showEditButton={isAdmin} onDelete={isAdmin ? handleDeleteJob : undefined} />
                    ))}
                  </>
                )}
                {/* Promote-your-post CTA */}
                <div className="rounded-lg border border-border bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 mb-0.5">내 공고를 상단에 올리세요</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">추천 공고는 일반 공고보다 <span className="font-semibold text-slate-700">3배 더 많이 조회</span>되고 지원 전환율이 <span className="font-semibold text-slate-700">60% 높습니다</span>. 문의: <a href="mailto:admin.hojujobs@gmail.com" onClick={() => trackEvent("promote_cta_clicked", { metadata: { surface: "job_list_promo" } })} className="font-semibold text-slate-800 underline underline-offset-2 hover:text-slate-950">admin.hojujobs@gmail.com</a></p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border/60" />
              </div>
            )}

            <div className="space-y-3">
              {loadingCards ? (
                <div className="text-center py-16 text-muted-foreground">불러오는 중...</div>
              ) : jobsError ? (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-10 text-center">
                  <p className="text-sm font-semibold text-foreground">{jobsError}</p>
                  <button
                    type="button"
                    onClick={() => setRetryNonce((value) => value + 1)}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    다시 불러오기
                  </button>
                </div>
              ) : regularPaginatedJobs.length > 0 ? (
                regularPaginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} viewCount={getCount(job.id)} showEditButton={isAdmin} onDelete={isAdmin ? handleDeleteJob : undefined} />
                ))
              ) : showPromotedJobsInPromoSection ? (
                null
              ) : (
                <div className="text-center py-16 text-muted-foreground">검색 결과가 없습니다.</div>
              )}
            </div>

            <Pagination currentPage={currentPage} totalPages={displayTotalPages} onPageChange={(p) => { setPage(p); sessionStorage.removeItem("hoju_scroll_y"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
