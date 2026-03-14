"use client";

import { motion } from "framer-motion";
import { MapPin, Tag, Mail, Phone } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORY_ICONS } from "@/lib/categories";
import type { AdvertisingRequest } from "@/lib/types";

interface RequestCardProps {
  request: AdvertisingRequest;
  index?: number;
}

export default function RequestCard({ request, index = 0 }: RequestCardProps) {
  const { t } = useLocale();
  const Icon = CATEGORY_ICONS[request.category];

  const shortDescription =
    request.description && request.description.length > 120
      ? request.description.slice(0, 120) + "…"
      : request.description ?? "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group overflow-hidden rounded-card bg-white shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
    >
      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <Tag className="h-3 w-3" />
              {t(`categories.${request.category}`)}
            </span>
            <h3 className="mt-2 font-semibold text-text line-clamp-1 group-hover:text-primary transition-colors">
              {request.title}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0" />
              {request.city}
            </p>
            <p className="mt-2 text-lg font-semibold text-primary">
              ${request.budget}
              <span className="text-sm font-normal text-slate-500">{t("requests.perMonth")}</span>
            </p>
            {shortDescription && (
              <p className="mt-3 line-clamp-2 text-sm text-slate-600">{shortDescription}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {request.contact_email && (
                <a
                  href={`mailto:${request.contact_email}`}
                  className="inline-flex items-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-blue-600 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {t("requests.contact")}
                </a>
              )}
              {request.contact_phone && (
                <a
                  href={`tel:${request.contact_phone}`}
                  className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-text hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4" />
                  {request.contact_phone}
                </a>
              )}
              {!request.contact_email && !request.contact_phone && (
                <span className="text-sm text-slate-500">{t("listingDetail.noContact")}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
