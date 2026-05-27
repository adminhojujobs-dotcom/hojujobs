import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, RotateCcw, Tags, Ticket, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
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
const SALES_CACHE_VERSION = 1;

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

export default function Sales() {
  useSEO({ title: "온세일 | Hoju Jobs", description: "호주 생활에 유용한 최신 온세일과 할인 코드", noindex: true });
  const { isAdmin } = useAuth();
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
    setSelectedProductTypes((current) =>
      current.includes(productType)
        ? current.filter((item) => item !== productType)
        : [...current, productType]
    );
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
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4">
        <div className="grid gap-3 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-5">
          <aside className="space-y-2 lg:space-y-4">
            <button
              onClick={() => setSelectedProductTypes([])}
              className={cn(
                "hidden h-5 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex",
                selectedProductTypes.length === 0 && "invisible pointer-events-none"
              )}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              필터 초기화
            </button>

            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground lg:mb-3">
                <Tags className="h-4 w-4 text-accent" />
                상품 종류
              </h3>
              <div className="lg:hidden">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm outline-none transition-colors",
                    selectedProductTypes.length > 0
                      ? "border-primary/50 bg-primary/5 text-primary"
                      : "border-input bg-muted/40 text-muted-foreground"
                  )}>
                    <span className="flex min-w-0 items-center gap-2">
                      <Tags className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{productFilterLabel}</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)] max-w-sm">
                    <DropdownMenuItem
                      onSelect={() => setSelectedProductTypes([])}
                      className={cn("justify-between", selectedProductTypes.length === 0 && "font-semibold text-primary")}
                    >
                      <span>전체 상품</span>
                      <span className="text-xs tabular-nums text-muted-foreground/70">{deals.length}</span>
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
                        <span className="ml-3 text-xs tabular-nums text-muted-foreground/70">{productTypeCounts[productType] || 0}</span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="hidden space-y-0.5 lg:block">
                <SalesFilterItem
                  label="전체 상품"
                  count={deals.length}
                  active={selectedProductTypes.length === 0}
                  onClick={() => setSelectedProductTypes([])}
                />
                {productTypes.map((productType) => (
                  <SalesFilterItem
                    key={productType}
                    label={productType}
                    count={productTypeCounts[productType] || 0}
                    active={selectedProductTypes.includes(productType)}
                    onClick={() => toggleProductType(productType)}
                  />
                ))}
              </div>
            </div>
          </aside>

          <section className="mx-auto w-full max-w-3xl space-y-2.5 lg:max-w-none">
            <div className="mb-3">
              <h1 className="text-xl font-extrabold tracking-normal text-foreground sm:text-2xl">온세일</h1>
              <p className="mt-1 text-sm text-muted-foreground">호주 최신 인기 딜을 한곳에서 확인하세요.</p>
            </div>

            {loadingDeals ? (
              <div className="rounded-lg border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
                딜 정보를 불러오는 중...
              </div>
            ) : dealsError ? (
              <div className="rounded-lg border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
                {dealsError}
              </div>
            ) : deals.length === 0 ? (
              <div className="rounded-lg border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
                현재 등록된 딜이 없습니다.
              </div>
            ) : filteredDeals.length === 0 ? (
              <div className="rounded-lg border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
                선택한 상품 종류에 해당하는 딜이 없습니다.
              </div>
            ) : filteredDeals.map((deal) => (
              <article key={deal.rank} className="relative w-full max-w-full overflow-hidden rounded-md border bg-card transition-shadow hover:shadow-sm">
                <Link
                  to={`/sales/${deal.rank}`}
                  onClick={() => sessionStorage.setItem(SALES_SCROLL_KEY, String(window.scrollY))}
                  className={cn(
                    "grid w-full min-w-0 gap-0",
                    deal.imageUrl ? "grid-cols-[5rem_minmax(0,1fr)] sm:grid-cols-[7rem_minmax(0,1fr)]" : "grid-cols-1"
                  )}
                >
                  {deal.imageUrl && (
                    <div className="flex w-20 shrink-0 items-center justify-center bg-white p-1.5 sm:w-28 sm:p-2">
                      <img
                        src={deal.imageUrl}
                        alt={deal.title}
                        className="max-h-20 w-full rounded object-contain sm:max-h-24"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                      />
                    </div>
                  )}
                  <div className={cn("min-w-0 flex-1 p-2.5 sm:p-3", isAdmin && "pr-16 sm:pr-20")}>
                    <div className="mb-1 flex min-w-0 items-center gap-1.5 overflow-hidden">
                      <span className="max-w-[8.5rem] truncate rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold text-primary sm:max-w-[12rem]">{deal.category}</span>
                      <span className="shrink-0 truncate text-xs text-muted-foreground">{formatUploadedAt(deal.uploadedAt)}</span>
                    </div>

                    <h2 className="line-clamp-2 max-w-full overflow-hidden break-words text-sm font-bold leading-snug text-foreground sm:text-base">{highlightPrices(deal.title)}</h2>

                    {deal.teaserDescription && (
                      <p className="mt-1.5 line-clamp-2 max-w-full overflow-hidden break-words text-xs leading-relaxed text-muted-foreground">
                        {highlightPrices(cleanTeaserText(deal.teaserDescription))}
                      </p>
                    )}

                    {deal.promoCodes.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {deal.promoCodes.map((promoCode) => (
                          <span key={promoCode} className="inline-flex items-center gap-1 rounded-md border border-dashed border-primary/40 bg-primary/5 px-2 py-0.5 text-xs font-bold text-primary">
                            <Ticket className="h-3 w-3" />
                            {promoCode}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
                {isAdmin && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-2 top-2 h-7 gap-1 border-destructive/30 bg-white/95 px-2 text-[11px] text-destructive shadow-sm hover:bg-destructive/10 hover:text-destructive"
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
        </div>
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
        "inline-flex h-8 w-full min-w-0 items-center justify-between gap-1.5 rounded-lg px-3 text-xs transition-colors lg:h-9 lg:text-sm",
        active
          ? "bg-primary/10 font-semibold text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <span className="truncate">{label}</span>
      <span className={cn("text-[11px] tabular-nums", active ? "text-primary" : "text-muted-foreground/60")}>{count}</span>
    </button>
  );
}
