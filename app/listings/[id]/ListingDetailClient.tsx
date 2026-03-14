"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Tag, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORY_ICONS } from "@/lib/categories";
import type { Listing } from "@/lib/types";

const placeholderImage =
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80";

function getImageUrls(listing: Listing): string[] {
  const urls =
    listing.photo_urls && listing.photo_urls.length > 0
      ? listing.photo_urls
      : listing.image_url
        ? [listing.image_url]
        : [];
  return urls.length > 0 ? urls : [placeholderImage];
}

export default function ListingDetailClient({ listing }: { listing: Listing }) {
  const { t } = useLocale();
  const imageUrls = getImageUrls(listing);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Icon = CATEGORY_ICONS[listing.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 min-w-0"
    >
      <div className="overflow-hidden rounded-card bg-white shadow-soft-lg">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/3] bg-slate-100 md:aspect-auto md:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative h-full w-full"
              >
                <Image
                  src={imageUrls[currentImageIndex]}
                  alt={`${listing.title} – ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized={
                    imageUrls[currentImageIndex].startsWith("data:") ||
                    !imageUrls[currentImageIndex].includes("unsplash")
                  }
                />
              </motion.div>
            </AnimatePresence>
            {imageUrls.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-soft hover:bg-white"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-700" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImageIndex((i) => (i === imageUrls.length - 1 ? 0 : i + 1))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-soft hover:bg-white"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5 text-slate-700" />
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {imageUrls.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentImageIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentImageIndex ? "w-6 bg-primary" : "w-2 bg-white/80"
                      }`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col p-8 md:p-10">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" />
              {t(`categories.${listing.category}`)}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-text">{listing.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-600">
              <MapPin className="h-5 w-5 shrink-0" />
              {listing.city}
            </p>
            <p className="mt-6 text-3xl font-bold text-primary">
              ${listing.price}
              <span className="text-lg font-normal text-slate-500">{t("spaces.perMonth")}</span>
            </p>
            {listing.description && (
              <div className="mt-6 flex-1">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {t("listingDetail.description")}
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-slate-700">{listing.description}</p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              {listing.contact_email && (
                <motion.a
                  href={`mailto:${listing.contact_email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-3 font-medium text-white shadow-soft hover:bg-blue-600"
                >
                  <Mail className="h-4 w-4" />
                  {t("listingDetail.contactByEmail")}
                </motion.a>
              )}
              {listing.contact_phone && (
                <motion.a
                  href={`tel:${listing.contact_phone}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white px-5 py-3 font-medium text-text hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4" />
                  {listing.contact_phone}
                </motion.a>
              )}
              {!listing.contact_email && !listing.contact_phone && (
                <p className="text-slate-500">{t("listingDetail.noContact")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/listings" className="text-primary font-medium hover:underline">
          ← {t("listingDetail.backToListings")}
        </Link>
      </div>
    </motion.div>
  );
}
