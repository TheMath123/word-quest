'use client'

import logout from "@/services/auth/logout";
import { Footer } from "@/components";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter()
  useEffect(() => {
    const leave = async () => {
      await logout();
      router.replace('/');
    };

    leave();
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