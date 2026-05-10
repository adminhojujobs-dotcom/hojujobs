import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { RefreshCw, ExternalLink } from "lucide-react";

interface ExchangeRate {
  rate: number;
  date: string;
}

const FLIGHT_ROUTES = [
  {
    label: "서울 → 시드니",
    codes: "ICN → SYD",
    duration: "약 10시간 10분 (직항)",
    fromPrice: "A$400",
    airlines: "대한항공, 제트스타, 콴타스",
    skyscanner: "https://www.skyscanner.net/routes/icn/syd/incheon-to-sydney.html",
  },
  {
    label: "서울 → 멜버른",
    codes: "ICN → MEL",
    duration: "약 10시간 (경유 1회)",
    fromPrice: "A$270",
    airlines: "싱가포르항공, 캐세이퍼시픽 등 경유",
    skyscanner: "https://www.skyscanner.net/routes/icn/mel/incheon-to-melbourne.html",
  },
  {
    label: "서울 → 브리즈번",
    codes: "ICN → BNE",
    duration: "약 9시간 35분 (직항)",
    fromPrice: "A$350",
    airlines: "대한항공, 제트스타",
    skyscanner: "https://www.skyscanner.net/routes/icn/bne/incheon-to-brisbane.html",
  },
];

const CONVERSION_AMOUNTS = [100_000, 500_000, 1_000_000, 5_000_000];

function todayLabel() {
  const d = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}(${days[d.getDay()]})`;
}

export default function Dashboard() {
  useSEO({ title: "대시보드 | 호주잡스", description: "호주잡스 관리자 대시보드", noindex: true });
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rate, setRate] = useState<ExchangeRate | null>(null);
  const [loadingRate, setLoadingRate] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/");
  }, [user, isAdmin, loading]);

  useEffect(() => {
    if (isAdmin) fetchRate();
  }, [isAdmin]);

  const fetchRate = async () => {
    setLoadingRate(true);
    try {
      const res = await fetch("https://api.frankfurter.app/latest?from=KRW&to=AUD");
      const data = await res.json();
      setRate({ rate: data.rates.AUD, date: data.date });
    } catch {
      setRate(null);
    }
    setLoadingRate(false);
  };

  if (loading) return <div className="flex w-full min-h-0 flex-1 items-center justify-center text-muted-foreground">로딩 중...</div>;
  if (!isAdmin) return null;

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">

        {/* Date */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base font-bold text-foreground">대시보드</h1>
          <span className="text-sm font-medium text-muted-foreground">{todayLabel()}</span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Exchange Rate */}
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-sm font-bold text-foreground">환율 · 원화 → 호주달러</h2>
              <button
                onClick={fetchRate}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> 새로고침
              </button>
            </div>

            {loadingRate ? (
              <div className="px-4 py-8 text-sm text-muted-foreground text-center">불러오는 중...</div>
            ) : rate ? (
              <div>
                {/* Main rate */}
                <div className="px-4 py-4 border-b">
                  <p className="text-2xl font-bold text-foreground">
                    ₩1,000 = <span className="text-primary">A${(rate.rate * 1000).toFixed(3)}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    A$1 = ₩{Math.round(1 / rate.rate).toLocaleString()} · 기준일 {rate.date}
                  </p>
                </div>
                {/* Conversion table */}
                <div className="divide-y">
                  {CONVERSION_AMOUNTS.map((krw) => (
                    <div key={krw} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-sm text-muted-foreground">₩{krw.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-foreground">
                        A${(rate.rate * krw).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-4 py-8 text-sm text-muted-foreground text-center">환율 정보를 불러올 수 없습니다.</div>
            )}
          </div>

          {/* Flights */}
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="text-sm font-bold text-foreground">서울 출발 항공편</h2>
              <p className="text-xs text-muted-foreground mt-0.5">참고가 기준 · Skyscanner에서 검색</p>
            </div>
            <div className="divide-y">
              {FLIGHT_ROUTES.map((route) => (
                <a
                  key={route.codes}
                  href={route.skyscanner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between px-4 py-3.5 hover:bg-muted/40 transition-colors group gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {route.label}
                      </p>
                      <span className="text-xs text-muted-foreground">{route.codes}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{route.duration} · {route.airlines}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-primary">{route.fromPrice}~</p>
                    <div className="flex items-center gap-0.5 justify-end mt-0.5">
                      <span className="text-xs text-muted-foreground">검색</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
