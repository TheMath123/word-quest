'use client'

import { auth } from "@/lib/auth"
import { Session } from "next-auth";
import Image from "next/image"
import { useEffect, useState } from "react";

export default function UserAvatar() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSession() {
      const session = await auth()
      setSession(session)
    }

    getSession()
  })

  console.log('session', session);

  if (!session || !session.user) return null

  return (
    <div>
      <Image src={session.user.image!} alt="User Avatar" />
    </div>
  )
}