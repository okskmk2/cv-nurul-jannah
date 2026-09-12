import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/routing";

const STATIC_EXT = /\.[a-z0-9]+$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    STATIC_EXT.test(pathname)
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    const rest = parts.slice(1).join("/");
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url);
  }

  if (isLocale(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
