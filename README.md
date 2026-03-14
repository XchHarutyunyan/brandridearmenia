# Brand Ride Armenia

A marketplace for real-world advertising spaces in Armenia. List cars, buildings, shop windows, and walls—companies find and rent them for ads.

## Tech stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Supabase (Auth + PostgreSQL + optional Storage)

## Run locally

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Supabase setup**

   - Create a project at [supabase.com](https://supabase.com).
   - In the SQL Editor, run the script in `supabase/schema.sql` to create the `listings` table and RLS policies.
   - (Optional) Create a storage bucket named `listings` and set it to **public** if you want image uploads on Add Listing.
   - Copy your project URL and anon key from **Settings → API** into `.env.local` (see `.env.example`). Without these, the app will build and run but auth and listings will not work.

3. **Seed data (optional)**

   - Sign up once in the app (e.g. `/register`) so that `auth.users` has at least one user.
   - In the SQL Editor, run `supabase/seed.sql` to insert sample listings (replace or use the first user id as in the script).

4. **Start dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Supabase setup (summary)

1. **Database**
   - Run `supabase/schema.sql` in the SQL Editor.

2. **Auth**
   - Email auth is on by default. To skip email confirmation: **Authentication → Providers → Email** → disable “Confirm email”.

3. **Storage (optional)**
   - **Storage** → New bucket → name: `listings` → set to **Public**.
   - This enables image upload when adding a listing.

4. **Seed**
   - After one user exists, run `supabase/seed.sql` to add ~20 sample listings.

## Project structure

- `app/` — App Router pages and layouts
- `components/` — Navbar, Footer, ListingCard, Mascot
- `lib/` — Supabase client, server client, types
- `animations/` — Framer Motion variants
- `supabase/` — `schema.sql`, `seed.sql`

## Scripts

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
