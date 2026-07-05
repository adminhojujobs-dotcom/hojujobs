# Hoju Jobs Website Overview

Generated on 2026-07-05 from the current codebase.

## 1. What This Site Is

Hoju Jobs is a Korean-language community website for people in Australia. It currently combines:

- Korean job discovery and job posting.
- Company profile recruiting pages.
- Flatmate and rental listings.
- Sales/deal listings sourced from OzBargain-style deal data.
- Australian life/news content for Korean users.
- Working holiday helper information, including exchange rates and flight links.
- Admin moderation, promotion controls, and user activity reporting.

The app is a React single-page application deployed to Vercel and backed by Supabase.

## 2. Tech Stack

- Frontend: React 18, TypeScript, Vite.
- Routing: `react-router-dom`.
- Data/API: Supabase client SDK, Supabase Auth, PostgreSQL tables, RPC functions, Supabase Storage.
- Styling: Tailwind CSS with shadcn/Radix UI primitives.
- State/data helpers: React state, React Query provider, browser `sessionStorage` and `localStorage`.
- Analytics: Vercel Analytics plus a custom `/api/track-event` endpoint.
- Deployment: Vercel.

Important entry files:

- `src/main.tsx` boots the app, handles canonical-domain redirects, QR redirects, and Vercel Analytics injection.
- `src/App.tsx` defines the route tree.
- `src/integrations/supabase/client.ts` creates the Supabase client from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- `src/components/MainLayout.tsx` wraps routed pages with scroll reset and the footer.

## 3. App Boot And Global Behavior

When the browser loads the site:

1. `src/main.tsx` checks whether the host is `hojujobs.vercel.app`.
2. If so, it redirects to `https://hojujobs.com` while preserving path, query, and hash.
3. If the path starts with `/qr`, it converts the QR path into UTM parameters and redirects to the target page.
4. Otherwise it injects Vercel Analytics, tracks QR visits, and renders `<App />`.

The React tree wraps everything in:

- `QueryClientProvider` for React Query.
- `TooltipProvider`.
- Toast providers.
- `BrowserRouter`.
- `AuthProvider`, which keeps Supabase auth session, user, and admin status in context.

`MainLayout` renders:

- `ScrollToTop`, so page navigation resets scroll.
- The active route through `<Outlet />`.
- `SiteFooter` on all routes.

## 4. Routing Map

Main routes in `src/App.tsx`:

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | `Index` | Homepage with quick promo sections, locations, featured company jobs, guides. |
| `/sydney` | `Index cityFilter="NSW"` | City-focused homepage metadata for Sydney/NSW. |
| `/melbourne` | `Index cityFilter="VIC"` | City-focused homepage metadata for Melbourne/VIC. |
| `/brisbane` | `Index cityFilter="QLD"` | City-focused homepage metadata for Brisbane/QLD. |
| `/adelaide` | `Index cityFilter="SA"` | City-focused homepage metadata for Adelaide/SA. |
| `/job/:id` | `JobDetail` | Standard job detail page. |
| `/company/:slug` variants | Company pages | Dedicated company recruiting profile pages. |
| `/company/:slug/opening/:openingId` | `CompanyJobDetail` | Detail page for a company job opening. |
| `/auth` | `Auth` | Email/password and Google login/signup. |
| `/post-job` | `PostJob` | Create a job listing. |
| `/my-posts` | `MyPosts` | Manage the current user's jobs and rental posts. |
| `/edit-job/:id` | `EditJob` | Edit an owned job, or any job as admin. |
| `/admin` | `Admin` | Admin moderation and promotion dashboard. |
| `/admin/activity` | `AdminActivity` | Admin user/anonymous activity analytics. |
| `/news` | `News` | News article groups. |
| `/flatmates` | `Flatmates` | Rental/flatmate listing search. |
| `/flatmates/post` | `FlatmatesPost` | Create a rental listing. |
| `/flatmates/:id` | `FlatmateDetail` | Rental listing detail page. |
| `/dashboard` | `Dashboard` | Working holiday helper dashboard. |
| `/sales` | `Sales` | Deal listing page. |
| `/sales/:rank` | `SaleDetail` | Deal detail page. |
| `/about`, `/faq`, `/blog`, `/blog/:slug`, `/privacy`, `/terms` | Static/content pages | Site info, blog, legal pages. |
| `*` | `NotFound` | 404 page. |

## 5. Navigation And Layout

There are two header components:

- `Header` is used on most functional pages such as jobs, flatmates, sales, news, dashboard, auth, admin, and posting pages.
- `ModernHeader` is used on the homepage and company recruiting pages.

`Header` includes:

- Logo/home button.
- City dropdown: Australia-wide, Sydney, Melbourne, Brisbane.
- Tabs for Flatmates, Sales, News, and Working Holiday info.
- Login button when signed out.
- Upload and My Profile buttons when signed in.
- Admin button for users with the `admin` role.

It also sends custom tracking events for navigation, upload CTA clicks, my profile clicks, and admin clicks.

## 6. Authentication And Admin Roles

Authentication is handled by Supabase Auth in `src/hooks/useAuth.tsx`.

The `AuthProvider`:

- Subscribes to Supabase auth state changes.
- Calls `supabase.auth.getSession()` on load.
- Stores `user`, `session`, `loading`, and `isAdmin`.
- Checks admin status by querying `user_roles` for `role = "admin"`.
- Exposes `signOut()`.

The `/auth` page supports:

- Email/password login.
- Email/password signup.
- Google OAuth.
- Optional `?next=/some/path` redirects after login.

Pages such as `/flatmates/post`, `/edit-job/:id`, `/admin`, and `/admin/activity` use auth state to redirect or deny access.

## 7. Homepage

`src/pages/Index.tsx` is the homepage and city landing page.

It currently renders:

1. `ModernHeader`.
2. `MobileLocationPicker`.
3. `QuickSections`.
4. `LocationSection`.
5. `FeaturedJobs`.
6. `WorkingHolidayGuides`.
7. Safety notice.

`QuickSections` fetches up to seven items each from:

- `ozbargain_deals` for sales/deals.
- `news_articles` for news.
- `community_events` for community events.

It turns those into rotating desktop sections and carousel-style mobile cards.

`FeaturedJobs` fetches `homepage_job_cards`, verifies that linked company profiles are active, adjusts labels when companies have multiple branches, and falls back to hardcoded company cards if data is missing.

The homepage sets Korean SEO metadata, with city-specific metadata for NSW, VIC, QLD, and SA routes.

## 8. Standard Job Listings

Standard jobs live in the `jobs` table.

### Posting Jobs

`src/pages/PostJob.tsx` lets a user create a job listing with:

- Title.
- One or more locations.
- Industry.
- Contact phone.
- Email.
- Kakao ID.
- Google map search query.
- Description.

The form uses existing jobs to populate available locations and industries. On submit it inserts into `jobs`, attaches `user_id` when logged in, clears listing caches, tracks `job_post_submitted`, and navigates to `/my-posts`.

### Job Detail

`src/pages/JobDetail.tsx` loads a job by `id` from `jobs`. If it is not found, it checks `jobs_archive`.

The detail page:

- Increments view counts via Supabase RPC `increment_view_count`.
- Deduplicates view increments for 30 minutes with `localStorage`.
- Caches view counts in `sessionStorage`.
- Marks jobs as expired if they are archived or older than six days.
- Shows `noindex` and hides JobPosting JSON-LD for expired jobs.
- Tracks `job_listing_viewed`.
- Displays description and contact behind a reveal/login interaction.
- Shows a Google Maps link when `google_search` exists.

### Editing And Deleting

`MyPosts` lists current user's jobs and rental posts. For anonymous legacy posts, it queries rows with `user_id IS NULL`.

`EditJob` requires login. Non-admin users can only load/update their own jobs. Admin users can edit any job and return to `/admin` when editing from the admin dashboard.

## 9. Contact Reveal Flow

Job contact and some listing details are protected by `ListingRevealProvider`.

Before reveal:

- Description/contact sections can show a preview/overlay.
- Clicking redirects unauthenticated users to `/auth?next=current-page`.
- Reveal actions are tracked.

After login:

- The provider automatically reveals content.
- A session-level key such as `hoju_listing_revealed_job_123` keeps it revealed for that browser session.

Contact interactions track phone, email, Kakao, and selected contact text through the custom analytics pipeline.

## 10. Company Recruiting Pages

Dedicated company pages exist for:

- KMALL09.
- Bunsik.
- Sushi Yuzen.
- Chicken V.
- Park Bongsook.
- Yangga Deli.
- Stoneage.
- DK Hair Studio.

These pages generally:

- Fetch `company_profiles` by `slug`.
- Fetch active `company_job_openings` by `company_slug`.
- Render fallback content if Supabase data is unavailable.
- Show profile photo, logo, badges, about text, working conditions, recruitment conditions, skill tags, address/map link, phone/email/Instagram, and active openings.

`CompanyJobDetail` is the reusable opening detail page for `/company/:slug/opening/:openingId`. It fetches:

- The active opening from `company_job_openings`.
- The active profile from `company_profiles`.
- An optional branch from `company_branches`.

Branch data can override profile-level contact, address, condition rows, and recruitment rows.

## 11. Flatmates And Rentals

Flatmate/rental listings use the `hojunara_realestate_share` table.

### Flatmates List

`src/pages/Flatmates.tsx` fetches up to 2,000 listings ordered by `time_posted`.

Users can filter by:

- Keyword.
- Suburb.
- Private room.
- Gender restriction.
- Private bathroom.
- Minimum rent.
- Maximum rent.

The page:

- Paginates at 20 listings per page.
- Restores scroll position after opening a detail page.
- Tracks page views, filter changes, and listing card clicks.
- Shows admin-only context where applicable.

### Flatmate Detail

`FlatmateDetail` loads a single rental listing, formats price/date/gender labels, shows photo gallery/lightbox, contact details, and tracks `rental_listing_viewed`.

### Posting Rentals

`FlatmatesPost` requires login. It supports:

- Up to 10 uploaded photos.
- Title, description, rent, state, suburb.
- Private room/private bathroom toggles.
- Gender restriction.
- Phone, email, Kakao ID.

Photos upload to the Supabase Storage bucket `realestate-photos`. The created listing stores public photo URLs in `post_photo` and the first image in `image_url`.

## 12. Sales And Deals

Sales/deals use the `ozbargain_deals` table.

`src/pages/Sales.tsx`:

- Fetches deals ordered by `rank`.
- Caches them in `sessionStorage` for five minutes.
- Stores selected product/category filters in `sessionStorage`.
- Restores scroll position after visiting a detail page.
- Lets admins delete deals.
- Tracks sales page views, filter changes, card clicks, and outbound deal clicks.

`src/pages/SaleDetail.tsx`:

- Loads a deal by `rank`.
- Cleans Markdown-ish duplicated title/description labels.
- Renders Markdown content with `react-markdown`.
- Shows image, category, uploaded date, promo codes, and outbound link.
- Tracks `sale_listing_viewed` and `deal_outbound_clicked`.

## 13. News

News uses the `news_articles` table.

`src/pages/News.tsx`:

- Fetches rows where `show_on_news_page = true`.
- Orders by `sort_order` and `original_published_at`.
- Groups articles by `category_key`.
- Displays Korean category labels, summaries, article summaries, images, sources, and dates.
- Sends article clicks through Google Translate URLs so users can read source pages in Korean.
- Tracks `news_page_viewed` and `news_article_clicked`.

There is also a Node script:

- `scripts/upsert-news-articles.mjs`

It validates a JSON input file and upserts news articles into Supabase using a service role key.

## 14. Working Holiday Dashboard

`src/pages/Dashboard.tsx` is the working holiday helper page.

It currently includes:

- KRW to AUD exchange-rate card.
- Extra USD, JPY, EUR rates.
- KRW to AUD calculator.
- Flight deal/link helpers for Korean-to-Australian routes.
- City/job links.
- Static news/helper content.

Exchange rates are fetched from `exchange_rates` where `base_currency = "KRW"`, then refreshed every five minutes while the page is open.

## 15. Blog And Static Pages

Static/content pages include:

- `About`.
- `Faq`.
- `Privacy`.
- `Terms`.
- `Blog`.
- `BlogPost`.

Blog metadata and content come from `src/data/blogPosts.ts`, while blog images live under `public/blog/`.

Most public content pages call `useSEO` to set title, description, canonical URL, language, Open Graph locale, and sometimes JSON-LD.

## 16. Admin Dashboard

`src/pages/Admin.tsx` is available only to authenticated admins.

It provides two tabs:

- Jobs.
- Deals.

For jobs, admins can:

- View active recent jobs from the last six days.
- See user-uploaded badges.
- Edit locations inline.
- Navigate to edit jobs.
- Delete jobs.
- Toggle `Promoted` on jobs.

For deals, admins can:

- View paginated deals.
- Delete deals.
- Toggle `promoted` on deals.

Promotion changes clear relevant `sessionStorage` caches, including listing caches and sales cache.

## 17. Admin Activity Dashboard

`src/pages/AdminActivity.tsx` is also admin-only.

It loads:

- Logged-in user summaries from RPC `get_user_activity_summary`.
- Anonymous event summaries from RPC `get_anonymous_activity_summary`.
- Admin user ids from `user_roles`.

The dashboard supports:

- Time filters such as seven-day summaries.
- Search by user email/display name.
- Separating regular users and admin users.
- Summary comparisons of logged-in users versus anonymous visitors.
- Per-user detail cards and event-category metrics.

## 18. Tracking And Analytics

There are two analytics systems:

1. Vercel Analytics, injected in `src/main.tsx`.
2. Custom event tracking through `src/lib/trackEvent.ts` and `api/track-event.ts`.

The custom `trackEvent` helper:

- Gets the current Supabase session.
- Creates/persists an anonymous id in `localStorage`.
- Sends event name, page URL, listing type/id, metadata, anonymous id, and auth token to `/api/track-event`.

The Vercel Edge API route:

- Allows only known event names.
- Validates listing types.
- Adds country and user-agent context from request headers.
- Inserts anonymous traffic into `anonymous_click_events`.
- Verifies logged-in tokens with Supabase Auth.
- Inserts logged-in traffic into `user_click_events`.

Tracked event groups include:

- Listing views.
- Contact clicks and contact text selection.
- Post starts/submissions.
- Search/filter changes.
- Page views.
- Card clicks.
- Outbound deal/news/map clicks.
- Navigation and auth actions.

## 19. SEO

`src/hooks/useSEO.ts` handles page metadata.

It can set:

- Document title.
- Meta description.
- Canonical URL.
- Keywords.
- HTML language.
- Open Graph locale.
- JSON-LD script.
- `noindex` robots tag.

Job detail pages generate JobPosting JSON-LD only for non-expired jobs. Expired/archive job pages are noindexed.

## 20. Main Supabase Tables And Storage

Important tables currently referenced by the frontend/API:

- `jobs`: standard job listings.
- `jobs_archive`: archived/expired job fallback.
- `view_counts`: per-job view counts.
- `user_roles`: admin role lookup.
- `homepage_job_cards`: homepage featured company cards.
- `company_profiles`: company recruiting profiles.
- `company_branches`: optional branch-level company data.
- `company_job_openings`: active company job openings.
- `hojunara_realestate_share`: flatmate/rental listings.
- `ozbargain_deals`: sales/deals.
- `news_articles`: news content.
- `community_events`: homepage community event cards.
- `exchange_rates`: dashboard exchange-rate data.
- `anonymous_click_events`: anonymous custom analytics.
- `user_click_events`: logged-in custom analytics.
- `user_activity_summary`: generated/typed activity summary data.

Important RPC functions:

- `increment_view_count`.
- `get_user_activity_summary`.
- `get_anonymous_activity_summary`.

Important storage bucket:

- `realestate-photos`, used by `FlatmatesPost`.

## 21. Caching And Browser Storage

The site uses browser storage for small UX optimizations:

- `sessionStorage` caches listing counts and sales data.
- `sessionStorage` remembers sales filters and scroll positions.
- `sessionStorage` remembers reveal state for listing contact/detail sections.
- `sessionStorage` queues pending auth events while login completes.
- `localStorage` deduplicates job view increments for 30 minutes.
- `localStorage` stores the anonymous analytics id.

Cache clearing exists in:

- `src/lib/listingCache.ts`.
- Admin promotion/deletion actions.
- Header home-refresh behavior.

## 22. Environment Variables

Frontend build/runtime expects:

- `VITE_SUPABASE_URL`.
- `VITE_SUPABASE_PUBLISHABLE_KEY`.

Server/API and scripts may also need:

- `SUPABASE_URL` or `VITE_SUPABASE_URL`.
- `SUPABASE_SERVICE_ROLE_KEY`.

In development, missing Supabase frontend env vars create a placeholder client so React can still mount, but real data/auth will not work until `.env.local` is configured.

## 23. Development Commands

From `hojujobs_v2-main`:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run news:upsert -- ./path/to/news.json
```

The app README says to create `.env.local` from `.env.example` and add Supabase keys before development.

## 24. Current Architectural Notes

- The site is mostly client-rendered. SEO metadata is updated in the browser with `useSEO`.
- There is no centralized route guard component; individual pages check auth/admin status.
- Several pages use fallback hardcoded data so the UI remains usable when Supabase rows are missing.
- Homepage cards and company pages are actively moving toward Supabase-managed company/profile/opening data.
- Standard jobs and company job openings are separate systems: standard jobs use `jobs`, while company recruiting pages use `company_profiles`, `company_branches`, and `company_job_openings`.
- Some naming is legacy or inconsistent, such as `Promoted` with a capital P on `jobs`, `promoted` on deals, and `hojunara_realestate_share` for rentals.
- Admin and analytics depend on database policies/RPCs being configured correctly in Supabase migrations.

