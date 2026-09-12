import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductBySlug, productImagePath, products } from "@/data/products";
import { locales } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import { buildPageMetadata, productJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = product.name[locale];
  const description = product.description[locale];
  return buildPageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title,
    description,
    image: productImagePath(product.slug),
    imageAlt: `${title} — Moringga kelor, CV. Nurul Jannah`,
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={productJsonLd({
          locale,
          slug: product.slug,
          name: product.name[locale],
          description: product.description[locale],
          sku: product.sku,
        })}
      />
      <ProductDetail product={product} />
    </>
  );
}
