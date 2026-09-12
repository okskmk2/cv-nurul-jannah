import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { locales } from "@/i18n/dictionaries";
import { absoluteUrl, defaultLocale } from "@/i18n/routing";

const paths = ["/", "/products", "/trust", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            "x-default": absoluteUrl(path, defaultLocale),
            ...Object.fromEntries(
              locales.map((loc) => [loc, absoluteUrl(path, loc)]),
            ),
          },
        },
      });
    }
  }

  for (const product of products) {
    const path = `/products/${product.slug}`;
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            "x-default": absoluteUrl(path, defaultLocale),
            ...Object.fromEntries(
              locales.map((loc) => [loc, absoluteUrl(path, loc)]),
            ),
          },
        },
      });
    }
  }

  return entries;
}
