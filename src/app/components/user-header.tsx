import Link from "next/link";
import { auth } from "@/lib/auth";
import { ProfileButton } from "@/components/profile-button/profile-button";

export async function UserHeader() {
  const session = await auth();

  if (!session || !session.user) {
    return <header className="w-full p-4 flex justify-end">
      <nav className="space-x-4 font-medium">
        <Link href="/login">Sign In</Link>
        <Link href="/register">Sign Up</Link>
      </nav>
    </header>
  }

  return <header className="w-full p-4">
    <ProfileButton user={session.user} />
  </header>
}