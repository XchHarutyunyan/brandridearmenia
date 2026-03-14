import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import ListingDetailClient from "./ListingDetailClient";

export default async function ListingPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = await createServerSupabaseClient();
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !listing) notFound();

  return <ListingDetailClient listing={listing} />;
}
