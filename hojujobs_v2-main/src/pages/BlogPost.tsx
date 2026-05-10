import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { BLOG_POSTS } from "@/data/blogPosts";
import { useSEO } from "@/hooks/useSEO";

const CITY_LINKS = [
  { label: "호주 전체", path: "/" },
  { label: "시드니", path: "/sydney" },
  { label: "멜버른", path: "/melbourne" },
  { label: "브리즈번", path: "/brisbane" },
  { label: "애들레이드", path: "/adelaide" },
];

function renderArticleContent(content: string) {
  return content
    .trim()
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={block} className="pt-3 text-lg font-semibold tracking-tight text-foreground">
            {block.replace("### ", "")}
          </h3>
        );
      }

      if (block.startsWith("## ")) {
        return (
          <h2 key={block} className="pt-5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {block.replace("## ", "")}
          </h2>
        );
      }

      return (
        <p key={block} className="text-base leading-8 text-foreground/80">
          {block}
        </p>
      );
    });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  const canonical = `https://hojujobs.com/blog/${post?.slug ?? ""}`;
  const jsonLd = useMemo(
    () =>
      post
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            url: canonical,
            isPartOf: {
              "@type": "Blog",
              name: "Hoju Jobs Blog",
              url: "https://hojujobs.com/blog",
            },
            publisher: {
              "@type": "Organization",
              name: "Hoju Jobs",
              url: "https://hojujobs.com/",
            },
            inLanguage: ["ko", "en-AU"],
          }
        : undefined,
    [canonical, post],
  );

  useSEO({
    title: post?.metaTitle ?? "Hoju Jobs Blog",
    description: post?.metaDescription ?? "Hoju Jobs blog article.",
    canonical,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    jsonLd,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          블로그 목록으로
        </Link>

        <article className="space-y-8 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <header className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">워홀 카페 가이드</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{post.title}</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
          </header>

          <section className="rounded-xl border border-border bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Meta title</p>
            <p className="mt-1 text-sm font-medium text-foreground">{post.metaTitle}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Meta description
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{post.metaDescription}</p>
          </section>

          <section className="space-y-5">{renderArticleContent(post.content)}</section>

          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="text-base font-semibold text-foreground">지금 올라온 한인 일자리 확인하기</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              글에서 말한 것처럼 카페 일자리는 타이밍이 중요합니다. 지역별 공고를 확인하고 바로 지원할 수 있는 곳부터
              연락해보세요.
            </p>
            <Link
              to={post.ctaPath}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {post.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-semibold text-foreground">지역별 공고 바로가기</h2>
            <div className="flex flex-wrap gap-2">
              {CITY_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
