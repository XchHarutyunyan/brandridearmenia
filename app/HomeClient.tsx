"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Layout, Car, Send, Target, Zap } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import ListingCard from "@/components/ListingCard";
import RequestCard from "@/components/RequestCard";
import Mascot from "@/components/Mascot";
import { CATEGORIES } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/categories";
import type { Listing, AdvertisingRequest } from "@/lib/types";

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Layout,
  Car,
  Send,
  Target,
  Zap,
};

export function StepCard({
  step,
  index,
}: {
  step: { iconName: string; title: string; description: string };
  index: number;
}) {
  const Icon = STEP_ICONS[step.iconName] ?? Sparkles;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-card bg-white p-5 sm:p-8 shadow-soft transition-shadow hover:shadow-soft-lg min-w-0"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-text">{step.title}</h3>
      <p className="mt-2 text-slate-600">{step.description}</p>
    </motion.div>
  );
}

export function CategoryCard({
  slug,
  label,
  index,
}: {
  slug: string;
  label: string;
  index: number;
}) {
  const Icon = CATEGORY_ICONS[slug as keyof typeof CATEGORY_ICONS];
  const Fallback = Sparkles;
  const I = Icon ?? Fallback;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="rounded-card bg-white p-4 sm:p-6 shadow-soft transition-shadow hover:shadow-soft-lg min-w-0"
    >
      <Link href={`/listings?category=${slug}`}>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <I className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-semibold text-text">{label}</h3>
      </Link>
    </motion.div>
  );
}

interface HomeContentProps {
  initialListings: Listing[];
  initialRequests: AdvertisingRequest[];
}

export default function HomeContent({ initialListings, initialRequests }: HomeContentProps) {
  const { t } = useLocale();

  const ownerSteps = [
    { iconName: "Sparkles", title: t("home.step1Title"), description: t("home.step1Desc") },
    { iconName: "Layout", title: t("home.step2Title"), description: t("home.step2Desc") },
    { iconName: "Car", title: t("home.step3Title"), description: t("home.step3Desc") },
  ];

  const advertiserSteps = [
    { iconName: "Send", title: t("home.advertiserStep1Title"), description: t("home.advertiserStep1Desc") },
    { iconName: "Target", title: t("home.advertiserStep2Title"), description: t("home.advertiserStep2Desc") },
    { iconName: "Zap", title: t("home.advertiserStep3Title"), description: t("home.advertiserStep3Desc") },
  ];

  return (
    <div className="relative">
      {/* Full-page animation: fixed so it stays visible behind all sections while scrolling */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <AnimatedBackground variant="fullPage" className="inset-0 min-h-screen w-full" />
      </div>
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-white/90 px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 md:pb-32 md:pt-24">
        {/* Hero-only intense layer — keeps current "wow" effect */}
        <AnimatedBackground variant="hero" className="z-0" />
        <div className="relative z-10 mx-auto max-w-7xl min-w-0">
          <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:gap-16">
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {t("home.heroTitle")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-slate-600 md:mx-0 mx-auto"
              >
                {t("home.heroSubtitle")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
              >
                <Link href="/listings" className="inline-block">
                  <motion.span
                    className="inline-block rounded-button bg-primary px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-white shadow-soft hover:bg-blue-600 hover:shadow-soft-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("home.browseSpaces")}
                  </motion.span>
                </Link>
                <Link href="/add-listing" className="inline-block">
                  <motion.span
                    className="inline-block rounded-button border border-slate-300 bg-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-text hover:border-primary hover:text-primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("home.addYourSpace")}
                  </motion.span>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex shrink-0 justify-center lg:justify-end w-full max-w-[180px] sm:max-w-[220px] mx-auto lg:mx-0"
            >
              <Mascot size={220} wave className="w-full max-w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-200/60 bg-secondary/85 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-text sm:text-3xl md:text-4xl"
          >
            {t("home.forSpaceOwners")}
          </motion.h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-center text-sm sm:text-base text-slate-600 px-1">
            {t("home.howItWorksSubtitle")}
          </p>
          <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
            {ownerSteps.map((step, i) => (
              <StepCard key={`owner-${i}`} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-200/60 bg-white/85 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-text sm:text-3xl md:text-4xl"
          >
            {t("home.forAdvertisers")}
          </motion.h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-center text-sm sm:text-base text-slate-600 px-1">
            {t("home.howItWorksSubtitle")}
          </p>
          <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
            {advertiserSteps.map((step, i) => (
              <StepCard key={`advertiser-${i}`} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-200/60 bg-secondary/85 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl min-w-0">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            {t("home.categories")}
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-center text-sm sm:text-base text-slate-600 px-1">
            {t("home.categoriesSubtitle")}
          </p>
          <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((slug, i) => (
              <CategoryCard
                key={slug}
                slug={slug}
                label={t(`categories.${slug}`)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-200/60 bg-white/85 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl min-w-0">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            {t("home.latestListings")}
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-center text-sm sm:text-base text-slate-600 px-1">
            {t("home.latestListingsSubtitle")}
          </p>
          {initialListings.length > 0 ? (
            <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
              {initialListings.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-10 sm:mt-16 rounded-card bg-white p-6 sm:p-12 text-center shadow-soft">
              <p className="text-sm sm:text-base text-slate-600">{t("home.noListings")}</p>
              <Link href="/add-listing" className="mt-4 inline-block rounded-button bg-primary px-5 py-2.5 text-white hover:bg-blue-600">
                {t("home.addListing")}
              </Link>
            </div>
          )}
          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/listings" className="text-primary font-medium hover:underline text-sm sm:text-base">
              {t("home.viewAllListings")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative border-b border-slate-200/60 bg-secondary/85 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl min-w-0">
          <h2 className="text-center text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            {t("home.latestRequests")}
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-center text-sm sm:text-base text-slate-600 px-1">
            {t("home.latestRequestsSubtitle")}
          </p>
          {initialRequests.length > 0 ? (
            <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
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
            <div className="mt-10 sm:mt-16 rounded-card bg-white p-6 sm:p-12 text-center shadow-soft">
              <p className="text-sm sm:text-base text-slate-600">{t("requests.noResults")}</p>
              <Link href="/post-request" className="mt-4 inline-block rounded-button bg-primary px-5 py-2.5 text-white hover:bg-blue-600">
                {t("postRequest.title")}
              </Link>
            </div>
          )}
          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/requests" className="text-primary font-medium hover:underline text-sm sm:text-base">
              {t("home.viewAllRequests")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-white/85 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center min-w-0">
          <h2 className="text-2xl font-bold text-text sm:text-3xl md:text-4xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 px-1">{t("home.ctaSubtitle")}</p>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/add-listing" className="inline-block">
              <motion.span
                className="inline-block rounded-button bg-primary px-5 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white shadow-soft hover:bg-blue-600 hover:shadow-soft-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("home.addYourSpace")}
              </motion.span>
            </Link>
            <Link href="/listings" className="inline-block">
              <motion.span
                className="inline-block rounded-button border border-slate-300 bg-white px-5 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-text hover:border-primary hover:text-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("home.browseSpaces")}
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
