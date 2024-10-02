'use client'

import { GameProvider } from "@/context/game-context"
import { GamePage } from "@/app/components/game-page"

export default function Home() {
  return <GameProvider>
    <GamePage />
  </GameProvider>
}
