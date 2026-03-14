"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabaseClient";
import { useLocale } from "@/context/LocaleContext";
import { CATEGORIES } from "@/lib/types";

export default function AddListingForm() {
  const router = useRouter();
  const { t } = useLocale();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "cars" as const,
    city: "",
    price: "",
    description: "",
    contact_email: "",
    contact_phone: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError(t("addSpace.mustLogin"));
      setLoading(false);
      return;
    }

    const photoUrls: string[] = [];
    for (const imageFile of imageFiles) {
      const ext = imageFile.name.split(".").pop() || "jpg";
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("listings")
        .upload(path, imageFile, { upsert: false });
      if (uploadError) {
        setError(t("addSpace.uploadFailed"));
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("listings").getPublicUrl(path);
      photoUrls.push(urlData.publicUrl);
    }

    const imageUrl = photoUrls[0] ?? null;

    const { error: insertError } = await supabase.from("listings").insert({
      title: form.title.trim(),
      category: form.category,
      city: form.city.trim(),
      price: Math.round(Number(form.price)) || 0,
      description: form.description.trim() || null,
      image_url: imageUrl,
      photo_urls: photoUrls.length > 0 ? photoUrls : null,
      contact_email: form.contact_email.trim() || null,
      contact_phone: form.contact_phone.trim() || null,
      user_id: user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
    setLoading(false);
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => [...prev, ...files].slice(0, 10));
  }

  function removeFile(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mt-8 rounded-card bg-white p-8 shadow-soft"
    >
      <h1 className="text-3xl font-bold text-text">{t("addSpace.title")}</h1>
      <p className="mt-2 text-slate-600">{t("addSpace.subtitle")}</p>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}
      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text">
            {t("addSpace.titleLabel")} *
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("addSpace.titlePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text">
            {t("addSpace.category")} *
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
          <label htmlFor="city" className="block text-sm font-medium text-text">
            {t("addSpace.city")} *
          </label>
          <input
            id="city"
            type="text"
            required
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("addSpace.cityPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-text">
            {t("addSpace.pricePerMonth")} *
          </label>
          <input
            id="price"
            type="number"
            required
            min="1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("addSpace.pricePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text">
            {t("addSpace.description")}
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder={t("addSpace.descriptionPlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text">
            {t("addSpace.photos")}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="mt-1 w-full text-sm text-slate-600 file:mr-4 file:rounded-button file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:hover:bg-blue-600"
          />
          {imageFiles.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {imageFiles.map((file, i) => (
                <li key={i} className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-sm">
                  <span className="truncate max-w-[120px]">{file.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-slate-500 hover:text-red-600">
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-1 text-xs text-slate-500">{t("addSpace.photosHint")}</p>
        </div>
        <div>
          <label htmlFor="contact_email" className="block text-sm font-medium text-text">
            {t("addSpace.contactEmail")}
          </label>
          <input
            id="contact_email"
            type="email"
            value={form.contact_email}
            onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-text focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="contact_phone" className="block text-sm font-medium text-text">
            {t("addSpace.contactPhone")}
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
      </div>
      <div className="mt-8">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-button bg-primary py-3 font-medium text-white shadow-soft hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? t("addSpace.saving") : t("addSpace.submit")}
        </motion.button>
      </div>
    </motion.form>
  );
}
