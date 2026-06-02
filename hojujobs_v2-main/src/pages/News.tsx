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
    summary: "치안, 학교 안전, 날씨, 공공기관 변화처럼 호주 생활에 바로 연결되는 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "NSW 경찰, 바디캠 의무 사용 확대 추진",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/nsw-police-move-to-mandatory-body-worn-camera-use-four-corners/106748546",
        summaryKo: "NSW 경찰이 경찰권 행사나 물리력 사용 때 바디캠 녹화를 의무화하는 방안을 검토합니다. 시드니 거주자와 유학생, 워홀러가 알아두면 좋은 치안 변화입니다.",
        meta: "NSW · 치안",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "멜버른 주말 흉기 사건, 20대 남성 기소",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/victoria-police-dandenong-north-double-stabbing/106742288",
        summaryKo: "멜버른 동부와 남동부에서 발생한 별도 흉기 사건과 관련해 27세 남성이 기소됐습니다. 야간 이동, 근무 후 귀가, 지역 안전 확인에 참고가 됩니다.",
        meta: "멜버른 · 안전",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "퀸즐랜드 학교 대상 극단주의 모의 혐의에 학부모 충격",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/parents-shocked-school-was-the-target-of-violent-extremist-plan/106748782",
        summaryKo: "13세 학생이 학교를 겨냥한 폭력적 극단주의 혐의로 기소됐습니다. 자녀가 학교에 다니는 한인 가정에는 학교 안전 대응을 살펴볼 계기가 됩니다.",
        meta: "QLD · 학교안전",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "SA 전 해안에 비정상적 만조 경보",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/weather-warnings-sa-as-rain-and-wind-combine-with-high-tides/106750084",
        summaryKo: "남호주 전 해안에 높은 조수와 강풍, 비가 겹치는 날씨 경보가 내려졌습니다. 해안 드라이브, 낚시, 캠핑 전 안전 정보를 확인해야 합니다.",
        meta: "SA · 날씨",
        publishedAt: "2026년 6월 2일",
      },
    ],
  },
  {
    key: "jobs",
    labelKo: "일자리",
    summary: "임금, 산업 변화, 유학생·졸업생, 서비스업처럼 호주에서 일하는 사람에게 필요한 뉴스를 정리했습니다.",
    tone: "from-emerald-50 to-white border-emerald-100",
    stories: [
      {
        title: "호주 최저임금 4.75% 인상, 7월부터 시급 26.44달러",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/2026-national-minimum-wage-decision/aqa9pc7e4",
        summaryKo: "공정근로위원회 결정으로 약 280만 명의 최저임금·어워드 근로자 임금이 오릅니다. 카페, 식당, 리테일, 청소, 돌봄 업종에서 일하는 한인에게 바로 연결됩니다.",
        meta: "임금 · 근로조건",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "보그스 양조장 폐쇄, 호스피탈리티 업계 비용 압박",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/boags-brewery-closure-shock/106749180",
        summaryKo: "태즈매니아의 145년 된 보그스 양조장이 생산 중단을 예고했습니다. 바, 레스토랑, 양조·관광 업계 일자리와 가격 상승 압박을 보여주는 사례입니다.",
        meta: "호스피탈리티 · 비용",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "울런공대 임원 채용·컨설팅 의혹, ICAC 조사",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/icac-to-investigate-university-of-wollongong-allegations/106750100",
        summaryKo: "대학 임원 채용과 컨설팅 계약 관련 의혹이 반부패 조사 대상이 됐습니다. 유학생, 졸업생, 대학 취업을 고려하는 사람에게 기관 신뢰와 채용 투명성 이슈입니다.",
        meta: "대학 · 채용",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "INPEX 가스 노동자 파업, 임금 협상 난항",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/nt-gas-inpex-workers-on-strike/106748460",
        summaryKo: "NT 주요 가스 프로젝트 노동자들이 임금과 조건 협상 지연으로 파업에 나섰습니다. 자원·엔지니어링·FIFO 일을 보는 사람에게 산업 임금 흐름을 보여줍니다.",
        meta: "자원산업 · 임금",
        publishedAt: "2026년 6월 2일",
      },
    ],
  },
  {
    key: "housing",
    labelKo: "주거·생활비",
    summary: "집값, 렌트, 장바구니, 인구 증가처럼 매달 지출과 거주 계획에 직접 연결되는 기사를 골랐습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "호주 집값 최대 10% 하락 전망, 시드니·멜번 둔화",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/korean-short-news-020626/3cz8frxv5",
        summaryKo: "SBS 한국어 브리핑은 시드니와 멜번 집값 둔화, 금리, 세제 변화, 이민 감소 흐름을 함께 짚었습니다. 집 구매와 렌트 전략을 고민하는 사람에게 중요합니다.",
        meta: "주택시장 · 한국어",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "호주 부동산, 지금이 정말 바이어의 시장일까?",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/explainer-is-australia-really-a-buyers-market/3gnf6vk2j/",
        summaryKo: "집값 조정에도 좋은 매물 부족과 대출 부담은 여전하다는 분석입니다. 첫 집 마련, 장기 체류, 투자 여부를 고민하는 한인에게 실용적인 설명입니다.",
        meta: "부동산 · 설명",
        publishedAt: "2026년 6월 1일",
      },
      {
        title: "기름값은 내렸는데 장바구니 부담은 여전",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/on-the-money-fuel-prices-inflation-household-spending-stamps/3gvblqy3v",
        summaryKo: "연료 가격 하락에도 식료품과 기업 비용 압박은 남아 있다는 경제 설명입니다. 차량 통근, 배달 일, 식비 관리가 필요한 사람에게 도움이 됩니다.",
        meta: "생활비 · 물가",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "호주 인구 2,800만 돌파, 2031년 3,000만 전망",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/australias-population-has-reached-28-million/rodjm164e",
        summaryKo: "인구 증가와 순이민 변화는 렌트 경쟁, 일자리, 인프라 수요와 이어집니다. 호주에 장기 정착하려는 한인이 흐름을 이해하기 좋습니다.",
        meta: "인구 · 정착",
        publishedAt: "2026년 6월 2일",
      },
    ],
  },
  {
    key: "travel",
    labelKo: "여행·교통",
    summary: "항공, 해안 날씨, 한국 왕래, 지역 행사처럼 호주 안팎을 오갈 때 필요한 뉴스를 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "브룸 항공기 사고, 엔진 차단 여부 조사",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/transport-bureau-investigate-pilot-broome-plane-crash/106750682",
        summaryKo: "교통안전당국이 브룸 인근 소형기 추락 전 엔진이 꺼졌는지 조사 중입니다. 지역 항공편과 관광 투어를 이용할 때 안전 뉴스로 참고할 만합니다.",
        meta: "항공 · 여행안전",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "라오스 동굴 실종 구조, 수직 통로 수색으로 전환",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/laos-cave-rescue-search-continues-two-more-divers/106742560",
        summaryKo: "라오스 동굴 실종자 구조가 깊은 수직 통로 수색으로 이어지고 있습니다. 동남아 여행, 우기 액티비티, 현지 안전 확인의 중요성을 보여줍니다.",
        meta: "동남아 · 여행안전",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "멜버른 스타즈·레니게이즈 합병 추진",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-02/cricket-merger/106752052",
        summaryKo: "크리켓 빅배시리그의 멜버른 두 팀을 하나로 합치는 방안이 추진됩니다. 여름 스포츠 관람, 가족 나들이, 지역 커뮤니티 이벤트를 즐기는 사람에게 관심사입니다.",
        meta: "멜버른 · 스포츠",
        publishedAt: "2026년 6월 2일",
      },
      {
        title: "멜버른 한인 셰프, 로컬 식재료로 한식 파인다이닝 조명",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/korean-cuisine-through-farm-to-table-mika-chaes-story/ayv519jfz",
        summaryKo: "멜버른 도주의 미카 채 셰프 이야기는 한식, 지역 식재료, 호주 외식 문화를 잇습니다. 맛집 탐방과 한인 커뮤니티 소식으로 보기 좋습니다.",
        meta: "멜버른 · 한인사회",
        publishedAt: "2026년 6월 2일",
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
