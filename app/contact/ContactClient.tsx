"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

export default function ContactClient() {
  const { t } = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl px-6 py-16"
    >
      <h1 className="text-3xl font-bold text-text">{t("contact.title")}</h1>
      <p className="mt-4 text-slate-600">
        {t("contact.text")}{" "}
        <a href="mailto:hello@brandridearmenia.com" className="text-primary hover:underline">
          hello@brandridearmenia.com
        </a>
        .
      </p>
    </motion.div>
  );
}
