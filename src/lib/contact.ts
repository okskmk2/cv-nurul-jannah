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

export type ImportHistory = (typeof IMPORT_HISTORY)[number];
export type Matching = (typeof MATCHING)[number];
export type Challenge = (typeof CHALLENGES)[number];

export type ContactInquiry = {
  company: string;
  address: string;
  email: string;
  contactInfo: string;
  tradePerson: string;
  industry: string;
  mainProducts: string;
  importHistory: ImportHistory;
  challenges: Challenge[];
  matching: Matching;
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

function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 200;
}

export function parseInquiry(
  input: unknown,
): { ok: true; data: ContactInquiry } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  const raw = input as Record<string, unknown>;
  const company = clip(raw.company, 200);
  const address = clip(raw.address, 300);
  const email = clip(raw.email, 200);
  const contactInfo = clip(raw.contactInfo, 200);
  const tradePerson = clip(raw.tradePerson, 200);
  const industry = clip(raw.industry, 200);
  const mainProducts = clip(raw.mainProducts, 300);
  const importHistory = clip(raw.importHistory, 20);
  const matching = clip(raw.matching, 10);
  const message = clip(raw.message, 4000);
  const locale = clip(raw.locale, 8);
  const website = clip(raw.website, 200);

  const challenges = Array.isArray(raw.challenges)
    ? raw.challenges
        .filter((c): c is string => typeof c === "string")
        .map((c) => c.trim())
        .filter((c): c is Challenge =>
          (CHALLENGES as readonly string[]).includes(c),
        )
        .slice(0, 3)
    : [];

  if (
    !company ||
    !email ||
    !contactInfo ||
    !tradePerson ||
    !industry ||
    !mainProducts ||
    !message
  ) {
    return { ok: false, error: "Missing required fields" };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }
  if (!(IMPORT_HISTORY as readonly string[]).includes(importHistory)) {
    return { ok: false, error: "Invalid import history" };
  }
  if (!(MATCHING as readonly string[]).includes(matching)) {
    return { ok: false, error: "Invalid matching value" };
  }
  if (challenges.length === 0) {
    return { ok: false, error: "Select at least one challenge" };
  }

  return {
    ok: true,
    data: {
      company,
      address,
      email,
      contactInfo,
      tradePerson,
      industry,
      mainProducts,
      importHistory: importHistory as ImportHistory,
      challenges,
      matching: matching as Matching,
      message,
      locale: locale || undefined,
      website: website || undefined,
    },
  };
}

export function inquirySubject(data: ContactInquiry): string {
  return `[Moringga] B2B inquiry from ${data.company}`;
}

export function inquiryFields(data: ContactInquiry): Record<string, string> {
  return {
    Company: data.company,
    Address: data.address || "(not provided)",
    Email: data.email,
    "Phone / WhatsApp": data.contactInfo,
    "Trade contact": data.tradePerson,
    Industry: data.industry,
    "Main products": data.mainProducts,
    "Import history with Indonesia": IMPORT_LABELS[data.importHistory],
    "Trade challenges": data.challenges
      .map((c) => CHALLENGE_LABELS[c])
      .join("; "),
    "Business matching": MATCHING_LABELS[data.matching],
    Message: data.message,
    Language: data.locale ?? "en",
  };
}

export function inquiryText(data: ContactInquiry): string {
  const fields = inquiryFields(data);
  const lines = Object.entries(fields).map(([key, value]) =>
    key === "Message" ? `${key}:\n${value}` : `${key}: ${value}`,
  );
  return `New B2B inquiry for CV. Nurul Jannah / Moringga\n\n${lines.join("\n")}\n`;
}

export function inquiryHtml(data: ContactInquiry): string {
  const rows = Object.entries(inquiryFields(data))
    .map(
      ([key, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">${escapeHtml(key)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<p>New B2B inquiry for CV. Nurul Jannah / Moringga</p><table>${rows}</table>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
