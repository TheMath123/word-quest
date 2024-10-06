'use client'

import { useEffect } from "react";
import logout from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import { Footer } from "@/components";

export default function Logout() {
  const router = useRouter()
  useEffect(() => {
    const l = async () => {
      await logout()
      router.push('/');
    }
    l()
  }, []);

  return (
    <div className="flex flex-col h-dvh">
      <main className="grid place-content-center h-full">
        <h1 className="text-2xl font-bold">Good bye! =)</h1>
      </main>
      <Footer />
    </div>
  );
}