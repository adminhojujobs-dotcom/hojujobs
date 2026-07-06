import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, MapPin, Briefcase, Eye, Calendar, ExternalLink, UserCheck } from "lucide-react";
import { ContactRevealSection } from "@/components/ContactRevealSection";
import { DescriptionRevealSection } from "@/components/DescriptionRevealSection";
import { ListingRevealProvider } from "@/hooks/useListingReveal";
import { fetchViewCountByJobId, incrementViewCount } from "@/hooks/useViewCounts";
import { supabase } from "@/integrations/supabase/client";
import { SUBURB_EN } from "@/data/regionMap";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/trackEvent";

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

interface Job {
  id: number;
  title: string | null;
  location: string[] | null;
  industry: string | null;
  contact: string | null;
  email: string | null;
  kakaoid: string | null;
  description: string | null;
  google_search: string | null;
  uploaded_at: string | null;
  user_id?: string | null;
  archived?: boolean;
}

const VISIBLE_JOB_DAYS = 6;
const VIEW_DEDUPE_STORAGE_PREFIX = "job_viewed_v2";

function cacheViewCount(jobId: number, count: number) {
  sessionStorage.setItem(`hoju_job_view_count_${jobId}`, String(count));

  Object.keys(sessionStorage).forEach((key) => {
    if (!key.startsWith("hoju_listing_cache_")) return;

    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return;

      const cached = JSON.parse(raw) as { counts?: Record<string, number> };
      sessionStorage.setItem(key, JSON.stringify({
        ...cached,
        counts: {
          ...(cached.counts ?? {}),
          [jobId]: count,
        },
      }));
    } catch {
      // Ignore malformed or unavailable session cache entries.
    }
  });
}

export default function JobDetail() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchJob() {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, location, industry, contact, email, kakaoid, description, google_search, uploaded_at, user_id")
        .eq("id", Number(id))
        .maybeSingle();

      if (cancelled) return;

      if (!error && data) {
        const storageKey = `${VIEW_DEDUPE_STORAGE_PREFIX}_${data.id}`;
        const lastViewedRaw = window.localStorage.getItem(storageKey);
        const now = Date.now();
        const THIRTY_MINUTES = 30 * 60 * 1000;
        const cachedCount = Number(sessionStorage.getItem(`hoju_job_view_count_${data.id}`));
        let count = Number.isFinite(cachedCount) ? cachedCount : 0;

        if (lastViewedRaw) {
          const lastViewed = Number(lastViewedRaw);
          if (!Number.isNaN(lastViewed) && now - lastViewed < THIRTY_MINUTES) {
            count = await fetchViewCountByJobId(data.id);
            if (cancelled) return;
          } else {
            const incrementedCount = await incrementViewCount(data.id);
            if (cancelled) return;
            if (incrementedCount === null) {
              count = await fetchViewCountByJobId(data.id);
              if (count === 0 && Number.isFinite(cachedCount)) count = cachedCount;
            } else {
              count = incrementedCount;
              window.localStorage.setItem(storageKey, String(now));
            }
          }
        } else {
          const incrementedCount = await incrementViewCount(data.id);
          if (cancelled) return;
          if (incrementedCount === null) {
            count = await fetchViewCountByJobId(data.id);
            if (count === 0 && Number.isFinite(cachedCount)) count = cachedCount;
          } else {
            count = incrementedCount;
            window.localStorage.setItem(storageKey, String(now));
          }
        }

        if (cancelled) return;
        setJob(data as Job);
        setViewCount(count);
        cacheViewCount(data.id, count);
        setLoading(false);
        trackEvent("job_listing_viewed", {
          listing_type: "job",
          listing_id: data.id,
          metadata: {
            suburb: (data.location ?? []).join(", "),
            category: data.industry ?? undefined,
          },
        });
        return;
      }

      const { data: archivedData } = await supabase
        .from("jobs_archive")
        .select("id, title, location, industry, contact, email, kakaoid, description, google_search, uploaded_at")
        .eq("id", Number(id))
        .maybeSingle();

      if (cancelled) return;

      if (archivedData) {
        setJob({ ...(archivedData as Job), archived: true });
        setViewCount(0);
        setLoading(false);
        return;
      }

      setLoading(false);
    }

    fetchJob();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const jobJsonLd = useMemo(() => {
    if (!job) return undefined;
    return {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      title: job.title,
      description: job.description || "",
      datePosted: job.uploaded_at,
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: (job.location || []).join(", "),
          addressCountry: "AU",
        },
      },
      industry: job.industry,
    };
  }, [job]);

  const isExpired = useMemo(() => {
    if (job?.archived) return true;
    if (!job?.uploaded_at) return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - VISIBLE_JOB_DAYS);
    return new Date(job.uploaded_at) < cutoff;
  }, [job]);

  useSEO({
    title: job ? `${job.title} | Hoju Jobs` : "Hoju Jobs - 호주 한인 구인구직",
    description: job ? (job.description || "").slice(0, 155) : "호주 한인 커뮤니티 구인구직 게시판",
    canonical: job ? `https://hojujobs.com/job/${job.id}` : undefined,
    htmlLang: "ko",
    ogLocale: "ko_KR",
    jsonLd: isExpired ? undefined : jobJsonLd,
    noindex: isExpired,
  });

  if (loading) {
    return (
      <div className="flex w-full min-h-0 flex-1 items-center justify-center bg-background">
        <p className="text-muted-foreground">불러오는 중...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex w-full min-h-0 flex-1 items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">해당 공고를 찾을 수 없습니다.</p>
          <Link to="/" className="text-primary hover:underline">목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="flex w-full min-h-0 flex-1 flex-col bg-background">
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="text-4xl mb-4">📋</div>
            <h1 className="text-xl font-bold text-foreground mb-6">이 공고는 만료되었습니다</h1>
            <Link to="/" className="inline-block bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
              최신 공고 보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const locations = job.location || [];

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-8 sm:py-12 lg:px-9">
        <div className="mb-6">
          <button onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign("/")} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-neutral-950">
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </button>
        </div>

        <section className="border-y border-neutral-950 py-8">
          {isAdmin && job.user_id && (
            <span className="mb-3 inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">
              <UserCheck className="h-3.5 w-3.5" />
              유저 업로드
            </span>
          )}
          <h1 className="max-w-4xl text-xl font-black leading-tight tracking-[-0.04em] text-neutral-950 sm:text-2xl">{job.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-bold text-slate-600">
            {locations.length > 0 && <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" />{locations.join(", ")}</span>}
            {job.industry && <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-slate-400" />{job.industry}</span>}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />등록일: {formatDate(job.uploaded_at)}</span>
            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />조회 {viewCount}회</span>
          </div>
        </section>

        <ListingRevealProvider listingType="job" listingId={job.id}>
          {job.description && (
            <DescriptionRevealSection
              description={job.description}
              className="border-b border-slate-200 py-6"
              headingClassName="mb-4 text-base font-black tracking-[-0.03em] text-neutral-950"
              bodyClassName="text-sm font-semibold leading-relaxed text-slate-700 break-words [overflow-wrap:anywhere]"
            />
          )}

          <ContactRevealSection
            phone={job.contact}
            email={job.email && job.email !== "정보없음" ? job.email : null}
            kakaoid={job.kakaoid}
            className="mb-0 rounded-none border-0 border-b border-slate-200 bg-white px-0 py-6"
            headingClassName="mb-4 text-base font-black tracking-[-0.03em] text-neutral-950"
            contentClassName="rounded-none"
          />
        </ListingRevealProvider>

        {locations.length > 0 && (
          <section className="border-b border-slate-200 py-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-black tracking-[-0.03em] text-neutral-950">
              <MapPin className="h-4 w-4 text-blue-600" />
              위치
            </h2>
            {locations.map((loc) => {
              const englishName = SUBURB_EN[loc] || loc;
              const query = job.google_search || `${englishName}, Australia`;
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
              const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;

              return (
                <div key={loc}>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onClick={() => {
                      trackEvent("map_clicked", {
                        listing_type: "job",
                        listing_id: job.id,
                        metadata: {
                          label: loc,
                          surface: "job_detail_map",
                          source: "google_maps",
                          query,
                        },
                      });
                    }}
                  >
                    <div className="rounded-lg overflow-hidden border border-border relative">
                      <iframe
                        src={embedUrl}
                        className="h-64 w-full pointer-events-none sm:h-80"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${loc} 지도`}
                      />
                      <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors flex items-end justify-end p-3">
                        <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-black text-neutral-950 shadow-sm backdrop-blur-sm">
                          <ExternalLink className="h-3 w-3" />
                          {loc}  Google Maps에서 보기
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
