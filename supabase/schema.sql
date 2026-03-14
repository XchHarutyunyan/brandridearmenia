-- BrandRideArmenia: listings table
-- Run this in Supabase SQL Editor after enabling Auth.

-- Create listings table (users are managed by Supabase Auth)
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('cars', 'buildings', 'shop_windows', 'walls', 'trucks', 'couriers', 'balconies', 'other')),
  city text not null,
  price integer not null check (price > 0),
  description text,
  image_url text,
  photo_urls text[] default '{}',
  contact_email text,
  contact_phone text,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.listings enable row level security;

-- Anyone can read listings
create policy "Listings are viewable by everyone"
  on public.listings for select
  using (true);

-- Authenticated users can insert their own
create policy "Users can create own listings"
  on public.listings for insert
  with check (auth.uid() = user_id);

-- Users can update their own
create policy "Users can update own listings"
  on public.listings for update
  using (auth.uid() = user_id);

-- Users can delete their own
create policy "Users can delete own listings"
  on public.listings for delete
  using (auth.uid() = user_id);

-- Optional: index for listing by created_at and filters
create index if not exists listings_created_at_idx on public.listings(created_at desc);
create index if not exists listings_category_idx on public.listings(category);
create index if not exists listings_city_idx on public.listings(city);
create index if not exists listings_user_id_idx on public.listings(user_id);

-- Advertising requests (demand side)
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
  on public.advertising_requests for select using (true);

create policy "Anyone can create advertising requests"
  on public.advertising_requests for insert with check (true);

create index if not exists advertising_requests_created_at_idx on public.advertising_requests(created_at desc);
create index if not exists advertising_requests_category_idx on public.advertising_requests(category);
create index if not exists advertising_requests_city_idx on public.advertising_requests(city);
