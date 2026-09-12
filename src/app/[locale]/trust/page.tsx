import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/trust",
    title: t(locale, "meta.trustTitle"),
    description: t(locale, "meta.trustDesc"),
  });
}

export default function Page() {
  return <TrustPage />;
}
