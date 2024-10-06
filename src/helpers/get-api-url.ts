import { env } from "@/env";

export const getAPIUrl = () => {
  return env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${env.VERCEL_URL}`;
};
