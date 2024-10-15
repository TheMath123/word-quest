import { Suspense } from "react"
import { UserHeader } from "./components/user-header"
import { Footer } from "@/components"
import { GamePage } from "./components/game-page"

export default function Home() {
  return (
    <Suspense>
      <div className="grid h-dvh">
        <UserHeader />
        <GamePage />
        <Footer />
      </div>
    </Suspense>
  )
}
