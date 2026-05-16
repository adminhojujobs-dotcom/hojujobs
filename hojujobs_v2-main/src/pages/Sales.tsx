import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, ShoppingBag, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";

interface Deal {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  delivery?: string;
  retailer: string;
  retailerDomain: string;
  postedBy: string;
  postedAt: string;
  score: number;
  comments: number;
  description: string[];
  imageUrl?: string;
  dealUrl: string;
}

const CURRENT_DEALS: Deal[] = [
  {
    id: "samsung-55-u8500f-jb-hi-fi",
    title: "삼성 55인치 U8500F 크리스탈 UHD 4K 스마트 TV (2025)",
    price: "$552",
    originalPrice: "$691",
    delivery: "무료 클릭앤콜렉트 / 매장 수령",
    retailer: "JB Hi-Fi",
    retailerDomain: "jbhifi.com.au",
    postedBy: "Gavy1370",
    postedAt: "16/05/2026 20:58",
    score: 13,
    comments: 0,
    description: [
      "55인치 TV로 괜찮아 보이는 딜입니다.",
      "화면: 강력한 4K 업스케일링을 지원하는 55인치 4K UHD LED 디스플레이",
      "게임 시 자동 저지연 모드를 지원하는 100 스무스 모션 레이트",
      "스마트 기능: 자동 콘텐츠 추천 기능이 있는 One UI Tizen OS",
    ],
    imageUrl: "",
    dealUrl: "https://www.jbhifi.com.au/",
  },
];

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

export default function Sales() {
  useSEO({ title: "세일중 | Hoju Jobs", description: "관리자용 현재 세일 정보", noindex: true });
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex w-full min-h-0 flex-1 items-center justify-center bg-background text-muted-foreground">
        로딩 중...
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-4xl space-y-5 px-4 pb-8 pt-4">
        <section className="rounded-lg border bg-card px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold text-foreground">세일중</h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">현재 확인 중인 딜을 관리자만 볼 수 있습니다.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          {CURRENT_DEALS.map((deal) => (
            <article key={deal.id} className="overflow-hidden rounded-lg border bg-card">
              <div className="grid gap-4 p-4 sm:grid-cols-[72px_minmax(0,1fr)_180px]">
                <div className="flex sm:block">
                  <div className="grid h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md border bg-white text-center">
                    <div className="flex items-center justify-center text-lg font-bold text-green-600">{deal.score}+</div>
                    <div className="flex items-center justify-center border-t text-sm font-semibold text-red-600">{deal.comments}-</div>
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">
                    {deal.title} <span className="text-primary">{deal.price}</span>
                    {deal.originalPrice && (
                      <span className="font-semibold text-muted-foreground"> 정가 {deal.originalPrice}</span>
                    )}
                    {deal.delivery && (
                      <span className="font-semibold text-foreground"> + 배송 ({deal.delivery})</span>
                    )}
                    <span className="font-semibold text-foreground"> 판매처 {deal.retailer}</span>
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-blue-700">{deal.postedBy}</span>
                    <span>등록 {deal.postedAt}</span>
                    <img src={faviconUrl(deal.retailerDomain)} alt="" className="h-4 w-4 rounded-sm" />
                    <span className="font-semibold text-blue-700">{deal.retailerDomain}</span>
                  </div>

                  <div className="mt-3 space-y-1 text-sm leading-relaxed text-foreground sm:text-base">
                    {deal.description.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border bg-white">
                    {deal.imageUrl ? (
                      <img src={deal.imageUrl} alt={deal.title} className="h-full w-full object-contain" />
                    ) : (
                      <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
                    )}
                  </div>
                  <Button asChild className="gap-1.5">
                    <a href={deal.dealUrl} target="_blank" rel="noopener noreferrer">
                      딜 보러가기
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  {deal.delivery && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Truck className="h-3.5 w-3.5" />
                      {deal.delivery}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
