"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Calendar } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORY_ICONS } from "@/lib/categories";
import type { AdvertisingRequest } from "@/lib/types";

export default function RequestDetailClient({ request }: { request: AdvertisingRequest }) {
  const { t } = useLocale();
  const Icon = CATEGORY_ICONS[request.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl px-6 py-12"
    >
      <div className="overflow-hidden rounded-card bg-white shadow-soft-lg">
        <div className="p-8 md:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Icon className="h-4 w-4" />
            {t(`categories.${request.category}`)}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-text">{request.title}</h1>
          <p className="mt-2 flex items-center gap-2 text-slate-600">
            <MapPin className="h-5 w-5 shrink-0" />
            {request.city}
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <p className="flex items-center gap-2 text-2xl font-bold text-primary">
              ${request.budget}
              <span className="text-base font-normal text-slate-500">{t("requests.perMonth")}</span>
            </p>
            {request.duration && (
              <p className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-5 w-5 shrink-0" />
                {request.duration}
              </p>
            )}
          </div>
          {request.description && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {t("requestDetail.description")}
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-slate-700">{request.description}</p>
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {request.contact_email && (
              <motion.a
                href={`mailto:${request.contact_email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-3 font-medium text-white shadow-soft hover:bg-blue-600"
              >
                <Mail className="h-4 w-4" />
                {t("listingDetail.contactByEmail")}
              </motion.a>
            )}
            {request.contact_phone && (
              <motion.a
                href={`tel:${request.contact_phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white px-5 py-3 font-medium text-text hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                {request.contact_phone}
              </motion.a>
            )}
            {!request.contact_email && !request.contact_phone && (
              <p className="text-slate-500">{t("listingDetail.noContact")}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/requests" className="text-primary font-medium hover:underline">
          ← {t("requestDetail.backToRequests")}
        </Link>
      </div>
    </motion.div>
  );
}
