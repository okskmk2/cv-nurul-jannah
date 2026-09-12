"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Locale, t as translate } from "./dictionaries";
import { localizedPath, pathnameWithoutLocale } from "./routing";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (next: Locale) => {
      const bare = pathnameWithoutLocale(pathname || "/");
      const search =
        typeof window !== "undefined" ? window.location.search : "";
      router.push(`${localizedPath(bare, next)}${search}`);
    },
    [pathname, router],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translate(locale, key),
      dir: locale === "ar" ? "rtl" : "ltr",
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}


