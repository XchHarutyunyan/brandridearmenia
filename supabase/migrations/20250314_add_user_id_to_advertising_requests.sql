-- Add user_id to advertising_requests for ownership (run on existing DBs)
alter table public.advertising_requests
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

drop policy if exists "Anyone can create advertising requests" on public.advertising_requests;

create policy "Authenticated users can create own requests"
  on public.advertising_requests for insert
  with check (auth.uid() = user_id);

create policy "Users can update own requests"
  on public.advertising_requests for update
  using (auth.uid() = user_id);

create policy "Users can delete own requests"
  on public.advertising_requests for delete
  using (auth.uid() = user_id);

create index if not exists advertising_requests_user_id_idx on public.advertising_requests(user_id);
