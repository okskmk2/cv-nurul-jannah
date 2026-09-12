import { NextResponse } from "next/server";
import {
  INQUIRY_TO,
  inquiryHtml,
  inquirySubject,
  inquiryText,
  parseInquiry,
  type ContactInquiry,
} from "@/lib/contact";

export const runtime = "nodejs";

const hits = new Map<string, { count: number; started: number }>();

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const current = hits.get(ip);
  if (!current || now - current.started > windowMs) {
    hits.set(ip, { count: 1, started: now });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}

export async function POST(req: Request) {
  if (!allowRequest(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = parseInquiry(payload);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: parsed.error },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendInquiryEmail(parsed.data, siteOrigin(req));
  } catch (error) {
    console.error("contact inquiry email failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send inquiry" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

const SITE_ORIGIN = "https://cvnuruljannah.com";

function siteOrigin(req: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (host && !host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    const proto = req.headers.get("x-forwarded-proto") || "https";
    return `${proto}://${host}`;
  }

  return SITE_ORIGIN;
}

async function sendInquiryEmail(data: ContactInquiry, origin: string) {
  const to = process.env.INQUIRY_TO?.trim() || INQUIRY_TO;
  const subject = inquirySubject(data);
  const text = inquiryText(data);
  const html = inquiryHtml(data);

  if (process.env.RESEND_API_KEY) {
    await sendWithResend({ to, subject, text, html, replyTo: data.email });
    return;
  }

  await sendWithFormSubmit({ to, subject, data, text, origin });
}

async function sendWithResend({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo: string;
}) {
  const from =
    process.env.RESEND_FROM?.trim() ||
    "CV. Nurul Jannah <beth.t@example.com>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend failed (${res.status}): ${detail}`);
  }
}

async function sendWithFormSubmit({
  to,
  subject,
  data,
  text,
  origin,
}: {
  to: string;
  subject: string;
  data: ContactInquiry;
  text: string;
  origin: string;
}) {

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/contact`,
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      name: data.tradePerson || data.company,
      email: data.email,
      message: text,
      company: data.company,
      phone: data.contactInfo,
    }),
  });

  const body = (await res.json().catch(() => null)) as
    | { success?: boolean | string; message?: string }
    | null;

  const message = body?.message ?? "";
  const needsActivation = /activat/i.test(message);
  const success =
    body?.success === true ||
    body?.success === "true" ||
    needsActivation;

  if (!success) {
    throw new Error(message || `FormSubmit failed (${res.status})`);
  }
}
