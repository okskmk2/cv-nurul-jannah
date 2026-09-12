"use client";

import { useMemo, useState } from "react";
import {
  categoryLabels,
  getProductsByCategory,
  type ProductCategory,
} from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useLanguage } from "@/i18n/LanguageContext";

type Filter = ProductCategory | "all";

const filters: Filter[] = ["all"];

export function ProductFilters() {
  const { locale, t } = useLanguage();
  const [active, setActive] = useState<Filter>("all");

  const list = useMemo(() => getProductsByCategory(active), [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === f
                ? "bg-brand-green text-white shadow-sm"
                : "border border-brand-sage/50 bg-white text-brand-forest hover:bg-brand-sage/20"
            }`}
          >
            {categoryLabels[f][locale]}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {list.length === 0 ? (
          <p className="text-brand-muted">{t("products.empty")}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} showMoq />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
