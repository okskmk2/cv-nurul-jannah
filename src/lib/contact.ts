import { products } from "@/data/products";

export const INQUIRY_TO = "export@cvnuruljannah.com";
export const INQUIRY_FROM = "noreply@cvnuruljannah.com";

export const IMPORT_HISTORY = ["none", "0_2", "3_5", "6_10", "10plus"] as const;
export const MATCHING = ["yes", "no"] as const;
export const CHALLENGES = [
  "partners",
  "market",
  "regs",
  "info",
  "labor",
  "fx",
] as const;
export const INDUSTRIES = [
  "import",
  "retail",
  "horeca",
  "distributor",
  "other",
] as const;
export const MARKETS = ["sea", "me", "eu", "other"] as const;
export const CERTIFICATIONS = ["organic", "halal", "pirt", "coa"] as const;

export type ImportHistory = (typeof IMPORT_HISTORY)[number];
export type Matching = (typeof MATCHING)[number];
export type Challenge = (typeof CHALLENGES)[number];
export type Industry = (typeof INDUSTRIES)[number];
export type Market = (typeof MARKETS)[number];
export type Certification = (typeof CERTIFICATIONS)[number];

const PRODUCT_SLUGS = new Set(products.map((product) => product.slug));

export type ContactInquiry = {
  company: string;
  email: string;
  contactInfo: string;
  contactPerson: string;
  industry: Industry;
  productSlugs: string[];
  markets: Market[];
  importHistory: ImportHistory;
  volume: string;
  certifications: Certification[];
  challenges: Challenge[];
  matching?: Matching;
  message: string;
  locale?: string;
  website?: string;
};

const IMPORT_LABELS: Record<ImportHistory, string> = {
  none: "None",
  "0_2": "0–2 years",
  "3_5": "3–5 years",
  "6_10": "6–10 years",
  "10plus": ">10 years",
};

const MATCHING_LABELS: Record<Matching, string> = {
  yes: "Yes, interested",
  no: "No",
};

const CHALLENGE_LABELS: Record<Challenge, string> = {
  partners: "Finding business partners / buyers",
  market: "Worsening import market conditions",
  regs: "Regulations / compliance",
  info: "Lack of market information",
  labor: "Labor shortage",
  fx: "Exchange-rate fluctuation",
};

const INDUSTRY_LABELS: Record<Industry, string> = {
  import: "Food import",
  retail: "Retail",
  horeca: "HORECA",
  distributor: "Distributor / wholesaler",
  other: "Other",
};

const MARKET_LABELS: Record<Market, string> = {
  sea: "Southeast Asia",
  me: "Middle East",
  eu: "Europe",
  other: "Other",
};

const CERT_LABELS: Record<Certification, string> = {
  organic: "Organic",
  halal: "Halal",
  pirt: "PIRT",
  coa: "COA",
};

function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 200;
}

function pickListed<T extends string>(
  value: unknown,
  allowed: readonly T[],
): T[] {
  const source = Array.isArray(value) ? value : [];
  const allowedSet = new Set<string>(allowed);
  const seen = new Set<T>();
  for (const item of source) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim();
    if (!allowedSet.has(trimmed) || seen.has(trimmed as T)) continue;
    seen.add(trimmed as T);
  }
  return [...seen];
}

export function resolveProductSlugs(value: unknown): string[] {
  const tokens = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const slugs: string[] = [];
  for (const token of tokens) {
    if (typeof token !== "string") continue;
    const raw = token.trim();
    if (!raw) continue;
    if (PRODUCT_SLUGS.has(raw)) {
      if (!slugs.includes(raw)) slugs.push(raw);
      continue;
    }
    const byName = products.find(
      (product) => product.name.en.toLowerCase() === raw.toLowerCase(),
    );
    if (byName && !slugs.includes(byName.slug)) slugs.push(byName.slug);
  }
  return slugs;
}

export function parseInquiry(
  input: unknown,
): { ok: true; data: ContactInquiry } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  const raw = input as Record<string, unknown>;
  const company = clip(raw.company, 200);
  const email = clip(raw.email, 200);
  const contactInfo = clip(raw.contactInfo, 200);
  const contactPerson = clip(raw.contactPerson ?? raw.tradePerson, 200);
  const industry = clip(raw.industry, 40);
  const importHistory = clip(raw.importHistory, 20);
  const matching = clip(raw.matching, 10);
  const volume = clip(raw.volume, 200);
  const message = clip(raw.message, 4000);
  const locale = clip(raw.locale, 8);
  const website = clip(raw.website, 200);
  const productSlugs = resolveProductSlugs(raw.productSlugs ?? raw.product);
  const markets = pickListed(raw.markets, MARKETS);
  const certifications = pickListed(raw.certifications, CERTIFICATIONS);
  const challenges = pickListed(raw.challenges, CHALLENGES).slice(0, 3);

  if (
    !company ||
    !email ||
    !contactInfo ||
    !contactPerson ||
    !industry ||
    !message
  ) {
    return { ok: false, error: "Missing required fields" };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }
  if (!(INDUSTRIES as readonly string[]).includes(industry)) {
    return { ok: false, error: "Invalid industry" };
  }
  if (!(IMPORT_HISTORY as readonly string[]).includes(importHistory)) {
    return { ok: false, error: "Invalid import history" };
  }
  if (matching && !(MATCHING as readonly string[]).includes(matching)) {
    return { ok: false, error: "Invalid matching value" };
  }
  if (productSlugs.length === 0) {
    return { ok: false, error: "Select at least one product" };
  }
  if (markets.length === 0) {
    return { ok: false, error: "Select at least one market" };
  }

  return {
    ok: true,
    data: {
      company,
      email,
      contactInfo,
      contactPerson,
      industry: industry as Industry,
      productSlugs,
      markets,
      importHistory: importHistory as ImportHistory,
      volume,
      certifications,
      challenges,
      matching: matching ? (matching as Matching) : undefined,
      message,
      locale: locale || undefined,
      website: website || undefined,
    },
  };
}

function productLabels(slugs: string[]): string {
  return slugs
    .map(
      (slug) =>
        products.find((product) => product.slug === slug)?.name.en ?? slug,
    )
    .join("; ");
}

export function inquirySubject(data: ContactInquiry): string {
  return `[Moringa] B2B quote request from ${data.company}`;
}

export function inquiryFields(data: ContactInquiry): Record<string, string> {
  const fields: Record<string, string> = {
    Company: data.company,
    "Contact person": data.contactPerson,
    Email: data.email,
    "Phone / WhatsApp": data.contactInfo,
    Industry: INDUSTRY_LABELS[data.industry],
    "Interested products": productLabels(data.productSlugs),
    "Target markets": data.markets.map((market) => MARKET_LABELS[market]).join("; "),
    "Import history with Indonesia": IMPORT_LABELS[data.importHistory],
    "Expected volume": data.volume || "(not provided)",
    Certifications:
      data.certifications.length > 0
        ? data.certifications.map((cert) => CERT_LABELS[cert]).join("; ")
        : "(not specified)",
    "Business matching": data.matching
      ? MATCHING_LABELS[data.matching]
      : "(not specified)",
    "Trade challenges":
      data.challenges.length > 0
        ? data.challenges.map((item) => CHALLENGE_LABELS[item]).join("; ")
        : "(not specified)",
    Message: data.message,
    Language: data.locale ?? "en",
  };
  return fields;
}

export function inquiryText(data: ContactInquiry): string {
  const fields = inquiryFields(data);
  const lines = Object.entries(fields).map(([key, value]) =>
    key === "Message" ? `${key}:\n${value}` : `${key}: ${value}`,
  );
  return `New B2B quote request for CV. Nurul Jannah / Moringa\n\n${lines.join("\n")}\n`;
}

export function inquiryHtml(data: ContactInquiry): string {
  const rows = Object.entries(inquiryFields(data))
    .map(
      ([key, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">${escapeHtml(key)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<p>New B2B quote request for CV. Nurul Jannah / Moringa</p><table>${rows}</table>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
