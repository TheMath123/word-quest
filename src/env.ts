import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_DATABASE_URL: z.string({
      required_error: "TURSO_DATABASE_URL is required",
    }),
    TURSO_AUTH_TOKEN: z.string({
      required_error: "TURSO_AUTH_TOKEN is required",
    }),
    AUTH_GITHUB_ID: z.string({ required_error: "AUTH_GITHUB_ID is required" }),
    AUTH_GITHUB_SECRET: z.string({
      required_error: "AUTH_GITHUB_SECRET is required",
    }),
    // NEXTAUTH_SECRET: z.string({
    //   required_error: "NEXTAUTH_SECRET is required",
    // }),
  },
  client: {
    NEXT_PUBLIC_ENCRYPTION_KEY: z.string({
      required_error: "NEXT_PUBLIC_ENCRYPTION_KEY is required",
    }),
  },
  runtimeEnv: {
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
  },
});
