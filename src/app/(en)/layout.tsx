import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { t } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: t(defaultLocale, "meta.homeTitle"),
    template: `%s | ${SITE_NAME}`,
  },
  description: t(defaultLocale, "meta.homeDesc"),
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

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome locale={defaultLocale}>{children}</SiteChrome>;
}
