"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORIES } from "@/lib/types";
import type { Listing } from "@/lib/types";

const CITIES = ["Yerevan", "Gyumri", "Vanadzor", "Abovyan", "Dilijan", "Ashtarak", "All"];

export default function ListingsClient({
  initialListings,
  initialCategory,
  initialCity,
  initialMin,
  initialMax,
}: {
  initialListings: Listing[];
  initialCategory?: string;
  initialCity?: string;
  initialMin?: string;
  initialMax?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(initialCategory ?? "");
  const [city, setCity] = useState(initialCity ?? "");
  const [min, setMin] = useState(initialMin ?? "");
  const [max, setMax] = useState(initialMax ?? "");
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLocale();

  const applyFilters = useCallback(() => {
    const p = new URLSearchParams(searchParams.toString());
    if (category) p.set("category", category);
    else p.delete("category");
    if (city) p.set("city", city);
    else p.delete("city");
    if (min) p.set("min", min);
    else p.delete("min");
    if (max) p.set("max", max);
    else p.delete("max");
    router.push(`/listings?${p.toString()}`);
  }, [category, city, min, max, router, searchParams]);

  const clearFilters = useCallback(() => {
    setCategory("");
    setCity("");
    setMin("");
    setMax("");
    router.push("/listings");
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-text sm:text-3xl md:text-4xl">{t("spaces.title")}</h1>
      <p className="mt-2 text-sm sm:text-base text-slate-600">{t("spaces.subtitle")}</p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-button border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-soft hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" />
          {t("spaces.filters")}
        </motion.button>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex w-full flex-wrap items-end gap-4 rounded-card border border-slate-200 bg-white p-4 shadow-soft md:w-auto"
          >
            <div>
              <label className="block text-xs font-medium text-slate-500">{t("spaces.category")}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">{t("spaces.all")}</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {t(`categories.${c}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">{t("spaces.city")}</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">{t("spaces.all")}</option>
                {CITIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">{t("spaces.minPrice")}</label>
              <input
                type="number"
                min="0"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="0"
                className="mt-1 w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">{t("spaces.maxPrice")}</label>
              <input
                type="number"
                min="0"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Any"
                className="mt-1 w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={applyFilters}
                className="rounded-button bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              >
                <Search className="mr-1.5 inline h-4 w-4" />
                {t("spaces.apply")}
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearFilters}
                className="rounded-button border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {t("spaces.clear")}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {initialListings.length > 0 ? (
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
          {initialListings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 rounded-card bg-white p-16 text-center shadow-soft"
        >
          <p className="text-slate-600">{t("spaces.noResults")}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-primary font-medium hover:underline"
          >
            {t("spaces.clearFilters")}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
