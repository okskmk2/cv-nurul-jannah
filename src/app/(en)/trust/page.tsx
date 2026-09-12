import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: defaultLocale,
  path: "/trust",
  title: t(defaultLocale, "meta.trustTitle"),
  description: t(defaultLocale, "meta.trustDesc"),
});

export default function Page() {
  return <TrustPage />;
}
