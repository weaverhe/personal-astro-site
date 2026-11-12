import {handle} from "@astrojs/cloudflare/handler";

type HandleArgs = Parameters<typeof handle>;

const worker = {
  async fetch(request: HandleArgs[0], env: HandleArgs[1], ctx: HandleArgs[2]) {
    const {pathname} = new URL(request.url);

    return pathname.startsWith("/emails/") && !import.meta.env.DEV
      ? new Response("Not found", {status: 404})
      : (handle(request, env, ctx) as Promise<Response>);
  },
};

export default worker;
