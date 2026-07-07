import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, ExternalLink, MapPin, Users } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";

type CommunityEvent = {
  id: string;
  title: string;
  organizer: string;
  description: string | null;
  event_date_label: string | null;
  location_label: string | null;
  image_url: string | null;
  source_url: string;
};

const COMMUNITY_EVENT_SELECT =
  "id, title, organizer, description, event_date_label, location_label, image_url, source_url";

export default function Events() {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: "이벤트 | Hoju Jobs",
    description: "호주 한인 커뮤니티 이벤트, 밋업, 세미나 정보를 확인하세요.",
    canonical: "https://hojujobs.com/events",
    htmlLang: "ko",
    ogLocale: "ko_KR",
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("community_events")
        .select(COMMUNITY_EVENT_SELECT)
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        console.error("events fetch error:", fetchError);
        setEvents([]);
        setError("이벤트 정보를 불러오지 못했습니다.");
      } else {
        setEvents((data ?? []) as CommunityEvent[]);
      }

      setIsLoading(false);
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
      <main className="mx-auto w-full max-w-[1220px] px-5 py-10 sm:py-12 lg:px-9">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition-colors hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <h1 className="mb-8 text-xl font-black tracking-[-0.045em] text-neutral-950 sm:text-2xl">이벤트</h1>

        {isLoading ? (
          <p className="rounded-lg border border-slate-200 bg-white py-12 text-center text-sm font-semibold text-slate-500">
            이벤트 정보를 불러오는 중...
          </p>
        ) : error ? (
          <p className="rounded-lg border border-slate-200 bg-white py-12 text-center text-sm font-semibold text-slate-500">
            {error}
          </p>
        ) : events.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-white py-12 text-center text-sm font-semibold text-slate-500">
            현재 등록된 이벤트가 없습니다.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                to={event.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-blue-200 hover:bg-slate-50/40"
              >
                {event.image_url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center bg-blue-50 text-blue-600">
                    <CalendarDays className="h-9 w-9" />
                  </div>
                )}

                <div className="p-4 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-black text-slate-500">
                    {event.event_date_label && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                        <CalendarDays className="h-3 w-3" />
                        {event.event_date_label}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.organizer}
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-lg font-black leading-snug tracking-[-0.04em] text-neutral-950 group-hover:text-blue-700">
                    {event.title}
                  </h2>

                  {event.location_label && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{event.location_label}</span>
                    </p>
                  )}

                  {event.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{event.description}</p>
                  )}

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-black text-blue-600">
                    자세히 보기
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
