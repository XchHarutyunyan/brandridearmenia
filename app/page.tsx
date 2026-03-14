import { createServerSupabaseClient } from "@/lib/supabaseServer";
import HomeContent from "./HomeClient";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const [listingsRes, requestsRes] = await Promise.all([
    supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("advertising_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <HomeContent
      initialListings={listingsRes.data ?? []}
      initialRequests={requestsRes.data ?? []}
    />
  );
}
