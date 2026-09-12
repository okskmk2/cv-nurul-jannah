import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import { t } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({
    locale,
  }));
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
  if (!isLocale(raw) || raw === defaultLocale) notFound();

  return <SiteChrome locale={raw}>{children}</SiteChrome>;
}
