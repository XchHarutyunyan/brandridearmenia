"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Tag, Mail, Phone, Pencil, Trash2 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORY_ICONS } from "@/lib/categories";
import type { AdvertisingRequest } from "@/lib/types";

interface RequestCardProps {
  request: AdvertisingRequest;
  index?: number;
  /** When set, the entire card is a link to this URL (no nested anchors; contact uses buttons) */
  detailUrl?: string;
  /** When set, show Edit/Delete buttons */
  onEdit?: () => void;
  onDelete?: () => void;
}

function ContactButtons({
  request,
  detailUrl,
  onEdit,
  onDelete,
  t,
}: {
  request: AdvertisingRequest;
  detailUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  t: (key: string) => string;
}) {
  const showActions = Boolean(onEdit || onDelete);

  if (detailUrl) {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {request.contact_email && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `mailto:${request.contact_email}`;
            }}
            className="inline-flex items-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-blue-600 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {t("requests.contact")}
          </button>
        )}
        {request.contact_phone && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `tel:${request.contact_phone}`;
            }}
            className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-text hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" />
            {request.contact_phone}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
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
      {!request.contact_email && !request.contact_phone && !showActions && (
        <span className="text-sm text-slate-500">{t("listingDetail.noContact")}</span>
      )}
      {showActions && (
        <>
          {onEdit && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="inline-flex items-center gap-1.5 rounded-button border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-text hover:bg-slate-50"
            >
              <Pencil className="h-3.5 w-3.5" />
              {t("common.edit")}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="inline-flex items-center gap-1.5 rounded-button border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t("common.delete")}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function RequestCard({ request, index = 0, detailUrl, onEdit, onDelete }: RequestCardProps) {
  const { t } = useLocale();
  const Icon = CATEGORY_ICONS[request.category];

  const shortDescription =
    request.description && request.description.length > 120
      ? request.description.slice(0, 120) + "…"
      : request.description ?? "";

  const cardContent = (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={detailUrl ? { scale: 1.02, y: -4 } : undefined}
      className={`group overflow-hidden rounded-card bg-white shadow-soft transition-shadow duration-300 ${detailUrl ? "cursor-pointer hover:shadow-soft-lg" : "hover:shadow-soft-lg"}`}
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
            <ContactButtons
              request={request}
              detailUrl={detailUrl}
              onEdit={onEdit}
              onDelete={onDelete}
              t={t}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );

  if (detailUrl) {
    return (
      <Link
        href={detailUrl}
        className="block"
        aria-label={request.title}
        style={{ cursor: "pointer" }}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
