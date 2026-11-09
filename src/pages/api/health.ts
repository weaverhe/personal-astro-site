import type {APIRoute} from "astro";

// eslint-disable-next-line unicorn/consistent-boolean-name -- needed for Astro
export const prerender = false;

export const GET: APIRoute = () => new Response("ok");
