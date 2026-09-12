"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export function TrustPage() {
  const { t } = useLanguage();

  const certs = [
    { title: t("trust.cert.organic"), desc: t("trust.cert.organicDesc") },
    { title: t("trust.cert.halal"), desc: t("trust.cert.halalDesc") },
    { title: t("trust.cert.pirt"), desc: t("trust.cert.pirtDesc") },
    { title: t("trust.cert.coa"), desc: t("trust.cert.coaDesc") },
  ];

  const caps = [
    { title: t("trust.cap.1"), sub: t("trust.cap.1Sub") },
    { title: t("trust.cap.2"), sub: t("trust.cap.2Sub") },
    { title: t("trust.cap.3"), sub: t("trust.cap.3Sub") },
    { title: t("trust.cap.4"), sub: t("trust.cap.4Sub") },
  ];

  const tracks = [
    { title: t("trust.track.1"), sub: t("trust.track.1Sub") },
    { title: t("trust.track.2"), sub: t("trust.track.2Sub") },
    { title: t("trust.track.3"), sub: t("trust.track.3Sub") },
    { title: t("trust.track.4"), sub: t("trust.track.4Sub") },
  ];

  const originPoints = [
    t("trust.origin.1"),
    t("trust.origin.2"),
    t("trust.origin.3"),
    t("trust.origin.4"),
  ];

  const values = [
    { title: t("trust.value.1"), sub: t("trust.value.1Sub") },
    { title: t("trust.value.2"), sub: t("trust.value.2Sub") },
    { title: t("trust.value.3"), sub: t("trust.value.3Sub") },
    { title: t("trust.value.4"), sub: t("trust.value.4Sub") },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-brand-cream to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="text-3xl font-bold text-brand-forest md:text-4xl">
            {t("trust.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-brand-muted">{t("trust.subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <h2 className="mb-6 text-2xl font-bold text-brand-forest">
          {t("trust.certs")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-brand-sage/40 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15 text-brand-green font-bold">
                ✓
              </div>
              <h3 className="font-bold text-brand-forest">{c.title}</h3>
              <p className="mt-1 text-sm text-brand-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-cream/70">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
          <div className="min-h-[220px] rounded-3xl bg-gradient-to-br from-brand-green/90 to-brand-forest p-8 text-white shadow-md">
            <p className="text-sm uppercase tracking-widest text-brand-sage">
              {t("trust.originPanelLabel")}
            </p>
            <p className="mt-3 text-2xl font-bold">{t("trust.originPanelTitle")}</p>
            <p className="mt-2 text-sm text-white/80">
              {t("trust.originPanelSub")}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-forest">
              {t("trust.origin")}
            </h2>
            <p className="mt-3 text-brand-muted">{t("trust.originBody")}</p>
            <ul className="mt-5 space-y-2">
              {originPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-brand-forest"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <h2 className="mb-3 text-2xl font-bold text-brand-forest">
          {t("trust.mission")}
        </h2>
        <p className="mb-8 max-w-3xl text-brand-muted">{t("trust.missionBody")}</p>
        <h3 className="mb-4 text-lg font-bold text-brand-forest">
          {t("trust.values")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-brand-sage/40 bg-white p-5 shadow-sm"
            >
              <p className="font-bold text-brand-green">{v.title}</p>
              <p className="mt-1 text-sm text-brand-muted">{v.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <h2 className="mb-6 text-2xl font-bold text-brand-forest">
            {t("trust.capacity")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {caps.map((c) => (
              <div
                key={c.sub}
                className="rounded-2xl border border-brand-sage/40 bg-brand-cream/50 p-5 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-brand-green">{c.title}</p>
                <p className="mt-1 text-sm text-brand-muted">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream/50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-bold text-brand-forest">
            {t("trust.track")}
          </h2>
          <p className="mt-2 max-w-2xl text-brand-muted">{t("trust.trackBody")}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-5 border border-brand-sage/30 shadow-sm"
              >
                <h3 className="font-bold text-brand-forest">{item.title}</h3>
                <p className="mt-1 text-sm text-brand-muted">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-sage/25">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center md:px-6">
          <h2 className="text-2xl font-bold text-brand-forest md:text-3xl">
            {t("trust.docsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-muted">
            {t("trust.docsSub")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-forest"
            >
              {t("trust.docsCta")}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-brand-green bg-white px-5 py-3 text-sm font-semibold text-brand-green hover:bg-white/80"
            >
              {t("trust.catalogCta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
