"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/lib/types";

export default function DashboardClient({ listings }: { listings: Listing[] }) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl px-6 py-12"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">{t("dashboard.title")}</h1>
          <p className="mt-1 text-slate-600">{t("dashboard.subtitle")}</p>
        </div>
        <Link href="/add-listing" className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 font-medium text-white shadow-soft hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          {t("dashboard.addNew")}
        </Link>
      </div>

      {listings.length > 0 ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-card bg-white p-16 text-center shadow-soft">
          <p className="text-slate-600">{t("dashboard.noListings")}</p>
          <Link
            href="/add-listing"
            className="mt-4 inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 font-medium text-white hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            {t("dashboard.addFirst")}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
