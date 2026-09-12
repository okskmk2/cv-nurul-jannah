import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetail } from "@/components/ProductDetail";
import { getProductBySlug, productImagePath, products } from "@/data/products";
import { defaultLocale } from "@/i18n/routing";
import { buildPageMetadata, productJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = product.name[defaultLocale];
  const description = product.description[defaultLocale];
  return buildPageMetadata({
    locale: defaultLocale,
    path: `/products/${product.slug}`,
    title,
    description,
    image: productImagePath(product.slug),
    imageAlt: `${title} — Moringga kelor, CV. Nurul Jannah`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={productJsonLd({
          locale: defaultLocale,
          slug: product.slug,
          name: product.name[defaultLocale],
          description: product.description[defaultLocale],
          sku: product.sku,
        })}
      />
      <ProductDetail product={product} />
    </>
  );
}
