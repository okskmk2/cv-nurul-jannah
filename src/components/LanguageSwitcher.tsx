"use client";

import { locales, localeLabels, type Locale } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 text-sm font-medium ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((code, i) => (
        <span key={code} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-brand-muted/60">|</span>}
          <button
            type="button"
            onClick={() => setLocale(code as Locale)}
            className={`rounded px-1.5 py-0.5 transition ${
              locale === code
                ? "bg-brand-green text-white"
                : "text-brand-forest hover:bg-brand-sage/30"
            }`}
            aria-pressed={locale === code}
          >
            {localeLabels[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
