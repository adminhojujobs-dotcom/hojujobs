import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { BLOG_POSTS } from "@/data/blogPosts";
import { useSEO } from "@/hooks/useSEO";

const CANONICAL = "https://hojujobs.com/blog";

export default function Blog() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Hoju Jobs Blog",
      url: CANONICAL,
      description: "Guides and SEO landing articles for Korean job seekers and employers in Australia.",
      inLanguage: ["ko", "en-AU"],
      isPartOf: {
        "@type": "WebSite",
        name: "Hoju Jobs",
        url: "https://hojujobs.com/",
      },
    }),
    [],
  );

  useSEO({
    title: "Blog | Hoju Jobs — 호주 한인 구인구직 가이드",
    description:
      "호주 워홀러를 위한 카페 알바, 멜버른·시드니 한인 카페 구인, 호주 한인 일자리 가이드.",
    canonical: CANONICAL,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    keywords:
      "Hoju Jobs blog, 호주 취업 블로그, Korean jobs Australia guide, 시드니 구인구직, 멜번 구인구직",
    jsonLd,
  });

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <header className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            호주 워킹홀리데이 한인 카페 · 호스피탈리티 일자리 구직 가이드 (멜버른 · 시드니)
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            이 블로그는 호주 워킹홀리데이로 멜버른과 시드니에 온 한국인들이 한인 카페와 호스피탈리티
            일자리를 가장 빠르게 구할 수 있도록 만든 실전 구직 가이드입니다. 카페 알바를 구하는 방법,
            자주 떨어지는 이유, 그리고 현재 올라온 한인 구인 정보를 한눈에 확인하는 방법까지 정리했습니다.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3" aria-label="Blog posts">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="flex-1 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Guide</p>
                <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                글 읽기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
