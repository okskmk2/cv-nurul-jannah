"use client";

import { LocaleLink } from "./LocaleLink";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useLanguage } from "@/i18n/LanguageContext";

export function HomePage() {
  const { t } = useLanguage();
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="bg-gradient-to-br from-brand-cream via-white to-brand-sage/25">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
              {t("hero.badge")}
            </p>
            <p className="mb-2 text-sm font-semibold text-brand-leaf">
              {t("brand.theme")}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-brand-forest sm:text-4xl lg:text-[2.6rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-xl text-base text-brand-muted md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink
                href="/products"
                className="rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-forest"
              >
                {t("hero.browse")}
              </LocaleLink>
              <LocaleLink
                href="/contact"
                className="rounded-lg border-2 border-brand-green bg-white px-5 py-3 text-sm font-semibold text-brand-green hover:bg-brand-sage/20"
              >
                {t("hero.quote")}
              </LocaleLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-brand-sage/40 bg-gradient-to-br from-brand-green to-brand-forest p-8 text-white shadow-lg min-h-[260px] flex flex-col justify-end">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute bottom-16 right-10 h-24 w-24 rounded-full bg-brand-sage/30" />
            <p className="relative text-sm font-medium uppercase tracking-widest text-brand-sage">
              {t("hero.panelLabel")}
            </p>
            <p className="relative mt-2 text-2xl font-bold">
              {t("hero.panelProducts")}
            </p>
            <p className="relative mt-2 text-sm text-white/80">
              {t("hero.panelTrust")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-sage/30 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 px-4 py-6 md:gap-4 md:px-6">
          {[
            t("trust.organic"),
            t("trust.halal"),
            t("trust.pirt"),
            t("trust.zerowaste"),
          ].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-brand-sage/50 bg-brand-cream px-4 py-2 text-sm font-semibold text-brand-forest"
            >
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-brand-earth/30 bg-gradient-to-r from-brand-leaf/10 via-brand-cream to-brand-earth/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-earth">
              {t("expo.badge")}
            </p>
            <h2 className="mt-1 text-xl font-bold text-brand-forest md:text-2xl">
              {t("expo.title")}
            </h2>
            <p className="mt-1 text-sm font-medium text-brand-green">
              {t("expo.dates")}
            </p>
            <p className="mt-2 max-w-2xl text-sm text-brand-muted">
              {t("expo.body")}
            </p>
          </div>
          <LocaleLink
            href="/contact"
            className="shrink-0 rounded-lg bg-brand-forest px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-green"
          >
            {t("expo.cta")}
          </LocaleLink>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-brand-forest md:text-3xl">
              {t("home.featured")}
            </h2>
            <p className="mt-2 text-brand-muted">{t("home.featuredSub")}</p>
          </div>
          <LocaleLink
            href="/products"
            className="text-sm font-semibold text-brand-green hover:text-brand-forest"
          >
            {t("home.viewAll")} →
          </LocaleLink>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-brand-cream/80">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <h2 className="mb-8 text-2xl font-bold text-brand-forest md:text-3xl">
            {t("home.markets")}
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: t("home.market.sea"), sub: t("home.market.seaSub") },
              { title: t("home.market.me"), sub: t("home.market.meSub") },
              { title: t("home.market.eu"), sub: t("home.market.euSub") },
            ].map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-brand-sage/40 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-brand-forest">{m.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
