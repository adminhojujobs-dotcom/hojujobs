import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/trackEvent";

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
    key: "settle",
    labelKo: "정착·생활",
    summary: "영어 표현, 집 관리, 매일 쓰는 서비스처럼 호주 생활에 바로 연결되는 뉴스를 골랐습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "집에 물 문제가 생겼나요? 배관공과 상담하는 영어 표현",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/bonus-practice-111-water-problems-at-home-talking-to-a-plumber/f1v9drur6",
        summaryKo: "수도꼭지 누수, 대략적인 견적, 당일 방문 요청처럼 렌트집이나 쉐어하우스에서 바로 쓰는 표현을 연습합니다. 영어 통화가 부담스러운 워홀러와 유학생에게 실용적입니다.",
        meta: "영어 · 집수리",
        publishedAt: "2026년 6월 7일",
      },
      {
        title: "퀸즐랜드 아동 커미셔너 임명 압박 커져",
        source: "SBS News",
        sourceUrl: "https://www.sbs.com.au/news/podcast-episode/us-iran-war-approaches-100-day-milestone-midday-bulletin-7-june-2026/5dyrih5ck",
        summaryKo: "SBS 정오 뉴스는 퀸즐랜드 아동 안전 제도와 원주민 아동 보호 역할 공백에 대한 우려를 전했습니다. 자녀와 함께 거주하거나 교육·복지 분야에서 일하는 한인에게 지역 제도 흐름으로 볼 만합니다.",
        meta: "QLD · 복지",
        publishedAt: "2026년 6월 7일",
      },
    ],
  },
  {
    key: "commute",
    labelKo: "교통·도시",
    summary: "출퇴근, 이동 시간, 연료비처럼 매일의 스케줄과 생활비에 영향을 주는 소식입니다.",
    tone: "from-emerald-50 to-white border-emerald-100",
    stories: [
      {
        title: "시드니 최악의 교통 체증 지역, CBD가 아니었다",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/explainer-western-sydney-reclaims-top-ranking-as-worst-for-congestion/sq0t6ia6r",
        summaryKo: "NRMA 조사에서 운전자 다수가 지난 1년 사이 교통 체증이 더 심해졌다고 답했고, 웨스턴 시드니가 가장 혼잡한 지역으로 꼽혔습니다. 서부 거주자와 출퇴근러에게 특히 체감되는 소식입니다.",
        meta: "시드니 · 출퇴근",
        publishedAt: "2026년 6월 7일",
      },
      {
        title: "AUKUS 논쟁 속 총리, 지역 안보 필요성 강조",
        source: "SBS News",
        sourceUrl: "https://www.sbs.com.au/news/podcast-episode/pm-defends-aukus-deal-amid-criticism-evening-news-bulletin-7-june-2026/k7d759azz",
        summaryKo: "저녁 뉴스는 AUKUS가 중국과의 긴장을 높일 수 있다는 비판과 정부의 방어 입장을 함께 전했습니다. 호주에 사는 한인에게는 한반도와 인도·태평양 안보 흐름을 읽는 배경 뉴스입니다.",
        meta: "외교 · 안보",
        publishedAt: "2026년 6월 7일",
      },
    ],
  },
  {
    key: "culture",
    labelKo: "문화·커뮤니티",
    summary: "호주 사회의 성취, 스포츠, 커뮤니티 이야기를 한국어 독자 관점에서 추렸습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "18세 호주 여고생, 최연소 에베레스트 등정 기록",
        source: "SBS Korean",
        sourceUrl: "https://www.sbs.com.au/language/korean/ko/podcast-episode/culturein-youngest-climber-bianca-australian-women-everest/5zbf6urxq",
        summaryKo: "멜번 출신 비앙카 애들러가 에베레스트 정상에 오르며 호주 최연소 기록을 새로 썼습니다. 호주 학교와 청소년 문화, 도전의 이야기에 관심 있는 가족 독자에게 좋은 기사입니다.",
        meta: "멜번 · 청소년",
        publishedAt: "2026년 6월 7일",
      },
      {
        title: "호주, 월드컵 전 마지막 평가전서 스위스와 무승부",
        source: "SBS News",
        sourceUrl: "https://www.sbs.com.au/news/podcast-episode/us-iran-war-approaches-100-day-milestone-midday-bulletin-7-june-2026/5dyrih5ck",
        summaryKo: "SBS 정오 뉴스는 사커루스가 월드컵 전 마지막 평가전에서 스위스와 비겼다고 전했습니다. 한국과 호주 대표팀을 모두 챙겨보는 교민에게 월드컵 전 분위기를 짚어줍니다.",
        meta: "스포츠 · 월드컵",
        publishedAt: "2026년 6월 7일",
      },
    ],
  },
  {
    key: "travel",
    labelKo: "여행·안전",
    summary: "호주 안팎 여행 계획과 해안 레저 안전에 참고할 만한 소식을 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "WA 해안 상어 사고, 해양 레저 전 안전 확인 필요",
        source: "SBS News",
        sourceUrl: "https://www.sbs.com.au/news/podcast-episode/ukraine-launches-drone-attack-on-russias-second-biggest-city-morning-bulletin-7-june-2026/8i9u97nry",
        summaryKo: "SBS 아침 뉴스는 서호주 해안에서 상어에 물린 남성이 숨졌다고 전했습니다. 낚시, 다이빙, 스노클링, 겨울 해안 여행을 준비하는 사람에게 안전 알림으로 볼 수 있습니다.",
        meta: "WA · 해양안전",
        publishedAt: "2026년 6월 7일",
      },
    ],
  },
];

export default function News() {
  useEffect(() => { trackEvent("news_page_viewed"); }, []);
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
