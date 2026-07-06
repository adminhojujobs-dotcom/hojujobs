import { useEffect, useState } from "react";
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
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="mb-6 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">뉴스</h1>

        {!isLoading && !errorMessage && topics.length > 0 && (
          <nav className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4" aria-label="뉴스 주제">
            {topics.map((topic) => (
              <a
                key={topic.key}
                href={`#${topic.key.toLowerCase()}`}
                className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {topic.labelKo}
              </a>
            ))}
          </nav>
        )}

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
          <div className="space-y-12">
            {topics.map((topic) => (
              <section key={topic.key} id={topic.key.toLowerCase()} className="scroll-mt-24">
                <div className="mb-5 border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-black tracking-[-0.04em] text-neutral-950 sm:text-2xl">{topic.labelKo}</h2>
                  {topic.summary && (
                    <p className="mt-2 w-full text-sm leading-relaxed text-slate-600 sm:text-base">{topic.summary}</p>
                  )}
                </div>

                <div className="grid gap-4">
                  {topic.stories.map((story) => (
                    <a
                      key={story.id}
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
                      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-colors hover:border-blue-200 hover:bg-slate-50/80 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                    >
                      {story.imageUrl && (
                        <img
                          src={story.imageUrl}
                          alt=""
                          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{story.meta}</span>
                          <span className="text-right text-[11px] font-medium text-slate-400">{story.publishedAt}</span>
                        </div>
                        <h3 className="text-base font-semibold leading-snug text-slate-950 transition-colors group-hover:text-blue-700 sm:text-lg">
                          {story.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{story.summaryKo}</p>
                        <p className="mt-3 text-[11px] font-semibold text-slate-400">
                          {story.source} · {domainFromUrl(story.sourceUrl)}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
