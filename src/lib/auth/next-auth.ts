import NextAuth, { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "@/env";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
