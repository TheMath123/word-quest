"use server";

import { signIn } from "@/lib/auth";

export async function signInWithGithub() {
  return await signIn("github", { redirectTo: "/" });
}
