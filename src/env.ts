import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string({
      required_error: "NODE_ENV is required",
    }),
    VERCEL_URL: z.string({ required_error: "VERCEL_URL is required" }),
    AUTH_GITHUB_ID: z.string({ required_error: "AUTH_GITHUB_ID is required" }),
    AUTH_GITHUB_SECRET: z.string({
      required_error: "AUTH_GITHUB_SECRET is required",
    }),
    AUTH_GOOGLE_ID: z.string({ required_error: "AUTH_GOOGLE_ID is required" }),
    AUTH_GOOGLE_SECRET: z.string({
      required_error: "AUTH_GOOGLE_SECRET is required",
    }),
  },
  client: {
    NEXT_PUBLIC_ENCRYPTION_KEY: z.string({
      required_error: "NEXT_PUBLIC_ENCRYPTION_KEY is required",
    }),
    NEXT_PUBLIC_TURSO_DATABASE_URL: z.string({
      required_error: "NEXT_PUBLIC_TURSO_DATABASE_URL is required",
    }),
    NEXT_PUBLIC_TURSO_AUTH_TOKEN: z.string({
      required_error: "TURSO_AUTH_TOKEN is required",
    }),
  },
  runtimeEnv: {
    VERCEL_URL: process.env.VERCEL_URL,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
    NEXT_PUBLIC_TURSO_DATABASE_URL: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL,
    NEXT_PUBLIC_TURSO_AUTH_TOKEN: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
  },
});
