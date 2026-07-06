import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

type EventCity = "sydney" | "melbourne" | "other";
type CityFilter = "all" | EventCity;

const sampleEvents = [
  {
    title: "시드니 한인 커뮤니티 밋업",
    date: "2026년 7월 12일",
    location: "시드니 CBD",
    city: "sydney" as const,
    summary: "호주 생활 정보, 구직 팁, 네트워킹을 함께 나누는 오프라인 모임입니다.",
  },
  {
    title: "멜버른 워홀 준비 세미나",
    date: "2026년 7월 20일",
    location: "멜버른",
    city: "melbourne" as const,
    summary: "비자, 숙소, 알바 구하는 방법을 한국어로 안내하는 무료 세미나입니다.",
  },
  {
    title: "브리즈번 한인 축제",
    date: "2026년 8월 3일",
    location: "브리즈번",
    city: "other" as const,
    summary: "음식, 공연, 부스가 함께하는 지역 커뮤니티 축제입니다.",
  },
];

const cityFilters: Array<{ value: CityFilter; label: string }> = [
  { value: "all", label: "전체" },
  { value: "sydney", label: "시드니" },
  { value: "melbourne", label: "멜버른" },
  { value: "other", label: "기타" },
];

export default function Events() {
  const [cityFilter, setCityFilter] = useState<CityFilter>("all");

  useSEO({
    title: "이벤트 | Hoju Jobs",
    description: "호주 한인 커뮤니티 이벤트, 밋업, 세미나 정보를 확인하세요.",
    canonical: "https://hojujobs.com/events",
    htmlLang: "ko",
    ogLocale: "ko_KR",
  });

  const filteredEvents = useMemo(() => {
    if (cityFilter === "all") return sampleEvents;
    return sampleEvents.filter((event) => event.city === cityFilter);
  }, [cityFilter]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-[#f7f8fb]">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="mb-6 text-2xl font-black tracking-[-0.04em] text-neutral-950 sm:text-3xl">이벤트</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {cityFilters.map((filter) => {
            const isActive = cityFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCityFilter(filter.value)}
                className={cn(
                  "inline-flex h-9 items-center rounded-full border px-4 text-sm font-black transition-colors",
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-white py-12 text-center text-sm font-semibold text-slate-500">
            해당 지역의 이벤트가 없습니다.
          </p>
        ) : (
          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <article key={event.title} className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-black text-slate-950 sm:text-xl">{event.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {event.date} · {event.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{event.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
