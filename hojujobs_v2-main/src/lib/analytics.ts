import { track } from "@vercel/analytics";

export type ListingType = "job" | "flatmate";

export function trackContactRevealClick(params: {
  logged_in: boolean;
  listing_type: ListingType;
  listing_id: string | number;
  revealed?: boolean;
}) {
  track("contact_reveal_click", {
    logged_in: params.logged_in,
    listing_type: params.listing_type,
    listing_id: String(params.listing_id),
    ...(params.revealed !== undefined ? { revealed: params.revealed } : {}),
  });
}
