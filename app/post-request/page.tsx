import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import PostRequestForm from "./PostRequestForm";

export default async function PostRequestPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/post-request");

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <PostRequestForm />
    </div>
  );
}
