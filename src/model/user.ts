import { prisma } from "@/lib/db/prisma";

const getUserByEmail = async (email?: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  return user;
};

export { getUserByEmail };
