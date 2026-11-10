import {ActionError, defineAction} from "astro:actions";
import {z} from "astro/zod";
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

    console.log("Newsletter subscription:", {name, email});

    return {
      success: true,
      name,
      email,
    };
  },
});
