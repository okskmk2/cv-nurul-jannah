import type { Locale } from "@/i18n/dictionaries";
import { absoluteUrl, defaultLocale, locales } from "@/i18n/routing";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export type PageSeo = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle: boolean;
  canonical: string;
  languages: Record<string, string>;
  ogLocale: string;
  image: string;
  imageAlt: string;
};

function ogLocale(locale: Locale): string {
  switch (locale) {
    case "id":
      return "id_ID";
    case "ar":
      return "ar_AR";
    case "ko":
      return "ko_KR";
    case "zh":
      return "zh_CN";
    case "ja":
      return "ja_JP";
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

export function buildPageSeo({
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
}): PageSeo {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/opengraph-image.png`;

  return {
    locale,
    path,
    title,
    description,
    absoluteTitle,
    canonical: absoluteUrl(path, locale),
    languages: languageAlternates(path),
    ogLocale: ogLocale(locale),
    image: imageUrl,
    imageAlt: imageAlt ?? title,
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
    brand: { "@type": "Brand", name: "Moringga" },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
