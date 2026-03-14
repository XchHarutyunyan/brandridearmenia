import { createServerSupabaseClient } from "@/lib/supabaseServer";
import RequestsClient from "./RequestsClient";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: requests } = await supabase
    .from("advertising_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 min-w-0">
      <RequestsClient initialRequests={requests ?? []} />
    </div>
  );
}
