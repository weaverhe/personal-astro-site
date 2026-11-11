declare module "cloudflare:workers" {
  import type {D1Database} from "@cloudflare/workers-types";

  export const env: {
    NEWSLETTER_DB: D1Database;
  };
}
