import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// `npm run build` is `opennextjs-cloudflare build` (needed by Workers Builds).
// Override the inner Next.js command so OpenNext does not recurse into itself.
export default {
  ...defineCloudflareConfig(),
  buildCommand: "npx next build",
};
