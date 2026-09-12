"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";

export function ProductCard({
  product,
  showMoq = false,
}: {
  product: Product;
  showMoq?: boolean;
}) {
  const { locale, t } = useLanguage();

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-sage/40 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-green/20 via-brand-sage/40 to-brand-cream">
        <div className="text-center px-4">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-brand-leaf shadow-sm">
            <LeafIcon />
          </div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-forest/70">
            {product.sku}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-brand-forest">
          {product.name[locale]}
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
        <div className="mt-auto pt-4">
          <Link
            href={`/contact?product=${encodeURIComponent(product.name.en)}`}
            className="block w-full rounded-lg bg-brand-green py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-forest"
          >
            {t("products.inquire")}
          </Link>
        </div>
      </div>
    </article>
  );
}

function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19c8-1 12-7 14-14-7 2-13 6-14 14Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M5 19c3-4 7-7 12-9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
