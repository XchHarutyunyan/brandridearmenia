import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import RequestDetailClient from "./RequestDetailClient";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: request, error } = await supabase
    .from("advertising_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !request) notFound();

  return <RequestDetailClient request={request} />;
}
