"use server";

import { signIn } from "@/lib/auth";

export default async function signInWithGithub() {
  return await signIn("github", {
    redirectTo: "/",
  });
}
