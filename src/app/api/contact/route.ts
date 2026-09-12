import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import {
  INQUIRY_TO,
  inquiryHtml,
  inquirySubject,
  inquiryText,
  parseInquiry,
  type ContactInquiry,
} from "@/lib/contact";

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
    await sendInquiryEmail(parsed.data);
  } catch (error) {
    console.error("contact inquiry email failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send inquiry" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function sendInquiryEmail(data: ContactInquiry) {
  const { env } = await getCloudflareContext({ async: true });

  await env.EMAIL.send({
    to: INQUIRY_TO,
    from: data.email,
    subject: inquirySubject(data),
    html: inquiryHtml(data),
    text: inquiryText(data),
  });
}
