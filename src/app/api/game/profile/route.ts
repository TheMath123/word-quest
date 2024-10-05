import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/model/user";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 401 }
    );
  }
  const user = await getUserByEmail(req.auth.user.email ?? undefined);

  return NextResponse.json(user);
});
