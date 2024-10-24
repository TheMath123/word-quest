import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { users, DUser } from "@/db/schema";

const getUserByEmail = async (email?: string): Promise<DUser | null> => {
  if (!email) return null;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0] || null;
};

export { getUserByEmail };
