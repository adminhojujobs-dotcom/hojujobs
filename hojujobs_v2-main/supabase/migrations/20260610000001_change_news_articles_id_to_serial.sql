alter table public.news_articles drop column id;
alter table public.news_articles add column id serial primary key;
