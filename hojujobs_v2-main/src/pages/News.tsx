import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { useSEO } from "@/hooks/useSEO";

type NewsTopic = {
  key: string;
  labelKo: string;
  summary: string;
  tone: string;
  stories: Array<{
    title: string;
    source: string;
    sourceUrl: string;
    summaryKo: string;
    meta: string;
    publishedAt: string;
  }>;
};

function translatedUrl(url: string) {
  return `https://translate.google.com/translate?sl=auto&tl=ko&u=${encodeURIComponent(url)}`;
}

function domainFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const NEWS_TOPICS: NewsTopic[] = [
  {
    key: "stay",
    labelKo: "체류·안전",
    summary: "동네 치안, 연휴 안전, 해안 사고, 재난 복구처럼 호주 생활에 바로 연결되는 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "로즈·리드콤 절도, 에핑·이스트우드 폭행 증가",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/explainer-nsw-crime-statistics-in-2025/gpeq34u81",
        summaryKo: "SBS 한국어가 한인 밀집 지역의 NSW 범죄 통계를 정리했습니다. 이사, 렌트, 자녀 학군, 야간 이동을 고민하는 시드니 한인에게 바로 도움이 됩니다.",
        meta: "시드니 · 한인동네",
        publishedAt: "2026년 6월 5일",
      },
      {
        title: "펀치볼 장례 예정 장소에서 총격 신고",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/crime-scenes-set-up-after-report-of-shots-punchbowl/106767726",
        summaryKo: "시드니 남서부 펀치볼의 한 장소에서 총격 신고가 접수돼 경찰이 현장을 조사했습니다. 서부·남서부 시드니 거주자에게 지역 안전 알림으로 볼 수 있습니다.",
        meta: "시드니 · 치안",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "WA 올버니 앞바다서 4.5m 상어 공격으로 다이버 사망",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/diver-dies-in-shark-attack-off-albany-western-australia/106768050",
        summaryKo: "서호주 올버니 인근 해상에서 다이버가 상어 공격으로 숨졌습니다. 낚시, 다이빙, 해안 여행을 계획하는 사람에게 해양 안전을 다시 확인하게 합니다.",
        meta: "WA · 해양안전",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "QLD 재난 복구 지원 변경안에 지방정부 반발",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/queensland-disaster-recovery-funding-changes-proposal/106768086",
        summaryKo: "퀸즐랜드 지방정부들이 연방 재난 복구 지원 방식 변경안에 반발하고 있습니다. 홍수·폭풍 피해가 잦은 지역에 사는 사람에게 복구 속도와 지역 서비스 이슈입니다.",
        meta: "QLD · 재난복구",
        publishedAt: "2026년 6월 6일",
      },
    ],
  },
  {
    key: "jobs",
    labelKo: "일자리",
    summary: "시장 변동, 농업·식품 산업, 외교·무역, 세금 신고처럼 호주에서 일하는 사람에게 필요한 뉴스를 정리했습니다.",
    tone: "from-emerald-50 to-white border-emerald-100",
    stories: [
      {
        title: "미국 증시 올해 최대 하락, 기술주 매도와 금리 우려",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/wall-street-worst-losses-in-months-after-tech-sell-of/106767532",
        summaryKo: "강한 미국 고용 지표와 금리 인상 우려로 기술주 중심 매도가 커졌습니다. 슈퍼, 주식 투자, IT·스타트업 업계 흐름을 보는 한인에게 참고가 됩니다.",
        meta: "시장 · 투자",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "호주 렌틸콩 생산 220만 톤 전망, 농업 호조",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/australia-forecast-to-produce-record-lentil-crop/106764218",
        summaryKo: "다른 겨울 작물은 줄어도 렌틸콩은 기록적 생산이 예상됩니다. 농업, 물류, 식품 수출, 지역 일자리를 보는 사람에게 산업 흐름을 보여줍니다.",
        meta: "농업 · 식품산업",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "호주·뉴질랜드, 불안정한 세계 속 경제 협력 강조",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/pm-anthony-albanese-christoper-luxon-australia-new-zealand-talks/106767688",
        summaryKo: "양국 정상 회담에서 글로벌 변동성과 경제 협력이 주요 의제로 다뤄졌습니다. 호주·뉴질랜드 왕래, 무역, 관광, 지역 비즈니스에 관심 있는 사람에게 배경이 됩니다.",
        meta: "무역 · 지역경제",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "양도소득세 개편안, 세금 신고 더 복잡해질 가능성",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/proposed-capital-gains-tax-changes/slwc0j8x8",
        summaryKo: "SBS 한국어는 CGT 개편안이 개인 투자자와 세무 신고 방식에 줄 수 있는 영향을 설명했습니다. 부동산·ETF·주식 투자자와 회계·세무 업계 종사자에게 중요합니다.",
        meta: "세금 · 회계",
        publishedAt: "2026년 6월 5일",
      },
    ],
  },
  {
    key: "housing",
    labelKo: "주거·생활비",
    summary: "주거 세금, 노숙 증가, 재난 복구, 식비처럼 매달 지출과 거주 계획에 연결되는 기사를 골랐습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "그래니 플랫, 네거티브 기어링 세금 혜택 제외 확인",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko",
        summaryKo: "재무부가 기존 주택에 붙인 그래니 플랫은 네거티브 기어링 대상 신규 주택으로 보지 않는다고 확인했습니다. 렌트 수입, 부모님 거주, 투자용 주택을 고민하는 한인에게 실용적입니다.",
        meta: "주택세금 · 렌트",
        publishedAt: "2026년 6월 5일",
      },
      {
        title: "일라와라·쇼얼헤이븐 거리 노숙 급증",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/korean-short-news-050626/uhm5gyfp5",
        summaryKo: "SBS 한국어 브리핑은 NSW 남부 일부 지역의 거리 노숙 급증을 전했습니다. 렌트 위기, 지역 이주, 생활비 압박을 이해하는 데 도움이 됩니다.",
        meta: "렌트위기 · NSW",
        publishedAt: "2026년 6월 5일",
      },
      {
        title: "QLD 재난 복구 지원 변경안, 지역 비용 부담 우려",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/queensland-disaster-recovery-funding-changes-proposal/106768086",
        summaryKo: "재난 복구 재정 지원 기준이 바뀔 경우 지방정부 부담이 커질 수 있다는 우려가 나왔습니다. 홍수·폭풍 피해 지역의 도로, 주택, 보험·요금 문제와 연결됩니다.",
        meta: "재난복구 · 비용",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "호주 렌틸콩 기록 생산 전망, 식품 가격에도 관심",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/australia-forecast-to-produce-record-lentil-crop/106764218",
        summaryKo: "겨울 작물 전망이 엇갈리는 가운데 렌틸콩은 기록적 생산이 예상됩니다. 장보기, 식품 공급, 농산물 가격 흐름을 보는 데 참고할 만합니다.",
        meta: "식비 · 농산물",
        publishedAt: "2026년 6월 6일",
      },
    ],
  },
  {
    key: "travel",
    labelKo: "여행·교통",
    summary: "여행 사기, 동남아 안전, 해양 사고, 한국 문화 행사처럼 호주 안팎을 오갈 때 필요한 뉴스를 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "Booking.com 예약 정보 악용 피싱 사기 증가",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/booking-com-scammers-target-travel-reservations/106759168",
        summaryKo: "여행객들이 실제 예약 정보가 포함된 가짜 메시지로 피싱 피해를 호소하고 있습니다. 한국 방문, 동남아 여행, 워홀러 장거리 여행 전 결제 보안을 확인해야 합니다.",
        meta: "여행사기 · 보안",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "라오스 동굴 구조 수색 중단, 우기 여행 안전 주의",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/rescuers-halt-search-for-two-last-men-lost-in-laos-cave/106768438",
        summaryKo: "라오스 동굴에 갇힌 남성 2명에 대한 수색이 악화된 조건 때문에 중단됐습니다. 동남아 우기 여행, 동굴·산악 액티비티 전 안전 정보를 확인해야 합니다.",
        meta: "동남아 · 여행안전",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "WA 올버니 다이버 사망, 해안 레저 안전 경보",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-06/diver-dies-in-shark-attack-off-albany-western-australia/106768050",
        summaryKo: "WA 남부 해안에서 상어 공격으로 다이버가 숨졌습니다. 해변 여행, 낚시, 스노클링, 다이빙 계획 전 지역 안전 알림을 확인할 필요가 있습니다.",
        meta: "WA · 해안여행",
        publishedAt: "2026년 6월 6일",
      },
      {
        title: "AKMU 9월 시드니·멜버른 호주 투어 확정",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/akmu-new-album-australia-bts-13th-anniversary/pyaaogyp7",
        summaryKo: "SBS 한국어는 AKMU가 새 앨범과 함께 9월 시드니와 멜버른에서 공연한다고 전했습니다. 한인 커뮤니티 문화 일정과 도시 방문 계획에 참고하기 좋습니다.",
        meta: "K-팝 · 도시행사",
        publishedAt: "2026년 6월 6일",
      },
    ],
  },
];

export default function News() {
  useSEO({
    title: "뉴스 | Hoju Jobs",
    description: "호주에 사는 한국인이 알아두면 좋은 체류, 일자리, 주거, 생활비, 여행 뉴스를 한국어로 확인하세요.",
    canonical: "https://hojujobs.com/news",
    htmlLang: "ko",
    ogLocale: "ko_KR",
  });

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-[#f7f8fb]">
      <Header />

      <main className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <section className="mb-7 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-[#111] px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-normal text-slate-400">호주 생활 뉴스 브리핑</p>
                <h1 className="mt-1 text-2xl font-black tracking-normal text-white sm:text-3xl">뉴스</h1>
              </div>
            </div>
          </div>
          <nav className="grid grid-cols-4 divide-x divide-slate-200 bg-white" aria-label="뉴스 주제">
            {NEWS_TOPICS.map((topic) => (
              <a
                key={topic.key}
                href={`#${topic.key.toLowerCase()}`}
                className="px-2 py-3 text-center text-xs font-black text-slate-900 transition-colors hover:bg-slate-50 sm:px-5 sm:text-lg"
              >
                {topic.labelKo}
              </a>
            ))}
          </nav>
        </section>

        <div className="grid gap-5">
          {NEWS_TOPICS.map((topic) => (
            <section
              key={topic.key}
              id={topic.key.toLowerCase()}
              className={`overflow-hidden rounded-lg border bg-gradient-to-br ${topic.tone}`}
            >
              <div className="grid gap-0 lg:grid-cols-[17rem_1fr]">
                <div className="border-b border-inherit bg-white/55 p-3 sm:p-5 lg:border-b-0 lg:border-r">
                  <h2 className="text-xl font-black tracking-normal text-slate-950 sm:text-2xl">{topic.labelKo}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:mt-3 sm:text-sm">{topic.summary}</p>
                </div>

                <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-1">
                  {topic.stories.map((story) => (
                    <article key={story.sourceUrl} className="flex min-h-[13rem] flex-col rounded-lg border border-white/70 bg-white p-4 shadow-sm lg:min-h-0">
                      <div className="mb-3 flex items-center justify-between gap-3 lg:mb-2">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{story.meta}</span>
                        <span className="text-right text-[11px] font-medium text-slate-400">{story.publishedAt}</span>
                      </div>
                      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_9.5rem] lg:items-end lg:gap-4">
                        <div className="min-w-0">
                          <h3 className="text-base font-black leading-snug text-slate-950">{story.title}</h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{story.summaryKo}</p>
                          <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                            {story.source} · {domainFromUrl(story.sourceUrl)}
                          </p>
                        </div>
                        <a
                          href={translatedUrl(story.sourceUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-slate-950 px-3 text-xs font-bold text-white transition-colors hover:bg-primary lg:mt-0"
                        >
                          기사 보기
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
