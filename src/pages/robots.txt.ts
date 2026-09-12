import type { APIRoute } from "astro";
import { SITE_URL } from "@/lib/site";

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
