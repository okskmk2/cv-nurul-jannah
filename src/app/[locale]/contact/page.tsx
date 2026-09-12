import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t(locale, "meta.contactTitle"),
    description: t(locale, "meta.contactDesc"),
  });
}

export default function Page() {
  return <ContactPage />;
}
