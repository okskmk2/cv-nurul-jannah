import { defineMiddleware } from "astro:middleware";
import { defaultLocale, localeFromPathname } from "@/i18n/routing";

const STATIC_EXT = /\.[a-z0-9]+$/i;

function moringgaAliasPath(pathname: string): string | null {
  const parts = pathname.split("/");
  const productsIdx = parts.indexOf("products");
  if (productsIdx === -1 || productsIdx >= parts.length - 1) return null;
  const segment = parts[productsIdx + 1];
  if (!segment?.startsWith("moringa-")) return null;
  parts[productsIdx + 1] = `moringga-${segment.slice("moringa-".length)}`;
  return parts.join("/") || "/";
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  const aliased = moringgaAliasPath(pathname);
  if (aliased) {
    return context.redirect(`${aliased}${context.url.search}`, 301);
  }

  if (
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/opengraph-image" ||
    pathname === "/opengraph-image.png" ||
    STATIC_EXT.test(pathname)
  ) {
    context.locals.locale = defaultLocale;
    return next();
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === defaultLocale) {
    const rest = parts.slice(1).join("/");
    return context.redirect(rest ? `/${rest}` : "/", 302);
  }

  context.locals.locale = localeFromPathname(pathname);
  return next();
});
