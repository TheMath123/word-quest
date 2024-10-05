'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export async function getUser() {
  const response = await fetch("/api/game/profile");
  const user = await response.json();
  return user;
}

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState()

  useEffect(() => {
    ; (async () => {
      const d = await getUser()
      if (d.error) {
        router.push("/login");
      }
      setData(d)
    })();
  }, [])

  return <main className="bg-background-gradient h-dvh grid place-content-center">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </main>
}