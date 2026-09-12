"use client";

import type { Product } from "@/data/products";
import { productImagePath } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";
import { LocaleLink } from "./LocaleLink";

export function ProductDetail({ product }: { product: Product }) {
  const { locale, t } = useLanguage();
  const name = product.name[locale];
  const alt = `${name} — Moringga kelor, CV. Nurul Jannah`;

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <p className="mb-6 text-sm">
        <LocaleLink
          href="/products"
          className="font-semibold text-brand-green hover:text-brand-forest"
        >
          ← {t("products.back")}
        </LocaleLink>
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-brand-sage/40 bg-brand-cream shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImagePath(product.slug)}
            alt={alt}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-leaf">
            {product.sku}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-forest md:text-4xl">
            {name}
          </h1>
          <p className="mt-4 text-base text-brand-muted">
            {product.description[locale]}
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-sage/40 bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                {t("products.form")}
              </dt>
              <dd className="mt-1 font-medium text-brand-forest">
                {product.form[locale]}
              </dd>
            </div>
            <div className="rounded-2xl border border-brand-sage/40 bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                {t("products.moq")}
              </dt>
              <dd className="mt-1 font-medium text-brand-forest">
                {product.moq}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <LocaleLink
              href={`/contact?product=${encodeURIComponent(product.name.en)}`}
              className="rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-forest"
            >
              {t("products.inquire")}
            </LocaleLink>
            <a
              href="/catalog.pdf"
              download="CV-Nurul-Jannah-Moringga-Catalog.pdf"
              className="rounded-lg border-2 border-brand-green bg-white px-5 py-3 text-sm font-semibold text-brand-green hover:bg-brand-sage/20"
            >
              {t("contact.downloadCatalog")}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
