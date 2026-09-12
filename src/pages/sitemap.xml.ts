import type { APIRoute } from "astro";
import { products } from "@/data/products";
import { locales } from "@/i18n/dictionaries";
import { absoluteUrl, defaultLocale } from "@/i18n/routing";

const paths = ["/", "/products", "/trust", "/contact"] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function hreflangLinks(path: string) {
  const links = [
    `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(path, defaultLocale))}"/>`,
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absoluteUrl(path, locale))}"/>`,
    ),
  ];
  return links.join("");
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString();
  const urls: string[] = [];

  for (const path of paths) {
    for (const locale of locales) {
      const loc = absoluteUrl(path, locale);
      const changefreq = path === "/" ? "weekly" : "monthly";
      const priority = path === "/" ? "1.0" : "0.8";
      urls.push(
        `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${hreflangLinks(path)}</url>`,
      );
    }
  }

  for (const product of products) {
    const path = `/products/${product.slug}`;
    for (const locale of locales) {
      const loc = absoluteUrl(path, locale);
      urls.push(
        `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority>${hreflangLinks(path)}</url>`,
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
