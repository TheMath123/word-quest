import { Suspense } from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { Footer } from "@/components"
import { GamePage } from "@/app/components/game-page"

export default async function Home() {
  return (
    <Suspense>
      <div className="relative grid h-dvh">
        <ProfileHeader />
        <GamePage />
        <Footer />
      </div>
    </Suspense>
  )
}
