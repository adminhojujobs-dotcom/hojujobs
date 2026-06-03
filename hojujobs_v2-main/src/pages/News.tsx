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
    summary: "치안, 자녀 돌봄, 도로 안전, 지역 사건처럼 호주 생활에 바로 연결되는 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "QLD 보육교사, 영유아 폭행 혐의로 징역 4년",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/childcare-worker-edwina-ling-jailed-for-assaulting-toddlers/106755394",
        summaryKo: "퀸즐랜드 보육교사가 세 명의 어린이를 상대로 한 80건 이상의 폭행 혐의로 실형을 선고받았습니다. 자녀를 보육시설에 맡기는 한인 가정이 시설 점검과 신고 절차를 확인할 계기가 됩니다.",
        meta: "QLD · 보육안전",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "시드니 동부 5중 추돌 뒤 음주 측정 거부 혐의",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/tpg-capital-boss-joel-thickins-sydney-bmw-crash/106754848",
        summaryKo: "사모펀드 임원이 시드니 동부에서 차량 여러 대를 들이받은 뒤 음주 검사를 거부했다는 혐의를 받고 있습니다. 운전, 보험, 야간 이동 안전을 생각하게 하는 기사입니다.",
        meta: "시드니 · 도로안전",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "투움바 쇼핑센터 흉기 사건, 1명 체포",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/grand-central-toowoomba-stabbing/106755766",
        summaryKo: "퀸즐랜드 지역 대형 쇼핑센터에서 20대 남성이 흉기에 찔린 뒤 한 명이 체포됐습니다. 지방 거주자와 가족 나들이객에게 지역 안전 알림으로 볼 수 있습니다.",
        meta: "QLD · 쇼핑센터",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "WA 해상서 도주자 태운 요트 적발",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/exmouth-arrest-of-qld-fugitive/106756602",
        summaryKo: "서호주 엑스머스 앞바다에서 경찰과 AFP가 도주자를 태운 것으로 의심되는 요트를 적발했습니다. 해안 여행과 보트 이용이 많은 지역의 치안 소식입니다.",
        meta: "WA · 해상치안",
        publishedAt: "2026년 6월 3일",
      },
    ],
  },
  {
    key: "jobs",
    labelKo: "일자리",
    summary: "AI 채용 변화, 경기 흐름, 무역, 자원 산업처럼 호주에서 일하는 사람에게 필요한 뉴스를 정리했습니다.",
    tone: "from-emerald-50 to-white border-emerald-100",
    stories: [
      {
        title: "AI가 일부 채용을 늦추지만 인간 역량 수요는 유지",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-04/deloitte-report-ai-jobs-employment-hiring/106751154",
        summaryKo: "딜로이트 보고서는 AI가 채용 속도를 늦추고 직무를 재편하고 있다고 분석했습니다. 사무직, 마케팅, IT, 관리직을 찾는 한인 구직자에게 중요한 신호입니다.",
        meta: "AI · 취업",
        publishedAt: "2026년 6월 4일",
      },
      {
        title: "호주 경제 연 2.5% 성장, 둔화 시작 신호",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/gdp-march-quarter-2026-australia/106753788",
        summaryKo: "분기 GDP 수치가 발표되며 경제 둔화가 시작됐다는 분석이 나왔습니다. 구직, 임금 협상, 비즈니스 운영, 유학 후 취업 계획을 세우는 사람에게 배경이 됩니다.",
        meta: "경제 · 고용",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "호주, 강제노동 단속 미흡 이유로 미국 관세 압박",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/australia-faces-proposed-us-tariff-over-forced-labour-crackdown/106756686",
        summaryKo: "미국이 강제노동 관련 수입 단속을 이유로 호주에 12.5% 관세를 제안했습니다. 무역, 수입, 리테일, 물류 업계에서 일하는 사람에게 파급이 있을 수 있습니다.",
        meta: "무역 · 산업",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "칼굴리 슈퍼핏 금 매장량 증가, 광산 고용 기대",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/gold-reserves-at-kalgoorlie-super-pit-grow-with-drilling/106753776",
        summaryKo: "WA 슈퍼핏 금광의 매장량이 늘며 광산 수명이 연장될 전망입니다. FIFO, 엔지니어링, 광산·건설 일자리를 보는 사람에게 산업 흐름을 보여줍니다.",
        meta: "WA · 광산일자리",
        publishedAt: "2026년 6월 3일",
      },
    ],
  },
  {
    key: "housing",
    labelKo: "주거·생활비",
    summary: "집 관리, 수도 인프라, 교통비, 생활 물가처럼 매달 지출과 거주 계획에 연결되는 기사를 골랐습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "겨울 집 곰팡이 예방과 청소법 정리",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/preventing-and-cleaning-mould-in-home/106752722",
        summaryKo: "겨울철 난방과 결로로 곰팡이가 늘기 쉬운 시기에 예방과 청소 방법을 설명합니다. 렌트집, 쉐어하우스, 아이가 있는 집 모두에게 실용적입니다.",
        meta: "주거관리 · 건강",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "WA 수도관·하수 민원 증가, 관리 부담 커져",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/wa-water-corp-defends-leaks-and-spills/106755720",
        summaryKo: "Water Corp가 누수와 하수 유출 민원 증가에 대해 인프라 관리 어려움을 설명했습니다. WA 거주자에게 수도, 집 주변 시설, 지역 서비스 품질 이슈입니다.",
        meta: "WA · 생활인프라",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "호주 전기차 판매 사상 최고, 하이브리드도 강세",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/electric-vehicle-sales-in-australia-hit-new-high-in-may/106754768",
        summaryKo: "지난달 신차 판매에서 전기차와 하이브리드 비중이 크게 늘었습니다. 차량 구매, 통근비, 배달·영업용 차량을 고민하는 사람에게 참고가 됩니다.",
        meta: "교통비 · 차량",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "불법 담배 비중 80% 추정, 가격과 단속 논쟁",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/abs-estimates-80pc-of-tobacco-used-in-australia-illegal/106756000",
        summaryKo: "ABS 실험 추정에 따르면 지난해 호주 담배 소비의 상당 부분이 불법 유통으로 나타났습니다. 편의점·리테일 운영자와 생활비·법규를 보는 독자에게 관련 있습니다.",
        meta: "리테일 · 생활비",
        publishedAt: "2026년 6월 3일",
      },
    ],
  },
  {
    key: "travel",
    labelKo: "여행·교통",
    summary: "항공, 해외 안전, 장거리 이동, 지역 행사처럼 호주 안팎을 오갈 때 필요한 뉴스를 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "델리 호텔 화재로 21명 사망, 여행 숙소 안전 경각심",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/fire-at-delhi-hotel-kills-at-least-21-people/106757012",
        summaryKo: "인도 델리의 호텔 겸 식당 건물 화재로 최소 21명이 숨졌습니다. 해외여행이나 경유 여행 때 숙소 비상구와 안전 기준을 확인해야 하는 이유를 보여줍니다.",
        meta: "해외여행 · 숙소안전",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "쿠웨이트 공항 공격, 중동 항공 안전 변수 확대",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/us-and-iran-launch-strikes-qeshm-island/106752864",
        summaryKo: "쿠웨이트 국제공항을 겨냥한 공격으로 사상자가 발생했고 항공 운항 안전 우려가 커졌습니다. 한국·중동·유럽 경유 항공권을 확인하는 사람에게 중요한 지역 정세입니다.",
        meta: "항공 · 중동",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "엑스머스 앞바다 요트 적발, 해안 여행 치안 주의",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/exmouth-arrest-of-qld-fugitive/106756602",
        summaryKo: "WA 북부 인기 여행지 엑스머스 인근에서 도주자를 태운 것으로 의심되는 요트가 적발됐습니다. 장거리 로드트립과 해양 투어 계획 전 지역 뉴스를 확인할 만합니다.",
        meta: "WA · 해안여행",
        publishedAt: "2026년 6월 3일",
      },
      {
        title: "핀케 사막 레이스 영화화, NT 지역 관광 관심",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-06-03/chris-hemsworth-to-bring-finke-desert-race-to-big-screen/106748736",
        summaryKo: "크리스 헴스워스가 NT 핀케 사막 레이스 영화화를 지원한다는 소식입니다. 앨리스스프링스와 아웃백 여행, 지역 행사에 관심 있는 사람에게 가벼운 참고가 됩니다.",
        meta: "NT · 지역행사",
        publishedAt: "2026년 6월 3일",
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
