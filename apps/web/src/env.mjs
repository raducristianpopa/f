import { z } from "zod";

const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().min(1),
});

const client = z.object({});

/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

const isServer = typeof window === "undefined";

const parsed = /** @type {MergedSafeParseReturn} */ (
  isServer ? merged.safeParse(processEnv) : client.safeParse(processEnv)
);

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
      throw new Error(
        process.env.NODE_ENV === "production"
          ? "❌ Attempted to access a server-side environment variable on the client"
          : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
      );
    return target[/** @type {keyof typeof target} */ (prop)];
  },
});

export { env };
