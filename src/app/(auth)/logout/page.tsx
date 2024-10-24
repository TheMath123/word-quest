'use client'

import { logout } from "@/services/auth/logout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Logout() {
  const router = useRouter()
  useEffect(() => {
    const leave = async () => {
      await logout();
    };

    leave();
    router.push('/');
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl font-bold">Good bye! =)</h1>
      <Link
        href='/'
        aria-label="Back to home"
        className="p-4 font-medium hover:underline active:opacity-95"
      >Back to home</Link>
    </main>
  );
}