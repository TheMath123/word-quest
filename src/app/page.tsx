'use client'

import { GameProvider } from "@/context/game-context"
import { SignIn } from "./components/sign-in"
import { GamePage } from "./components/game-page"

export default function Home() {
  return <>
    <SignIn />
    <GameProvider>
      <GamePage />
    </GameProvider>
  </>
}
