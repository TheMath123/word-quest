import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GITHUB_ID: z.string({ required_error: "GITHUB_ID is required" }),
    GITHUB_SECRET: z.string({ required_error: "GITHUB_SECRET is required" }),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(["development", "production"])
      .default("development"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  },
});
