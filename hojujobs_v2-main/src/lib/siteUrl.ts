/**
 * Canonical public origin for auth redirects, emails, and SEO.
 * - Set VITE_SITE_URL only when a deployment must force a specific origin.
 * - Otherwise, use the current host so preview deployments complete auth locally.
 */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return window.location.origin;
}
