'use client'

import { Footer, SignInButton } from "@/components";
import { WordQuestLogo } from "@/components/images/word-quest-logo";

export default function Login() {
  return (
    <main className="flex flex-col justify-between items-center h-dvh">
      <div className="grid h-full place-content-center place-items-center">
        <WordQuestLogo
          width="124"
          height="124"
        />
        <h1 className="text-4xl font-bold mb-6 text-center">Word Quest</h1>
        <div className="px-6 py-8 border border-foreground rounded-lg flex flex-col gap-4 items-center w-fit bg-background shadow">
          <SignInButton.Google />
          <span className="font-medium">OR</span>
          <SignInButton.Github />
        </div>
      </div>
      <Footer />
    </main>
  );
}