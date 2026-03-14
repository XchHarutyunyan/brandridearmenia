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
      className="border-t border-slate-200 bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <p className="max-w-md text-center text-slate-600 md:text-left">
            BrandRideArmenia — {t("home.heroTitle")}
          </p>
          <ul className="flex items-center gap-8">
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
        <p className="mt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} BrandRideArmenia. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
