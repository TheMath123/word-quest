"use server";

import { auth } from "@/lib/auth";

export default async function getProfile() {
  const session = await auth();

  if (!session) {
    return { error: "You are not authenticated, please log in." };
  }

  return session.user;
}
