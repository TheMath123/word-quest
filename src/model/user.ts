import { prisma } from "@/lib/db/prisma";

const getUserByEmail = async (email?: string) => {
  return prisma.user.findUnique({
    where: { email: email },
  });
};

export { getUserByEmail };
