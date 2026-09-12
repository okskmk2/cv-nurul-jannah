import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/ContactPage";
import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductsPage } from "@/components/ProductsPage";
import { SiteChrome } from "@/components/SiteChrome";
import { TrustPage } from "@/components/TrustPage";
import { getProductBySlug, productImagePath, products } from "@/data/products";
import { t, type Locale } from "@/i18n/dictionaries";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { buildPageMetadata, productJsonLd } from "@/lib/seo";

export function localeShellMetadata(locale: Locale): Metadata {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t(locale, "meta.homeTitle"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t(locale, "meta.homeDesc"),
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
}

export function LocaleShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <SiteChrome locale={locale}>{children}</SiteChrome>;
}

export function homeMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    path: "/",
    title: t(locale, "meta.homeTitle"),
    description: t(locale, "meta.homeDesc"),
    absoluteTitle: true,
  });
}

export function productsMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    path: "/products",
    title: t(locale, "meta.productsTitle"),
    description: t(locale, "meta.productsDesc"),
  });
}

export function trustMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    path: "/trust",
    title: t(locale, "meta.trustTitle"),
    description: t(locale, "meta.trustDesc"),
  });
}

export function contactMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t(locale, "meta.contactTitle"),
    description: t(locale, "meta.contactDesc"),
  });
}

export function Home() {
  return <HomePage />;
}

export function Products() {
  return <ProductsPage />;
}

export function Trust() {
  return <TrustPage />;
}

export function Contact() {
  return <ContactPage />;
}

export function productStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function productMetadata(
  locale: Locale,
  slug: string,
): Promise<Metadata> {
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

export function Product({ locale, slug }: { locale: Locale; slug: string }) {
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
