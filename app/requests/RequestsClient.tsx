"use client";

import { motion } from "framer-motion";
import RequestCard from "@/components/RequestCard";
import { useLocale } from "@/context/LocaleContext";
import type { AdvertisingRequest } from "@/lib/types";

export default function RequestsClient({
  initialRequests,
}: {
  initialRequests: AdvertisingRequest[];
}) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-text sm:text-3xl md:text-4xl">{t("requests.title")}</h1>
      <p className="mt-2 text-sm sm:text-base text-slate-600">{t("requests.subtitle")}</p>

      {initialRequests.length > 0 ? (
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
          {initialRequests.map((request, i) => (
            <RequestCard
              key={request.id}
              request={request}
              index={i}
              detailUrl={`/requests/${request.id}`}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 rounded-card bg-white p-16 text-center shadow-soft"
        >
          <p className="text-slate-600">{t("requests.noResults")}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
