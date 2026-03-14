-- Optional: run after creating a bucket named "listings" in Supabase Dashboard (Storage).
-- Create bucket via Dashboard: Storage → New bucket → name: listings → Public bucket.

-- Policy: authenticated users can upload to their own folder (path: user_id/...)
-- create policy "Users can upload listing images"
--   on storage.objects for insert
--   to authenticated
--   with check (bucket_id = 'listings' and (storage.foldername(name))[1] = auth.uid()::text);

-- Policy: public read (if bucket is public, this may already be default)
-- create policy "Listing images are public"
--   on storage.objects for select
--   to public
--   using (bucket_id = 'listings');
