import {env} from "cloudflare:workers";
import {ActionError, defineAction} from "astro:actions";
import {z} from "astro/zod";
import {createPendingContact} from "../utils/newsletter.ts";
import {isTurnstileTokenValid} from "./verify-turnstile.ts";

export const newsletter = defineAction({
  accept: "form",
  input: z.object({
    name: z
      .string({error: "Please enter your name."})
      .trim()
      .min(1, "Please enter your name."),
    email: z.email({error: "Please enter a valid email."}),
    "cf-turnstile-response": z.string({
      error: "Please complete the verification.",
    }),
  }),
  async handler({name, email, "cf-turnstile-response": token}, context) {
    const isVerified = await isTurnstileTokenValid(
      token,
      context.request.headers.get("CF-Connecting-IP") ?? undefined,
    );

    if (!isVerified) {
      throw new ActionError({
        code: "FORBIDDEN",
        message: "Verification failed, please try again.",
      });
    }

    try {
      await createPendingContact(env.NEWSLETTER_DB, name, email);
    } catch (error) {
      console.error("Failed to create pending contact:", error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Sign up failed, please try again.",
      });
    }

    return {
      success: true,
    };
  },
});
