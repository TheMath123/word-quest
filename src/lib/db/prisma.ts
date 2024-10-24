import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env";

const libsql = createClient({
  url: `${env.NEXT_PUBLIC_TURSO_DATABASE_URL}`,
  authToken: `${env.NEXT_PUBLIC_TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
// const prisma = new PrismaClient({ adapter });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
