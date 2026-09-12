import type { Metadata } from "next";
import { ProductsPage } from "@/components/ProductsPage";
import { t } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/products",
    title: t(locale, "meta.productsTitle"),
    description: t(locale, "meta.productsDesc"),
  });
}

export default function Page() {
  return <ProductsPage />;
}
