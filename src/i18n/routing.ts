import { SITE_URL } from "@/lib/site";
import { locales, type Locale } from "./dictionaries";

export { locales, type Locale };

export const defaultLocale: Locale = "en";

export const prefixedLocales = locales.filter(
  (locale): locale is Exclude<Locale, "en"> => locale !== defaultLocale,
);

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function pathnameWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function localizedPath(path: string, locale: Locale): string {
  const [rawPath, search] = path.split("?");
  const suffix = search ? `?${search}` : "";
  const normalized = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const fileName = normalized.split("/").pop() ?? "";
  if (fileName.includes(".") && !normalized.startsWith("/products/")) {
    return `${normalized}${suffix}`;
  }
  if (locale === defaultLocale) {
    return `${normalized}${suffix}`;
  }
  if (normalized === "/") {
    return `/${locale}${suffix}`;
  }
  return `/${locale}${normalized}${suffix}`;
}

export function absoluteUrl(
  path: string,
  locale: Locale = defaultLocale,
): string {
  const loc = localizedPath(path, locale);
  if (loc === "/") return SITE_URL;
  return `${SITE_URL}${loc}`;
}
