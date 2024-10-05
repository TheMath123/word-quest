import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default auth(async function middleware(req) {
  NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
