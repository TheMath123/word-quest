import withAuth from "next-auth/middleware";
import { authOptions } from "@/lib/auth/next-auth";

export default withAuth({
  jwt: { decode: authOptions.jwt?.decode },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next|.next|favicon.ico).*)"],
};
