#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const CATEGORIES = new Set([
  "settle",
  "commute",
  "culture",
  "travel",
  "visa",
  "jobs",
  "education",
  "housing",
  "money",
  "safety",
  "community",
  "korea-australia",
]);

const REQUIRED_FIELDS = [
  "category_key",
  "category_label_ko",
  "title",
  "summary_ko",
  "source_name",
  "source_url",
];

function usage() {
  console.error("Usage: SUPABASE_SERVICE_ROLE_KEY=... npm run news:upsert -- ./news.json");
  console.error("Dry run: npm run news:upsert -- ./news.json --dry-run");
  console.error("Optional env: SUPABASE_URL or VITE_SUPABASE_URL");
}

function getConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    usage();
    throw new Error("Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return { supabaseUrl: supabaseUrl.replace(/\/$/, ""), serviceRoleKey };
}

function sourceDomain(sourceUrl) {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function validateArticle(article, index) {
  for (const field of REQUIRED_FIELDS) {
    if (!article[field]) {
      throw new Error(`Article ${index + 1} is missing required field: ${field}`);
    }
  }

  if (!CATEGORIES.has(article.category_key)) {
    throw new Error(`Article ${index + 1} has invalid category_key: ${article.category_key}`);
  }

  if (!sourceDomain(article.source_url)) {
    throw new Error(`Article ${index + 1} has invalid source_url: ${article.source_url}`);
  }
}

function normalizeArticle(article, index) {
  validateArticle(article, index);

  return {
    category_key: article.category_key,
    category_label_ko: article.category_label_ko,
    category_summary_ko: article.category_summary_ko ?? null,
    category_tone: article.category_tone ?? "from-blue-50 to-white border-blue-100",
    title: article.title,
    summary_ko: article.summary_ko,
    meta: article.meta ?? null,
    published_at_label_ko: article.published_at_label_ko ?? null,
    source_name: article.source_name,
    source_url: article.source_url,
    source_domain: article.source_domain ?? sourceDomain(article.source_url),
    original_published_at: article.original_published_at ?? null,
    is_featured: Boolean(article.is_featured),
    show_on_news_page: article.show_on_news_page ?? true,
    show_on_dashboard: Boolean(article.show_on_dashboard),
    sort_order: Number.isInteger(article.sort_order) ? article.sort_order : index,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const inputPath = args.find((arg) => !arg.startsWith("--"));
  if (!inputPath) {
    usage();
    process.exitCode = 1;
    return;
  }

  const raw = await readFile(inputPath, "utf8");
  const parsed = JSON.parse(raw);
  const articles = Array.isArray(parsed) ? parsed : parsed.articles;

  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("Input must be a non-empty JSON array or an object with an articles array.");
  }

  const payload = articles.map(normalizeArticle);

  if (dryRun) {
    console.log(`Validated ${payload.length} news article${payload.length === 1 ? "" : "s"}.`);
    for (const row of payload) {
      console.log(`- ${row.title}`);
    }
    return;
  }

  const { supabaseUrl, serviceRoleKey } = getConfig();
  const response = await fetch(`${supabaseUrl}/rest/v1/news_articles?on_conflict=source_url`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase upsert failed: ${response.status} ${response.statusText}\n${body}`);
  }

  const rows = await response.json();
  console.log(`Upserted ${rows.length} news article${rows.length === 1 ? "" : "s"}.`);
  for (const row of rows) {
    console.log(`- ${row.id}: ${row.title}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
