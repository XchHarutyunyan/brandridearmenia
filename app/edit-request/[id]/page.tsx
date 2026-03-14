import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import PostRequestForm from "@/app/post-request/PostRequestForm";

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/edit-request/" + id);

  const { data: request } = await supabase
    .from("advertising_requests")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!request) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 min-w-0">
      <PostRequestForm requestId={id} initialData={request} />
    </div>
  );
}
