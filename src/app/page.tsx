'use client'

import { GameProvider } from "@/context/game-context"
import { GamePage, } from "@/app/components/game-page"
import { SignIn } from "@/app/components/sign-in"
import { ThemeProvider } from "next-themes"

export default function Home() {
  return <ThemeProvider >
    <SignIn />
    <GameProvider>
      <GamePage />
    </GameProvider>
  </ThemeProvider>
}
