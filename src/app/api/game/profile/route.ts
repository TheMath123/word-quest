import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  console.log("req.auth", req.auth);
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: req.auth.user?.id },
  });

  return NextResponse.json(user);
});
