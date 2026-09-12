"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto bg-brand-forest text-brand-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
              NJ
            </span>
            <span>
              <span className="block font-bold">CV. Nurul Jannah</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-brand-sage">
                Moringga
              </span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-brand-cream/80">
            {t("brand.tagline")}
          </p>
          <p className="mt-2 max-w-xs text-xs text-brand-cream/70">
            {t("footer.origin")}
          </p>
          <p className="mt-1 max-w-xs text-xs text-brand-sage">
            {t("footer.whatsappNote")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
              {t("footer.links")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-white">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/trust" className="hover:text-white">
                  {t("nav.trust")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
              {t("footer.contact")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-cream/90">
              <li>
                <a href={`mailto:${t("common.emailValue")}`} className="hover:text-white">
                  {t("common.emailValue")}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${t("common.whatsappValue").replace(/\D/g, "")}`}
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("common.whatsappValue")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-sage">
            {t("footer.language")}
          </h3>
          <div className="mt-3">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-cream/60">
        © {new Date().getFullYear()} CV. Nurul Jannah · Moringga. All rights reserved.
      </div>
    </footer>
  );
}
