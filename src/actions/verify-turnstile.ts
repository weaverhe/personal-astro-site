import {TURNSTILE_SECRET_KEY} from "astro:env/server";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  "error-codes": string[];
};

export const isTurnstileTokenValid = async (
  token: string,
  remoteIp?: string,
) => {
  const body = new FormData();
  body.append("secret", TURNSTILE_SECRET_KEY);
  body.append("response", token);

  if (remoteIp !== undefined) {
    body.append("remoteip", remoteIp);
  }

  const response = await fetch(SITEVERIFY_URL, {
    method: "POST",
    body,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as SiteverifyResponse;
  return result.success;
};
