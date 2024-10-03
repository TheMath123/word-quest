import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { handleSession } from "@/actions/session";
import { SignInButton } from "@/components";
import Avatar from "@/components/avatar";

export function UserHeader() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSession() {
      const data = await handleSession()
      setSession(data)
    }

    getSession()
  }, [])

  if (!session || !session.user) return null

  return <header>
    <div className="flex flex-col gap-2">
      <SignInButton.Google />
      <SignInButton.Github />
    </div>
    <Avatar
      image={session.user.image}
      name={session.user.name}
    />
  </header>
}