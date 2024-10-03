"use server";

import { auth } from "@/lib/auth";

export async function handleSession() {
  const session = await auth();
  return session;
}
