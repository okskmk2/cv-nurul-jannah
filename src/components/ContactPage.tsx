"use client";

import { Suspense } from "react";
import { ContactForm } from "./ContactForm";
import { useLanguage } from "@/i18n/LanguageContext";

export function ContactPage() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-brand-forest md:text-4xl">
          {t("contact.title")}
        </h1>
        <p className="mt-3 text-brand-muted">{t("contact.subtitle")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-2xl bg-brand-sage/20" />
          }
        >
          <ContactForm />
        </Suspense>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-brand-sage/50 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-brand-forest">
              {t("contact.direct")}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-brand-muted">{t("contact.email")}</dt>
                <dd>
                  <a
                    className="font-semibold text-brand-green hover:underline"
                    href={`mailto:${t("common.emailValue")}`}
                  >
                    {t("common.emailValue")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-brand-muted">
                  {t("contact.whatsapp")}
                </dt>
                <dd>
                  <a
                    className="font-semibold text-brand-green hover:underline"
                    href={`https://wa.me/${t("common.whatsappValue").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("common.whatsappValue")}
                  </a>
                </dd>
              </div>
            </dl>
            <a
              href="/catalog.pdf"
              download="CV-Nurul-Jannah-Moringga-Catalog.pdf"
              className="mt-6 block rounded-lg bg-brand-green py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-forest"
            >
              {t("contact.downloadCatalog")}
            </a>
          </div>

          <div className="rounded-2xl bg-brand-cream p-5 text-sm text-brand-forest border border-brand-sage/40">
            {t("contact.marketsBox")}
          </div>
        </aside>
      </div>
    </section>
  );
}
