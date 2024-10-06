import { auth as middleware } from "@/lib/auth";
import { NextResponse } from "next/server";

export default middleware(() => {
  NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
