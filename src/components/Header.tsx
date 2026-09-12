"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const navKeys = [
  { href: "/", key: "nav.home" },
  { href: "/products", key: "nav.products" },
  { href: "/trust", key: "nav.trust" },
  { href: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-sage/40 bg-brand-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
            NJ
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-brand-forest sm:text-base">
              CV. Nurul Jannah
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-leaf sm:text-xs">
              Moringga
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navKeys.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active
                    ? "text-brand-green"
                    : "text-brand-forest/80 hover:text-brand-green"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-forest"
          >
            {t("nav.requestQuote")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-sage/50 text-brand-forest md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-brand-sage/40 bg-brand-cream px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {navKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-brand-forest hover:bg-brand-sage/20"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-brand-sage/30 pt-4">
            <LanguageSwitcher className="w-full [&_select]:w-full" />
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-brand-green px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
