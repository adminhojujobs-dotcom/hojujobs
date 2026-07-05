-- The stored photo_url 404'd (WordPress media moved from /2026/01/ to /2025/12/).
-- Point at the same real photo's current working path.
UPDATE public.company_profiles
SET photo_url = 'https://stoneagebbq.com.au/wp-content/uploads/2025/12/Generated-Image-December-29-2025-2_18AM.jpeg'
WHERE slug = 'stoneage';
