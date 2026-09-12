"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/i18n/dictionaries";
import { LanguageProvider } from "@/i18n/LanguageContext";

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LanguageProvider locale={locale}>{children}</LanguageProvider>;
}
