import NextAuth from "next-auth";
import authConfig from "@/lib/auth/auth.config";
import { Role } from "@/@types/role";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role as Role;
      return session;
    },
  },
});
