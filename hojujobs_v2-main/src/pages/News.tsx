import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/trackEvent";
import { supabase } from "@/integrations/supabase/client";

type NewsTopic = {
  key: string;
  labelKo: string;
  summary: string;
  tone: string;
  stories: Array<{
    id: number;
    title: string;
    source: string;
    sourceUrl: string;
    summaryKo: string;
    meta: string;
    publishedAt: string;
    imageUrl: string | null;
  }>;
};

type NewsArticleRow = {
  id: number;
  category_key: string;
  category_label_ko: string;
  category_summary_ko: string | null;
  category_tone: string | null;
  title: string;
  summary_ko: string;
  meta: string | null;
  published_at_label_ko: string | null;
  source_name: string;
  source_url: string;
  source_domain: string | null;
  original_published_at: string | null;
  sort_order: number;
  image_url: string | null;
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

function groupNewsArticles(rows: NewsArticleRow[]) {
  const topics = new Map<string, NewsTopic>();

  for (const row of rows) {
    const existing = topics.get(row.category_key);
    const topic =
      existing ??
      {
        key: row.category_key,
        labelKo: row.category_label_ko,
        summary: row.category_summary_ko ?? "",
        tone: row.category_tone ?? "from-blue-50 to-white border-blue-100",
        stories: [],
      };

    topic.stories.push({
      id: row.id,
      title: row.title,
      source: row.source_name,
      sourceUrl: row.source_url,
      summaryKo: row.summary_ko,
      meta: row.meta ?? "",
      publishedAt: row.published_at_label_ko ?? "",
      imageUrl: row.image_url ?? null,
    });

    topics.set(row.category_key, topic);
  }

  return Array.from(topics.values());
}

export default function News() {
  useEffect(() => { trackEvent("news_page_viewed"); }, []);
  const [topics, setTopics] = useState<NewsTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadNewsArticles() {
      setIsLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("news_articles")
        .select(
          "id, category_key, category_label_ko, category_summary_ko, category_tone, title, summary_ko, meta, published_at_label_ko, source_name, source_url, source_domain, original_published_at, sort_order, image_url",
        )
        .eq("show_on_news_page", true)
        .order("sort_order", { ascending: true })
        .order("original_published_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("[Hoju Jobs] Failed to load news articles", error);
        setErrorMessage("뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
        setTopics([]);
      } else {
        setTopics(groupNewsArticles((data ?? []) as NewsArticleRow[]));
      }

      setIsLoading(false);
    }

    loadNewsArticles();

    return () => {
      isMounted = false;
    };
  }, []);

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
          <nav className="bg-white" aria-label="뉴스 주제">
            <div className="flex gap-2 overflow-x-auto px-3 py-2 sm:grid sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-slate-200 sm:overflow-visible sm:px-0 sm:py-0">
              {topics.map((topic) => (
                <a
                  key={topic.key}
                  href={`#${topic.key.toLowerCase()}`}
                  className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 text-[11px] font-black text-slate-900 transition-colors hover:bg-slate-100 sm:h-auto sm:rounded-none sm:border-0 sm:bg-white sm:px-5 sm:py-3 sm:text-center sm:text-lg sm:hover:bg-slate-50"
                >
                  {topic.labelKo}
                </a>
              ))}
            </div>
          </nav>
        </section>

        {isLoading ? (
          <section className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            뉴스를 불러오는 중입니다.
          </section>
        ) : errorMessage ? (
          <section className="rounded-lg border border-red-100 bg-red-50 p-8 text-center text-sm font-semibold text-red-700">
            {errorMessage}
          </section>
        ) : topics.length === 0 ? (
          <section className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            표시할 뉴스가 없습니다.
          </section>
        ) : (
          <div className="grid gap-5">
            {topics.map((topic) => (
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
                      <article key={story.sourceUrl} className="flex flex-col overflow-hidden rounded-lg border border-white/70 bg-white shadow-sm">
                        {story.imageUrl && (
                          <img
                            src={story.imageUrl}
                            alt=""
                            className="h-40 w-full object-cover"
                            loading="lazy"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        )}
                        <div className="flex flex-col p-4">
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
                              onClick={() => {
                                trackEvent("news_article_clicked", {
                                  listing_id: story.id,
                                  metadata: {
                                    title: story.title,
                                    source: story.source,
                                    source_url: story.sourceUrl,
                                    category: topic.key,
                                  },
                                });
                              }}
                              className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-slate-950 px-3 text-xs font-bold text-white transition-colors hover:bg-primary lg:mt-0"
                            >
                              기사 보기
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
