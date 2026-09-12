import type { APIRoute } from "astro";
import {
  INQUIRY_FROM,
  INQUIRY_TO,
  inquiryHtml,
  inquirySubject,
  inquiryText,
  parseInquiry,
  type ContactInquiry,
} from "@/lib/contact";

export const prerender = false;

const hits = new Map<string, { count: number; started: number }>();

function clientIp(request: Request, fallback: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || fallback;
  return request.headers.get("x-real-ip") || fallback;
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

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  if (!allowRequest(clientIp(request, clientAddress))) {
    return json({ ok: false, error: "Too many requests" }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const parsed = parseInquiry(payload);
  if (!parsed.ok) {
    return json({ ok: false, error: parsed.error }, 400);
  }

  if (parsed.data.website) {
    return json({ ok: true });
  }

  try {
    await sendInquiryEmail(locals, parsed.data);
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : undefined;
    console.error("contact inquiry email failed", code, error);
    return json({ ok: false, error: "Failed to send inquiry", code }, 502);
  }

  return json({ ok: true });
};

async function sendInquiryEmail(
  locals: App.Locals,
  data: ContactInquiry,
) {
  const email = locals.runtime?.env?.EMAIL;
  if (!email) {
    throw new Error("EMAIL binding is not configured");
  }

  await email.send({
    to: INQUIRY_TO,
    from: { email: INQUIRY_FROM, name: "CV. Nurul Jannah" },
    replyTo: { email: data.email, name: data.company },
    subject: inquirySubject(data),
    html: inquiryHtml(data),
    text: inquiryText(data),
  });
}
