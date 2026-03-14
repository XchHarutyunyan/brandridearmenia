"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, LogIn, LogOut, Globe } from "lucide-react";
import Mascot from "@/components/Mascot";
import { createClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/context/LocaleContext";

const publicNavLinks: { href: string; key: string }[] = [
  { href: "/listings", key: "nav.spaces" },
  { href: "/requests", key: "nav.requests" },
];

const protectedNavLinks: { href: string; key: string }[] = [
  { href: "/add-listing", key: "nav.addSpace" },
  { href: "/post-request", key: "nav.postRequest" },
];

const PROTECTED_PATHS = ["/dashboard", "/add-listing", "/post-request"] as const;
function isProtectedPath(pathname: string): boolean {
  if (PROTECTED_PATHS.some((p) => pathname === p)) return true;
  if (pathname.startsWith("/edit-listing/") || pathname.startsWith("/edit-request/")) return true;
  return false;
}

const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  hy: "HY",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale, setLocale } = useLocale();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [localeOpen, setLocaleOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  async function handleSignOut() {
    const wasOnProtectedPage = isProtectedPath(pathname);
    await supabase.auth.signOut();
    if (wasOnProtectedPage) router.push("/");
  }

  const nextLocale = locale === "en" ? "ru" : locale === "ru" ? "hy" : "en";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-soft"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text hover:text-primary transition-colors rounded"
          aria-label="Brand Ride Armenia — Home"
        >
          <Mascot size={48} className="shrink-0" />
          <span className="text-xl font-semibold tracking-tight">Brand Ride Armenia</span>
        </Link>
        <ul className="hidden md:flex items-center gap-6">
          {publicNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-primary" : "text-slate-600 hover:text-text"
                }`}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
          {user &&
            protectedNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ? "text-primary" : "text-slate-600 hover:text-text"
                  }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLocaleOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-button border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              aria-label="Language"
            >
              <Globe className="h-4 w-4" />
              {localeLabels[locale]}
            </button>
            {localeOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLocaleOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full z-20 mt-1 rounded-card border border-slate-200 bg-white py-1 shadow-soft"
                >
                  {(["en", "ru", "hy"] as Locale[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLocale(l);
                        setLocaleOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        locale === l ? "bg-primary/10 text-primary font-medium" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {localeLabels[l]}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-button bg-secondary px-4 py-2 text-sm font-medium text-text hover:bg-slate-200/80 transition-colors"
              >
                <User className="h-4 w-4" />
                {t("nav.dashboard")}
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-button border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t("nav.signOut")}
              </motion.button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-button border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                {t("nav.login")}
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-button bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors shadow-soft"
              >
                {t("nav.register")}
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
