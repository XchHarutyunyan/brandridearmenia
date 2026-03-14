"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORY_ICONS } from "@/lib/categories";
import type { Listing } from "@/lib/types";

const placeholderImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80";

function getImageUrls(listing: Listing): string[] {
  const urls = listing.photo_urls && listing.photo_urls.length > 0
    ? listing.photo_urls
    : listing.image_url
      ? [listing.image_url]
      : [];
  return urls.length > 0 ? urls : [placeholderImage];
}

interface ListingCardProps {
  listing: Listing;
  index?: number;
  /** When set, show Edit/Delete buttons and do not wrap content in link */
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ListingCard({ listing, index = 0, onEdit, onDelete }: ListingCardProps) {
  const { t } = useLocale();
  const imageUrls = getImageUrls(listing);
  const imageUrl = imageUrls[0];
  const Icon = CATEGORY_ICONS[listing.category];
  const showActions = Boolean(onEdit || onDelete);

  const cardContent = (
    <div className="overflow-hidden rounded-card bg-white shadow-soft transition-shadow duration-300 group-hover:shadow-soft-lg min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageUrl.startsWith("data:") || !imageUrl.includes("unsplash")}
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-text shadow-soft">
          <Icon className="h-3 w-3" />
          {t(`categories.${listing.category}`)}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-text line-clamp-1 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
          <MapPin className="h-4 w-4 shrink-0" />
          {listing.city}
        </p>
        <p className="mt-3 text-lg font-semibold text-primary">
          ${listing.price}
          <span className="text-sm font-normal text-slate-500">{t("spaces.perMonth")}</span>
        </p>
        {showActions && (
          <div className="mt-4 flex gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
                className="inline-flex items-center gap-1.5 rounded-button border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-text hover:bg-slate-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                {t("common.edit")}
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
                className="inline-flex items-center gap-1.5 rounded-button border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t("common.delete")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group min-w-0"
    >
      {showActions ? (
        <div className="flex flex-col">
          <Link href={`/listings/${listing.id}`} className="block flex-1">
            {cardContent}
          </Link>
        </div>
      ) : (
        <Link href={`/listings/${listing.id}`}>{cardContent}</Link>
      )}
    </motion.article>
  );
}
