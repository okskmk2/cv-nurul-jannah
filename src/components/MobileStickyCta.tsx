"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { LocaleLink } from "./LocaleLink";

export function MobileStickyCta() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-sage/40 bg-brand-cream/95 p-3 backdrop-blur md:hidden">
      <LocaleLink
        href="/contact"
        className="block w-full rounded-lg bg-brand-green py-3 text-center text-sm font-semibold text-white shadow-md"
      >
        {t("cta.sticky")}
      </LocaleLink>
    </div>
  );
}
