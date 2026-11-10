const TURNSTILE_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let loading: Promise<void> | undefined;

export async function loadTurnstileScript() {
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_URL;
    script.addEventListener("load", () => {
      resolve();
    });

    script.addEventListener("error", () => {
      loading = undefined;
      reject(new Error("Failed to load Turnstile script"));
    });

    document.head.append(script);
  });

  return loading;
}
