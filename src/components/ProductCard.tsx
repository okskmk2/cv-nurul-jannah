"use client";

import type { Product } from "@/data/products";
import { productImagePath } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocaleLink } from "./LocaleLink";

export function ProductCard({
  product,
  showMoq = false,
}: {
  product: Product;
  showMoq?: boolean;
}) {
  const { locale, t } = useLanguage();
  const name = product.name[locale];
  const image = productImagePath(product.slug);
  const alt = `${name} — Moringga kelor, CV. Nurul Jannah`;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-sage/40 bg-white shadow-sm transition hover:shadow-md">
      <LocaleLink href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      </LocaleLink>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-brand-forest">
          <LocaleLink
            href={`/products/${product.slug}`}
            className="hover:text-brand-green"
          >
            {name}
          </LocaleLink>
        </h3>
        <p className="mt-1 text-xs text-brand-muted">
          {t("products.form")}: {product.form[locale]} · {t("products.sku")}:{" "}
          {product.sku}
        </p>
        {showMoq && (
          <p className="mt-2 text-sm font-medium text-brand-forest">
            {t("products.moq")}: {product.moq}
          </p>
        )}
        <div className="mt-auto flex gap-2 pt-4">
          <LocaleLink
            href={`/products/${product.slug}`}
            className="flex-1 rounded-lg border border-brand-green py-2.5 text-center text-sm font-semibold text-brand-green hover:bg-brand-sage/20"
          >
            {t("products.view")}
          </LocaleLink>
          <LocaleLink
            href={`/contact?product=${encodeURIComponent(product.name.en)}`}
            className="flex-1 rounded-lg bg-brand-green py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-forest"
          >
            {t("products.inquire")}
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}
