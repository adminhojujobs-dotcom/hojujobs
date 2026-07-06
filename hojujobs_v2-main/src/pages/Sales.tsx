import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, RotateCcw, Tags, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { trackEvent } from "@/lib/trackEvent";

interface Deal {
  rank: number;
  title: string;
  category: string;
  teaserDescription?: string;
  imageUrl?: string;
  externalUrl?: string;
  uploadedAt: string;
  promoCodes: string[];
}

const SALES_CACHE_KEY = "hoju_sales_cache";
const SALES_FILTER_KEY = "hoju_sales_filters";
const SALES_SCROLL_KEY = "hoju_sales_scroll_y";
const SALES_CACHE_TTL_MS = 5 * 60 * 1000;
const SALES_CACHE_VERSION = 2;

interface SalesCache {
  version: number;
  deals: Deal[];
  cachedAt: number;
}

function readSalesCache(): Deal[] | null {
  try {
    const raw = sessionStorage.getItem(SALES_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SalesCache;
    if (parsed.version !== SALES_CACHE_VERSION || !parsed.cachedAt || Date.now() - parsed.cachedAt > SALES_CACHE_TTL_MS) {
      sessionStorage.removeItem(SALES_CACHE_KEY);
      return null;
    }

    return parsed.deals;
  } catch {
    return null;
  }
}

function writeSalesCache(deals: Deal[]) {
  try {
    sessionStorage.setItem(SALES_CACHE_KEY, JSON.stringify({
      version: SALES_CACHE_VERSION,
      deals,
      cachedAt: Date.now(),
    }));
  } catch {}
}

function readSalesFilters() {
  try {
    const raw = sessionStorage.getItem(SALES_FILTER_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.selectedProductTypes)
      ? parsed.selectedProductTypes.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function formatUploadedAt(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function parsePromoCodes(value: Json): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const code = item.code ?? item.promo_code ?? item.promoCode;
        return typeof code === "string" ? code : null;
      }
      return null;
    })
    .filter((code): code is string => Boolean(code?.trim()));
}

function cleanTeaserText(value: string) {
  return value
    .replace(/\*\*|__|\*|_|#{1,6}\s|`|\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[*-]\s/gm, "• ");
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
      <span key={`${match[0]}-${matchIndex}`} className="font-bold text-blue-700">
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

export default function Sales() {
  useSEO({ title: "온세일 | Hoju Jobs", description: "호주 생활에 유용한 최신 온세일과 할인 코드", noindex: true });
  const { isAdmin } = useAuth();
  useEffect(() => { trackEvent("sales_page_viewed"); }, []);
  const [deals, setDeals] = useState<Deal[]>(() => readSalesCache() ?? []);
  const [loadingDeals, setLoadingDeals] = useState(() => readSalesCache() === null);
  const [dealsError, setDealsError] = useState<string | null>(null);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(() => readSalesFilters());

  useEffect(() => {
    const cachedDeals = readSalesCache();
    if (cachedDeals) {
      setDeals(cachedDeals);
      setLoadingDeals(false);
      return;
    }

    const fetchDeals = async () => {
      setLoadingDeals(true);
      setDealsError(null);

      const { data, error } = await supabase
        .from("ozbargain_deals")
        .select("rank, title, category, teaser_description, image_url, external_url, uploaded_at, promo_codes")
        .order("rank", { ascending: true });

      if (error) {
        setDeals([]);
        setDealsError("딜 정보를 불러올 수 없습니다.");
        setLoadingDeals(false);
        return;
      }

      const nextDeals = (data ?? []).map((deal) => ({
        rank: deal.rank,
        title: deal.title,
        category: deal.category,
        teaserDescription: (deal as Record<string, unknown>).teaser_description as string | undefined ?? undefined,
        imageUrl: deal.image_url ?? undefined,
        externalUrl: deal.external_url ?? undefined,
        uploadedAt: deal.uploaded_at,
        promoCodes: parsePromoCodes(deal.promo_codes),
      }));

      setDeals(nextDeals);
      writeSalesCache(nextDeals);
      setLoadingDeals(false);
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(SALES_FILTER_KEY, JSON.stringify({ selectedProductTypes }));
  }, [selectedProductTypes]);

  useEffect(() => {
    if (loadingDeals) return;

    const savedY = sessionStorage.getItem(SALES_SCROLL_KEY);
    if (!savedY) return;

    sessionStorage.removeItem(SALES_SCROLL_KEY);
    setTimeout(() => window.scrollTo({ top: Number(savedY) }), 50);
  }, [loadingDeals]);

  const productTypes = useMemo(() => [...new Set(deals.map((deal) => deal.category))].sort(), [deals]);
  const productTypeCounts = useMemo(() => {
    return deals.reduce<Record<string, number>>((counts, deal) => {
      counts[deal.category] = (counts[deal.category] || 0) + 1;
      return counts;
    }, {});
  }, [deals]);
  const filteredDeals = useMemo(() => {
    if (selectedProductTypes.length === 0) return deals;
    return deals.filter((deal) => selectedProductTypes.includes(deal.category));
  }, [deals, selectedProductTypes]);
  const productFilterLabel = selectedProductTypes.length === 0
    ? "전체 상품"
    : selectedProductTypes.length === 1
      ? selectedProductTypes[0]
      : `${selectedProductTypes.length}개 상품 선택`;
  const toggleProductType = (productType: string) => {
    setSelectedProductTypes((current) => {
      const next = current.includes(productType)
        ? current.filter((item) => item !== productType)
        : [...current, productType];
      trackEvent("sales_filter_changed", {
        metadata: {
          product_type: productType,
          selected: next.includes(productType),
          selected_count: next.length,
        },
      });
      return next;
    });
  };
  const handleDeleteDeal = async (deal: Deal) => {
    if (!isAdmin) return;

    const { error } = await supabase.from("ozbargain_deals").delete().eq("rank", deal.rank);
    if (error) {
      toast.error("삭제 실패: " + error.message);
      return;
    }

    setDeals((current) => {
      const nextDeals = current.filter((item) => item.rank !== deal.rank);
      writeSalesCache(nextDeals);
      return nextDeals;
    });
    toast.success("딜이 삭제되었습니다.");
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-10 sm:py-12 lg:px-9">
        <h1 className="mb-8 text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">온세일</h1>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(
              "flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-neutral-900 outline-none transition-colors hover:border-slate-300",
              selectedProductTypes.length > 0 && "border-blue-300 bg-blue-50 text-blue-700"
            )}>
              <span>상품 종류</span>
              {selectedProductTypes.length > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff4b2f] px-1 text-[0.65rem] font-black text-white">
                  {selectedProductTypes.length}
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[calc(100vw-2.5rem)] max-w-sm">
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedProductTypes([]);
                  trackEvent("sales_filter_changed", { metadata: { action: "clear", surface: "sales_filter_bar" } });
                }}
                className={cn("justify-between", selectedProductTypes.length === 0 && "font-bold text-blue-700")}
              >
                <span>전체 상품</span>
                <span className="text-xs tabular-nums text-slate-400">{deals.length}</span>
              </DropdownMenuItem>
              {productTypes.map((productType) => (
                <DropdownMenuCheckboxItem
                  key={productType}
                  checked={selectedProductTypes.includes(productType)}
                  onSelect={(event) => event.preventDefault()}
                  onCheckedChange={() => toggleProductType(productType)}
                  className="justify-between"
                >
                  <span className="truncate">{productType}</span>
                  <span className="ml-3 text-xs tabular-nums text-slate-400">{productTypeCounts[productType] || 0}</span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={() => {
              setSelectedProductTypes([]);
              trackEvent("sales_filter_changed", { metadata: { action: "clear", surface: "sales_filter_bar" } });
            }}
            className={cn(
              "inline-flex items-center gap-1 text-xs font-bold text-slate-500 transition-colors hover:text-neutral-950",
              selectedProductTypes.length === 0 && "pointer-events-none opacity-40"
            )}
          >
            필터 초기화
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        <section className="w-full border-t border-neutral-950">
          {loadingDeals ? (
            <div className="border-b border-slate-200 px-4 py-14 text-center text-sm font-semibold text-slate-500">
              딜 정보를 불러오는 중...
            </div>
          ) : dealsError ? (
            <div className="border-b border-slate-200 px-4 py-14 text-center text-sm font-semibold text-slate-500">
              {dealsError}
            </div>
          ) : deals.length === 0 ? (
            <div className="border-b border-slate-200 px-4 py-14 text-center text-sm font-semibold text-slate-500">
              현재 등록된 딜이 없습니다.
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="border-b border-slate-200 px-4 py-14 text-center text-sm font-semibold text-slate-500">
              선택한 상품 종류에 해당하는 딜이 없습니다.
            </div>
          ) : filteredDeals.map((deal) => (
            <article key={deal.rank} className="relative border-b border-slate-200">
              <Link
                to={`/sales/${deal.rank}`}
                onClick={() => {
                  trackEvent("sale_card_clicked", {
                    listing_type: "sale",
                    listing_id: deal.rank,
                    metadata: { title: deal.title, category: deal.category },
                  });
                  sessionStorage.setItem(SALES_SCROLL_KEY, String(window.scrollY));
                }}
                className="block min-h-[5.5rem] py-3 transition-colors hover:bg-slate-50 sm:min-h-[8.25rem] sm:py-5 md:px-0"
              >
                <div className={cn("min-w-0 md:px-5", isAdmin && "pr-20")}>
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    {deal.imageUrl && (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-white sm:h-24 sm:w-24">
                        <img
                          src={deal.imageUrl}
                          alt={deal.title}
                          className="max-h-16 w-full rounded object-contain sm:max-h-24"
                          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:mb-2 sm:gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[0.65rem] font-black text-blue-700 sm:px-2.5 sm:py-1 sm:text-xs">
                          {deal.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 sm:text-sm">{formatUploadedAt(deal.uploadedAt)}</span>
                      </div>

                      <h2 className="line-clamp-2 text-sm font-black leading-snug tracking-[-0.025em] text-neutral-950 sm:text-lg">
                        {highlightPrices(deal.title)}
                      </h2>
                      {deal.teaserDescription && (
                        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-relaxed text-slate-500 sm:mt-2 sm:text-base">
                          {highlightPrices(cleanTeaserText(deal.teaserDescription))}
                        </p>
                      )}

                      {deal.promoCodes.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {deal.promoCodes.slice(0, 2).map((promoCode) => (
                            <span key={promoCode} className="inline-flex items-center rounded-md border border-dashed border-blue-300 bg-blue-50 px-3 py-1.5 text-sm font-black text-blue-700">
                              {promoCode}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </Link>

              {isAdmin && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-2 z-10 h-7 gap-1 border-destructive/30 bg-white/95 px-2 text-[11px] text-destructive shadow-sm hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      삭제
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>딜을 삭제하시겠습니까?</AlertDialogTitle>
                      <AlertDialogDescription>
                        "{deal.title}" 딜이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={() => void handleDeleteDeal(deal)}>삭제</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

function SalesFilterItem({ label, count, active, onClick }: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-full min-w-0 items-center justify-between gap-2 rounded-full px-3 text-xs font-bold transition-colors lg:h-10 lg:text-sm",
        active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-neutral-950"
      )}
    >
      <span className="truncate">{label}</span>
      <span className={cn("text-[11px] tabular-nums", active ? "text-blue-600" : "text-slate-400")}>{count}</span>
    </button>
  );
}
