import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: defaultLocale,
  path: "/contact",
  title: t(defaultLocale, "meta.contactTitle"),
  description: t(defaultLocale, "meta.contactDesc"),
});

export default function Page() {
  return <ContactPage />;
}
