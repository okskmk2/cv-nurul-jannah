"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

type ImportHistory = "" | "none" | "0_2" | "3_5" | "6_10" | "10plus";
type Matching = "" | "yes" | "no";

type FormState = {
  company: string;
  address: string;
  email: string;
  contactInfo: string;
  tradePerson: string;
  industry: string;
  mainProducts: string;
  importHistory: ImportHistory;
  challenges: string[];
  matching: Matching;
  message: string;
};

const empty: FormState = {
  company: "",
  address: "",
  email: "",
  contactInfo: "",
  tradePerson: "",
  industry: "",
  mainProducts: "",
  importHistory: "",
  challenges: [],
  matching: "",
  message: "",
};

const challengeKeys = [
  "partners",
  "market",
  "regs",
  "info",
  "labor",
  "fx",
] as const;

const importOptions: { value: Exclude<ImportHistory, "">; key: string }[] = [
  { value: "none", key: "contact.import.none" },
  { value: "0_2", key: "contact.import.0_2" },
  { value: "3_5", key: "contact.import.3_5" },
  { value: "6_10", key: "contact.import.6_10" },
  { value: "10plus", key: "contact.import.10plus" },
];

const fieldClass =
  "w-full rounded-lg border border-brand-sage/50 bg-brand-cream/40 px-3 py-2.5 text-sm text-brand-forest outline-none ring-brand-green/40 placeholder:text-brand-muted focus:ring-2";

export function ContactForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const productHint = searchParams.get("product") ?? "";

  const initial = useMemo(
    () => ({
      ...empty,
      mainProducts: productHint,
      message: productHint
        ? `Interested in: ${productHint}`
        : "",
    }),
    [productHint],
  );

  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleChallenge(key: string) {
    setForm((prev) => {
      const has = prev.challenges.includes(key);
      if (has) {
        return { ...prev, challenges: prev.challenges.filter((c) => c !== key) };
      }
      if (prev.challenges.length >= 3) return prev;
      return { ...prev, challenges: [...prev.challenges, key] };
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.importHistory || !form.matching || form.challenges.length === 0) {
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-sage/50 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-brand-forest">{t("contact.success")}</h2>
        <p className="mt-2 text-sm text-brand-muted">{t("contact.successSub")}</p>
        <button
          type="button"
          className="mt-6 rounded-lg border border-brand-sage px-4 py-2 text-sm font-semibold text-brand-forest hover:bg-brand-sage/20"
          onClick={() => {
            setSubmitted(false);
            setForm(empty);
          }}
        >
          {t("contact.another")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-brand-sage/50 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-brand-forest">
            {t("contact.company")} *
          </span>
          <input
            required
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder={t("contact.companyPh")}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-brand-forest">
            {t("contact.address")}
          </span>
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder={t("contact.addressPh")}
            className={fieldClass}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t("contact.email")} *
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={t("contact.emailPh")}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t("contact.contactInfo")} *
            </span>
            <input
              required
              value={form.contactInfo}
              onChange={(e) => update("contactInfo", e.target.value)}
              placeholder={t("contact.contactInfoPh")}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-brand-forest">
            {t("contact.tradePerson")} *
          </span>
          <input
            required
            value={form.tradePerson}
            onChange={(e) => update("tradePerson", e.target.value)}
            placeholder={t("contact.tradePersonPh")}
            className={fieldClass}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t("contact.industry")} *
            </span>
            <input
              required
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
              placeholder={t("contact.industryPh")}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-forest">
              {t("contact.mainProducts")} *
            </span>
            <input
              required
              value={form.mainProducts}
              onChange={(e) => update("mainProducts", e.target.value)}
              placeholder={t("contact.mainProductsPh")}
              className={fieldClass}
            />
          </label>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t("contact.importHistory")} *
          </legend>
          <div className="flex flex-wrap gap-2">
            {importOptions.map((opt) => (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  form.importHistory === opt.value
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-brand-sage/50 bg-brand-cream/40 text-brand-forest hover:bg-brand-sage/20"
                }`}
              >
                <input
                  type="radio"
                  name="importHistory"
                  className="sr-only"
                  required
                  checked={form.importHistory === opt.value}
                  onChange={() => update("importHistory", opt.value)}
                />
                {t(opt.key)}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t("contact.challenges")} *
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {challengeKeys.map((key) => {
              const selected = form.challenges.includes(key);
              const disabled = !selected && form.challenges.length >= 3;
              return (
                <label
                  key={key}
                  className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                    selected
                      ? "border-brand-green bg-brand-green/10 text-brand-forest"
                      : disabled
                        ? "cursor-not-allowed border-brand-sage/30 text-brand-muted/60"
                        : "border-brand-sage/50 bg-brand-cream/30 text-brand-forest hover:bg-brand-sage/15"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={selected}
                    disabled={disabled}
                    onChange={() => toggleChallenge(key)}
                  />
                  <span>{t(`contact.challenge.${key}`)}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-brand-forest">
            {t("contact.matching")} *
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
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  form.matching === opt.value
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-brand-sage/50 bg-brand-cream/40 text-brand-forest hover:bg-brand-sage/20"
                }`}
              >
                <input
                  type="radio"
                  name="matching"
                  className="sr-only"
                  required
                  checked={form.matching === opt.value}
                  onChange={() => update("matching", opt.value)}
                />
                {t(opt.key)}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-brand-forest">
            {t("contact.message")} *
          </span>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={t("contact.messagePh")}
            className={fieldClass}
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-forest"
      >
        {t("contact.send")}
      </button>
    </form>
  );
}
