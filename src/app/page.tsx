import { Suspense } from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { GamePage } from "@/app/components/game-page"

export default async function Home() {
  return (
    <Suspense>
      <div className="relative h-full">
        <ProfileHeader />
        <GamePage />
      </div>
    </Suspense>
  )
}
