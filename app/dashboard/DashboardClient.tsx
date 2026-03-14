"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import { useLocale } from "@/context/LocaleContext";
import ListingCard from "@/components/ListingCard";
import RequestCard from "@/components/RequestCard";
import type { Listing } from "@/lib/types";
import type { AdvertisingRequest } from "@/lib/types";

interface DashboardClientProps {
  currentUserId: string;
  listings: Listing[];
  requests: AdvertisingRequest[];
}

export default function DashboardClient({ currentUserId, listings, requests }: DashboardClientProps) {
  const { t } = useLocale();
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<"spaces" | "requests">("spaces");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"space" | "request" | null>(null);

  function handleEditSpace(id: string) {
    router.push(`/edit-listing/${id}`);
  }

  function handleEditRequest(id: string) {
    router.push(`/edit-request/${id}`);
  }

  function confirmDeleteSpace(id: string) {
    setDeletingId(id);
    setDeleteType("space");
  }

  function confirmDeleteRequest(id: string) {
    setDeletingId(id);
    setDeleteType("request");
  }

  function cancelDelete() {
    setDeletingId(null);
    setDeleteType(null);
  }

  async function submitDelete() {
    if (!deletingId || !deleteType) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const table = deleteType === "space" ? "listings" : "advertising_requests";
    await supabase.from(table).delete().eq("id", deletingId).eq("user_id", user.id);
    setDeletingId(null);
    setDeleteType(null);
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 min-w-0"
    >
      <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-text sm:text-3xl">{t("dashboard.title")}</h1>
          <p className="mt-1 text-slate-600">{t("dashboard.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/add-listing" className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 font-medium text-white shadow-soft hover:bg-blue-600">
            <Plus className="h-4 w-4" />
            {t("dashboard.addSpace")}
          </Link>
          <Link href="/post-request" className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white px-5 py-2.5 font-medium text-text shadow-soft hover:bg-slate-50">
            <Plus className="h-4 w-4" />
            {t("dashboard.postRequest")}
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 sm:mt-10 border-b border-slate-200 overflow-x-auto">
        <nav className="flex gap-1 min-w-0" aria-label="Tabs">
          <button
            type="button"
            onClick={() => setActiveTab("spaces")}
            className={`shrink-0 rounded-t-lg px-3 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "spaces"
                ? "border-b-2 border-primary text-primary bg-white -mb-px"
                : "text-slate-600 hover:text-text hover:bg-slate-50"
            }`}
          >
            {t("dashboard.mySpaces")}
            {listings.length > 0 && (
              <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
                {listings.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className={`shrink-0 rounded-t-lg px-3 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "requests"
                ? "border-b-2 border-primary text-primary bg-white -mb-px"
                : "text-slate-600 hover:text-text hover:bg-slate-50"
            }`}
          >
            {t("dashboard.myRequests")}
            {requests.length > 0 && (
              <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
                {requests.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab content: My Spaces */}
      {activeTab === "spaces" && (
        <section className="mt-6">
          {listings.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
              {listings.map((listing, i) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  index={i}
                  onEdit={listing.user_id === currentUserId ? () => handleEditSpace(listing.id) : undefined}
                  onDelete={listing.user_id === currentUserId ? () => confirmDeleteSpace(listing.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-card bg-white p-16 text-center shadow-soft">
              <p className="text-slate-600">{t("dashboard.noSpaces")}</p>
              <Link
                href="/add-listing"
                className="mt-4 inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 font-medium text-white hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                {t("dashboard.addSpace")}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab content: My Requests */}
      {activeTab === "requests" && (
        <section className="mt-6">
          {requests.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
              {requests.map((request, i) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  index={i}
                  onEdit={request.user_id === currentUserId ? () => handleEditRequest(request.id) : undefined}
                  onDelete={request.user_id === currentUserId ? () => confirmDeleteRequest(request.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-card bg-white p-16 text-center shadow-soft">
              <p className="text-slate-600">{t("dashboard.noRequests")}</p>
              <Link
                href="/post-request"
                className="mt-4 inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 font-medium text-white hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
                {t("dashboard.postRequest")}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Delete confirmation modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-card bg-white p-6 shadow-soft">
            <p className="text-text">{t("dashboard.deleteConfirm")}</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="flex-1 rounded-button border border-slate-200 bg-white py-2.5 font-medium text-text hover:bg-slate-50"
              >
                {t("common.cancel")}
              </button>
              <button
                type="button"
                onClick={submitDelete}
                className="flex-1 rounded-button bg-red-600 py-2.5 font-medium text-white hover:bg-red-700"
              >
                {t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
