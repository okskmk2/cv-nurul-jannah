"use client";

import { useId } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageContext";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function LanguageSwitcher({
  className = "",
  variant = "light",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const selectId = useId();

  const isDark = variant === "dark";

  return (
    <div className={`relative inline-flex ${className}`}>
      <label htmlFor={selectId} className="sr-only">
        Language
      </label>
      <select
        id={selectId}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className={`appearance-none cursor-pointer rounded-lg border py-2 pl-3 pr-9 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 min-w-[8.5rem] ${
          isDark
            ? "border-white/20 bg-white/10 text-brand-cream hover:border-brand-sage focus:border-brand-sage focus:ring-brand-sage/40"
            : "border-brand-sage/50 bg-white text-brand-forest hover:border-brand-green focus:border-brand-green focus:ring-brand-green/30"
        }`}
        aria-label="Language"
      >
        {locales.map((code) => (
          <option key={code} value={code} className="text-brand-forest bg-white">
            {localeLabels[code]}
          </option>
        ))}
      </select>
      <span
        className={`pointer-events-none absolute inset-y-0 right-2.5 flex items-center ${
          isDark ? "text-brand-sage" : "text-brand-muted"
        }`}
        aria-hidden
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 7.5 10 12.5 15 7.5" />
        </svg>
      </span>
    </div>
  );
}
