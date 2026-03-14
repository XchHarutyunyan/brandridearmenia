"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabaseClient";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORIES } from "@/lib/types";

export default function PostRequestForm() {
  const router = useRouter();
  const { t } = useLocale();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    city: "",
    category: "cars" as const,
    budget: "",
    duration: "",
    description: "",
    contact_phone: "",
    contact_email: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const budgetNum = Math.round(Number(form.budget)) || 0;
    if (budgetNum <= 0) {
      setError("Budget must be greater than 0.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("advertising_requests").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      city: form.city.trim(),
      category: form.category,
      budget: budgetNum,
      duration: form.duration.trim() || null,
      contact_phone: form.contact_phone.trim() || null,
      contact_email: form.contact_email.trim() || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-card bg-white p-8 shadow-soft text-center"
      >
        <p className="text-slate-700">{t("postRequest.success")}</p>
        <button
          type="button"
          onClick={() => {
            setSuccess(false);
            setForm({
              title: "",
              city: "",
              category: "cars",
              budget: "",
              duration: "",
              description: "",
              contact_phone: "",
              contact_email: "",
            });
          }}
          className="mt-6 rounded-button bg-primary px-6 py-2.5 font-medium text-white hover:bg-blue-600"
        >
          {t("postRequest.submit")} (new)
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mt-8 rounded-card bg-white p-8 shadow-soft"
    >
      <h1 className="text-3xl font-bold text-text">{t("postRequest.title")}</h1>
      <p className="mt-2 text-slate-600">{t("postRequest.subtitle")}</p>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}
      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text">
            {t("postRequest.titleLabel")} *
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("postRequest.titlePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-text">
            {t("postRequest.city")} *
          </label>
          <input
            id="city"
            type="text"
            required
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Yerevan"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text">
            {t("postRequest.category")} *
          </label>
          <select
            id="category"
            required
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as typeof form.category }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t(`categories.${c}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-text">
            {t("postRequest.budget")} *
          </label>
          <input
            id="budget"
            type="number"
            required
            min="1"
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="500"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-text">
            {t("postRequest.duration")}
          </label>
          <input
            id="duration"
            type="text"
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("postRequest.durationPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text">
            {t("postRequest.description")}
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("postRequest.descriptionPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="contact_phone" className="block text-sm font-medium text-text">
            {t("postRequest.phone")}
          </label>
          <input
            id="contact_phone"
            type="tel"
            value={form.contact_phone}
            onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="+374 99 123456"
          />
        </div>
        <div>
          <label htmlFor="contact_email" className="block text-sm font-medium text-text">
            {t("postRequest.email")}
          </label>
          <input
            id="contact_email"
            type="email"
            value={form.contact_email}
            onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="contact@company.com"
          />
        </div>
      </div>
      <div className="mt-8">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-button bg-primary py-3 font-medium text-white shadow-soft hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? t("postRequest.saving") : t("postRequest.submit")}
        </motion.button>
      </div>
    </motion.form>
  );
}
