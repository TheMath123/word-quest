import { auth as middleware } from "@/lib/auth";
import { Role } from "./@types/role";

const authRoutes = ["/login", "/register"];
const adminRoutes = ["/dashboard"];

export default middleware((req) => {
  const initialUrl = new URL("/", req.url);
  const pathname = req.nextUrl.pathname;
  const session = req.auth;
  const isAdmin = session && session.user.role === Role.ADMIN;

  if (authRoutes.includes(pathname) && !!session) {
    return Response.redirect(initialUrl);
  }

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (!isAdmin && isAdminRoute) {
    return Response.redirect(initialUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|images).*)",
  ],
};
