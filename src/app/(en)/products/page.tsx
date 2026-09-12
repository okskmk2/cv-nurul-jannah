import type { Metadata } from "next";
import { ProductsPage } from "@/components/ProductsPage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: defaultLocale,
  path: "/products",
  title: t(defaultLocale, "meta.productsTitle"),
  description: t(defaultLocale, "meta.productsDesc"),
});

export default function Page() {
  return <ProductsPage />;
}
