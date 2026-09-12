"use client";

import { ProductFilters } from "./ProductFilters";
import { useLanguage } from "@/i18n/LanguageContext";

export function ProductsPage() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-forest md:text-4xl">
          {t("products.title")}
        </h1>
        <p className="mt-3 text-brand-muted">{t("products.subtitle")}</p>
      </div>
      <div className="rounded-3xl bg-brand-cream/40 p-4 md:p-6">
        <ProductFilters />
      </div>
    </section>
  );
}
