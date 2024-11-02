'use client'

import { SignInButton } from "@/components";
import { WordQuestLogo } from "@/components/images/word-quest-logo";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex flex-col h-full items-center justify-center">
      <WordQuestLogo
        width="124"
        height="124"
      />
      <h1 className="text-4xl font-bold mb-6 text-center">Word Quest</h1>
      <div className="px-6 py-8 border border-foreground rounded-lg flex flex-col gap-4 items-center w-fit bg-background shadow">
        <SignInButton.Google>
          Sign in with Google
        </SignInButton.Google>
        <span className="font-medium">OR</span>
        <SignInButton.Github>
          Sign in with Github
        </SignInButton.Github>
      </div>
      <Link
        href='/'
        aria-label="Back to home"
        className="p-4 font-medium hover:underline active:opacity-95"
      >Back to home</Link>
    </main>
  );
}