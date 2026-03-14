import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import AddListingForm from "./AddListingForm";

export default async function AddListingPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/add-listing");

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <AddListingForm />
    </div>
  );
}
