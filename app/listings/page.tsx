import { createServerSupabaseClient } from "@/lib/supabaseServer";
import ListingsClient from "./ListingsClient";

export const dynamic = "force-dynamic";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: { category?: string; city?: string; min?: string; max?: string };
}) {
  const params = searchParams;
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("listings").select("*").order("created_at", { ascending: false });

  if (params.category) query = query.eq("category", params.category);
  if (params.city) query = query.ilike("city", `%${params.city}%`);
  if (params.min) query = query.gte("price", Number(params.min));
  if (params.max) query = query.lte("price", Number(params.max));

  const { data: listings } = await query;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <ListingsClient
        initialListings={listings ?? []}
        initialCategory={params.category}
        initialCity={params.city}
        initialMin={params.min}
        initialMax={params.max}
      />
    </div>
  );
}
