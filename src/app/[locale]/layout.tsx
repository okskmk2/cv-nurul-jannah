import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Providers } from "@/components/Providers";
import { t } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t(locale, "meta.homeTitle"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t(locale, "meta.homeDesc"),
    keywords: [
      "moringa",
      "kelor",
      "Moringga",
      "CV Nurul Jannah",
      "Sumenep",
      "Madura",
      "B2B export",
      "halal organic PIRT",
    ],
    icons: {
      icon: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
      apple: [{ url: "/logo.png", type: "image/png", sizes: "180x180" }],
      shortcut: "/logo.png",
    },
    twitter: {
      card: "summary_large_image",
    },
    ...(google ? { verification: { google } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased pb-20 md:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <Providers locale={locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyCta />
        </Providers>
      </body>
    </html>
  );
}
