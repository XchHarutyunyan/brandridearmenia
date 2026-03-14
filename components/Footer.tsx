"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const footerLinks = [
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
  { href: "/privacy", key: "nav.privacy" },
];

export default function Footer() {
  const { t } = useLocale();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-slate-200 bg-white py-10 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-0">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
          <p className="max-w-md text-center text-sm sm:text-base text-slate-600 md:text-left px-1">
            Brand Ride Armenia — {t("home.heroTitle")}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-400 px-2">
          © {new Date().getFullYear()} Brand Ride Armenia. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
