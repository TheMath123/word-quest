"use server";

import { signOut } from "@/lib/auth";

export default async function logout() {
  return await signOut({ redirectTo: "/" });
}
