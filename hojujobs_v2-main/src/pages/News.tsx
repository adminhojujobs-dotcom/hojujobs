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
    summary: "보건, 안전, 지역 법 변화처럼 호주 생활에 바로 연결되는 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "호주 디프테리아 확산, NT 보건 데이터 공개 논란",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-30/leaked-nt-health-data-diphtheria-surge-month-before-public-alert/106737280",
        summaryKo: "NT 내부 자료를 통해 디프테리아 확산 시점과 지역별 상황이 드러났습니다. 호주 내 백신 접종과 보건 알림을 확인해야 하는 이유가 됩니다.",
        meta: "보건 · 백신",
        publishedAt: "2026년 5월 30일",
      },
      {
        title: "여성 치매 위험 요인 인지도 낮아, 정부 캠페인 검토",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-29/dementia-alzheimers-risk-factors-women/106731056",
        summaryKo: "호주 여성의 주요 사망 원인과 예방 가능한 위험 요인을 다룬 기사입니다. 가족 돌봄과 장기 건강 계획을 세우는 한인 가정에 참고가 됩니다.",
        meta: "건강 · 가족",
        publishedAt: "2026년 5월 29일",
      },
      {
        title: "ACT, 강압적 통제 범죄화 법안 추진",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-28/act-government-tables-coercive-control-laws/106732024",
        summaryKo: "신체 폭력이 없어도 반복적인 통제와 감시, 고립을 처벌할 수 있는 법안입니다. 호주 각 주의 가정폭력 대응 변화를 이해하는 데 도움이 됩니다.",
        meta: "안전 · 법",
        publishedAt: "2026년 5월 28일",
      },
      {
        title: "아시아 안보 회의서 미국, 중국 견제 메시지",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-30/pete-hegseth-us-will-prevent-china-hegemony-shangri-la-dialogue/106740596",
        summaryKo: "싱가포르 샹그릴라 대화에서 미국과 호주가 아시아 안보, 해저 케이블, 중국 견제 문제를 언급했습니다. 한국과 호주를 오가는 독자에게 지역 정세 배경이 됩니다.",
        meta: "아시아 · 안보",
        publishedAt: "2026년 5월 30일",
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
        title: "오피스웍스, 시드니·멜버른 일자리 수백 개 해외 이전",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-29/nsw-officeworks-to-offshore-hundreds-of-jobs/106733660",
        summaryKo: "고객센터와 기술 지원 등 일부 역할이 필리핀과 인도로 이전될 예정입니다. 사무직·고객응대·IT 지원직을 찾는 구직자에게 고용시장 흐름을 보여줍니다.",
        meta: "고용 · 사무직",
        publishedAt: "2026년 5월 29일",
      },
      {
        title: "지역 호주, 이민 감축 논의에 필수 인력 우려",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-28/regional-concerns-about-national-migration-discussion/106719098",
        summaryKo: "농업, 육가공, 보건·노인 돌봄 분야가 해외 인력에 크게 의존한다는 내용입니다. 지역 취업이나 스폰서십을 고려하는 사람에게 중요합니다.",
        meta: "이민 · 지역일자리",
        publishedAt: "2026년 5월 28일",
      },
      {
        title: "WA 콜리 방위산업 허브 구상, 일자리 기대와 의문",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-30/collie-missiles-wa-government-plan-analysis/106726962",
        summaryKo: "석탄 산업 전환 지역에 방위 제조 일자리를 만들겠다는 구상이 나왔지만 실현 가능성에는 의문이 제기됩니다. 지역 산업 전환과 숙련직 수요를 보는 기사입니다.",
        meta: "산업 · 지역고용",
        publishedAt: "2026년 5월 30일",
      },
      {
        title: "소기업, 자본이득세 개편안이 투자 유치에 부담 주장",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-29/small-business-says-labor-cgt-plan-handcuffs-ambition/106735040",
        summaryKo: "창업자와 투자자에게 영향을 줄 수 있는 세제 논쟁입니다. 호주에서 소규모 사업, 프랜차이즈, 스타트업을 생각하는 한인에게 참고가 됩니다.",
        meta: "창업 · 세금",
        publishedAt: "2026년 5월 29일",
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
        title: "선샤인코스트 Aura South, 최대 1만2천 가구 개발 승인 단계",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-29/stockland-aura-south-federal-government-approval/106731014",
        summaryKo: "칼룬드라 남쪽에 대규모 주택 공급이 추진됩니다. 퀸즐랜드 이주나 장기 거주지를 고민하는 사람에게 지역 주거 공급 흐름을 보여줍니다.",
        meta: "주거 · 개발",
        publishedAt: "2026년 5월 29일",
      },
      {
        title: "WA 남부, 바이오연료 산업 확대 가능성 주목",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-28/esperance-on-cusp-of-expanding-biofuel-industry/106710214",
        summaryKo: "연료 가격과 공급 불안 속에서 국내 바이오연료 생산 논의가 커지고 있습니다. 운전·배송·농업 일자리와 생활비에 연결되는 이슈입니다.",
        meta: "연료 · 생활비",
        publishedAt: "2026년 5월 28일",
      },
      {
        title: "호주 최대 오프그리드 하이브리드 발전소, QLD 광산에 건설",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-29/aggreko-building-australia-largest-hybrid-power-plant/106726930",
        summaryKo: "전력망 연결 지연 속에 광산이 자체 에너지 시설을 세우는 사례입니다. 에너지 비용, 광산 일자리, 지역 인프라 이슈를 함께 볼 수 있습니다.",
        meta: "에너지 · 지역경제",
        publishedAt: "2026년 5월 29일",
      },
      {
        title: "케언즈 대형 가로수 제거 논란, 도시 열섬과 개발 갈등",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-28/freshwater-development-triggers-calls-for-protections-of-trees/106728954",
        summaryKo: "주택 개발과 녹지 보호가 충돌한 사례입니다. 더운 지역에서 집을 고를 때 그늘, 열섬, 동네 환경이 생활비만큼 중요하다는 점을 보여줍니다.",
        meta: "주거환경 · 개발",
        publishedAt: "2026년 5월 28일",
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
        title: "모기, 기피제 냄새에 적응할 수 있다는 연구",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/science/2026-05-29/mosquitoes-can-learn-to-be-attracted-to-the-smell-of-repellent/106729278",
        summaryKo: "야외활동과 캠핑이 많은 호주 생활에서 모기 매개 질병 예방은 중요합니다. 연구진은 그래도 기피제를 계속 쓰라고 조언합니다.",
        meta: "야외활동 · 건강",
        publishedAt: "2026년 5월 29일",
      },
      {
        title: "호주 뉴스 3분 브리핑: 2026년 5월 29일",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/korean-short-news-290526/xky6uc8hy",
        summaryKo: "SBS 한국어가 정리한 당일 호주 주요 뉴스입니다. 영어 기사 전체를 보기 전 한국어로 흐름을 빠르게 파악하기 좋습니다.",
        meta: "한국어 · 브리핑",
        publishedAt: "2026년 5월 29일",
      },
      {
        title: "전국 예술 경연 행사, 비용 상승으로 운영 압박",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-29/risings-costs-threaten-eisteddfods-across-australia/106736408",
        summaryKo: "어린이와 청소년 공연 기회가 줄어들 수 있다는 기사입니다. 한인 가족의 방과후 활동, 음악·무용 교육, 지역 커뮤니티 참여와도 연결됩니다.",
        meta: "커뮤니티 · 문화",
        publishedAt: "2026년 5월 29일",
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
