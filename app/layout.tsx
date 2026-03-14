import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/context/LocaleContext";
import type { Locale } from "@/context/LocaleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrandRideArmenia — Advertising Spaces Marketplace",
  description:
    "Turn cars and spaces into advertising opportunities. Connect with real-world advertising spaces in Armenia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) ?? "en";

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-secondary`}>
        <LocaleProvider initialLocale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
