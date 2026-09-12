# CV. Nurul Jannah — Moringga (Kelor / Moringa)

Astro site for **CV. Nurul Jannah**, Madura MSME producing **Moringga** kelor foods from Sumenep (Pakandangan Sangra, Bluto). Theme: *Sehat Dengan Keajaiban Kelor* / *Healthy With the Magic of Kelor*.

## Stack

- Astro (static HTML) + React islands (header, language switcher, contact form)
- TypeScript
- Tailwind CSS v4
- `src/` directory with `@/*` path alias
- i18n: EN (default, no prefix), ID, AR, KO
- Cloudflare Workers via `@astrojs/cloudflare`

## Brand colors (Laporan Keberlanjutan 2023 cover)

| Token | Hex | Use |
|-------|-----|-----|
| `--background` / `--brand-cream` | `#F7F3E3` | Page cream |
| `--brand-green` | `#2F8F45` | Primary CTAs |
| `--brand-forest` | `#1B4D2E` | Headings / footer |
| `--brand-sage` | `#A8C99A` | Accents |
| `--brand-leaf` | `#3D9B4A` | Bright leaf accents |
| `--brand-earth` | `#C4A35A` | Warm wood/cream accent |
| `--brand-muted` | `#4F6356` | Secondary text |
| `--foreground` | `#1B4D2E` | Body text |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — Moringga hero, Organic·Halal·PIRT·Zero Waste, Trade Expo 2026 band, 6 products, markets |
| `/products` | Catalog — 6 kelor foods |
| `/trust` | Certs, Madura origin, Zero Waste, vision/mission/values, B2B highlights |
| `/contact` | Trade questionnaire-aligned B2B form + WhatsApp contact |
| `/api/contact` | POST — Cloudflare Email Sending |

Other locales: `/id`, `/ko`, `/ar` plus the same paths.

## Products (Moringga)

1. Moringa Coffee / Kopi Kelor
2. Moringa Tea / Teh Kelor
3. Moringa Crackers / Krupuk Kelor
4. Moringa Powder / Powder Kelor
5. Moringa Noodle / Mie Kelor
6. Moringa Stick / Stick Kelor

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```bash
npm run build     # Astro + Cloudflare Worker
npm run preview   # wrangler dev after build
npm run deploy    # build and deploy to Cloudflare Workers
npm run lint      # astro check
```

## Deploy (Cloudflare Workers)

| Setting | Value |
| --- | --- |
| Build command | `npm run build` (`astro build`) |
| Deploy command | `npx wrangler deploy` |

Do not use `next build` or OpenNext. Wrangler `main` is `dist/_worker.js`.

Keep the Worker `send_email` binding named `EMAIL`.

The Cloudflare adapter also expects a KV binding named `SESSION` (sessions are unused). First `wrangler deploy` can auto-provision it; if the dashboard asks, create an empty KV namespace and bind it as `SESSION`.

## SEO / Search Console

English URLs have no prefix (`/products`). Other locales: `/id`, `/ko`, `/ar`.

1. In [Google Search Console](https://search.google.com/search-console), add the property `https://cvnuruljannah.com`.
2. Choose **HTML tag** verification. Put the content token in Cloudflare **Build variables** and **Worker variables** as `PUBLIC_GOOGLE_SITE_VERIFICATION` (legacy `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is still read as a fallback).
3. After deploy, submit `https://cvnuruljannah.com/sitemap.xml`.
4. Request indexing for `/`, `/products`, `/trust`, and `/contact`.
