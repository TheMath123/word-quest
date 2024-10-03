import { GamePage, } from "@/app/components/game-page"
import { UserHeader } from "@/app/components/user-header"

export default function Home() {
  return <>
    <UserHeader />
    <GamePage />
  </>
}
