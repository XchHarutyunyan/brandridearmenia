-- Brand Ride Armenia: two-sided marketplace
-- 1. Extend listings categories and add multiple photos
-- 2. Add advertising_requests table

-- Extend listings: add photo_urls for multiple images; broaden category check
alter table public.listings drop constraint if exists listings_category_check;
alter table public.listings add constraint listings_category_check
  check (category in ('cars', 'buildings', 'shop_windows', 'walls', 'trucks', 'couriers', 'balconies', 'other'));

alter table public.listings add column if not exists photo_urls text[] default '{}';

-- Table: advertising_requests (demand side)
create table if not exists public.advertising_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  city text not null,
  category text not null check (category in ('cars', 'buildings', 'shop_windows', 'walls', 'trucks', 'couriers', 'balconies', 'other')),
  budget integer not null check (budget > 0),
  duration text,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now()
);

alter table public.advertising_requests enable row level security;

create policy "Advertising requests are viewable by everyone"
  on public.advertising_requests for select
  using (true);

create policy "Anyone can create advertising requests"
  on public.advertising_requests for insert
  with check (true);

create index if not exists advertising_requests_created_at_idx on public.advertising_requests(created_at desc);
create index if not exists advertising_requests_category_idx on public.advertising_requests(category);
create index if not exists advertising_requests_city_idx on public.advertising_requests(city);
