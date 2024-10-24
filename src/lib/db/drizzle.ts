import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env";

const turso = createClient({
  url: env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
  authToken: env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);
