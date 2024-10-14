"use server";

import { signIn } from "@/lib/auth";

export default async function signInWithGoogle() {
  return await signIn("google", { redirectTo: "/" });
}
