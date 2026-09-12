import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: defaultLocale,
  path: "/",
  title: t(defaultLocale, "meta.homeTitle"),
  description: t(defaultLocale, "meta.homeDesc"),
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage />;
}
