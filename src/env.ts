import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string({ required_error: "DATABASE_URL is required" }),
    GITHUB_ID: z.string({ required_error: "GITHUB_ID is required" }),
    GITHUB_SECRET: z.string({ required_error: "GITHUB_SECRET is required" }),
    NEXTAUTH_SECRET: z.string({
      required_error: "NEXTAUTH_SECRET is required",
    }),
  },
  client: {
    NEXT_PUBLIC_ENCRYPTION_KEY: z.string({
      required_error: "NEXT_PUBLIC_ENCRYPTION_KEY is required",
    }),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
  },
});
