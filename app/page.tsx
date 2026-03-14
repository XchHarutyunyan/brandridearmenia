import { createServerSupabaseClient } from "@/lib/supabaseServer";
import HomeContent from "./HomeClient";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return <HomeContent initialListings={listings ?? []} />;
}
