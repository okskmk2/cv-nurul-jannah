import { Check, Download, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { t, type Locale } from "@/i18n/dictionaries";
import {
  CERTIFICATIONS,
  CHALLENGES,
  INDUSTRIES,
  MARKETS,
  resolveProductSlugs,
  type Certification,
  type Challenge,
  type ImportHistory,
  type Industry,
  type Market,
  type Matching,
} from "@/lib/contact";
import { isPlaceholderWhatsApp } from "@/lib/site";

type FormState = {
  company: string;
  email: string;
  contactInfo: string;
  contactPerson: string;
  industry: Industry | "";
  productSlugs: string[];
  markets: Market[];
  importHistory: ImportHistory | "";
  volume: string;
  certifications: Certification[];
  challenges: Challenge[];
  matching: Matching | "";
  message: string;
  website: string;
};

const empty: FormState = {
  company: "",
  email: "",
  contactInfo: "",
  contactPerson: "",
  industry: "",
  productSlugs: [],
  markets: [],
  importHistory: "",
  volume: "",
  certifications: [],
  challenges: [],
  matching: "",
  message: "",
  website: "",
};

const importOptions: { value: Exclude<ImportHistory, "">; key: string }[] = [
  { value: "none", key: "contact.import.none" },
  { value: "0_2", key: "contact.import.0_2" },
  { value: "3_5", key: "contact.import.3_5" },
  { value: "6_10", key: "contact.import.6_10" },
  { value: "10plus", key: "contact.import.10plus" },
];

const industryKeys: Record<Industry, string> = {
  import: "contact.industry.import",
  retail: "contact.industry.retail",
  horeca: "contact.industry.horeca",
  distributor: "contact.industry.distributor",
  other: "contact.industry.other",
};

const marketKeys: Record<Market, string> = {
  sea: "home.market.sea",
  me: "home.market.me",
  eu: "home.market.eu",
  other: "contact.market.other",
};

const certKeys: Record<Certification, string> = {
  organic: "contact.cert.organic",
  halal: "contact.cert.halal",
  pirt: "contact.cert.pirt",
  coa: "contact.cert.coa",
};

const fieldClass =
  "w-full rounded-lg border border-brand-sage/50 bg-brand-cream/40 px-3 py-2.5 text-sm text-brand-forest outline-none ring-brand-green/40 placeholder:text-brand-muted focus:ring-2";

const chipClass = (active: boolean, disabled = false) =>
  `cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
    active
      ? "border-brand-green bg-brand-green text-white"
      : disabled
        ? "cursor-not-allowed border-brand-sage/30 text-brand-muted/60"
        : "border-brand-sage/50 bg-brand-cream/40 text-brand-forest hover:bg-brand-sage/20"
  }`;

function toggleItem<T>(list: T[], item: T, max?: number): T[] {
  if (list.includes(item)) return list.filter((value) => value !== item);
  if (max && list.length >= max) return list;
  return [...list, item];
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [form, setForm] = useState<FormState>(empty);
  const [matchingOpen, setMatchingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productHint = params.get("product");
    const matchingHint = params.get("matching");
    const slugs = productHint ? resolveProductSlugs(productHint) : [];
    setForm((prev) => ({
      ...prev,
      productSlugs: slugs.length ? slugs : prev.productSlugs,
      matching: matchingHint === "1" ? "yes" : prev.matching,
    }));
    if (matchingHint === "1") setMatchingOpen(true);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!form.industry || !form.importHistory) return;
    if (form.productSlugs.length === 0) {
      setFieldError(t(locale, "contact.errorProducts"));
      return;
    }
    if (form.markets.length === 0) {
      setFieldError(t(locale, "contact.errorMarkets"));
      return;
    }
    setFieldError(null);
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          matching: matchingOpen ? form.matching : "",
          challenges: matchingOpen ? form.challenges : [],
          locale,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean }
        | null;
      if (!res.ok || !data?.ok) {
        throw new Error("send failed");
      }
      setSubmitted(true);
    } catch {
      setError(t(locale, "contact.error"));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const whatsapp = t(locale, "common.whatsappValue");
    const showWhatsapp = !isPlaceholderWhatsApp(whatsapp);
    const waDigits = whatsapp.replace(/\D/g, "");
    return (
      <div className="rounded-2xl border border-brand-sage/50 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <Check className="h-7 w-7" strokeWidth={2.2} aria-hidden />
        </div>
        <h2 className="text-xl font-bold text-brand-forest">
          {t(locale, "contact.success")}
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          {t(locale, "contact.successSub")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {showWhatsapp && (
            <a
              href={`https://wa.me/${waDigits}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-forest"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t(locale, "contact.successWhatsapp")}
            </a>
          )}
          <a
            href="/catalog.pdf"
            download="CV-Nurul-Jannah-Moringa-Catalog.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-sage px-4 py-2 text-sm font-semibold text-brand-forest hover:bg-brand-sage/20"
          >
            <Download className="h-4 w-4" aria-hidden />
            {t(locale, "contact.downloadCatalog")}
          </a>
          <button
            type="button"
            className="rounded-lg border border-brand-sage px-4 py-2 text-sm font-semibold text-brand-forest hover:bg-brand-sage/20"
            onClick={() => {
              setSubmitted(false);
              setMatchingOpen(false);
              setForm(empty);
            }}
          >
            {t(locale, "contact.another")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={submitting}
      className="relative rounded-2xl border border-brand-sage/50 bg-white p-6 shadow-sm md:p-8"
    >
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => update("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t(locale, "contact.company")} *
            </span>
            <input
              required
              name="company"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder={t(locale, "contact.companyPh")}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t(locale, "contact.contactPerson")} *
            </span>
            <input
              required
              name="contactPerson"
              autoComplete="name"
              value={form.contactPerson}
              onChange={(e) => update("contactPerson", e.target.value)}
              placeholder={t(locale, "contact.contactPersonPh")}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t(locale, "contact.email")} *
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={t(locale, "contact.emailPh")}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t(locale, "contact.contactInfo")} *
            </span>
            <input
              required
              name="contactInfo"
              autoComplete="tel"
              value={form.contactInfo}
              onChange={(e) => update("contactInfo", e.target.value)}
              placeholder={t(locale, "contact.contactInfoPh")}
              className={fieldClass}
            />
          </label>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t(locale, "contact.industry")} *
          </legend>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((value) => (
              <label key={value} className={chipClass(form.industry === value)}>
                <input
                  type="radio"
                  name="industry"
                  className="sr-only"
                  required
                  checked={form.industry === value}
                  onChange={() => update("industry", value)}
                />
                {t(locale, industryKeys[value])}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t(locale, "contact.products")} *
          </legend>
          <p className="mb-2 text-xs text-brand-muted">
            {t(locale, "contact.productsHint")}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {products.map((product) => {
              const selected = form.productSlugs.includes(product.slug);
              return (
                <label
                  key={product.slug}
                  className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                    selected
                      ? "border-brand-green bg-brand-green/10 text-brand-forest"
                      : "border-brand-sage/50 bg-brand-cream/30 text-brand-forest hover:bg-brand-sage/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={selected}
                    onChange={() =>
                      update(
                        "productSlugs",
                        toggleItem(form.productSlugs, product.slug),
                      )
                    }
                  />
                  <span>
                    <span className="block font-medium">{product.name[locale]}</span>
                    <span className="block text-xs text-brand-muted">
                      {product.sku}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t(locale, "contact.markets")} *
          </legend>
          <div className="flex flex-wrap gap-2">
            {MARKETS.map((value) => {
              const selected = form.markets.includes(value);
              return (
                <label key={value} className={chipClass(selected)}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() =>
                      update("markets", toggleItem(form.markets, value))
                    }
                  />
                  {t(locale, marketKeys[value])}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t(locale, "contact.importHistory")} *
          </legend>
          <div className="flex flex-wrap gap-2">
            {importOptions.map((opt) => (
              <label
                key={opt.value}
                className={chipClass(form.importHistory === opt.value)}
              >
                <input
                  type="radio"
                  name="importHistory"
                  className="sr-only"
                  required
                  checked={form.importHistory === opt.value}
                  onChange={() => update("importHistory", opt.value)}
                />
                {t(locale, opt.key)}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-brand-forest">
            {t(locale, "contact.volume")}
          </span>
          <input
            name="volume"
            value={form.volume}
            onChange={(e) => update("volume", e.target.value)}
            placeholder={t(locale, "contact.volumePh")}
            className={fieldClass}
          />
        </label>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t(locale, "contact.certs")}
          </legend>
          <p className="mb-2 text-xs text-brand-muted">
            {t(locale, "contact.certsHint")}
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((value) => {
              const selected = form.certifications.includes(value);
              return (
                <label key={value} className={chipClass(selected)}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() =>
                      update(
                        "certifications",
                        toggleItem(form.certifications, value),
                      )
                    }
                  />
                  {t(locale, certKeys[value])}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-xl border border-brand-sage/40 bg-brand-cream/30">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-brand-forest"
            aria-expanded={matchingOpen}
            onClick={() => setMatchingOpen((open) => !open)}
          >
            <span>{t(locale, "contact.matchingToggle")}</span>
            <span aria-hidden className="text-brand-muted">
              {matchingOpen ? "−" : "+"}
            </span>
          </button>
          {matchingOpen && (
            <div className="space-y-4 border-t border-brand-sage/40 px-4 py-4">
              <p className="text-xs text-brand-muted">
                {t(locale, "contact.matchingHint")}
              </p>
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-brand-forest">
                  {t(locale, "contact.matching")}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "yes" as const, key: "contact.matching.yes" },
                      { value: "no" as const, key: "contact.matching.no" },
                    ] as const
                  ).map((opt) => (
                    <label
                      key={opt.value}
                      className={chipClass(form.matching === opt.value)}
                    >
                      <input
                        type="radio"
                        name="matching"
                        className="sr-only"
                        checked={form.matching === opt.value}
                        onChange={() => update("matching", opt.value)}
                      />
                      {t(locale, opt.key)}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-brand-forest">
                  {t(locale, "contact.challenges")}
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CHALLENGES.map((key) => {
                    const selected = form.challenges.includes(key);
                    const disabled = !selected && form.challenges.length >= 3;
                    return (
                      <label
                        key={key}
                        className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                          selected
                            ? "border-brand-green bg-brand-green/10 text-brand-forest"
                            : disabled
                              ? "cursor-not-allowed border-brand-sage/30 text-brand-muted/60"
                              : "cursor-pointer border-brand-sage/50 bg-white text-brand-forest hover:bg-brand-sage/15"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5"
                          checked={selected}
                          disabled={disabled}
                          onChange={() =>
                            update(
                              "challenges",
                              toggleItem(form.challenges, key, 3),
                            )
                          }
                        />
                        <span>{t(locale, `contact.challenge.${key}`)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-brand-forest">
            {t(locale, "contact.message")} *
          </span>
          <textarea
            required
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={t(locale, "contact.messagePh")}
            className={fieldClass}
          />
        </label>
      </div>
      {(fieldError || error) && (
        <p className="mt-4 text-sm font-medium text-red-700" role="alert">
          {fieldError || error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-forest disabled:cursor-not-allowed disabled:opacity-70"
      >
        {!submitting && <Send className="h-4 w-4" aria-hidden />}
        {submitting ? t(locale, "contact.sending") : t(locale, "contact.send")}
      </button>
    </form>
  );
}
