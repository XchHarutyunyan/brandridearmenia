import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import AddListingForm from "@/app/add-listing/AddListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/edit-listing/" + id);

  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <AddListingForm listingId={id} initialData={listing} />
    </div>
  );
}
