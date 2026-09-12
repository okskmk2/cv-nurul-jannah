import { defineMiddleware } from "astro:middleware";
import { defaultLocale, localeFromPathname } from "@/i18n/routing";

const STATIC_EXT = /\.[a-z0-9]+$/i;

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

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
