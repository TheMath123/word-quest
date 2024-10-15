"use server";

import { signOut } from "@/lib/auth";

export async function logout() {
  return await signOut();
}
