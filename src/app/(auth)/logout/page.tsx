'use client'

import { logout } from "@/services/auth/logout";
import { Footer } from "@/components";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Logout() {
  const router = useRouter()
  useEffect(() => {
    const leave = async () => {
      await logout();
      router.push('/');
    };

    leave();
  }, []);

  return (
    <main className="flex flex-col justify-between items-center h-dvh">
      <nav className="w-full p-4 flex justify-end">
        <Link href='/' className="font-medium">Home</Link>
      </nav>
      <main className="grid place-content-center h-full">
        <h1 className="text-2xl font-bold">Good bye! =)</h1>
      </main>
      <Footer />
    </main>
  );
}