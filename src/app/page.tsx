import { GamePage, } from "@/app/components/game-page"
import { UserHeader } from "@/app/components/user-header"
import { Footer } from "@/components"

export default function Home() {
  return (<div className="grid h-dvh">
    <UserHeader />
    <GamePage />
    <Footer />
  </div>)
}
