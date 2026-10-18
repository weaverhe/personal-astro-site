import {defineCollection} from "astro:content";
import {glob} from "astro/loaders";
import {z} from "astro/zod";

const content = defineCollection({
  loader: glob({
    base: "./src/collections/content",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    title: z.string(),
  }),
});

const workbench = defineCollection({
  loader: glob({
    base: "./src/collections/workbench",
    pattern: "**/*.mdx",
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {content, workbench};
