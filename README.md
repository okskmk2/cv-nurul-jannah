# CV. Nurul Jannah — Moringga (Kelor / Moringa)

Next.js 16 (App Router) site for **CV. Nurul Jannah**, Madura MSME producing **Moringga** kelor foods from Sumenep (Pakandangan Sangra, Bluto). Theme: *Sehat Dengan Keajaiban Kelor* / *Healthy With the Magic of Kelor*.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"`)
- `src/` directory with `@/*` path alias
- Client-side i18n: EN (default), ID, AR (light stub)

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
| `/products` | Catalog — 6 kelor foods (All filter) |
| `/trust` | Certs, Madura origin, Zero Waste, vision/mission/values, B2B highlights |
| `/contact` | Trade questionnaire-aligned B2B form + WhatsApp contact |

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

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build     # OpenNext / Cloudflare Worker build
npm run preview   # serve the Worker locally (workerd)
npm run deploy    # build and deploy to Cloudflare Workers
npm run lint      # ESLint
```

## Deploy (Cloudflare Workers)

This app deploys with `@opennextjs/cloudflare`. In Workers Builds:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` (runs `opennextjs-cloudflare build`) |
| Deploy command | `npx wrangler deploy` or `npx opennextjs-cloudflare deploy` |

Do not use `next build` as the CI build command. Wrangler then looks for `.open-next/.build/open-next.config.edge.mjs` and fails with *Could not find compiled Open Next config*.

## SEO / Search Console

English URLs have no prefix (`/products`). Other locales: `/id`, `/ko`, `/ar`.

1. In [Google Search Console](https://search.google.com/search-console), add the property `https://cvnuruljannah.com`.
2. Choose **HTML tag** verification. Put the content token in Cloudflare **Build variables** and **Worker variables** as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. After deploy, submit `https://cvnuruljannah.com/sitemap.xml`.
4. Request indexing for `/`, `/products`, `/trust`, and `/contact`.
