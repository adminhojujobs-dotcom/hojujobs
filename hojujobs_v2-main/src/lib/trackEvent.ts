import { supabase } from "@/integrations/supabase/client";

export type TrackedEventName =
  | "job_listing_viewed"
  | "rental_listing_viewed"
  | "sale_listing_viewed"
  | "contact_number_clicked"
  | "email_clicked"
  | "kakao_clicked"
  | "text_selected_contact"
  | "job_post_started"
  | "job_post_submitted"
  | "rental_post_started"
  | "rental_post_submitted"
  | "search_performed"
  | "filter_changed"
  | "flatmates_page_viewed"
  | "sales_page_viewed"
  | "news_page_viewed"
  | "dashboard_page_viewed"
  | "job_card_clicked"
  | "rental_card_clicked"
  | "sale_card_clicked"
  | "deal_outbound_clicked"
  | "map_clicked"
  | "news_article_clicked"
  | "navigation_clicked"
  | "post_cta_clicked"
  | "my_posts_clicked"
  | "admin_clicked"
  | "promote_cta_clicked"
  | "auth_login_clicked"
  | "auth_signup_clicked"
  | "auth_google_clicked"
  | "auth_mode_toggled"
  | "sales_filter_changed";

export type TrackEventPayload = {
  listing_type?: "job" | "rental" | "sale";
  listing_id?: string | number;
  metadata?: Record<string, unknown>;
};

const ANONYMOUS_ID_KEY = "hoju_anonymous_activity_id";

function getAnonymousId() {
  try {
    const existing = localStorage.getItem(ANONYMOUS_ID_KEY);
    if (existing) return existing;

    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(ANONYMOUS_ID_KEY, next);
    return next;
  } catch {
    return undefined;
  }
}

export async function trackEvent(
  eventName: TrackedEventName,
  data: TrackEventPayload = {},
): Promise<void> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const body = {
      event_name: eventName,
      page_url: window.location.href,
      listing_type: data.listing_type,
      listing_id: data.listing_id != null ? String(data.listing_id) : undefined,
      metadata: data.metadata,
      anonymous_id: getAnonymousId(),
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const response = await fetch("/api/track-event", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok && import.meta.env.DEV) {
      const err = await response.json().catch(() => ({}));
      console.warn("[trackEvent] Failed:", eventName, err);
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("[trackEvent] Error:", eventName, err);
    }
  }
}
