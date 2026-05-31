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
    summary: "보건, 안전, 지역 사고, 아시아 안보처럼 호주 생활에 바로 연결되는 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "멜버른 연쇄 흉기 사건 후 지역사회 주의 당부",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/victoria-police-dandenong-north-double-stabbing/106742288",
        summaryKo: "멜버른 동부와 남동부에서 흉기 사건이 이어진 뒤 경찰이 주민들에게 주의를 당부했습니다. 빅토리아 거주자와 야간 이동이 잦은 사람에게 참고가 됩니다.",
        meta: "멜버른 · 안전",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "WA 강풍에 나무가 차량 덮쳐, 추가 악천후 예보",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/intense-storm-hits-wa-thousands-without-power/106741236",
        summaryKo: "서호주 남서부에서 강풍 피해와 정전이 발생했고 추가 악천후가 예보됐습니다. 운전, 통근, 장거리 이동 전 날씨 확인이 필요합니다.",
        meta: "날씨 · 안전",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "호주 디프테리아 확산, NT 보건 데이터 공개 논란",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-30/leaked-nt-health-data-diphtheria-surge-month-before-public-alert/106737280",
        summaryKo: "NT 내부 자료를 통해 디프테리아 확산 시점과 지역별 상황이 드러났습니다. 호주 내 백신 접종과 보건 알림을 확인해야 하는 이유가 됩니다.",
        meta: "보건 · 백신",
        publishedAt: "2026년 5월 30일",
      },
      {
        title: "가자 구호선 활동가들, 국제형사재판소에 진술 제출",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/flotilla-activists-take-evidence-of-alleged-abuse-to-icc/106741964",
        summaryKo: "호주인 활동가들이 구금 중 학대 의혹 자료를 국제형사재판소에 제출했습니다. 해외여행, 시위 참여, 영사 지원 이슈를 이해하는 데 참고가 됩니다.",
        meta: "호주인 · 해외안전",
        publishedAt: "2026년 5월 31일",
      },
    ],
  },
  {
    key: "jobs",
    labelKo: "일자리",
    summary: "구직, 이직, 실업 지원, 지역 고용처럼 호주에서 일하는 사람에게 필요한 뉴스를 정리했습니다.",
    tone: "from-emerald-50 to-white border-emerald-100",
    stories: [
      {
        title: "정부 고용서비스 개편, 실제 변화인지 분석",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/albanese-government-overhauling-employment-services-or-tinkering/106733294",
        summaryKo: "센터링크, 구직 서비스, 상호의무 제도 변화가 실제로 얼마나 달라질지 짚은 분석입니다. 구직 중이거나 지원 제도를 이용하는 사람에게 유용합니다.",
        meta: "구직 · 센터링크",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "전자자전거가 호주 도시에 급증한 배경",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/why-are-e-bikes-suddenly-all-over-australias-streets/106691184",
        summaryKo: "배달, 통근, 도로 안전과 연결되는 e-bike 확산 배경을 다룹니다. 배달 일을 하거나 도심 통근을 하는 사람에게 실용적인 기사입니다.",
        meta: "배달 · 교통",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "AUKUS 조정으로 호주 방위산업 계획 변화",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/australia-to-buy-second-hand-united-states-submarines-aukus/106742496",
        summaryKo: "호주가 새 잠수함 구매 대신 중고 미국 잠수함 도입으로 계획을 바꿨습니다. 방위산업, 엔지니어링, 지역 제조 일자리를 보는 사람에게 의미가 있습니다.",
        meta: "방위산업 · 일자리",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "WA 콜리 방위산업 허브 구상, 일자리 기대와 의문",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-30/collie-missiles-wa-government-plan-analysis/106726962",
        summaryKo: "석탄 산업 전환 지역에 방위 제조 일자리를 만들겠다는 구상이 나왔지만 실현 가능성에는 의문이 제기됩니다. 지역 산업 전환과 숙련직 수요를 보는 기사입니다.",
        meta: "산업 · 지역고용",
        publishedAt: "2026년 5월 30일",
      },
    ],
  },
  {
    key: "housing",
    labelKo: "주거·생활비",
    summary: "렌트, 주택 안전, 보험, 물가처럼 매달 지출에 직접 연결되는 기사를 골랐습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "주택장관, 예산안이 집값 급락 원인은 아니라고 반박",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/budget-house-prices-fall-oneil/106742070",
        summaryKo: "네거티브 기어링과 자본이득세 변경 논의가 주택시장에 미칠 영향을 다룹니다. 첫 집 마련, 렌트, 장기 체류 계획을 세우는 사람에게 중요합니다.",
        meta: "주택 · 예산",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "젊은 유권자, 예산안에 냉담… 주거 정책도 쟁점",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/pauline-hanson-preferred-prime-minister-gen-x-redbridge-poll/106742802",
        summaryKo: "정부 예산안에 대한 젊은 층 반응과 주택·세금 정책 논쟁을 함께 보여줍니다. 워홀러와 유학생도 호주 정치 분위기를 이해하는 데 도움이 됩니다.",
        meta: "주거 · 정치",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "브리즈번 빅토리아파크 보호 신청 일부 기각",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/victoria-park-cultural-heritage-applications-olympic-games/106740566",
        summaryKo: "올림픽 경기장 공사 시작을 앞두고 빅토리아파크 보호 신청 일부가 기각됐습니다. 브리즈번 생활권의 개발, 교통, 녹지 이슈와 연결됩니다.",
        meta: "브리즈번 · 개발",
        publishedAt: "2026년 5월 31일",
      },
    ],
  },
  {
    key: "travel",
    labelKo: "여행·교통",
    summary: "공항, 도로, 이동, 여행 안전처럼 호주 안팎을 오갈 때 필요한 뉴스를 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "비비드 시드니 드론쇼, 추락 사고 뒤 남은 일정 취소",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-30/vivid-sydney-drone-shows-cancelled-after-harbour-crashes/106739784",
        summaryKo: "시드니 야간 행사 방문을 계획했다면 드론쇼 대신 불꽃놀이로 바뀐 일정을 확인해야 합니다. 관광·데이트·가족 나들이에 바로 영향이 있습니다.",
        meta: "시드니 · 행사",
        publishedAt: "2026년 5월 30일",
      },
      {
        title: "라오스 동굴 구조 계속, 호주 다이버도 지원",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/laos-cave-rescue-search-continues-two-more-divers/106742560",
        summaryKo: "동남아 여행지에서 발생한 동굴 사고 구조가 이어지고 있습니다. 우기 여행, 동굴·산악 활동, 현지 안전 정보 확인의 중요성을 보여줍니다.",
        meta: "동남아 · 여행안전",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "오늘 밤 보름달, 블루문과 마이크로문이 겹쳐",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/blue-moon-micromoon-may/106742232",
        summaryKo: "호주 전역에서 볼 수 있는 하늘 관측 소식입니다. 주말 저녁 산책이나 가족 나들이를 계획하는 사람에게 가볍게 참고하기 좋습니다.",
        meta: "생활 · 나들이",
        publishedAt: "2026년 5월 31일",
      },
      {
        title: "지역 WA, 스포츠 밖 커뮤니티 모임 늘어",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-31/kimberley-gaming-groups-alternative-to-sport/106734440",
        summaryKo: "보드게임과 게임 모임이 지역 주민의 연결 통로가 되고 있습니다. 새 도시나 지방에 정착한 한인에게 커뮤니티 찾기 아이디어가 됩니다.",
        meta: "커뮤니티 · 지역생활",
        publishedAt: "2026년 5월 31일",
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
