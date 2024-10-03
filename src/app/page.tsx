'use client'

import { GameProvider } from "@/context/game-context"
import { GamePage, } from "@/app/components/game-page"
import { ThemeProvider } from "next-themes"
import { UserHeader } from "@/app/components/user-header"

export default function Home() {
  return <ThemeProvider >
    <UserHeader />
    <GameProvider>
      <GamePage />
    </GameProvider>
  </ThemeProvider>
}
