"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import hy from "@/locales/hy.json";

export type Locale = "en" | "ru" | "hy";

const messages: Record<Locale, Record<string, unknown>> = { en, ru, hy };

function get(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof document !== "undefined") {
      document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const value = get(messages[locale] as Record<string, unknown>, key);
      return value ?? key;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
