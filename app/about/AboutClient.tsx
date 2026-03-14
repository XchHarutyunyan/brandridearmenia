"use client";

import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";
import { useLocale } from "@/context/LocaleContext";

export default function AboutClient() {
  const { t } = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <Mascot size={140} wave />
        <div>
          <h1 className="text-3xl font-bold text-text">{t("about.title")}</h1>
          <p className="mt-4 text-slate-600">{t("about.intro")}</p>
        </div>
      </div>
      <p className="mt-8 text-slate-600">{t("about.belief")}</p>
    </motion.div>
  );
}
