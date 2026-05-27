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
  }>;
  sources: Array<{
    name: string;
    url: string;
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
    key: "Politics",
    labelKo: "정치",
    summary: "연방 의회, 국방, 이민, 생활 정책처럼 호주 거주자가 바로 영향을 받는 정치 뉴스를 모았습니다.",
    tone: "from-blue-50 to-white border-blue-100",
    stories: [
      {
        title: "AUKUS와 국방 예산 논의",
        source: "ABC Politics",
        sourceUrl: "https://www.abc.net.au/news/politics",
        summaryKo: "국방 장관 발언과 의회 질의 등 AUKUS, 잠수함 계획, 예산 집행 흐름을 계속 업데이트합니다.",
        meta: "정책 · 국방",
      },
      {
        title: "호주 정치 라이브 업데이트",
        source: "Guardian Australia",
        sourceUrl: "https://www.theguardian.com/australia-news/australian-politics",
        summaryKo: "상·하원 질의, 정당 발언, 예산 후속 조치 등 하루 단위 정치 흐름을 빠르게 확인하기 좋습니다.",
        meta: "라이브 · 의회",
      },
      {
        title: "다문화 사회와 정부 정책",
        source: "SBS News",
        sourceUrl: "https://www.sbs.com.au/news/topic/politics",
        summaryKo: "이민자 커뮤니티 관점에서 선거, 복지, 교육, 비자 관련 정책 뉴스를 폭넓게 다룹니다.",
        meta: "정책 · 커뮤니티",
      },
    ],
    sources: [
      { name: "ABC Politics", url: "https://www.abc.net.au/news/politics" },
      { name: "Guardian Australian politics", url: "https://www.theguardian.com/australia-news/australian-politics" },
      { name: "SBS Politics", url: "https://www.sbs.com.au/news/topic/politics" },
    ],
  },
  {
    key: "World",
    labelKo: "세계",
    summary: "호주 관점에서 보는 국제 정세, 외교, 전쟁, 글로벌 경제 리스크를 정리했습니다.",
    tone: "from-sky-50 to-white border-sky-100",
    stories: [
      {
        title: "SBS World News 최신 국제 뉴스",
        source: "SBS World News",
        sourceUrl: "https://www.sbs.com.au/news/",
        summaryKo: "호주 공영 다문화 방송의 국제 뉴스 허브입니다. 글로벌 이슈를 호주 시청자 관점으로 정리합니다.",
        meta: "국제 · 외교",
      },
      {
        title: "ABC World 최신 보도",
        source: "ABC News",
        sourceUrl: "https://www.abc.net.au/news/world",
        summaryKo: "전쟁, 기후, 미국·아시아·유럽 주요 이슈 등 호주 공영방송의 국제 보도 흐름을 확인할 수 있습니다.",
        meta: "국제 · 공영방송",
      },
      {
        title: "Guardian World",
        source: "The Guardian",
        sourceUrl: "https://www.theguardian.com/world",
        summaryKo: "국제 정치와 사회 이슈를 빠르게 다루며, 호주에 영향을 줄 수 있는 글로벌 맥락을 보기에 좋습니다.",
        meta: "세계 · 분석",
      },
    ],
    sources: [
      { name: "SBS News", url: "https://www.sbs.com.au/news/" },
      { name: "ABC World", url: "https://www.abc.net.au/news/world" },
      { name: "Guardian World", url: "https://www.theguardian.com/world" },
    ],
  },
  {
    key: "Business",
    labelKo: "비즈니스",
    summary: "일자리, 물가, 주거, 기업, 시장 뉴스를 호주 생활 관점에서 볼 수 있게 묶었습니다.",
    tone: "from-emerald-50 to-white border-emerald-100",
    stories: [
      {
        title: "호주 비즈니스·경제 최신 흐름",
        source: "ABC Business",
        sourceUrl: "https://www.abc.net.au/news/business",
        summaryKo: "세금, 은행, 기업 구조조정, 원자재, 주택시장 등 생활비와 고용에 연결되는 경제 뉴스를 다룹니다.",
        meta: "경제 · 생활비",
      },
      {
        title: "기업·금융 전문 뉴스",
        source: "Australian Financial Review",
        sourceUrl: "https://www.afr.com/",
        summaryKo: "기업, 금융시장, 부동산, 세금 이슈를 깊게 다루는 호주 주요 경제 매체입니다.",
        meta: "금융 · 기업",
      },
      {
        title: "비즈니스와 소비자 이슈",
        source: "Sydney Morning Herald",
        sourceUrl: "https://www.smh.com.au/business",
        summaryKo: "소비자, 직장, 부동산, 기업 뉴스를 일반 독자가 읽기 쉽게 정리합니다.",
        meta: "소비자 · 직장",
      },
    ],
    sources: [
      { name: "ABC Business", url: "https://www.abc.net.au/news/business" },
      { name: "AFR", url: "https://www.afr.com/" },
      { name: "SMH Business", url: "https://www.smh.com.au/business" },
    ],
  },
  {
    key: "Analysis",
    labelKo: "분석",
    summary: "뉴스 뒤의 맥락을 읽을 수 있는 해설, 칼럼, 데이터 기반 분석을 모았습니다.",
    tone: "from-violet-50 to-white border-violet-100",
    stories: [
      {
        title: "주택·이민·경제 해설",
        source: "ABC Analysis",
        sourceUrl: "https://www.abc.net.au/news/analysis",
        summaryKo: "단순 속보보다 배경 설명과 데이터 해설이 필요한 주제를 이해하기 좋습니다.",
        meta: "해설 · 데이터",
      },
      {
        title: "전문가 기고와 연구 기반 분석",
        source: "The Conversation",
        sourceUrl: "https://theconversation.com/au",
        summaryKo: "대학 연구자와 전문가가 정치, 경제, 사회, 과학 이슈를 긴 호흡으로 설명합니다.",
        meta: "전문가 · 연구",
      },
      {
        title: "Opinion & explainers",
        source: "Guardian Australia",
        sourceUrl: "https://www.theguardian.com/au/commentisfree",
        summaryKo: "호주 사회 이슈를 다양한 관점의 칼럼과 해설로 읽을 수 있습니다.",
        meta: "칼럼 · 관점",
      },
    ],
    sources: [
      { name: "ABC Analysis", url: "https://www.abc.net.au/news/analysis" },
      { name: "The Conversation AU", url: "https://theconversation.com/au" },
      { name: "Guardian Opinion", url: "https://www.theguardian.com/au/commentisfree" },
    ],
  },
  {
    key: "Sport",
    labelKo: "스포츠",
    summary: "호주에서 많이 보는 AFL, NRL, 크리켓, 테니스, 국제 스포츠 뉴스를 모았습니다.",
    tone: "from-amber-50 to-white border-amber-100",
    stories: [
      {
        title: "호주 스포츠 최신 뉴스",
        source: "ABC Sport",
        sourceUrl: "https://www.abc.net.au/news/sport",
        summaryKo: "State of Origin, 크리켓, 테니스, 올림픽 종목 등 호주 공영방송의 스포츠 허브입니다.",
        meta: "종합 · 경기",
      },
      {
        title: "스포츠 뉴스와 경기 해설",
        source: "Guardian Sport",
        sourceUrl: "https://www.theguardian.com/au/sport",
        summaryKo: "경기 결과뿐 아니라 리그 운영, 선수 이슈, 스포츠 문화까지 함께 다룹니다.",
        meta: "해설 · 문화",
      },
      {
        title: "스코어와 리그 업데이트",
        source: "ESPN Australia",
        sourceUrl: "https://www.espn.com.au/",
        summaryKo: "국내외 리그 스코어, 선수 뉴스, 경기 일정을 빠르게 확인할 수 있습니다.",
        meta: "스코어 · 일정",
      },
    ],
    sources: [
      { name: "ABC Sport", url: "https://www.abc.net.au/news/sport" },
      { name: "Guardian Sport", url: "https://www.theguardian.com/au/sport" },
      { name: "ESPN Australia", url: "https://www.espn.com.au/" },
    ],
  },
];

export default function News() {
  useSEO({
    title: "뉴스 | Hoju Jobs",
    description: "호주 주요 뉴스 사이트의 정치, 세계, 비즈니스, 분석, 스포츠 뉴스를 한국어로 확인하세요.",
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Australia briefing</p>
                <h1 className="mt-1 text-2xl font-black tracking-normal text-white sm:text-3xl">뉴스</h1>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300">
                <Languages className="h-3.5 w-3.5" />
                한국어 번역 링크 포함
              </div>
            </div>
          </div>
          <nav className="grid grid-cols-5 divide-x divide-slate-200 bg-white" aria-label="뉴스 주제">
            {NEWS_TOPICS.map((topic) => (
              <a
                key={topic.key}
                href={`#${topic.key.toLowerCase()}`}
                className="px-2 py-3 text-center text-[11px] font-black text-slate-900 transition-colors hover:bg-slate-50 sm:px-5 sm:text-xl"
              >
                {topic.key}
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
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{topic.labelKo}</p>
                  <h2 className="mt-1 text-2xl font-black tracking-normal text-slate-950">{topic.key}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{topic.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topic.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-slate-200 bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-primary/40 hover:text-primary"
                      >
                        {source.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  {topic.stories.map((story) => (
                    <article key={story.sourceUrl} className="flex min-h-[13rem] flex-col rounded-lg border border-white/70 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{story.meta}</span>
                        <span className="text-[11px] font-medium text-slate-400">{domainFromUrl(story.sourceUrl)}</span>
                      </div>
                      <h3 className="text-base font-black leading-snug text-slate-950">{story.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{story.summaryKo}</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                          href={story.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-xs font-bold text-slate-700 hover:border-primary/40 hover:text-primary"
                        >
                          원문
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <a
                          href={translatedUrl(story.sourceUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-slate-950 text-xs font-bold text-white hover:bg-primary"
                        >
                          번역
                          <Languages className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                        <Radio className="h-3 w-3" />
                        {story.source}
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
