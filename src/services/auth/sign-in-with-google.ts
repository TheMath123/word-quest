"use server";

import { signIn } from "@/lib/auth";

export async function signInWithGoogle() {
  return await signIn("google", { redirectTo: "/" });
}
