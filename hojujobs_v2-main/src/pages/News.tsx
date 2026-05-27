import { ExternalLink, Languages, Newspaper, Radio } from "lucide-react";
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
    key: "visa",
    labelKo: "비자·이민",
    summary: "비자, 이민 정책, 해외 인력 활용처럼 호주 체류 계획에 영향을 줄 수 있는 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "이민자 숙련 인력이 호주에서 충분히 활용되지 못한다는 지적",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-04-02/permanent-migrants-skills-wasted-in-australia-martin-parkinson/106519816",
        summaryKo: "전 재무부 차관은 호주가 이미 들어와 있는 이민자의 자격과 경력을 제대로 인정하지 못해 노동력 손실이 크다고 지적했습니다.",
        meta: "이민 · 취업",
        publishedAt: "2026년 4월 2일",
      },
      {
        title: "주택 공급과 이민자 수를 연결하는 정책 논쟁",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-25/housing-crisis-migration-cap-kohler/106716056",
        summaryKo: "이민자 수를 새로 지어진 주택 수에 맞추겠다는 정치권 제안이 실제로 얼마나 효과가 있을지, 주거와 인구 흐름을 함께 설명합니다.",
        meta: "이민 · 주거",
        publishedAt: "2026년 5월 25일",
      },
      {
        title: "해외여행 규정 변화와 2026년 출입국 체크포인트",
        source: "SBS News",
        sourceUrl: "https://www.sbs.com.au/news/article/international-travel-changes-new-rules-2026/0c2fl4ylm",
        summaryKo: "SBS는 2026년 해외여행 때 알아두면 좋은 출입국, 항공, 비자 관련 변화들을 정리했습니다.",
        meta: "비자 · 여행",
        publishedAt: "2026년 1월 1일",
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
        title: "호주인들이 이직과 주 이동을 덜 하고 있다는 경제 데이터",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-25/not-moving-jobs-not-starting-businesses-not-moving-states-data/106599004",
        summaryKo: "높은 주거비와 이사 비용 때문에 사람들이 직장을 바꾸거나 다른 주로 이동하는 데 더 신중해지고 있다는 분석입니다.",
        meta: "취업 · 이직",
        publishedAt: "2026년 5월 25일",
      },
      {
        title: "호주 실업 지원 제도에 큰 변화 예고",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-27/federal-politics-live-blog-jobseekers-estimates-isis-brides-cgt/106724430",
        summaryKo: "고용부 장관이 구직자 지원 제도 개편을 설명하며, 일자리 찾기와 정부 지원 방식에 변화가 있을 수 있음을 예고했습니다.",
        meta: "구직 · 복지",
        publishedAt: "2026년 5월 27일",
      },
      {
        title: "와이알라 제철소 매각 경쟁과 지역 일자리 영향",
        source: "Yahoo Finance / AAP",
        sourceUrl: "https://au.finance.yahoo.com/news/no-whyalla-wipeout-final-race-020517458.html/",
        summaryKo: "제철소와 제련소 매각 절차가 지역 노동자, 공급망, 산업 일자리에 어떤 의미를 갖는지 다룬 보도입니다.",
        meta: "지역 · 고용",
        publishedAt: "2026년 5월 27일",
      },
    ],
  },
  {
    key: "housing",
    labelKo: "주거·생활비",
    summary: "렌트, 주택 공급, 생활비, 교통비처럼 매달 지출에 직접 연결되는 기사를 골랐습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "주택 승인을 빠르게 하기 위해 AI 도입",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-11/housing-artificial-intelligence-epbc-assessments-federal-budget/106663464",
        summaryKo: "연방정부가 주택과 에너지 프로젝트의 환경평가를 빠르게 처리하기 위해 AI 도구 예산을 배정한다는 내용입니다.",
        meta: "주거 · 정책",
        publishedAt: "2026년 5월 11일",
      },
      {
        title: "연료비 상승과 생활비 부담을 말하는 호주 사람들",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-04-01/australians-reveal-toll-of-fuel-costs-and-cost-of-living-rise/106512194",
        summaryKo: "출퇴근, 장보기, 소규모 사업 운영에 연료비와 생활비 상승이 어떤 부담을 주는지 실제 사례로 보여줍니다.",
        meta: "생활비 · 연료",
        publishedAt: "2026년 4월 1일",
      },
      {
        title: "생활비 상승이 일부 가구에 더 크게 작용한다는 ABS 데이터",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-02-04/living-costs-hit-some-harder-new-abs-data/106303060",
        summaryKo: "의료비, 필수 지출, 가구별 체감 물가 차이를 설명해 호주 생활비 흐름을 이해하는 데 도움이 됩니다.",
        meta: "생활비 · 통계",
        publishedAt: "2026년 2월 4일",
      },
    ],
  },
  {
    key: "travel",
    labelKo: "여행·교통",
    summary: "공항, 항공권, 이동, 여행자 권리처럼 호주 안팎을 오갈 때 필요한 뉴스를 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "항공 승객 권리 개편에 4천만 달러 배정",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-16/federal-budget-aviation-consumer-protections/106665266",
        summaryKo: "항공편 취소와 지연에 대한 불만 처리와 보상 가능성을 높이는 새 감시기구와 제도 개편이 추진됩니다.",
        meta: "항공 · 소비자",
        publishedAt: "2026년 5월 16일",
      },
      {
        title: "아발론 공항 오경보 이후 호주 공항 보안 점검",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-25/australia-airport-security-aviation-flights/106711712",
        summaryKo: "멜버른 인근 아발론 공항 보안 오경보 이후, 국내 공항 보안 절차와 승객 경험이 다시 주목받고 있습니다.",
        meta: "공항 · 보안",
        publishedAt: "2026년 5월 25일",
      },
      {
        title: "멜버른-브리즈번 내륙철도 계획 변경과 지역 반응",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/2026-05-20/inside-the-fight-for-an-inland-rail/106703490",
        summaryKo: "멜버른과 브리즈번을 잇는 내륙철도 계획 변경이 지역 이동, 물류, 교통 인프라에 어떤 논쟁을 만들었는지 설명합니다.",
        meta: "철도 · 지역",
        publishedAt: "2026년 5월 20일",
      },
    ],
  },
];

export default function News() {
  useSEO({
    title: "뉴스 | Hoju Jobs",
    description: "호주에 사는 한국인이 알아두면 좋은 비자, 일자리, 주거, 생활비, 여행 뉴스를 한국어로 확인하세요.",
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
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300">
                <Languages className="h-3.5 w-3.5" />
                한국어 번역 링크 포함
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
                <div className="border-b border-inherit bg-white/55 p-5 lg:border-b-0 lg:border-r">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
                    <Newspaper className="h-5 w-5 text-slate-800" />
                  </div>
                  <p className="text-xs font-bold tracking-normal text-slate-500">추천 주제</p>
                  <h2 className="mt-1 text-2xl font-black tracking-normal text-slate-950">{topic.labelKo}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{topic.summary}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                    <Radio className="h-3 w-3" />
                    실제 기사 {topic.stories.length}개
                  </p>
                </div>

                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  {topic.stories.map((story) => (
                    <article key={story.sourceUrl} className="flex min-h-[13rem] flex-col rounded-lg border border-white/70 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{story.meta}</span>
                        <span className="text-right text-[11px] font-medium text-slate-400">{story.publishedAt}</span>
                      </div>
                      <h3 className="text-base font-black leading-snug text-slate-950">{story.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{story.summaryKo}</p>
                      <a
                        href={translatedUrl(story.sourceUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-slate-950 px-3 text-xs font-bold text-white transition-colors hover:bg-primary"
                      >
                        번역 기사 보기
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                        <Radio className="h-3 w-3" />
                        {story.source} · {domainFromUrl(story.sourceUrl)}
                      </p>
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
