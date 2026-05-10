import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { RefreshCw, ExternalLink, ArrowRight } from "lucide-react";

interface RateData {
  aud: number;
  usd: number;
  jpy: number;
  eur: number;
  date: string;
}

const CONVERSION_AMOUNTS = [100_000, 500_000, 1_000_000, 5_000_000];

const EXTRA_RATES = [
  { code: "USD", flag: "🇺🇸", label: "미국 달러" },
  { code: "JPY", flag: "🇯🇵", label: "일본 엔" },
  { code: "EUR", flag: "🇪🇺", label: "유로" },
];

const CITY_LINKS = [
  { label: "시드니 구인구직", path: "/sydney", sub: "NSW 전 지역" },
  { label: "멜버른 구인구직", path: "/melbourne", sub: "VIC 전 지역" },
  { label: "브리즈번 구인구직", path: "/brisbane", sub: "QLD 전 지역" },
  { label: "애들레이드 구인구직", path: "/adelaide", sub: "SA 전 지역" },
];

const NEWS_ARTICLES = [
  {
    title: "워킹홀리데이 비자 신청 수수료 A$670으로 인상",
    date: "2025년 7월 1일",
    tag: "비자",
    summary: "2025년 7월 1일부터 워킹홀리데이 비자(417·462) 신청 수수료가 $635에서 $670으로 인상됐습니다. CPI에 따른 정기 조정으로, 7월 이후 신청자는 새 수수료를 적용받습니다.",
    link: "https://pvtistes.net/en/australia-whv-fee-increase/",
    source: "pvtistes.net",
  },
  {
    title: "호주 최저임금 3.5% 인상 — 시간당 A$24.95",
    date: "2025년 7월 1일",
    tag: "임금",
    summary: "공정근로위원회가 2025년 7월 1일부터 최저임금을 시간당 $24.95(주 38시간 기준 주당 $948)로 확정했습니다. 워킹홀리데이 소지자도 동일 적용되며, 미달 지급 시 Fair Work Ombudsman에 신고 가능합니다.",
    link: "https://www.fairwork.gov.au/about-us/workplace-laws/annual-wage-review/annual-wage-review-2024-2025",
    source: "fairwork.gov.au",
  },
  {
    title: "슈퍼애뉴에이션 12%로 인상 — 출국 시 환급 가능",
    date: "2025년 7월 1일",
    tag: "연금",
    summary: "고용주 의무 연금 기여율이 11.5%에서 12%로 최종 인상됐습니다. 워홀러는 출국 시 DASP를 통해 적립금을 환급받을 수 있으나, 환급액의 65%가 세금으로 공제되므로 주의가 필요합니다.",
    link: "https://gettingdownunder.com/working-holiday-visa-australia-updates-from-july-2025/",
    source: "gettingdownunder.com",
  },
  {
    title: "2차 비자 지역 근무 인정 지역 확대 — 재해 복구 포함",
    date: "2025년 4월",
    tag: "2차 비자",
    summary: "2차·3차 워킹홀리데이 비자를 위한 지정 업무 인정 지역이 확대돼 산불·홍수·사이클론 피해 복구 작업도 88일 조건에 포함됩니다. 농업·과수원·수산업 등 기존 인정 업종은 그대로 유지됩니다.",
    link: "https://crossborderedu.org/news/big-changes-in-australia-s-2025-working-holiday-visa-program",
    source: "crossborderedu.org",
  },
  {
    title: "이주 노동자 착취 방지 신법 — 워홀러 보호 강화",
    date: "2024–2025",
    tag: "법률",
    summary: "비자 소지 근로자를 착취하는 고용주에 형사처벌이 가능해졌습니다. 착취 피해 워홀러는 '직장 정의 비자(6개월)'를 신청할 수 있으며, 신고해도 비자가 취소되지 않는 보호 장치가 마련됐습니다.",
    link: "https://www.roammigrationlaw.com/new-migration-laws-will-help-protect-exploited-workers/",
    source: "roammigrationlaw.com",
  },
  {
    title: "2026년 생활비 현황 — 시드니·멜번·브리즈번 비교",
    date: "2026년",
    tag: "생활비",
    summary: "1인 기준 방 1개 아파트 월세는 시드니 약 $2,700, 멜번 $2,460, 브리즈번 $2,600 수준입니다. 쉐어하우스를 활용하면 주당 $200~$350까지 절감 가능하며, Aldi 이용 시 식료품비도 20~30% 낮출 수 있습니다.",
    link: "https://lifecalculators.com.au/guides/cost-living-australia",
    source: "lifecalculators.com.au",
  },
];

const TAG_COLORS: Record<string, string> = {
  "비자": "bg-blue-50 text-blue-700",
  "임금": "bg-green-50 text-green-700",
  "연금": "bg-purple-50 text-purple-700",
  "2차 비자": "bg-orange-50 text-orange-700",
  "법률": "bg-red-50 text-red-700",
  "생활비": "bg-yellow-50 text-yellow-700",
};

function skyscannerUrl(from: string, to: string) {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  d.setDate(1);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `https://www.skyscanner.net/transport/flights/${from}/${to}/${yy}${mm}01/?adults=1&rtn=0&cabinclass=economy`;
}

function nextMonthLabel() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return `${d.getMonth() + 1}월 1일`;
}

const FLIGHT_ROUTES = [
  {
    flag: "🇦🇺",
    label: "시드니",
    codes: "ICN → SYD",
    duration: "약 10시간 10분",
    direct: true,
    fromPrice: "A$400",
    airlines: [
      { iata: "KE", name: "대한항공" },
      { iata: "JQ", name: "제트스타" },
      { iata: "QF", name: "콴타스" },
    ],
    from: "icn",
    to: "syd",
  },
  {
    flag: "🇦🇺",
    label: "멜버른",
    codes: "ICN → MEL",
    duration: "약 13–16시간",
    direct: false,
    fromPrice: "A$270",
    airlines: [
      { iata: "SQ", name: "싱가포르항공" },
      { iata: "CX", name: "캐세이퍼시픽" },
      { iata: "MH", name: "말레이시아항공" },
    ],
    from: "icn",
    to: "mel",
  },
  {
    flag: "🇦🇺",
    label: "브리즈번",
    codes: "ICN → BNE",
    duration: "약 9시간 35분",
    direct: true,
    fromPrice: "A$350",
    airlines: [
      { iata: "KE", name: "대한항공" },
      { iata: "JQ", name: "제트스타" },
      { iata: "SQ", name: "싱가포르항공" },
    ],
    from: "icn",
    to: "bne",
  },
];

export default function Dashboard() {
  useSEO({ title: "대시보드 | 호주잡스", description: "호주잡스 관리자 대시보드", noindex: true });
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rates, setRates] = useState<RateData | null>(null);
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
      const res = await fetch("https://open.er-api.com/v6/latest/KRW");
      const data = await res.json();
      if (data.result === "success") {
        setRates({ aud: data.rates.AUD, usd: data.rates.USD, jpy: data.rates.JPY, eur: data.rates.EUR, date: new Date().toISOString().slice(0, 10) });
        setLoadingRate(false);
        return;
      }
      throw new Error();
    } catch {
      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json");
        const data = await res.json();
        setRates({ aud: data.krw.aud, usd: data.krw.usd, jpy: data.krw.jpy, eur: data.krw.eur, date: new Date().toISOString().slice(0, 10) });
      } catch {
        setRates(null);
      }
    }
    setLoadingRate(false);
  };

  if (loading) return <div className="flex w-full min-h-0 flex-1 items-center justify-center text-muted-foreground">로딩 중...</div>;
  if (!isAdmin) return null;

  const rateForCode = (code: string) => rates?.[code.toLowerCase() as keyof RateData] as number | undefined;

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-8 w-full space-y-5">

        {/* Exchange rate + Flights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Exchange Rate */}
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-sm font-bold text-foreground">🇰🇷 → 🇦🇺 환율</h2>
              <button onClick={fetchRate} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                <RefreshCw className="h-3 w-3" /> 새로고침
              </button>
            </div>
            {loadingRate ? (
              <div className="px-4 py-8 text-sm text-muted-foreground text-center">불러오는 중...</div>
            ) : rates ? (
              <div>
                <div className="px-4 py-4 border-b">
                  <p className="text-2xl font-bold text-foreground">
                    ₩1,000 = <span className="text-primary">A${(rates.aud * 1000).toFixed(3)}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    🇦🇺 A$1 = ₩{Math.round(1 / rates.aud).toLocaleString()} · {rates.date}
                  </p>
                </div>
                <div className="divide-y border-b">
                  {CONVERSION_AMOUNTS.map((krw) => (
                    <div key={krw} className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm text-muted-foreground">₩{krw.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-foreground">A${(rates.aud * krw).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">기타 환율 (₩10,000 기준)</p>
                  {EXTRA_RATES.map(({ code, flag, label }) => {
                    const r = rateForCode(code);
                    if (!r) return null;
                    return (
                      <div key={code} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{flag} {label}</span>
                        <span className="text-sm font-semibold text-foreground">
                          {code === "JPY" ? `¥${(r * 10000).toFixed(1)}` : code === "USD" ? `$${(r * 10000).toFixed(2)}` : `€${(r * 10000).toFixed(2)}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="px-4 py-8 text-sm text-muted-foreground text-center">환율 정보를 불러올 수 없습니다.</div>
            )}
          </div>

          {/* Flights */}
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="text-sm font-bold text-foreground">🇰🇷 최저가 항공편</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{nextMonthLabel()} 편도 기준 · Skyscanner</p>
            </div>
            <div className="divide-y">
              {FLIGHT_ROUTES.map((route) => (
                <a
                  key={route.codes}
                  href={skyscannerUrl(route.from, route.to)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {route.flag} {route.label}
                      </p>
                      <span className="text-[10px] text-muted-foreground">{route.codes}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${route.direct ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        {route.direct ? "직항" : "경유"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{route.duration}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {route.airlines.map((a) => (
                        <img
                          key={a.iata}
                          src={`https://www.gstatic.com/flights/airline_logos/70px/${a.iata}.png`}
                          alt={a.name}
                          title={a.name}
                          className="h-5 w-5 rounded object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-primary">{route.fromPrice}~</p>
                    <ExternalLink className="h-3 w-3 text-muted-foreground mt-1 ml-auto" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* News */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h2 className="text-sm font-bold text-foreground">📰 워킹홀리데이 최신 뉴스</h2>
            <p className="text-xs text-muted-foreground mt-0.5">호주 워킹홀리데이 관련 최신 정보</p>
          </div>
          <div className="divide-y">
            {NEWS_ARTICLES.map((article, i) => (
              <a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${TAG_COLORS[article.tag] ?? "bg-muted text-muted-foreground"}`}>
                      {article.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{article.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{article.summary}</p>
                  <p className="text-xs text-muted-foreground mt-1 opacity-60">{article.source}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* City redirects */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <h2 className="text-base font-semibold text-foreground">지역별 최신 공고 바로가기</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">도시별 한인 구인구직 공고를 확인해보세요.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CITY_LINKS.map((city) => (
              <Link
                key={city.path}
                to={city.path}
                className="flex items-center justify-between rounded-lg border border-primary/20 bg-white px-3 py-3 hover:border-primary/50 hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{city.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{city.sub}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
