import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://cvnuruljannah.com",
  trailingSlash: "never",
  output: "static",
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: { enabled: true },
  }),
  integrations: [react()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "id", "ar", "ko", "zh", "ja"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  redirects: {
    "/en": "/",
    "/opengraph-image": "/opengraph-image.png",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
