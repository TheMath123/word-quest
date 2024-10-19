"use server";

import { auth } from "@/lib/auth";
import { Session } from "next-auth";

interface Response {
  user?: Session["user"];
  error?: string;
}

export async function getProfile(): Promise<Response> {
  const session = await auth();

  if (!session) {
    return { error: "You are not authenticated, please log in." };
  }

  return { user: session.user };
}
