import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { handleSession } from "@/actions/session";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";

export function UserHeader() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSession() {
      const data = await handleSession()
      setSession(data)
    }

    getSession()
  }, [])

  if (!session || !session.user) {
    return <header className="w-full p-4 flex justify-end">
      <nav className="space-x-4 font-medium">
        <Link href="/login">Sign In</Link>
        <Link href="/login">Sign Up</Link>
      </nav>
    </header>
  }

  return <header className="w-full p-4">
    <Avatar>
      <AvatarImage src={session.user.image ?? ''} />
      <AvatarFallback>{getInitials(session.user.name ?? '')}</AvatarFallback>
    </Avatar>
  </header>
}