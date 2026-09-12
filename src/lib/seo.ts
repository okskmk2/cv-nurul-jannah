import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionaries";
import { absoluteUrl, defaultLocale, locales } from "@/i18n/routing";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

function ogLocale(locale: Locale): string {
  switch (locale) {
    case "id":
      return "id_ID";
    case "ar":
      return "ar_AR";
    case "ko":
      return "ko_KR";
    default:
      return "en_US";
  }
}

export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl(path, defaultLocale),
  };
  for (const locale of locales) {
    languages[locale] = absoluteUrl(path, locale);
  }
  return languages;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image,
  imageAlt,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = absoluteUrl(path, locale);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/opengraph-image`;
  const ogImage = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: imageAlt ?? title,
    },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Moringga",
    url: SITE_URL,
    email: SITE_EMAIL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pakandangan Sangra, Bluto",
      addressLocality: "Sumenep",
      addressRegion: "Madura",
      addressCountry: "ID",
    },
    areaServed: ["Southeast Asia", "Middle East", "Europe"],
  };
}

export function productJsonLd({
  locale,
  slug,
  name,
  description,
  sku,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  sku: string;
}) {
  const path = `/products/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    image: `${SITE_URL}/products/${slug}.jpg`,
    url: absoluteUrl(path, locale),
    brand: { "@type": "Brand", "name": "Moringga" },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}


